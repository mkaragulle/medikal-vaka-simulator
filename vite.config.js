import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function safeChunkName(value) {
  return value
    .replace(/\.jsx?$/, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
    cssMinify: true,
    chunkSizeWarningLimit: 2200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/');

          if (normalizedId.includes('/node_modules/react/') || normalizedId.includes('/node_modules/react-dom/')) return 'vendor-react';
          if (normalizedId.includes('/node_modules/firebase/')) return 'vendor-firebase';
          if (normalizedId.includes('/node_modules/pdfjs-dist/')) return 'vendor-pdf';
          if (normalizedId.includes('/node_modules/jszip/')) return 'vendor-zip';

          if (/\/src\/data\/cases\.part\d+\.js$/.test(normalizedId)) {
            const fileName = normalizedId.split('/').pop();
            const match = fileName.match(/cases\.part(\d+)\.js$/);
            return match ? `case-bank-${match[1]}` : `case-bank-${safeChunkName(fileName)}`;
          }

          if (normalizedId.endsWith('/src/data/cases.js')) return 'case-bank-index';
          if (normalizedId.endsWith('/src/data/tusPearlCards.js')) return 'pearl-bank';

          if (/\/src\/data\/tusGlossary.*\.js$/.test(normalizedId)) {
            const fileName = normalizedId.split('/').pop();
            return `glossary-${safeChunkName(fileName).replace(/^tusGlossary/, '')}`;
          }

          if (normalizedId.includes('/src/components/GlossaryTooltip.full.jsx') || normalizedId.includes('/src/utils/glossary.js')) {
            return 'glossary-core';
          }

          return undefined;
        },
      },
    },
  },
});
