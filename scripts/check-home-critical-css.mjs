import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const base = process.env.ASTRO_PREVIEW_URL || 'http://127.0.0.1:4567';
const browser = await chromium.launch({ args: ['--no-sandbox'] });
try {
  for (const width of [390, 1440]) {
    // All complete stylesheets are unavailable: the inline first-screen CSS
    // must still preserve the hero and every navigation interaction state.
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const snapshot = async page => {
      await page.evaluate(() => document.fonts.ready);
      await page.addStyleTag({ content: '*{animation:none!important;transition:none!important}' });
      return page.evaluate(() => Array.from(document.querySelectorAll('.nav, .nav *, .hero-extended, .hero-sticky, .hero-sticky *')).map(e => {
        const s = getComputedStyle(e), r = e.getBoundingClientRect();
        return {
          element: e.tagName + '.' + e.getAttribute('class'),
          rect: [r.x, r.y, r.width, r.height].map(v => Math.round(v * 100) / 100),
          css: Object.fromEntries(['fontFamily', 'fontSize', 'lineHeight', 'fontWeight', 'color', 'backgroundColor', 'backgroundImage', 'display', 'position', 'padding', 'margin', 'opacity', 'backdropFilter', 'overflow', 'alignItems', 'justifyContent', 'gap'].map(k => [k, s[k]])),
        };
      }));
    };
    const reference = await context.newPage();
    await reference.goto(base);
    const expected = await snapshot(reference);
    const stylesheets = await reference.locator('link[rel=stylesheet][href^="/_astro/"]').evaluateAll(links => links.map(l => l.href));
    assert.ok(stylesheets.length > 0);
    await reference.close();
    await context.route('**/_astro/*.css', route => route.abort());
    const page = await context.newPage();
    await page.goto(base);
    assert.deepEqual(await snapshot(page), expected, 'First-screen layout must match with complete CSS unavailable');
    const nav = page.locator('.nav-container');
    assert.deepEqual(await nav.evaluate(e => { const s = getComputedStyle(e); return [s.backgroundColor, s.backdropFilter]; }), ['rgba(13, 13, 13, 0.3)', 'blur(9px)']);
    assert.ok(await page.locator('h1').isVisible());
    assert.match(await page.locator('.hero-gradient-background').first().evaluate(e => getComputedStyle(e).backgroundImage), /gradient-/);
    if (width < 1025) {
      const toggle = page.getByRole('button', { name: 'Toggle menu' });
      await toggle.click();
      await page.getByRole('button', { name: 'Solutions', exact: true }).click();
      assert.ok(await page.locator('#mobile-solutions').isVisible());
      await page.keyboard.press('Escape');
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    } else {
      const solutions = page.getByRole('button', { name: 'Solutions', exact: true });
      await solutions.focus(); await page.keyboard.press('ArrowDown');
      assert.ok(await page.locator('.mega-menu a').first().isVisible());
      await page.keyboard.press('Escape');
      assert.equal(await solutions.getAttribute('aria-expanded'), 'false');
    }
    console.log(`${width}px: hero, glass header and menu states survive unavailable deferred CSS.`);
    await context.close();

    const delayed = await browser.newContext({ viewport: { width, height: 900 } });
    let release;
    const pending = new Promise(resolve => { release = resolve; });
    await delayed.route(stylesheets.at(-1), async route => { await pending; await route.continue(); });
    const slowPage = await delayed.newPage();
    try {
      await slowPage.goto(base, { waitUntil: 'domcontentloaded' });
      await slowPage.waitForFunction(() => Array.from(document.querySelectorAll('link[data-home-css]')).some(l => l.dataset.ready === 'true'));
      assert.equal(await slowPage.evaluate(() => Array.from(document.styleSheets).filter(s => s.href?.includes('/_astro/')).length), 0, 'Do not apply partial section CSS');
      assert.ok(await slowPage.locator('h1').isVisible());
      release();
      await slowPage.waitForFunction(() => !document.querySelector('link[data-home-css]'));
      await slowPage.waitForFunction(count => Array.from(document.styleSheets).filter(s => s.href?.includes('/_astro/')).length === count, stylesheets.length);
      const question = slowPage.locator('.faq-section-home summary').first();
      await question.scrollIntoViewIfNeeded(); await question.click();
      assert.equal(await slowPage.locator('.faq-section-home details').first().getAttribute('open'), '');
      await slowPage.locator('footer').scrollIntoViewIfNeeded();
      assert.ok(await slowPage.locator('footer input[type=email]').isVisible());
    } finally { release(); await delayed.close(); }

    const anchor = await browser.newPage({ viewport: { width, height: 900 } });
    await anchor.goto(`${base}/#services`);
    await anchor.waitForFunction(() => scrollY > 0, null, { timeout: 5000 });
    assert.equal(await anchor.locator('link[data-home-css]').count(), 0);
    assert.equal(await anchor.evaluate(() => Array.from(document.styleSheets).filter(s => s.href?.includes('/_astro/')).length), stylesheets.length);
    await anchor.close();
    console.log(`${width}px: delayed styles apply together, FAQ/footer reveal and direct section link pass.`);
  }
} finally { await browser.close(); }
