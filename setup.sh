#!/bin/bash

# Creovate Setup Script for Cloudflare Workers + D1
echo "🚀 Setting up Creovate with Cloudflare Workers and D1..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Login to Cloudflare (if not already logged in)
echo "🔐 Please login to Cloudflare..."
wrangler auth login

# Create D1 database
echo "🗄️  Creating D1 database..."
DB_OUTPUT=$(wrangler d1 create creovate-db)
DATABASE_ID=$(echo "$DB_OUTPUT" | grep "database_id" | cut -d'"' -f4)

if [ -z "$DATABASE_ID" ]; then
    echo "❌ Failed to create database. Please check your Cloudflare account."
    exit 1
fi

echo "✅ Database created with ID: $DATABASE_ID"

# Update wrangler.toml with the database ID
sed -i.bak "s/database_id = \"your-database-id\"/database_id = \"$DATABASE_ID\"/" wrangler.toml
rm wrangler.toml.bak

# Generate and run migrations
echo "📊 Setting up database schema..."
npm run db:generate
wrangler d1 migrations apply creovate-db --local
wrangler d1 migrations apply creovate-db --remote

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Set up your Clerk account at https://clerk.com"
echo "2. Add your Clerk keys to .env file"
echo "3. Add your Gemini API key to .env file"
echo "4. Run 'npm run dev' to start development"
echo "5. Run 'npm run deploy' to deploy to Cloudflare Workers"
echo ""
echo "🔧 Environment variables needed in .env:"
echo "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
echo "   - CLERK_SECRET_KEY"
echo "   - GEMINI_API_KEY"
echo "   - CLOUDFLARE_ACCOUNT_ID (optional for local dev)"
echo "   - CLOUDFLARE_DATABASE_ID (optional for local dev)"
