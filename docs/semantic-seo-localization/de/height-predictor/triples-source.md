# Triple Extraction — Source (EN) — height-predictor

Batch plan (14 batches, grouped by coherent section/component rather than a
strict 8-10 key window, per `batching-and-completeness.md`'s "coherence
beats strict batch size" rule — this page's largest coherent units, e.g. the
`khamisRocheCalculator` form, run well past 10 keys but splitting a single
form's labels across batches would have made the per-batch translation
loop incoherent):

1. `intro`, `khamisRocheCalculator`
2. `midParentalCalculator`, `heightConverter`
3. `howItWorks`, `howTallChild`
4. `teensAdults`, `ctaBanner`
5. `determinants`, `growthCharts`
6. `comparisonTable`
7. `boysGrowth`, `girlsGrowth`
8. `methods` (title/subtitle/description), `methods.khamisRoche`, `methods.midParental`
9. `methods.boneAge`, `methods.bayleyPinneau`, `methods.rocheWainerThissen`, `canIncrease`
10. `accuracy`
11. `faq`
12. `toc`
13. `relatedTools`
14. `references`
15. `heightCharts` (added after an initial completeness sweep found the
    `HeightCharts.tsx` component — rendered as `DynamicHeightCharts` inside
    the `boys-girls-growth-charts` section of this same page — had been
    missed on the first pass; confirmed via grep that it is only imported
    by this page, so it is fully in scope)

**Predicate normalization notes:** "is used by" / "is applied to" / "analyzes"
all normalized to `uses`. "estimates" / "predicts" / "calculates" normalized
to `predicts`. "requires" / "needs" normalized to `requires`.

| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 1 | Khamis-Roche method | predicts | adult height without bone age testing | 96 | Core method of the page; headline claim. |
| 2 | Khamis-Roche method | uses | child's age, height, weight, and parents' average height | 90 | Defines the method's four inputs. |
| 3 | Khamis-Roche method | has accuracy | ±2.1 inches for boys, ±1.7 inches for girls | 92 | Key quantified accuracy claim, repeated in FAQ. |
| 4 | Mid-Parental Height Formula | predicts | adult height using only parents' heights | 90 | Second core method of the page. |
| 5 | Mid-Parental Height Formula (boys) | equals | (Father + Mother + 5 in) ÷ 2 | 88 | Exact formula, high specificity. |
| 6 | Mid-Parental Height Formula (girls) | equals | (Father + Mother − 5 in) ÷ 2 | 88 | Exact formula, high specificity. |
| 7 | Mid-Parental Height Formula | has accuracy | within ±4 inches (10 cm) of final adult height | 80 | Quantified accuracy claim. |
| 8 | Genetics | accounts for | 60-80% of final height | 92 | Central factual claim repeated across the page (determinants + FAQ). |
| 9 | Environment (nutrition/sleep/exercise) | accounts for | remaining 20-40% of final height | 82 | Complements the genetics claim. |
| 10 | Boys | stop growing around | age 18 | 85 | Key timeline fact, repeated in boysGrowth + FAQ. |
| 11 | Girls | reach adult height between | 15 and 16 years old | 85 | Key timeline fact for girls. |
| 12 | Bone age method (wrist X-ray) | is | most accurate prediction method available | 88 | Clinical benchmark claim. |
| 13 | Bone age method | uses evaluation methods | Greulich-Pyle, Tanner-Whitehouse | 70 | Names two clinical evaluation sub-methods. |
| 14 | Bayley-Pinneau Method | combines | bone age data with height-for-age tables | 74 | Defines a supplementary clinical method. |
| 15 | Roche-Wainer-Thissen Method | uses | bone age, current height, weight, and parental heights | 72 | Defines another supplementary clinical method. |
| 16 | 50th percentile | represents | median height for age and sex | 80 | Core growth-chart concept. |
| 17 | Healthy children | fall between | 3rd and 97th percentile | 78 | Quantified normal range. |
| 18 | CDC Growth Charts | tracks | average height and weight from birth to young adulthood (ages 2-18) | 82 | Named data-source claim. |
| 19 | Height calculator | requires | age, height, weight, parent heights | 70 | Comparison-table data-input claim. |
| 20 | Growth chart | requires | age + current height | 70 | Comparison-table data-input claim. |
| 21 | Height calculator | achieves accuracy | ±2-4 inches | 75 | Comparison-table accuracy claim. |
| 22 | This calculator | uses | Khamis-Roche growth model trained on long-term child growth studies | 80 | Accuracy-section headline claim. |
| 23 | Height predictions | fall within | 5-10 cm (2-4 inches) of final adult height | 78 | Quantified accuracy claim (accuracy section). |
| 24 | Height calculator results | are | a likely range, not an exact value | 76 | Recurring caveat, appears 3+ times across the page. |
| 25 | Medical disclaimer | states | this calculator is informational only, not a substitute for medical advice | 74 | Legal/medical disclaimer. |
| 26 | Height Comparison Tool | visualizes | height differences between people, celebrities, and objects | 60 | Related-tools cross-link description. |
| 27 | Image to Height Tool | estimates | height from photos using reference objects | 60 | Related-tools cross-link description. |
| 28 | Height & Weight Percentile tool | compares | child's height and weight to WHO and CDC population data | 60 | Related-tools cross-link description. |
| 29 | No exercise or supplement | can increase height | once growth plates close | 70 | Key "can you increase height" caveat. |
| 30 | HeightCharts data | is based on | CDC growth chart data | 85 | Headline data-provenance claim for the chart component. |
| 31 | HeightCharts source | is | CDC Growth Charts / National Center for Health Statistics | 82 | Repeated attribution line under both the chart and table views. |
| 32 | 50th percentile line | represents | Average/Median height | 76 | Legend/line-name claim, reused in tooltip. |
| 33 | Boys | stop growing | ~18 yrs (insight card) | 80 | Restates the boysGrowth timeline fact as a quick-glance stat. |
| 34 | Girls | stop growing | ~15-16 yrs (insight card) | 80 | Restates the girlsGrowth timeline fact as a quick-glance stat. |
| 35 | Average adult male height (US) | is | 172.2 cm / 5'8" | 78 | Quantified reference value, matches boysData's age-18 p50. |
| 36 | Average adult female height (US) | is | 160.1 cm / 5'3" | 78 | Quantified reference value, matches girlsData's age-18 p50. |
