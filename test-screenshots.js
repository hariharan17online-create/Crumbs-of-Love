import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  const targets = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9222/json/list', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
  });

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));

  let id = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const msgId = id++;
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === msgId) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  const captureView = async (url, width, height, mobile, scrollY, filename) => {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: mobile ? 2 : 1,
      mobile: !!mobile
    });

    await send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 4600));

    if (scrollY > 0) {
      await send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${scrollY}, behavior: 'instant' });`
      });
      await new Promise(r => setTimeout(r, 800));
    }

    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    const outPath = path.resolve('screenshots', filename);
    fs.writeFileSync(outPath, Buffer.from(screenshot.data, 'base64'));
    console.log(`✓ Saved screenshot: ${filename}`);
  };

  // 1. Home Desktop Top (Hero)
  await captureView('http://localhost:5173/', 1440, 900, false, 0, 'home-desktop-top.png');

  // 2. Home Desktop Our Story & Wavy Divider
  await captureView('http://localhost:5173/', 1440, 900, false, 750, 'home-desktop-story.png');

  // 3. Home Desktop Menu Preview & Why Choose Us
  await captureView('http://localhost:5173/', 1440, 900, false, 1750, 'home-desktop-menu-why.png');

  // 5. Home Desktop Gallery & Testimonials
  await captureView('http://localhost:5173/', 1440, 900, false, 2800, 'home-desktop-gallery-test.png');

  // 6. Home Desktop Custom Order Form & FAQ
  await captureView('http://localhost:5173/', 1440, 900, false, 4800, 'home-desktop-form-faq.png');

  // 7. Home Desktop FAQ
  await captureView('http://localhost:5173/', 1440, 900, false, 5300, 'home-desktop-faq.png');

  // 8. Home Desktop Dark Cocoa Footer & Massive Wordmark
  await captureView('http://localhost:5173/', 1440, 900, false, 7100, 'home-desktop-footer.png');

  // 8. Home Mobile Top
  await captureView('http://localhost:5173/', 390, 844, true, 0, 'home-mobile-top.png');

  // 9. Shop Desktop
  await captureView('http://localhost:5173/shop.html', 1440, 900, false, 0, 'shop-desktop.png');

  // 10. Shop Mobile
  await captureView('http://localhost:5173/shop.html', 390, 844, true, 0, 'shop-mobile.png');

  // 11. Product Detail Page Desktop
  await captureView('http://localhost:5173/product.html?id=classic-fudge', 1440, 900, false, 0, 'product-desktop.png');

  ws.close();
  chrome.kill();
  console.log('✓ All verification screenshots captured successfully!');
}

run().catch(console.error);
