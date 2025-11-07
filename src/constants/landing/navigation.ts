import { NavItem } from '@/types/landing';

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: 'features',
    label: 'Features',
    href: '#features'
  }
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
