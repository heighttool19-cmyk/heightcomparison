import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // 1. General Rules for Search Engines
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',       // Don't crawl backend routes
          '/studio/',    // Don't crawl Sanity CMS panel
          '/s/',         // Don't crawl temporary share links
          '/*?*',        // Don't crawl search parameters or query strings
        ],
      },
      {
        // 2. Block Aggressive SEO Tools
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'Rogerbot'],
        disallow: '/',
      },
    ],
    sitemap: 'https://heightcomparisoncalculator.com/sitemap.xml',
  };
}