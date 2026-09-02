# Target-Market SEO Adaptation

## Purpose
Adapt SEO metadata (title, description, slug, keyword targets) for what users in the target market/locale actually search for — not a literal translation of the English keyword set. Runs once per page, directly after entity extraction and before batch planning/translation, and reads the entity registry that entity-extraction.md just populated so protected entity names never get translated inside a title or description. This stage reads the source content directly and does not depend on triple extraction having run yet — triple extraction is batch-scoped (per `batching-and-completeness.md`) and runs later, per batch.

## Steps
1. From the source content directly (read the full page namespace — this stage runs before batch planning and before any triples exist), list the primary topic, secondary topics, and the concrete SEO-relevant terms (keywords, entities, product/feature names) the English version targets.
2. Read `docs/semantic-seo-localization/<locale>/entities.json` (already populated by Stage 1, entity-extraction.md, which runs immediately before this stage). Any entity with `translate: false` must appear verbatim (as `canonical_name`) in your proposed title/description/keywords if it appears there at all — never translate it "because it reads more naturally in a title." Any entity with `translate: true` uses its `localized_form`.
3. For the target locale, reason about how a native searcher would phrase the same intent — consider literal-vs-idiomatic phrasing differences, compound-word conventions (e.g. German), commonly borrowed English terms that stay in English in that market's tech/SEO vocabulary, and any regional search habits you know of. This must not override entity protection from Step 2.
4. If Google Search Console MCP tools are available and the project has an active property for this domain, you may check real query/impression data for the target locale to sanity-check candidate keywords. This is optional — proceed with LLM-reasoning-only if MCP tools are unavailable or no property is configured.
5. Propose:
   - Localized page title (SEO-oriented, not a plain translation, respecting entity protection from Step 2)
   - Localized meta description (same)
   - Localized slug (URL-safe, using target-language conventions) — see note below on whether the consuming project actually uses this
   - 3–8 target keywords/phrases for this page in the target locale
6. For each proposed keyword that differs from a literal translation, note briefly why it's the target-market equivalent.
7. Save to `docs/semantic-seo-localization/<locale>/<page-id>/seo-adaptation.md`.
8. **If the consuming project keeps a shared metadata namespace** (a top-level `metadata` object in `messages/en.json` with page-prefixed keys, e.g. `metadata.aboutTitle` / `metadata.aboutDescription`, separate from the page's own namespace) — check for one. If it exists and has a `<page-id>Title` / `<page-id>Description` pair for this page, this stage's Title/Description output ARE the final translated values for those two keys, not just guidance for the translation stage. Report them explicitly as `metadata.<page-id>Title` and `metadata.<page-id>Description` in your output so the orchestrator includes them in the Stage 5 completeness gate's key set (per `batching-and-completeness.md`) and in the merged translation handed to the human review gate — they do not go through the per-batch translation loop (Stage 4), since this stage already produced them.

**Note on the slug:** not every consuming project uses localized URL slugs — some keep a fixed page path across all locales (e.g. `/de/about`, not `/de/ueber-uns`). Check the project's routing skill/config before assuming the slug output is consumed anywhere; if it isn't, it's still worth proposing (useful if the project adds localized routing later) but say so explicitly rather than implying it's wired up.

## Output Format
```markdown
## Localized Metadata
- Title: ...
- Description: ...
- Slug: ...

## Target Keywords
| Keyword | Rationale (only if it differs from a literal translation) |
|---|---|
```

## Common Mistakes
- Translating the English keyword list word-for-word instead of reasoning about how the target market actually searches.
- Treating MCP/GSC data as required — it's a sanity check, never a blocker.
- Proposing a slug that isn't URL-safe for the target language (unencoded spaces, unnormalized diacritics).
- Treating this stage's Title/Description as throwaway audit content — if the project has a `metadata.<page-id>Title`/`Description` pair, these values are the actual final translation for those keys and must flow into the completeness gate and merged output, not just sit in `seo-adaptation.md`.
- Assuming the localized slug is automatically used by the project's routing — check first; many projects keep a fixed page path across all locales.
- Translating a `translate: false` entity inside the proposed title/description "because it sounds better in a headline" — entity protection applies here exactly as it does in contextual-translation.md; a title is not an exemption.
