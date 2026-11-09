import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { verifyEvent } from 'nostr-tools/pure';
const base = process.env.ASTRO_PREVIEW_URL || 'http://127.0.0.1:4567';
const browser = await chromium.launch({ args: ['--no-sandbox'] });
try {
  for (const dnt of [false, true]) {
    const context = await browser.newContext();
    await context.addInitScript(({ dnt }) => {
      if (dnt) Object.defineProperty(navigator, 'doNotTrack', { get: () => '1' });
      window.addEventListener('load', () => { window.__pageLoaded = true; });
      window.addEventListener('os-analytics-published', event => { window.__analyticsPublished = event.detail.eventId; });
    }, { dnt });
    let requests = 0;
    await context.route('https://otherstuff.ai/**', async route => {
      const url = new URL(route.request().url());
      if (url.pathname === '/api/analytics') {
        requests++;
        const { event } = route.request().postDataJSON();
        assert.ok(verifyEvent(event)); assert.equal(event.kind, 1059);
        assert.deepEqual(event.tags, [['p', 'd8a066f85d621d634e24ee0bf741e27b6436af28782195de8aa90972e310e937']]);
        await route.fulfill({ contentType: 'application/json', body: JSON.stringify({ accepted: true, eventId: event.id }) });
        return;
      }
      const response = await fetch(`${base}${url.pathname}${url.search}`);
      await route.fulfill({ status: response.status, headers: Object.fromEntries(response.headers), body: Buffer.from(await response.arrayBuffer()) });
    });
    const page = await context.newPage();
    await page.goto('https://otherstuff.ai/');
    if (dnt) { await page.waitForTimeout(3500); assert.equal(requests, 0); }
    else { await page.waitForFunction(() => window.__analyticsPublished); assert.equal(await page.evaluate(() => window.__pageLoaded), true); assert.equal(requests, 1); }
    assert.equal(await page.locator('script[src*="nanalytics-tracker"]').count(), 0, 'No third-party tracker script');
    console.log(`Analytics ${dnt ? 'Do Not Track' : 'worker signing, same-origin bridge and acknowledgement'} pass (HTTP mocked; no production visit).`);
    await context.close();
  }
  const page = await browser.newPage();
  let requests = 0; page.on('request', request => { if (request.url().includes('/api/analytics')) requests++; });
  await page.goto(base); await page.waitForTimeout(3500);
  assert.equal(requests, 0); console.log('Preview analytics exclusion passes');
} finally { await browser.close(); }
