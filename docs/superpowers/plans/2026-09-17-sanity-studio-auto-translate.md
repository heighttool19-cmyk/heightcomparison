# 1-Click Sanity Studio Auto-Translate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 1-click automated translation action directly inside Sanity Studio that uses OpenRouter (`google/gemini-2.5-flash`) to generate German (`de`) translations of blog post titles, excerpts, and rich Portable Text bodies without developer intervention.

**Architecture:** A Sanity Studio Document Action button invokes a Next.js server route (`/api/sanity/auto-translate`). The API route extracts translatable text while preserving Portable Text structure, image assets, marks, and tables, calls OpenRouter with structured prompt constraints, and returns translated fields which the Studio action writes directly into the Sanity document's `translations.de` object. GROQ queries resolve translations with `coalesce()` falling back to English.

**Tech Stack:** Next.js 15 (App Router), Sanity v4 (`sanity`, `next-sanity`, `@sanity/ui`), OpenRouter API (`google/gemini-2.5-flash`), TypeScript.

**Spec:** [docs/superpowers/specs/2026-09-17-sanity-auto-translate-studio-action-design.md](file:///d:/COding/InternShip%20Work/E-STUDYPAL/LAUNCHPIT/Height%20Comparison%20%20tool/heightcomparison/docs/superpowers/specs/2026-09-17-sanity-auto-translate-studio-action-design.md)

## Global Constraints

- Sanity Studio must remain compatible with current versions (`sanity: ^4.22.0`, `react: ^19.0.0`).
- Image blocks (`_type: 'image'`) and table blocks inside Portable Text must retain their exact `_key`, `asset`, `hotspot`, and layout metadata.
- OpenRouter API key is read strictly on the server (`process.env.OPENROUTER_API_KEY`) and never sent to or bundled in client code.
- Non-translated posts must fall back gracefully to English without 404 or blank screens.

---

### Task 1: Extract Shared Portable Text Schema & Update Post Schema

**Files:**
- Create: `src/sanity/schemas/shared/portableTextBody.ts`
- Modify: `src/sanity/schemas/post.ts:63-145`

**Interfaces:**
- Produces: `portableTextBodyTypes` array definition usable in both `post.body` and `post.translations.de.body`.
- Produces: `translations` object field on `post` schema with `de: { title, excerpt, body }`.

- [ ] **Step 1: Create shared portableTextBody definition**

Create `src/sanity/schemas/shared/portableTextBody.ts`:
```ts
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
```

- [ ] **Step 2: Update `src/sanity/schemas/post.ts` to import shared types and add translations field**

In `src/sanity/schemas/post.ts`:
Replace the inline array under `name: "body"` with `portableTextBodyTypes`, and add the `translations` object field:
```ts
import { defineField, defineType } from "sanity";
import { portableTextBodyTypes } from "./shared/portableTextBody";

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
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "de",
          title: "German (de)",
          type: "object",
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
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
```

- [ ] **Step 3: Verify TypeScript compilation of schemas**

Run: `npx tsc --noEmit`
Expected: 0 errors related to `src/sanity/schemas`.

- [ ] **Step 4: Commit schema changes**

```bash
git add src/sanity/schemas/shared/portableTextBody.ts src/sanity/schemas/post.ts
git commit -m "feat(sanity): add shared portableTextBody and translations field to post schema"
```

---

### Task 2: Build the Server Translation API Route with OpenRouter

**Files:**
- Create: `src/app/api/sanity/auto-translate/route.ts`
- Test: `scripts/test-auto-translate.mjs`

**Interfaces:**
- Consumes: `POST /api/sanity/auto-translate` with `{ title: string, excerpt?: string, body?: any[], targetLocale: string }`.
- Produces: `{ success: boolean, translated: { title: string, excerpt?: string, body?: any[] } }`.

- [ ] **Step 1: Write translation endpoint `src/app/api/sanity/auto-translate/route.ts`**

```ts
import { NextRequest, NextResponse } from "next/server";

interface SpanItem {
  blockIndex: number;
  spanIndex: number;
  text: string;
}

interface ImageAltItem {
  blockIndex: number;
  alt: string;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY is not configured on server" },
        { status: 500 }
      );
    }

    const { title, excerpt, body, targetLocale = "de" } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "English title is required for translation" },
        { status: 400 }
      );
    }

    // 1. Extract plain text spans and image alts from Portable Text body
    const spansToTranslate: SpanItem[] = [];
    const imageAltsToTranslate: ImageAltItem[] = [];

    if (Array.isArray(body)) {
      body.forEach((block, blockIndex) => {
        if (block._type === "block" && Array.isArray(block.children)) {
          block.children.forEach((child: any, spanIndex: number) => {
            if (child._type === "span" && typeof child.text === "string" && child.text.trim().length > 0) {
              spansToTranslate.push({ blockIndex, spanIndex, text: child.text });
            }
          });
        } else if (block._type === "image" && typeof block.alt === "string" && block.alt.trim().length > 0) {
          imageAltsToTranslate.push({ blockIndex, alt: block.alt });
        }
      });
    }

    // 2. Prepare payload for OpenRouter
    const promptPayload = {
      title,
      excerpt: excerpt || "",
      spans: spansToTranslate.map((s) => s.text),
      imageAlts: imageAltsToTranslate.map((a) => a.alt),
    };

    const systemPrompt = `You are a professional translator translating English blog content into German (de).
Requirements:
1. Translate accurately, keeping natural German idioms, tone, and casing.
2. Output ONLY a valid JSON object matching this exact schema:
{
  "title": "translated title",
  "excerpt": "translated excerpt",
  "spans": ["translated span 0", "translated span 1", ...],
  "imageAlts": ["translated alt 0", ...]
}
3. The number of elements in the 'spans' array must EXACTLY match the input spans count.
4. The number of elements in the 'imageAlts' array must EXACTLY match the input imageAlts count.
5. Do NOT include markdown code blocks, explanation, or commentary. Output pure JSON.`;

    // 3. Call OpenRouter using google/gemini-2.5-flash (with deepseek-chat fallback)
    let model = "google/gemini-2.5-flash";
    let openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://heightcomparison.com",
        "X-Title": "Height Comparison Sanity Auto-Translate",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: JSON.stringify(promptPayload) },
        ],
        temperature: 0.2,
      }),
    });

    if (!openRouterRes.ok) {
      // Fallback to deepseek/deepseek-chat if Gemini fails
      model = "deepseek/deepseek-chat";
      openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: JSON.stringify(promptPayload) },
          ],
          temperature: 0.2,
        }),
      });
    }

    if (!openRouterRes.ok) {
      const errorText = await openRouterRes.text();
      return NextResponse.json(
        { error: `OpenRouter API error: ${openRouterRes.status} - ${errorText}` },
        { status: 502 }
      );
    }

    const completionData = await openRouterRes.json();
    const rawContent = completionData.choices?.[0]?.message?.content?.trim() || "";
    
    // Clean code blocks if present
    const cleanedJsonString = rawContent.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    const parsedTranslation = JSON.parse(cleanedJsonString);

    // 4. Reconstruct Portable Text body
    const clonedBody = Array.isArray(body) ? JSON.parse(JSON.stringify(body)) : [];

    if (Array.isArray(parsedTranslation.spans)) {
      spansToTranslate.forEach((item, index) => {
        if (parsedTranslation.spans[index] && clonedBody[item.blockIndex]?.children?.[item.spanIndex]) {
          clonedBody[item.blockIndex].children[item.spanIndex].text = parsedTranslation.spans[index];
        }
      });
    }

    if (Array.isArray(parsedTranslation.imageAlts)) {
      imageAltsToTranslate.forEach((item, index) => {
        if (parsedTranslation.imageAlts[index] && clonedBody[item.blockIndex]) {
          clonedBody[item.blockIndex].alt = parsedTranslation.imageAlts[index];
        }
      });
    }

    return NextResponse.json({
      success: true,
      modelUsed: model,
      translated: {
        title: parsedTranslation.title || title,
        excerpt: parsedTranslation.excerpt || excerpt || "",
        body: clonedBody,
      },
    });
  } catch (error: any) {
    console.error("Auto-translate API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to execute auto-translation" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Create a local node test script to verify API and OpenRouter key**

Create `scripts/test-auto-translate.mjs`:
```js
import fs from 'fs';
import path from 'path';

// Read OPENROUTER_API_KEY from .env
const envContent = fs.readFileSync(path.resolve(process.cwd(), '.env'), 'utf8');
const match = envContent.match(/OPENROUTER_API_KEY=["']?([^"'\r\n]+)/);
const apiKey = match ? match[1] : null;

if (!apiKey) {
  console.error("No OPENROUTER_API_KEY found in .env");
  process.exit(1);
}

const payload = {
  title: "Top 10 Tallest Celebrities in Hollywood",
  excerpt: "A comprehensive height comparison guide of famous actors.",
  body: [
    {
      _type: "block",
      _key: "b1",
      style: "normal",
      children: [
        { _type: "span", _key: "s1", text: "Height differences can be " },
        { _type: "span", _key: "s2", text: "fascinating", marks: ["strong"] },
        { _type: "span", _key: "s3", text: " when seen on the red carpet." }
      ]
    },
    {
      _type: "image",
      _key: "i1",
      alt: "Actors standing together on the red carpet"
    }
  ]
};

const promptPayload = {
  title: payload.title,
  excerpt: payload.excerpt,
  spans: ["Height differences can be ", "fascinating", " when seen on the red carpet."],
  imageAlts: ["Actors standing together on the red carpet"]
};

const systemPrompt = `You are a professional translator translating English blog content into German (de).
Requirements:
1. Translate accurately, keeping natural German idioms, tone, and casing.
2. Output ONLY a valid JSON object matching this exact schema:
{
  "title": "translated title",
  "excerpt": "translated excerpt",
  "spans": ["translated span 0", "translated span 1", ...],
  "imageAlts": ["translated alt 0", ...]
}
3. The number of elements in the 'spans' array must EXACTLY match the input spans count.
4. The number of elements in the 'imageAlts' array must EXACTLY match the input imageAlts count.
5. Do NOT include markdown code blocks, explanation, or commentary. Output pure JSON.`;

const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "google/gemini-2.5-flash",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: JSON.stringify(promptPayload) },
    ],
    temperature: 0.2,
  }),
});

