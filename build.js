const fs = require('fs');
const path = require('path');

// Ensure public directory exists
const publicPath = path.join(__dirname, 'public');
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath);
  console.log('Created public/ directory.');
}

// Copy assets
const filesToCopy = ['16arena-logo-dark.png'];
for (const file of filesToCopy) {
  const src = path.join(__dirname, file);
  const dest = path.join(publicPath, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to public/`);
  }
}

// Read index.html, replace placeholder, write to public/index.html
const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const backendUrl = process.env.BACKEND_URL || 'https://api.16arena.com';
content = content.replace('__BACKEND_URL_PLACEHOLDER__', backendUrl);

fs.writeFileSync(path.join(publicPath, 'index.html'), content);
console.log(`Successfully injected BACKEND_URL into public/index.html: ${backendUrl}`);
