#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const publicDir = path.join(__dirname, '..', 'public');
const iconsDir = path.join(publicDir, 'icons');
const screenshotsDir = path.join(publicDir, 'screenshots');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Create a base icon SVG as source
const baseSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="80" fill="url(#grad)"/>
  <g fill="white">
    <!-- Creative spark icon -->
    <path d="M256 80 L180 200 L256 160 L332 200 Z" opacity="0.9"/>
    <circle cx="256" cy="200" r="8" fill="white"/>
    
    <!-- Brain/AI representation -->
    <ellipse cx="256" cy="280" rx="80" ry="60" fill="none" stroke="white" stroke-width="8" opacity="0.8"/>
    <ellipse cx="256" cy="280" rx="50" ry="35" fill="none" stroke="white" stroke-width="4" opacity="0.6"/>
    
    <!-- Content creation elements -->
    <rect x="200" y="360" width="112" height="8" rx="4" fill="white" opacity="0.7"/>
    <rect x="200" y="380" width="80" height="8" rx="4" fill="white" opacity="0.5"/>
    <rect x="200" y="400" width="96" height="8" rx="4" fill="white" opacity="0.6"/>
    
    <!-- Modern accent -->
    <circle cx="400" cy="120" r="20" fill="white" opacity="0.3"/>
    <circle cx="112" cy="400" r="16" fill="white" opacity="0.3"/>
  </g>
</svg>`.trim();

// Save base SVG
const baseSvgPath = path.join(iconsDir, 'base-icon.svg');
fs.writeFileSync(baseSvgPath, baseSvg);

// Icon sizes for PWA
const iconSizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

// Apple touch icon sizes
const appleTouchSizes = [57, 60, 72, 76, 114, 120, 144, 152, 180];

// Generate regular PWA icons
async function generateIcons() {
  console.log('🎨 Generating PWA icons...');
  
  for (const size of iconSizes) {
    const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    await sharp(Buffer.from(baseSvg))
      .resize(size, size)
      .png({ quality: 90 })
      .toFile(outputPath);
    console.log(`✅ Generated ${size}x${size} icon`);
  }

  // Generate Apple Touch Icons
  console.log('🍎 Generating Apple Touch icons...');
  for (const size of appleTouchSizes) {
    const outputPath = path.join(iconsDir, `apple-touch-icon-${size}x${size}.png`);
    await sharp(Buffer.from(baseSvg))
      .resize(size, size)
      .png({ quality: 90 })
      .toFile(outputPath);
    console.log(`✅ Generated Apple Touch ${size}x${size} icon`);
  }

  // Generate default Apple Touch Icon
  const appleIconPath = path.join(publicDir, 'apple-touch-icon.png');
  await sharp(Buffer.from(baseSvg))
    .resize(180, 180)
    .png({ quality: 90 })
    .toFile(appleIconPath);
  console.log('✅ Generated default Apple Touch icon');

  // Generate favicon.ico (multiple sizes in one file)
  const faviconPath = path.join(publicDir, 'favicon.ico');
  await sharp(Buffer.from(baseSvg))
    .resize(32, 32)
    .png({ quality: 90 })
    .toFile(faviconPath.replace('.ico', '.png'));
  console.log('✅ Generated favicon.png (use online converter for .ico)');

  // Generate shortcut icons
  console.log('🔗 Generating shortcut icons...');
  
  // Dashboard shortcut icon
  const dashboardSvg = `
<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" rx="16" fill="#3b82f6"/>
  <g fill="white">
    <rect x="20" y="20" width="24" height="24" rx="4"/>
    <rect x="52" y="20" width="24" height="24" rx="4"/>
    <rect x="20" y="52" width="56" height="24" rx="4"/>
  </g>
</svg>`.trim();
  
  await sharp(Buffer.from(dashboardSvg))
    .png({ quality: 90 })
    .toFile(path.join(iconsDir, 'dashboard-shortcut.png'));

  // Ideas shortcut icon
  const ideasSvg = `
