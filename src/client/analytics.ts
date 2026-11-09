const siteUuid = 'c0cb28c5-6b00-4b5d-891a-ea3f8ebb47f8';
const collectorPubkey = 'd8a066f85d621d634e24ee0bf741e27b6436af28782195de8aa90972e310e937';
let worker: Worker | undefined;
let pending: AbortController | undefined;
function track() {
  if (location.hostname !== 'otherstuff.ai' || navigator.doNotTrack === '1') return;
  const pagePath = location.pathname;
  try {
    const last = Number(sessionStorage.getItem(`na_track_${pagePath}`) || 0);
    if (Date.now() - last < 5000) return;
  } catch { /* Tracking does not require persistent browser storage. */ }
  const ua = navigator.userAgent.toLowerCase();
  const deviceType = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/.test(ua) ? 'tablet' : /mobile|iphone|ipod|android.*mobile|windows phone|blackberry|bb10|mini|mobi/.test(ua) ? 'mobile' : 'desktop';
  worker?.terminate();
  worker = new Worker(new URL('./analytics.worker.ts', import.meta.url), { type: 'module' });
  worker.onmessage = async ({ data }) => {
    worker?.terminate(); worker = undefined;
    if (data.error) { console.error('[NAnalytics] Signing failed:', data.error); return; }
    pending = new AbortController();
    try {
      const response = await fetch('/api/analytics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: data.event }), signal: pending.signal });
      if (!response.ok) throw new Error(`Relay bridge returned ${response.status}`);
      const result = await response.json();
      if (!result.accepted) throw new Error('Relay did not acknowledge the event');
      try { sessionStorage.setItem(`na_track_${pagePath}`, String(Date.now())); } catch { /* Storage is optional. */ }
      window.dispatchEvent(new CustomEvent('os-analytics-published', { detail: { eventId: result.eventId } }));
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) console.error('[NAnalytics] Publication failed:', error);
    } finally { pending = undefined; }
  };
  worker.onerror = event => { console.error('[NAnalytics] Worker failed:', event.message); worker?.terminate(); worker = undefined; };
  worker.postMessage({ siteUuid, collectorPubkey, pagePath, deviceType });
}
function schedule() {
  if ('requestIdleCallback' in window) window.requestIdleCallback(track, { timeout: 3000 });
  else setTimeout(track, 0);
}
if (document.readyState === 'complete') schedule();
else window.addEventListener('load', schedule, { once: true });
window.addEventListener('pagehide', () => { worker?.terminate(); worker = undefined; pending?.abort(); });
window.addEventListener('pageshow', event => { if (event.persisted) schedule(); });
