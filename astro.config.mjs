import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import homeCriticalCss from './integrations/home-critical-css.mjs';
import tailwindcss from '@tailwindcss/postcss';
import { fileURLToPath } from 'node:url';

// Native static routes; the existing Node service continues to handle /api/.
export default defineConfig({
  site: 'https://otherstuff.ai',
  output: 'static',
  image: { remotePatterns: [{ protocol: 'https', hostname: 'beehiiv-images-production.s3.amazonaws.com' }] },
  outDir: './dist',
  build: { inlineStylesheets: 'auto' },
  integrations: [react(), homeCriticalCss()],
  vite: { build: { assetsInlineLimit: 12000 }, css: { postcss: { plugins: [tailwindcss()] } }, resolve: { alias: { 'tailwindcss': fileURLToPath(new URL('./node_modules/tailwindcss/index.css', import.meta.url)), '@': fileURLToPath(new URL('./src', import.meta.url)) } } },
});
