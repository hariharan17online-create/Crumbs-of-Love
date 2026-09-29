import { execFileSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('screenshots');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const pages = [
  { name: 'index-desktop', url: 'http://localhost:5173/', w: 1440, h: 900, delay: 3500 },
  { name: 'index-mobile', url: 'http://localhost:5173/', w: 390, h: 844, delay: 3500 },
  { name: 'shop-desktop', url: 'http://localhost:5173/shop.html', w: 1440, h: 900, delay: 1500 },
  { name: 'shop-mobile', url: 'http://localhost:5173/shop.html', w: 390, h: 844, delay: 1500 },
  { name: 'product-desktop', url: 'http://localhost:5173/product.html?id=classic-fudge', w: 1440, h: 900, delay: 1500 },
  { name: 'product-mobile', url: 'http://localhost:5173/product.html?id=classic-fudge', w: 390, h: 844, delay: 1500 },
  { name: 'checkout-desktop', url: 'http://localhost:5173/checkout.html', w: 1440, h: 900, delay: 1500 },
  { name: 'checkout-mobile', url: 'http://localhost:5173/checkout.html', w: 390, h: 844, delay: 1500 },
  { name: 'success-desktop', url: 'http://localhost:5173/success.html', w: 1440, h: 900, delay: 1500 },
  { name: 'success-mobile', url: 'http://localhost:5173/success.html', w: 390, h: 844, delay: 1500 },
];

for (const p of pages) {
  const dest = path.join(outDir, `${p.name}.png`);
  console.log(`Capturing ${p.name} at ${p.w}x${p.h}...`);
  try {
    execFileSync(chromePath, [
      '--headless=new',
      `--virtual-time-budget=${p.delay}`,
      `--window-size=${p.w},${p.h}`,
      `--screenshot=${dest}`,
      p.url
    ], { timeout: 15000 });
    console.log(`✓ Saved ${dest}`);
  } catch (e) {
    console.error(`✗ Error on ${p.name}:`, e.message);
  }
}
