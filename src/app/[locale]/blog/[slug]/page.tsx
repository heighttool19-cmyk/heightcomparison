/**
 * Blog Post Page — /blog/[slug]
 *
 * Server component that fetches a post from Sanity by slug and renders
 * a two-column layout: sticky Table of Contents (left) + article (right).
 *
 * Features:
 *   - Dynamic metadata for SEO
 *   - Auto-generated ToC from Portable Text h2/h3 blocks
 *   - Graceful 404 handling via notFound()
 *   - Responsive: two-column on desktop, single-column on mobile
 */
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { PortableTextBlock } from "@portabletext/types";

import { client } from "@/sanity/lib/client";
import { postBySlugQuery, allPostSlugsQuery } from "@/sanity/lib/queries";
import type { Post, TocHeading } from "@/sanity/lib/types";

import CustomPortableText from "@/components/blog/CustomPortableText";
import TableOfContents from "@/components/blog/TableOfContents";
import JsonLd from "@/components/common/JsonLd";
import { formatLocalizedDate as formatDate } from "@/i18n/config";

export async function generateStaticParams() {
  try {
    const posts = await client.fetch<{ slug: string }[]>(allPostSlugsQuery);
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for blog:", error);
    return [];
  }
}

export const revalidate = 60; // ISR cache revalidation every 60 seconds

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Slugify text for heading anchor IDs (must match CustomPortableText) */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/** Extract h2 and h3 headings from Portable Text body for the ToC */
function extractHeadings(body: PortableTextBlock[]): TocHeading[] {
  if (!body) return [];

  return body
    .filter(
      (block) =>
        block._type === "block" &&
        (block.style === "h2" || block.style === "h3")
    )
    .map((block) => {
      const text = (block.children as Array<{ text?: string }>)
        ?.map((child) => child.text || "")
        .join("")
        .trim() || ""; // Added .trim() to catch spaces-only headings

      return {
        id: slugify(text),
        text,
        level: block.style === "h2" ? 2 : 3,
      } as TocHeading;
    })
    // Filter out headings that are empty, just whitespace, or just '#'
    .filter((heading) => heading.text.length > 0 && heading.text !== "#");
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale?: string }> }) {
  const { slug, locale } = await params;
  const currentLocale = locale || "en";
  const t = await getTranslations({ locale: currentLocale, namespace: "blogPost" });
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug, locale: currentLocale });

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.body);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://heightcomparisoncalculator.com/blog/${post.slug.current}#blogposting`,
    "url": `https://heightcomparisoncalculator.com/blog/${post.slug.current}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://heightcomparisoncalculator.com/blog/${post.slug.current}`,
    },
    "headline": post.title,
    "description": post.excerpt || post.title,
    ...(post.mainImage?.asset?.url ? { image: [post.mainImage.asset.url] } : {}),
    "datePublished": post.publishedAt,
    "dateModified": post._updatedAt || post.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Height Expert",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Height Comparison Calculator",
      "url": "https://heightcomparisoncalculator.com/",
    },
    "inLanguage": currentLocale,
  };

  return (
    <article className="min-h-screen bg-bg">
      <JsonLd data={blogPostingSchema} />

      {/* ── Custom JSON-LD Schema from Sanity ─────────────────────────── */}
      {post.customSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: post.customSchema }}
        />
      )}
      {/* ── Decorative top gradient ────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-accent/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-20">
        {/* ── Two-column grid: ToC (left) | Content (right) ────────────── */}
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12 xl:grid-cols-[280px_1fr] xl:gap-16">

          {/* ── LEFT: Sticky Table of Contents (desktop only) ──────────── */}
          <TableOfContents headings={headings} title={t("jumpToSection")} />

          {/* ── RIGHT: Article content ─────────────────────────────────── */}
          <div className="min-w-0">
            {/* ── Article header ──────────────────────────────────────── */}
            <header className="mb-12 lg:mb-16">
              {/* Category / label */}
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-accent">
                {t("categoryLabel")}
              </p>

              {/* Title */}
              <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="mt-6 text-lg leading-relaxed text-muted lg:text-xl">
                  {post.excerpt}
                </p>
              )}

              {/* ── Author block + date ──────────────────────────────── */}
              <div className="mt-8 flex items-center gap-4">
                {/* Author avatar */}
                {post.author?.image?.asset?.url ? (
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-border">
                    <Image
                      src={post.author.image.asset.url.includes('cdn.sanity.io')
                        ? `${post.author.image.asset.url}?auto=format&w=96`
                        : post.author.image.asset.url}
                      alt="Icon of a person beside a height scale"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-lg">
                    {post.author?.name?.charAt(0) || "A"}
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {post.author?.name || t("unknownAuthor")}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    {post.author?.role && (
                      <>
                        <span>{post.author.role}</span>
                        <span className="text-border">·</span>
                      </>
                    )}
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt, currentLocale)}
                    </time>
                  </div>
                </div>
              </div>
            </header>

            {/* ── Main image ─────────────────────────────────────────── */}
            {post.mainImage?.asset?.url && (
              <div className="mb-12 mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-accent/5">
                <Image
                  src={post.mainImage.asset.url.includes('cdn.sanity.io')
                    ? `${post.mainImage.asset.url}?auto=format&w=1200`
                    : post.mainImage.asset.url}
                  alt={post.mainImage.alt && post.mainImage.alt !== "Main Image"
                    ? post.mainImage.alt
                    : `${post.title} - Main Image`}
                  width={1000}
                  height={562}
                  priority
                  className="mx-auto h-auto w-auto max-h-[500px] max-w-full object-contain"
                />
              </div>
            )}
            {/* ── Mobile ToC (below header) ──────────────────────────── */}
            <div className="lg:hidden">
              <TableOfContents headings={headings} title={t("jumpToSection")} />
            </div>

            {/* ── Article body ────────────────────────────────────────── */}
            <div className="prose-custom">
              <CustomPortableText value={post.body} />
            </div>

            {/* ── Bottom divider ──────────────────────────────────────── */}
            <hr className="mt-16 border-border" />
            <div className="mt-8 flex items-center gap-4">
              {post.author?.image?.asset?.url ? (
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-border">
                  <Image
                    src={post.author.image.asset.url.includes('cdn.sanity.io')
                      ? `${post.author.image.asset.url}?auto=format&w=112`
                      : post.author.image.asset.url}
                    alt="Icon of a person beside a height scale"
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-xl">
                  {post.author?.name?.charAt(0) || "A"}
                </div>
              )}
              <div>
                <p className="text-base font-semibold text-foreground">
                  {t("writtenBy", { author: post.author?.name || t("unknownAuthor") })}
                </p>
                {post.author?.role && (
                  <p className="text-sm text-muted">{post.author.role}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
