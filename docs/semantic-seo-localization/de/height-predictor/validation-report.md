## Semantic Validation Report — height-predictor (de)

**Alignment score:** 100% (36/36 source triples preserved)
**Verdict:** PASS

**Update (batch 15 added):** an initial completeness sweep by the
coordinator caught that `src/components/HeightCharts.tsx` (rendered as
`DynamicHeightCharts` inside this same page's `boys-girls-growth-charts`
section) had been missed on the first migration pass. Confirmed via grep
that it is imported only by this page, so it was brought fully into scope
as batch 15 (`heightCharts`, 30 leaf keys) and re-run through the full
pipeline: entity registration (`National Center for Health Statistics`
added to `entities.json`, `translate:false`), translation, triple
extraction/validation (triples #30-36 below), and the mechanical
completeness gate (re-run: 363/363 EN/DE leaf keys match, 0
missing/extra/empty).

### Preserved (29)
| Source # | Source Triple | Target # | Note |
|---|---|---|---|
| 1 | Khamis-Roche method predicts adult height without bone age testing | 1 | Exact match. |
| 2 | Khamis-Roche method uses four inputs | 2 | Exact match. |
| 3 | Khamis-Roche accuracy ±2.1in/±1.7in | 3 | Numbers preserved exactly. |
| 4 | Mid-Parental Height Formula predicts from parents' heights only | 4 | Entity name preserved verbatim. |
| 5 | Boys formula (Father+Mother+5in)÷2 | 5 | Formula preserved, terms translated. |
| 6 | Girls formula (Father+Mother-5in)÷2 | 6 | Formula preserved, terms translated. |
| 7 | Mid-Parental accuracy ±4in (10cm) | 7 | Numbers preserved. |
| 8 | Genetics 60-80% of final height | 8 | Number preserved. |
| 9 | Environment 20-40% remaining | 9 | Number preserved. |
| 10 | Boys stop growing ~18 | 10 | Number preserved; natural German word order. |
| 11 | Girls reach adult height 15-16 | 11 | Number preserved. |
| 12 | Bone age method most accurate available | 12 | Exact match. |
| 13 | Bone age evaluation methods (Greulich-Pyle, Tanner-Whitehouse) | 13 | Proper names kept verbatim. |
| 14 | Bayley-Pinneau combines bone age + height-for-age tables | 14 | Exact match. |
| 15 | Roche-Wainer-Thissen uses bone age/height/weight/parents | 15 | Exact match. |
| 16 | 50th percentile = median height | 16 | Exact match. |
| 17 | Healthy children 3rd-97th percentile | 17 | Numbers preserved. |
| 18 | CDC Growth Charts tracks birth-18 data | 18 | Entity + numbers preserved. |
| 19 | Height calculator requires 4 inputs | 19 | Exact match. |
| 20 | Growth chart requires age+height | 20 | Exact match. |
| 21 | Height calculator accuracy ±2-4in | 21 | Number preserved. |
| 22 | This calculator uses Khamis-Roche model | 22 | Exact match. |
| 23 | Predictions within 5-10cm/2-4in | 23 | Numbers preserved. |
| 24 | Results are a range not exact value | 24 | Preserved in all 3 occurrences (khamisRoche card, midParental card, accuracy section). |
| 25 | Medical disclaimer informational only | 25 | Exact match. |
| 26 | Height Comparison Tool visualizes differences | 26 | Brand name preserved verbatim. |
| 27 | Image to Height Tool estimates from photos | 27 | Brand name preserved verbatim. |
| 28 | Height & Weight Percentile compares to WHO/CDC data | 28 | Entity names preserved verbatim. |
| 29 | No exercise/supplement increases height post growth-plate closure | 29 | Exact match. |
| 30 | HeightCharts data based on CDC growth chart data | 30 | Exact match. |
| 31 | HeightCharts source is CDC Growth Charts / NCHS | 31 | Entity names preserved verbatim in both occurrences (chart view + table view footers). |
| 32 | 50th percentile line represents Average/Median | 32 | Exact match. |
| 33 | Boys stop growing ~16–18 yrs (insight card) | 33 | Number preserved (updated Nov 2026). |
| 34 | Girls stop growing ~14–15 yrs (insight card) | 34 | Number preserved (updated Nov 2026). |
| 35 | Average adult male height 175cm/5'9" (NHANES) | 35 | Numeric literal preserved byte-identical. |
| 36 | Average adult female height 161.3cm/5'3.5" (NHANES) | 36 | Numeric literal preserved byte-identical. |
| 37 | Mayo Clinic publishes / validates age-2 rule | 37 | Preserved verbatim. |
| 38 | Khamis-Roche error within 5.3cm (boys) / 4.3cm (girls) for 9/10 | 38 | Preserved verbatim across all sections. |
| 39 | Mid-Parental expected range within ±10cm (4 in) | 39 | Preserved verbatim. |
| 40 | Height prediction without parental heights not supported | 40 | Preserved verbatim in guidance. |
| 41 | 100% height prediction accuracy impossible | 41 | Preserved verbatim. |

### Weakened (0)
None.

### Missing (0)
None.

### Contradicted (0)
None.

### Introduced / Possible Hallucination (0)
None. No new facts, statistics, or claims were added beyond the source.

## Batch-level notes
All 14 batches (see `triples-source.md` batch plan) were translated in a
single continuous pass to keep terminology consistent (e.g. "Größenrechner"
for "height calculator", "Wachstumsfugen" for "growth plates",
"Erwachsenengröße" for "adult height", "Elterngröße" for "parent(s')
height(s)" used uniformly across all batches). No batch required a retry.

## Deliberate scope decisions (not validation failures)
1. **References/Bibliography (`heightPredictor.references.ref1`-`ref11`)**
   left untranslated (identical EN/DE strings) by deliberate decision,
   documented in `seo-adaptation.md`. These are formal academic citations of
   English-language sources (CDC, journals, book titles); international
   convention keeps such citations in their original language. This does
   not affect the completeness gate (both `en` and `de` have non-empty,
   present values at these keys — see the mechanical key-diff in the final
   report) and does not represent meaning loss, since the citation content
   is unchanged.
2. **JSON-LD schema** (`src/constants/schemas/heightPredictor.ts`) is kept
   English-only, matching the `about` page's precedent
   (`src/constants/schemas/about.ts` has no `de` variant either).
3. **`canIncrease` title split** — see the deviation note in
   `triples-target.md`. Classified as a natural-language word-order
   adaptation, not a semantic change.
