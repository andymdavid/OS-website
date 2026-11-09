import { readFile, readdir } from 'node:fs/promises';

// Original stable filenames remain available to legacy pages and external links.
export async function prepareStaticAssets(fingerprint) {
  const paths = [
    '/favicon-48x48.png', '/apple-touch-icon.png', '/primal-logo-white.svg',
    '/wingman-mark-white.png', '/logos/home-duplicate/plantrite.svg',
    ...(await readdir('public/optimized')).filter(name => /\.(webp|png|svg)$/.test(name)).map(name => `/optimized/${name}`),
  ];
  const assets = {};
  for (const source of paths) {
    const filename = source.split('/').pop();
    const extension = filename.split('.').pop();
    assets[source] = await fingerprint(filename.slice(0, -extension.length - 1), extension, await readFile(`public${source}`));
  }
  return assets;
}
