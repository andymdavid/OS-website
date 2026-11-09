import { chromium } from '@playwright/test';
const baseUrl = process.env.ASTRO_PREVIEW_URL || 'http://127.0.0.1:4567';
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 for(const setup of [{name:'mobile',viewport:{width:390,height:844}},{name:'desktop',viewport:{width:1440,height:1000}},{name:'no-js',viewport:{width:390,height:844},javaScriptEnabled:false}]){
  const context=await browser.newContext({...setup,reducedMotion:'reduce'});
  await context.route(/unpkg.com|fonts.googleapis.com|fonts.gstatic.com/,route=>route.abort());
  const page=await context.newPage(); page.setDefaultTimeout(15000); const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${baseUrl}/`,{waitUntil:'domcontentloaded'});
  await page.locator('h1').waitFor({state:'visible'});
  if(await page.locator('h1').innerText()!=='We put AI to work inside your business.') throw Error('Homepage headline missing');
  if(!(await page.locator('a.hero-cta-book').getAttribute('href')).includes('cal.com'))throw Error('Booking link missing');
  if(setup.name!=='no-js'){
   const faq=page.locator('.faq-home-question').first();await faq.scrollIntoViewIfNeeded();await faq.click();await page.waitForFunction(()=>document.querySelector('.faq-home-question')?.getAttribute('aria-expanded')==='true',null,{timeout:15000});
  }
  if(setup.name!=='no-js') {
   let submitted=false;
   await page.route('**/api/subscribe', async route => {
    const payload=route.request().postDataJSON();
    if(payload.email!=='astro-check@example.invalid')throw Error('Unexpected subscription payload');
    submitted=true;
    await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true})});
   });
   const footer=page.locator('footer');
   await footer.scrollIntoViewIfNeeded();
   await page.waitForFunction(()=>document.querySelector('footer')?.closest('astro-island')?.hasAttribute('ssr') === false, null, {timeout:15000});
   await footer.locator('input[type=email]').fill('astro-check@example.invalid');
   await footer.locator('button[type=submit]').click();
   await page.waitForFunction(()=>document.querySelector('footer [role=alert]')?.textContent?.includes('Thanks!'),null,{timeout:15000});
   if(!submitted)throw Error('Mock subscription request missing');
  }
  await page.goto(`${baseUrl}/writing/where-custom-ai-systems-create-margin-first/`,{waitUntil:'domcontentloaded'});
  await page.locator('h1').waitFor({state:'visible'});
  if(await page.locator('.writing-post-content p').count()<2)throw Error('Article content missing');
  if(errors.length)throw Error(errors.join('\n'));
  console.log(setup.name+': homepage, booking href, article content'+(setup.name==='no-js'?'':' and FAQ hydration')+' PASS');
  await context.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
