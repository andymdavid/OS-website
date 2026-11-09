const { verifyEvent } = require('nostr-tools/pure');
const { WebSocket } = require('ws');
const { isIP } = require('node:net');
const COLLECTOR = 'd8a066f85d621d634e24ee0bf741e27b6436af28782195de8aa90972e310e937';
const RELAY = 'wss://relay.contextvm.org';

function publishToRelay(event, relay = RELAY) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(relay, { handshakeTimeout: 8000, maxPayload: 65536 });
    const timer = setTimeout(() => finish(new Error('Relay acknowledgement timed out')), 10000);
    let settled = false;
    function finish(error) {
      if (settled) return;
      settled = true; clearTimeout(timer); socket.close();
      if (error) reject(error); else resolve();
    }
    socket.on('open', () => socket.send(JSON.stringify(['EVENT', event])));
    socket.on('message', raw => {
      let message;
      try { message = JSON.parse(raw.toString()); } catch { return; }
      if (message[0] === 'OK' && message[1] === event.id) finish(message[2] ? undefined : new Error(`Relay rejected event: ${String(message[3]).slice(0, 160)}`));
    });
    socket.on('error', error => finish(error));
    socket.on('close', () => finish(new Error('Relay closed before acknowledgement')));
  });
}
function createAnalyticsHandler({ collector = COLLECTOR, publish = publishToRelay } = {}) {
  const buckets = new Map();
  let inFlight = 0;
  return async (req, res) => {
    res.set('Cache-Control', 'no-store');
    if (req.get('origin') !== 'https://otherstuff.ai') return res.status(403).json({ error: 'Origin not allowed' });
    const event = req.body?.event;
    if (!event || event.kind !== 1059 || typeof event.content !== 'string' || event.content.length > 6000 || Math.abs(Date.now() / 1000 - event.created_at) > 120 || !Array.isArray(event.tags) || event.tags.length !== 1 || event.tags[0]?.[0] !== 'p' || event.tags[0]?.[1] !== collector || !verifyEvent(event)) return res.status(400).json({ error: 'Invalid analytics event' });
    const now = Date.now();
    // Only the loopback-bound API is reachable by nginx, which overwrites this
    // header. Never accept an arbitrary forwarded chain as the rate-limit key.
    const forwarded = req.get('x-real-ip');
    const key = ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.ip) && isIP(forwarded || '') ? forwarded : req.ip;
    const bucket = buckets.get(key);
    if (bucket && now - bucket.start < 60000 && bucket.count >= 120) return res.status(429).json({ error: 'Too many analytics events' });
    if (!bucket || now - bucket.start >= 60000) buckets.set(key, { start: now, count: 1 }); else bucket.count++;
    if (buckets.size > 1000) for (const [ip, value] of buckets) if (now - value.start > 60000) buckets.delete(ip);
    if (inFlight >= 20) return res.status(503).json({ error: 'Analytics busy' });
    inFlight++;
    try {
      await publish(event);
      return res.json({ accepted: true, eventId: event.id });
    } catch (error) {
      console.error('Analytics relay publication failed:', error.message);
      return res.status(502).json({ error: 'Analytics relay unavailable' });
    } finally { inFlight--; }
  };
}
module.exports = { createAnalyticsHandler, publishToRelay };
