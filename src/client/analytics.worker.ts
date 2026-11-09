import { createAnalyticsEvent } from '../lib/analytics-event.mjs';
self.onmessage = event => {
  try { self.postMessage({ event: createAnalyticsEvent(event.data) }); }
  catch (error) { self.postMessage({ error: error instanceof Error ? error.message : String(error) }); }
};
