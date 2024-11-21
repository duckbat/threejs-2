import { defineConfig } from 'vite';

export default defineConfig({
  base: '/~khaic/S2024/threejs-blender/', // Set the base path for deployment
  build: {
    outDir: 'dist', // Default output directory
    assetsDir: 'assets', // Directory for static assets
  },
  server: {
    host: true, // Allow network access
    port: 3000, // Development server port
  },
});