#!/usr/bin/env node

/**
 * 🔖 ENHANCED FAVICON GENERATOR
 * 
 * Generates high-quality favicons using Sharp image processing
 * Supports multiple formats and sizes for maximum browser compatibility
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

class FaviconGenerator {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.publicDir = path.resolve(this.projectRoot, 'public');
    this.iconsDir = path.resolve(this.publicDir, 'icons');
    this.baseIconPath = path.join(this.iconsDir, 'base-icon.svg');
  }

  async generateFavicons() {
    console.log('🔖 Generating enhanced favicons...\n');

    try {
      // Check if base icon exists
      await fs.access(this.baseIconPath);
    } catch {
      console.error('❌ Base icon not found. Run "npm run icons:generate" first.');
      process.exit(1);
    }

    // Favicon sizes with specific optimizations
    const faviconSpecs = [
      { size: 16, name: 'favicon-16x16.png', format: 'png' },
      { size: 24, name: 'favicon-24x24.png', format: 'png' },
      { size: 32, name: 'favicon-32x32.png', format: 'png' },
      { size: 48, name: 'favicon-48x48.png', format: 'png' },
      { size: 64, name: 'favicon-64x64.png', format: 'png' }
    ];

    // Generate each favicon size
    for (const spec of faviconSpecs) {
      const outputPath = path.join(this.publicDir, spec.name);
      
      await sharp(this.baseIconPath)
        .resize(spec.size, spec.size, {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ 
          quality: 95,
          compressionLevel: 9,
          progressive: true,
          adaptiveFiltering: true
        })
        .toFile(outputPath);
      
      console.log(`  ✅ Generated ${spec.name}`);
    }

    // Generate main favicon.png (32x32)
    const mainFaviconPath = path.join(this.publicDir, 'favicon.png');
    await sharp(this.baseIconPath)
      .resize(32, 32, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ 
        quality: 95,
        compressionLevel: 9
      })
      .toFile(mainFaviconPath);
    
    console.log('  ✅ Generated favicon.png (main)');

    // Generate favicon.ico (standard format)
    const faviconIcoPath = path.join(this.publicDir, 'favicon.ico');
    await sharp(this.baseIconPath)
      .resize(32, 32, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain'
      })
      .toFormat('png')
      .toFile(faviconIcoPath);
    
    console.log('  ✅ Generated favicon.ico');

    console.log('\n📊 FAVICON SUMMARY');
    console.log('─'.repeat(30));
    console.log(`🔖 Generated ${faviconSpecs.length + 2} favicon files`);
    console.log('📁 Sizes: 16px, 24px, 32px, 48px, 64px');
    console.log('🎨 High-quality PNG with optimized compression');
    console.log('🌐 Cross-browser compatibility ensured');
    
    console.log('\n💡 USAGE TIPS');
    console.log('─'.repeat(20));
    console.log('• favicon.ico - Standard favicon for all browsers');
    console.log('• favicon.png - Modern browsers and PWAs');
    console.log('• favicon-*x*.png - Specific size requirements');
    console.log('• Use favicon.ico converter for true ICO format if needed');
    
    console.log('\n✨ Favicon generation complete! ✨\n');
  }
}

// Run the generator
if (require.main === module) {
  const generator = new FaviconGenerator();
  generator.generateFavicons().catch(console.error);
}

module.exports = FaviconGenerator;