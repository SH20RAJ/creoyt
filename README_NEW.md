# ✨ **Creovate: Your Ultimate Creative Content Assistant**

![Creovate Banner](https://socialify.git.ci/creovate/creovate/image?description=1&language=1&name=1&owner=1&pattern=Circuit+Board&pulls=1&stargazers=1&theme=Dark)

**Creovate** is an AI-powered creative platform that helps creators, entrepreneurs, and professionals generate ideas, manage projects, and bring their creative visions to life. Built with modern web technologies and deployed on the edge for lightning-fast performance.

🌐 **Website**: [https://creovate.com](https://creovate.com)

---

## 🚀 **Features**

### 🧠 **AI-Powered Creativity**
- **Idea Generation**: Generate unlimited creative ideas using Google's Gemini AI
- **Content Creation**: AI-assisted writing and content development
- **Research Assistant**: Smart research and trend analysis
- **Project Planning**: Intelligent project structuring and management

### 📊 **Project Management**
- **Dashboard**: Centralized workspace for all your projects
- **Organization**: Tag-based project categorization
- **Collaboration**: Share and collaborate on creative projects
- **Progress Tracking**: Monitor project development stages

### 🔧 **Advanced Tools**
- **Novel Editor**: Rich text editor with AI integration
- **Template Library**: Pre-built templates for various content types
- **Export Options**: Multiple format exports and sharing
- **Analytics**: Track your creative performance and insights

### 🎯 **Specialized Features**
- **Outliner**: Structure your ideas and projects
- **Scout**: Discover trending topics and inspiration
- **Optimization**: AI-powered content optimization
- **Community**: Connect with other creators

---

## 🛠️ **Tech Stack**

**Creovate** is built with cutting-edge technology:

- **Framework**: Next.js 15 with App Router
- **Authentication**: Clerk (secure, scalable auth)
- **Database**: Drizzle ORM + Cloudflare D1 (SQLite)
- **AI**: Google Gemini API for content generation
- **Hosting**: Cloudflare Workers (edge deployment)
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Payments**: Stripe (for premium features)

---

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+
- Cloudflare account
- Clerk account
- Google AI Studio account (for Gemini API)

### 1. Clone and Setup
```bash
git clone https://github.com/your-username/creovate.git
cd creovate
./setup.sh  # Automated setup script
```

### 2. Environment Variables
Copy `.env.example` to `.env` and fill in your keys:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Development
```bash
npm run dev
```

### 4. Deploy
```bash
npm run deploy
```

---

## 📂 **Project Structure**

```
creovate/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── (landing)/      # Landing page routes
│   │   ├── (main)/         # Main app routes
│   │   ├── dashboard/      # Dashboard pages
│   │   └── api/            # API routes
│   ├── components/         # React components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── landing/        # Landing page components
│   │   └── ui/             # Shadcn/ui components
│   ├── db/                 # Database schema and config
│   └── lib/                # Utility functions
├── drizzle/                # Database migrations
├── wrangler.toml          # Cloudflare Workers config
└── drizzle.config.js      # Drizzle ORM config
```

---

## 🔄 **Migration from CreoYT**

If you're migrating from the old CreoYT setup:

1. **Authentication**: Replaced NextAuth with Clerk
2. **Database**: Migrated from Prisma to Drizzle + D1
3. **Hosting**: Changed from traditional hosting to Cloudflare Workers
4. **Branding**: Updated from CreoYT to Creovate

See `DEPLOYMENT.md` for detailed migration instructions.

---

## 📊 **Development**

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run deploy       # Deploy to Cloudflare Workers
npm run db:generate  # Generate database migrations
npm run db:migrate   # Apply database migrations
npm run db:studio    # Open Drizzle Studio
```

### Database Management
```bash
# Generate new migration
npm run db:generate

# Apply migrations locally
wrangler d1 migrations apply creovate-db --local

# Apply migrations to production
wrangler d1 migrations apply creovate-db --remote

# Query database
wrangler d1 execute creovate-db --command "SELECT * FROM users"
```

---

## 🤝 **Contributing**

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Clone** your fork
3. **Create** a feature branch
4. **Make** your changes
5. **Submit** a pull request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📈 **Roadmap**

### Current Features ✅
- User authentication and management
- AI-powered idea generation
- Project management dashboard
- Rich text editor with AI assistance

### Coming Soon 🚀
- **Stripe Integration**: Premium subscriptions and billing
- **Team Collaboration**: Multi-user project sharing
- **Advanced AI Tools**: More AI-powered creative features
- **Mobile App**: React Native mobile application
- **Integrations**: Connect with popular creative tools

### Future Plans 🔮
- **API Platform**: Public API for developers
- **Plugin System**: Extensible plugin architecture
- **AI Training**: Custom AI model training
- **Enterprise Features**: Advanced team management

---

## 💰 **Pricing**

- **Free Tier**: Basic features, limited AI usage
- **Pro Plan**: $9.99/month - Unlimited AI, advanced features
- **Team Plan**: $19.99/month - Team collaboration, priority support
- **Enterprise**: Custom pricing for large organizations

---

## 🆘 **Support**

Need help? We're here for you:

- 📧 **Email**: support@creovate.com
- 💬 **Discord**: [Join our community](https://discord.gg/creovate)
- 📖 **Documentation**: [docs.creovate.com](https://docs.creovate.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/creovate/creovate/issues)

---

## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Clerk** for authentication infrastructure
- **Cloudflare** for edge computing platform
- **Google** for Gemini AI API
- **Vercel** for Next.js framework
- **Shadcn** for beautiful UI components

---

## 🌟 **Show Your Support**

If you find Creovate helpful, please consider:
- ⭐ **Starring** this repository
- 🐦 **Following** us on [Twitter](https://twitter.com/creovate)
- 📝 **Writing** a review or blog post
- 🤝 **Contributing** to the project

---

**Made with ❤️ by the Creovate Team**

*Empowering creativity through AI and innovation*
