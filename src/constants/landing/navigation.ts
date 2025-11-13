import { NavItem } from '@/types/landing';

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'pricing', label: 'Pricing', href: '/#pricing' },
  { id: 'docs', label: 'Docs', href: '/docs' },
  { id: 'projects', label: 'Projects', href: '/dashboard/projects' },
];

export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '#features' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' }
  ]
} as const;
