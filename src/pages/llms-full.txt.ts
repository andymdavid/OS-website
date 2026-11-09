import { getCollection } from 'astro:content';
import { buildLlmsFullText } from '../lib/llms-content.mjs';
export async function GET() {
  const writing = (await getCollection('writing')).map(entry => entry.data);
  const newsletter = (await getCollection('newsletter')).filter(entry => !entry.data.noindex).map(entry => entry.data);
  return new Response(buildLlmsFullText(writing, newsletter), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
