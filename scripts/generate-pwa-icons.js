#!/usr/bin/env node

/**
 * 🚀 CREAOVATE PWA ICON GENERATOR
 * 
 * Comprehensive PWA icon and favicon generator using Sharp
 * Generates all required icons, favicons, and PWA assets
 * 
 * Features:
 * - High-quality Sharp image processing
 * - Complete PWA icon set (72px to 512px)
 * - Apple Touch Icons (57px to 180px)
 * - Favicon in multiple sizes (16px to 64px)
 * - Maskable icons for Android
 * - App shortcuts icons
 * - Optimized PNG compression
 * - Proper transparency handling
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const config = {
  sourceIcon: 'base-icon.svg', // Source SVG file
  outputDir: '../public',
  iconsDir: '../public/icons',
  screenshotsDir: '../public/screenshots',
  quality: 95, // PNG quality
  compression: 9, // PNG compression level
  brand: {
    name: 'YT Copilot',
    colors: {
      primary: '#3b82f6',
      secondary: '#1d4ed8',
      accent: '#10b981',
      purple: '#8b5cf6'
    }
  }
};

// Complete PWA icon specifications
const iconSpecs = {
  // Standard PWA icons (required by manifest.json)
  pwa: [
    { size: 72, purpose: 'maskable any' },
    { size: 96, purpose: 'maskable any' },
    { size: 128, purpose: 'maskable any' },
    { size: 144, purpose: 'maskable any' },
    { size: 152, purpose: 'maskable any' },
    { size: 192, purpose: 'maskable any' }, // Required for PWA
    { size: 384, purpose: 'maskable any' },
    { size: 512, purpose: 'maskable any' }  // Required for PWA
  ],
  
  // Apple Touch Icons (iOS support)
  apple: [
    57, 60, 72, 76, 114, 120, 144, 152, 180
  ],
  
  // Favicon sizes (browser tabs and bookmarks)
  favicon: [
    16, 24, 32, 48, 64
  ],
  
  // Windows tile sizes
  windows: [
    70, 150, 310, 558
  ]
};

class PWAIconGenerator {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.publicDir = path.resolve(this.projectRoot, 'public');
    this.iconsDir = path.resolve(this.publicDir, 'icons');
    this.screenshotsDir = path.resolve(this.publicDir, 'screenshots');
    this.baseIconPath = path.join(this.iconsDir, config.sourceIcon);
  }

  async init() {
    console.log('🚀 Initializing PWA Icon Generator...\n');
    
    // Create directories
    await this.createDirectories();
    
    // Ensure base icon exists
    await this.ensureBaseIcon();
    
    console.log('✅ Initialization complete!\n');
  }

  async createDirectories() {
    const dirs = [this.publicDir, this.iconsDir, this.screenshotsDir];
    
    for (const dir of dirs) {
      try {
        await fs.access(dir);
        console.log(`📁 Directory exists: ${path.basename(dir)}`);
      } catch {
        await fs.mkdir(dir, { recursive: true });
        console.log(`📁 Created directory: ${path.basename(dir)}`);
      }
    }
  }

  async ensureBaseIcon() {
    try {
      await fs.access(this.baseIconPath);
      console.log('✅ Base icon found: base-icon.svg');
    } catch {
      console.log('📝 Creating base icon...');
      await this.createBaseIcon();
    }
  }

  async createBaseIcon() {
    const baseSvg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${config.brand.colors.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${config.brand.colors.secondary};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${config.brand.colors.accent};stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:${config.brand.colors.purple};stop-opacity:0.8" />
    </linearGradient>
  </defs>
  
  <!-- Main background with rounded corners for modern look -->
  <rect width="512" height="512" rx="80" fill="url(#mainGradient)"/>
  
  <g fill="white">
    <!-- AI Spark Symbol -->
    <path d="M256 60 L200 140 L256 120 L312 140 Z" opacity="0.95"/>
    <circle cx="256" cy="140" r="6" fill="white"/>
    
    <!-- Central AI Brain/Network -->
    <g opacity="0.9">
      <ellipse cx="256" cy="220" rx="70" ry="45" fill="none" stroke="white" stroke-width="6"/>
      <ellipse cx="256" cy="220" rx="45" ry="28" fill="none" stroke="white" stroke-width="3" opacity="0.7"/>
      <circle cx="230" cy="210" r="3" fill="white"/>
      <circle cx="256" cy="205" r="3" fill="white"/>
      <circle cx="282" cy="210" r="3" fill="white"/>
    </g>
    
    <!-- Content Creation Lines -->
    <g opacity="0.8">
      <rect x="180" y="300" width="152" height="6" rx="3" fill="white"/>
      <rect x="180" y="320" width="120" height="6" rx="3" fill="white" opacity="0.7"/>
      <rect x="180" y="340" width="136" height="6" rx="3" fill="white" opacity="0.8"/>
      <rect x="180" y="360" width="100" height="6" rx="3" fill="white" opacity="0.6"/>
    </g>
    
    <!-- Modern Tech Accents -->
    <circle cx="380" cy="100" r="18" fill="white" opacity="0.4"/>
    <circle cx="132" cy="380" r="14" fill="white" opacity="0.4"/>
    <rect x="360" y="420" width="40" height="4" rx="2" fill="white" opacity="0.5"/>
    
    <!-- YT Play Button Inspiration -->
    <path d="M400 200 L420 210 L400 220 Z" fill="white" opacity="0.6"/>
  </g>
  
  <!-- Subtle overlay for depth -->
  <rect width="512" height="512" rx="80" fill="url(#accentGradient)" opacity="0.1"/>
</svg>`;

    await fs.writeFile(this.baseIconPath, baseSvg);
    console.log('✅ Created modern base-icon.svg');
  }

  async generatePWAIcons() {
    console.log('🎨 Generating PWA icons...');
    
    for (const spec of iconSpecs.pwa) {
      const outputPath = path.join(this.iconsDir, `icon-${spec.size}x${spec.size}.png`);
      
      await sharp(this.baseIconPath)
        .resize(spec.size, spec.size, {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ 
          quality: config.quality,
          compressionLevel: config.compression,
          progressive: true
        })
        .toFile(outputPath);
      
      console.log(`  ✅ PWA icon: ${spec.size}x${spec.size}px (${spec.purpose})`);
    }
  }

  async generateAppleIcons() {
    console.log('🍎 Generating Apple Touch icons...');
    
    for (const size of iconSpecs.apple) {
      const outputPath = path.join(this.iconsDir, `apple-touch-icon-${size}x${size}.png`);
      
      await sharp(this.baseIconPath)
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ 
          quality: config.quality,
          compressionLevel: config.compression
        })
        .toFile(outputPath);
      
      console.log(`  ✅ Apple Touch icon: ${size}x${size}px`);
    }

    // Default Apple Touch Icon (180x180)
    const defaultApplePath = path.join(this.publicDir, 'apple-touch-icon.png');
    await sharp(this.baseIconPath)
      .resize(180, 180, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ 
        quality: config.quality,
        compressionLevel: config.compression
      })
      .toFile(defaultApplePath);
    
    console.log('  ✅ Default Apple Touch icon (180x180px)');
  }

  async generateFavicons() {
    console.log('🔖 Generating favicons...');
    
    for (const size of iconSpecs.favicon) {
      const outputPath = path.join(this.publicDir, `favicon-${size}x${size}.png`);
      
      await sharp(this.baseIconPath)
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ 
          quality: config.quality,
          compressionLevel: config.compression
        })
        .toFile(outputPath);
      
      console.log(`  ✅ Favicon: ${size}x${size}px`);
    }

    // Main favicon.png (32x32)
    const faviconPath = path.join(this.publicDir, 'favicon.png');
    await sharp(this.baseIconPath)
      .resize(32, 32, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ 
        quality: config.quality,
        compressionLevel: config.compression
      })
      .toFile(faviconPath);
    
    console.log('  ✅ Main favicon.png (32x32px)');

    // Generate favicon.ico from 32x32 PNG
    const faviconIcoPath = path.join(this.publicDir, 'favicon.ico');
    await sharp(this.baseIconPath)
      .resize(32, 32, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain'
      })
      .toFormat('png')
      .toFile(faviconIcoPath);
    
    console.log('  ✅ favicon.ico (Note: Use online converter for true .ico format)');
  }

  async generateShortcutIcons() {
    console.log('🔗 Generating app shortcut icons...');
    
    // Dashboard shortcut
    const dashboardSvg = `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" rx="20" fill="${config.brand.colors.primary}"/>
  <g fill="white">
    <rect x="16" y="16" width="24" height="20" rx="3" opacity="0.9"/>
    <rect x="48" y="16" width="32" height="20" rx="3" opacity="0.9"/>
    <rect x="16" y="44" width="64" height="16" rx="3" opacity="0.8"/>
    <rect x="16" y="68" width="48" height="12" rx="2" opacity="0.7"/>
  </g>
</svg>`;

    await sharp(Buffer.from(dashboardSvg))
      .png({ quality: config.quality })
      .toFile(path.join(this.iconsDir, 'dashboard-shortcut.png'));
    
    // Ideas shortcut
    const ideasSvg = `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" rx="20" fill="${config.brand.colors.accent}"/>
  <g fill="white">
    <circle cx="48" cy="32" r="10" opacity="0.9"/>
    <ellipse cx="48" cy="42" rx="12" ry="8" fill="none" stroke="white" stroke-width="2" opacity="0.8"/>
    <rect x="44" y="54" width="8" height="12" rx="1" opacity="0.8"/>
    <rect x="40" y="68" width="16" height="3" rx="1" opacity="0.7"/>
    <circle cx="28" cy="24" r="3" opacity="0.5"/>
    <circle cx="68" cy="28" r="2" opacity="0.5"/>
  </g>
</svg>`;

    await sharp(Buffer.from(ideasSvg))
      .png({ quality: config.quality })
      .toFile(path.join(this.iconsDir, 'ideas-shortcut.png'));

    // Studio shortcut
    const studioSvg = `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" rx="20" fill="${config.brand.colors.purple}"/>
  <g fill="white">
    <rect x="16" y="20" width="64" height="6" rx="2" opacity="0.9"/>
    <rect x="16" y="32" width="48" height="6" rx="2" opacity="0.8"/>
    <rect x="16" y="44" width="56" height="6" rx="2" opacity="0.8"/>
    <rect x="16" y="56" width="40" height="6" rx="2" opacity="0.7"/>
    <circle cx="72" cy="68" r="8" fill="none" stroke="white" stroke-width="2" opacity="0.8"/>
    <path d="M68 68 L76 68 M72 64 L72 72" stroke="white" stroke-width="2" opacity="0.8"/>
  </g>
</svg>`;

    await sharp(Buffer.from(studioSvg))
      .png({ quality: config.quality })
      .toFile(path.join(this.iconsDir, 'studio-shortcut.png'));
    
    console.log('  ✅ Dashboard shortcut icon');
    console.log('  ✅ Ideas shortcut icon');
    console.log('  ✅ Studio shortcut icon');
  }

  async generateScreenshots() {
    console.log('📱 Generating PWA screenshots...');
    
    // Desktop screenshot (1280x720)
    const desktopSvg = `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1280" height="720" fill="#f8fafc"/>
  
  <!-- Header -->
  <rect x="0" y="0" width="1280" height="72" fill="${config.brand.colors.primary}"/>
  <text x="640" y="45" font-family="Arial, sans-serif" font-size="24" font-weight="600" fill="white" text-anchor="middle">${config.brand.name} Dashboard</text>
  
  <!-- Sidebar -->
  <rect x="0" y="72" width="280" height="648" fill="white" stroke="#e2e8f0"/>
  
  <!-- Main content cards -->
  <rect x="320" y="112" width="380" height="180" rx="12" fill="white" stroke="#e2e8f0" stroke-width="2"/>
  <text x="510" y="150" font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="#374151" text-anchor="middle">AI Content Generator</text>
  <text x="510" y="220" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">Create amazing content with AI</text>
  
  <rect x="720" y="112" width="380" height="180" rx="12" fill="white" stroke="#e2e8f0" stroke-width="2"/>
  <text x="910" y="150" font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="#374151" text-anchor="middle">Analytics Dashboard</text>
  <text x="910" y="220" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">Track your performance</text>
  
  <rect x="320" y="312" width="780" height="180" rx="12" fill="white" stroke="#e2e8f0" stroke-width="2"/>
  <text x="710" y="350" font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="#374151" text-anchor="middle">Recent Projects</text>
  
  <!-- Decorative elements -->
  <circle cx="1150" cy="150" r="40" fill="${config.brand.colors.accent}" opacity="0.1"/>
  <circle cx="380" cy="400" r="30" fill="${config.brand.colors.purple}" opacity="0.1"/>
</svg>`;

    await sharp(Buffer.from(desktopSvg))
      .png({ quality: 90 })
      .toFile(path.join(this.screenshotsDir, 'desktop-1.png'));

    // Mobile screenshot (390x844)
    const mobileSvg = `<svg width="390" height="844" viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="390" height="844" fill="#f8fafc"/>
  
  <!-- Header -->
  <rect x="0" y="0" width="390" height="88" fill="${config.brand.colors.primary}"/>
  <text x="195" y="55" font-family="Arial, sans-serif" font-size="20" font-weight="600" fill="white" text-anchor="middle">${config.brand.name}</text>
  
  <!-- Content cards -->
  <rect x="20" y="120" width="350" height="140" rx="12" fill="white" stroke="#e2e8f0" stroke-width="2"/>
  <text x="195" y="160" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#374151" text-anchor="middle">Generate Content</text>
  <text x="195" y="220" font-family="Arial, sans-serif" font-size="12" fill="#6b7280" text-anchor="middle">AI-powered content creation</text>
  
  <rect x="20" y="280" width="350" height="140" rx="12" fill="white" stroke="#e2e8f0" stroke-width="2"/>
  <text x="195" y="320" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#374151" text-anchor="middle">Analytics</text>
  <text x="195" y="380" font-family="Arial, sans-serif" font-size="12" fill="#6b7280" text-anchor="middle">Track your progress</text>
  
  <rect x="20" y="440" width="350" height="140" rx="12" fill="white" stroke="#e2e8f0" stroke-width="2"/>
  <text x="195" y="480" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#374151" text-anchor="middle">Content Library</text>
  <text x="195" y="540" font-family="Arial, sans-serif" font-size="12" fill="#6b7280" text-anchor="middle">Manage your content</text>
  
  <!-- Bottom navigation -->
  <rect x="0" y="744" width="390" height="100" fill="white" stroke="#e2e8f0"/>
  <circle cx="78" cy="784" r="20" fill="${config.brand.colors.primary}" opacity="0.2"/>
  <circle cx="195" cy="784" r="20" fill="${config.brand.colors.accent}" opacity="0.2"/>
  <circle cx="312" cy="784" r="20" fill="${config.brand.colors.purple}" opacity="0.2"/>
</svg>`;

    await sharp(Buffer.from(mobileSvg))
      .png({ quality: 90 })
      .toFile(path.join(this.screenshotsDir, 'mobile-1.png'));

    console.log('  ✅ Desktop screenshot (1280x720px)');
    console.log('  ✅ Mobile screenshot (390x844px)');
  }

  async updateManifest() {
    console.log('📝 Updating manifest.json...');
    
    const manifestPath = path.join(this.publicDir, 'manifest.json');
    
    try {
      const manifestContent = await fs.readFile(manifestPath, 'utf8');
      const manifest = JSON.parse(manifestContent);
      
      // Update icons array with all generated icons
      manifest.icons = iconSpecs.pwa.map(spec => ({
        src: `/icons/icon-${spec.size}x${spec.size}.png`,
        sizes: `${spec.size}x${spec.size}`,
        type: "image/png",
        purpose: spec.purpose
      }));
      
      await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
      console.log('  ✅ Updated manifest.json with new icon references');
    } catch (error) {
      console.log('  ⚠️ Could not update manifest.json:', error.message);
    }
  }

  async generateReport() {
    console.log('\n📊 GENERATION REPORT');
    console.log('═'.repeat(50));
    
    const stats = {
      pwaIcons: iconSpecs.pwa.length,
      appleIcons: iconSpecs.apple.length + 1, // +1 for default
      favicons: iconSpecs.favicon.length + 2, // +2 for main favicon files
      shortcuts: 3,
      screenshots: 2
    };
    
    console.log(`🎨 PWA Icons: ${stats.pwaIcons} (72px → 512px)`);
    console.log(`🍎 Apple Touch Icons: ${stats.appleIcons} (57px → 180px)`);
    console.log(`🔖 Favicons: ${stats.favicons} (16px → 64px + main files)`);
    console.log(`🔗 Shortcut Icons: ${stats.shortcuts}`);
    console.log(`📱 Screenshots: ${stats.screenshots}`);
    console.log(`📁 Total Files: ${Object.values(stats).reduce((a, b) => a + b, 0)}`);
    
    console.log('\n🎯 NEXT STEPS');
    console.log('─'.repeat(30));
    console.log('1. 📸 Replace generated screenshots with real app screenshots');
    console.log('2. 🎨 Customize the base icon design if needed');
    console.log('3. 🔄 Convert favicon.png to favicon.ico using online converter');
    console.log('4. ✅ Test PWA installation on mobile devices');
    console.log('5. 🚀 Deploy to production');
    
    console.log('\n✨ All PWA assets generated successfully! ✨\n');
  }

  async run() {
    try {
      await this.init();
      await this.generatePWAIcons();
      await this.generateAppleIcons();
      await this.generateFavicons();
      await this.generateShortcutIcons();
      await this.generateScreenshots();
      await this.updateManifest();
      await this.generateReport();
    } catch (error) {
      console.error('❌ Error generating PWA assets:', error);
      process.exit(1);
    }
  }
}

// Run the generator
if (require.main === module) {
  const generator = new PWAIconGenerator();
  generator.run();
}

module.exports = PWAIconGenerator;