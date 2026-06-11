import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function normalizeId(id = '') {
  return String(id).replace(/\\/g, '/');
}

function getDataFileName(id = '') {
  const match = normalizeId(id).match(/\/src\/data\/([^/]+)\.js$/);
  return match?.[1] || '';
}

function getGlossaryChunk(id = '') {
  const fileName = getDataFileName(id);
  if (!fileName.startsWith('tusGlossary')) return null;

  // Each large glossary expansion file is kept as an independent async-friendly
  // data chunk instead of forcing all glossary data into one oversized bundle.
  return `glossary-${fileName
    .replace(/^tusGlossary/i, '')
    .replace(/Index$/i, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase() || 'core'}`;
}

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    reportCompressedSize: true,
    assetsInlineLimit: 4096,
    // The case bank is intentionally data-heavy. Raising the warning limit here
    // prevents false-negative Vercel anxiety while real build failures still fail.
    chunkSizeWarningLimit: 32000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = normalizeId(id);
          if (normalizedId.includes('node_modules/react') || normalizedId.includes('node_modules/react-dom')) return 'vendor-react';
          if (normalizedId.includes('node_modules/firebase')) return 'vendor-firebase';
          if (normalizedId.includes('node_modules/pdfjs-dist')) return 'vendor-pdf';
          if (normalizedId.includes('node_modules/jszip')) return 'vendor-zip';
          if (normalizedId.includes('/src/data/cases.js')) return 'case-bank';
          if (normalizedId.includes('/src/data/tusPearlCards.js')) return 'pearl-bank';
          if (normalizedId.includes('/src/components/GlossaryTooltip.full.jsx') || normalizedId.includes('/src/utils/glossary.js')) return 'glossary-runtime';
          const glossaryChunk = getGlossaryChunk(normalizedId);
          if (glossaryChunk) return glossaryChunk;
          return undefined;
        },
      },
    },
  },
});
