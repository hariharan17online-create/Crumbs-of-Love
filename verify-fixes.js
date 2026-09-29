import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

async function testFixes() {
  console.log('--- Starting Verification of All 4 Fixes ---');

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    '--no-sandbox',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  let targets;
  try {
    targets = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9223/json/list', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });
  } catch (err) {
    console.error('Failed to connect to Chrome CDP:', err);
    chrome.kill();
    return;
  }

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

  const consoleErrors = [];
  ws.addEventListener('message', (evt) => {
    const msg = JSON.parse(evt.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      if (msg.params.type === 'error') {
        const text = msg.params.args.map(a => a.value || a.description || '').join(' ');
        consoleErrors.push(text);
      }
    }
  });

  await send('Page.enable');
  await send('Runtime.enable');

  const testPage = async (pageName, width, height, isMobile) => {
    console.log(`\nTesting ${pageName} at ${width}x${height} (Mobile: ${isMobile})...`);
    consoleErrors.length = 0;

    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: isMobile ? 2 : 1,
      mobile: !!isMobile
    });

    if (isMobile) {
      await send('Emulation.setTouchEmulationEnabled', { enabled: true });
    } else {
      await send('Emulation.setTouchEmulationEnabled', { enabled: false });
    }

    const url = `http://localhost:5173/${pageName}`;
    await send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 2200));

    // Evaluate tests on the page
    const evalResult = await send('Runtime.evaluate', {
      expression: `(() => {
        const results = {};
        
        // 1. Lenis Smooth Scroll
        results.hasLenis = typeof window.lenis !== 'undefined' && window.lenis !== null;
        results.lenisDuration = window.lenis?.options?.duration;

        // 2. Custom Cursor
        const dot = document.querySelector('.custom-cursor-dot');
        const ring = document.querySelector('.custom-cursor-ring');
        results.hasDot = !!dot;
        results.hasRing = !!ring;
        if (dot) {
          const dotStyle = window.getComputedStyle(dot);
          results.dotDisplay = dotStyle.display;
        }
        if (ring) {
          const ringStyle = window.getComputedStyle(ring);
          results.ringDisplay = ringStyle.display;
        }

        // 3. Footer Marquee
        const marqueeContainer = document.querySelector('.footer-marquee-container');
        const marqueeTrack = document.querySelector('.footer-marquee-track');
        const marqueeGroups = document.querySelectorAll('.footer-marquee-group');
        results.hasMarquee = !!marqueeContainer;
        if (marqueeContainer) {
          const cRect = marqueeContainer.getBoundingClientRect();
          results.marqueeContainerWidth = cRect.width;
          results.marqueeGroupCount = marqueeGroups.length;
          const g0 = marqueeGroups[0];
          if (g0) {
            const gRect = g0.getBoundingClientRect();
            results.marqueeGroupWidth = gRect.width;
            const style = window.getComputedStyle(g0);
            results.marqueeAnimation = style.animationName;
          }
        }

        // 4. Horizontal Page Overflow Check
        const scrollWidth = document.documentElement.scrollWidth;
        const clientWidth = document.documentElement.clientWidth;
        results.hasHorizontalOverflow = scrollWidth > clientWidth + 1;
        results.scrollWidth = scrollWidth;
        results.clientWidth = clientWidth;

        // 5. Check emojis in rendered text
        const emojiRegex = /[\\u{1F300}-\\u{1F9FF}\\u{2600}-\\u{26FF}\\u{2700}-\\u{27BF}\\u{1F600}-\\u{1F64F}\\u{1F680}-\\u{1F6FF}\\u{1FA70}-\\u{1FAFF}]/gu;
        const pageText = document.body.innerText;
        const foundEmojis = pageText.match(emojiRegex);
        results.foundEmojis = foundEmojis ? [...new Set(foundEmojis)] : [];

        // 6. Lucide Icons Check
        const lucideSvgs = document.querySelectorAll('svg.lucide, svg[data-lucide]');
        results.lucideSvgCount = lucideSvgs.length;

        return results;
      })()`,
      returnByValue: true
    });

    const res = evalResult?.result?.value || evalResult?.value || evalResult;
    console.log('Results for', pageName, ':\n', JSON.stringify(res, null, 2));
    console.log('Console errors:', consoleErrors);

    return { ...res, consoleErrors: [...consoleErrors] };
  };

  // Test index.html desktop
  const indexDesktop = await testPage('index.html', 1440, 900, false);
  // Test index.html mobile
  const indexMobile = await testPage('index.html', 390, 844, true);

  // Test shop.html desktop & mobile
  const shopDesktop = await testPage('shop.html', 1440, 900, false);
  const shopMobile = await testPage('shop.html', 390, 844, true);

  // Test product.html desktop & mobile
  const productDesktop = await testPage('product.html?id=classic-fudge', 1440, 900, false);
  const productMobile = await testPage('product.html?id=classic-fudge', 390, 844, true);

  ws.close();
  chrome.kill();
  console.log('\n--- Verification Run Complete ---');
}

testFixes().catch(console.error);
