---
name: semantic-seo-localization
description: Use when translating or localizing website/app content into another language and literal translation risks losing brand/entity identity, factual meaning, or target-market search intent. Use before writing translated strings into messages/*.json, or whenever adding a new locale to an existing i18n project.
---

# Semantic SEO Localization

## Overview

Raw translation preserves words, not necessarily meaning, entity identity,
search intent, or completeness. This skill runs source content through
seven stages — entity extraction, target-market SEO adaptation, batch
planning, a per-batch loop (source triple extraction, contextual
translation, target triple extraction, semantic validation), and a
mechanical completeness gate — before any translated text is treated as
final. Batching keeps every translation call small enough to avoid
output-token truncation on large pages; the completeness gate then proves
mechanically that nothing was dropped. It borrows its methodology from a
semantic-SEO localization pipeline, adapted here into LLM-reasoning steps
with file-based artifacts (no database, no backend).

## UI-Loss Guarantee

This pipeline reads and writes only string values inside
`messages/<locale>.json`. It never reads, generates, or modifies a `.tsx`
file's JSX, `className`, icon usage, or component structure — that is
`nextjs-i18n-migration`'s job, entirely separate from this skill. Because
translation structurally cannot touch those files, "0% UI loss" holds by
construction: there is no code path in this skill that writes to a `.tsx`
file at all.

## When to Use

- Adding a new target locale to an existing project's `messages/en.json` →
  `messages/<locale>.json` translation.
- Translating any content where brand/product names, factual claims, or SEO
  metadata must survive translation intact.
- NOT needed for one-off, throwaway text with no reuse or SEO stakes (just
  translate it directly).

## Pipeline

Run these stages in order for one content unit ("page") at a time. Each
stage's full instructions live in its own reference file — read the file
when you reach that stage, don't try to work from this summary alone.

1. **Entity extraction & registry sync** — `references/entity-extraction.md` (whole page, once)
2. **Target-market SEO adaptation** — `references/target-market-seo.md` (whole page, once)
3. **Batch planning** — `references/batching-and-completeness.md` (whole page, once — always runs, regardless of page size)
4. **Per-batch loop** — repeats sequentially for each batch from Stage 3:
   - **4a. Triple extraction (source pass)** — `references/triple-extraction.md`
   - **4b. Contextual translation** — `references/contextual-translation.md`
   - **4c. Triple extraction (target pass)** — `references/triple-extraction.md` (same file, run again on this batch's translated draft)
   - **4d. Semantic validation** — `references/semantic-validation.md`
5. **Completeness gate** — `references/batching-and-completeness.md` (whole page, once, mechanical — not an LLM judgment call)
6. **Human review gate** — see below (whole page, merged result)

## Artifact Paths

All audit artifacts go into the *consuming project's* repo, never into this
skill folder:

```
docs/semantic-seo-localization/<locale>/entities.json          # cross-page, persistent
docs/semantic-seo-localization/<locale>/<page-id>/triples-source.md
docs/semantic-seo-localization/<locale>/<page-id>/seo-adaptation.md
docs/semantic-seo-localization/<locale>/<page-id>/triples-target.md
docs/semantic-seo-localization/<locale>/<page-id>/validation-report.md
```

`<locale>` is the target language code (e.g. `de`). `<page-id>` is a short
slug identifying the content unit (e.g. `about`, `height-predictor`).

`triples-source.md`, `triples-target.md`, and `validation-report.md`
accumulate across every batch of a page — each batch's Stage 4a/4c/4d
output is appended, not written to a separate per-batch file, and triple
`#` numbering is continuous across the whole page (batch 2 does not
restart at `#1`).

## Human Review Gate

After Stage 5 (the completeness gate) passes — which requires every
batch's Stage 4d validation verdict to be PASS and the key-diff to be
empty — present the entities added/reused, the full per-page triple
tables, the validation report, and the merged translated draft to the
user. Do **not** write to `messages/<locale>.json` or modify any
application/source file until the user explicitly approves. Audit
artifacts under `docs/semantic-seo-localization/` are written as each
stage completes and are not gated. If any batch's Stage 4d verdict is
FAIL, or Stage 5's completeness gate finds any missing/extra/empty key,
stop and report the specific batch and key path(s) affected instead of
presenting a translation as ready.

## Common Mistakes

- Skipping straight to translation without entity extraction — brand names
  drift across pages.
- Treating the target-market SEO stage as "translate the English keywords"
  — it must reason about what target-locale users actually search.
- Writing the translation to `messages/<locale>.json` before the human
  review gate.
- Reusing this skill's own folder to store a project's entity registry —
  artifacts always live in the consuming project's `docs/`, not here.
- Skipping batch planning for a "small enough" page — batching always
  runs, regardless of page size, so the pipeline behaves identically at
  every scale.
- Treating the completeness gate as optional or as an LLM read-through
  instead of an explicit key-path enumeration and diff.
