# Entity Extraction & Registry Sync

## Purpose
Identify entities in source content and keep a canonical, cross-page registry so brand/product/technical names stay consistent — and untranslated by default — across every page you localize.

## Entity Types
Person, Organization, Brand, Product, Place, Technology, Software, Concept, Event, Other.

## Steps
1. Read the source content (page/component text, or the relevant namespace in `messages/en.json`).
2. Extract every entity a reader would recognize as a named, specific thing — not generic nouns. Skip common nouns ("the door", "a person") unless part of a proper name.
3. For each entity, determine: `canonical_name`, `entity_type`, a one-sentence description, and whether it should be translated. Default `translate: false` for Brand/Product/Software/Organization. Default `translate: true` only for Place/Concept names that have an established target-language equivalent (e.g. "United States" → "Vereinigte Staaten" in German), and always leave Person names untranslated unless there's a well-established localized form.
4. Read `docs/semantic-seo-localization/<locale>/entities.json` if it exists; if not, treat the registry as empty (it will be created in Step 6).
5. For each extracted entity, check whether `canonical_name` (case-insensitive) already exists in the registry:
   - Exists, and `entity_type`/`translate` match: reuse it, no change needed.
   - Exists, but `entity_type` or `translate` differs from this page's extraction: flag as a **CONFLICT** for human resolution. Do not silently overwrite.
   - Does not exist: append a new entry.
6. New entry shape:
```json
{
  "canonical_name": "string",
  "entity_type": "Person|Organization|Brand|Product|Place|Technology|Software|Concept|Event|Other",
  "description": "one sentence",
  "translate": false,
  "localized_form": null,
  "first_seen_page": "page-id",
  "added_at": "ISO-8601 date"
}
```
   When `translate` is `true`, propose a `localized_form`; otherwise leave it `null` (meaning: use `canonical_name` as-is in the target text).
7. Write the updated registry to `docs/semantic-seo-localization/<locale>/entities.json` as `{"entities": [...]}`, pretty-printed, entities sorted alphabetically by `canonical_name`.
8. Report a short summary: entities reused, entities added, entities flagged as conflicts.

## Example
Input: "The Eiffel Tower in Paris is shorter than the Burj Khalifa."

Extracted:
- Eiffel Tower — Place — landmark in Paris — `translate: false`
- Paris — Place — city in France — `translate: true` (has an established localized form in many target languages)
- Burj Khalifa — Place — skyscraper in Dubai — `translate: false`

## Common Mistakes
- Extracting generic nouns ("the tower", "a building") as entities — only extract specific named things.
- Auto-translating Brand/Product/Software names because it "reads more naturally" — entity protection is not a style choice.
- Silently overwriting an existing registry entry when a new page's extraction disagrees with it — always flag as CONFLICT instead.
