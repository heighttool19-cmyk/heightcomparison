import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";
import type { Post } from "@/sanity/lib/types";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug });

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title}`,
    description: post.excerpt || `Read "${post.title}" on our blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.publishedAt,
      ...(post.mainImage?.asset?.url && {
        images: [{ url: post.mainImage.asset.url }],
      }),
    },
    alternates: {
      canonical: `https://heightcomparisoncalculator.com/blog/${slug}`,
    },
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
