import { generateSecretKey, getPublicKey, finalizeEvent } from 'nostr-tools/pure';
import { v2 } from 'nostr-tools/nip44';

// Same NIP-44/CVM record_visit envelope as nanalytics-tracker 0.1.2.
// Ephemeral keys never leave this function or persist between visits.
export function createAnalyticsEvent({ siteUuid, collectorPubkey, pagePath, deviceType }) {
  const key = generateSecretKey();
  const request = { jsonrpc: '2.0', id: crypto.randomUUID(), method: 'tools/call', params: { name: 'record_visit', arguments: { siteUuid, pagePath, deviceType } } };
  const inner = finalizeEvent({ kind: 25910, created_at: Math.floor(Date.now() / 1000), tags: [['p', collectorPubkey]], content: JSON.stringify(request) }, key);
  const wrappingKey = generateSecretKey();
  return finalizeEvent({ kind: 1059, created_at: Math.floor(Date.now() / 1000), tags: [['p', collectorPubkey]], content: v2.encrypt(JSON.stringify(inner), v2.utils.getConversationKey(wrappingKey, collectorPubkey)), pubkey: getPublicKey(wrappingKey) }, wrappingKey);
}
