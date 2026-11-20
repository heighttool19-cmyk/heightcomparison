import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";
import type { Post } from "@/sanity/lib/types";
import { getAlternateLanguages, getCanonicalUrl, getSocialMetadata } from "@/i18n/config";

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

  const title = post.title;
  const description = post.excerpt || post.title;
  const imageUrl = post.mainImage?.asset?.url || 'https://heightcomparisoncalculator.com/height-comparison-chart-example.png';

  const social = getSocialMetadata({
    title,
    description,
    path: `/blog/${slug}`,
    locale: currentLocale,
    type: 'article',
    image: {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: post.mainImage?.alt || title,
    },
  });

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(`/blog/${slug}`, currentLocale),
      languages: getAlternateLanguages(`/blog/${slug}`),
    },
    openGraph: {
      ...social.openGraph,
      publishedTime: post.publishedAt,
    },
    twitter: social.twitter,
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

