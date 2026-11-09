// Temporary compatibility entrypoint for the legacy build during migration.
import { mkdirSync, writeFileSync } from 'node:fs';
import { readWritingPosts } from '../src/lib/writing-source.mjs';
const posts = readWritingPosts();
mkdirSync('src/generated', { recursive: true });
writeFileSync('src/generated/writing-posts.json', JSON.stringify(posts, null, 2)+'\n');
console.log('Wrote '+posts.length+' writing posts');
