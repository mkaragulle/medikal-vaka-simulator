import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function normalizeId(id) {
  return id.replace(/\\/g, '/');
}

function chunkNameFromFile(id, prefix) {
  const fileName = id.split('/').pop()?.replace(/\.js$/, '')?.replace(/[^a-zA-Z0-9_-]/g, '-') || 'chunk';
  return `${prefix}-${fileName}`;
}

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
    cssMinify: true,
    chunkSizeWarningLimit: 2200,
    rollupOptions: {
      output: {
        manualChunks(rawId) {
          const id = normalizeId(rawId);

          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor-react';
          if (id.includes('node_modules/firebase')) return 'vendor-firebase';
          if (id.includes('node_modules/pdfjs-dist')) return 'vendor-pdf';
          if (id.includes('node_modules/jszip')) return 'vendor-zip';

          if (id.includes('/src/data/caseBank/cases-part-')) {
            const match = id.match(/cases-part-(\d+)\.js$/);
            return match ? `case-bank-${match[1]}` : 'case-bank-part';
          }
          if (id.includes('/src/data/cases.js')) return 'case-bank-index';
          if (id.includes('/src/data/tusPearlCards.js')) return 'pearl-bank';

          if (id.includes('/src/data/tusGlossary')) return chunkNameFromFile(id, 'glossary');
          if (id.includes('/src/utils/glossary.js')) return 'glossary-core';
          if (id.includes('/src/components/GlossaryTooltip.full.jsx')) return 'glossary-full-view';

          return undefined;
        },
      },
    },
  },
});
