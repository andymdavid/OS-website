import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
const base = process.env.ASTRO_PREVIEW_URL || 'http://127.0.0.1:4567';
const output = process.env.ASTRO_OUTPUT_DIR || 'dist';
async function htmlRoutes(directory, prefix = '') {
  const routes = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) routes.push(...await htmlRoutes(`${directory}/${entry.name}`, `${prefix}/${entry.name}`));
    else if (entry.name === 'index.html') routes.push(`${prefix}/`);
  }
  return routes;
}
const browser = await chromium.launch({ args: ['--no-sandbox'], headless: true });
try {
  const routes = await htmlRoutes(output);
  for (const javaScriptEnabled of [false, true]) {
    const context = await browser.newContext({ javaScriptEnabled, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
    await context.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const errors = [];
    const missing = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(base)) missing.push(response.url()); });
    for (const path of routes) {
      console.log(javaScriptEnabled ? 'JS' : 'no-JS', path);
      await page.goto(`${base}${path}`, { waitUntil: 'domcontentloaded' });
      await page.locator('h1, h2').first().waitFor({ state: 'visible' });
      assert.ok((await page.title()).length > 0, path);
      if (path !== '/nstack/') assert.equal(await page.locator('link[rel=canonical]').count(), 1, path);
      if (javaScriptEnabled) await page.waitForTimeout(200);
    }
    assert.deepEqual(errors, [], 'Uncaught browser errors');
    assert.deepEqual(missing, [], 'Missing local resources');
    console.log(`${routes.length} routes pass: ${javaScriptEnabled ? 'mobile JS' : 'mobile no JS'}`);
    await context.close();
  }
  const response = await fetch(`${base}/definitely-not-a-real-route/`);
  assert.equal(response.status, 404);
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.ok(!sitemap.includes('/archive/') && !sitemap.includes('/home-duplicate/'));
  const archive = await (await fetch(`${base}/archive/home/`)).text();
  assert.match(archive, /name="robots" content="noindex, follow"/);
  console.log('404, sitemap exclusions and archive noindex pass');
} finally {
  await browser.close();
}
