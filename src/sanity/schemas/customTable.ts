import { defineType } from "sanity";
import { CustomTableEditor, CustomTableBlock, CustomTablePreview } from "../components/CustomTableEditor";

export const tableRow = defineType({
  name: "tableRow",
  title: "Table Row",
  type: "object",
  fields: [
    {
      name: "cells",
      title: "Cells",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
});

export const table = defineType({
  name: "table",
  title: "Table",
  type: "object",
  fields: [
    {
      name: "rows",
      title: "Rows",
      type: "array",
      of: [{ type: "tableRow" }],
    },
  ],
  components: {
    block: CustomTableBlock,
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
});

