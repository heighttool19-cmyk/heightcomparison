import { defineField } from "sanity";
import { CustomTableEditor, CustomTablePreview } from "../../components/CustomTableEditor";

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
        description: "Image caption. Supports markdown links: [Link Text](https://example.com)",
      }),
    ],
  },
  {
    name: "table",
    title: "Table",
    type: "table",
    components: {
      input: CustomTableEditor,
      preview: CustomTablePreview,
    },
    preview: {
      select: {
        rows: "rows",
      },
      prepare({ rows }: { rows?: Array<{ cells?: string[] }> }) {
        const rowCount = rows?.length || 0;
        const colCount = rows?.[0]?.cells?.length || 0;
        const firstRowSample = rows?.[0]?.cells?.filter(Boolean).slice(0, 4).join(" | ");
        return {
          title: firstRowSample ? `Table: ${firstRowSample}` : "Table",
          subtitle: rowCount > 0 ? `${rowCount} rows × ${colCount} columns` : "Empty Table",
          rows: rows || [],
        };
      },
    },
  },
];
