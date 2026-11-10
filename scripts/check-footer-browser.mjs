import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base = process.env.ASTRO_PREVIEW_URL || 'http://127.0.0.1:4567';
const routes = ['/speedrun/', '/levelup/', '/ai-automation/', '/writing/', '/about/',
  '/contact/', '/games/', '/privacy/', '/terms/', '/perth-ai-roundtable/'];
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const results = [];
await fs.mkdir('test-results', { recursive: true });

async function snapshot(page, path) {
  await page.goto(base + path, { waitUntil: 'domcontentloaded' });
  // Appending synchronously also works with JavaScript disabled in the browser.
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.textContent = '*,*::before,*::after{animation:none!important;transition:none!important}';
    document.head.append(style);
  });
  const footer = page.locator('footer.footer');
  await footer.scrollIntoViewIfNeeded();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  return footer.evaluate(footer => {
    const root = footer.getBoundingClientRect();
    // Astro hydration scaffolding varies by route and has no visual geometry.
    const elements = [footer, ...footer.querySelectorAll('*:not(astro-island):not(script):not(style):not(template)')];
    return {
      height: root.height,
      nodes: elements.map(element => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName,
          class: element.getAttribute('class'),
          href: element.getAttribute('href'),
          text: element.children.length ? null : element.textContent,
          rect: [rect.x, rect.y - root.y, rect.width, rect.height].map(n => Math.round(n * 100) / 100),
          css: Object.fromEntries(['fontFamily', 'fontSize', 'fontWeight', 'lineHeight',
            'letterSpacing', 'color', 'backgroundColor', 'backgroundImage', 'padding',
            'margin', 'minHeight', 'display', 'gap', 'borderTopWidth'].map(key => [key, style[key]])),
        };
      }),
    };
  });
}

try {
  for (const width of [390, 900, 1440]) {
    for (const javaScriptEnabled of [true, false]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled, reducedMotion: 'reduce' });
      await context.route('**/api/subscribe', route => route.fulfill({ status: 200, body: '{}' }));
      const page = await context.newPage();
      const home = await snapshot(page, '/');
      for (const route of routes) {
        const actual = await snapshot(page, route);
        try {
          assert.deepEqual(actual, home);
        } catch (error) {
          await fs.writeFile('test-results/footer-mismatch.json', JSON.stringify({ width, javaScriptEnabled, route, actual, home }, null, 2));
          throw new Error(`${route} differs at ${width}px JS=${javaScriptEnabled}: ${error.message.slice(0, 1800)}`);
        }
        results.push({ width, javaScriptEnabled, route, height: actual.height });
      }
      await context.close();
      console.log(`${width}px JS=${javaScriptEnabled}: all ${routes.length} route footers match homepage`);
    }
  }
  await fs.writeFile('test-results/footer-results.json', JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
