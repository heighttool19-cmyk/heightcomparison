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
1. Recursively list every leaf key path in the source namespace (`messages/en.json`, this page-id's namespace) — same enumeration method as Stage 3 Step 2. **Independently check `messages/en.json` for a top-level `metadata` namespace** containing a `<page-id>Title` / `<page-id>Description` pair for this page (e.g. `metadata.aboutTitle` for page-id `about`) — do this check yourself, directly against the source file, rather than trusting that `target-market-seo.md`'s Stage 2 output already reported it. If such a pair exists, add both key paths to this set. This check is mandatory and unconditional — it does not depend on Stage 2 having remembered to flag it; the whole point of this gate being mechanical is that it does not trust an earlier stage's self-report.
2. Recursively list every leaf key path in the merged candidate translation: all batches' Stage 4b output (combined in document order), **plus** the actual current values at `metadata.<page-id>Title` / `metadata.<page-id>Description` in the candidate output, if Step 1 found that pair in the source. If Stage 2 did produce translated values for them, they should be present here; if Stage 2 never produced them (the failure this check exists to catch), they will be absent or still in English — either way, list what is actually there, not what should be there.
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
- Forgetting the shared `metadata.<page-id>Title`/`Description` pair (if the project has one) because it lives outside the page's own namespace — it's easy to enumerate only the page namespace and silently miss these two keys, leaving the page's SEO metadata untranslated even though every other key checks out.
