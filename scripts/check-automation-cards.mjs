import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const base = process.env.ASTRO_PREVIEW_URL || 'http://127.0.0.1:4567';
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const titleStyle = element => {
  const style = getComputedStyle(element);
  return ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'textTransform'].map(key => style[key]);
};

try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 } });
    const page = await context.newPage();
    const requests = [];
    const errors = [];
    page.on('request', request => requests.push(request.url()));
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '/ai-automation/');
    assert.ok(!requests.some(url => /\/(InventoryDemo|ProposalBuilderDemo|PreMeetingBriefingsDemo|ProjectStatusReportsDemo)\./.test(url)), 'Below-fold demos must remain lazy');

    await page.locator('.pain-recognition-signature').scrollIntoViewIfNeeded();
    await page.evaluate(() => document.fonts.ready);
    assert.ok(await page.evaluate(() => document.fonts.check('500 46px "Caveat Signature"')));
    const signatureRequest = requests.find(url => /caveat-signature.*woff2/.test(url));
    assert.ok(signatureRequest, 'Signature font must actually load');
    const signatureResponse = await context.request.get(signatureRequest);
    assert.ok((await signatureResponse.body()).length < 6000, 'Signature must use the small subset');
    assert.ok(!requests.some(url => /caveat-latin/.test(url)), 'Do not load the full Caveat font for the signature');

    const expected = ['Figtree, sans-serif', '22px', '700', '26.4px', 'none'];
    for (const title of await page.locator('#twoColumn h3, #automation-options h3').all()) {
      assert.deepEqual(await title.evaluate(titleStyle), expected);
    }
    assert.equal(await page.locator('#automation-options h3').count(), 3);

    for (const selector of ['.inventory-demo-shell', '.proposal-builder-shell', '.briefings-demo-shell', '.status-demo-shell']) {
      const demo = page.locator(selector);
      await demo.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      const initial = await demo.innerHTML();
      await page.waitForFunction(({ selector, initial }) => document.querySelector(selector).innerHTML !== initial,
        { selector, initial }, { timeout: 8000 });
      assert.equal(await demo.locator('xpath=ancestor::astro-island').getAttribute('ssr'), null);
      assert.ok((await demo.boundingBox()).height > 100);
    }
    assert.deepEqual(errors, [], 'Demo hydration must not throw');

    await page.goto(base + '/');
    await page.locator('#services').scrollIntoViewIfNeeded();
    await page.evaluate(() => document.fonts.ready);
    for (const title of await page.locator('#services .funnel-card h3').all()) {
      assert.deepEqual(await title.evaluate(titleStyle), expected);
    }
    const cardsFit = await page.locator('#services .funnel-card').evaluateAll(cards => cards.every(card => {
      const body = card.querySelector('.funnel-card-body');
      const button = card.querySelector('.funnel-card-button');
      const range = document.createRange();
      range.selectNodeContents(button);
      const rect = button.getBoundingClientRect();
      const price = card.querySelector('.funnel-card-price').getBoundingClientRect();
      const children = [...body.children].map(child => child.getBoundingClientRect());
      return rect.width >= range.getBoundingClientRect().width + 30 &&
        rect.right <= card.getBoundingClientRect().right && button.scrollWidth <= button.clientWidth + 1 &&
        Math.abs(rect.top - price.bottom - 12) < 1 &&
        children.slice(1).every((child, index) => Math.abs(child.top - children[index].bottom - 12) < 1);
    }));
    assert.ok(cardsFit, 'Button labels must fit and copy/button gaps must stay consistent');
    const strip = await page.locator('.home-duplicate-good-stuff-strip').evaluate(element => {
      const style = getComputedStyle(element);
      return [style.backgroundColor, style.backdropFilter];
    });
    assert.deepEqual(strip, ['rgb(5, 5, 5)', 'none']);
    await context.close();

    const noJs = await browser.newContext({ viewport: { width, height: 1000 }, javaScriptEnabled: false });
    const fallbackPage = await noJs.newPage();
    await fallbackPage.goto(base + '/ai-automation/');
    assert.equal(await fallbackPage.locator('.automation-demo-fallback').count(), 4);
    for (const fallback of await fallbackPage.locator('.automation-demo-fallback').all()) {
      assert.ok(await fallback.isVisible());
      assert.ok((await fallback.boundingBox()).width > 150);
    }
    await noJs.close();
    console.log(`${width}px: card typography, label sizing, spacing, signature payload, solid strip, lazy demo progression and no-JS fallback pass.`);
  }
} finally {
  await browser.close();
}
