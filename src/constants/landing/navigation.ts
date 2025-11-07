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
  }
];

export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' }
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' }
  ]
} as const;
