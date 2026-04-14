/**
 * TypeScript interfaces for Sanity blog data.
 *
 * These types mirror the GROQ query projections in queries.ts,
 * NOT the raw Sanity schema — they represent the resolved/fetched shape.
 */
import type { PortableTextBlock } from "@portabletext/types";

/** Sanity image asset with resolved URL */
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    url: string;
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

/** Resolved author data (after GROQ dereference) */
export interface Author {
  name: string;
  role?: string;
  image?: SanityImage;
}

/** Full post data as returned by the postBySlugQuery */
export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  author: Author;
  mainImage?: SanityImage;
  publishedAt: string;
  excerpt?: string;
  body: PortableTextBlock[];
}

/** Table of Contents heading entry */
export interface TocHeading {
  /** Unique anchor ID (slugified heading text) */
  id: string;
  /** Display text of the heading */
  text: string;
  /** Heading level: 2 for h2, 3 for h3 */
  level: 2 | 3;
}
