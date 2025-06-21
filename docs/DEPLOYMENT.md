# Creovate - Cloudflare Workers Deployment Guide

## Overview
Creovate has been migrated from Prisma + NextAuth to Clerk + Drizzle + Cloudflare D1 for better performance and deployment on Cloudflare Workers.

## Key Changes Made

### 1. Authentication
- ❌ Removed: NextAuth.js
- ✅ Added: Clerk authentication
- Benefits: Better user management, built-in UI components, social logins

### 2. Database
- ❌ Removed: Prisma ORM + PostgreSQL/MySQL
- ✅ Added: Drizzle ORM + Cloudflare D1 (SQLite)
- Benefits: Edge-compatible, serverless, faster cold starts

### 3. Hosting
- 🎯 Target: Cloudflare Workers
- Benefits: Global edge deployment, instant scaling, low latency

### 4. Branding
- ❌ Old: CreoYT (YouTube-focused)
- ✅ New: Creovate (Creative innovation)

## Quick Setup

### Prerequisites
- Node.js 18+
- Cloudflare account
- Clerk account

### 1. Run Setup Script
```bash
./setup.sh
```

### 2. Configure Environment Variables
Create/update `.env` file:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# AI Services
GEMINI_API_KEY=your_gemini_api_key

# Optional: Stripe for billing
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3. Development
```bash
npm run dev
```

### 4. Deploy
```bash
npm run deploy
```

## Manual Setup (Alternative)

### 1. Install Dependencies
```bash
npm install
```

### 2. Login to Cloudflare
```bash
wrangler auth login
```

### 3. Create D1 Database
```bash
wrangler d1 create creovate-db
```

### 4. Update wrangler.toml
Replace `database_id` in `wrangler.toml` with the ID from step 3.

### 5. Set up Database Schema
```bash
npm run db:generate
wrangler d1 migrations apply creovate-db --local
wrangler d1 migrations apply creovate-db --remote
```

## Database Schema

The app uses the following tables:
- `users` - User profiles
- `projects` - User projects
- `ideas` - Generated ideas
- `waitlist` - Email waitlist
- `subscriptions` - Billing subscriptions

## API Routes Updated

### Authentication
- ❌ `/api/auth/*` (NextAuth) 
- ✅ Clerk handles auth automatically

### Protected Routes
- `/api/ideas` - Generate and manage ideas
- `/api/projects` - Project management
- `/api/generate` - AI content generation

## Features

### Current Features
- ✅ User authentication (Clerk)
- ✅ Idea generation (Gemini AI)
- ✅ Project management
- ✅ Responsive dashboard
- ✅ Waitlist management

### Planned Features
- 🔄 Stripe billing integration
- 🔄 Advanced AI tools
- 🔄 Team collaboration
- 🔄 Content templates

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure D1 database is created
   - Check `wrangler.toml` has correct database_id
   - Run migrations: `wrangler d1 migrations apply creovate-db --remote`

2. **Clerk Authentication Not Working**
   - Verify environment variables are set
   - Check Clerk dashboard for correct keys
   - Ensure middleware is properly configured

3. **Build Errors**
   - Run `npm install` to ensure all dependencies
   - Check Next.js compatibility with Cloudflare Workers
   - Verify `next.config.mjs` configuration

### Useful Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run lint                   # Run linting

# Database
npm run db:generate            # Generate migrations
npm run db:migrate             # Apply migrations
npm run db:studio              # Open Drizzle Studio

# Cloudflare
npm run cf:dev                 # Local CF Workers dev
npm run deploy                 # Deploy to CF Workers
wrangler d1 execute creovate-db --command "SELECT * FROM users" # Query database
```

## Support

For issues:
1. Check the troubleshooting section above
2. Review Cloudflare Workers documentation
3. Check Clerk documentation for auth issues
4. Review Drizzle ORM docs for database queries

## Migration Notes

If migrating from the old CreoYT setup:
1. Export user data from old database
2. Set up new Clerk users
3. Import projects and ideas using the new schema
4. Update any hardcoded references to "CreoYT" → "Creovate"
