# Target-Market SEO Adaptation

## Purpose
Adapt SEO metadata (title, description, slug, keyword targets) for what users in the target market/locale actually search for — not a literal translation of the English keyword set. Runs after triple extraction (so the content's core relationships are known) and before translation (so the translator can use the adapted terms).

## Steps
1. From the source content and its `triples-source.md` output, list the primary topic, secondary topics, and the concrete SEO-relevant terms (keywords, entities, product/feature names) the English version targets.
2. For the target locale, reason about how a native searcher would phrase the same intent — consider literal-vs-idiomatic phrasing differences, compound-word conventions (e.g. German), commonly borrowed English terms that stay in English in that market's tech/SEO vocabulary, and any regional search habits you know of.
3. If Google Search Console MCP tools are available and the project has an active property for this domain, you may check real query/impression data for the target locale to sanity-check candidate keywords. This is optional — proceed with LLM-reasoning-only if MCP tools are unavailable or no property is configured.
4. Propose:
   - Localized page title (SEO-oriented, not a plain translation)
   - Localized meta description
   - Localized slug (URL-safe, using target-language conventions)
   - 3–8 target keywords/phrases for this page in the target locale
5. For each proposed keyword that differs from a literal translation, note briefly why it's the target-market equivalent.
6. Save to `docs/semantic-seo-localization/<locale>/<page-id>/seo-adaptation.md`.

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
