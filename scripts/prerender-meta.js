/**
 * Post-build script that injects per-route meta tags and fallback body content
 * into static HTML files. This improves search crawler coverage for the SPA.
 */
const fs = require('fs');
const path = require('path');
const {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  escapeXml,
  getPrerenderPages,
  buildSitemapXml,
  buildLlmsText,
} = require('./seo-config.cjs');

const pages = getPrerenderPages();
const distDir = path.join(__dirname, '..', 'dist');
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

function resolveImageUrl(image) {
  if (image && /^https?:\/\//.test(image)) {
    return image;
  }

  return `${SITE_URL}${image || DEFAULT_OG_IMAGE}`;
}

function serializeJsonLd(schema) {
  return JSON.stringify(schema)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

for (const page of pages) {
  const fullTitle = page.path === '/'
    ? `${SITE_NAME} | ${page.title}`
    : `${page.title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${page.path}`;
  const imageUrl = resolveImageUrl(page.ogImage);
  const ogType = page.ogType || (
    page.path.startsWith('/writing/') || page.path.startsWith('/newsletter/')
      ? 'article'
      : 'website'
  );
  const schemaTags = page.schema
    ? (Array.isArray(page.schema) ? page.schema : [page.schema])
        .map((schema) => `\n    <script type="application/ld+json">${serializeJsonLd(schema)}</script>`)
        .join('')
    : '';
  const metaTags = `
    <title>${escapeXml(fullTitle)}</title>
    <meta name="description" content="${escapeXml(page.description)}" />
    <link rel="canonical" href="${url}" />
    ${page.noindex ? '<meta name="robots" content="noindex, follow" />' : ''}
    <meta property="og:title" content="${escapeXml(fullTitle)}" />
    <meta property="og:description" content="${escapeXml(page.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    ${page.publishedTime ? `<meta property="article:published_time" content="${escapeXml(page.publishedTime)}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeXml(fullTitle)}" />
    <meta name="twitter:description" content="${escapeXml(page.description)}" />
    <meta name="twitter:image" content="${imageUrl}" />${schemaTags}`;

  let html = template.replace(/<meta name="description" content="[^"]*" \/>/, '');
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, '');
  html = html.replace(/<title>.*?<\/title>/, metaTags);

  if (page.body) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"></div>\n    <noscript><main>${page.body}\n    </main></noscript>`,
    );
  }

  if (page.path === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html);
    console.log('  ✓ /');
  } else {
    const dir = path.join(distDir, page.path);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log(`  ✓ ${page.path}`);
  }
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemapXml());
fs.writeFileSync(path.join(distDir, 'llms.txt'), buildLlmsText());

console.log(`\nPrerendered meta tags for ${pages.length} pages.`);
