/**
 * CustomPortableText Component
 *
 * Provides custom renderers for @portabletext/react that conform
 * to the project's design system. Handles:
 *   - Image blocks with rounded corners, borders, and optional captions
 *   - Link marks styled with accent color
 *   - Heading blocks (h2, h3) with auto-generated IDs for ToC anchoring
 */
import React from "react";
import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextComponentProps,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImage } from "@/sanity/lib/types";

// ---------------------------------------------------------------------------
// Helper: format markdown links [text](url), **bold**, *italic*, <br/>
// ---------------------------------------------------------------------------
function renderFormattedInline(text: string): React.ReactNode {
  if (!text) return null;

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(renderBasicFormatting(text.substring(lastIndex, match.index)));
    }
    const [, linkText, url] = match;
    const isExternal = url.startsWith("http");
    parts.push(
      <a
        key={match.index}
        href={url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-accent underline decoration-accent/40 font-semibold underline-offset-2 hover:decoration-accent transition-colors"
      >
        {linkText}
      </a>
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(renderBasicFormatting(text.substring(lastIndex)));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

function renderBasicFormatting(text: string): React.ReactNode {
  const lines = text.split(/<br\s*\/?>|\n/gi);
  return lines.map((line, idx) => {
    const boldParts = line.split(/(\*\*[^*]+\*\*)/g);
    const content = boldParts.map((bPart, bIdx) => {
      if (bPart.startsWith("**") && bPart.endsWith("**")) {
        return (
          <strong key={bIdx} className="font-bold text-foreground">
            {bPart.slice(2, -2)}
          </strong>
        );
      }
      return bPart;
    });

    return (
      <React.Fragment key={idx}>
        {idx > 0 && <br />}
        {content}
      </React.Fragment>
    );
  });
}

// ---------------------------------------------------------------------------
// Utility: slugify heading text for anchor IDs
// ---------------------------------------------------------------------------
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ---------------------------------------------------------------------------
// Extract plain text from a Portable Text block's children
// ---------------------------------------------------------------------------
function extractTextFromBlock(block: PortableTextBlock): string {
  if (!block.children) return "";
  return (block.children as Array<{ text?: string }>)
    .map((child) => child.text || "")
    .join("");
}

// ---------------------------------------------------------------------------
// Custom component definitions
// ---------------------------------------------------------------------------
const components: PortableTextComponents = {
  // ── Block-level types ───────────────────────────────────────────────────
  types: {
    /** Beautifully styled image block with optional caption */
    /** Beautifully styled image block with optional caption */
    image: ({ value }: { value: SanityImage }) => {
      const url = value?.asset?.url;
      if (!url) return null;

      const optimizedUrl = url.includes('cdn.sanity.io')
        ? `${url}?auto=format&w=800`
        : url;

      const altText = value.alt && value.alt !== "Main Image" && value.alt !== "Blog post image"
        ? value.alt
        : value.caption || "Height comparison historical reference image";

      return (
        <figure className="my-10">
          <div className="flex justify-center overflow-hidden rounded-2xl border border-border bg-accent/5">
            <Image
              src={optimizedUrl}
              alt={altText}
              width={800}
              height={500}
              loading="lazy"
              className="h-auto w-auto max-w-full max-h-[600px] object-contain"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted italic">
              {renderFormattedInline(value.caption)}
            </figcaption>
          )}
        </figure>
      );
    },
    /** Responsive table renderer for @sanity/table */
    table: ({ value }: { value: { rows: { cells: string[] }[] } }) => {
      if (!value?.rows?.length) return null;

      const [header, ...rows] = value.rows;

      return (
        <div className="my-10 overflow-hidden rounded-2xl border border-border bg-surface ring-1 ring-border/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm md:text-base">
              {header?.cells && (
                <thead className="bg-accent/10 border-b-2 border-border">
                  <tr>
                    {header.cells.map((cell, i) => (
                      <th
                        key={i}
                        className="px-4 py-4 font-black uppercase tracking-wider text-foreground text-xs"
                      >
                        {renderFormattedInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-border/50">
                {rows.map((row, i) => (
                  <tr key={i} className="hover:bg-accent/[0.04] transition-colors odd:bg-transparent even:bg-surface/50">
                    {row.cells.map((cell, j) => (
                      <td
                        key={j}
                        className="px-4 py-3.5 text-muted font-medium break-words leading-relaxed align-top"
                      >
                        {renderFormattedInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    },
  },

  // ── Marks (inline decorations & annotations) ───────────────────────────
  marks: {
    /** External/internal links */
    link: ({
      value,
      children,
    }: {
      value?: { href?: string; blank?: boolean };
      children?: React.ReactNode;
    }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");

      return (
        <a
          href={href}
          target={value?.blank || isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
        >
          {children}
        </a>
      );
    },

    /** Inline code */
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-sm text-accent border border-border">
        {children}
      </code>
    ),
  },

  // ── Block styles (headings, blockquotes, etc.) ──────────────────────────
  block: {
    /** H2 — primary section heading, anchored for ToC */
    h2: (props: PortableTextComponentProps<PortableTextBlock>) => {
      const text = extractTextFromBlock(props.value);
      const id = slugify(text);

      return (
        <h2
          id={id}
          className="scroll-mt-28 mt-14 mb-5 text-3xl font-black tracking-tight text-foreground lg:text-4xl"
        >
          {props.children}
        </h2>
      );
    },

    /** H3 — sub-section heading, anchored for ToC */
    h3: (props: PortableTextComponentProps<PortableTextBlock>) => {
      const text = extractTextFromBlock(props.value);
      const id = slugify(text);

      return (
        <h3
          id={id}
          className="scroll-mt-28 mt-10 mb-4 text-2xl font-bold tracking-tight text-foreground"
        >
          {props.children}
        </h3>
      );
    },

    /** H4 */
    h4: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <h4 className="mt-8 mb-3 text-xl font-bold text-foreground">
        {props.children}
      </h4>
    ),

    /** Normal paragraph */
    normal: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="mb-6 text-base leading-relaxed text-muted lg:text-lg lg:leading-8">
        {props.children}
      </p>
    ),

    /** Blockquote */
    blockquote: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <blockquote className="my-8 border-l-4 border-accent pl-6 italic text-muted">
        {props.children}
      </blockquote>
    ),
  },

  // ── List styles ─────────────────────────────────────────────────────────
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="my-6 ml-6 list-disc space-y-2 text-muted marker:text-accent">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="my-6 ml-6 list-decimal space-y-2 text-muted marker:text-accent">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-base leading-relaxed lg:text-lg">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-base leading-relaxed lg:text-lg">{children}</li>
    ),
  },
};

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------
interface CustomPortableTextProps {
  value: PortableTextBlock[];
}

export default function CustomPortableText({ value }: CustomPortableTextProps) {
  if (!value || value.length === 0) {
    return (
      <p className="text-muted italic">No content available for this post.</p>
    );
  }

  return <PortableText value={value} components={components} />;
}
