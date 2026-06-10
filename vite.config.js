import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function numericBucket(value, bucketCount) {
  let total = 0;
  for (let index = 0; index < value.length; index += 1) total += value.charCodeAt(index);
  return total % bucketCount;
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
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor-react';
          if (id.includes('node_modules/firebase')) return 'vendor-firebase';
          if (id.includes('node_modules/pdfjs-dist')) return 'vendor-pdf';
          if (id.includes('node_modules/jszip')) return 'vendor-zip';

          const casePartMatch = id.match(/\/src\/data\/cases\.part(\d+)\.js$/);
          if (casePartMatch) return `case-bank-${casePartMatch[1]}`;

          if (id.includes('/src/data/tusPearlCards.js')) return 'pearl-bank';

          const glossaryDataMatch = id.match(/\/src\/data\/(tusGlossary[^/]+)\.js$/);
          if (glossaryDataMatch) return `glossary-bank-${numericBucket(glossaryDataMatch[1], 12)}`;
          if (id.includes('/src/components/GlossaryTooltip.full.jsx') || id.includes('/src/utils/glossary.js')) return 'glossary-core';

          return undefined;
        },
      },
    },
  },
});
