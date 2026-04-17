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
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";

import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";
import type { Post, TocHeading } from "@/sanity/lib/types";

import CustomPortableText from "@/components/blog/CustomPortableText";
import TableOfContents from "@/components/blog/TableOfContents";

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
/** Format a date string into a human-readable form */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.body);

  return (
    <article className="min-h-screen bg-bg">
      {/* ── Decorative top gradient ────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-accent/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-20">
        {/* ── Two-column grid: ToC (left) | Content (right) ────────────── */}
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12 xl:grid-cols-[280px_1fr] xl:gap-16">

          {/* ── LEFT: Sticky Table of Contents (desktop only) ──────────── */}
          <TableOfContents headings={headings} />

          {/* ── RIGHT: Article content ─────────────────────────────────── */}
          <div className="min-w-0">
            {/* ── Article header ──────────────────────────────────────── */}
            <header className="mb-12 lg:mb-16">
              {/* Category / label */}
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-accent">
                Blog Post
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.author.image.asset.url}
                      alt={post.author.name}
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
                    {post.author?.name || "Unknown Author"}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    {post.author?.role && (
                      <>
                        <span>{post.author.role}</span>
                        <span className="text-border">·</span>
                      </>
                    )}
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                </div>
              </div>
            </header>

            {/* ── Main image ─────────────────────────────────────────── */}
            {post.mainImage?.asset?.url && (
              // Added max-w-3xl and mx-auto to constrain the width and center it.
              // Added a subtle background (bg-accent/5) in case the image doesn't fill the borders.
              <div className="mb-12 mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-accent/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt || post.title}
                  // Removed w-full stretching. 
                  // Added max-h-[500px] and object-contain to keep it crisp.
                  className="mx-auto h-auto w-auto max-h-[500px] max-w-full object-contain"
                />
              </div>
            )}
            {/* ── Mobile ToC (below header) ──────────────────────────── */}
            <div className="lg:hidden">
              <TableOfContents headings={headings} />
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.author.image.asset.url}
                    alt={post.author.name}
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
                  Written by {post.author?.name || "Unknown Author"}
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
