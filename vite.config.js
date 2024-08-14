import {defineConfig} from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // Remove or replace the incorrect configuration
      },
    },
  },
});
