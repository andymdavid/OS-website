const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

const checks = [
  {
    route: '/',
    file: path.join(distDir, 'index.html'),
    mustContain: [
      'An AI Partner for SMEs',
      'Your business already has the structure AI needs',
      'AI-Native Business Software',
      'Why Wingman',
    ],
    mustNotContain: [
      '<h2>Core offers</h2>',
      'Wingmen',
      'Wingmen Suite',
    ],
  },
  {
    route: '/about/',
    file: path.join(distDir, 'about', 'index.html'),
    mustContain: [
      'builds custom AI systems to improve margins',
      'Commercial framework',
      'Wingman as the operating environment',
    ],
    mustNotContain: [
      'Wingmen',
      'Wingmen Suite',
    ],
  },
  {
    route: '/marginal-gains/',
    file: path.join(distDir, 'marginal-gains', 'index.html'),
    mustContain: [
      'grow your margins, free up capital, and reduce risk',
      'Start with a free AI audit',
      'Marginal Gains is the ongoing relationship',
      'Wingman is the operating environment',
    ],
    mustNotContain: [
      'Wingmen',
      'Wingmen Suite',
    ],
  },
];

let failed = false;

for (const check of checks) {
  if (!fs.existsSync(check.file)) {
    console.error(`Missing crawler HTML for ${check.route}: ${check.file}`);
    failed = true;
    continue;
  }

  const html = fs.readFileSync(check.file, 'utf8');

  for (const expected of check.mustContain || []) {
    if (!html.includes(expected)) {
      console.error(`Crawler HTML for ${check.route} is missing: ${expected}`);
      failed = true;
    }
  }

  for (const forbidden of check.mustNotContain || []) {
    if (html.includes(forbidden)) {
      console.error(`Crawler HTML for ${check.route} still contains stale copy: ${forbidden}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log('Crawler HTML verification passed.');
