# Semantic SEO Localization Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `semantic-seo-localization` skill — an orchestrator SKILL.md plus five reference files — that adds entity protection, SPO semantic-integrity checking, target-market SEO adaptation, and translation validation on top of raw translation, for use when localizing this project's content into a new locale.

**Architecture:** One skill folder (`.agents/skills/semantic-seo-localization/`) containing an orchestrator `SKILL.md` and a `references/` folder with one markdown file per pipeline stage (entity-extraction, triple-extraction, target-market-seo, contextual-translation, semantic-validation). The orchestrator reads each reference file and follows its instructions in sequence, writing audit artifacts into the consuming project's `docs/semantic-seo-localization/<locale>/` folder, and gating on human approval before any translation is written to `messages/<locale>.json`.

**Tech Stack:** Markdown-only (no application code). Verification is done by dispatching subagents to apply each reference file's instructions to a sample input and checking the output shape — this is documentation, not software, so there are no automated test suites.

## Global Constraints

- Skill package must stay project-agnostic/portable (no hardcoded locale, domain, or file paths baked into instructions) — per design spec `docs/superpowers/specs/2026-09-02-semantic-seo-localization-skill-design.md`.
- Skill name in frontmatter: `semantic-seo-localization`, letters/numbers/hyphens only.
- Frontmatter `description` must start with "Use when...", be third person, describe triggering conditions only (never summarize the pipeline/workflow) — per superpowers:writing-skills SDO rules.
- Entity names are never auto-translated by default (`translate: false` unless explicitly justified) — per design spec.
- No database, backend service, job queue, or versioned graph storage — per design spec "Out of scope for v1".
- Audit artifacts live at `docs/semantic-seo-localization/<locale>/` in the *consuming* project, never inside the skill package itself.
- Nothing gets written to `messages/<locale>.json` without the human review gate passing.
- Do not edit `.agents/skills/nextjs-i18n-migration/SKILL.md` as part of this plan — that integration is explicitly a separate follow-up task per the design spec.

---

### Task 1: Scaffold skill folder and orchestrator skeleton

**Files:**
- Create: `.agents/skills/semantic-seo-localization/SKILL.md`
- Create: `.agents/skills/semantic-seo-localization/references/` (directory, populated in later tasks)

**Interfaces:**
- Produces: the skill's frontmatter `name: semantic-seo-localization`, which is how later tasks' reference files get linked from the orchestrator body.

- [ ] **Step 1: Create the directory and orchestrator file with frontmatter + skeleton sections**

Write `.agents/skills/semantic-seo-localization/SKILL.md`:

