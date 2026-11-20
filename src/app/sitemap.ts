import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

export const revalidate = 3600; // Revalidate sitemap every hour

/**
 * Sitemap Generator
 * 
 * Generates an XML sitemap for the application with accurate, per-page lastmod dates:
 * 1. Base static routes (Home, Predictor, About, Privacy, Contact)
 * 2. Calculator pages (Country, Difference, Percentile, IBW, Image-to-Height)
 * 3. Dynamic Blog Post URLs fetched live from Sanity CMS with actual revision dates
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://heightcomparisoncalculator.com';

  // Base and Core Static Routes with verified content revision dates
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date('2026-11-20'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date('2026-11-14'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2026-11-14'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-11-14'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-11-14'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Calculator and Specialized Pages (The "VIP" tools)
  const calculatorRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/height-predictor`,
      lastModified: new Date('2026-11-20'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/average-height-by-country`,
      lastModified: new Date('2026-11-20'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/height-difference-calculator`,
      lastModified: new Date('2026-11-20'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/height-weight-percentile-calculator`,
      lastModified: new Date('2026-11-20'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ideal-body-weight-calculator`,
      lastModified: new Date('2026-11-20'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/image-to-height`,
      lastModified: new Date('2026-11-20'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic Blog Posts fetched from Sanity CMS with CMS published/updated dates
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await client.fetch<{ slug: string; _updatedAt?: string; publishedAt?: string }[]>(
      `*[_type == "post" && defined(slug.current)] { "slug": slug.current, _updatedAt, publishedAt }`
    );

    blogRoutes = posts.map((post) => {
      const dateStr = post._updatedAt || post.publishedAt;
      return {
        url: `${baseUrl}/blog/${post.slug}`,
        ...(dateStr ? { lastModified: new Date(dateStr) } : {}),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return [...staticRoutes, ...calculatorRoutes, ...blogRoutes];
}
