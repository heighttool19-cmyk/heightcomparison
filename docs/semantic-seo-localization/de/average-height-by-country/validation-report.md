# Validation Report — average-height-by-country (DE)

Stage 5 semantic/completeness validation for the German translation candidate
against `messages/en.json`'s `averageHeightByCountry` namespace + the 2
`metadata.averageHeightByCountry*` keys.

## 1. Completeness gate (mechanical key-set diff)

Script: enumerate every leaf key path under `en.averageHeightByCountry` +
`en.metadata.averageHeightByCountryTitle`/`Description`, enumerate every leaf key
path under the merged German candidate (`de-candidate.json`), compare the two sets.

```
EN leaf count: 229
DE leaf count: 229
Missing in DE: 0
Extra in DE: 0
```

**Result: PASS.** The key sets match exactly — same 229 keys present on both
sides, none dropped, none invented. Full script output is reproducible via the
Node snippet in `RESUME-CONTEXT.md`'s "How to re-verify" section, extended to
also enumerate the `de-candidate.json` file (same leaf-walker function applied to
both trees).

## 2. Numeric-fidelity check (mechanical)

A second script extracted every digit sequence (`\d+[.,]?\d*`, comma normalized to
dot) from each EN source value and the corresponding DE value, and diffed the
sorted number sets per key across all 229 keys.

