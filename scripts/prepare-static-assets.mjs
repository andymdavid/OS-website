import { readFile, readdir } from 'node:fs/promises';

// Original stable filenames remain available to legacy pages and external links.
export async function prepareStaticAssets(fingerprint) {
  const used = new Set();
  async function scan(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isDirectory()) await scan(path);
      else if (entry.name.endsWith('.astro')) {
        const source = await readFile(path, 'utf8');
        for (const match of source.matchAll(/\/optimized\/[\w.-]+\.(?:webp|png|svg)/g)) used.add(match[0]);
      }
    }
  }
  await scan('src');
  for (const name of await readdir('public/optimized')) if (name.startsWith('writing-') || name.startsWith('automation-')) used.add(`/optimized/${name}`);
  const paths = [
    '/favicon-48x48.png', '/apple-touch-icon.png', '/primal-logo-white.svg',
    '/wingman-mark-white.png', '/logos/home-duplicate/plantrite.svg',
    ...[...used].sort(),
  ];
  const assets = {};
  for (const source of paths) {
    const filename = source.split('/').pop();
    const extension = filename.split('.').pop();
    assets[source] = await fingerprint(filename.slice(0, -extension.length - 1), extension, await readFile(`public${source}`));
  }
  return assets;
}
