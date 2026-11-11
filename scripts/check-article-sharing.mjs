import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
import {readWritingPosts} from '../src/lib/writing-source.mjs';
const expectedArticleCount=readWritingPosts().length;
const base=process.env.ASTRO_PREVIEW_URL||'http://127.0.0.1:4567';
const slug='ai-automation-roi-for-smes';
const canonical=`https://otherstuff.ai/writing/${slug}/`;
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
 for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:1000}});
  await context.addInitScript(()=>{
   window.testCopied=[];window.testShares=[];window.testCopyFails=false;window.testShareCancel=false;
   Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{if(window.testCopyFails)throw Error('Denied');window.testCopied.push(text)}}});
   Object.defineProperty(navigator,'share',{configurable:true,value:async payload=>{if(window.testShareCancel)throw new DOMException('Cancelled','AbortError');window.testShares.push(payload)}});
  });
  await context.route('**/*',route=>route.request().url().startsWith(base+'/')?route.continue():route.fulfill({status:200,body:'External share destination intercepted'}));
  const page=await context.newPage();await page.goto(`${base}/writing/${slug}/`,{waitUntil:'networkidle'});
  const share=page.locator('article-share');await page.waitForFunction(()=>document.querySelector('article-share')?.dataset.initialized==='true');
  assert.equal(await share.locator('.article-share-icon:visible').count(),6);
  await share.getByRole('link',{name:'Share on LinkedIn'}).focus();await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').getAttribute('aria-label'),'Share on X');assert.equal(await page.locator(':focus').evaluate(x=>getComputedStyle(x).outlineWidth),'2px');
  assert.equal(new URL(await share.getByRole('link',{name:'Share on LinkedIn'}).getAttribute('href')).searchParams.get('url'),canonical);
  assert.equal(new URL(await share.getByRole('link',{name:'Share on X',exact:true}).getAttribute('href')).searchParams.get('url'),canonical);
  assert.equal(new URL(await share.getByRole('link',{name:'Share by email'}).getAttribute('href')).searchParams.get('body'),canonical);
  await share.getByRole('button',{name:'Copy article link',exact:true}).click();await share.locator('[data-share-status]').filter({hasText:'Link copied.'}).waitFor();assert.equal(await page.evaluate(()=>window.testCopied.at(-1)),canonical);
  const popupPromise=page.waitForEvent('popup');await share.getByRole('link',{name:'Copy article link and open Primal'}).click();const popup=await popupPromise;await popup.waitForLoadState();assert.equal(popup.url(),'https://primal.net/home');await popup.close();await page.bringToFront();assert.equal(await page.evaluate(()=>window.testCopied.at(-1)),canonical);assert.match(await share.locator('[data-share-status]').textContent(),/Paste it into a new Primal post/);
  await share.getByRole('button',{name:'More sharing options'}).click();assert.equal(await page.evaluate(()=>window.testShares[0].url),canonical);
  await page.evaluate(()=>{window.testShareCancel=true;document.querySelector('[data-share-status]').textContent=''});await share.getByRole('button',{name:'More sharing options'}).click();assert.equal(await share.locator('[data-share-status]').textContent(),'');
  await page.evaluate(()=>{window.testCopyFails=true});await share.getByRole('button',{name:'Copy article link',exact:true}).click();await share.locator('[data-share-fallback]').waitFor();assert.equal(await share.getByRole('textbox',{name:'Article link to copy'}).inputValue(),canonical);
  const related=page.locator('.writing-post-keep-grid');assert.equal(await related.locator('.article-card').count(),3);assert.equal(await related.locator('img').count(),0);assert.equal(await related.locator('h3.article-card-title').count(),3);
  await page.goto(`${base}/writing/`,{waitUntil:'networkidle'});const cards=page.locator('.writing-posts-grid .article-card');assert.equal(await cards.count(),expectedArticleCount);assert.equal(await cards.locator('img').count(),0);assert.equal(await cards.locator('h2.article-card-title').count(),expectedArticleCount);await cards.first().locator('a').focus();await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').evaluate(x=>x.classList.contains('article-card-link')),true);assert.equal(await page.locator(':focus').evaluate(x=>getComputedStyle(x).outlineWidth),'2px');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  await page.getByRole('link').filter({has:page.getByRole('heading',{name:'Calculating AI automation ROI for a small business',exact:true})}).click();await page.locator('h1').filter({hasText:'Calculating AI automation ROI'}).waitFor();
  await page.goto(`${base}/games/`,{waitUntil:'networkidle'});assert.equal(await page.locator('.writing-posts-grid').evaluate(x=>getComputedStyle(x).gridTemplateColumns.split(' ').length),width===390?1:4);
  await context.close();
  const plain=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:false});const p=await plain.newPage();await p.goto(`${base}/writing/${slug}/`);assert.equal(await p.locator('article-share .article-share-icon:visible').count(),4);assert.equal(await p.getByRole('link',{name:'Open Primal',exact:true}).count(),1);assert.match(await p.locator('article-share noscript').textContent(),/copy this page/);assert.equal(await p.locator('.article-card img').count(),0);await plain.close();
  console.log(`${width}px: share URLs, clipboard, denied fallback, Primal opening, native share/cancel, cards/navigation and noJS PASS`);
 }
}finally{await browser.close()}
