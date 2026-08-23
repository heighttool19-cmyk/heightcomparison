import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // General Rules for Search Engines
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',       // Don't crawl backend API routes
          '/studio/',    // Don't crawl Sanity CMS admin panel
          '/s/',         // Don't crawl temporary share links
        ],
      },
    ],
    sitemap: 'https://heightcomparisoncalculator.com/sitemap.xml',
  };
}