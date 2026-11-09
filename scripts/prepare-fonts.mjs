// Download Latin subsets from Google Fonts; keep the matching OFL licences.
// Fonts remain separate files so the browser only downloads families used on a page.
import { mkdir, writeFile } from 'node:fs/promises';
const fonts = [
  ['Geist', '400..700', 'geist'], ['Inter', '400..700', 'inter'],
  ['Figtree', '400..700', 'figtree'], ['Caveat', '400..500', 'caveat'],
  ['Cormorant Garamond', '300..400', 'cormorantgaramond'],
  ['Anton', '400', 'anton'], ['Bungee', '400', 'bungee'],
  ['Jersey 10', '400', 'jersey10'], ['Silkscreen', '400', 'silkscreen'],
];
await mkdir('public/fonts/google', { recursive: true });
let css = '/* Self-hosted Latin subsets. Licences: /fonts/google/*-OFL.txt. */\n';
async function get(url) {
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' } });
  if (!response.ok) throw new Error(`${response.status} fetching ${url}`);
  return response;
}
for (const [family, weights, slug] of fonts) {
  const source = await (await get(`https://fonts.googleapis.com/css2?family=${family.replaceAll(' ', '+')}:wght@${weights}&display=swap`)).text();
  const latin = source.match(/\/\* latin \*\/\s*(@font-face\s*\{[^}]+\})/);
  if (!latin) throw new Error(`Missing Latin subset for ${family}`);
  const remote = latin[1].match(/url\(([^)]+)\)/)[1];
  const file = `${slug}-latin.woff2`;
  await writeFile(`public/fonts/google/${file}`, Buffer.from(await (await get(remote)).arrayBuffer()));
  await writeFile(`public/fonts/google/${slug}-OFL.txt`, await (await get(`https://raw.githubusercontent.com/google/fonts/main/ofl/${slug}/OFL.txt`)).text());
  css += latin[1].replace(remote, `/fonts/google/${file}`) + '\n';
  console.log(`${family}: ${file}`);
}
await writeFile('src/fonts.css', css);
