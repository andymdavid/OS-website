import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';

await mkdir('public/optimized', { recursive: true });
const images = [
  ['Logo-Main-Icon.webp', 'brand-icon', [96, 192]],
  ['home-help-ambulando.webp', 'help-ambulando', [400, 640, 800]],
  ['home-help-automation-partner.webp', 'help-automation-partner', [400, 640, 800]],
  ['home-help-custom-software.webp', 'help-custom-software', [400, 640, 800]],
  ...['inventory', 'proposals', 'briefings', 'reporting'].map(name => [`examples-${name}-landscape.webp`, `example-${name}`, [480, 800]]),
  ...['adapt', 'stakwork', 'rocky-bay'].map(name => [`logos/home-duplicate/${name}.png`, `client-${name}`, [200]]),
  ['Andy-letter.png', 'andy-profile', [64, 128]],
  ['Pete-letter.png', 'pete-profile', [64, 128]],
  ['intelligence-snacks-cassette-clean-v3.png', 'snacks-cassette', [96, 320, 640]],
];
for (const [source, name, widths] of images) {
  for (const width of widths) {
    const target = `public/optimized/${name}-${width}.webp`;
    await sharp(`public/${source}`).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(target);
    console.log(`${source} -> ${target}: ${(await stat(target)).size} bytes`);
  }
}
