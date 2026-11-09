import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';

await mkdir('public/optimized', { recursive: true });
const images = [
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
