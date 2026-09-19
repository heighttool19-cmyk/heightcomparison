# SPO Triples — Source (EN) — ideal-body-weight-calculator

Scope: prose/content-bearing strings only. Pure UI microcopy (unit
abbreviations, button labels, placeholder text, aria-labels) carries no
extractable subject→predicate→object relationship and is intentionally
omitted, per `triple-extraction.md` ("avoid redundant, vague, or purely
grammatical relationships").

**Predicate normalization notes:** "applies"/"uses"/"draws on" all
normalized to `uses`. "produces"/"gives"/"delivers" normalized to
`produces`. "published"/"introduced"/"developed" normalized to
`published`.

| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 1 | Ideal Body Weight (IBW) | is | an estimate of the weight range associated with good health for a given height and sex | 95 | Core definition of the page's topic. |
| 2 | ideal body weight calculator | uses | Devine, Robinson, and Hamwi formulas | 92 | Central mechanism claim. |
| 3 | calculator | produces | a range rather than a single number | 85 | Key design decision, explains the tool's output shape. |
| 4 | tool | works for | men, women, and pediatric patients | 75 | Scope claim. |
| 5 | IBW formulas | share | same logic: base weight at 5 feet plus a fixed amount per inch above | 88 | Core formula mechanism, explains why formulas produce different outputs. |
| 6 | Ben J. Devine | published | Devine formula in 1974 | 90 | Historical/provenance fact, prominent entity. |
| 7 | Devine formula | is | most widely cited IBW formula in clinical practice | 82 | Significance claim. |
| 8 | Devine formula | uses | 2.3 kg per-inch increment, identical for men and women | 80 | Formula-specific detail with base weights differing by sex. |
| 9 | Robinson formula | published | in 1983 as a refinement of the Devine equation | 88 | Historical/provenance fact. |
| 10 | Robinson formula | uses | 52 kg male base + 1.9 kg per inch, 49 kg female base + 1.7 kg per inch | 85 | Formula-specific numeric detail. |
| 11 | Robinson formula | gives | lowest IBW of the three formulas for tall individuals | 75 | Comparative claim. |
| 12 | Hamwi formula | published | in 1964, the oldest of the three | 85 | Historical/provenance fact. |
| 13 | Hamwi formula | produces | largest IBW estimates for taller individuals | 78 | Comparative claim. |
| 14 | ideal weight calculator for women | uses | lower base weights than male formulas | 82 | Core sex-difference claim. |
| 15 | women | have | higher body fat proportion and lower bone density/muscle mass than men of same height | 78 | Biological rationale for sex-difference. |
| 16 | Devine formula | sets | female base at 45.5 kg vs 50 kg for men | 75 | Specific numeric comparison. |
| 17 | ideal body weight calculator for men | produces | higher estimates than female version at every height | 82 | Core sex-difference claim. |
| 18 | male bodies | have | greater average muscle mass and bone density | 75 | Biological rationale. |
| 19 | highly trained men | often sit | above their IBW while carrying low body fat | 78 | Important limitation/edge-case claim. |
| 20 | adult IBW formulas | do not apply to | children | 88 | Key scope-limitation claim. |
| 21 | ideal body weight calculator for pediatrics | uses | age- and height-based growth-chart references | 85 | Pediatric mechanism claim. |
| 22 | CDC growth charts and WHO Child Growth Standards | are | reference standards for pediatric growth assessment | 82 | Data-source claim. |
| 23 | child's IBW | is taken as | weight at the 50th percentile for their height on growth chart | 80 | Pediatric methodology claim. |
| 24 | calculator | switches to | growth-chart method automatically when age under 18 entered | 78 | UX behavior claim. |
| 25 | adjusted ideal body weight calculator | applies when | actual weight is more than 30% above IBW | 85 | Core clinical-threshold claim. |
| 26 | IBW alone for drug dosing | underestimates | metabolic activity above the 30% threshold | 78 | Clinical rationale. |
| 27 | Adjusted Body Weight formula | is | IBW + 0.4 × (Actual Weight − IBW) | 88 | Core formula fact. |
| 28 | 0.4 factor | reflects | estimated metabolically active proportion of excess weight | 75 | Formula rationale. |
| 29 | Adjusted Body Weight | is used in | aminoglycoside antibiotic dosing, chemotherapy calculations, renal dosing | 80 | Clinical application claim. |
| 30 | Percent IBW formula | is | (Actual Weight ÷ IBW) × 100 | 85 | Core formula fact. |
| 31 | percent IBW below 70% | is associated with | significant nutritional depletion | 82 | Clinical significance threshold. |
| 32 | percent IBW above 120% | is used as | threshold in obesity-related dosing decisions | 78 | Clinical significance threshold. |
| 33 | healthy weight range | sits around | IBW result, not a single point | 80 | Core interpretive framing. |
| 34 | spread between lowest and highest formula result | runs | 3 to 5 kg for most adults | 75 | Quantitative claim. |
| 35 | BMI | evaluates | weight category via weight(kg)/height(m)² | 85 | Core BMI definition. |
| 36 | Ideal Body Weight calculation | gives | an estimated weight to aim for, not a category label | 82 | Contrast with BMI. |
| 37 | neither BMI nor IBW | accounts for | how weight is distributed between muscle, fat, and bone | 80 | Shared limitation claim. |
| 38 | good ideal body weight | is | a range, not a single correct number | 82 | FAQ core answer. |
| 39 | ideal body weight formulas | do not distinguish between | muscle mass and body fat | 82 | FAQ core limitation claim. |
| 40 | Robinson | developed | slightly leaner model for taller individuals | 72 | FAQ comparative claim. |
| 41 | Hamwi | is | more traditional formula used in nutrition counseling | 70 | FAQ comparative claim. |
| 42 | IBW | is often more intuitive than BMI for individuals | but cannot account for body composition | 75 | FAQ comparative claim. |
| 43 | healthy weight (WHO) | is defined as | BMI between 18.5 and 25 kg/m² | 88 | Core WHO-sourced definition. |
| 44 | healthy BMI window | translates to | roughly 14–16 kg around median IBW estimate | 78 | Quantitative claim. |
| 45 | four formulas (Devine, Hamwi, Robinson, Miller) | were developed to | standardise drug dosages in clinical settings | 85 | Core provenance/purpose claim. |
| 46 | formulas | do not account for | muscle mass, bone density, or frame size | 80 | Shared limitation claim. |
