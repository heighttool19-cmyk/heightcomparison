/**
 * GROQ Queries for the Blog
 *
 * Each query is strongly-typed via the corresponding interfaces in types.ts.
 * The postBySlugQuery resolves the author reference inline and
 * expands image asset URLs so they're ready for rendering.
 */
import { groq } from "next-sanity";

/**
 * Fetch a single post by its slug.
 * Resolves: author (name, role, image), mainImage asset URL, body blocks.
 */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    "title": coalesce(translations[$locale].title, title),
    slug,
    publishedAt,
    "excerpt": coalesce(translations[$locale].excerpt, excerpt),
    "body": coalesce(translations[$locale].body, body)[] {
      ...,
      _type == "image" => {
        ...,
        asset-> { _ref, url }
      }
    },
    mainImage {
      ...,
      asset-> { _ref, url }
    },
    author-> {
      name,
      role,
      image {
        ...,
        asset-> { _ref, url }
      }
    }
  }
`;

/**
 * Fetch all posts with their essential metadata.
 */
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    "title": coalesce(translations[$locale].title, title),
    slug,
    publishedAt,
    "excerpt": coalesce(translations[$locale].excerpt, excerpt),
    mainImage {
      ...,
      asset-> { _ref, url }
    },
    author-> {
      name,
      role,
      image {
        ...,
        asset-> { _ref, url }
      }
    }
  }
`;

/**
 * Fetch all post slugs — used for generateStaticParams().
 */
export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`;
