const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

const checks = [
  {
    route: '/',
    file: path.join(distDir, 'index.html'),
    mustContain: [
      'We put AI to work inside your business',
      'Your business already has the structure AI needs',
      'Automation Partner',
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
      'Ambulando as the shared workspace',
    ],
    mustNotContain: [
      'Wingmen',
      'Wingmen Suite',
    ],
  },
  {
    route: '/ai-automation/',
    file: path.join(distDir, 'ai-automation', 'index.html'),
    mustContain: [
      'grow your margins, free up capital, and reduce risk',
      'Start with Automation Partner',
      'Marginal Gains is the ongoing relationship',
      'Ambulando is the shared workspace',
    ],
    mustNotContain: [
      'Wingmen',
      'Wingmen Suite',
    ],
  },
  {
    route: '/games/',
    file: path.join(distDir, 'games', 'index.html'),
    mustContain: [
      '<title>Games Built with AI | Other Stuff</title>',
      '<meta name="description" content="Playable games built with AI by Other Stuff in Perth.',
      '<link rel="canonical" href="https://otherstuff.ai/games/" />',
      '"@type":"CollectionPage"',
      'Games built with AI',
    ],
    mustNotContain: [
      '<title>Games - OtherStuff</title>',
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
