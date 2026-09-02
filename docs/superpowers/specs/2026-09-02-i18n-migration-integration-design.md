# Batched, Loss-Guaranteed Translation Pipeline — Integration Design

Date: 2026-09-02
Status: Approved (pending user spec review)

## Purpose

Integrate `semantic-seo-localization` into `nextjs-i18n-migration` so that
adding a new locale to this project is a single, production-grade,
start-to-end workflow: mechanical routing/layout (already handled by
`nextjs-i18n-migration`) plus meaning-preserving, SEO-aware, entity-safe
translation (`semantic-seo-localization`) — with an explicit guarantee
against two failure modes:

1. **Content loss from technical limits.** A large page's translation
   output can exceed a single response's token budget and silently
   truncate. Nothing before this design catches that mechanically.
2. **UI loss.** Translation must never touch JSX structure, Tailwind
   classes, or component layout — only JSON string values.

UI loss is already prevented by construction in `nextjs-i18n-migration`
(the `.tsx` file is never touched by the translation step — only
`messages/<locale>.json` is). This design keeps that boundary intact and
states it explicitly in both skills, and adds new machinery to close the
content-loss gap: fixed-size batching for the translation stage, plus a
mechanical (non-LLM-judgment) completeness gate.

## Why only the translation stage needs batching

Of the six existing pipeline stages, only three produce output whose
length scales with page size:
- **Contextual translation** — output is the whole translated page.
- **Triple extraction (target pass)** — extracted from the translation, so
  scales with it.
- **Semantic validation** — compares the two triple sets, so also scales.

Entity extraction and target-market SEO adaptation produce roughly
constant-size output (an entity list, a metadata block) regardless of page
size, and both need whole-page context to be internally consistent (an
entity's classification shouldn't depend on which half of the page it was
seen in). They stay whole-page, run-once stages. Everything downstream of
translation is naturally sized to whatever batch produced it, so batching
the translation loop batches those stages too, for free.

## Pipeline (revised, 7 stages)

```
1. Entity extraction & registry sync     — whole page, once
2. Target-market SEO adaptation          — whole page, once
3. Batch planning                        — NEW, whole page, once
4. Per-batch loop (repeats per batch):
   4a. Triple extraction (source pass)   — batch-scoped
   4b. Contextual translation            — batch-scoped
   4c. Triple extraction (target pass)   — batch-scoped
   4d. Semantic validation               — batch-scoped
5. Completeness gate                     — NEW, mechanical, whole page
6. Human review gate                     — whole page (merged result)
```

Stages 1 and 2 are unchanged from the current skill. Stages 4a/4c/4d reuse
the existing `triple-extraction.md` and `semantic-validation.md`
instructions unmodified in logic — only their framing changes (operate on
"this batch's content" instead of "the content"). Stage 4b
(`contextual-translation.md`) gains one new rule: carry forward a short
"established phrasing" note from earlier batches in the same run.

## Stage 3: Batch Planning (new)

