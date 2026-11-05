import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'electron-vite';
import type { Plugin } from 'vite';
import { buildCsp } from './electron/shared/csp';

const injectProductionCsp = (): Plugin => ({
  name: 'clippyx-inject-production-csp',
  apply: 'build',
  transformIndexHtml: () => [
    {
      tag: 'meta',
      attrs: { 'http-equiv': 'Content-Security-Policy', content: buildCsp({ isDev: false }) },
      injectTo: 'head-prepend',
    },
  ],
});

export default defineConfig({
  main: {
    build: {
      rollupOptions: { input: { index: resolve(__dirname, 'electron/main/index.ts') } },
    },
  },
  preload: {
    build: {
      rollupOptions: {
        input: { index: resolve(__dirname, 'electron/preload/index.ts') },
        output: { format: 'cjs', entryFileNames: '[name].cjs' },
      },
    },
  },
  renderer: {
    root: resolve(__dirname, 'src'),
    plugins: [react(), injectProductionCsp()],
    build: {
      rollupOptions: { input: { index: resolve(__dirname, 'src/index.html') } },
    },
  },
});
