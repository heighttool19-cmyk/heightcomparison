import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";
import type { Post } from "@/sanity/lib/types";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string; locale?: string }>;
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const currentLocale = locale || "en";
  const t = await getTranslations({ locale: currentLocale, namespace: "blogPost" });
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug, locale: currentLocale });

  if (!post) {
    return { title: t("postNotFound") };
  }

  const baseUrl = "https://heightcomparisoncalculator.com";
  const canonical = currentLocale === "en" ? `${baseUrl}/blog/${slug}` : `${baseUrl}/${currentLocale}/blog/${slug}`;

  return {
    title: `${post.title} - Height Comparison`,
    description: post.excerpt || `${post.title}`,
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
      canonical,
      languages: {
        en: `${baseUrl}/blog/${slug}`,
        de: `${baseUrl}/de/blog/${slug}`,
        "x-default": `${baseUrl}/blog/${slug}`,
      },
    },
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

