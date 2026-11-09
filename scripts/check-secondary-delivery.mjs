import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
const base = process.env.ASTRO_PREVIEW_URL || 'http://127.0.0.1:4567';
const browser = await chromium.launch({ args: ['--no-sandbox'] });
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    let requests = [];
    page.on('request', request => requests.push(request.url()));
    await page.route('https://www.youtube.com/**', route => route.fulfill({ contentType: 'text/html', body: '<title>Mock video player</title>' }));
    for (const path of ['/ai-automation/', '/writing/', '/newsletter/', '/speedrun/']) {
      requests = [];
      await page.goto(`${base}${path}`);
      for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 750) {
        await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(30);
      }
      await page.waitForTimeout(200);
      assert.ok(!requests.some(url => /footer-gradient\.png|\/(Andy|Pete)-letter\.png|youtube\.com|beehiiv-images-production/.test(url)), `${path}: no full-resolution sources or unsolicited player requests`);
      assert.ok(await page.locator('h1').count());
    }
    const play = page.getByRole('button', { name: /^Play .* video$/ });
    await play.scrollIntoViewIfNeeded();
    await play.focus(); await page.keyboard.press('Enter');
    const frame = page.locator('iframe[src*="youtube.com"]');
    await expect(frame).toHaveCount(1); await expect(frame).toHaveAttribute('src', /autoplay=1/);
    await expect(frame).toBeFocused();
    console.log(`${width}px: bounded secondary images and keyboard-activated video pass (player HTTP mocked).`);
    await context.close();
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage(); await page.goto(`${base}/speedrun/`);
  await expect(page.getByRole('link', { name: 'Watch video', exact: true })).toBeVisible();
  await context.close(); console.log('No-JavaScript video fallback passes.');
} finally { await browser.close(); }
