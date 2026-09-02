# Semantic Validation

## Purpose
Compare one batch's source triple set against its target (translated) triple set to catch meaning loss, contradiction, or hallucination before that batch is considered done. Runs once per batch, as part of the per-batch loop (Stage 4d in `SKILL.md`, per `batching-and-completeness.md`). This stage catches per-batch meaning loss; it does NOT check whether every key from the source page made it into some batch's output at all — that whole-page completeness check is a separate, later, mechanical stage (Stage 5, `batching-and-completeness.md`), not this file's job.

## Inputs
- `docs/semantic-seo-localization/<locale>/<page-id>/triples-source.md` (this batch's newly-appended rows)
- `docs/semantic-seo-localization/<locale>/<page-id>/triples-target.md` (this batch's newly-appended rows)

## Steps
1. Read both triple tables, scoped to this batch's rows (the rows just appended by this batch's Stage 4a/4c extraction — not the whole accumulated file, unless this is the first batch of the page).
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
8. **Verdict rule (per batch):** FAIL if this batch's alignment score is below 90%, OR any triple with Prominence Score >= 70 is Missing or Contradicted, OR any triple with Prominence Score >= 70 is Weakened in a way that drops a number, quantity, date, or named entity, OR any Introduced triple materially changes a claim (not just stylistic elaboration). Otherwise PASS. On FAIL, stop the per-batch loop for this page and report the specific batch and issue instead of continuing to later batches or proceeding to the human review gate.

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
- Confusing this stage's per-batch meaning-loss check with the separate, whole-page completeness gate (Stage 5 of `batching-and-completeness.md`) — a batch can pass this stage's validation perfectly while a completely different batch is still missing entirely; that's what Stage 5 catches, not this file.
