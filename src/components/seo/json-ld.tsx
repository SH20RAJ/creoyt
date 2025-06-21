interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Structured data for the main organization
export const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Creovate",
  "description": "AI-powered content creation platform that helps creators generate ideas, research trends, create content, and analyze performance.",
  "url": "https://creovate.com",
  "logo": "https://creovate.com/logo.png",
  "foundingDate": "2024",
  "sameAs": [
    "https://twitter.com/creovate",
    "https://linkedin.com/company/creovate",
    "https://github.com/creovate"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@creovate.com",
    "contactType": "customer service"
  }
}

// Structured data for the software application
export const softwareApplicationData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Creovate",
  "description": "Transform your content creation with AI. Generate ideas, research trends, create content, and analyze performance all in one powerful platform.",
  "url": "https://creovate.com",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": [
    {
      "@type": "Offer",
      "name": "Free Plan",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Perfect for getting started with basic AI content creation tools"
    },
    {
      "@type": "Offer",
      "name": "Pro Plan",
      "price": "29",
      "priceCurrency": "USD",
      "description": "For serious content creators with advanced AI tools and analytics"
    },
    {
      "@type": "Offer",
      "name": "Enterprise Plan",
      "price": "99",
      "priceCurrency": "USD",
      "description": "For teams and organizations with unlimited features and support"
    }
  ],
  "featureList": [
    "AI Content Generation",
    "Trend Research",
    "Content Analytics",
    "Social Media Management",
    "Team Collaboration",
    "Performance Tracking"
  ],
  "screenshot": "https://creovate.com/screenshot.png",
  "softwareVersion": "1.0",
  "author": {
    "@type": "Organization",
    "name": "Creovate"
  }
}

// Structured data for the website
export const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Creovate",
  "url": "https://creovate.com",
  "description": "AI-powered content creation platform",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://creovate.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
