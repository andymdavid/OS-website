import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import * as launcher from 'chrome-launcher';
const base = process.env.ASTRO_PREVIEW_URL || 'http://127.0.0.1:14567';
// Use regular Chrome's default profile. Headless-shell/incognito delegates may
// disable bfcache independently of the page and produce misleading failures.
const chrome = await launcher.launch({ chromePath: process.env.CHROME_PATH, chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'] });
const browser = await chromium.connectOverCDP(`http://127.0.0.1:${chrome.port}`);
try {
  const page = await browser.contexts()[0].newPage();
  await page.addInitScript(() => addEventListener('pageshow', event => { window.__restored = event.persisted; }));
  await page.goto(`${base}/`); await page.goto(`${base}/about/`);
  await page.goBack({ waitUntil: 'commit' });
  await page.waitForFunction(() => window.__restored === true, null, { timeout: 5000 });
  assert.equal(await page.evaluate(() => window.__restored), true);
  console.log('Regular Chrome restores homepage from back/forward cache');
} finally { await browser.close(); await chrome.kill(); }
