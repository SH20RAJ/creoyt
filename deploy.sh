#!/bin/bash
# Production Deployment Script for Creaovate AI Platform

echo "🚀 Deploying Creaovate to Production..."

# Step 1: Build the application
echo "📦 Building Next.js application..."
npm run build

# Step 2: Deploy to Cloudflare Workers
echo "☁️ Deploying to Cloudflare Workers..."
npm run deploy

# Step 3: Apply database migrations to production
echo "🗄️ Applying database migrations..."
npm run db:migrate:prod

# Step 4: Verify deployment
echo "✅ Verifying deployment..."
echo "Your Creaovate AI Platform has been deployed!"
echo "Visit your production URL to test the live application."

echo ""
echo "🔧 Post-deployment checklist:"
echo "1. Set up environment variables in Cloudflare Workers"
echo "2. Configure Cloudflare AI binding"
echo "3. Test all API endpoints"
echo "4. Verify database connectivity"
echo "5. Set up monitoring and analytics"
echo ""
echo "🎉 Deployment complete!"
