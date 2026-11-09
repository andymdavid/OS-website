import assert from 'node:assert/strict';
import { readFile, writeFile, unlink, access } from 'node:fs/promises';
import { execFileSync, spawnSync } from 'node:child_process';
const fixture = 'content/writing/astro-publishing-check.md';
const newsletterPath = 'public/newsletter-issues.json';
const original = await readFile(newsletterPath, 'utf8');
const archive = JSON.parse(original);
const baseIssue = archive.items[0];
assert.ok(baseIssue, 'Need a representative newsletter fixture');
try { await access(fixture); throw new Error('Publishing fixture already exists'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const build = () => execFileSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], { stdio: 'pipe', timeout: 120000 });
const article = (slug, title) => `---\ntitle: ${title}\nslug: ${slug}\ndescription: Publishing lifecycle verification\nintro: Publishing lifecycle verification\ndate: 2026-01-01\nreadTime: 1 min read\ntags: Verification\n---\nPublishing check body.\n`;
const writeFixtures = async (suffix, title) => {
  await writeFile(fixture, article(`astro-publishing-check${suffix}`, title));
  const issue = { ...baseIssue, id: 'publishing-check', slug: `astro-publishing-check-news${suffix}`, path: `/newsletter/astro-publishing-check-news${suffix}`, title, seoTitle: title, html: '<p>Publishing check body.</p>', noindex: false };
  await writeFile(newsletterPath, JSON.stringify({ ...archive, items: [...archive.items, issue] }));
};
const absent = async path => { await assert.rejects(access(path), { code: 'ENOENT' }); };
try {
  await writeFixtures('', 'Publishing check created');
  build();
  for (const path of ['writing/astro-publishing-check', 'newsletter/astro-publishing-check-news']) assert.match(await readFile(`dist/${path}/index.html`, 'utf8'), /Publishing check created/);
  assert.match(await readFile('dist/sitemap.xml','utf8'), /astro-publishing-check-news/);
  await writeFixtures('', 'Publishing check edited');
  build();
  for (const path of ['writing/astro-publishing-check', 'newsletter/astro-publishing-check-news']) assert.match(await readFile(`dist/${path}/index.html`, 'utf8'), /Publishing check edited/);
  await writeFixtures('-renamed', 'Publishing check renamed');
  build();
  await absent('dist/writing/astro-publishing-check/index.html');
  await absent('dist/newsletter/astro-publishing-check-news/index.html');
  assert.match(await readFile('dist/writing/index.html', 'utf8'), /astro-publishing-check-renamed/);
  assert.match(await readFile('dist/newsletter/index.html', 'utf8'), /astro-publishing-check-news-renamed/);
  await unlink(fixture);
  await writeFile(newsletterPath, original);
  build();
  await absent('dist/writing/astro-publishing-check-renamed/index.html');
  await absent('dist/newsletter/astro-publishing-check-news-renamed/index.html');
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  assert.ok(!sitemap.includes('astro-publishing-check'));
  const existing = (await import('../src/lib/writing-source.mjs')).readWritingPosts()[0];
  await writeFile(fixture, article(existing.slug, 'Duplicate writing slug'));
  let failed = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], { encoding: 'utf8', timeout: 120000 });
  assert.notEqual(failed.status, 0, 'Duplicate writing slug must fail');
  assert.match(failed.stdout + failed.stderr, /[Dd]uplicate writing slug/);
  await unlink(fixture);
  await writeFile(newsletterPath, JSON.stringify({ ...archive, items: [...archive.items, baseIssue] }));
  failed = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], { encoding: 'utf8', timeout: 120000 });
  assert.notEqual(failed.status, 0, 'Duplicate newsletter slug must fail');
  assert.match(failed.stdout + failed.stderr, /duplicate slug/);
  console.log('Writing/newsletter create, edit, slug change, delete, sitemap and duplicate checks pass.');
} finally {
  await unlink(fixture).catch(error => { if (error.code !== 'ENOENT') throw error; });
  await writeFile(newsletterPath, original);
  build();
}
