# Multilingual Sanity Blog — Design

Date: 2026-09-05
Status: Approved (pending user spec review)

## Purpose

Extend this project's i18n effort to the Sanity-CMS-driven blog
(`/blog`, `/blogs`, `/blog/[slug]`), which `docs/i18n-migration-status.md`
explicitly flagged as "a different shape of problem" and deferred pending
its own design. Static pages are translated by extracting flat English
strings into `messages/en.json` and running them through
`semantic-seo-localization`; blog content lives in Sanity as documents
with a Portable Text rich-text body, which has no `messages/*.json`
equivalent and needs its own handling.

## Constraints established during brainstorming

- The project plans to support **10+ languages eventually** (11+ total
  locales), which rules out a separate Sanity document per locale (would
  mean 11+ documents per post) — the data model must scale by adding
  fields/keys, not documents.
- Translation is **AI-assisted**, reusing `semantic-seo-localization`'s
  entity-protection/SEO-aware pipeline — editors write once in English.
- Translation is **triggered manually** via Claude Code, per-post, the
  same human-review-gate pattern already used for every static page
  migration. No new backend service, webhook, or automated on-publish
  trigger.
- An untranslated locale **falls back to English** at the same URL,
  rather than 404ing or redirecting — the site should never show a
  broken or empty page for a post that hasn't been translated into a
  given language yet.
- **All 1 existing published post** is in scope for translation now (the
  dataset currently has exactly one `post` document — confirmed via a
  direct GROQ count query against the live dataset), alongside the
  schema/routing/pipeline work. This is not a "backlog migration" problem
  at the current scale.

## Architecture

```
Sanity `post` document (English fields unchanged)
  + translations.de.{title, excerpt, body}   (Studio-visible, one doc)
  + translations.<next-locale>.{...}         (added the same way later)
        │
        ▼
GROQ queries select via coalesce(translations.$locale.field, field)
        │
        ▼
src/app/[locale]/blog, /blogs, /blog/[slug]   (routing, no messages/*.json)
        │
        ▼
Translation produced by: semantic-seo-localization
  + NEW references/portable-text-translation.md (span-level translation,
    preserves marks/images/tables/links structurally)
        │
        ▼
Human review gate (existing pattern)
        │
        ▼
Write-back script (NEW, small): patches translations.<locale> onto the
Sanity document via the Sanity client's mutation API
```

## 1. Schema change

`src/sanity/schemas/post.ts` gets one new top-level field:

```ts
defineField({
  name: "translations",
  title: "Translations",
  type: "object",
  fields: [
    defineField({
      name: "de",
      title: "German",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
        defineField({ name: "body", title: "Body", type: "array", of: [/* same block/image/table definitions as the English `body` field — extracted into a shared array so both fields reference one definition, not copy-pasted */] }),
      ],
    }),
    // A future 12th language is one more field block here, same shape as `de`.
  ],
}),
```

The English `title`/`excerpt`/`body`/`slug`/`author`/`mainImage`/`publishedAt`
fields are **completely unchanged** — this is additive only. No migration
is needed for existing posts; a post with no `translations` field simply
falls back to English everywhere (see below).

The Portable Text block/image/table type definition currently inline in
`body`'s `of: [...]` array gets extracted into a shared constant (e.g.
`src/sanity/schemas/shared/portableTextBody.ts`) so the English `body` and
every `translations.<locale>.body` field use the exact same block
definition without duplicating ~120 lines of schema per locale.

## 2. Queries and fallback

Every query that currently selects `title`/`excerpt`/`body` gains a
locale-aware variant using GROQ's `coalesce()`:

```groq
"title": coalesce(translations[$locale].title, title),
"excerpt": coalesce(translations[$locale].excerpt, excerpt),
"body": coalesce(translations[$locale].body, body),
```

For `$locale == "en"` (or unset), `translations["en"]` never exists, so
`coalesce` always falls through to the base English field — meaning the
**same query works for every locale including English**, with no special
case in application code. This directly implements the "fallback to
English" decision from brainstorming, entirely at the query layer.

