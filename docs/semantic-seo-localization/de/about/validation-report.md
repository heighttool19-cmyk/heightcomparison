## Semantic Validation Report — about (de)

**Alignment score:** 100%
**Verdict:** PASS

### Preserved (20)
| Source # | Source Triple | Target # | Note |
|---|---|---|---|
| 1 | HeightComparison → renders at → true proportional scale | 1 | "stellt ... maßstabsgetreu dar" |
| 4 | HeightComparison → has feature → image upload accurate to 1–2 cm | 4 | figure preserved |
| 7 | celebrity database → covers → athletes/actors/musicians/public figures | 7 | list preserved |
| 10 | celebrity database → covers regions including → Bollywood/British/Asian/American entertainment | 10 | Bollywood entity preserved verbatim |
| 8 | fictional character library → pulls from → official production guides/licensed databooks | 8 | preserved |
| 2 | Height Predictor → uses → Khamis-Roche and Mid-Parental formulas | 2 | both protected entity names preserved verbatim |
| 14 | Khamis-Roche/Mid-Parental → are used in → clinical settings | 14 | preserved |
| 5 | Height Weight Percentile Calculator → compares against → WHO and CDC data | 5 | both protected entity names preserved verbatim |
| 6 | Ideal Body Weight Calculator → runs alongside → Devine/Robinson/Hamwi | 6 | all three preserved |
| 9 | Average Height by Country → covers → 46 countries | 9 | number preserved |
| 12 | Image to Height → estimates → height from a photo | 12 | preserved |
| 19 | Image to Height → includes → morning height variation guide | 19 | preserved |
| 13 | HeightComparison → has no → watermark on PNG export | 13 | PNG entity preserved verbatim |
| 3 | HeightComparison → does not require → account or payment | 3 | preserved |
| 18 | celebrity database → is not behind → a paywall | 18 | preserved |
| 11 | HeightComparison → normalizes conflicting data to → most recently verified figure from credible public source | 11 | preserved |
| 16 | character heights → come from → licensed official materials where possible | 16 | preserved |
| 17 | landmark/object dimensions → come from → architectural and scientific reference sources | 17 | preserved |
| 20 | HeightComparison content → is not → user-submitted | 20 | preserved |
| 15 | HeightComparison → allows comparison of → unlimited number of subjects at once | 15 | "unbegrenzte Anzahl" preserves "unlimited" |

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