<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" rx="16" fill="#10b981"/>
  <g fill="white">
    <circle cx="48" cy="35" r="12"/>
    <path d="M36 45 Q48 35 60 45 L60 55 Q48 65 36 55 Z"/>
    <rect x="44" y="55" width="8" height="16" rx="2"/>
    <rect x="40" y="68" width="16" height="4" rx="2"/>
  </g>
</svg>`.trim();
  
  await sharp(Buffer.from(ideasSvg))
    .png({ quality: 90 })
    .toFile(path.join(iconsDir, 'ideas-shortcut.png'));

  // Studio shortcut icon
  const studioSvg = `
<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" rx="16" fill="#8b5cf6"/>
  <g fill="white">
    <rect x="20" y="25" width="56" height="8" rx="2"/>
    <rect x="20" y="37" width="40" height="8" rx="2"/>
    <rect x="20" y="49" width="48" height="8" rx="2"/>
    <circle cx="70" cy="60" r="8"/>
    <path d="M62 68 L78 68 M70 60 L70 76"/>
  </g>
</svg>`.trim();
  
  await sharp(Buffer.from(studioSvg))
    .png({ quality: 90 })
    .toFile(path.join(iconsDir, 'studio-shortcut.png'));

  console.log('✅ Generated shortcut icons');

  // Generate placeholder screenshots
  console.log('📱 Generating placeholder screenshots...');
  
  // Desktop screenshot
  const desktopScreenshot = Buffer.from(`
<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="720" fill="#f8fafc"/>
  <rect x="0" y="0" width="1280" height="60" fill="#3b82f6"/>
  <text x="640" y="35" font-family="Arial" font-size="20" fill="white" text-anchor="middle">YT Copilot Dashboard</text>
  <rect x="50" y="100" width="300" height="200" rx="8" fill="white" stroke="#e2e8f0"/>
  <rect x="400" y="100" width="300" height="200" rx="8" fill="white" stroke="#e2e8f0"/>
  <rect x="750" y="100" width="300" height="200" rx="8" fill="white" stroke="#e2e8f0"/>
  <text x="640" y="400" font-family="Arial" font-size="24" fill="#374151" text-anchor="middle">AI-Powered Content Creation Platform</text>
</svg>`);
  
  await sharp(desktopScreenshot)
    .png({ quality: 90 })
    .toFile(path.join(screenshotsDir, 'desktop-1.png'));

  // Mobile screenshot
  const mobileScreenshot = Buffer.from(`
<svg width="390" height="844" viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg">
  <rect width="390" height="844" fill="#f8fafc"/>
  <rect x="0" y="0" width="390" height="80" fill="#3b82f6"/>
  <text x="195" y="45" font-family="Arial" font-size="18" fill="white" text-anchor="middle">YT Copilot</text>
  <rect x="20" y="120" width="350" height="150" rx="8" fill="white" stroke="#e2e8f0"/>
  <rect x="20" y="290" width="350" height="150" rx="8" fill="white" stroke="#e2e8f0"/>
  <rect x="20" y="460" width="350" height="150" rx="8" fill="white" stroke="#e2e8f0"/>
  <text x="195" y="700" font-family="Arial" font-size="16" fill="#374151" text-anchor="middle">Create Amazing Content</text>
</svg>`);
  
  await sharp(mobileScreenshot)
    .png({ quality: 90 })
    .toFile(path.join(screenshotsDir, 'mobile-1.png'));

  console.log('✅ Generated placeholder screenshots');
  console.log('🎉 All icons and images generated successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Replace the generated placeholder screenshots with real app screenshots');
  console.log('2. Consider customizing the base icon design in scripts/generate-icons.js');
  console.log('3. Convert favicon.png to favicon.ico using an online converter if needed');
}

// Run the generation
generateIcons().catch(console.error);