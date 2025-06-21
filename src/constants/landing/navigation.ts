import { NavItem } from '@/types/landing';

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: 'features',
    label: 'Features',
    href: '#features'
  },
  {
    id: 'pricing',
    label: 'Pricing',
    href: '#pricing'
  },
  {
    id: 'testimonials',
    label: 'Reviews',
    href: '#testimonials'
  },
  {
    id: 'docs',
    label: 'Docs',
    href: '/docs',
    external: true
  }
];

export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'API', href: '/api' },
    { label: 'Documentation', href: '/docs' }
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' }
  ],
  resources: [
    { label: 'Help Center', href: '/help' },
    { label: 'Community', href: '/community' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Templates', href: '/templates' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' }
  ]
} as const;
