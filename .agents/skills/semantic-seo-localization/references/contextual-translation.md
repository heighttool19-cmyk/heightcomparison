# Contextual Translation

## Purpose
Translate one batch's source content into the target language while preserving meaning, protecting registered entities, and using the target-market SEO terms from the target-market-seo stage — producing a draft ready for triple re-extraction and validation. Runs once per batch, in document order, as part of the per-batch loop (Stage 4b in `SKILL.md`, per `batching-and-completeness.md`). This draft is NOT written into `messages/<locale>.json` yet — batches are merged and mechanically verified for completeness (Stage 5) before anything reaches the human review gate.

## Inputs
- Source content (English)
- `docs/semantic-seo-localization/<locale>/entities.json` (entity registry from the entity-extraction stage)
- `docs/semantic-seo-localization/<locale>/<page-id>/seo-adaptation.md` (from the target-market-seo stage)
- Target language name, passed in by the orchestrator — never hardcode a specific language in this file.
- Established phrasing notes from earlier batches in this page's run (recurring non-entity terms already translated a particular way) — empty if this is the first batch of the page.

## Core Rules
1. **Translate meaning, not individual words.** Prioritize context, intent, and natural expression in the target language over literal word-for-word translation.
2. **Protect registered entities.** For every entity in the registry with `translate: false`, use `canonical_name` verbatim. For `translate: true`, use the registry's `localized_form` if present; otherwise propose one and flag it as needing to be added to the registry on the next entity-extraction pass.
3. **Use the target-market SEO terms** from `seo-adaptation.md` where they naturally fit the content, instead of literally translating the source's English keywords.
4. **Preserve document structure** — headings, lists, tables, emphasis, numbering. Do not add or remove sections.
5. **Do not add unsupported information** — no new facts, claims, examples, or statistics absent from the source.
6. **Maintain terminology consistency** — once a recurring concept is translated a particular way, keep it consistent throughout the content.
7. **Handle ambiguity by inferring from context** — when a term has multiple valid target-language equivalents, pick the one that best fits the document's subject, audience, and the search intent captured in `seo-adaptation.md`.
8. Preserve URLs and code/variable placeholders (e.g. `{count}`) exactly unchanged.
9. **Reuse established phrasing from earlier batches.** If this is not the first batch of the page, check the established-phrasing notes for recurring non-entity terms already translated a particular way in an earlier batch of the same page, and reuse that phrasing rather than re-deriving a new equivalent — this is what keeps a multi-batch translation reading as one coherent page instead of stitched-together fragments.

## Priority Order (when trade-offs arise)
1. Meaning and factual fidelity
2. Contextual accuracy
3. Natural phrasing in the target language
4. Semantic/topical coverage
5. SEO terminology from the target-market-seo stage
6. Keyword relevance
7. Stylistic polish

## Output
- The translated draft text, held as the pipeline's working output (not written to `messages/<locale>.json` — that only happens after the human review gate).
- A short list of any entities that needed a proposed `localized_form` not yet in the registry, so entity-extraction.md can formalize them next run.
- An updated "established phrasing" note: any new recurring, non-entity phrase this batch introduced that later batches of the same page should reuse verbatim, if there are any worth carrying forward.

## Common Mistakes
- Translating a `translate: false` entity anyway because it "sounds more natural" — entity protection is not a style choice.
- Mechanically repeating keywords from `seo-adaptation.md` until the text reads as keyword-stuffed — integrate them naturally instead.
- Adding explanatory content the source didn't have, even if it would "help" the target reader.
- Re-deriving a fresh translation for a recurring phrase already established in an earlier batch, instead of reusing it — causes visible inconsistency across a merged page.
