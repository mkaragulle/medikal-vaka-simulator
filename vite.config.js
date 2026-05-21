import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
          if (id.includes('/src/data/cases.js')) return 'case-bank';
          if (id.includes('/src/data/tusPearlCards.js')) return 'pearl-bank';
          return undefined;
        },
      },
    },
  },
});
