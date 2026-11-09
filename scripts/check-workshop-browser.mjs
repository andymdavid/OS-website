import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';

const base = process.env.ASTRO_PREVIEW_URL || 'http://127.0.0.1:4567';
const browser = await chromium.launch({ args: ['--no-sandbox'] });
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await context.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const path of ['/levelup/', '/speedrun/']) {
      await page.goto(`${base}${path}`);
      const headline = await page.locator('h1').boundingBox();
      assert.ok(headline && headline.y >= 0 && headline.y < 900, 'Workshop headline must appear in the first screen');
      const trigger = page.getByRole('button', { name: 'Talk to Us', exact: true }).first();
      await trigger.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => document.querySelector('main astro-island')?.hasAttribute('ssr') === false && [...document.querySelectorAll('astro-island')].some(island => island.getAttribute('component-export') === 'WorkshopSignup' && !island.hasAttribute('ssr')));
      await trigger.click();
      const form = page.locator('form').filter({ has: page.locator('input[name=organisation]') });
      await form.locator('[name=name]').fill('Astro Check');
      await form.locator('[name=organisation]').fill('Test organisation');
      await form.locator('[name=email]').fill('astro-check@example.invalid');
      await form.getByRole('button', { name: 'Open email draft' }).click();
      const draft = page.getByRole('link', { name: 'Open email draft again' });
      await expect(draft).toBeVisible();
      const href = await draft.getAttribute('href');
      assert.ok(href.startsWith('mailto:info@otherstuff.studio?'));
      const message = new URL(href);
      assert.match(message.searchParams.get('subject'), path.includes('speedrun') ? /Speedrun/ : /Level Up/);
      assert.match(message.searchParams.get('body'), /astro-check@example.invalid/);
      assert.match(message.searchParams.get('body'), /Test organisation/);
      await expect(page.getByText('Your email draft is ready.', { exact: false })).toBeVisible();
      await page.getByRole('button', { name: 'Close', exact: true }).click();
      await expect(form).toHaveCount(0);
      console.log(`${width}px ${path}: modal, correct email draft and close pass (no submission)`);
    }
    await page.goto(`${base}/the-good-stuff/`);
    const cards = page.locator('.good-stuff-portfolio > article:visible');
    const before = await cards.count();
    const more = page.getByRole('button', { name: 'Show more' });
    if (await more.isVisible()) {
      await more.click();
      assert.ok(await cards.count() > before);
    }
    console.log(`${width}px podcast archive progressive display passes`);
    assert.deepEqual(errors, [], 'No uncaught errors during workshop/archive interactions');
    await context.close();
  }
} finally {
  await browser.close();
}
