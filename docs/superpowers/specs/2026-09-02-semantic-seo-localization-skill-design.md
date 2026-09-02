# Semantic SEO Localization Skill — Design

Date: 2026-09-02
Status: Approved (pending user spec review)

## Purpose

Extend the project's i18n capability beyond mechanical routing/message-file migration
(`nextjs-i18n-migration`) with a content-quality layer inspired by the "Semantic SEO
Localizer" methodology: entity protection, subject-predicate-object (SPO) semantic
integrity, target-market SEO adaptation, and translation validation.

This is **not** a rebuild of the full Semantic SEO Localizer SaaS (no Postgres/pgvector,
no FastAPI backend, no job queue, no versioned graph DB). It borrows the *methodology*
only, adapted into a set of LLM-reasoning skill instructions with file-based artifacts.

The resulting skill is intended to be **portable and publishable** — it must not hardcode
this project's domain, locale, or paths. Any project-specific state it produces (entity
registry, reports) is written into the *consuming project's* `docs/` folder, never into
the skill package itself.

## Relationship to `nextjs-i18n-migration`

- `nextjs-i18n-migration` remains responsible for the mechanical work: `[locale]` routing,
  layout structure, `generateMetadata`, language switcher, verifying 0% CSS/content loss.
- `semantic-seo-localization` (this skill) is responsible for the *content itself*: what
  gets extracted, how it's translated, and whether meaning survived translation.
- Follow-up (separate, smaller task after this skill exists): edit
  `nextjs-i18n-migration`'s Step 2/3 (content extraction + target locale dictionary) to
  say "invoke `semantic-seo-localization` for translation" instead of doing raw
  translation inline.

## Architecture

One orchestrator skill with reference files for each pipeline stage, all inside a single
skill folder (not separate top-level skills, and not nested `SKILL.md` files — nested
`SKILL.md` discovery is unverified in this harness; the `references/*.md` pattern is the
proven convention used by other installed skills):

```
.agents/skills/semantic-seo-localization/
├── SKILL.md                          # orchestrator: overview, when to use, pipeline
│                                        order, gate rules, artifact paths
└── references/
    ├── entity-extraction.md          # stage 1
    ├── triple-extraction.md          # stage 2 and stage 5 (source pass, target pass)
    ├── target-market-seo.md          # stage 3
    ├── contextual-translation.md     # stage 4
    └── semantic-validation.md        # stage 6
```

`SKILL.md` is the only file invoked via the `Skill` tool. It reads each `references/*.md`
file at the appropriate pipeline step and follows its instructions in place, the same way
`ezovion-design` / `madebydesignesia-design` read `references/DESIGN.md` before writing
CSS.

## Pipeline

Orchestrator runs these stages in order, for one page/component/content unit at a time:

1. **Entity extraction & registry sync** (`references/entity-extraction.md`)
   - Extract entities (Person, Organization, Brand, Product, Place, Technology, Software,
     Concept, Event, Other) from the source content.
   - Read `docs/semantic-seo-localization/<locale>/entities.json` if it exists; cross-check
     extracted entities against it.
   - Append new entities with: canonical name, entity type, and a proposed
     locale-specific form (left as "same as canonical" when the entity should not be
     translated — e.g. brand/product names, URLs).
   - Canonical identity is always stored separately from the localized form; entity names
     are never auto-translated by default.

2. **Triple extraction — source pass** (`references/triple-extraction.md`)
   - Extract SPO (subject → predicate → object) triples from the English source content.
   - Score each with a Triple Prominence Score (0–100): centrality (0–30), specificity
     (0–20), entity importance (0–20), relationship strength (0–15), SEO/topical value
     (0–15).
   - Output a ranked markdown table, saved as
     `docs/semantic-seo-localization/<locale>/<page-id>/triples-source.md`.