```markdown
---
name: semantic-seo-localization
description: Use when translating or localizing website/app content into another language and literal translation risks losing brand/entity identity, factual meaning, or target-market search intent. Use before writing translated strings into messages/*.json, or whenever adding a new locale to an existing i18n project.
---

# Semantic SEO Localization

## Overview

Raw translation preserves words, not necessarily meaning, entity identity, or
search intent. This skill runs source content through five stages — entity
extraction, source triple extraction, target-market SEO adaptation,
contextual translation, and semantic validation — before any translated text
is treated as final. It borrows its methodology from a semantic-SEO
localization pipeline, adapted here into LLM-reasoning steps with file-based
artifacts (no database, no backend).

## When to Use

- Adding a new target locale to an existing project's `messages/en.json` →
  `messages/<locale>.json` translation.
- Translating any content where brand/product names, factual claims, or SEO
  metadata must survive translation intact.
- NOT needed for one-off, throwaway text with no reuse or SEO stakes (just
  translate it directly).

## Pipeline

Run these five stages in order for one content unit ("page") at a time.
Each stage's full instructions live in its own reference file — read the
file when you reach that stage, don't try to work from this summary alone.

1. **Entity extraction & registry sync** — `references/entity-extraction.md`
2. **Triple extraction (source pass)** — `references/triple-extraction.md`
3. **Target-market SEO adaptation** — `references/target-market-seo.md`
4. **Contextual translation** — `references/contextual-translation.md`
5. **Triple extraction (target pass)** — `references/triple-extraction.md` (same file, run again on the translated draft)
6. **Semantic validation** — `references/semantic-validation.md`

## Artifact Paths

All audit artifacts go into the *consuming project's* repo, never into this
skill folder:

```
docs/semantic-seo-localization/<locale>/entities.json          # cross-page, persistent
docs/semantic-seo-localization/<locale>/<page-id>/triples-source.md
docs/semantic-seo-localization/<locale>/<page-id>/seo-adaptation.md
docs/semantic-seo-localization/<locale>/<page-id>/triples-target.md
docs/semantic-seo-localization/<locale>/<page-id>/validation-report.md
```

`<locale>` is the target language code (e.g. `de`). `<page-id>` is a short
slug identifying the content unit (e.g. `about`, `height-predictor`).

## Human Review Gate

After stage 6, if `validation-report.md` verdict is PASS: present the
entities added/reused, both triple tables, the validation report, and the
translated draft to the user. Do **not** write to `messages/<locale>.json`
or any other repo file until the user explicitly approves. If verdict is
FAIL, stop and report the specific Missing/Contradicted/Introduced triples
instead of presenting a translation as ready.

## Common Mistakes

- Skipping straight to translation without entity extraction — brand names
  drift across pages.
- Treating the target-market SEO stage as "translate the English keywords"
  — it must reason about what target-locale users actually search.
- Writing the translation to `messages/<locale>.json` before the human
  review gate.
- Reusing this skill's own folder to store a project's entity registry —
  artifacts always live in the consuming project's `docs/`, not here.
```

- [ ] **Step 2: Create the references directory**

```bash
mkdir -p ".agents/skills/semantic-seo-localization/references"
```

- [ ] **Step 3: Commit**

```bash
git add ".agents/skills/semantic-seo-localization/SKILL.md"
git commit -m "feat(skills): scaffold semantic-seo-localization orchestrator skeleton"
```

---

### Task 2: Write and verify `references/entity-extraction.md`

**Files:**
- Create: `.agents/skills/semantic-seo-localization/references/entity-extraction.md`

**Interfaces:**
- Consumes: nothing from earlier tasks (first pipeline stage).
- Produces: the `entities.json` schema (`canonical_name`, `entity_type`, `description`, `translate`, `localized_form`, `first_seen_page`, `added_at`) that Task 5 (contextual-translation.md) and Task 3/4 verification depend on for field names.

- [ ] **Step 1: Write the reference file**

