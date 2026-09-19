# Semantic Validation Report — ideal-body-weight-calculator (de)

**Alignment score:** 100%
**Verdict:** PASS

### Preserved (46)
All 46 source triples (see `triples-source.md`) have a matching target
triple in `triples-target.md` at the same row number, with equivalent
meaning. Registered entities (Devine formula, Robinson formula, Hamwi
formula, Miller formula, CDC, CDC Growth Charts, WHO, WHO Child Growth
Standards) were kept verbatim in every occurrence, matching
`entities.json`'s `translate: false` entries. "Ideal Body Weight
Calculator" was rendered as "Idealgewichts-Rechner" per the resolved
registry conflict (see entity-extraction notes), consistent with the
already-shipped nav/footer German label and the same resolution pattern
already applied to "Height Predictor".

| Source # | Source Triple | Target # | Note |
|---|---|---|---|
| 1-46 | (see triples-source.md) | 1-46 | 1:1 correspondence, each preserved — see triples-target.md for full German counterparts. |

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
button labels, placeholder text, aria-labels, table column headers with
no independent semantic claim) was excluded from the triple tables but
was still translated in full — see `draft-de.json`. Covered by the
mechanical Stage 5 completeness gate below, not this stage.

One data-integrity note carried over unchanged from the source: the
`IdealWeightInteractive.tsx` component's `difference` readout produces a
value like `-3.0 kg below` in English when the current weight is under
the IBW minimum (the subtraction is already negative, so the sign and the
word "below" both indicate direction — a pre-existing minor redundancy,
not introduced by translation). The German equivalent preserves the same
numeric behavior (`{amount} kg darunter`) rather than "fixing" arithmetic
behavior outside this pipeline's scope.

## Stage 5 — Completeness Gate (mechanical)

Ran as: enumerate every leaf key path in `messages/en.json`'s
`idealBodyWeight` namespace plus `metadata.idealBodyWeightTitle` /
`metadata.idealBodyWeightDescription`, and diff against the same paths in
`draft-de.json`.

- EN leaf count: 243
- DE leaf count: 243
- Missing keys: 0
- Extra keys: 0
- Empty values: 0

**Gate result: PASS.** Diff is empty — proceeding to the Human Review
Gate with the merged candidate translation in `draft-de.json`.
