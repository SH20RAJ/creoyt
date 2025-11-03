# 🔐 YT Copilot Environment Configuration Guide

## Development Environment Variables (.env.local)

```bash
# Database Configuration (Turso)
TURSO_DB_URL="libsql://your-database.turso.io"
TURSO_DB_TOKEN="your-turso-auth-token"

# OpenAI Configuration
OPENAI_API_KEY="sk-proj-your-openai-api-key"
OPENAI_MODEL="gpt-3.5-turbo"

# Authentication (Stack Auth)
NEXT_PUBLIC_STACK_PROJECT_ID="your-stack-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-stack-publishable-key"
STACK_SECRET_SERVER_KEY="your-stack-secret-key"

# Application Configuration
NEXT_PUBLIC_APP_URL="https://yt-copilot.strivio.world"
NODE_ENV="development"
```

## Production Environment Variables

### Required Variables:
1. **TURSO_DB_URL** - Your Turso database URL
2. **TURSO_DB_TOKEN** - Turso authentication token
3. **OPENAI_API_KEY** - OpenAI API key for GPT models
4. **NEXT_PUBLIC_STACK_PROJECT_ID** - Stack Auth project ID
5. **STACK_SECRET_SERVER_KEY** - Stack Auth secret key
6. **NEXT_PUBLIC_APP_URL** - Production domain (https://yt-copilot.strivio.world)

### Optional Variables:
- **OPENAI_MODEL** - OpenAI model to use (default: gpt-3.5-turbo)
- **RATE_LIMIT_MAX** - Maximum requests per window (default: 100)
- **RATE_LIMIT_WINDOW** - Rate limit window in seconds (default: 3600)
- **ANALYTICS_ENABLED** - Enable analytics tracking (default: true)

## Setting up Turso Database

1. **Create Turso Account:**
   ```bash
   # Install Turso CLI
   curl -sSfL https://get.tur.so/install.sh | bash
   
   # Login to Turso
   turso auth login
   ```

2. **Create Database:**
   ```bash
   # Create new database
   turso db create yt-copilot
   
   # Get database URL and token
   turso db show yt-copilot
   turso db tokens create yt-copilot
   ```

3. **Available Regions:**
   - `ams` - Amsterdam
   - `iad` - Washington D.C.
   - `hkg` - Hong Kong
   - `lax` - Los Angeles
   - `syd` - Sydney

## Setting up OpenAI API

1. **Create OpenAI Account:**
   - Visit [platform.openai.com](https://platform.openai.com)
   - Create account and add billing information
   - Generate API key

2. **Available Models:**
   - `gpt-3.5-turbo` (Recommended, cost-effective)
   - `gpt-4` (More powerful, higher cost)
   - `gpt-4-turbo` (Latest GPT-4 model)
   - `gpt-4o` (Optimized for speed and cost)

3. **Pricing (as of 2024):**
   - GPT-3.5-turbo: $0.0015/$0.002 per 1K tokens (input/output)
   - GPT-4: $0.03/$0.06 per 1K tokens (input/output)

## Database Setup

### Development:
```bash
# Generate new migration
npm run db:generate

# Push schema to database
npm run db:push

# Open database studio
npm run db:studio
```

### Production:
```bash
# Apply migrations
npm run db:migrate

# Verify schema
turso db shell yt-copilot ".schema"
```

## Authentication Setup (Stack Auth)

1. **Create Stack Auth Project:**
   - Visit [stack-auth.com](https://stack-auth.com)
   - Create new project
   - Configure OAuth providers
   - Copy project credentials

2. **Configure Authentication:**
   ```typescript
   // src/lib/auth/config.ts
   export const stackAuthConfig = {
     projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
     publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
     secretServerKey: process.env.STACK_SECRET_SERVER_KEY!,
   };
   ```

## Deployment Checklist

### Pre-deployment:
- [ ] Turso database created and configured
- [ ] OpenAI API key obtained and tested
- [ ] Stack Auth project configured
- [ ] Environment variables set
- [ ] Database schema pushed
- [ ] Tests passing

### Post-deployment:
- [ ] Production URL accessible (yt-copilot.strivio.world)
- [ ] API endpoints responding
- [ ] Database queries working
- [ ] AI generation functional
- [ ] User authentication enabled
- [ ] SSL certificate active

## Monitoring and Analytics

### Turso Analytics:
- Database query metrics
- Connection statistics
- Performance monitoring
- Usage analytics

### OpenAI Usage Tracking:
- Token consumption monitoring
- Cost tracking per user
- Model performance metrics
- Rate limit monitoring

### Custom Analytics:
- YouTube content generation metrics
- User engagement tracking
- API usage statistics
- Error rate monitoring

## Security Configuration

### Headers:
```typescript
// Security headers configured in middleware
'X-Frame-Options': 'DENY',
'X-Content-Type-Options': 'nosniff',
'Referrer-Policy': 'origin-when-cross-origin',
'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
```

### Rate Limiting:
- Implemented per-user and per-IP
- OpenAI API rate limits respected
- Configurable limits via environment variables
- Gradual backoff for exceeded limits

### Data Protection:
- User data encrypted at rest (Turso)
- Secure API token handling
- GDPR-compliant data processing
- YouTube content privacy respected

## Performance Optimization

### Database Performance:
- Turso edge replication
- Optimized queries with Drizzle ORM
- Connection pooling
- Automatic scaling

### AI Performance:
- OpenAI response caching
- Streaming responses for real-time feedback
- Token usage optimization
- Model selection based on use case

### CDN Configuration:
- Global edge distribution
- Automatic image optimization
- Brotli compression enabled
- Static asset caching

## Troubleshooting

### Common Issues:

1. **OpenAI API Errors:**
   - Check API key validity
   - Verify billing account status
   - Confirm rate limits not exceeded
   - Validate request format

2. **Turso Database Issues:**
   - Verify database URL format
   - Check authentication token
   - Ensure database exists
   - Confirm schema is up to date

3. **Authentication Errors:**
   - Validate Stack Auth configuration
   - Check environment variables
   - Verify callback URLs
   - Confirm project settings

### Debug Commands:
```bash
# Check Turso database status
turso db list
turso db show yt-copilot

# Test OpenAI API
npm run test:openai

# Verify environment variables
npm run test:env
```

## YouTube-Specific Features

### Content Types Supported:
- Video titles and descriptions
- YouTube Shorts scripts
- Channel descriptions
- Video tags and keywords
- Thumbnail text suggestions
- Community post content

### YouTube API Integration:
- Channel analytics integration
- Video performance metrics
- Trending topics analysis
- Competitor content analysis

## Support and Resources

- **Documentation:** [Internal docs in /docs folder]
- **Turso:** [docs.turso.tech](https://docs.turso.tech)
- **OpenAI:** [platform.openai.com/docs](https://platform.openai.com/docs)
- **Stack Auth:** [docs.stack-auth.com](https://docs.stack-auth.com)
- **Next.js 15:** [nextjs.org/docs](https://nextjs.org/docs)
- **YouTube API:** [developers.google.com/youtube](https://developers.google.com/youtube)