#!/usr/bin/env node

/**
 * 📝 MANIFEST UPDATER FOR PNG ICONS
 * 
 * Updates manifest.json to reference PNG icons instead of SVG
 * Run this after converting SVG icons to PNG format
 */

const fs = require('fs').promises;
const path = require('path');

async function updateManifestForPNG() {
  console.log('📝 Updating manifest.json for PNG icons...\n');

  const projectRoot = path.join(__dirname, '..');
  const manifestPath = path.join(projectRoot, 'public', 'manifest.json');

  try {
    // Read current manifest
    const manifestContent = await fs.readFile(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestContent);

    // Update icons to PNG format
    const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
    
    manifest.icons = iconSizes.map(size => ({
      src: `/icons/icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "maskable any"
    }));

    // Update shortcuts to PNG format
    if (manifest.shortcuts) {
      manifest.shortcuts.forEach(shortcut => {
        if (shortcut.icons) {
          shortcut.icons.forEach(icon => {
            if (icon.src.endsWith('.svg')) {
              icon.src = icon.src.replace('.svg', '.png');
              icon.type = 'image/png';
            }
          });
        }
      });
    }

    // Write updated manifest
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    
    console.log('✅ Updated manifest.json:');
    console.log('  🎨 Icons: SVG → PNG references');
    console.log('  🔗 Shortcuts: SVG → PNG references');
    console.log('  📱 Type: image/svg+xml → image/png');
    
    console.log('\n📊 Updated Icon References:');
    manifest.icons.forEach(icon => {
      console.log(`  • ${icon.sizes}: ${icon.src}`);
    });

    console.log('\n✅ manifest.json successfully updated for PNG icons!');

  } catch (error) {
    console.error('❌ Error updating manifest.json:', error.message);
    process.exit(1);
  }
}

// Run the updater
if (require.main === module) {
  updateManifestForPNG();
}

module.exports = updateManifestForPNG;