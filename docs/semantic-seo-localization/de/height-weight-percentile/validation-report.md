# Semantic Validation Report — height-weight-percentile (de)

**Alignment score:** 100%
**Verdict:** PASS

### Preserved (75)
All 75 source triples (see `triples-source.md`) have a matching target
triple in `triples-target.md` at the same row number, with equivalent
meaning. Registered entities (World Health Organization, Centers for
Disease Control and Prevention, WHO, CDC, NHANES, CDC Growth Charts, WHO
Child Growth Standards, WHO Growth Standards, CDC growth chart, National
Health and Nutrition Examination Survey (NHANES)) were kept verbatim in
every occurrence, matching `entities.json`'s `translate: false` entries —
consistent with the existing precedent in `messages/de.json` (e.g. line
564's bibliography entry keeps "World Health Organization" untranslated).

One intentional reordering: triple #34 (US adult male 50th-percentile
benchmark) states the metric figure before the imperial figure in German
("175 cm (5 Fuß 9 Zoll)") versus the source's imperial-first order ("5
feet 9 inches (175 cm)"). Both quantities are preserved unchanged; only
their presentation order was adapted for the target market's metric-first
convention. Not classified as Weakened since no number, quantity, date, or
entity was dropped.

| Source # | Source Triple | Target # | Note |
|---|---|---|---|
| 1-75 | (see triples-source.md) | 1-75 | 1:1 correspondence, each preserved — see triples-target.md for full German counterparts. |

### Weakened (0)
None.

### Missing (0)
None.

### Contradicted (0)
None.

### Introduced / Possible Hallucination (0)
None. No target triple adds a claim absent from the source.

## Notes on non-prose content
Per `triple-extraction.md`'s guidance to avoid extracting triples from
"redundant, vague, or purely grammatical relationships," UI microcopy
(unit abbreviations, single-word status labels, axis tick labels,
placeholder text, aria-labels, button text) carries no extractable
subject→predicate→object relationship and was excluded from both triple
tables. This microcopy was still translated in full — see
`draft-de.json` — and is covered by the separate mechanical Stage 5
completeness gate below, not by this semantic-validation stage.

## Stage 5 — Completeness Gate (mechanical)

Ran as: enumerate every leaf key path in
`messages/en.json`'s `heightWeightPercentile` namespace plus
`metadata.heightWeightPercentileTitle` /
`metadata.heightWeightPercentileDescription`, and diff against the same
paths in `draft-de.json`.

- EN leaf count: 294
- DE leaf count: 294
- Missing keys: 0
- Extra keys: 0
- Empty values: 0

**Gate result: PASS.** Diff is empty — proceeding to the Human Review
Gate with the merged candidate translation in `draft-de.json`.
