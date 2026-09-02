# Semantic Validation

## Purpose
Compare the source triple set against the target (translated) triple set to catch meaning loss, contradiction, or hallucination before a translation reaches the human review gate.

## Inputs
- `docs/semantic-seo-localization/<locale>/<page-id>/triples-source.md`
- `docs/semantic-seo-localization/<locale>/<page-id>/triples-target.md`

## Steps
1. Read both triple tables.
2. For each source triple, find its counterpart in the target set — match by meaning in the target language, not by string comparison.
3. Classify each source triple as one of:
   - **Preserved** — target has an equivalent triple with the same meaning.
   - **Weakened** — target has a related triple but it lost specificity, strength, or an attribute (e.g. a dropped number or qualifier).
   - **Missing** — no target counterpart found at all.
   - **Contradicted** — target expresses something that conflicts with the source triple.
4. For each target triple with no source counterpart, classify as:
   - **Introduced** — flag as a possible hallucination (translation added meaning not in the source).
5. Compute an alignment score: `preserved_count / total_source_triples * 100`, rounded to the nearest integer.
6. Write the validation report using the format below.
7. Save to `docs/semantic-seo-localization/<locale>/<page-id>/validation-report.md`.
8. **Verdict rule:** FAIL if the alignment score is below 90%, OR any triple with Prominence Score >= 70 is Missing or Contradicted, OR any triple with Prominence Score >= 70 is Weakened in a way that drops a number, quantity, date, or named entity, OR any Introduced triple materially changes a claim (not just stylistic elaboration). Otherwise PASS. On FAIL, the orchestrator must stop and report the specific issue instead of proceeding to the human review gate.

## Output Format
```markdown
## Semantic Validation Report — <page-id> (<locale>)

**Alignment score:** NN%
**Verdict:** PASS | FAIL

### Preserved (N)
| Source # | Source Triple | Target # | Note |

### Weakened (N)
| Source Triple | Target Triple | What was lost |
Note whether the dropped detail is a number, quantity, date, or named entity — this determines whether a Prominence Score >= 70 triple here triggers a FAIL.

### Missing (N)
| Source Triple | Prominence Score |

### Contradicted (N)
| Source Triple | Target Triple | Conflict |

### Introduced / Possible Hallucination (N)
| Target Triple |
```

## Common Mistakes
- Matching triples by exact string instead of by meaning — a correctly translated triple will not read identically in the target language.
- Letting content through even when a high-prominence triple went missing (or was weakened by dropping a number/date/entity), just because the overall percentage looks acceptable.
- Flagging every natural rephrasing as "Weakened" — only flag actual loss of specificity or meaning.
