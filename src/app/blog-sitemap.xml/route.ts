import { client } from '@/sanity/lib/client';
import { allPostSlugsQuery } from '@/sanity/lib/queries';

export async function GET() {
  const baseUrl = 'https://heightcomparisoncalculator.com';
  
  let blogRoutes = '';
  try {
    const slugs = await client.fetch<{ slug: string }[]>(allPostSlugsQuery);
    blogRoutes = slugs.map((item) => `  <url>
    <loc>${baseUrl}/blog/${item.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');
  } catch (error) {
    console.error('Error fetching blog slugs for sitemap:', error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogRoutes}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
