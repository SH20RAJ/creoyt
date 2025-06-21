#!/bin/bash

# Cloudflare Deployment Setup Script for Creovate
echo "🚀 Setting up Creovate for Cloudflare Workers deployment..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing Wrangler CLI..."
    npm install -g wrangler
fi

# Login to Cloudflare (if not already logged in)
echo "🔐 Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo "Please log in to Cloudflare:"
    wrangler login
fi

# Create D1 database
echo "🗄️ Creating D1 database..."
echo "Creating production database..."
wrangler d1 create creovate-db

echo "Creating preview database..."
wrangler d1 create creovate-db-preview

echo ""
echo "📝 Next steps:"
echo "1. Copy the database IDs from above and update wrangler.toml"
echo "2. Run 'npm run setup:db' to initialize the database schema"
echo "3. Run 'npm run deploy' to deploy to Cloudflare Workers"
echo ""
echo "🔧 Manual configuration required:"
echo "- Update wrangler.toml with your actual database IDs"
echo "- Ensure all environment variables are set in Cloudflare dashboard"
echo ""
echo "✅ Setup script completed!"
