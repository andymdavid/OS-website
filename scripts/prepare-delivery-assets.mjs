import { prepareStaticAssets } from './prepare-static-assets.mjs';
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, stat, readdir, unlink } from 'node:fs/promises';
import { basename } from 'node:path';

await mkdir('public/media', { recursive: true });
await mkdir('src/generated', { recursive: true });
const manifest = { images: {}, fonts: {}, fontFallbacks: {}, styles: {} };
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
// Explicit font/icon-only refresh: keep the committed image derivatives when
// image sources/settings have not changed. Default invocation rebuilds images.
const reuseImages = process.argv.includes('--reuse-images');
if (reuseImages) {
  manifest.images = JSON.parse(await readFile('src/generated/delivery-assets.json', 'utf8')).images;
  for (const variants of Object.values(manifest.images)) for (const variant of Object.values(variants)) {
    await stat(`public${variant.webp}`);
    await stat(`public${variant.avif}`);
  }
}
for (const image of reuseImages ? [] : sources) {
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
  if (source.startsWith('/fonts/google/') || /\/Alfabet-(Regular|Black)\.woff2$/.test(source)) {
    const subset = `public/fonts/delivery/${basename(source)}`;
    if (await stat(subset).catch(() => null)) disk = subset;
  }
  const data = await readFile(disk);
  const filename = basename(source);
  const extension = filename.split('.').pop();
  manifest.fonts[source] = await fingerprint(filename.slice(0, -extension.length - 1), extension, data);
}
for (const [source, url] of Object.entries(manifest.fonts)) css = css.replaceAll(source, url);
const brandCoverage = JSON.parse(await readFile('public/fonts/delivery/brand-coverage.json', 'utf8'));
for (const [name, coverage] of Object.entries(brandCoverage)) {
  const family = name.replace('-', ' ');
  const face = css.match(new RegExp(`@font-face\\s*\\{[^}]*font-family:\\s*'${family}'[^}]*\\}`))?.[0];
  if (!face) throw new Error(`Missing brand font face: ${family}`);
  const source = `/fonts/${name}.woff2`;
  const full = await fingerprint(`${name}-extended`, 'woff2', await readFile(`public${source}`));
  manifest.fontFallbacks[source] = full;
  const subsetFace = face.replace(/\}$/, `  unicode-range: ${coverage.latin};\n}`);
  const fallbackFace = face.replace(manifest.fonts[source], full).replace(/\}$/, `  unicode-range: ${coverage.fallback};\n}`);
  css = css.replace(face, `${subsetFace}\n${fallbackFace}`);
}
const caveat = css.match(/@font-face\s*\{[^}]*font-family:\s*'Caveat'[^}]*\}/)?.[0];
if (caveat) {
  manifest.styles.demoFonts = await fingerprint('demo-fonts', 'css', Buffer.from(caveat));
  css = css.replace(caveat, '');
}
manifest.assets = await prepareStaticAssets(fingerprint);
await writeFile('src/delivery-fonts.css', css);
await writeFile('src/generated/delivery-assets.json', `${JSON.stringify(manifest, null, 2)}\n`);

const current = new Set([...Object.values(manifest.assets), ...Object.values(manifest.fonts), ...Object.values(manifest.fontFallbacks), ...Object.values(manifest.styles), ...Object.values(manifest.images).flatMap(variants => Object.values(variants).flatMap(v => [v.webp, v.avif]))]);
for (const file of await readdir('public/media')) if (!current.has(`/media/${file}`)) await unlink(`public/media/${file}`);
