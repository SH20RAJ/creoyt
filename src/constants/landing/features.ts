import { Feature } from '@/types/landing';

export const FEATURES: Feature[] = [
  {
    id: 'ai-optimization',
    title: 'AI Video Optimization',
    description: 'Optimize your YouTube videos with our advanced AI algorithms. Get title suggestions, thumbnail analysis, and SEO recommendations.',
    icon: 'Zap',
    category: 'ai-tools'
  },
  {
    id: 'analytics-dashboard',
    title: 'Advanced Analytics Dashboard',
    description: 'Deep insights into your channel performance with predictive analytics, trend analysis, and growth projections using Turso database.',
    icon: 'BarChart3',
    category: 'analytics'
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy AI',
    description: 'AI-powered content planning with trending topic discovery, optimal posting times, and audience engagement predictions.',
    icon: 'PenTool',
    category: 'strategy'
  },
  {
    id: 'competitor-analysis',
    title: 'Competitor Intelligence',
    description: 'Track competitor performance, discover their successful strategies, and find content gaps in your niche.',
    icon: 'Search',
    category: 'research'
  },
  {
    id: 'thumbnail-optimizer',
    title: 'Thumbnail Optimizer',
    description: 'AI-powered thumbnail analysis and suggestions to maximize click-through rates and improve video discovery.',
    icon: 'FolderOpen',
    category: 'optimization'
  },
  {
    id: 'real-time-insights',
    title: 'Real-time Performance Tracking',
    description: 'Monitor your videos in real-time with instant notifications about performance changes and optimization opportunities.',
    icon: 'Lightbulb',
    category: 'monitoring'
  }
];

export const FEATURE_CATEGORIES = {
  'ai-tools': 'AI-Powered Tools',
  'analytics': 'Analytics & Insights',
  'strategy': 'Content Strategy',
  'research': 'Research & Intelligence',
  'optimization': 'Optimization',
  'monitoring': 'Performance Monitoring'
} as const;
