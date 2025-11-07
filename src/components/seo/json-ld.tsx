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
  "name": "YT Copilot",
  "description": "🎯 An AI co-pilot for YouTubers — helping them create, grow, and optimize their channels with advanced AI technology and proprietary algorithms.",
  "url": "https://yt-copilot.strivio.world",
  "logo": "https://yt-copilot.strivio.world/logo.png",
  "foundingDate": "2024",
  "sameAs": [
    "https://twitter.com/ytcopilot",
    "https://linkedin.com/company/yt-copilot"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@yt-copilot.strivio.world",
    "contactType": "customer service"
  }
}

// Structured data for the software application
export const softwareApplicationData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "YT Copilot",
  "description": "🎯 An AI co-pilot for YouTubers — helping them create, grow, and optimize their channels with advanced AI technology and proprietary algorithms.",
  "url": "https://yt-copilot.strivio.world",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": [
    {
      "@type": "Offer",
      "name": "Starter Plan",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Perfect for beginning YouTubers with essential AI tools"
    },
    {
      "@type": "Offer",
      "name": "Creator Plan",
      "price": "29",
      "priceCurrency": "USD",
      "description": "For serious YouTubers with advanced optimization and analytics"
    },
    {
      "@type": "Offer",
      "name": "Pro Plan",
      "price": "99",
      "priceCurrency": "USD",
      "description": "For YouTube professionals with unlimited features and priority support"
    }
  ],
  "featureList": [
    "AI Content Optimization",
    "YouTube SEO Analysis",
    "Trending Topic Research",
    "Performance Analytics",
    "Thumbnail Optimization",
    "Title & Description AI"
  ],
  "screenshot": "https://yt-copilot.strivio.world/screenshot.png",
  "softwareVersion": "1.0",
  "author": {
    "@type": "Organization",
    "name": "YT Copilot"
  }
}

// Structured data for the website
export const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "YT Copilot",
  "url": "https://yt-copilot.strivio.world",
  "description": "AI co-pilot for YouTubers",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://yt-copilot.strivio.world/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
