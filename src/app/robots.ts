import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
          '/sign-in',
          '/sign-up',
          '/_next/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
          '/sign-in',
          '/sign-up',
          '/_next/',
          '/admin/',
        ],
      },
    ],
    sitemap: 'https://yt-copilot.strivio.world/sitemap.xml',
  }
}
