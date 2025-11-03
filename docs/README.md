# 🚀 Creaovate - AI-Powered Content Creation Platform

A comprehensive, production-ready Next.js 15 application featuring AI-powered content generation, analysis, and optimization with Cloudflare Workers AI integration.

## ✨ Features

### 🤖 AI-Powered Content Generation
- **5 Content Types**: Blog posts, social media, marketing copy, email campaigns, product descriptions
- **Llama 3.1/4 Integration**: Advanced AI models via Cloudflare Workers AI
- **Smart Templates**: Pre-configured prompts for optimal results
- **Real-time Generation**: Streaming responses for instant feedback

### 📊 Content Analysis & Optimization
- **Tone Analysis**: Professional, casual, friendly, authoritative detection
- **SEO Optimization**: Keyword analysis, meta description suggestions
- **Readability Scoring**: Grade-level assessment and improvement tips
- **Engagement Metrics**: Actionable insights for better performance

### 💬 AI Chat Interface
- **Interactive Chat**: Natural conversation with AI assistant
- **Context Awareness**: Maintains conversation history
- **Specialized Prompts**: Content creation focused interactions

### 📈 Usage Analytics & Quota Management
- **Token Tracking**: Real-time usage monitoring
- **Subscription Tiers**: Free, Pro, Enterprise plans
- **Usage Insights**: Detailed analytics and reporting
- **Smart Quotas**: Automatic reset and limit management

### 🎨 Modern UI/UX
- **shadcn/ui Components**: Beautiful, accessible design system
- **Tailwind CSS**: Responsive, mobile-first styling
- **Dark/Light Mode**: User preference support
- **Progressive Enhancement**: Works without JavaScript

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library
- **Lucide Icons** - Beautiful iconography

### Backend
- **Cloudflare Workers** - Edge computing platform
- **Drizzle ORM** - Type-safe database toolkit
- **Cloudflare D1** - Serverless SQLite database
- **Cloudflare AI** - Llama 3.1/4 model access

### Development
- **TypeScript** - Full-stack type safety
- **ESLint** - Code quality enforcement
- **Prettier** - Code formatting
- **Turbopack** - Fast development builds

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Cloudflare account (for deployment)

### Development Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd creaovate
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .dev.vars
   # Edit .dev.vars with your configuration
   ```

3. **Database Setup**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Main site: http://localhost:3003
   - Dashboard: http://localhost:3003/dashboard

### Production Deployment

1. **Build and Deploy**
   ```bash
   npm run build
   ./deploy.sh
   ```

2. **Configure Environment**
   - Set production environment variables in Cloudflare Workers
   - Apply database migrations to production D1
   - Configure AI bindings

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/               # API endpoints
│   │   └── ai/           # AI-related APIs
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── dashboard/        # Dashboard components
├── lib/                  # Utility libraries
│   ├── ai/              # AI service integration
│   ├── db/              # Database configuration
│   └── utils.ts         # Helper functions
└── hooks/               # Custom React hooks
```

## 🔧 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database
- `npm run db:generate` - Generate migrations
- `npm run db:migrate` - Apply migrations (local)
- `npm run db:migrate:prod` - Apply migrations (production)
- `npm run db:studio` - Open database studio

### Deployment
- `npm run deploy` - Deploy to Cloudflare Workers
- `./deploy.sh` - Complete deployment script

### Testing
- `node test-full-functionality.js` - Run comprehensive API tests

## 🌟 Key Components

### AI Dashboard (`/src/components/dashboard/ai-dashboard-v2.tsx`)
- Complete AI interaction interface
- Real-time content generation
- Usage analytics and quota display
- Responsive design with Tailwind CSS

### API Routes
- `/api/ai/chat` - AI conversation endpoint
- `/api/ai/content` - Content generation and analysis
- `/api/ai/quota` - Usage and subscription management

### Database Schema (`/src/lib/db/schema.ts`)
- Users and authentication
- Content management
- AI usage tracking
- Analytics and insights

## 📚 Documentation

- [Complete Implementation Status](./COMPLETE_IMPLEMENTATION_STATUS.md)
- [Environment Setup Guide](./ENVIRONMENT_SETUP.md)
- [Tech Stack Details](./instructions/techstack.md)
- [Styling Guidelines](./instructions/styling-guidline.md)

## 🔒 Security & Performance

### Security Features
- Rate limiting on API endpoints
- Input validation and sanitization
- Secure token handling
- CORS configuration

### Performance Optimizations
- Edge computing with Cloudflare Workers
- Database query optimization
- Response caching
- Image optimization

## 📈 Current Status

### ✅ Completed
- Full-stack application architecture
- AI integration with Llama 3.1
- Database schema and migrations
- Complete API endpoints
- Modern dashboard UI
- Development environment setup

### 🚧 In Progress
- Production deployment configuration
- Authentication integration (Stack Auth)
- Advanced analytics dashboard

### 📋 Planned
- Team collaboration features
- Advanced content templates
- Mobile application
- Enterprise features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions and support:
- Check the documentation in `/docs`
- Review the troubleshooting guide in `ENVIRONMENT_SETUP.md`
- Create an issue for bugs or feature requests

---

**Built with ❤️ using Next.js 15, Cloudflare Workers, and modern web technologies.**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
