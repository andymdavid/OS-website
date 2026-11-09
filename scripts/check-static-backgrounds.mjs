import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const base = process.env.ASTRO_PREVIEW_URL || 'http://127.0.0.1:4567';
const browser = await chromium.launch({ args: ['--no-sandbox'] });
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    await context.addInitScript(() => {
      window.__graphicsContexts = 0;
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...args) {
        if (/webgl/.test(type)) window.__graphicsContexts++;
        return original.call(this, type, ...args);
      };
    });
    const page = await context.newPage();
    for (const route of ['/', '/ai-automation/']) {
      await page.goto(`${base}${route}`);
      const hero = page.locator('.hero-gradient-background').first();
      await hero.waitFor({ state: 'visible' });
      assert.match(await hero.evaluate(e => getComputedStyle(e).backgroundImage), /gradient-(mobile|desktop).*\.webp/);
      assert.equal(await page.locator('.nav-container').evaluate(e => getComputedStyle(e).backgroundColor), 'rgb(13, 13, 13)');
      await page.locator('footer.footer').scrollIntoViewIfNeeded();
      assert.equal(await page.evaluate(() => window.__graphicsContexts), 0);
      assert.equal(await page.locator('os-shader, canvas.hero-shader-canvas').count(), 0);
    }
    const fontRequests = [];
    page.on('request', request => { if (request.url().includes('extended.')) fontRequests.push(request.url()); });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(fontRequests.length, 0, 'Ordinary Latin page does not need full brand fonts');
    await page.evaluate(async () => {
      for (const [family, weight] of [['Alfabet Regular', 400], ['Alfabet Black', 900]]) {
        const loaded = await document.fonts.load(`${weight} 16px "${family}"`, 'Ελληνικά Ā ①');
        if (!loaded.length) throw new Error(`No extended font for ${family}`);
      }
    });
    assert.ok(fontRequests.some(url => url.includes('Alfabet-Regular-extended.')));
    assert.ok(fontRequests.some(url => url.includes('Alfabet-Black-extended.')));
    console.log(`${width}px: static hero/footer, no WebGL context, Latin delivery and extended-character font fallback pass.`);
    await context.close();
  }
} finally { await browser.close(); }
