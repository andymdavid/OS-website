import sharp from 'sharp';
import { mkdir, stat, readdir } from 'node:fs/promises';

await mkdir('public/optimized', { recursive: true });
const images = [
  ...['improvement-loop', 'multiple-loops', 'monthly-cycle'].map(name => [`automation-${name}.webp`, `automation-${name}`, [400, 640, 800, 1280]]),
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
for (const name of await readdir('public')) {
  if (/^writing-.+\.webp$/.test(name) && !/-\d+\.webp$/.test(name)) images.push([name, name.replace('.webp', ''), [400, 640, 960, 1456]]);
}
for (const [source, name, widths] of images) {
  for (const width of widths) {
    const target = `public/optimized/${name}-${width}.webp`;
    await sharp(`public/${source}`).resize({ width, withoutEnlargement: true }).webp({ quality: name.startsWith('writing-') ? 72 : name.startsWith('automation-') ? 76 : 82 }).toFile(target);
    console.log(`${source} -> ${target}: ${(await stat(target)).size} bytes`);
  }
}

await mkdir('src/assets', { recursive: true });
await sharp('public/footer-gradient.png').resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile('src/assets/footer-gradient.webp');
