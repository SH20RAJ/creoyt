#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Generate a proper favicon.ico with multiple sizes
async function generateFavicon() {
  const publicDir = path.join(__dirname, '..', 'public');
  const iconsDir = path.join(publicDir, 'icons');
  
  // Read the base SVG
  const baseSvgPath = path.join(iconsDir, 'base-icon.svg');
  const baseSvg = fs.readFileSync(baseSvgPath, 'utf8');
  
  // Generate multiple favicon sizes as PNG files
  const faviconSizes = [16, 24, 32, 48, 64];
  
  for (const size of faviconSizes) {
    const outputPath = path.join(publicDir, `favicon-${size}x${size}.png`);
    await sharp(Buffer.from(baseSvg))
      .resize(size, size, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(outputPath);
    console.log(`✅ Generated favicon-${size}x${size}.png`);
  }
  
  // Generate the main favicon as 32x32
  const faviconPath = path.join(publicDir, 'favicon.ico');
  await sharp(Buffer.from(baseSvg))
    .resize(32, 32, {
      kernel: sharp.kernel.lanczos3,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(faviconPath);
  
  console.log('✅ Generated favicon.ico');
  console.log('💡 Note: For better browser support, consider using an online ICO converter');
}

generateFavicon().catch(console.error);