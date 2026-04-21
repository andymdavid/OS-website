/**
 * Post-build script that injects per-route meta tags AND fallback body content
 * into static HTML files. This ensures crawlers that don't execute JavaScript
 * still see meaningful page content (avoiding soft-404 signals).
 */
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://otherstuff.ai';
const SITE_NAME = 'Other Stuff';
const DEFAULT_OG_IMAGE = '/og-default.png';

const pages = [
  {
    path: '/',
    title: 'AI-First Product Studio — Perth, Australia',
    description: 'Perth-based AI product studio helping Australian businesses build practical AI capability. Hands-on workshops, ongoing support, and open-source tools.',
    ogImage: DEFAULT_OG_IMAGE,
    body: `
      <h1>Build practical AI capability inside your business.</h1>
      <p>We help SMEs figure out how to use AI in a way that actually works for people, so your team moves faster and your business runs smarter.</p>
      <h2>How We Can Help</h2>
      <h3><a href="/speedrun">Speedrun Workshop</a></h3>
      <p>A 3-hour hands-on AI workshop for teams and SMEs. Build practical tools with AI agents — no coding required.</p>
      <h3><a href="/marginal-gains">Marginal Gains Club</a></h3>
      <p>Ongoing AI capability development for Australian SMEs. Monthly working sessions, shared learning, and hands-on support.</p>
      <h3><a href="/levelup">Level Up Workshop</a></h3>
      <p>A 90-minute AI workshop for high school students. Students learn how AI works by building their own game.</p>
      <h2><a href="/about">About Other Stuff</a></h2>
      <p>Perth-based AI product studio founded by Pete Winn and Andy David. We help Australian organisations build practical AI capability through hands-on experience.</p>
      <p>Other Stuff Pty Ltd — City Beach, Perth, Western Australia 6015</p>
      <p><a href="mailto:info@otherstuff.studio">info@otherstuff.studio</a></p>
    `,
  },
  {
    path: '/speedrun',
    title: 'Speedrun — AI Workshop for Business Teams | Perth',
    description: 'A private 3-hour AI workshop for Perth businesses, teams, and small business operators. Build practical tools and workflows with AI agents in a hands-on session.',
    ogImage: '/og-speedrun.png',
    body: `
      <h1>Speedrun — AI Workshop for Business Teams in Perth</h1>
      <p>Speedrun is a private 3-hour hands-on AI workshop for Perth businesses, teams, and small business operators. Your team builds practical tools and workflows with AI agents, with no technical background required.</p>
      <p>Unlike a standard training course or presentation, Speedrun is a workshop where participants work directly with AI coding agents to build a working application from scratch for their business.</p>
      <h2>What You'll Build</h2>
      <p>Participants build a working Kanban-style task application using AI coding agents. In Speedrun Applied, that same tool is extended into a simple operational workflow where an AI agent begins carrying out tasks.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>Do we need a technical background to take part?</h3>
      <p>No. Speedrun is designed for founders, operators, and team leads without a technical background.</p>
      <h3>What exactly do we build during the session?</h3>
      <p>In Speedrun, participants build a working Kanban-style task application using AI coding agents.</p>
      <h3>How is this different from a standard AI training session?</h3>
      <p>Speedrun is built around hands-on workshop delivery for business teams. Participants work with coding and task-based AI agents to build and run structured systems.</p>
      <p><a href="mailto:info@otherstuff.studio">Get in touch to book a private AI workshop for your team</a></p>
    `,
  },
  {
    path: '/levelup',
    title: 'Level Up — AI Incursion for Schools | Perth WA',
    description: 'A 90-minute AI incursion for Perth and WA schools. Students build a game with AI in a practical school workshop and STEM learning session with no coding required.',
    ogImage: '/og-levelup.png',
    body: `
      <h1>Level Up — AI Workshop &amp; Incursion for Schools in Perth</h1>
      <p>Level Up is a 90-minute AI workshop and school incursion for Perth and Western Australia schools. Students build their own game using AI with no coding required.</p>
      <p>Available as a school incursion across Perth and Western Australia. Book a practical AI and STEM incursion for your school and give students hands-on experience with AI.</p>
      <h2>How It Works</h2>
      <p>Students work hands-on with AI tools to build a playable game during the session, gaining practical understanding of how AI works.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What age range is Level Up designed for?</h3>
      <p>Level Up is designed for junior to middle high school students. The workshop supports mixed abilities and does not require any prior coding or technical experience.</p>
      <h3>What do students need to participate?</h3>
      <p>Students need access to a laptop or desktop computer and an internet connection. The workshop is designed to work with standard school devices.</p>
      <h3>What happens after the workshop?</h3>
      <p>Students leave with a playable game they've built and a practical understanding of how AI works.</p>
      <p><a href="mailto:info@otherstuff.studio">Talk to us about bringing Level Up to your school</a></p>
    `,
  },
  {
    path: '/marginal-gains',
    title: 'Marginal Gains — Ongoing AI Capability for Small Business | Perth',
    description: 'Ongoing AI capability building for Perth small business teams and SMEs. Develop internal AI champions and apply agents to real work each month.',
    ogImage: '/og-marginal-gains.png',
    body: `
      <h1>Marginal Gains — Ongoing AI Capability for Small Business in Perth</h1>
      <p>Marginal Gains is ongoing AI capability building for Perth small business teams and SMEs. Build internal AI capability through monthly hands-on sessions, shared learning, and ongoing support from Other Stuff.</p>
      <p>Develop AI champions inside your business who can build, test, and guide AI adoption over time. Marginal Gains provides the structured support that one-off workshops cannot.</p>
      <h2>How It Works</h2>
      <p>Members participate in monthly working sessions and periodic in-person gatherings. Between sessions, they apply what they are building to real work inside the business.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>Who is Marginal Gains for?</h3>
      <p>Marginal Gains is designed for key people inside small businesses and SMEs who are responsible for shaping how AI is used in the business.</p>
      <h3>Do participants need to be technical?</h3>
      <p>No. Marginal Gains is built for mixed-capability teams. The emphasis is on practical application, not coding expertise.</p>
      <h3>What does success look like?</h3>
      <p>Success looks like AI capability sitting inside your business. Your team understands how to build with agents and evaluate where they add value.</p>
      <p><a href="mailto:info@otherstuff.studio">Get in touch to join Marginal Gains</a></p>
    `,
  },
  {
    path: '/about',
    title: 'About — AI Product Studio in Perth, Western Australia',
    description: 'Perth-based AI product studio founded by Pete Winn and Andy David. We help Australian organisations build practical AI capability through hands-on experience.',
    ogImage: DEFAULT_OG_IMAGE,
    body: `
      <h1>About Other Stuff — AI Product Studio in Perth, Western Australia</h1>
      <p>We are an AI-first product studio that helps organisations build practical internal AI capability.</p>
      <p>Other Stuff works with businesses to help their teams understand and apply AI, developing practical internal capability over time.</p>
      <h2>Our Team</h2>
      <h3>Pete Winn — Co-Founder</h3>
      <p>Pete has a long track record in process redesign, deep tech and large enterprise and programme deployments from Rolls Royce to Rio Tinto.</p>
      <h3>Andy David — Co-Founder</h3>
      <p>Andy's background is in venture design, management consulting and technology startups, including process improvement for enterprise and SMEs.</p>
      <p>Other Stuff Pty Ltd — City Beach, Perth, Western Australia 6015</p>
      <p><a href="mailto:info@otherstuff.studio">info@otherstuff.studio</a></p>
    `,
  },
  {
    path: '/the-good-stuff',
    title: 'The Good Stuff — AI Podcast from Perth',
    description: 'An Australian AI podcast with Pete Winn and Andy David exploring everyday experiences working with AI and how it\'s changing work, business, and human potential.',
    ogImage: DEFAULT_OG_IMAGE,
    body: `
      <h1>The Good Stuff — AI Podcast from Perth</h1>
      <p>A low-fi dialogue with Pete Winn and Andy David exploring everyday experiences working with artificial intelligence, and how it's changing the rules of work, business, entrepreneurship, the economy and human potential.</p>
      <p><a href="https://www.youtube.com/@OtherStuffAI">Watch on YouTube</a></p>
    `,
  },
  {
    path: '/games',
    title: 'Games Built with AI',
    description: 'Playable games built with AI by Other Stuff in Perth — examples of what\'s possible when you use AI tools to build quickly and experiment freely.',
    ogImage: DEFAULT_OG_IMAGE,
    body: `
      <h1>Games Built with AI</h1>
      <p>Through our hands-on work with AI, we accidentally became a games studio. They're simple, playable examples of what's possible when you use these tools to build quickly, experiment freely, and turn ideas into working software.</p>
    `,
  },
  {
    path: '/terms',
    title: 'Terms of Service',
    description: 'Terms of Service for the Other Stuff website. Rules, limitations, and legal framework for using otherstuff.ai.',
    ogImage: DEFAULT_OG_IMAGE,
    body: `
      <h1>Terms of Service</h1>
      <p>Terms of Service for the Other Stuff website and services provided by Other Stuff Pty Ltd.</p>
    `,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy',
    description: 'Privacy Policy for Other Stuff. How we collect, use, and protect personal information on otherstuff.ai.',
    ogImage: DEFAULT_OG_IMAGE,
    body: `
      <h1>Privacy Policy</h1>
      <p>Privacy Policy for Other Stuff. How we collect, use, and protect personal information on otherstuff.ai.</p>
    `,
  },
];

const distDir = path.join(__dirname, '..', 'dist');
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

for (const page of pages) {
  const fullTitle = page.path === '/'
    ? `${SITE_NAME} | ${page.title}`
    : `${page.title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${page.path}`;
  const imageUrl = `${SITE_URL}${page.ogImage}`;

  const metaTags = `
    <title>${fullTitle}</title>
    <meta name="description" content="${page.description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${fullTitle}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${fullTitle}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${imageUrl}" />`;

  // Replace the existing title and add meta tags after it
  let html = template.replace(
    /<title>.*?<\/title>/,
    metaTags
  );

  // Also update the canonical link if present
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    ''
  );

  // Inject fallback body content for crawlers that don't execute JS
  if (page.body) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"></div>\n    <noscript><main>${page.body}\n    </main></noscript>`
    );
  }

  // Write to the correct directory
  if (page.path === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html);
    console.log(`  ✓ /`);
  } else {
    const dir = path.join(distDir, page.path);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log(`  ✓ ${page.path}`);
  }
}

console.log(`\nPrerendered meta tags for ${pages.length} pages.`);
