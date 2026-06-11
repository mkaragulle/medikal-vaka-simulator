import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function normalizeChunkPath(id = '') {
  return id.replace(/\\/g, '/');
}

function chunkNameFromFile(id, prefix) {
  const normalized = normalizeChunkPath(id);
  const fileName = normalized.split('/').pop() || '';
  return `${prefix}-${fileName.replace(/\.js$/, '').replace(/^tusGlossary/, '').replace(/^cases-/, '')}`;
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
          const normalized = normalizeChunkPath(id);

          if (normalized.includes('node_modules/react') || normalized.includes('node_modules/react-dom')) return 'vendor-react';
          if (normalized.includes('node_modules/firebase')) return 'vendor-firebase';
          if (normalized.includes('node_modules/pdfjs-dist')) return 'vendor-pdf';
          if (normalized.includes('node_modules/jszip')) return 'vendor-zip';

          if (normalized.includes('/src/data/caseBank/cases-part-')) {
            return chunkNameFromFile(normalized, 'case-bank');
          }
          if (normalized.endsWith('/src/data/cases.js')) return 'case-bank-index';

          if (normalized.includes('/src/data/tusPearlCards.js')) return 'pearl-bank';

          if (normalized.includes('/src/data/tusGlossary')) {
            return chunkNameFromFile(normalized, 'glossary');
          }
          if (normalized.includes('/src/components/GlossaryTooltip.full.jsx') || normalized.includes('/src/utils/glossary.js')) {
            return 'glossary-core';
          }

          return undefined;
        },
      },
    },
  },
});
