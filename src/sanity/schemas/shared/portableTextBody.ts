import { defineField } from "sanity";

export const portableTextBodyTypes = [
  {
    type: "block" as const,
    styles: [
      { title: "Normal", value: "normal" },
      { title: "H2", value: "h2" },
      { title: "H3", value: "h3" },
      { title: "H4", value: "h4" },
      { title: "Quote", value: "blockquote" },
    ],
    marks: {
      decorators: [
        { title: "Bold", value: "strong" },
        { title: "Italic", value: "em" },
        { title: "Code", value: "code" },
        { title: "Underline", value: "underline" },
        { title: "Strikethrough", value: "strike-through" },
      ],
      annotations: [
        {
          name: "link",
          type: "object",
          title: "Link",
          fields: [
            defineField({
              name: "href",
              title: "URL",
              type: "url",
              validation: (rule) =>
                rule.uri({
                  scheme: ["http", "https", "mailto", "tel"],
                }),
            }),
            defineField({
              name: "blank",
              title: "Open in new tab",
              type: "boolean",
              initialValue: false,
            }),
          ],
        },
      ],
    },
    lists: [
      { title: "Bullet", value: "bullet" },
      { title: "Numbered", value: "number" },
    ],
  },
  {
    type: "image" as const,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt Text",
        type: "string",
        description: "Important for SEO and accessibility.",
      }),
      defineField({
        name: "caption",
        title: "Caption",
        type: "string",
      }),
    ],
  },
  {
    type: "table" as const,
  },
];
