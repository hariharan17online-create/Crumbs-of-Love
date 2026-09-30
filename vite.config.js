import { resolve } from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';

function copyMenuAssets() {
  return {
    name: 'copy-menu-assets',
    closeBundle() {
      const srcDir = resolve(import.meta.dirname, 'assets/menu');
      const destDir = resolve(import.meta.dirname, 'dist/assets/menu');
      if (fs.existsSync(srcDir)) {
        fs.mkdirSync(destDir, { recursive: true });
        for (const file of fs.readdirSync(srcDir)) {
          fs.copyFileSync(resolve(srcDir, file), resolve(destDir, file));
        }
      }
    }
  };
}

export default defineConfig({
  root: './',
  plugins: [copyMenuAssets()],
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
        menu: resolve(import.meta.dirname, 'menu.html'),
        product: resolve(import.meta.dirname, 'product.html'),
        checkout: resolve(import.meta.dirname, 'checkout.html'),
        success: resolve(import.meta.dirname, 'success.html'),
      },
    },
  },
});

