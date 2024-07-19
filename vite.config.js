import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'static/js', // Output directory for built files
    assetsDir: '.', // Directory within outDir where assets are placed
    emptyOutDir: true, // Clean the output directory before building
    minify: true, // Minify production builds
    sourcemap: false, // Disable sourcemaps in production
    target: 'esnext', // Target modern browsers
  },
});


