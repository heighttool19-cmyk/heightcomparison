## Semantic Validation Report — about (de)

**Alignment score:** 100%
**Verdict:** PASS

### Preserved (20)
| Source # | Source Triple | Target # | Note |
|---|---|---|---|
| 1 | HeightComparison → renders at → true proportional scale | 1 | "stellt ... maßstabsgetreu dar" |
| 2 | HeightComparison → has feature → image upload accurate to 1–2 cm | 2 | figure preserved |
| 3 | celebrity database → covers → athletes/actors/musicians/public figures | 3 | list preserved |
| 4 | celebrity database → covers regions including → Bollywood/British/Asian/American entertainment | 4 | Bollywood entity preserved verbatim |
| 5 | fictional character library → pulls from → official production guides/licensed databooks | 5 | preserved |
| 6 | Height Predictor → uses → Khamis-Roche and Mid-Parental formulas | 6 | both protected entity names preserved verbatim |
| 7 | Khamis-Roche/Mid-Parental → are used in → clinical settings | 7 | preserved |
| 8 | Height Weight Percentile Calculator → compares against → WHO and CDC data | 8 | both protected entity names preserved verbatim |
| 9 | Ideal Body Weight Calculator → runs alongside → Devine/Robinson/Hamwi | 9 | all three preserved |
| 10 | Average Height by Country → covers → 46 countries | 10 | number preserved |
| 11 | Image to Height → estimates → height from a photo | 11 | preserved |
| 12 | Image to Height → includes → morning height variation guide | 12 | preserved |
| 13 | HeightComparison → has no → watermark on PNG export | 13 | PNG entity preserved verbatim |
| 14 | HeightComparison → does not require → account or payment | 14 | preserved |
| 15 | celebrity database → is not behind → a paywall | 15 | preserved |
| 16 | HeightComparison → normalizes conflicting data to → most recently verified figure from credible public source | 16 | preserved |
| 17 | character heights → come from → licensed official materials where possible | 17 | preserved |
| 18 | landmark/object dimensions → come from → architectural and scientific reference sources | 18 | preserved |
| 19 | HeightComparison content → is not → user-submitted | 19 | preserved |
| 20 | HeightComparison → allows comparison of → unlimited number of subjects at once | 20 | "unbegrenzte Anzahl" preserves "unlimited" |

### Weakened (0)
None.

### Missing (0)
None.

### Contradicted (0)
None.

### Introduced / Possible Hallucination (0)
None — the German draft adds no claims, numbers, or entities absent from the source. All entity names marked `translate: false` in `entities.json` (HeightComparison, the six calculator product names, Khamis-Roche formula, Mid-Parental method, Devine/Robinson/Hamwi formulas, WHO, CDC, Bollywood, DC, PNG) appear in the target draft verbatim.

### Verdict Rationale
Alignment score is 100% (20/20 preserved), well above the 90% FAIL threshold. No triple with Prominence Score ≥ 70 is Missing or Contradicted (all 20 are Preserved). No Introduced triples. Per semantic-validation.md's verdict rule, this is a clean **PASS** — the pipeline proceeds to the Human Review Gate.
