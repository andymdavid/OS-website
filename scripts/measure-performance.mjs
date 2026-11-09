import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { mkdir, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const [url, label, device = 'mobile', count = '3'] = process.argv.slice(2);
if (!url || !label) throw new Error('Usage: node scripts/measure-performance.mjs <url> <label> [mobile|desktop] [runs]');
const directory = process.env.PERFORMANCE_OUTPUT_DIR || '/tmp/os-performance';
await mkdir(directory, { recursive: true });
for (let run = 1; run <= Number(count); run++) {
  const chrome = await chromeLauncher.launch({
    chromePath: process.env.CHROME_PATH,
    chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader'],
  });
  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: 'json',
      onlyCategories: process.env.PERFORMANCE_ALL_CATEGORIES ? ['performance', 'accessibility', 'best-practices', 'seo', 'agentic-browsing'] : ['performance'],
      ...(device === 'desktop' ? { preset: 'desktop' } : {}),
      blockedUrlPatterns: ['*unpkg.com/nanalytics-tracker*'],
      disableFullPageScreenshot: true,
      maxWaitForLoad: 45000,
      maxWaitForFcp: 30000,
    });
    if (!result) throw new Error('No Lighthouse result');
    const { lhr, report } = result;
    await writeFile(`${directory}/${label}-${device}-${run}.json`, String(report));
    if (process.env.PERFORMANCE_SAVE_TRACE && run === 1) {
      await writeFile(`${directory}/${label}-${device}.trace.json.gz`, gzipSync(JSON.stringify(result.artifacts.Trace)));
      await writeFile(`${directory}/${label}-${device}.network.json.gz`, gzipSync(JSON.stringify(result.artifacts.DevtoolsLog)));
    }
    console.log(JSON.stringify({ label, device, run, score: lhr.categories.performance.score, FCP: lhr.audits['first-contentful-paint'].numericValue, SI: lhr.audits['speed-index'].numericValue, LCP: lhr.audits['largest-contentful-paint'].numericValue, TBT: lhr.audits['total-blocking-time'].numericValue, CLS: lhr.audits['cumulative-layout-shift'].numericValue, bytes: lhr.audits['total-byte-weight'].numericValue, warnings: lhr.runWarnings, error: lhr.runtimeError }));
  } finally {
    await chrome.kill();
  }
}