```markdown
# Entity Extraction & Registry Sync

## Purpose
Identify entities in source content and keep a canonical, cross-page registry so brand/product/technical names stay consistent — and untranslated by default — across every page you localize.

## Entity Types
Person, Organization, Brand, Product, Place, Technology, Software, Concept, Event, Other.

## Steps
1. Read the source content (page/component text, or the relevant namespace in `messages/en.json`).
2. Extract every entity a reader would recognize as a named, specific thing — not generic nouns. Skip common nouns ("the door", "a person") unless part of a proper name.
3. For each entity, determine: `canonical_name`, `entity_type`, a one-sentence description, and whether it should be translated. Default `translate: false` for Brand/Product/Software/Organization. Default `translate: true` only for Place/Concept names that have an established target-language equivalent (e.g. "United States" → "Vereinigte Staaten" in German), and always leave Person names untranslated unless there's a well-established localized form.
4. Read `docs/semantic-seo-localization/<locale>/entities.json` if it exists; if not, treat the registry as empty (it will be created in Step 6).
5. For each extracted entity, check whether `canonical_name` (case-insensitive) already exists in the registry:
   - Exists, and `entity_type`/`translate` match: reuse it, no change needed.
   - Exists, but `entity_type` or `translate` differs from this page's extraction: flag as a **CONFLICT** for human resolution. Do not silently overwrite.
   - Does not exist: append a new entry.
6. New entry shape:
```json
{
  "canonical_name": "string",
  "entity_type": "Person|Organization|Brand|Product|Place|Technology|Software|Concept|Event|Other",
  "description": "one sentence",
  "translate": false,
  "localized_form": null,
  "first_seen_page": "page-id",
  "added_at": "ISO-8601 date"
}
```
   When `translate` is `true`, propose a `localized_form`; otherwise leave it `null` (meaning: use `canonical_name` as-is in the target text).
7. Write the updated registry to `docs/semantic-seo-localization/<locale>/entities.json` as `{"entities": [...]}`, pretty-printed, entities sorted alphabetically by `canonical_name`.
8. Report a short summary: entities reused, entities added, entities flagged as conflicts.

## Example
Input: "The Eiffel Tower in Paris is shorter than the Burj Khalifa."

Extracted:
- Eiffel Tower — Place — landmark in Paris — `translate: false`
- Paris — Place — city in France — `translate: true` (has an established localized form in many target languages)
- Burj Khalifa — Place — skyscraper in Dubai — `translate: false`

## Common Mistakes
- Extracting generic nouns ("the tower", "a building") as entities — only extract specific named things.
- Auto-translating Brand/Product/Software names because it "reads more naturally" — entity protection is not a style choice.
- Silently overwriting an existing registry entry when a new page's extraction disagrees with it — always flag as CONFLICT instead.
```

- [ ] **Step 2: Verify with an application-scenario subagent test**

Dispatch a general-purpose subagent with this exact prompt (fresh context, no other project context):

```
Read the file at ".agents/skills/semantic-seo-localization/references/entity-extraction.md"
and follow its instructions exactly on this source text, assuming no existing
entities.json (empty registry) and locale "de", page-id "test-page":

"Netflix is an American streaming company. Its headquarters are in Los Gatos.
Netflix competes with Amazon Prime Video and Disney+."

Show the exact entities.json content you would write, and the summary report.
Do not write any files — just show what you would produce.
```

