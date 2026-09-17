# 1-Click Automated Multilingual Blog Translation in Sanity Studio — Design

Date: 2026-09-17
Status: Proposed (pending user review)

## 1. Purpose & Goals

Enable non-technical clients and editors to write blog posts in English in Sanity Studio and generate full multilingual translations (starting with German `de`, scaling to 10+ locales) with **a single click** and **zero developer intervention**.

### Key Requirements
- **No Developer Intervention**: Editors operate 100% independently inside the Sanity Studio UI.
- **Fastest Model**: Uses OpenRouter with `google/gemini-2.5-flash` for near-instant execution (<3 seconds per article) with fallback to `deepseek/deepseek-chat`.
- **Preserves Rich Text**: Keeps all Portable Text formatting (bold, italics, links), image embeds, hotspots, captions, and tables completely intact.
- **English Fallback**: If a post is not translated into a specific language yet, the frontend gracefully renders the English version at that locale URL rather than 404ing.
- **Additive Schema**: Does not break or alter existing English posts; translations are stored as an additive `translations` field.

---

## 2. Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Sanity Studio (Editor UI)                                │
│    - Editor writes Title, Excerpt, and Body (Portable Text) │
│    - Editor clicks [ 🌐 Auto-Translate ] in the action bar  │
└──────────────────────────────┬──────────────────────────────┘
                               │ POST /api/sanity/auto-translate
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Next.js API Route (/api/sanity/auto-translate)           │
│    - Receives document fields (title, excerpt, body)        │
│    - Isolates translatable spans & alt text                 │
│    - Calls OpenRouter (google/gemini-2.5-flash)             │
│    - Rebuilds Portable Text with translated strings while   │
│      keeping _key, marks, images, and tables untouched      │
│    - Returns translated payload                             │
└──────────────────────────────┬──────────────────────────────┘
                               │ 200 OK (JSON)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Sanity Studio Updates Document                           │
│    - Client-side Studio action sets translations.de field   │
│    - Studio UI updates live with notification toast         │
│    - Editor reviews and clicks [ Publish ]                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Detailed Component Design

### 3.1 Environment Configuration
- `OPENROUTER_API_KEY` is safely stored in `.env` (git-ignored) and read exclusively on the server side in the Next.js API route.
- Optional: `SANITY_API_WRITE_TOKEN` can be used if server-side direct patching is preferred for automated CLI/webhook pipelines.

### 3.2 Sanity Schema (`src/sanity/schemas/post.ts`)
1. **Shared Portable Text Definition**: Extract the Portable Text block/image/table array definition into `src/sanity/schemas/shared/portableTextBody.ts` so English and localized bodies share the identical schema definition.
2. **Translations Object**:
   ```ts
   defineField({
     name: 'translations',
     title: 'Translations',
     type: 'object',
     options: { collapsible: true, collapsed: false },
     fields: [
       defineField({
         name: 'de',
         title: 'German (de)',
         type: 'object',
         fields: [
           defineField({ name: 'title', title: 'Title', type: 'string' }),
           defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
           defineField({ name: 'body', title: 'Body', type: 'array', of: portableTextBodyTypes }),
         ],
       }),
       // Additional languages (es, fr, etc.) added here as needed
     ],
   })
   ```

### 3.3 Studio Custom Document Action (`src/sanity/actions/autoTranslateAction.tsx`)
- Registered in `sanity.config.ts` via `document.actions`.
- Button appears in the bottom action bar next to "Publish" for documents of type `post`.
- Label: `🌐 Auto-Translate to German`.
- States:
  - Default: Active if English title and body have content.
  - In-progress: Button is disabled with spinner ("Translating...").
  - Success: Displays toast notification ("✅ Translation to German completed!").
  - Error: Displays error toast if OpenRouter or network fails.

### 3.4 Translation API Endpoint (`src/app/api/sanity/auto-translate/route.ts`)
- Accepts `POST` with `{ title, excerpt, body, targetLocale: 'de' }`.
- Validates inputs and API key.
- Traverses `body` blocks:
  - Collects all plain text spans (with unique path/index).
  - Collects image alt text.
  - Sends to OpenRouter `google/gemini-2.5-flash` with strict system prompt:
    `"You are a professional translator. Translate from English to German. Maintain original formatting, tone, and casing. Return strictly the requested JSON structure."`
  - Reassembles the body structure: keeps original `_key`, decorators, annotations (`link`), image asset references, and table layouts intact.
- Returns translated `{ title, excerpt, body }`.

### 3.5 GROQ Query & Frontend Fallback (`src/sanity/lib/queries.ts`)
Update queries to use GROQ `coalesce()` for automatic English fallback:
```groq
"title": coalesce(translations[$locale].title, title),
"excerpt": coalesce(translations[$locale].excerpt, excerpt),
"body": coalesce(translations[$locale].body, body),
```
- If `$locale == 'de'` and translation exists -> renders German.
- If `$locale == 'de'` and translation does NOT exist -> cleanly renders English without breaking.

---

## 4. Error Handling & Edge Cases

1. **Rate limits / OpenRouter timeouts**:
   - The API route sets a 30s timeout and falls back to `deepseek/deepseek-chat` if Gemini returns a 429 or 5xx.
2. **Missing English Content**:
   - Action disables if `title` or `body` is empty, informing editor: "Please write English content first."
3. **Complex Rich Text**:
   - Image blocks (`_type: 'image'`), code blocks, and tables retain their original IDs and non-text metadata; only user-facing string fields are translated.

---

## 5. Verification Plan

1. **API Verification**: Send sample English payload with formatted text, images, and links to `/api/sanity/auto-translate` and verify output structure.
2. **Studio UI Verification**: Open Sanity Studio (`/studio`), open a test post, click `🌐 Auto-Translate to German`, and verify fields populate correctly.
3. **Frontend Route Verification**: Test `/blog/[slug]` and `/de/blog/[slug]` to confirm translated content renders and fallback functions properly.
