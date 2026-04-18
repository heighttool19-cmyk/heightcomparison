import { MetadataRoute } from 'next';

/**
 * Robots Configuration
 * 
 * Generates an XML robots.txt file for the application.
 * Configures crawling permissions and points to the sitemap location.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',       // Don't crawl backend routes
        '/studio/',    // Don't crawl Sanity CMS panel
        '/s/',         // Don't crawl temporary share links
        '/*?*',        // Don't crawl search parameters or query strings
      ],
    },
  };
}
