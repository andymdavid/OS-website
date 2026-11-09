import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
const base = process.env.ASTRO_PREVIEW_URL || 'http://127.0.0.1:4567';
const browser = await chromium.launch({ args: ['--no-sandbox'] });
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await context.route('**/api/subscribe', route => route.fulfill({ contentType: 'application/json', body: '{"success":true}' }));
    const page = await context.newPage(); const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(base);
    if (width < 1025) {
      const toggle = page.getByRole('button', { name: 'Toggle menu' });
      await toggle.click(); await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await page.getByRole('button', { name: 'Solutions', exact: true }).click();
      await expect(page.locator('#mobile-solutions')).toBeVisible();
      await page.keyboard.press('Escape'); await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(toggle).toBeFocused();
    } else {
      const solutions = page.getByRole('button', { name: 'Solutions', exact: true });
      await solutions.focus(); await page.keyboard.press('ArrowDown');
      await expect(solutions).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('.mega-menu a').first()).toBeFocused();
      await page.keyboard.press('Escape'); await expect(solutions).toHaveAttribute('aria-expanded', 'false');
      await page.getByRole('button', { name: 'Media', exact: true }).hover();
      await expect(page.locator('.mega-menu h4').first()).toHaveText('Intelligence Snacks');
      await page.mouse.move(0, 900); await page.waitForTimeout(200);
    }
    await page.getByRole('button', { name: /Big ideas on AI/ }).click();
    const modal = page.locator('.modal-overlay'); await expect(modal).toBeVisible();
    await expect(modal.getByRole('button', { name: 'Close modal' })).toBeFocused();
    await modal.locator('input[type=email]').fill('navigation-check@example.invalid');
    await modal.locator('button[type=submit]').click(); await expect(modal).toHaveCount(0);
    await page.getByRole('button', { name: /Big ideas on AI/ }).click(); await expect(modal).toBeVisible();
    await page.keyboard.press('Escape'); await expect(modal).toHaveCount(0);
    if (width === 1440) {
      await page.waitForTimeout(10100);
      await page.dispatchEvent('html', 'mouseout', { clientY: 0, relatedTarget: null });
      await expect(modal.locator('h2')).toHaveText('Before you go, get Intelligence Snacks in your inbox.');
      await expect(modal.locator('.modal-subpara')).toHaveText('Quickly digest the big ideas emerging from the world of AI, delivered to your inbox each week.');
      await page.keyboard.press('Escape');
      assert.ok(Number(await page.evaluate(() => localStorage.getItem('os-home-duplicate-newsletter-exit-dismissed-at'))) > 0);
    }
    assert.deepEqual(errors, []); console.log(`${width}px native menus, keyboard/focus, lazy newsletter, mocked signup and Escape pass.`);
    await context.close();
  }
} finally { await browser.close(); }
