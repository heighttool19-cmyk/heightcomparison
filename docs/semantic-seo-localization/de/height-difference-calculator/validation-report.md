# Semantic Validation Report — height-difference-calculator (de)

**Alignment score:** 100%
**Verdict:** PASS

### Preserved (27)
All 27 source triples (see `triples-source.md`) have a matching target
triple in `triples-target.md` at the same row number, with equivalent
meaning. The registered entity "Height Difference Calculator" was
rendered as "Höhendifferenz-Rechner" per the resolved registry conflict
(see entity-extraction notes), consistent with the already-shipped
nav/footer German label and the same resolution pattern already applied
to "Height Predictor" and "Ideal Body Weight Calculator".

One phrasing note: the source's "male-female couples" was translated
literally as "Mann-Frau-Paare" rather than the conceptually adjacent but
not identical English term "heterosexual couples" — preserves the
source's descriptive framing without introducing a sociological term the
source didn't use.

| Source # | Source Triple | Target # | Note |
|---|---|---|---|
| 1-27 | (see triples-source.md) | 1-27 | 1:1 correspondence, each preserved — see triples-target.md for full German counterparts. |

### Weakened (0)
None.

### Missing (0)
None.

### Contradicted (0)
None.

### Introduced / Possible Hallucination (0)
None. No target triple adds a claim absent from the source.

## Notes on non-prose content
Per `triple-extraction.md`'s guidance, UI microcopy (unit abbreviations,
button labels, placeholder text, table column headers with no
independent semantic claim, and purely numeric example/table-row data
such as "180 cm", "5 to 6 in") was excluded from the triple tables but
was still translated (where linguistic content existed) in full — see
`draft-de.json`. Purely numeric+universal-unit-abbreviation content
(e.g. table rows in the "Height Difference in Different Units" section
and the `HeightDifferenceChart.tsx` reference data) was left as literal
numeric/unit text in the component, matching this project's established
convention that units like "cm"/"ft"/"in" are not linguistically
translated. Covered by the mechanical Stage 5 completeness gate below for
all keys that were extracted into `messages/*.json`.

One structural fix applied during TSX wiring, not translation: the
`CalculateHeightDifference.tsx` component's `HeightInput` sub-component
reused its (translatable) `label` prop both as display text and as an
`id`/`htmlFor` attribute prefix (e.g. `${label}-cm`). Left as-is, this
would have silently changed input element IDs (and their `aria-label`
associations) when the label text changed language. Decoupled into a
separate stable `idPrefix` prop so translation cannot affect DOM
attribute wiring.

## Stage 5 — Completeness Gate (mechanical)

Ran as: enumerate every leaf key path in `messages/en.json`'s
`heightDifference` namespace plus `metadata.heightDifferenceTitle` /
`metadata.heightDifferenceDescription`, and diff against the same paths
in `draft-de.json`.

- EN leaf count: 121
- DE leaf count: 121
- Missing keys: 0
- Extra keys: 0
- Empty values: 0

**Gate result: PASS.** Diff is empty — proceeding to the Human Review
Gate with the merged candidate translation in `draft-de.json`.
