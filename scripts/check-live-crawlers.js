const baseUrl = (process.env.LIVE_SITE_URL || 'https://otherstuff.ai').replace(/\/$/, '');

const userAgents = [
  ['empty', ''],
  ['curl', 'curl/8.5.0'],
  ['python', 'python-requests/2.31.0'],
  ['googlebot', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'],
  ['bingbot', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/W.X.Y.Z Safari/537.36'],
  ['claudebot', 'ClaudeBot/1.0'],
  ['claude-user', 'Claude-User/1.0'],
  ['gptbot', 'GPTBot/1.0'],
  ['chatgpt-user', 'ChatGPT-User/1.0'],
  ['perplexity', 'PerplexityBot/1.0'],
];

const routes = [
  {
    path: '/',
    mustContain: [
      'Your business has more to give',
      'Wingmen Suite',
      'Our Infrastructure',
    ],
    mustNotContain: [
      '<h2>Core offers</h2>',
    ],
  },
  {
    path: '/about/',
    mustContain: [
      'Commercial framework',
    ],
  },
  {
    path: '/marginal-gains/',
    mustContain: [
      'Wingman is the operating environment',
    ],
  },
  {
    path: '/ai-audit/',
    mustContain: [
      'Free AI Audit',
    ],
  },
  {
    path: '/speedrun/',
    mustContain: [
      'Speedrun',
    ],
  },
  {
    path: '/robots.txt',
    mustContain: [
      'ClaudeBot',
      'GPTBot',
      'PerplexityBot',
    ],
  },
  {
    path: '/llms.txt',
    mustContain: [
      'Other Stuff',
      'Wingmen',
    ],
  },
];

const challengePatterns = [
  /site blocked/i,
  /bot detection/i,
  /attention required/i,
  /just a moment/i,
  /captcha/i,
  /managed challenge/i,
  /cf-chl/i,
];

async function fetchRoute(path, userAgent) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const headers = userAgent ? { 'user-agent': userAgent } : {};
    const response = await fetch(`${baseUrl}${path}`, {
      headers,
      redirect: 'follow',
      signal: controller.signal,
    });
    const body = await response.text();

    return {
      status: response.status,
      cacheControl: response.headers.get('cache-control') || '',
      server: response.headers.get('server') || '',
      body,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  let failed = false;

  for (const [name, userAgent] of userAgents) {
    for (const route of routes) {
      try {
        const result = await fetchRoute(route.path, userAgent);
        const label = `${name} ${route.path}`;
        const signals = [];

        if (result.status !== 200) {
          console.error(`${label}: expected 200, got ${result.status}`);
          failed = true;
        }

        for (const expected of route.mustContain || []) {
          if (!result.body.includes(expected)) {
            console.error(`${label}: missing "${expected}"`);
            failed = true;
          } else {
            signals.push(expected);
          }
        }

        for (const forbidden of route.mustNotContain || []) {
          if (result.body.includes(forbidden)) {
            console.error(`${label}: contains stale text "${forbidden}"`);
            failed = true;
          }
        }

        for (const pattern of challengePatterns) {
          if (pattern.test(result.body)) {
            console.error(`${label}: matched challenge pattern ${pattern}`);
            failed = true;
          }
        }

        console.log(
          `${label}: ${result.status} server=${result.server || '-'} cache=${result.cacheControl || '-'} signals=${signals.length}`,
        );
      } catch (error) {
        console.error(`${name} ${route.path}: ${error.message}`);
        failed = true;
      }
    }
  }

  if (failed) {
    process.exit(1);
  }

  console.log(`Live crawler check passed for ${baseUrl}.`);
}

main();
