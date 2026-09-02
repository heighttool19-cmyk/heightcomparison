# Batched Translation Pipeline & nextjs-i18n-migration Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add always-on batching and a mechanical completeness gate to `semantic-seo-localization` so large pages can never lose content to output-token truncation, restate the existing UI-loss guarantee explicitly, and wire `nextjs-i18n-migration`'s Step 3 to invoke the skill instead of hand-translating.

**Architecture:** One new reference file (`batching-and-completeness.md`) adds two new pipeline stages (batch planning, completeness gate) around the existing four per-page stages, three of which (triple extraction, contextual translation, semantic validation) become batch-scoped instead of whole-page-scoped. `SKILL.md` is renumbered to describe the new 7-stage flow. `target-market-seo.md` loses its dependency on `triples-source.md` (which is now batch-scoped and doesn't exist yet when target-market SEO runs) so it can stay a whole-page, run-once stage. `nextjs-i18n-migration`'s Step 3 becomes a thin pointer to the skill.

**Tech Stack:** Markdown-only (no application code). Verification is a dry run against a real, sufficiently large project namespace (`privacy`, 51 leaf keys — large enough to exercise multiple batches) plus targeted subagent application-scenario tests for the new batching/completeness logic.

## Global Constraints

- Every edit must preserve the existing skill's portability (no hardcoded locale/domain) — carried over from the original design spec.
- Batching always runs, regardless of page size — no size-threshold judgment call (per `docs/superpowers/specs/2026-09-02-i18n-migration-integration-design.md`).
- The completeness gate is a mechanical key-path diff, never an LLM "looks complete" self-assessment.
- Translation pipeline must never read, generate, or modify a `.tsx` file — only `messages/<locale>.json` string values. This must be stated explicitly in `SKILL.md`.
- `nextjs-i18n-migration`'s Steps 1, 4, 5, 6, 7 are unchanged — only Step 3's body changes.
- Batches process sequentially, never in parallel (later batches depend on earlier batches' established phrasing).
- A batch that fails Stage 4d validation stops the per-batch loop for that page; earlier passed batches are not discarded.
- `triples-source.md`, `triples-target.md`, and `validation-report.md` accumulate across all of a page's batches in one file each (appended, continuously numbered), not one file per batch.

---

### Task 1: Create `references/batching-and-completeness.md`

**Files:**
- Create: `.agents/skills/semantic-seo-localization/references/batching-and-completeness.md`

**Interfaces:**
- Consumes: nothing from other reference files directly, but its Stage 3 output (the batch plan) is consumed by Stage 4's per-batch loop (Tasks 3-5), and its Stage 5 completeness check consumes the merged output of Stage 4b across all batches.
- Produces: the batch-plan concept (batch number → key paths, in-memory only, not a file) and the completeness-gate procedure that later tasks' edits reference by name ("per batching-and-completeness.md").

- [ ] **Step 1: Write the reference file**

```markdown
# Batch Planning & Completeness Gate

## Purpose
Two new pipeline stages that guarantee no content is lost to output-token or other technical limits when translating a page of any size: Stage 3 (Batch Planning) keeps every translation call small enough to never risk truncation, and Stage 5 (Completeness Gate) mechanically proves nothing was dropped afterward.

## Stage 3: Batch Planning

Runs once per page, after entity extraction (Stage 1) and target-market SEO adaptation (Stage 2), before the per-batch loop (Stage 4).

### Steps
1. Read the full source content for the page (from `messages/en.json`'s namespace for this page-id).
2. List every leaf string key path in document order (e.g. `about.heroQuote`, `about.whatItDoesTitle`, `about.whatItDoesParagraphs[0]`, `about.whatItDoesParagraphs[1]`, ...). Arrays of strings count each element as its own leaf.
3. Group leaf keys into batches of **approximately 8-10 leaf keys**, in document order, subject to one hard rule: **never split a `*Title`/`*Paragraphs` (or equivalent titled-section) pair across two batches, and never split a single array across two batches.** If a coherent section runs to 12-14 keys, keep it whole rather than cutting it — batch size is a target, not a ceiling.
4. Number the batches 1..N in document order. Record the plan (batch number → list of key paths) as working context for the rest of this page's run — this is not a persisted artifact file.
5. Batches are processed **sequentially**, not in parallel, so each batch's translation (Stage 4b) can draw on the established phrasing of earlier batches in the same run.

### Common Mistakes
- Splitting a paragraph array mid-way to hit a target batch size — coherence beats strict batch size.
- Processing batches out of document order — later batches rely on earlier ones' phrasing choices being available.
- Treating batch planning as a per-run judgment call on whether to batch at all — batching always happens, regardless of page size, so a one-key page still goes through this stage (producing a single batch of one).

## Stage 4 (per-batch loop): what changes

Stages 4a (triple extraction, source pass), 4b (contextual translation), 4c (triple extraction, target pass), and 4d (semantic validation) run once per batch, using the SAME reference files as before (`triple-extraction.md`, `contextual-translation.md`, `semantic-validation.md`) — only the scope of "content" changes, from "the whole page" to "this batch's key paths."

Each batch's `triples-source.md` and `triples-target.md` output is **appended** to the same per-page file (not written to a new file per batch) — so by the end of the loop, `docs/semantic-seo-localization/<locale>/<page-id>/triples-source.md` contains every batch's triples, numbered continuously across the whole file (batch 2's triples continue the `#` numbering where batch 1 left off, not restart at 1).

Each batch's `contextual-translation.md` invocation additionally receives: a short list of notable phrasing choices from earlier batches in this page's run (recurring non-entity terms — entities are already handled by the shared registry). This is carried in the orchestrator's own working context for the duration of this page's batch loop and discarded once the page is done; it is not a persisted file and does not carry over to other pages.

If any batch's Stage 4d validation returns FAIL, stop the per-batch loop immediately and report which batch and which specific triples failed — do not continue to later batches with an unresolved failure in an earlier one. Batches that already passed are not discarded; the report names exactly what needs fixing.

## Stage 5: Completeness Gate

Runs once per page, after all batches have passed Stage 4d, before the Human Review Gate.

This is a **mechanical set comparison, not an LLM judgment call.**

### Steps
1. Recursively list every leaf key path in the source namespace (`messages/en.json`, this page-id's namespace) — same enumeration method as Stage 3 Step 2.
2. Recursively list every leaf key path in the merged candidate translation (all batches' Stage 4b output, combined in document order).
3. Diff the two sets:
   - **Missing keys:** present in source, absent from candidate.
   - **Extra keys:** present in candidate, absent from source.
   - **Empty values:** present in both, but the candidate's value is empty or whitespace-only.
4. If the diff is not empty (any Missing, Extra, or Empty-value key), **stop** — do not proceed to the Human Review Gate. Report the exact key paths affected and which batch (from the Stage 3 plan) was responsible for each.
5. If the diff is empty, proceed to the Human Review Gate with the merged candidate translation.

### Common Mistakes
- Treating a "looks complete to me" read-through as sufficient — this must be an explicit enumerate-and-diff of key paths, not a skim.
- Skipping the gate for small pages ("it's only 3 keys, I'll just check by eye") — the gate always runs, regardless of page or batch count, so a single-batch page still gets diffed.
- Reporting "some keys may be missing" instead of the exact key paths — the gate's value is in being specific enough to route the fix to the right batch.
```

- [ ] **Step 2: Verify with an application-scenario subagent test**

Dispatch a general-purpose subagent with this exact prompt:

```
Read the file at ".agents/skills/semantic-seo-localization/references/batching-and-completeness.md"
and apply its Stage 3 (Batch Planning) instructions to this source content
(a fictional page namespace "widgets" with 22 leaf keys):

widgets.heroTitle: "Welcome to Widgets"
widgets.heroSubtitle: "The best widgets on Earth"
widgets.introParagraphs[0]: "Widgets have been trusted since 1990."
widgets.introParagraphs[1]: "We ship worldwide."
widgets.introParagraphs[2]: "Every widget is hand-tested."
widgets.featuresTitle: "Features"
widgets.featuresParagraphs[0]: "Durable construction."
widgets.featuresParagraphs[1]: "Lightweight design."
widgets.pricingTitle: "Pricing"
widgets.pricingParagraphs[0]: "Starting at $9.99."
widgets.pricingParagraphs[1]: "Bulk discounts available."
widgets.pricingParagraphs[2]: "No hidden fees."
widgets.faqTitle: "FAQ"
widgets.faqQuestions[0]: "How long does shipping take?"
widgets.faqQuestions[1]: "Do you offer refunds?"
widgets.faqQuestions[2]: "Is there a warranty?"
widgets.footerNote: "Thanks for visiting."
widgets.ctaButton: "Buy Now"
widgets.newsletterTitle: "Stay Updated"
widgets.newsletterParagraphs[0]: "Get news about new widgets."
widgets.newsletterParagraphs[1]: "Unsubscribe anytime."
widgets.contactEmail: "hello@widgets.example"

Produce the batch plan (batch number -> list of key paths) exactly as
Stage 3 describes. Do not write any files — just show the plan.
```

Verify the subagent's output:
- Produces more than one batch (22 leaf keys at ~8-10 per batch should yield 2-3 batches).
- No `*Title`/`*Paragraphs` pair is split across two batches (e.g. `widgets.introParagraphs[0]`, `[1]`, `[2]` all in the same batch as each other, and ideally with `widgets.heroTitle`/`heroSubtitle` context nearby per document order — the hard rule to check is that no titled-section's paragraph array is split mid-array).
- No single array (e.g. `widgets.faqQuestions`) is split across two batches.
- Batches are numbered in document order (batch 1 contains earlier keys than batch 2).

If any check fails, revise `batching-and-completeness.md` to close the gap, then re-run the verification subagent until it passes.

- [ ] **Step 3: Commit**

```bash
git add ".agents/skills/semantic-seo-localization/references/batching-and-completeness.md"
git commit -m "feat(skills): add batching and completeness gate reference for semantic-seo-localization"
```

---

### Task 2: Fix `target-market-seo.md`'s dependency on triple extraction

**Files:**
- Modify: `.agents/skills/semantic-seo-localization/references/target-market-seo.md`

**Interfaces:**
- Consumes: nothing new.
- Produces: no interface change — `seo-adaptation.md`'s Output Format is unchanged, only the stage's *inputs* change (it no longer needs `triples-source.md` to exist first).

**Why this task exists:** the current file's Purpose and Step 1 say this stage "runs after triple extraction" and reads `triples-source.md`. With batching, triple extraction becomes batch-scoped (Stage 4a) and doesn't exist yet when target-market SEO (Stage 2, whole-page) runs. This is a real dependency conflict the design spec missed — fixing it here, before Task 3's SKILL.md renumbering makes the conflict visible.

- [ ] **Step 1: Edit the Purpose section**

In `.agents/skills/semantic-seo-localization/references/target-market-seo.md`, replace:

```markdown
## Purpose
Adapt SEO metadata (title, description, slug, keyword targets) for what users in the target market/locale actually search for — not a literal translation of the English keyword set. Runs after triple extraction (so the content's core relationships are known) and before translation (so the translator can use the adapted terms).
```

with:

```markdown
## Purpose
Adapt SEO metadata (title, description, slug, keyword targets) for what users in the target market/locale actually search for — not a literal translation of the English keyword set. Runs once per page, directly after entity extraction and before batch planning/translation. This stage reads the source content directly and does not depend on triple extraction having run yet — triple extraction is batch-scoped (per `batching-and-completeness.md`) and runs later, per batch.
```

- [ ] **Step 2: Edit Step 1 of the Steps list**

Replace:

```markdown
1. From the source content and its `triples-source.md` output, list the primary topic, secondary topics, and the concrete SEO-relevant terms (keywords, entities, product/feature names) the English version targets.
```

with:

```markdown
1. From the source content directly (read the full page namespace — this stage runs before batch planning and before any triples exist), list the primary topic, secondary topics, and the concrete SEO-relevant terms (keywords, entities, product/feature names) the English version targets.
```

- [ ] **Step 3: Verify with an application-scenario subagent test**

Dispatch a general-purpose subagent with this exact prompt:

```
Read the file at ".agents/skills/semantic-seo-localization/references/target-market-seo.md"
and follow its instructions for this scenario:

Source page namespace: a page about a "Widget Comparison Tool" that lets
users compare widget specifications side by side (widgets.heroTitle:
"Widget Comparison Tool", widgets.heroSubtitle: "Compare specs
instantly"). No triples-source.md file exists yet for this page. Target
locale: German (de).

Produce the output exactly in the format specified in the Output Format
section. Do not write any files. Explicitly confirm in your response
whether you needed a triples-source.md file to complete this task.
```

Verify the subagent's output:
- Completes the task without requesting or requiring a `triples-source.md` file.
- Produces both required sections (`## Localized Metadata`, `## Target Keywords`).
- Output is in German.

If any check fails, revise the file to close the gap, then re-run until it passes.

- [ ] **Step 4: Commit**

```bash
git add ".agents/skills/semantic-seo-localization/references/target-market-seo.md"
git commit -m "fix(skills): remove target-market-seo's dependency on triple extraction so it can run before batching"
```

---

### Task 3: Renumber `SKILL.md`'s pipeline and restate the UI-loss guarantee

**Files:**
- Modify: `.agents/skills/semantic-seo-localization/SKILL.md`

**Interfaces:**
- Consumes: the stage names/order established in Tasks 1-2.
- Produces: the canonical 7-stage pipeline description that a human or agent reads first — later tasks (4-6) must use identical stage numbering/names when they reference "Stage 4a" etc.

- [ ] **Step 1: Replace the Overview section**

Replace:

```markdown
## Overview

Raw translation preserves words, not necessarily meaning, entity identity, or
search intent. This skill runs source content through six stages — entity
extraction, source triple extraction, target-market SEO adaptation,
contextual translation, target triple extraction, and semantic validation —
before any translated text is treated as final. It borrows its methodology
from a semantic-SEO localization pipeline, adapted here into LLM-reasoning
steps with file-based artifacts (no database, no backend).
```

with:

```markdown
## Overview

Raw translation preserves words, not necessarily meaning, entity identity,
search intent, or completeness. This skill runs source content through
seven stages — entity extraction, target-market SEO adaptation, batch
planning, a per-batch loop (source triple extraction, contextual
translation, target triple extraction, semantic validation), and a
mechanical completeness gate — before any translated text is treated as
final. Batching keeps every translation call small enough to avoid
output-token truncation on large pages; the completeness gate then proves
mechanically that nothing was dropped. It borrows its methodology from a
semantic-SEO localization pipeline, adapted here into LLM-reasoning steps
with file-based artifacts (no database, no backend).

## UI-Loss Guarantee

This pipeline reads and writes only string values inside
`messages/<locale>.json`. It never reads, generates, or modifies a `.tsx`
file's JSX, `className`, icon usage, or component structure — that is
`nextjs-i18n-migration`'s job, entirely separate from this skill. Because
translation structurally cannot touch those files, "0% UI loss" holds by
construction: there is no code path in this skill that writes to a `.tsx`
file at all.
```

- [ ] **Step 2: Replace the Pipeline section**

Replace:

```markdown
## Pipeline

Run these six stages in order for one content unit ("page") at a time.
Each stage's full instructions live in its own reference file — read the
file when you reach that stage, don't try to work from this summary alone.

1. **Entity extraction & registry sync** — `references/entity-extraction.md`
2. **Triple extraction (source pass)** — `references/triple-extraction.md`
3. **Target-market SEO adaptation** — `references/target-market-seo.md`
4. **Contextual translation** — `references/contextual-translation.md`
5. **Triple extraction (target pass)** — `references/triple-extraction.md` (same file, run again on the translated draft)
6. **Semantic validation** — `references/semantic-validation.md`
```

with:

```markdown
## Pipeline

Run these stages in order for one content unit ("page") at a time. Each
stage's full instructions live in its own reference file — read the file
when you reach that stage, don't try to work from this summary alone.

1. **Entity extraction & registry sync** — `references/entity-extraction.md` (whole page, once)
2. **Target-market SEO adaptation** — `references/target-market-seo.md` (whole page, once)
3. **Batch planning** — `references/batching-and-completeness.md` (whole page, once — always runs, regardless of page size)
4. **Per-batch loop** — repeats sequentially for each batch from Stage 3:
   - **4a. Triple extraction (source pass)** — `references/triple-extraction.md`
   - **4b. Contextual translation** — `references/contextual-translation.md`
   - **4c. Triple extraction (target pass)** — `references/triple-extraction.md` (same file, run again on this batch's translated draft)
   - **4d. Semantic validation** — `references/semantic-validation.md`
5. **Completeness gate** — `references/batching-and-completeness.md` (whole page, once, mechanical — not an LLM judgment call)
6. **Human review gate** — see below (whole page, merged result)
```

- [ ] **Step 3: Edit the Artifact Paths section**

Replace:

```markdown
`<locale>` is the target language code (e.g. `de`). `<page-id>` is a short
slug identifying the content unit (e.g. `about`, `height-predictor`).
```

with:

```markdown
`<locale>` is the target language code (e.g. `de`). `<page-id>` is a short
slug identifying the content unit (e.g. `about`, `height-predictor`).

`triples-source.md`, `triples-target.md`, and `validation-report.md`
accumulate across every batch of a page — each batch's Stage 4a/4c/4d
output is appended, not written to a separate per-batch file, and triple
`#` numbering is continuous across the whole page (batch 2 does not
restart at `#1`).
```

- [ ] **Step 4: Replace the Human Review Gate section**

Replace:

```markdown
## Human Review Gate

After stage 6, if `validation-report.md` verdict is PASS: present the
entities added/reused, both triple tables, the validation report, and the
translated draft to the user. Do **not** write to `messages/<locale>.json`
or modify any application/source file until the user explicitly approves.
Audit artifacts under `docs/semantic-seo-localization/` are written as each
stage completes and are not gated. If verdict is FAIL, stop and report the
specific Missing/Contradicted/Introduced triples instead of presenting a
translation as ready.
```

with:

```markdown
## Human Review Gate

After Stage 5 (the completeness gate) passes — which requires every
batch's Stage 4d validation verdict to be PASS and the key-diff to be
empty — present the entities added/reused, the full per-page triple
tables, the validation report, and the merged translated draft to the
user. Do **not** write to `messages/<locale>.json` or modify any
application/source file until the user explicitly approves. Audit
artifacts under `docs/semantic-seo-localization/` are written as each
stage completes and are not gated. If any batch's Stage 4d verdict is
FAIL, or Stage 5's completeness gate finds any missing/extra/empty key,
stop and report the specific batch and key path(s) affected instead of
presenting a translation as ready.
```

- [ ] **Step 5: Add two bullets to Common Mistakes**

Append to the existing Common Mistakes list (after the last existing bullet, keep all existing bullets unchanged):

```markdown
- Skipping batch planning for a "small enough" page — batching always
  runs, regardless of page size, so the pipeline behaves identically at
  every scale.
- Treating the completeness gate as optional or as an LLM read-through
  instead of an explicit key-path enumeration and diff.
```

- [ ] **Step 6: Commit**

```bash
git add ".agents/skills/semantic-seo-localization/SKILL.md"
git commit -m "feat(skills): renumber pipeline to 7 stages with batching and completeness gate, restate UI-loss guarantee"
```

---

### Task 4: Reframe `triple-extraction.md` as batch-scoped

**Files:**
- Modify: `.agents/skills/semantic-seo-localization/references/triple-extraction.md`

**Interfaces:**
- Consumes: the "Stage 4a/4c" naming and continuous-numbering rule from Task 1/3.
- Produces: no output-shape change (table format identical) — only scope/framing text changes, so `semantic-validation.md` (Task 6) needs no interface change here.

- [ ] **Step 1: Edit the Purpose section**

Replace:

```markdown
## Purpose
Extract subject → predicate → object triples from a piece of content and score each by how central it is to the content's meaning. Used twice per pipeline run: once on the source English content, once on the translated draft — so the two triple sets can be diffed for meaning loss in the semantic-validation stage.
```

with:

```markdown
## Purpose
Extract subject → predicate → object triples from a piece of content and score each by how central it is to the content's meaning. Runs twice per batch (source pass and target pass) as part of the per-batch loop (Stage 4a and 4c in `SKILL.md`, per `batching-and-completeness.md`) — so the two triple sets can be diffed for meaning loss in the semantic-validation stage. "Content" in this file means the current batch's key paths only, not the whole page.
```

- [ ] **Step 2: Add a continuous-numbering note to the Output Format section**

In the Output Format section, after the existing sentence "Save to `docs/semantic-seo-localization/<locale>/<page-id>/triples-source.md` for the source pass, or `triples-target.md` for the target pass (same format, run on the translated draft)." add this new sentence directly after it:

```markdown
When run as part of a multi-batch page, append this batch's rows to the existing file rather than overwriting it, and continue the `#` numbering from where the previous batch left off (batch 2 does not restart at `#1`).
```

- [ ] **Step 3: Add a bullet to Common Mistakes**

Append to the existing Common Mistakes list:

```markdown
- Restarting `#` numbering at 1 for each batch instead of continuing from the previous batch — this breaks the completeness gate's ability to trace a key back to its batch.
```

- [ ] **Step 4: Verify with an application-scenario subagent test**

Dispatch a general-purpose subagent with this exact prompt:

```
Read the file at ".agents/skills/semantic-seo-localization/references/triple-extraction.md"
and follow its instructions for this scenario:

You are running the source-pass extraction for batch 2 of a multi-batch
page. Batch 1's extraction already produced a triples-source.md file
ending with row "#5 | ... | ... | ... | 70 | ...". Batch 2's content is:

"The warranty covers manufacturing defects for 2 years. Shipping takes
3-5 business days within the country."

Produce the new rows this batch should append (not the whole file, just
the new rows), and state explicitly what `#` number your first new row
uses and why.
```

Verify the subagent's output:
- States that its first new row is `#6` (continuing from batch 1's `#5`), not `#1`.
- Produces a well-formed table matching the Output Format's 6-column structure.
- Captures the "2 years" and "3-5 business days" facts as distinct triples (or at least one of them, with a plausible Prominence Score), not omitted.

If any check fails, revise the file to close the gap, then re-run until it passes.

- [ ] **Step 5: Commit**

```bash
git add ".agents/skills/semantic-seo-localization/references/triple-extraction.md"
git commit -m "feat(skills): reframe triple-extraction as batch-scoped with continuous numbering"
```

---

### Task 5: Reframe `contextual-translation.md` as batch-scoped with phrasing carry-forward

**Files:**
- Modify: `.agents/skills/semantic-seo-localization/references/contextual-translation.md`

**Interfaces:**
- Consumes: the entity registry and `seo-adaptation.md` (unchanged), plus a new input — established phrasing notes from earlier batches (in-memory, from `batching-and-completeness.md`'s Stage 4 description).
- Produces: the translated draft (unchanged) plus a new optional output — an updated established-phrasing note for later batches to consume.

- [ ] **Step 1: Edit the Purpose section**

Replace:

```markdown
## Purpose
Translate source content into the target language while preserving meaning, protecting registered entities, and using the target-market SEO terms from the previous stage — producing a draft ready for triple re-extraction and validation. This draft is NOT written into `messages/<locale>.json` yet.
```

with:

```markdown
## Purpose
Translate one batch's source content into the target language while preserving meaning, protecting registered entities, and using the target-market SEO terms from the target-market-seo stage — producing a draft ready for triple re-extraction and validation. Runs once per batch, in document order, as part of the per-batch loop (Stage 4b in `SKILL.md`, per `batching-and-completeness.md`). This draft is NOT written into `messages/<locale>.json` yet — batches are merged and mechanically verified for completeness (Stage 5) before anything reaches the human review gate.
```

- [ ] **Step 2: Add a new bullet to the Inputs section**

In the Inputs section, after the existing bullet "- Target language name, passed in by the orchestrator — never hardcode a specific language in this file." add:

```markdown
- Established phrasing notes from earlier batches in this page's run (recurring non-entity terms already translated a particular way) — empty if this is the first batch of the page.
```

- [ ] **Step 3: Add a new Core Rule**

In the Core Rules numbered list, after the existing rule 8 ("Preserve URLs and code/variable placeholders..."), add:

```markdown
9. **Reuse established phrasing from earlier batches.** If this is not the first batch of the page, check the established-phrasing notes for recurring non-entity terms already translated a particular way in an earlier batch of the same page, and reuse that phrasing rather than re-deriving a new equivalent — this is what keeps a multi-batch translation reading as one coherent page instead of stitched-together fragments.
```

- [ ] **Step 4: Add a new bullet to the Output section**

In the Output section, after the existing bullet about entities needing a proposed `localized_form`, add:

```markdown
- An updated "established phrasing" note: any new recurring, non-entity phrase this batch introduced that later batches of the same page should reuse verbatim, if there are any worth carrying forward.
```

- [ ] **Step 5: Add a bullet to Common Mistakes**

Append to the existing Common Mistakes list:

```markdown
- Re-deriving a fresh translation for a recurring phrase already established in an earlier batch, instead of reusing it — causes visible inconsistency across a merged page.
```

- [ ] **Step 6: Verify with an application-scenario subagent test**

Dispatch a general-purpose subagent with this exact prompt:

```
Read the file at ".agents/skills/semantic-seo-localization/references/contextual-translation.md"
and follow its instructions for this scenario:

You are translating batch 2 of a 2-batch German (de) page. Batch 1 was
already translated and its established-phrasing notes say: "free shipping"
was translated as "kostenloser Versand" (not the more literal "gratis
Versand").

Batch 2's source content: "Enjoy free shipping on all orders over $50.
Free shipping applies automatically at checkout."

entities.json has no entities relevant to this batch.
seo-adaptation.md has no keywords relevant to this batch.

Produce the translated draft. Explicitly confirm which phrasing you used
for "free shipping" and why.
```

Verify the subagent's output:
- Uses "kostenloser Versand" (the established phrasing) both times "free shipping" appears, not a different phrasing like "gratis Versand" or "kostenlose Lieferung".
- Explicitly states it reused the established phrasing rather than re-deriving one.
- Preserves the "$50" figure unchanged (or correctly localized per German currency/number conventions, but not dropped).

If any check fails, revise the file to close the gap, then re-run until it passes.

- [ ] **Step 7: Commit**

```bash
git add ".agents/skills/semantic-seo-localization/references/contextual-translation.md"
git commit -m "feat(skills): reframe contextual-translation as batch-scoped with established-phrasing carry-forward"
```

---

### Task 6: Reframe `semantic-validation.md` as batch-scoped

**Files:**
- Modify: `.agents/skills/semantic-seo-localization/references/semantic-validation.md`

**Interfaces:**
- Consumes: this batch's newly-appended rows in `triples-source.md`/`triples-target.md` (from Task 4).
- Produces: no output-shape change — only scope/framing text changes, plus an explicit note that this stage is NOT the whole-page completeness check (that's Task 1's Stage 5).

- [ ] **Step 1: Edit the Purpose section**

Replace:

```markdown
## Purpose
Compare the source triple set against the target (translated) triple set to catch meaning loss, contradiction, or hallucination before a translation reaches the human review gate.
```

with:

```markdown
## Purpose
Compare one batch's source triple set against its target (translated) triple set to catch meaning loss, contradiction, or hallucination before that batch is considered done. Runs once per batch, as part of the per-batch loop (Stage 4d in `SKILL.md`, per `batching-and-completeness.md`). This stage catches per-batch meaning loss; it does NOT check whether every key from the source page made it into some batch's output at all — that whole-page completeness check is a separate, later, mechanical stage (Stage 5, `batching-and-completeness.md`), not this file's job.
```

- [ ] **Step 2: Edit the Inputs section**

Replace:

```markdown
## Inputs
- `docs/semantic-seo-localization/<locale>/<page-id>/triples-source.md`
- `docs/semantic-seo-localization/<locale>/<page-id>/triples-target.md`
```

with:

```markdown
## Inputs
- `docs/semantic-seo-localization/<locale>/<page-id>/triples-source.md` (this batch's newly-appended rows)
- `docs/semantic-seo-localization/<locale>/<page-id>/triples-target.md` (this batch's newly-appended rows)
```

- [ ] **Step 3: Edit Step 1 of the Steps list**

Replace:

```markdown
1. Read both triple tables.
```

with:

```markdown
1. Read both triple tables, scoped to this batch's rows (the rows just appended by this batch's Stage 4a/4c extraction — not the whole accumulated file, unless this is the first batch of the page).
```

- [ ] **Step 4: Edit Step 8's verdict rule wording**

Replace:

```markdown
8. **Verdict rule:** FAIL if the alignment score is below 90%, OR any triple with Prominence Score >= 70 is Missing or Contradicted, OR any triple with Prominence Score >= 70 is Weakened in a way that drops a number, quantity, date, or named entity, OR any Introduced triple materially changes a claim (not just stylistic elaboration). Otherwise PASS. On FAIL, the orchestrator must stop and report the specific issue instead of proceeding to the human review gate.
```

with:

```markdown
8. **Verdict rule (per batch):** FAIL if this batch's alignment score is below 90%, OR any triple with Prominence Score >= 70 is Missing or Contradicted, OR any triple with Prominence Score >= 70 is Weakened in a way that drops a number, quantity, date, or named entity, OR any Introduced triple materially changes a claim (not just stylistic elaboration). Otherwise PASS. On FAIL, stop the per-batch loop for this page and report the specific batch and issue instead of continuing to later batches or proceeding to the human review gate.
```

- [ ] **Step 5: Add a bullet to Common Mistakes**

Append to the existing Common Mistakes list:

```markdown
- Confusing this stage's per-batch meaning-loss check with the separate, whole-page completeness gate (Stage 5 of `batching-and-completeness.md`) — a batch can pass this stage's validation perfectly while a completely different batch is still missing entirely; that's what Stage 5 catches, not this file.
```

- [ ] **Step 6: Verify with an application-scenario subagent test**

Dispatch a general-purpose subagent with this exact prompt:

```
Read the file at ".agents/skills/semantic-seo-localization/references/semantic-validation.md"
and answer this question directly (do not run a full validation, just
answer): "Batch 2 of a 3-batch page passed this stage's validation with a
100% alignment score. Does that mean the whole page is complete and ready
for the human review gate? Explain why or why not, citing this file."
```

Verify the subagent's output:
- Answers "No" (or equivalent) — batch 2 passing does not mean the whole page is complete.
- Explicitly cites that a separate, whole-page completeness gate (Stage 5 / `batching-and-completeness.md`) is what checks whether every batch's output made it into the final result, not this file.

If any check fails, revise the file to close the gap, then re-run until it passes.

- [ ] **Step 7: Commit**

```bash
git add ".agents/skills/semantic-seo-localization/references/semantic-validation.md"
git commit -m "feat(skills): reframe semantic-validation as per-batch, clarify it is not the completeness gate"
```

---

### Task 7: Point `nextjs-i18n-migration`'s Step 3 at `semantic-seo-localization`

**Files:**
- Modify: `.agents/skills/nextjs-i18n-migration/SKILL.md`

**Interfaces:**
- Consumes: nothing new from this plan's other tasks directly, but references `semantic-seo-localization` by name (must match the skill's frontmatter `name:` field exactly, which is `semantic-seo-localization`).
- Produces: no interface other tasks depend on — this is the plan's integration point, read by a human/agent running `nextjs-i18n-migration` in the future.

- [ ] **Step 1: Replace Step 3's body**

In `.agents/skills/nextjs-i18n-migration/SKILL.md`, replace:

```markdown
### Step 3: Create Target Locale Dictionary (`messages/de.json`)
1. Mirror the JSON key structure from `messages/en.json` key-for-key.
2. Translate only the string values into the target language. Keep variable placeholders (e.g. `{count}`) unchanged.
```

with:

```markdown
### Step 3: Create Target Locale Dictionary (`messages/de.json`)
1. Invoke the `semantic-seo-localization` skill with the namespace extracted in Step 2 as the source content, and the target locale (e.g. `de`). Do not hand-translate this file yourself.
2. Do not proceed to Step 4 until `semantic-seo-localization` reports its Stage 5 completeness gate passed and its Human Review Gate has been explicitly approved — its output is the finished `messages/<locale>.json` content, mirroring `messages/en.json`'s key structure key-for-key with only string values translated (variable placeholders like `{count}` are preserved unchanged by that skill's `contextual-translation.md` rules).
3. `semantic-seo-localization` never touches this `.tsx` file or any other application file — only `messages/<locale>.json` — so Steps 1 and 4-7 of this migration are unaffected by this step.
```

- [ ] **Step 2: Verify the reference resolves correctly**

```bash
grep -n "^name:" ".agents/skills/semantic-seo-localization/SKILL.md"
```

Expected output: `name: semantic-seo-localization` — confirming the name Step 3 now references matches the actual skill's frontmatter exactly (case-sensitive).

- [ ] **Step 3: Commit**

```bash
git add ".agents/skills/nextjs-i18n-migration/SKILL.md"
git commit -m "feat(skills): point nextjs-i18n-migration Step 3 at semantic-seo-localization instead of hand-translating"
```

---

### Task 8: End-to-end dry run against a large, multi-batch page

**Files:**
- No new skill files created. This task exercises Tasks 1-7 together against real project content large enough to force multiple batches.
- Read: `messages/en.json` (the `privacy` namespace — 51 leaf keys, the largest in this project, confirmed large enough to require multiple batches at ~8-10 keys per batch)
- Create: `docs/semantic-seo-localization/de/entities.json` (update if it already exists from the prior plan's dry run — merge, don't overwrite)
- Create: `docs/semantic-seo-localization/de/privacy/triples-source.md`
- Create: `docs/semantic-seo-localization/de/privacy/seo-adaptation.md`
- Create: `docs/semantic-seo-localization/de/privacy/triples-target.md`
- Create: `docs/semantic-seo-localization/de/privacy/validation-report.md`

**Interfaces:**
- Consumes: the full skill built in Tasks 1-6, invoked via the `Skill` tool as `semantic-seo-localization`.
- Produces: nothing consumed by a later task — this is the plan's final verification gate, confirming batching, phrasing carry-forward, and the completeness gate all work coherently together, not just in isolated subagent tests.

- [ ] **Step 1: Confirm the privacy namespace size**

```bash
node -e "
const fs=require('fs');
const en=JSON.parse(fs.readFileSync('messages/en.json','utf8'));
function countLeaves(o){let n=0;for(const k in o){if(o[k]&&typeof o[k]==='object'&&!Array.isArray(o[k])){n+=countLeaves(o[k]);}else if(Array.isArray(o[k])){n+=o[k].length;}else{n+=1;}}return n;}
console.log('privacy leaf count:', countLeaves(en.privacy));
"
```

Expected: a count comfortably above 20 (large enough that Stage 3's batch planning must produce at least 3 batches at ~8-10 keys each). If the count is at or below 15, pick the next-largest namespace instead (check `about`, `footer`, or `nav`) and use that page-id throughout this task instead of `privacy`.

- [ ] **Step 2: Invoke the skill end-to-end**

Using the `Skill` tool, invoke `semantic-seo-localization` with the `privacy` namespace's English content as input, target locale `de`, page-id `privacy`. Follow the orchestrator's full 7-stage pipeline exactly as described in the renumbered `SKILL.md`: entity extraction → target-market SEO → batch planning → per-batch loop (source triples → translation → target triples → validation, repeated for each batch) → completeness gate → human review gate.

Write all artifacts to the paths listed above as each stage completes (append triples-source.md/triples-target.md across batches, not one file per batch, per Task 1/4's rules).

- [ ] **Step 3: Verify batching actually happened**

Check by hand:
- The batch plan used in Step 2 produced more than one batch (report the batch count and each batch's key paths in your task report).
- `triples-source.md` and `triples-target.md` each contain triples spanning multiple batches with continuous `#` numbering (no restart at `#1` partway through the file).
- At least one recurring non-entity phrase appears translated identically across two different batches (evidence the established-phrasing carry-forward worked) — name the phrase and cite both occurrences.

- [ ] **Step 4: Verify the completeness gate**

Run the mechanical key-diff described in Stage 5 yourself (as an explicit check, not a skim): list every leaf key path in `messages/en.json`'s `privacy` namespace, list every leaf key path in the merged translated output, and confirm the two sets are identical with no empty values. Report the two counts and confirm they match.

If they do NOT match, this is a real bug in the pipeline (not an artifact issue) — identify which reference file's instructions failed to produce a key for the missing path, fix that file, and re-run Step 2's affected batch (not the whole pipeline) to close the gap.

- [ ] **Step 5: Verify UI-loss guarantee held**

```bash
git status --short "src/"
```

Expected: no output (nothing under `src/` was touched by this task) — confirming the pipeline never wrote to a `.tsx` file, only to `docs/semantic-seo-localization/` and `messages/en.json` (read-only).

- [ ] **Step 6: Commit the dry-run artifacts**

```bash
git add "docs/semantic-seo-localization/de/"
git commit -m "test(skills): dry-run batched semantic-seo-localization pipeline against multi-batch privacy page"
```

---

### Task 9: Final integration checklist

**Files:**
- Modify (if gaps found): any file touched in Tasks 1-7.

**Interfaces:**
- Consumes: all prior tasks' outputs.
- Produces: nothing further downstream — this is the plan's closing task.

- [ ] **Step 1: Re-confirm portability**

```bash
grep -RIn "heightcomparisoncalculator\|Height Comparison Tool" ".agents/skills/semantic-seo-localization/"
```

Expected: no output. If anything matches, remove the project-specific reference.

- [ ] **Step 2: Confirm SKILL.md's stage count is internally consistent**

```bash
grep -n "stages\|Stage [0-9]" ".agents/skills/semantic-seo-localization/SKILL.md"
```

Read the output and confirm every mention of stage count says "seven" (not a leftover "six"), and every "Stage N" reference in the Human Review Gate / Common Mistakes sections matches the numbering established in Task 3's Pipeline section (1, 2, 3, 4a-4d, 5, 6).

- [ ] **Step 3: Confirm nextjs-i18n-migration's other steps are untouched**

```bash
git diff 897f51b~1..HEAD -- ".agents/skills/nextjs-i18n-migration/SKILL.md"
```

(Use this plan's own first commit's parent, or `git log --oneline -- .agents/skills/nextjs-i18n-migration/SKILL.md` to find the right base if `897f51b~1` doesn't resolve in this checkout.) Confirm the diff touches only Step 3's body — Steps 1, 2, 4, 5, 6, 7 and the Critical Mistakes table, Architecture Blueprint, and Step-by-Step header structure are all unchanged.

- [ ] **Step 4: Report completion**

Summarize to the user: what changed in each of the 7 files, the Task 8 dry-run result (batch count, completeness gate result, phrasing-consistency evidence), and confirm both guarantees hold: no content loss (mechanical completeness gate, always-on batching) and no UI loss (structural — the pipeline cannot write to `.tsx` files).
