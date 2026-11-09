import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, stat, readdir, unlink } from 'node:fs/promises';
import { basename } from 'node:path';

await mkdir('public/media', { recursive: true });
await mkdir('src/generated', { recursive: true });
const manifest = { images: {}, fonts: {}, styles: {} };
async function fingerprint(name, extension, buffer) {
  const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 12);
  const url = `/media/${name}.${hash}.${extension}`;
  await writeFile(`public${url}`, buffer);
  return url;
}
const sources = [
  ...['ambulando', 'automation-partner', 'custom-software'].map(name => ({ name: `help-${name}`, source: `home-help-${name}.webp`, widths: [320, 400, 560, 640, 800], quality: 76, avif: 58 })),
  ...['inventory', 'proposals', 'briefings', 'reporting'].map(name => ({ name: `example-${name}`, source: `examples-${name}-landscape.webp`, widths: [360, 480, 560, 720, 800, 1120], quality: 62, avif: 43 })),
];
for (const image of sources) {
  manifest.images[image.name] = {};
  for (const width of image.widths) {
    const pipeline = sharp(`public/${image.source}`).resize({ width, withoutEnlargement: true });
    const { data, info } = await pipeline.clone().webp({ quality: image.quality }).toBuffer({ resolveWithObject: true });
    const avif = await pipeline.clone().avif({ quality: image.avif, effort: 5 }).toBuffer();
    manifest.images[image.name][width] = {
      width: info.width, height: info.height,
      webp: await fingerprint(`${image.name}-${width}`, 'webp', data),
      avif: await fingerprint(`${image.name}-${width}`, 'avif', avif),
    };
    console.log(image.name, width, 'WebP', data.length, 'AVIF', avif.length);
  }
}
const google = await readFile('src/fonts.css', 'utf8');
const brand = await readFile('src/brand-fonts.css', 'utf8');
let css = `${brand}\n${google}`;
for (const match of [...css.matchAll(/url\(['"]?(\/fonts\/[^)'"\s]+)['"]?\)/g)]) {
  const source = match[1];
  if (manifest.fonts[source]) continue;
  let disk = `public${source}`;
  if (source.startsWith('/fonts/google/')) {
    const subset = `public/fonts/delivery/${basename(source)}`;
    if (await stat(subset).catch(() => null)) disk = subset;
  }
  const data = await readFile(disk);
  const filename = basename(source);
  const extension = filename.split('.').pop();
  manifest.fonts[source] = await fingerprint(filename.slice(0, -extension.length - 1), extension, data);
}
for (const [source, url] of Object.entries(manifest.fonts)) css = css.replaceAll(source, url);
const caveat = css.match(/@font-face\s*\{[^}]*font-family:\s*'Caveat'[^}]*\}/)?.[0];
if (caveat) {
  manifest.styles.demoFonts = await fingerprint('demo-fonts', 'css', Buffer.from(caveat));
  css = css.replace(caveat, '');
}
await writeFile('src/delivery-fonts.css', css);
await writeFile('src/generated/delivery-assets.json', `${JSON.stringify(manifest, null, 2)}\n`);

const current = new Set([...Object.values(manifest.fonts), ...Object.values(manifest.styles), ...Object.values(manifest.images).flatMap(variants => Object.values(variants).flatMap(v => [v.webp, v.avif]))]);
for (const file of await readdir('public/media')) if (!current.has(`/media/${file}`)) await unlink(`public/media/${file}`);
