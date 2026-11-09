import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/postcss';
import { fileURLToPath } from 'node:url';

// Separate pilot output until all production routes have migrated.
export default defineConfig({
  site: 'https://otherstuff.ai',
  output: 'static',
  outDir: './dist-astro',
  integrations: [react()],
  vite: { css: { postcss: { plugins: [tailwindcss()] } }, resolve: { alias: { 'tailwindcss': fileURLToPath(new URL('./node_modules/tailwindcss/index.css', import.meta.url)), '@': fileURLToPath(new URL('./src', import.meta.url)) } } },
});
