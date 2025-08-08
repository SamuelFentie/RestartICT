import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'restartictfrontend-618223024788.europe-west1.run.app',
      '*.run.app',
      'localhost',
      '127.0.0.1'
    ],
    disableHostCheck: true
  }
});
