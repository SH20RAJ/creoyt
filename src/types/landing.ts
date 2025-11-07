export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface LandingPageData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  features: Feature[];
  testimonials: Testimonial[];
  navigation: NavItem[];
}
