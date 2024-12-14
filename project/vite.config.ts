import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Use relative paths for assets
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: '../frontend', // Output the build to the 'frontend' folder at the root
    emptyOutDir: true, // Clear the folder before building
  },
});