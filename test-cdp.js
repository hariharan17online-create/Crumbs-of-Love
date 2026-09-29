import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

async function capture() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1000));

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

  // Emulate Mobile Device (iPhone 14: 390 x 844, mobile=true)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  await send('Page.navigate', { url: 'http://localhost:5173/' });
  // Wait 4s for preloader to finish
  await new Promise(r => setTimeout(r, 4200));

  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  const outPath = path.resolve('screenshots', 'navbar-mobile-cdp.png');
  fs.writeFileSync(outPath, Buffer.from(screenshot.data, 'base64'));
  console.log('✓ Successfully captured true mobile screenshot via CDP:', outPath);

  ws.close();
  chrome.kill();
}

capture().catch(console.error);