Input: the full source content for the page (from
`nextjs-i18n-migration`'s Step 2 extraction into `messages/en.json`).

Rule: split the page's leaf string values into batches of **approximately
8-10 leaf keys each**, but grouped by logical section — a `*Title` key
always stays in the same batch as its paired `*Paragraphs` array; an array
of paragraphs is never split mid-array across two batches. Batch size is a
target, not a hard ceiling: a logically coherent section that runs to 12-14
keys stays together rather than being cut mid-thought. This is a judgment
call, not a mechanical count — coherence beats strict batch size.

Batches are processed in the page's original document order, sequentially
(not in parallel — each batch's translation may reference the "established
phrasing" of earlier batches).

## Stage 4b addition: established phrasing carry-forward

Each batch's `contextual-translation.md` invocation, beyond its existing
inputs (entity registry, SEO adaptation), also receives a short list of
notable phrasing choices made in earlier batches of the same page run
(non-entity recurring terms — entities are already handled by the
registry). This is informal continuity, not a new artifact file: the
orchestrator carries it in its own working context across the batch loop
for a single page run, and it is discarded once the page's batches are
all translated (it does not persist across pages or across runs — that is
what the entity registry is for).

## Stage 5: Completeness Gate (new, mechanical)

After all batches for a page are translated, merge them back into one
candidate namespace and verify completeness **mechanically, not by LLM
self-assessment**:

1. Recursively list every leaf key path present in the source namespace
   (from `messages/en.json`).
2. Recursively list every leaf key path present in the merged candidate
   translation.
3. Diff the two sets. Required: the sets are identical, and every leaf
   value in the candidate is non-empty.
4. Any missing key, any extra key, or any empty value **blocks** the
   pipeline — report exactly which key path(s) are affected and which
   batch was responsible, and stop before the human review gate. This is
   a plain set-membership check, deliberately not routed through LLM
   judgment, so it cannot be rationalized past.

This gate is the direct answer to "handle token/technical limits and
guarantee no content loss": batching keeps each individual call small
enough to avoid truncation, and this gate mechanically proves nothing was
dropped even if a single batch call is silently short.

## UI-loss guarantee (restated, not new)

Both `SKILL.md` (semantic-seo-localization) and `nextjs-i18n-migration`'s
`SKILL.md` will state explicitly: this pipeline reads and writes only
`messages/<locale>.json` string values. It never reads, generates, or
modifies a `.tsx` file's JSX, `className`, icon usage, or component
structure. `nextjs-i18n-migration` owns 100% of the `.tsx`/layout/routing
work (its existing Steps 1, 4, 5, 6, 7 are unchanged by this design).
Because the translation pipeline structurally cannot touch those files,
"0% UI loss" holds by construction, not by post-hoc inspection.

## Integration edit to `nextjs-i18n-migration`

Only `SKILL.md`'s Step 3 ("Create Target Locale Dictionary") changes.
Current body (raw translation instructions) is replaced with a pointer:

> Invoke `semantic-seo-localization` with the namespace produced by Step 2
> as input, and the target locale. Do not hand-translate. The skill
> produces `messages/<locale>.json` content only after its own internal
> human review gate passes; do not proceed to Step 4 until that skill
> reports the merged, completeness-gated translation as approved.

Step 2 (content extraction into `messages/en.json`, verbatim, UI
untouched) is unchanged — it is the source of truth this design's
Completeness Gate diffs against. Steps 1, 4, 5, 6, 7 are unchanged.

## Files touched

- New: `.agents/skills/semantic-seo-localization/references/batching-and-completeness.md`
  (Stage 3 batch planning + Stage 5 completeness gate instructions)
- Edit: `.agents/skills/semantic-seo-localization/SKILL.md`
  (renumber pipeline to 7 stages, add Artifact Paths for any new batch-scoped
  files if needed, restate UI-loss boundary)
- Edit: `.agents/skills/semantic-seo-localization/references/contextual-translation.md`
  (add established-phrasing carry-forward rule; reframe "content" as "this batch's content")
- Edit: `.agents/skills/semantic-seo-localization/references/triple-extraction.md`
  (reframe as batch-scoped where it says "the content")
- Edit: `.agents/skills/semantic-seo-localization/references/semantic-validation.md`
  (reframe as batch-scoped; note the whole-page completeness check is a
  separate, later, mechanical gate — not this stage's job)
- Edit: `.agents/skills/nextjs-i18n-migration/SKILL.md`
  (Step 3 body only, as above)

## Artifact paths (addition)

No new persistent artifact files are required beyond what
`semantic-seo-localization` already produces per page
(`entities.json`, `triples-source.md`, `seo-adaptation.md`,
`triples-target.md`, `validation-report.md`) — these already exist at
whole-page granularity, which is correct: a page's `triples-source.md`
naturally accumulates all batches' triples as the loop proceeds (each
batch's stage 4a/4c output is appended to the same file, not a new file
per batch). The Completeness Gate's key-diff result is reported inline in
the pipeline's output to the user, not persisted as a separate file — it's
a pass/fail gate, not an audit artifact with lasting value once the page
is approved.

## Error handling / validation

- A batch that fails its own `semantic-validation.md` verdict (FAIL) stops
  the per-batch loop immediately for that batch — the same rule as today,
  now scoped to one batch instead of the whole page. Earlier batches that
  already passed are not discarded; the report to the user identifies
  exactly which batch/keys need attention.
- The Completeness Gate is a hard stop, not a warning — per the project's
  "100% best result, no loss" requirement, there is no partial-approval
  path where a page with missing keys reaches the human review gate.

## Testing / verification

Same approach as the original skill build: dry-run against a real,
sufficiently large page (a candidate: `/height-weight-percentile-calculator`
or another calculator page with many keys, to actually exercise batching
with more than one batch) and manually confirm: multiple batches were
actually used (not silently collapsed to one), the completeness gate's
key-diff is empty, and the merged translation reads as coherent single-page
German (no batch-boundary phrasing whiplash).

## Out of scope

- No change to how entity extraction or target-market SEO adaptation work
  (they remain whole-page, unbatched).
- No cross-page terminology-consistency mechanism beyond the existing
  entity registry (a non-entity phrase used differently on two different
  *pages* is not this design's problem — only within-page, cross-batch
  consistency is addressed here, via the established-phrasing carry-forward).
- No parallelization of batch processing (sequential only, for phrasing
  continuity).
- No automated regression test suite (this remains a markdown/LLM-reasoning
  skill, verified by dry run as before).
