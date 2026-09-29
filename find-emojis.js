import fs from 'fs';

// Comprehensive regex for emoji symbols
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1FA70}-\u{1FAFF}\u{2728}\u{2B50}\u{2705}\u{274C}\u{2714}\u{2716}\u{26A0}\u{26A1}\u{23F0}\u{1F4AC}\u{1F382}\u{1F36B}\u{1F33F}\u{1F496}\u{1F495}\u{1F525}\u{2B50}\u{2728}]/gu;

const files = ['index.html', 'shop.html', 'product.html', 'checkout.html', 'success.html', 'menu.html'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Avoid checking SVG paths or HTML entities
    const matches = line.match(emojiRegex);
    if (matches) {
      console.log(`${file}:${idx + 1} [${matches.join(' ')}] ${line.trim().substring(0, 110)}`);
    }
  });
}
