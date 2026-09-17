/**
 * Sanity v3 Schema: Post
 *
 * Defines the blog post document type with Portable Text body,
 * author reference, main image, and standard metadata fields.
 */
import { defineField, defineType } from "sanity";
import { portableTextBodyTypes } from "./shared/portableTextBody";
import { TARGET_LANGUAGES } from "../languages";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(5).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the image for accessibility.",
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "A short summary for SEO and previews.",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: portableTextBodyTypes,
    }),
    defineField({
      name: "translations",
      title: "Translations",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: TARGET_LANGUAGES.map((lang) =>
        defineField({
          name: lang.id,
          title: `${lang.flag} ${lang.title} (${lang.nativeLabel})`,
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: portableTextBodyTypes,
            }),
          ],
        })
      ),
    }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare({ title, author, media }) {
      return {
        title,
        subtitle: author ? `by ${author}` : "No author",
        media,
      };
    },
  },
});
