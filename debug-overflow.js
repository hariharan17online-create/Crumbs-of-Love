import { execSync } from 'child_process';
import http from 'http';

// We can run a small fetch to see what's in checkout.html
const html = execSync('curl -s http://localhost:5173/checkout.html').toString();
console.log('Checkout HTML loaded, length:', html.length);
