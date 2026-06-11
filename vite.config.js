import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function safeChunkName(value = '') {
  return value
    .replace(/\.jsx?$/i, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);
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
          if (normalizedId.includes('node_modules/react') || normalizedId.includes('node_modules/react-dom')) return 'vendor-react';
          if (normalizedId.includes('node_modules/firebase')) return 'vendor-firebase';
          if (normalizedId.includes('node_modules/pdfjs-dist')) return 'vendor-pdf';
          if (normalizedId.includes('node_modules/jszip')) return 'vendor-zip';

          if (normalizedId.includes('/src/data/caseBank/cases-part-')) {
            const match = normalizedId.match(/cases-part-(\d+)\.js$/);
            return match ? `case-bank-${match[1]}` : 'case-bank';
          }
          if (normalizedId.includes('/src/data/cases.js')) return 'case-bank-index';

          if (normalizedId.includes('/src/data/tusGlossary')) {
            const fileName = normalizedId.split('/').pop() || 'glossary-data';
            return `glossary-${safeChunkName(fileName)}`;
          }
          if (normalizedId.includes('/src/components/GlossaryTooltip.full.jsx') || normalizedId.includes('/src/utils/glossary.js')) {
            return 'glossary-core';
          }

          if (normalizedId.includes('/src/data/tusPearlCards.js')) return 'pearl-bank';
          return undefined;
        },
      },
    },
  },
});
