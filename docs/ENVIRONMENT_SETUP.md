# 🔐 Creaovate Environment Configuration Guide

## Development Environment Variables (.dev.vars)

```bash
# Database Configuration
DATABASE_URL="file:./dev.db"
D1_DATABASE_URL="your-d1-database-url"

# AI Configuration
OPENAI_API_KEY="your-openai-api-key"
OPENAI_MODEL="gpt-3.5-turbo"

# Authentication (Stack Auth)
STACK_AUTH_PROJECT_ID="your-stack-auth-project-id"
STACK_AUTH_SECRET_KEY="your-stack-auth-secret"

# Application Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3003"
NODE_ENV="development"
```

## Production Environment Variables (Cloudflare Workers)

### Required Variables:
1. **DATABASE_URL** - Your production D1 database URL
2. **CLOUDFLARE_AI_API_TOKEN** - Cloudflare Workers AI API token
3. **STACK_AUTH_PROJECT_ID** - Stack Auth project ID for authentication
4. **STACK_AUTH_SECRET_KEY** - Stack Auth secret key
5. **NEXT_PUBLIC_APP_URL** - Your production domain

### Optional Variables:
- **RATE_LIMIT_MAX** - Maximum requests per window (default: 100)
- **RATE_LIMIT_WINDOW** - Rate limit window in seconds (default: 3600)
- **ANALYTICS_ENABLED** - Enable analytics tracking (default: true)

## Setting up Cloudflare Workers AI

1. **Enable Workers AI:**
   ```bash
   wrangler ai models list
   ```

2. **Configure AI Binding in wrangler.toml:**
   ```toml
   [[ai]]
   binding = "AI"
   ```

3. **Available Models:**
   - `gpt-3.5-turbo` (Recommended, cost-effective)
   - `gpt-4` (More powerful, higher cost)
   - `gpt-4-turbo` (Latest GPT-4 model)

## Database Setup

### Development:
```bash
# Generate new migration
npm run db:generate

# Apply migrations to local D1
npm run db:migrate
```

### Production:
```bash
# Create D1 database
wrangler d1 create creaovate-production

# Apply migrations to production
npm run db:migrate:prod
```

## Authentication Setup (Stack Auth)

1. **Create Stack Auth Project:**
   - Visit [stack-auth.com](https://stack-auth.com)
   - Create new project
   - Copy project ID and secret key

2. **Configure Authentication:**
   ```typescript
   // src/lib/auth/config.ts
   export const stackAuthConfig = {
     projectId: process.env.STACK_AUTH_PROJECT_ID!,
     secretKey: process.env.STACK_AUTH_SECRET_KEY!,
   };
   ```

## Deployment Checklist

### Pre-deployment:
- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] AI models tested
- [ ] Authentication working
- [ ] Tests passing

### Post-deployment:
- [ ] Production URL accessible
- [ ] API endpoints responding
- [ ] Database queries working
- [ ] AI generation functional
- [ ] User authentication enabled

## Monitoring and Analytics

### Cloudflare Analytics:
- Workers Analytics (automatically enabled)
- D1 Query Analytics
- AI Usage Metrics

### Custom Analytics:
- User engagement tracking
- Content generation metrics
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
- Configurable limits via environment variables
- Gradual backoff for exceeded limits

### Data Protection:
- User data encrypted at rest
- Secure API token handling
- GDPR-compliant data processing

## Performance Optimization

### Caching Strategy:
- Static assets cached at edge
- API responses cached for 5 minutes
- Database queries optimized with indexes

### CDN Configuration:
- Cloudflare global CDN
- Automatic image optimization
- Brotli compression enabled

## Troubleshooting

### Common Issues:

1. **AI API Not Responding:**
   - Check Cloudflare AI binding
   - Verify API token validity
   - Confirm model availability

2. **Database Connection Failed:**
   - Verify D1 database exists
   - Check connection string format
   - Ensure migrations applied

3. **Authentication Errors:**
   - Validate Stack Auth configuration
   - Check environment variables
   - Verify callback URLs

### Debug Commands:
```bash
# Check deployment status
wrangler whoami

# View D1 database info
wrangler d1 info creaovate-production

# Check AI model status
wrangler ai models list
```

## Support and Resources

- **Documentation:** [Internal docs in /docs folder]
- **Cloudflare Workers:** [workers.cloudflare.com](https://workers.cloudflare.com)
- **Stack Auth:** [docs.stack-auth.com](https://docs.stack-auth.com)
- **Next.js 15:** [nextjs.org/docs](https://nextjs.org/docs)
