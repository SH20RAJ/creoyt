import { Feature } from '@/types/landing';

export const FEATURES: Feature[] = [
  {
    id: 'ai-idea-generation',
    title: 'AI-Powered Idea Generation',
    description: 'Generate unlimited content ideas with our advanced AI engine powered by Meta\'s Llama 3. Never run out of creative inspiration.',
    icon: 'Lightbulb',
    category: 'ai-tools'
  },
  {
    id: 'research-dashboard',
    title: 'Smart Research Dashboard',
    description: 'Comprehensive research tools with real-time trend analysis, competitor intelligence, and audience insights.',
    icon: 'BarChart3',
    category: 'research'
  },
  {
    id: 'content-creation',
    title: 'Intelligent Content Creation',
    description: 'Create high-quality content with AI assistance for blogs, social media, scripts, and marketing materials.',
    icon: 'PenTool',
    category: 'creation'
  },
  {
    id: 'scout-discovery',
    title: 'Scout & Discovery Engine',
    description: 'Discover viral content, trending topics, and untapped opportunities across all major platforms.',
    icon: 'Search',
    category: 'discovery'
  },
  {
    id: 'project-management',
    title: 'Project Management Suite',
    description: 'Organize multiple projects, collaborate with teams, and track progress from ideation to publication.',
    icon: 'FolderOpen',
    category: 'productivity'
  },
  {
    id: 'global-performance',
    title: 'Lightning-Fast Global Performance',
    description: 'Built on Cloudflare Workers with sub-100ms response times across 200+ worldwide locations.',
    icon: 'Zap',
    category: 'performance'
  }
];

export const FEATURE_CATEGORIES = {
  'ai-tools': 'AI-Powered Tools',
  'research': 'Research & Analytics',
  'creation': 'Content Creation',
  'discovery': 'Discovery & Trends',
  'productivity': 'Productivity',
  'performance': 'Performance'
} as const;
