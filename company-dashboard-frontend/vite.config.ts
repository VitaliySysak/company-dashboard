import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: './',

  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },

  preview: {
    host: true,
    port: 3000,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },

  build: {
    sourcemap: true,
  },
});