Verify the subagent's reported output:
- Lists Netflix, Amazon Prime Video, Disney+ as Brand/Product entities with `translate: false`.
- Lists Los Gatos as a Place entity (translate value is a reasonable judgment call, either is acceptable as long as it's justified).
- Produces valid JSON matching the schema in Step 1 (all 7 fields present, `first_seen_page: "test-page"`).
- Does NOT invent entities not present in the text (e.g. does not add "Streaming" as an entity).

If any check fails, revise `entity-extraction.md` to close the gap, then re-run the same subagent prompt until it passes.

- [ ] **Step 3: Commit**

```bash
git add ".agents/skills/semantic-seo-localization/references/entity-extraction.md"
git commit -m "feat(skills): add entity-extraction reference for semantic-seo-localization"
```

---

### Task 3: Write and verify `references/triple-extraction.md`

**Files:**
- Create: `.agents/skills/semantic-seo-localization/references/triple-extraction.md`

**Interfaces:**
- Consumes: nothing structurally from Task 2 (runs independently), but is invoked twice by the orchestrator (source pass using source content, target pass using Task 5's translated draft).
- Produces: the triple table format (`# | Subject | Predicate | Object | Prominence Score | Explanation`) that Task 6 (semantic-validation.md) consumes for its diff logic.

- [ ] **Step 1: Write the reference file**

```markdown
# SPO Triple Extraction

## Purpose
Extract subject → predicate → object triples from a piece of content and score each by how central it is to the content's meaning. Used twice per pipeline run: once on the source English content, once on the translated draft — so the two triple sets can be diffed for meaning loss in the semantic-validation stage.

## Steps
1. Parse the content semantically, not sentence-by-sentence mechanically.
2. Identify key entities, concepts, relationships, attributes, actions, and facts.
3. Convert the most meaningful relationships into triples: Subject → Predicate → Object.
4. Avoid redundant, vague, or purely grammatical relationships (e.g. don't extract a triple from an unresolved pronoun).
5. Preserve the meaning of the original content. Do not invent facts absent from the text.
6. Normalize predicates where it helps later comparison (e.g. "is located in" and "is based in" both become `located in` when they express the same relation type in this content). Note any normalization you apply — the target-pass extraction must normalize the same way, or the diff in semantic-validation.md won't line up.
7. Assign every triple a **Triple Prominence Score (0–100)**, combining:
   - Centrality (0–30): how central to the content's main topic
   - Specificity (0–20): how precise/information-rich
   - Entity importance (0–20): how important the subject/object are to the content
   - Relationship strength (0–15): how explicitly/strongly the text establishes it
   - SEO/topical value (0–15): how useful for understanding the topic/entity/topical context
8. Deduplicate equivalent triples. Order the table by prominence, highest first.

## Output Format
```markdown
| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
```
Save to `docs/semantic-seo-localization/<locale>/<page-id>/triples-source.md` for the source pass, or `triples-target.md` for the target pass (same format, run on the translated draft).

## Example
Input: "Apple is an American technology company headquartered in Cupertino. It develops consumer electronics, software, and online services."

| # | Subject | Predicate | Object | Score | Explanation |
|---|---------|-----------|--------|------:|--------------|
| 1 | Apple | is a | American technology company | 96 | Core entity classification; establishes the primary topic. |
| 2 | Apple | develops | consumer electronics, software, and online services | 92 | Describes Apple's principal business activities. |
| 3 | Apple | headquartered in | Cupertino | 78 | Geographic attribute of the company. |

## Common Mistakes
- Extracting a triple for every grammatical dependency instead of only meaningful relationships.
- Inferring relationships not reasonably supported by the text.
- Using different predicate normalization on the source vs. target pass — reuse the same normalization notes both times so the diff works.
```

- [ ] **Step 2: Verify with an application-scenario subagent test**

Dispatch a general-purpose subagent with this exact prompt:

```
Read the file at ".agents/skills/semantic-seo-localization/references/triple-extraction.md"
and follow its instructions exactly on this source text:

"Mount Everest is the tallest mountain on Earth. It is located in the
Himalayas on the border between Nepal and Tibet. Its peak reaches 8,849
meters above sea level."

Produce the markdown triple table exactly as specified in the Output Format
section. Do not write any files — just show the table.
```

Verify the subagent's output:
- Is a markdown table with the exact 6 columns from the Output Format section.
- Includes a triple capturing the 8,849 meters height fact (this is the highest-specificity fact in the text — its Prominence Score should be among the highest, or its omission is a real gap in the skill's guidance).
- Contains no triple inventing information absent from the text (e.g. no invented climbing statistics).
- Table is ordered by score descending.

If any check fails, revise `triple-extraction.md` to close the gap, then re-run until it passes.

- [ ] **Step 3: Commit**

```bash
git add ".agents/skills/semantic-seo-localization/references/triple-extraction.md"
git commit -m "feat(skills): add triple-extraction reference for semantic-seo-localization"
```

---

### Task 4: Write and verify `references/target-market-seo.md`

**Files:**
- Create: `.agents/skills/semantic-seo-localization/references/target-market-seo.md`

**Interfaces:**
- Consumes: Task 3's triple table conceptually (reads the source triples to identify primary/secondary topics) — no strict schema dependency beyond "a markdown triple table exists at `triples-source.md`".
- Produces: the `seo-adaptation.md` output format (Localized Metadata block + Target Keywords table) that Task 5 (contextual-translation.md) consumes.

- [ ] **Step 1: Write the reference file**

```markdown
# Target-Market SEO Adaptation

## Purpose
Adapt SEO metadata (title, description, slug, keyword targets) for what users in the target market/locale actually search for — not a literal translation of the English keyword set. Runs after triple extraction (so the content's core relationships are known) and before translation (so the translator can use the adapted terms).

## Steps
1. From the source content and its `triples-source.md` output, list the primary topic, secondary topics, and the concrete SEO-relevant terms (keywords, entities, product/feature names) the English version targets.
2. For the target locale, reason about how a native searcher would phrase the same intent — consider literal-vs-idiomatic phrasing differences, compound-word conventions (e.g. German), commonly borrowed English terms that stay in English in that market's tech/SEO vocabulary, and any regional search habits you know of.
3. If Google Search Console MCP tools are available and the project has an active property for this domain, you may check real query/impression data for the target locale to sanity-check candidate keywords. This is optional — proceed with LLM-reasoning-only if MCP tools are unavailable or no property is configured.
4. Propose:
   - Localized page title (SEO-oriented, not a plain translation)
   - Localized meta description
   - Localized slug (URL-safe, using target-language conventions)
   - 3–8 target keywords/phrases for this page in the target locale
5. For each proposed keyword that differs from a literal translation, note briefly why it's the target-market equivalent.
6. Save to `docs/semantic-seo-localization/<locale>/<page-id>/seo-adaptation.md`.

## Output Format
```markdown
## Localized Metadata
- Title: ...
- Description: ...
- Slug: ...

## Target Keywords
| Keyword | Rationale (only if it differs from a literal translation) |
|---|---|
```

## Common Mistakes
- Translating the English keyword list word-for-word instead of reasoning about how the target market actually searches.
- Treating MCP/GSC data as required — it's a sanity check, never a blocker.
- Proposing a slug that isn't URL-safe for the target language (unencoded spaces, unnormalized diacritics).
```

- [ ] **Step 2: Verify with an application-scenario subagent test**

Dispatch a general-purpose subagent with this exact prompt:

```
Read the file at ".agents/skills/semantic-seo-localization/references/target-market-seo.md"
and follow its instructions exactly for this scenario:

Source page topic: an English-language calculator that lets users compare
the height of two people side by side (page title: "Height Difference
Calculator", primary keyword: "height difference calculator").
Target locale: German (de). No GSC/MCP tools are available in this
environment.

Produce the output exactly in the format specified in the Output Format
section. Do not write any files — just show the output.
```

Verify the subagent's output:
- Produces both required sections (`## Localized Metadata`, `## Target Keywords`) with the exact format.
- Title/description/slug are in German, not English.
- Does NOT block or refuse due to missing GSC/MCP tools — the file must say this is optional and the subagent must proceed anyway.
- At least one keyword rationale is given where the German phrasing isn't a literal translation (e.g. compound-word or idiomatic difference), demonstrating the skill didn't just translate the keyword list.

If any check fails, revise `target-market-seo.md` to close the gap, then re-run until it passes.

- [ ] **Step 3: Commit**

```bash
git add ".agents/skills/semantic-seo-localization/references/target-market-seo.md"
git commit -m "feat(skills): add target-market-seo reference for semantic-seo-localization"
```

---

### Task 5: Write and verify `references/contextual-translation.md`

**Files:**
- Create: `.agents/skills/semantic-seo-localization/references/contextual-translation.md`

**Interfaces:**
- Consumes: `entities.json` schema from Task 2 (fields `canonical_name`, `translate`, `localized_form`), `seo-adaptation.md` format from Task 4.
- Produces: a translated draft (in-memory/staged output, no fixed file — the orchestrator holds this in context for Task 3's re-run and Task 6).

- [ ] **Step 1: Write the reference file**

```markdown
# Contextual Translation

## Purpose
Translate source content into the target language while preserving meaning, protecting registered entities, and using the target-market SEO terms from the previous stage — producing a draft ready for triple re-extraction and validation. This draft is NOT written into `messages/<locale>.json` yet.

## Inputs
- Source content (English)
- `docs/semantic-seo-localization/<locale>/entities.json` (entity registry from the entity-extraction stage)
- `docs/semantic-seo-localization/<locale>/<page-id>/seo-adaptation.md` (from the target-market-seo stage)
- Target language name, passed in by the orchestrator — never hardcode a specific language in this file.

## Core Rules
1. **Translate meaning, not individual words.** Prioritize context, intent, and natural expression in the target language over literal word-for-word translation.
2. **Protect registered entities.** For every entity in the registry with `translate: false`, use `canonical_name` verbatim. For `translate: true`, use the registry's `localized_form` if present; otherwise propose one and flag it as needing to be added to the registry on the next entity-extraction pass.
3. **Use the target-market SEO terms** from `seo-adaptation.md` where they naturally fit the content, instead of literally translating the source's English keywords.
4. **Preserve document structure** — headings, lists, tables, emphasis, numbering. Do not add or remove sections.
5. **Do not add unsupported information** — no new facts, claims, examples, or statistics absent from the source.
6. **Maintain terminology consistency** — once a recurring concept is translated a particular way, keep it consistent throughout the content.
7. **Handle ambiguity by inferring from context** — when a term has multiple valid target-language equivalents, pick the one that best fits the document's subject, audience, and the search intent captured in `seo-adaptation.md`.
8. Preserve URLs and code/variable placeholders (e.g. `{count}`) exactly unchanged.

## Priority Order (when trade-offs arise)
1. Meaning and factual fidelity
2. Contextual accuracy
3. Natural phrasing in the target language
4. Semantic/topical coverage
5. SEO terminology from the target-market-seo stage
6. Keyword relevance
7. Stylistic polish

## Output
- The translated draft text, held as the pipeline's working output (not written to `messages/<locale>.json` — that only happens after the human review gate).
- A short list of any entities that needed a proposed `localized_form` not yet in the registry, so entity-extraction.md can formalize them next run.

## Common Mistakes
- Translating a `translate: false` entity anyway because it "sounds more natural" — entity protection is not a style choice.
- Mechanically repeating keywords from `seo-adaptation.md` until the text reads as keyword-stuffed — integrate them naturally instead.
- Adding explanatory content the source didn't have, even if it would "help" the target reader.
```

- [ ] **Step 2: Verify with an application-scenario subagent test**

Dispatch a general-purpose subagent with this exact prompt:

```
Read the file at ".agents/skills/semantic-seo-localization/references/contextual-translation.md"
and follow its instructions exactly for this scenario:

Source content: "CloudSync keeps your files backed up automatically. It
works with over 10 million users worldwide."

entities.json contains:
{"entities": [{"canonical_name": "CloudSync", "entity_type": "Brand",
"description": "a file backup product", "translate": false,
"localized_form": null, "first_seen_page": "home", "added_at":
"2026-01-01"}]}

seo-adaptation.md target keyword list includes "automatische
Datensicherung" (automatic data backup) as the preferred phrase over a
literal translation.

Target language: German.

Produce the translated draft. Do not write any files.
```

Verify the subagent's output:
- "CloudSync" appears verbatim, untranslated, in the German output (entity protection honored).
- The "10 million users" fact is preserved (no dropped or altered number).
- The phrase "automatische Datensicherung" (or a clear natural variant of it) appears, showing the SEO term from stage 3 was used.
- No new claims were added beyond what the source stated.

If any check fails, revise `contextual-translation.md` to close the gap, then re-run until it passes.

- [ ] **Step 3: Commit**

```bash
git add ".agents/skills/semantic-seo-localization/references/contextual-translation.md"
git commit -m "feat(skills): add contextual-translation reference for semantic-seo-localization"
```

---

### Task 6: Write and verify `references/semantic-validation.md`

**Files:**
- Create: `.agents/skills/semantic-seo-localization/references/semantic-validation.md`

**Interfaces:**
- Consumes: the triple table format from Task 3 (`triples-source.md` and `triples-target.md`).
- Produces: the `validation-report.md` format (alignment score + verdict + classified triple tables) that the orchestrator's human review gate (Task 7) reads to decide PASS/FAIL.

- [ ] **Step 1: Write the reference file**

```markdown
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
8. **Verdict rule:** FAIL if the alignment score is below 90%, OR any triple with Prominence Score >= 70 is Missing or Contradicted, OR any Introduced triple materially changes a claim (not just stylistic elaboration). Otherwise PASS. On FAIL, the orchestrator must stop and report the specific issue instead of proceeding to the human review gate.

## Output Format
```markdown
## Semantic Validation Report — <page-id> (<locale>)

**Alignment score:** NN%
**Verdict:** PASS | FAIL

### Preserved (N)
...

### Weakened (N)
| Source Triple | Target Triple | What was lost |

### Missing (N)
| Source Triple | Prominence Score |

### Contradicted (N)
| Source Triple | Target Triple | Conflict |

### Introduced / Possible Hallucination (N)
| Target Triple |
```

## Common Mistakes
- Matching triples by exact string instead of by meaning — a correctly translated triple will not read identically in the target language.
- Letting content through even when a high-prominence triple went missing, just because the overall percentage looks acceptable.
- Flagging every natural rephrasing as "Weakened" — only flag actual loss of specificity or meaning.
```

- [ ] **Step 2: Verify with an application-scenario subagent test**

Dispatch a general-purpose subagent with this exact prompt:

```
Read the file at ".agents/skills/semantic-seo-localization/references/semantic-validation.md"
and follow its instructions exactly on these two triple tables:

SOURCE (triples-source.md):
| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 1 | Mount Everest | is | tallest mountain on Earth | 95 | Core fact |
| 2 | Mount Everest | reaches | 8,849 meters | 85 | Key specific stat |
| 3 | Mount Everest | located in | Himalayas | 70 | Geographic fact |

TARGET (triples-target.md, translated to German, back-translated here for
your evaluation):
| # | Subject | Predicate | Object | Prominence Score | Explanation |
|---|---------|-----------|--------|------------------:|--------------|
| 1 | Mount Everest | is | tallest mountain on Earth | 95 | Core fact preserved |
| 2 | Mount Everest | located in | Himalayas | 70 | Geographic fact preserved |
| 3 | Mount Everest | is popular with | thousands of climbers each year | 60 | New claim not in source |

Produce the full validation report exactly as specified in the Output
Format section. Do not write any files.
```

Verify the subagent's output:
- Classifies triple #2 (8,849 meters) from SOURCE as **Missing** (it has Prominence Score 85, which is >= 70).
- Classifies the "popular with thousands of climbers" TARGET triple as **Introduced**.
- Computes alignment score as 2/3 ≈ 67%.
- Verdict is **FAIL** (score < 90% AND a >=70-prominence triple is missing) — the subagent must not mark this PASS.

If any check fails, revise `semantic-validation.md` to close the gap, then re-run until it passes.

- [ ] **Step 3: Commit**

```bash
git add ".agents/skills/semantic-seo-localization/references/semantic-validation.md"
git commit -m "feat(skills): add semantic-validation reference for semantic-seo-localization"
```

---

### Task 7: End-to-end dry run against a real project page

**Files:**
- No new files created. This task exercises the full skill (Tasks 1–6) against real project content to verify the pipeline works end-to-end, and produces real artifacts under `docs/semantic-seo-localization/de/about/`.
- Read: `src/app/[locale]/about/page.tsx` (or wherever the About page content currently lives — confirm the exact path first with a Glob for `**/about/page.tsx`)
- Read: `messages/en.json` (About namespace)
- Create: `docs/semantic-seo-localization/de/entities.json`
- Create: `docs/semantic-seo-localization/de/about/triples-source.md`
- Create: `docs/semantic-seo-localization/de/about/seo-adaptation.md`
- Create: `docs/semantic-seo-localization/de/about/triples-target.md`
- Create: `docs/semantic-seo-localization/de/about/validation-report.md`

**Interfaces:**
- Consumes: the full skill built in Tasks 1–6, invoked via the `Skill` tool as `semantic-seo-localization`.
- Produces: nothing consumed by a later task — this is the plan's final verification gate, confirming the whole pipeline is coherent when a single agent runs it top to bottom rather than one stage at a time.

- [ ] **Step 1: Locate the About page's English content**

```bash
grep -RIl "about" messages/en.json | head -1
```

Read `messages/en.json` and identify the `about` (or equivalently-named) namespace's text content — this is the source content for the dry run.

- [ ] **Step 2: Invoke the skill end-to-end**

Using the `Skill` tool, invoke `semantic-seo-localization` with the About page's English content as input, target locale `de`, page-id `about`. Follow the orchestrator's pipeline exactly: entity extraction → triple extraction (source) → target-market SEO → contextual translation → triple extraction (target) → semantic validation → human review gate.

Write all five artifacts to the paths listed above as you go (do not batch them at the end — write each as its stage completes, matching how the orchestrator is meant to run in real usage).

- [ ] **Step 3: Verify the artifacts are internally consistent**

Check by hand:
- `entities.json` is valid JSON matching the Task 2 schema, and every `Brand`/`Product`/`Software` entity has `translate: false`.
- `triples-source.md` and `triples-target.md` both use the exact table format from Task 3.
- `seo-adaptation.md` has both required sections from Task 4.
- `validation-report.md` has a verdict, and if it's FAIL, confirm the pipeline actually stopped there rather than presenting a translation as ready (per the orchestrator's Human Review Gate section).
- The final translated draft presented at the human review gate uses German (not English) and does not translate any `translate: false` entity from `entities.json`.

If any inconsistency turns up, fix the specific reference file responsible (not the dry-run artifacts — those are disposable outputs) and re-run Step 2.

- [ ] **Step 4: Commit the dry-run artifacts as a working example**

```bash
git add "docs/semantic-seo-localization/de/"
git commit -m "test(skills): dry-run semantic-seo-localization against About page content"
```

---

### Task 8: Final skill deployment checklist

**Files:**
- Modify (if gaps found): any file under `.agents/skills/semantic-seo-localization/`

**Interfaces:**
- Consumes: all prior tasks' outputs.
- Produces: nothing further downstream — this is the plan's closing task.

- [ ] **Step 1: Re-check frontmatter against SDO rules**

Read `.agents/skills/semantic-seo-localization/SKILL.md` and confirm:
- `name: semantic-seo-localization` uses only letters/numbers/hyphens.
- `description` starts with "Use when...", is third person, states triggering conditions only (no workflow summary), and is under 500 characters.

- [ ] **Step 2: Confirm no hardcoded project specifics leaked into the skill**

```bash
grep -RIn "heightcomparisoncalculator\|Height Comparison Tool" ".agents/skills/semantic-seo-localization/"
```

Expected: no output. If anything matches, remove the project-specific reference so the skill stays portable (per the Global Constraints section of this plan).

- [ ] **Step 3: Confirm the `docs/semantic-seo-localization/` artifact folder is not accidentally ignored**

```bash
git check-ignore -v "docs/semantic-seo-localization/de/entities.json" || echo "not ignored, good"
```

Expected: "not ignored, good". If it's being ignored by a `.gitignore` rule (e.g. a broad `docs/` rule), that's fine to leave as-is since these are project-generated audit artifacts, not skill code — but note it to the user rather than silently leaving Task 7's commit unexplained.

- [ ] **Step 4: Report completion**

Summarize to the user: skill location, the six reference files, the dry-run result (PASS/FAIL and why), and the explicit reminder that integrating this into `nextjs-i18n-migration` (per the design spec) is a separate follow-up task not covered here.
