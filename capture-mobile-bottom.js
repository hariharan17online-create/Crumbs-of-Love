import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

async function takeMobileBottomScreenshot() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9225',
    '--disable-gpu',
    '--no-sandbox',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const targets = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9225/json/list', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
  });

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));

  let msgId = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const id = msgId++;
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  await send('Page.enable');

  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  await send('Page.navigate', { url: 'http://localhost:5173/index.html' });
  await new Promise(r => setTimeout(r, 2200));

  // Scroll to absolute bottom
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: document.body.scrollHeight - 600, behavior: 'instant' });`
  });
  await new Promise(r => setTimeout(r, 1000));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/footer-marquee-mobile-bottom.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved screenshots/footer-marquee-mobile-bottom.png');

  ws.close();
  chrome.kill();
}

takeMobileBottomScreenshot().catch(console.error);
