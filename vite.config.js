import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  server: {
    port: 5173,
    open: false,
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        shop: resolve(import.meta.dirname, 'shop.html'),
        product: resolve(import.meta.dirname, 'product.html'),
        checkout: resolve(import.meta.dirname, 'checkout.html'),
        success: resolve(import.meta.dirname, 'success.html'),
      },
    },
  },
});