`allPostsQuery` and `postBySlugQuery` (`src/sanity/lib/queries.ts`) both
take a `$locale` parameter now. `allPostSlugsQuery` is unaffected (slugs
are not translated — same slug across all locales, matching this
project's existing convention of not localizing URL segments).

## 3. Routing

`src/app/blog/layout.tsx`, `src/app/blog/[slug]/{layout,page}.tsx`,
`src/app/blogs/{layout,page}.tsx` move to `src/app/[locale]/blog/...` and
`src/app/[locale]/blogs/...`, following the layout/metadata pattern
established by every prior page migration (`generateMetadata` per route,
canonical/hreflang alternates). Unlike static pages, there is no
`messages/en.json` extraction step — the page component reads `locale`
from `params` and passes it into the GROQ query as `$locale`, and
`generateMetadata` derives `<title>`/description from the same
locale-resolved `post.title`/`post.excerpt` used for rendering, so SEO
metadata is translated for free by the same coalesce mechanism.

## 4. Portable Text translation (new pipeline capability)

`semantic-seo-localization`'s existing reference files assume the
translation unit is a flat JSON leaf string (a `messages/en.json` key
path). A Portable Text `body` is structurally different: an array of
blocks, each block an array of `span` children carrying `marks` (bold,
italic, links), interspersed with `image` and `table` blocks.

New reference file: `references/portable-text-translation.md`, used by
Stage 4b (contextual translation) specifically when the content unit is a
Sanity `body` field rather than a JSON namespace:

- **Translate at the span level, not the block level.** Each `span`'s
  `text` string is translated independently; its `marks` array is copied
  unchanged onto the translated text. This guarantees every bold/italic/
  link stays attached to exactly the text it was attached to before,
  because the span structure itself never changes — only the string
  inside it does. The known trade-off: a sentence heavily fragmented
  across spans (e.g. "very **important** for" as three spans) can read
  slightly less fluently translated span-by-span than as one sentence,
  in the same way the "fragment concatenation" issue affected
  `messages/*.json` content on other pages — except here the
  fragmentation is the editor's own authored rich-text structure, which
  this pipeline must preserve, not silently restructure.
- **Link annotations** (the `href`/`blank` fields on a `link` mark
  definition) are never translated — only the visible span text touching
  that mark is.
- **Image blocks**: the image asset reference and layout are untouched;
  only `alt`/`caption` string fields (if present) are translated as
  ordinary plain strings, same as any other leaf string.
- **Table blocks**: cell contents are translated the same way (span-level
  if rich text, plain-string if not); table structure/row-column layout
  untouched.
- **Batching still applies**, per the existing "always batch" rule —
  spans across roughly 8-10 blocks form one batch, with the same hard
  rule against splitting a block's own spans across two batches.
- **Entity protection, triple extraction, and the completeness gate all
  still apply**, adapted to treat "every span's text, every alt/caption
  string" as the leaf-unit set instead of JSON key paths. The
  completeness gate's mechanical diff becomes: does every span/alt/
  caption in the English body have a corresponding translated entry, by
  position, in the candidate — not a JSON key-path diff, but the same
  enumerate-and-diff principle.

## 5. Manual translation workflow

Unchanged in spirit from every prior migration, adapted for Sanity as the
source of truth instead of `messages/en.json`:

1. Fetch the target post via GROQ (by `_id` or `slug`).
2. Run `semantic-seo-localization`'s stages 1-5 (entity extraction →
   target-market SEO → batch planning → per-batch loop using
   `portable-text-translation.md` for the body and ordinary
   `contextual-translation.md` rules for `title`/`excerpt` → completeness
   gate).
3. Present the human review gate: entities, triples, validation report,
   translated `title`/`excerpt`/`body`.
4. **New tooling** (this project doesn't have it yet): a small documented
   script using the Sanity client's mutation API —
   `client.patch(postId).set({ 'translations.de': {...} }).commit()` —
   applied only after approval. Not a service, not a webhook: a one-shot
   script run the same way `npm run build` is run, invoked per post per
   locale.

## Error handling / validation

- Same as the existing pipeline: a completeness gate failure or a
  per-batch validation FAIL stops before the human review gate, now
  scoped to "every span/alt/caption text" instead of "every JSON key."
- A post published with no `translations` field at all is not an error
  state — it's the expected default for an untranslated post, handled
  entirely by `coalesce()` at the query layer.

## Testing / verification

Dry-run the full pipeline against the one existing post: verify the
Portable Text completeness gate passes (every span/alt/caption
translated), verify marks/links/images survived structurally identical
in the translated body (spot-check by rendering both locales), verify
`/blog/<slug>` and `/de/blog/<slug>` both render correctly with the
fallback mechanism exercised by temporarily checking a post's German
render before approval (should show English) and after (should show
German).

## Out of scope

- Automated/webhook-triggered translation (explicitly deferred per
  brainstorming — this is a real engineering project on its own if ever
  needed).
- Localized URL slugs for blog posts (same slug across all locales,
  matching this project's existing routing convention).
- Backfilling posts published after this design ships is the same manual
  workflow, not a separate migration — there is no ongoing backlog
  concept once this ships, since the dataset currently has one post.
