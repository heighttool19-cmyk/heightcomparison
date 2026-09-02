---
name: semantic-seo-localization
description: Use when translating or localizing website/app content into another language and literal translation risks losing brand/entity identity, factual meaning, or target-market search intent. Use before writing translated strings into messages/*.json, or whenever adding a new locale to an existing i18n project.
---

# Semantic SEO Localization

## Overview

Raw translation preserves words, not necessarily meaning, entity identity, or
search intent. This skill runs source content through six stages — entity
extraction, source triple extraction, target-market SEO adaptation,
contextual translation, target triple extraction, and semantic validation —
before any translated text is treated as final. It borrows its methodology
from a semantic-SEO localization pipeline, adapted here into LLM-reasoning
steps with file-based artifacts (no database, no backend).

## When to Use

- Adding a new target locale to an existing project's `messages/en.json` →
  `messages/<locale>.json` translation.
- Translating any content where brand/product names, factual claims, or SEO
  metadata must survive translation intact.
- NOT needed for one-off, throwaway text with no reuse or SEO stakes (just
  translate it directly).

## Pipeline

Run these six stages in order for one content unit ("page") at a time.
Each stage's full instructions live in its own reference file — read the
file when you reach that stage, don't try to work from this summary alone.

1. **Entity extraction & registry sync** — `references/entity-extraction.md`
2. **Triple extraction (source pass)** — `references/triple-extraction.md`
3. **Target-market SEO adaptation** — `references/target-market-seo.md`
4. **Contextual translation** — `references/contextual-translation.md`
5. **Triple extraction (target pass)** — `references/triple-extraction.md` (same file, run again on the translated draft)
6. **Semantic validation** — `references/semantic-validation.md`

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

## Human Review Gate

After stage 6, if `validation-report.md` verdict is PASS: present the
entities added/reused, both triple tables, the validation report, and the
translated draft to the user. Do **not** write to `messages/<locale>.json`
or modify any application/source file until the user explicitly approves.
Audit artifacts under `docs/semantic-seo-localization/` are written as each
stage completes and are not gated. If verdict is FAIL, stop and report the
specific Missing/Contradicted/Introduced triples instead of presenting a
translation as ready.

## Common Mistakes

- Skipping straight to translation without entity extraction — brand names
  drift across pages.
- Treating the target-market SEO stage as "translate the English keywords"
  — it must reason about what target-locale users actually search.
- Writing the translation to `messages/<locale>.json` before the human
  review gate.
- Reusing this skill's own folder to store a project's entity registry —
  artifacts always live in the consuming project's `docs/`, not here.
