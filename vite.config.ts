import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT || '5173'),
    host: '0.0.0.0',
    allowedHosts: true,
  },
  preview: {
    port: parseInt(process.env.PORT || '4173'),
    host: '0.0.0.0',
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
