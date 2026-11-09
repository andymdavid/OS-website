import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const base = process.env.ASTRO_PREVIEW_URL || 'http://127.0.0.1:4567';
const browser = await chromium.launch({ args: ['--no-sandbox'] });
try {
  for (const dnt of [false, true]) {
    const context = await browser.newContext();
    await context.addInitScript(({ dnt }) => {
      if (dnt) Object.defineProperty(navigator, 'doNotTrack', { get: () => '1' });
      window.addEventListener('load', () => { window.__pageLoaded = true; });
    }, { dnt });
    // Serve the built preview at the production origin without contacting production.
    await context.route('https://otherstuff.ai/**', async route => {
      const url = new URL(route.request().url());
      const response = await fetch(`${base}${url.pathname}${url.search}`);
      await route.fulfill({ status: response.status, headers: Object.fromEntries(response.headers), body: Buffer.from(await response.arrayBuffer()) });
    });
    let requests = 0;
    await context.route('https://unpkg.com/**', async route => {
      requests++;
      await route.fulfill({ contentType: 'application/javascript', body: 'window.__analytics = { ...document.currentScript.dataset, loadedAfterPage: window.__pageLoaded };' });
    });
    const page = await context.newPage();
    await page.goto('https://otherstuff.ai/');
    if (dnt) {
      await page.waitForTimeout(3500);
      assert.equal(requests, 0, 'Do Not Track must prevent loading analytics');
    } else {
      await page.waitForFunction(() => window.__analytics);
      const tracker = await page.evaluate(() => window.__analytics);
      assert.equal(requests, 1);
      assert.equal(tracker.loadedAfterPage, true);
      assert.equal(tracker.relays, 'wss://relay.contextvm.org');
      assert.equal(tracker.siteUuid, 'c0cb28c5-6b00-4b5d-891a-ea3f8ebb47f8');
      assert.match(tracker.cvmPubkey, /^[a-f0-9]{64}$/);
    }
    console.log(`Analytics ${dnt ? 'Do Not Track' : 'post-load initialisation and relay config'} pass (tracker mocked; no visits sent)`);
    await context.close();
  }
  const page = await browser.newPage();
  await page.goto(base);
  await page.waitForTimeout(3500);
  assert.equal(await page.locator('script[src*="nanalytics-tracker"]').count(), 0, 'Preview host must not publish visits');
  console.log('Preview analytics exclusion passes');
} finally { await browser.close(); }
