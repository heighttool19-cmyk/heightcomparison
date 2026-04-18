import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { allPostSlugsQuery } from '@/sanity/lib/queries';

/**
 * Sitemap Generator
 * 
 * Generates an XML sitemap for the application, covering:
 * 1. Base static routes (Home, Predictor)
 * 2. Calculator pages (Country, Difference, Percentile, IBW, Image-to-Height)
 * 3. Listing and Legal pages (Blogs list, About, Privacy)
 * 4. Dynamic blog post slugs fetched from Sanity CMS
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

  // Dynamic blog post pages from Sanity
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await client.fetch<{ slug: string }[]>(allPostSlugsQuery);
    blogRoutes = slugs.map((item) => ({
      url: `${baseUrl}/blog/${item.slug}`, // Fixed path based on src/app/blog/[slug]
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching blog slugs for sitemap:', error);
  }

  return [...staticRoutes, ...calculatorRoutes, ...blogRoutes];
}
