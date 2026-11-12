import { defineCollection, z } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { readWritingPosts } from './lib/writing-source.mjs';
import type { Loader } from 'astro/loaders';

function localCollection(name: string, source: string, read: () => Promise<Record<string, unknown>[]>, directory = false): Loader {
  return {
    name,
    async load(context) {
      const reload = async () => {
        const entries = await read();
        const seen = new Set<string>();
        const parsed = [];
        for (const entry of entries) {
          const id = String(entry.slug || '');
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new Error(`${name}: invalid slug ${id}`);
          if (seen.has(id)) throw new Error(`${name}: duplicate slug ${id}`);
          seen.add(id);
          const data = await context.parseData({ id, data: entry });
          parsed.push({ id, data, digest: context.generateDigest(entry) });
        }
        context.store.clear();
        for (const entry of parsed) context.store.set(entry);
      };
      await reload();
      const absolute = resolve(source);
      context.watcher?.add(absolute);
      const onChange = async (path: string) => {
        const changed = resolve(path);
        if ((directory && changed.startsWith(`${absolute}/`) && changed.endsWith('.md')) || changed === absolute) {
          try { await reload(); } catch (error) { context.logger.error(String(error)); }
        }
      };
      for (const event of ['add', 'change', 'unlink'] as const) context.watcher?.on(event, onChange);
    },
  };
}
const writing = defineCollection({
  loader: localCollection('writing-markdown', 'content/writing', async () => readWritingPosts(), true),
  schema: z.object({
    slug: z.string(), title: z.string().min(1), description: z.string().min(1), cardSummary: z.string().optional(), intro: z.string().min(1),
    date: z.string(), displayDate: z.string(), readTime: z.string(), tags: z.array(z.string()),
    author: z.string(), thumbnail: z.string(), ogImage: z.string(), html: z.string(),
  }),
});
const newsletter = defineCollection({
  loader: localCollection('newsletter-archive', 'public/newsletter-issues.json', async () => {
    const payload = JSON.parse(await readFile('public/newsletter-issues.json', 'utf8'));
    if (!Array.isArray(payload.items)) throw new Error('Newsletter archive must have an items array');
    return payload.items;
  }),
  schema: z.object({
    id: z.string(), slug: z.string(), path: z.string(), title: z.string().min(1),
    description: z.string(), seoTitle: z.string(), seoDescription: z.string(), subtitle: z.string(),
    intro: z.string(), thumbnail: z.string(), ogImage: z.string(), webUrl: z.string(),
    published: z.string(), displayDate: z.string(), authors: z.array(z.string()), tags: z.array(z.string()),
    readTime: z.string(), noindex: z.boolean(), hasEssay: z.boolean(), html: z.string(),
  }),
});
export const collections = { writing, newsletter };
