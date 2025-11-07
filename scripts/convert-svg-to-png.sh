#!/bin/bash

# 🚀 SVG to PNG Converter Script
# Converts all generated SVG icons to PNG format using ImageMagick
# 
# Prerequisites: 
# - ImageMagick installed (brew install imagemagick on macOS)
# - SVG icons already generated (npm run icons:simple)

set -e

echo "🔄 Converting SVG icons to PNG format..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found!"
    echo "📦 Install ImageMagick:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Navigate to project directory
cd "$(dirname "$0")/.."
PROJECT_ROOT=$(pwd)
PUBLIC_DIR="$PROJECT_ROOT/public"
ICONS_DIR="$PUBLIC_DIR/icons"
SCREENSHOTS_DIR="$PUBLIC_DIR/screenshots"

echo "📁 Project directory: $PROJECT_ROOT"

# Convert PWA icons (icons folder)
echo "🎨 Converting PWA icons..."
if [ -d "$ICONS_DIR" ]; then
    cd "$ICONS_DIR"
    for svg_file in *.svg; do
        if [ -f "$svg_file" ]; then
            png_file="${svg_file%.svg}.png"
            echo "  Converting: $svg_file → $png_file"
            convert "$svg_file" -background transparent "$png_file"
        fi
    done
    echo "  ✅ PWA icons converted"
else
    echo "  ⚠️ Icons directory not found"
fi

# Convert favicons (public root)
echo "🔖 Converting favicons..."
cd "$PUBLIC_DIR"
for svg_file in favicon*.svg; do
    if [ -f "$svg_file" ]; then
        png_file="${svg_file%.svg}.png"
        echo "  Converting: $svg_file → $png_file"
        convert "$svg_file" -background transparent "$png_file"
    fi
done

# Convert apple-touch-icon
if [ -f "apple-touch-icon.svg" ]; then
    echo "  Converting: apple-touch-icon.svg → apple-touch-icon.png"
    convert "apple-touch-icon.svg" -background transparent "apple-touch-icon.png"
fi
echo "  ✅ Favicons converted"

# Convert screenshots
echo "📱 Converting screenshots..."
if [ -d "$SCREENSHOTS_DIR" ]; then
    cd "$SCREENSHOTS_DIR"
    for svg_file in *.svg; do
        if [ -f "$svg_file" ]; then
            png_file="${svg_file%.svg}.png"
            echo "  Converting: $svg_file → $png_file"
            # Use higher DPI for screenshots
            convert "$svg_file" -density 150 -background white "$png_file"
        fi
    done
    echo "  ✅ Screenshots converted"
else
    echo "  ⚠️ Screenshots directory not found"
fi

# Generate favicon.ico from 32x32 PNG
cd "$PUBLIC_DIR"
if [ -f "favicon-32x32.png" ]; then
    echo "🔖 Generating favicon.ico..."
    convert "favicon-32x32.png" "favicon.ico"
    echo "  ✅ favicon.ico generated"
fi

echo ""
echo "✨ SVG to PNG conversion completed!"
echo ""
echo "📊 SUMMARY:"
echo "🎨 PWA Icons: Converted to PNG with transparency"
echo "🔖 Favicons: Converted to PNG with transparency"  
echo "🍎 Apple Touch Icons: Converted to PNG with transparency"
echo "📱 Screenshots: Converted to PNG with white background"
echo "💾 favicon.ico: Generated from 32x32 PNG"
echo ""
echo "🎯 NEXT STEPS:"
echo "1. Test PWA installation on mobile devices"
echo "2. Update manifest.json to reference PNG files (if needed)"
echo "3. Deploy to production"
echo ""
echo "🌐 Browser Support: PNG icons work in all browsers!"