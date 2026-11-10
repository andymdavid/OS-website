import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import Beasties from 'beasties';

// Only transform the homepage. Keep complete external stylesheets cacheable
// for subsequent navigation and for interactive states after first paint.
export default function homeCriticalCss() {
  return {
    name: 'home-critical-css',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const file = new URL('index.html', dir);
        const processor = new Beasties({
          path: fileURLToPath(dir),
          preload: false,
          noscriptFallback: true,
          pruneSource: false,
          reduceInlineStyles: false,
          mergeStylesheets: false,
          fonts: false,
          // Include all navigation states, not only the closed menu in static HTML.
          allowRules: [/nav|mega-|mobile-menu|good-stuff|menu-toggle|hamburger/],
          logLevel: 'warn',
        });
        const html = await readFile(file, 'utf8');
        // Match selectors against the actual header/hero DOM and its ancestors.
        // Temporarily omit secondary content, then restore its original bytes.
        // No viewport wrapper or runtime DOM mutation is needed.
        const sections = new Map();
        let shell = html;
        for (const name of ['main', 'footer']) {
          const start = `<!-- critical-css:${name}:start -->`;
          const end = `<!-- critical-css:${name}:end -->`;
          const from = shell.indexOf(start);
          const to = shell.indexOf(end);
          if (from < 0 || to <= from) throw new Error(`Missing critical CSS boundary: ${name}`);
          const original = shell.slice(from, to + end.length);
          const placeholder = `<!-- home-critical-css:${name} -->`;
          sections.set(placeholder, original);
          shell = shell.replace(original, placeholder);
        }
        let result = await processor.process(shell);
        for (const [placeholder, original] of sections) {
          if (!result.includes(placeholder)) throw new Error('Critical CSS processor lost a content boundary');
          result = result.replace(placeholder, original);
        }
        // Apply completed stylesheets in one task, rather than recalculating
        // layout once per independently arriving section stylesheet.
        const ready = "this.dataset.ready='true';window.dispatchEvent(new Event('os:home-css-ready'))";
        let count = 0;
        result = result.replace(/<head>([\s\S]*?)<\/head>/, (_head, content) => {
          const head = content.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g, link => {
            if (!/href="\/_astro\//.test(link)) return link;
            count++;
            const preload = link.replace('rel="stylesheet"', 'rel="preload" as="style" blocking="render"');
            return `${preload.slice(0, -1)} data-home-css onload="${ready}" onerror="${ready}"><noscript>${link}</noscript>`;
          });
          const apply = `<script>(()=>{const links=[...document.querySelectorAll('link[data-home-css]')];if(location.hash){for(const l of links){l.onload=null;l.onerror=null;l.rel='stylesheet';l.removeAttribute('as');l.removeAttribute('data-home-css')}return}const apply=()=>{if(!links.every(l=>l.dataset.ready==='true'))return;window.removeEventListener('os:home-css-ready',apply);for(const l of links){l.onload=null;l.onerror=null;l.rel='stylesheet';l.removeAttribute('as');l.removeAttribute('data-home-css');l.removeAttribute('data-ready')}};window.addEventListener('os:home-css-ready',apply);apply()})()</script>`;
          return `<head>${head}${apply}</head>`;
        });
        if (!count) throw new Error('No homepage stylesheets found for critical CSS delivery');
        await writeFile(file, result);
      },
    },
  };
}
