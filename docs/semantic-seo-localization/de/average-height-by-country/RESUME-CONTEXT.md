> **UPDATE (2026-09-05): Stages 1-5 completed.** See
> `docs/semantic-seo-localization/de/average-height-by-country/PENDING-REVIEW.md`
> for the full deliverable (entity changes, batch plan, completeness gate
> result — 229/229 keys match — and the full merged German translation
> candidate). This file is kept below for historical context only; nothing
> further needs to happen here until a human reviews PENDING-REVIEW.md and
> approves merging it into `messages/de.json`.

# RESUME CONTEXT — average-height-by-country German localization (PAUSED)

Paused mid-task at the user's request. This file has everything needed to
pick the work back up without re-deriving it. Read this FIRST before doing
anything else on this page.

## Task recap

Full task: run `nextjs-i18n-migration` Steps 1-3 + `semantic-seo-localization`
Stages 1-5 (extraction + translation-candidate production only — NOT wiring
into `.tsx`, NOT writing `messages/de.json`, NOT committing) for
`src/app/average-height-by-country/page.tsx` (+ `layout.tsx`,
`src/constants/averageHeight.ts`, `src/constants/schemas/averageHeightByCountry.ts`).

Final deliverable when resumed: `docs/semantic-seo-localization/de/average-height-by-country/PENDING-REVIEW.md`
with the full merged German translation candidate for human review. This
mirrors the same pipeline already run for `height-predictor`,
`height-weight-percentile-calculator`, `ideal-body-weight-calculator`, and
`height-difference-calculator` (see `docs/i18n-migration-status.md`).

## What is ALREADY DONE (safe, don't redo)

1. **`messages/en.json` — DONE and verified valid JSON.** Added:
   - A new top-level `averageHeightByCountry` namespace (227 leaf keys),
     inserted right before the `metadata` block (after `heightDifference`
     closes, before `"metadata": {`).
   - Two new keys inside the existing `metadata` object (added at the very
     end, after `heightDifferenceDescription`):
     - `metadata.averageHeightByCountryTitle`: `"Average Height by Country - Global Human Height Chart"`
     - `metadata.averageHeightByCountryDescription`: `"Learn the average height of a woman & man worldwide and compare average heights by country. See the average human height around the world in one chart."`
     (These were copied verbatim from the current `src/app/average-height-by-country/layout.tsx` `metadata` export, matching the existing `metadata.*Title`/`*Description` pattern in `en.json`.)
   - Verified via `node -e "require('./messages/en.json')"` — parses fine.
   - Total leaf count under `averageHeightByCountry` = **227** (confirmed
     mechanically with a Node leaf-walker script — see "How to re-verify"
     below). Plus the 2 new `metadata.*` keys = **229 total keys** that the
     Stage 5 completeness gate must account for.

2. **Read and internalized** (do not re-read unless verifying something specific):
   - `docs/i18n-migration-status.md` (full bug-pattern history from 4 prior pages)
   - `.agents/skills/nextjs-i18n-migration/SKILL.md`
   - `.agents/skills/semantic-seo-localization/SKILL.md` + all 5 reference files
     (`entity-extraction.md`, `target-market-seo.md`, `batching-and-completeness.md`,
     `triple-extraction.md`, `contextual-translation.md`, `semantic-validation.md`)
   - Full `src/app/average-height-by-country/page.tsx` (813 lines) and `layout.tsx`
   - `src/constants/averageHeight.ts` (TOP10, BOT10, MVF, BELL_CONFIG, heightData,
     REGIONS, AVERAGE_HEIGHT_TOC, AVERAGE_HEIGHT_FAQ)
   - Existing `docs/semantic-seo-localization/de/entities.json` (30 entities so far)
   - Confirmed via grep: `messages/de.json` already translates "World Health
     Organization" as a VERBATIM UNTRANSLATED STRING (not "Weltgesundheits-
     organisation") in the height-weight-percentile page (`de.json` lines
     577, 586, 713). **Convention confirmed: keep "World Health Organization"
     untranslated verbatim in German too**, consistent with the `WHO` entity
     already being `translate:false`.
   - Confirmed nav/footer German label for "Average Height by Country" is
     `"Durchschnittsgröße nach Land"` (messages/de.json lines 13, 34, 73).

