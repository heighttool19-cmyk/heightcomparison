import { MetadataRoute } from 'next';

/**
 * Sitemap Generator
 * 
 * Generates an XML sitemap for the application, covering:
 * 1. Base static routes (Home, Predictor)
 * 2. Calculator pages (Country, Difference, Percentile, IBW, Image-to-Height)
 * 3. Listing and Legal pages (Blogs list, About, Privacy)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://heightcomparisoncalculator.com';

  // Base and Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Calculator and Specialized Pages (The "VIP" tools)
  const calculatorRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/height-predictor`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/average-height-by-country`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/height-difference-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/height-weight-percentile-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ideal-body-weight-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/image-to-height`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
  return [...staticRoutes, ...calculatorRoutes];
}