3. **Target-market SEO adaptation** (`references/target-market-seo.md`)
   - Propose localized title/description/slug/keyword targets based on what target-market
     users actually search for — not a literal translation of the English keyword set.
   - If Google Search Console MCP tools are available and relevant, they may be used here
     to check real query/performance data for the target locale; this stage does not
     require them and must degrade gracefully to LLM-reasoning-only when unavailable.
   - Output saved as `docs/semantic-seo-localization/<locale>/<page-id>/seo-adaptation.md`.

4. **Contextual translation** (`references/contextual-translation.md`)
   - Translate the source content into the target language, using the entity registry
     (protect entity names) and the SEO adaptation output (use the locale's actual search
     terminology, not literal keyword translation).
   - Generalized to any target language (adapted from the Turkish-specific prompt in
     `translator.md`, with the language and any language-specific conventions passed in
     as parameters rather than hardcoded).
   - Preserves document structure, meaning, and tone; does not add unsupported
     information; maintains terminology consistency using the entity registry.
   - Output staged as a draft — not written to `messages/<locale>.json` yet.

5. **Triple extraction — target pass** (`references/triple-extraction.md`, re-run)
   - Same extraction logic as stage 2, run on the translated draft.
   - Output saved as
     `docs/semantic-seo-localization/<locale>/<page-id>/triples-target.md`.

6. **Semantic validation** (`references/semantic-validation.md`)
   - Compare the source triple set (stage 2) against the target triple set (stage 5).
   - Flag: triples present in source but missing in target (meaning loss), triples that
     appear altered/contradicted, and triples introduced in target with no source basis
     (hallucination).
   - Produce an alignment report with a pass/fail judgment and specific flagged triples,
     saved as
     `docs/semantic-seo-localization/<locale>/<page-id>/validation-report.md`.
   - If validation fails (meaning loss, contradiction, or hallucination detected), the
     orchestrator stops and reports the issue rather than proceeding to the review gate.

7. **Human review gate** (orchestrator-level, not a separate reference file)
   - Present: entities added/reused, both triple sets, the validation report, and the
     translated draft.
   - Only after explicit user approval does the orchestrator hand the approved
     translation off to be written into `messages/<locale>.json` (via
     `nextjs-i18n-migration`'s existing steps, or directly if run standalone).

## Data flow summary

```
source content (.tsx / messages/en.json)
  → entity-extraction.md   → docs/.../entities.json (persistent, cross-page)
  → triple-extraction.md   → docs/.../<page-id>/triples-source.md
  → target-market-seo.md   → docs/.../<page-id>/seo-adaptation.md
  → contextual-translation.md → (draft translation, in-memory/staged)
  → triple-extraction.md   → docs/.../<page-id>/triples-target.md
  → semantic-validation.md → docs/.../<page-id>/validation-report.md
  → [human review gate]
  → messages/<locale>.json (only on approval)
```

## Error handling / validation

- The semantic-validation stage is the safety net: a failed validation (dropped/altered
  meaning, hallucinated content) halts the pipeline before the human review gate rather
  than silently presenting a flawed translation as ready.
- Entity registry conflicts (same canonical name extracted with a different proposed
  entity type or localized form than what's already registered) are flagged for human
  resolution rather than silently overwritten.

## Testing / verification

No automated test suite (this is a prompt-based skill, not application code).
Verification approach: dry-run the full pipeline against one already-migrated page (e.g.
`/about`, migrated per recent commits) and manually inspect the generated artifacts
(`entities.json`, both triple reports, validation report) before trusting the skill on
new, not-yet-migrated pages.

## Out of scope for v1

- No database, no backend service, no job queue, no versioned semantic graph storage.
- No automatic translation of entity names (always human-reviewable, never silent).
- MCP usage (e.g. Google Search Console) is optional/best-effort in the target-market-seo
  stage only, never a hard dependency.
- Editing `nextjs-i18n-migration` to call this skill is a separate follow-up task, not
  part of this design.
