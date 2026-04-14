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
    title,
    slug,
    publishedAt,
    excerpt,
    body[] {
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
 * Fetch all post slugs — used for generateStaticParams().
 */
export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`;
