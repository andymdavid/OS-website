import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { readWritingPosts } from '../src/lib/writing-source.mjs';
const posts = readWritingPosts();
const home = await readFile('dist/index.html', 'utf8');
assert.match(home, /<h1[^>]*>We put AI to work inside your business\.<\/h1>/);
assert.match(home, /<a[^>]*href="https:\/\/cal\.com\/other-stuff\/discovery"[^>]*class="[^"]*hero-cta-book/);
assert.ok(!home.includes('src="/assets/index-'), 'Legacy SPA entry must not be required');
assert.match(home, /<link rel="canonical" href="https:\/\/otherstuff\.ai\/"/);
assert.ok(home.includes('/optimized/snacks-cassette-96.webp'));
assert.ok(!home.includes('src="/Andy-letter.png"') && !home.includes('src="/Pete-letter.png"'));
for (const post of posts) {
  const html = await readFile(`dist/writing/${post.slug}/index.html`, 'utf8');
  const main = html.slice(html.indexOf('<main>'), html.indexOf('</main>'));
  assert.ok(main.includes(post.title), `${post.slug}: native title`);
  assert.match(main, /<p>/, `${post.slug}: native article paragraphs`);
  assert.ok(html.includes(`https://otherstuff.ai/writing/${post.slug}/`));
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.ok(scripts.some(([,json]) => JSON.parse(json)['@type'] === 'BlogPosting'));
}
console.log(`Astro homepage and ${posts.length} article HTML checks passed.`);
