import { getCollection } from 'astro:content';
import { absoluteUrl } from '../lib/structured-data';

export async function GET() {
  const templates = Object.keys(import.meta.glob('./**/*.astro'));
  const paths = templates.filter(path => !path.includes('[') && !path.includes('/archive/') && !path.includes('home-duplicate') && !path.endsWith('/404.astro'))
    .map(path => path.replace(/^\.\//, '/').replace(/\.astro$/, '').replace(/\/index$/, '') || '/');
  const writing = (await getCollection('writing')).map(entry => ({ path: `/writing/${entry.id}/`, modified: entry.data.date }));
  const newsletter = (await getCollection('newsletter')).filter(entry => !entry.data.noindex).map(entry => ({ path: entry.data.path, modified: entry.data.published }));
  const entries = [...paths.map(path => ({ path, modified: '' })), { path: '/nstack/', modified: '' }, ...writing, ...newsletter];
  const urls = entries.map(entry => `<url><loc>${absoluteUrl(entry.path)}</loc>${entry.modified && !Number.isNaN(Date.parse(entry.modified)) ? `<lastmod>${new Date(entry.modified).toISOString()}</lastmod>` : ''}</url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, { headers: { 'content-type': 'application/xml' } });
}