**Result: 9 raw mismatches flagged, all 9 are false positives** caused by the
regex greedily including a trailing sentence-final period as part of the number
token (e.g. `19.` vs `19`, `1940.` vs `1940`, `1964.` vs `1982.` vs `1964`/`1982`,
`75.` vs `75`, `20.` vs `20` from "20th century" → "20. Jahrhundert" where German
correctly uses an ordinal-indicator period that English doesn't). Manual
inspection of all 9 flagged keys confirms every actual numeric figure (cm values,
years, percentages, generational cm-gain ranges, ordinal century/rank numbers) is
identical between source and target — no digit was altered, dropped, or
transposed anywhere in the 229-key set. Full flagged list is reproducible via the
node script in this task's working notes; see also the spot-checks in section 4
below for the highest-risk keys (extremes section, which carries the most closely
packed numeric/date content on the page).

## 3. Terminology & phrasing consistency across the 21 batches

- **"Durchschnittsgröße nach Land"** used consistently for the page's own product
  identity (H1, metadata title, matches shipped nav/footer label) — never
  alternated with a different phrasing elsewhere on the page.
- **"Durchschnittsgröße" / "durchschnittliche Körpergröße"** used consistently for
  "average height" throughout (title/labels favor the shorter compound
  "Durchschnittsgröße", body prose favors "durchschnittliche Körpergröße" — this
  register split mirrors the EN source's own use of "average height" in titles vs.
  "the average height of a woman" in prose, not an inconsistency).
- **Country exonyms** applied consistently every time a given country is named
  across all batches (checked against the fixed table in RESUME-CONTEXT.md):
  Netherlands→Niederlande, Germany→Deutschland, Denmark→Dänemark,
  Norway→Norwegen, Montenegro→Montenegro, Estonia→Estland, Latvia→Lettland,
  Timor-Leste→Timor-Leste (unchanged, proper name), Guatemala→Guatemala
  (unchanged), Laos→Laos (unchanged), Bangladesh→Bangladesch, Nepal→Nepal,
  South Korea→Südkorea, China→China, Japan→Japan, Iran→Iran, India→Indien,
  Canada→Kanada, Australia→Australien, Ireland→Irland, Sri Lanka→Sri Lanka,
  United Kingdom→Vereinigtes Königreich, Russia→Russland, Philippines→Philippinen,
  USA→USA (unchanged), Turkey→Türkei, Serbia→Serbien, Ukraine→Ukraine, Poland→Polen,
  France→Frankreich, Brazil→Brasilien, Mexico→Mexiko, Indonesia→Indonesien,
  Honduras→Honduras — verified once per distinct country per its first appearance
  and traced through every later recurrence (global table sourceNote, tallest/
  shortest sections, selected-countries profiles, region-map `ex` fields).
- **"World Health Organization"** kept verbatim untranslated (not
  "Weltgesundheitsorganisation") in `globalAverage.paragraph1`'s `<who>` tag,
  matching the confirmed site-wide convention (already shipped this way in
  `messages/de.json` for the height-weight-percentile page, and matching the
  `WHO` entity's `translate:false`).
- **Person names** (Robert Wadlow, Sultan Kösen, Chandra Bahadur Dangi, Zeng
  Jinlian, Rumeysa Gelgi, Jyoti Amge) kept verbatim untranslated everywhere they
  recur (extremes section paragraphs + the parallel `dataCards` stat blocks) —
  checked for spelling consistency between the two places each name appears.
- **Organization names** (NCD Risk Factor Collaboration / NCD-RisC, World
  Population Review, Guinness World Records) kept verbatim untranslated in every
  recurrence (intro paragraph link tags, table source notes, chart captions,
  extremes paragraphs, distribution data-sources line, FAQ answers).
- **cm figures** never altered between recurrences of the same statistic across
  different sections — e.g. "183.8 cm" (Netherlands male average) appears in
  `tallestCountries.captionMen`, `tallestCountries.paragraph1`,
  `averageMale.paragraph1`, and `faq[2].a`; all four instances read "183,8 cm" in
  the German candidate. Same cross-check performed for 175.5 cm (South Korea
  male), 170.4/170.0 cm (Netherlands/Montenegro female), 159.8 cm (Timor-Leste
  male), 171 cm / 159 cm (global male/female averages), and the ±7 cm / ±6 cm
  standard-deviation figures.
- **Decimal formatting**: all decimal cm/percentage figures consistently converted
  from English decimal-point to German decimal-comma notation (183.8→183,8,
  97.5%→97,5 %) per standard German number formatting; German also adds a
  non-breaking-adjacent space before the `%` sign per DIN convention
  (`68 %` not `68%`) — applied consistently in every `bellCurve`/`distribution`
  percentage figure.

## 4. Spot-checks on highest-risk keys

The `extremes.*` and `extremes.dataCards.*` keys carry the page's densest
numeric/biographical content (multiple people, multiple dates, multiple cm and
imperial-inch figures per paragraph) and were checked figure-by-figure against
the corresponding `dataCards` stat block to confirm the paragraph prose and the
compact stat card agree with each other in both languages:

- Robert Wadlow: 272 cm / 8'11" / died 1940 — consistent in `tallestMan.paragraph`
  and `dataCards.tallestManEver` (EN and DE).
- Chandra Bahadur Dangi: 54.6/54,6 cm / 1'9" / verified 2012, died 2015 (note: the
  `dataCards.shortestManEver.meta` "d. 2015" is a distinct fact from the
  paragraph's "lived to 75" — both preserved verbatim, this is a pre-existing EN
  source detail, not a localization artifact).
- Zeng Jinlian: 246.3/246,3 cm / 8'1" / born 1964, died 1982 aged 17 — consistent
  across paragraph and data card in both languages.
- Jyoti Amge: 62.8/62,8 cm / 2'1" / record holder since 2011 — consistent across
  paragraph and data card in both languages.

## 5. `t.rich`/ICU placeholder integrity

All tag-based rich-text keys checked to confirm the German candidate keeps the
exact same tag names as the English source (required for `t.rich()` binding to
keep working once wired into `.tsx` — out of scope for this task, but the
translation candidate must not break that future step):

- `intro.description`: `<ncdRisc>...</ncdRisc>` and `<wpr>...</wpr>` — present,
  same tag names, same wrapped entity names, in DE.
- `globalAverage.paragraph1`: `<who>...</who>` — present, same tag name, in DE.
- `whyDiffers.nutritionParagraph` / `.healthcareParagraph` / `.economicParagraph`:
  `<bold>...</bold>` — present, same tag name, in DE.
- ICU placeholders `{query}` (`globalTable.noResults`), `{mean}`
  (`distribution.bellCurve.globalAvgLabel`), `{label}`
  (`distribution.bellCurve.axisLabel`) — all three preserved verbatim (unchanged
  placeholder names) in the German candidate.

## 6. Overall verdict

**PASS.** 229/229 keys present and complete, 0 numeric drift, terminology and
named entities consistent across all 21 batches, all `t.rich`/ICU tags and
placeholders intact. Ready for human review per `PENDING-REVIEW.md`.