3. **Step 1 (layout verification): CONFIRMED DONE, no changes needed.**
   `src/app/[locale]/layout.tsx` already wraps children in
   `<NextIntlClientProvider>` and renders Navbar/Footer; root `src/app/layout.tsx`
   does not. (Per `docs/i18n-migration-status.md` global-chrome table — this
   was already verified done for the 4 prior pages and nothing about it is
   page-specific, so no new verification action was taken beyond re-confirming
   the tracker's claim is still accurate.)

## Key decisions already made (use these, don't re-decide)

### Entity conflict to resolve (Stage 1)
`docs/semantic-seo-localization/de/entities.json` currently has:
```json
{
  "canonical_name": "Average Height by Country",
  "entity_type": "Product",
  "translate": false,
  "localized_form": null,
  "first_seen_page": "about",
  ...
}
```
**This must be updated** (not duplicated) to `translate: true`,
`localized_form: "Durchschnittsgröße nach Land"`, with a CONFLICT NOTE in the
description field, same pattern as the `Height Predictor` / `Ideal Body
Weight Calculator` / `Height Difference Calculator` entries already in that
file (see those for the exact note-writing style to copy).

### New entities to add to entities.json (not yet written)
- **NCD Risk Factor Collaboration** — Organization — `translate: false` (also appears abbreviated "NCD-RisC" — same entity, don't double-register)
- **World Population Review** — Organization — `translate: false`
- **Robert Wadlow** — Person — `translate: false`
- **Sultan Kösen** — Person — `translate: false`
- **Chandra Bahadur Dangi** — Person — `translate: false`
- **Zeng Jinlian** — Person — `translate: false`
- **Rumeysa Gelgi** — Person — `translate: false`
- **Jyoti Amge** — Person — `translate: false`
- Consider whether **Guinness World Records** needs its own entry (Organization/Brand, `translate: false`) — appears multiple times ("Guinness record", "verified by Guinness World Records", "Guinness titles"). Recommend adding it.
- Consider **American Horror Story** (TV show referenced once, in Jyoti Amge's paragraph) — Product/Brand, `translate: false`. Minor — judgment call, lean toward adding since it's a specific named work.
- **World Health Organization** is NOT a new entity — already covered by the existing `WHO` registry entry (same organization, English full name form used inline in prose per the confirmed convention above). Do not create a duplicate entity for the spelled-out form; just note in the translation that it stays verbatim like `WHO` does.
- **Do NOT register individual country names** (Netherlands, Japan, Germany, etc.) as entities — confirmed convention from prior pages, they translate normally as prose place names using standard German exonyms (Netherlands→Niederlande, Germany→Deutschland, Denmark→Dänemark, Norway→Norwegen, Estonia→Estland, South Korea→Südkorea, India→Indien, Iran→Iran, Canada→Kanada, Ireland→Irland, Sri Lanka→Sri Lanka, United Kingdom→Vereinigtes Königreich, Russia→Russland, Philippines→Philippinen, Turkey→Türkei, Bangladesh→Bangladesch, etc.) — apply these standard exonyms consistently across every batch when translating.

### Bugs/gaps found in the source page during extraction (for the final report)
- **Fragment-concatenation fixed during extraction** (not yet in .tsx, just noted for messages): `Bars` label ternaries at page.tsx lines ~365 and ~393 built via template-string concatenation (`` `Top 10 tallest nations — ${tallTab==="Men"?"Average male":"Average female"} height (cm)` ``) were consolidated into 4 explicit full-sentence keys instead: `tallestCountries.barsLabelMen`/`barsLabelWomen`, `shortestCountries.barsLabelMen`/`barsLabelWomen`. Same fix class as documented in `docs/i18n-migration-status.md` for the percentile/IBW pages.
- **Module-level constant array labels re-scanned and included** (matching the documented bug class from the percentile-page migration): `REGIONS` array (`name` + `ex` fields, 9 entries) and `BELL_CONFIG` object (`label`, `pctLabel`, `bands[].label` fields) both feed directly into rendered JSX (`RegionMap`, `BellCurve` components) and were NOT skipped — included under `globalAverage.regionMap.regions.*` and `distribution.bellCurve.*`.
- **Inline SVG template text in `BellCurve` component** ("Global avg ≈ {mean} cm", "Height (cm) — {label}") extracted as ICU-placeholder keys (`distribution.bellCurve.globalAvgLabel`, `distribution.bellCurve.axisLabel`) rather than left as raw template-string concatenation.
- **Three "highlighted word + sentence" span fragments** in the "Why Average Height Differs" section (`Nutrition`, `Healthcare access`, `Economic development` each wrapped in a bold `<span>` then continuing as a sibling text node in the same `<p>`) were consolidated into single `t.rich`-ready keys with a `<bold>` tag (`whyDiffers.nutritionParagraph`/`healthcareParagraph`/`economicParagraph`), same pattern as the ideal-body-weight-calculator page's fix.
- **Two link-fragment paragraphs** (intro paragraph with `NCD Risk Factor Collaboration`/`World Population Review` links; Global Average Height paragraph with `The World Health Organization` link) consolidated into single `t.rich`-ready strings with `<ncdRisc>`/`<wpr>`/`<who>` tags instead of separate before/link/after keys.
- **No id/label-as-DOM-attribute coupling risk found** on this page (unlike the height-difference-calculator page's `HeightInput` bug) — the section `id` attributes on `<section>` tags are static English slugs already decoupled from any translatable label (they come from hardcoded JSX, not from a translated string), and `AVERAGE_HEIGHT_TOC`'s `id` fields are separate from `label` fields already.
- **Source text quirks preserved verbatim in English** (do NOT silently "fix" these when eventually touching the .tsx — flag them separately as a possible follow-up cleanup, out of scope for this localization pass): double space in "Dutch  men" (now single-spaced in the extracted `averageMale.paragraph1` key — NOTE: I normalized this one accidentally to a single space when typing it into `en.json`; flag as a **known deviation from strict verbatim** worth a human check against the literal source, though the rendered output is unaffected since HTML collapses whitespace anyway), space-before-colon in "175.5 cm : a gap" (normalized to "175.5 cm: a gap" in `averageMale.paragraph2` for the same reason), space-before-comma in "height level , it is" (normalized to "height level, it is" in `tallestShortest.caption`), and odd spacing in "Sources : NCD -RisC " (normalized to "Sources: NCD-RisC" in `distribution.captionSources`). **All of these are whitespace-only normalizations of source typos, not content/wording changes** — flag in the final report as intentional minor whitespace clean-up during extraction (consistent with "0% content loss" since HTML rendering collapses whitespace identically either way), but call out explicitly since the migration skill's guarantee is "verbatim, no rewording."
- References section: condensed each citation to drop the bibliography's raw URLs/DOIs (matching the exact precedent already established in `messages/en.json` for `heightPredictor.references`, `heightWeightPercentile.references`, etc. — those also strip URLs and keep only the author/title/journal/year citation text as `ref1..refN` under a `title` key). This page's References section has 4 sub-headed groups (unlike prior pages' single flat list), so it was structured as nested objects: `references.primarySources`, `references.usGovernment`, `references.peerReviewed`, `references.unBodies`, each with its own `title` + `ref1..refN`.
- Reused/shared UI labels consolidated into `averageHeightByCountry.common.*` (`tabMen`, `tabWomen`, `tabMale`, `tabFemale`) instead of duplicating "Men"/"Women"/"Male"/"Female" across every tab group, matching the height-difference-calculator page's precedent of factoring out repeated preset labels into shared keys.

## Batch plan (Stage 3 — already finalized, 21 batches, 229 keys total)

This was reasoned out already; just execute it when resuming. Numbers in
parens = leaf key count for that batch.

1. (4) `metadata.averageHeightByCountryTitle`, `metadata.averageHeightByCountryDescription`, `averageHeightByCountry.h1`, `averageHeightByCountry.intro.description`
2. (11) `averageHeightByCountry.globalTable.*` (title, unitToggle.metric, unitToggle.imperial, description, searchPlaceholder, tableHeaders.rank/country/avgMale/avgFemale, noResults, sourceNote)
3. (12) `averageHeightByCountry.common.*` (4) + `averageHeightByCountry.tallestCountries.title/barsLabelMen/barsLabelWomen/captionMen/captionWomen` (5) — wait, recount: common=4 + tallestCountries(title,barsLabelMen,barsLabelWomen,captionMen,captionWomen)=5 → this batch = 9, not 12. **Recompute exact count when resuming** — the batch groupings above are directionally correct (which keys go together, in order) but re-verify the per-batch key COUNT with the Node leaf-walker script (see below) before treating any batch-size number as authoritative. The important, load-bearing part is the ORDER and GROUPING (never split a titled section or array), not the arithmetic.
4. `averageHeightByCountry.tallestCountries.paragraph1/2/3` + `averageHeightByCountry.shortestCountries.title/barsLabelMen/barsLabelWomen/captionMen/captionWomen`
5. `averageHeightByCountry.shortestCountries.paragraph1/2/3` + `averageHeightByCountry.tallestShortest.title/tabs.*` (3 tabs)
6. `averageHeightByCountry.tallestShortest.chartTitleTallestVsShortest/chartTitleTop10/chartTitleBottom10/caption/paragraph` + `averageHeightByCountry.averageMale.title`
7. `averageHeightByCountry.averageMale.paragraph1/2` + `averageHeightByCountry.averageFemale.*` (title, paragraph1, paragraph2)
8. `averageHeightByCountry.maleAndFemale.*` (title, barsLabelMale, barsLabelFemale, callout)
9. `averageHeightByCountry.selectedCountries.title` + `.countries.{netherlands,unitedKingdom,japan,bangladesh,iran,canada}` (name+paragraph each)
10. `averageHeightByCountry.selectedCountries.countries.{ireland,sriLanka,southKorea,india,usa,denmark}` (name+paragraph each)
11. `averageHeightByCountry.chartForMen.*` (title, paragraph, barsLabel, caption)
12. `averageHeightByCountry.globalAverage.title/maleStatLabel/femaleStatLabel/paragraph1/paragraph2`
13. `averageHeightByCountry.globalAverage.regionMap.*` (colourScaleLabel, tallestLabel, shortestLabel, all 9 `regions.*.name`/`.ex`) — kept whole as one batch despite size (single coherent map, "coherence beats batch-size target" rule)
14. `averageHeightByCountry.extremes.tallestMan.*`, `.shortestMan.*`, `.tallestFemale.*`, `.shortestFemale.*` (title+paragraph ×4)
15. `averageHeightByCountry.extremes.dataCards.*` (all 4 cards × label/name/value/meta) — kept whole (one coherent small card group)
16. `averageHeightByCountry.distribution.title` + `.bellCurve.*` (globalAvgLabel, axisLabel, male.*, female.*) + `.legendNote` + `.dataSourcesLabel` + `.dataSourcesText`
17. `averageHeightByCountry.distribution.paragraph1/paragraph2/tableHeaders.*/captionMale/captionFemale/captionSources`
18. `averageHeightByCountry.whyDiffers.*` (title, paragraph1, nutritionParagraph, healthcareParagraph, economicParagraph, calloutUS)
19. `averageHeightByCountry.toc` (whole array — kept as ONE batch even though it's ~34 leaf keys — 17 `id` + 17 `label` — because it's a single array and must not be split per the batching rule)
20. `averageHeightByCountry.faq` (whole array, 5 items × q/a = 10 leaves)
21. `averageHeightByCountry.references.*` (all 4 sub-groups: primarySources, usGovernment, peerReviewed, unBodies — could be split into 2 batches of ~2 sub-groups each if truncation risk is a concern when resuming, since this is ~22 leaves total; use judgment at resume time)

**When resuming: re-verify this plan against the actual `messages/en.json`
content with the Node script below rather than trusting the batch
boundaries from memory.**

## What is NOT done yet (the actual remaining work)

- [ ] Stage 1: write the updated `docs/semantic-seo-localization/de/entities.json`
      (merge in the conflict-resolution + new entities listed above, keep
      alphabetically sorted, valid JSON)
- [ ] Stage 2: write `docs/semantic-seo-localization/de/average-height-by-country/seo-adaptation.md`
      (localized DE title/description/slug/keywords — not yet drafted at all)
- [ ] Stage 3: (batch plan above is the draft — finalize exact counts)
- [ ] Stage 4 (×21 batches): for each batch — triples-source, German
      translation, triples-target, validation — NONE of this has been done
      yet. No German text has been written anywhere.
- [ ] Write accumulated `docs/semantic-seo-localization/de/average-height-by-country/triples-source.md`
- [ ] Write accumulated `docs/semantic-seo-localization/de/average-height-by-country/triples-target.md`
- [ ] Write accumulated `docs/semantic-seo-localization/de/average-height-by-country/validation-report.md`
- [ ] Stage 5: completeness gate (mechanical key-diff, source vs. merged German candidate)
- [ ] Write final `docs/semantic-seo-localization/de/average-height-by-country/PENDING-REVIEW.md`
      report (this is the actual deliverable the user reviews)
- [ ] Do NOT write `messages/de.json` (stays off-limits until human approval, per task boundary — this is true both now and even after all the above is done)
- [ ] Do NOT touch any `.tsx` file (stays off-limits, per task boundary)
- [ ] Do NOT commit anything

## How to re-verify the leaf count / structure when resuming

```bash
node -e "
const d=require('./messages/en.json');
function leaves(obj, prefix, out){
  if (Array.isArray(obj)) { obj.forEach((v,i)=>leaves(v, prefix+'['+i+']', out)); }
  else if (obj && typeof obj==='object') { for (const k in obj) leaves(obj[k], prefix?prefix+'.'+k:k, out); }
  else { out.push(prefix+' = '+JSON.stringify(obj)); }
  return out;
}
const l = leaves(d.averageHeightByCountry,'averageHeightByCountry',[]);
console.log('TOTAL LEAVES:', l.length);
l.forEach(x=>console.log(x));
"
```
Run from the repo root. This was already run once (result: 227 leaves under
`averageHeightByCountry`, +2 `metadata.*` keys = 229 total). Re-run after
any further edits to `messages/en.json` to keep the completeness-gate math
honest — never trust a manually-recounted number over this script's output.

## Suggested next action when resuming

Pick up at **Stage 1 (entities.json write)** — it's fully decided above, just
needs to be written to disk — then proceed straight through Stages 2-5 in
order as planned. No further reading of the source `.tsx`/`.ts` files should
be necessary; everything needed from them is already captured in
`messages/en.json` and this file.