const data = await res.json();
console.log("Status:", res.status);
console.log("Raw response:", data.choices?.[0]?.message?.content);
```

- [ ] **Step 3: Run the test script to verify OpenRouter translation works**

Run: `node scripts/test-auto-translate.mjs`
Expected: Status 200, valid German translated JSON returned with matching spans.

- [ ] **Step 4: Clean up test script and commit API route**

```bash
rm scripts/test-auto-translate.mjs
git add src/app/api/sanity/auto-translate/route.ts
git commit -m "feat(api): add /api/sanity/auto-translate route with OpenRouter integration"
```

---

### Task 3: Create Sanity Studio Custom Document Action

**Files:**
- Create: `src/sanity/actions/autoTranslateAction.tsx`
- Modify: `sanity.config.ts:1-21`

**Interfaces:**
- Consumes: Sanity Studio document state via `DocumentActionProps` (`props.draft || props.published`).
- Produces: `AutoTranslateAction` button component registered in `sanity.config.ts`.

- [ ] **Step 1: Implement `src/sanity/actions/autoTranslateAction.tsx`**

```tsx
import { useState } from "react";
import { DocumentActionProps, useDocumentOperation, useClient } from "sanity";
import { useToast } from "@sanity/ui";
import { EarthGlobeIcon } from "@sanity/icons";

