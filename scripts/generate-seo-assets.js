const fs = require('fs');
const path = require('path');
const { buildSitemapXml, buildLlmsText, buildLlmsFullText } = require('./seo-config.cjs');

const publicDir = path.join(__dirname, '..', 'public');

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), buildSitemapXml());
fs.writeFileSync(path.join(publicDir, 'llms.txt'), buildLlmsText());
fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), buildLlmsFullText());

console.log('SEO assets updated: public/sitemap.xml, public/llms.txt, public/llms-full.txt');