export function AutoTranslateAction(props: DocumentActionProps) {
  const { patch } = useDocumentOperation(props.id, props.type);
  const toast = useToast();
  const [isTranslating, setIsTranslating] = useState(false);

  // Only apply to 'post' documents
  if (props.type !== "post") {
    return null;
  }

  const doc: any = props.draft || props.published;
  const hasContent = Boolean(doc?.title && doc?.body?.length);

  return {
    label: isTranslating ? "Translating to German..." : "🌐 Auto-Translate to German",
    icon: EarthGlobeIcon,
    disabled: !hasContent || isTranslating,
    title: !hasContent
      ? "Add an English title and body before translating"
      : "Automatically translate this post into German using AI",
    onHandle: async () => {
      setIsTranslating(true);
      toast.push({
        status: "info",
        title: "Translating to German...",
        description: "Calling OpenRouter translation engine...",
      });

      try {
        const res = await fetch("/api/sanity/auto-translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: doc.title,
            excerpt: doc.excerpt,
            body: doc.body,
            targetLocale: "de",
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to translate");
        }

        // Patch the translated data into the translations.de object
        patch.execute([
          {
            set: {
              "translations.de": data.translated,
            },
          },
        ]);

        toast.push({
          status: "success",
          title: "German translation complete!",
          description: "Translations have been applied to the German tab.",
        });
      } catch (err: any) {
        console.error("Translation failed:", err);
        toast.push({
          status: "error",
          title: "Translation failed",
          description: err.message || "An unexpected error occurred.",
        });
      } finally {
        setIsTranslating(false);
      }
    },
  };
}
```

- [ ] **Step 2: Register `AutoTranslateAction` in `sanity.config.ts`**

Update `sanity.config.ts`:
```ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { table } from '@sanity/table'
import { schemaTypes } from './src/sanity/schemas'
import { AutoTranslateAction } from './src/sanity/actions/autoTranslateAction'

export default defineConfig({
    name: 'height-comparison-blog-studio',
    title: 'Height Comparsion Blog Studio',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

    basePath: '/studio',

    plugins: [structureTool(), table()],

    schema: {
        types: schemaTypes,
    },

    document: {
        actions: (prev, context) => {
            if (context.schemaType === 'post') {
                return [...prev, AutoTranslateAction]
            }
            return prev
        },
    },
})
```

- [ ] **Step 3: Test compilation of Sanity config and action**

Run: `npx tsc --noEmit`
Expected: 0 TypeScript errors.

- [ ] **Step 4: Commit Studio action changes**

```bash
git add src/sanity/actions/autoTranslateAction.tsx sanity.config.ts
git commit -m "feat(studio): add AutoTranslateAction button to Sanity Studio toolbar"
```

---

### Task 4: Update GROQ Queries with Coalesce Fallback

**Files:**
- Modify: `src/sanity/lib/queries.ts:1-76`

**Interfaces:**
- Produces: `postBySlugQuery` and `allPostsQuery` taking `$locale` parameter with `coalesce(translations[$locale].field, field)`.

- [ ] **Step 1: Update queries in `src/sanity/lib/queries.ts`**

```ts
import { groq } from "next-sanity";

/**
 * Fetch a single post by its slug, resolving translations by locale with fallback to English.
 */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
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
 * Fetch all posts with locale-aware title and excerpt.
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
```

- [ ] **Step 2: Verify project build**

Run: `npm run build`
Expected: Successful build with 0 TypeScript or Next.js build errors.

- [ ] **Step 3: Commit query updates**

```bash
git add src/sanity/lib/queries.ts
git commit -m "feat(sanity): update GROQ queries with coalesce locale fallback"
```

---

### Task 5: End-to-End Verification

- [ ] **Step 1: Launch test server and verify API response**
Send a real POST request to `http://localhost:3000/api/sanity/auto-translate` and assert translated output.

- [ ] **Step 2: Verify in Sanity Studio UI**
Navigate to `http://localhost:3000/studio`, inspect a post document, check the button presence and translation population into `translations.de`.

- [ ] **Step 3: Verify frontend fallback**
Verify `/blog` and `/de/blog` query resolution without errors.
