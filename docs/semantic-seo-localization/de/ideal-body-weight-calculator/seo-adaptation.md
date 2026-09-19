# Target-Market SEO Adaptation — ideal-body-weight-calculator (de)

## Source Analysis
Primary topic: calculating Ideal Body Weight (IBW) using the Devine,
Robinson, and Hamwi clinical formulas, for men, women, and pediatric
patients. Secondary topics: how each formula differs, sex-specific
examples, Adjusted Body Weight for clinical dosing, Percent IBW
interpretation, healthy weight range, and IBW vs. BMI.

Key SEO-relevant English terms the source targets: "ideal body weight
calculator", "ideal weight calculator in kg", "adjusted ideal body weight
calculator", "ideal body weight calculator for women/men", "percent ideal
body weight", "Devine formula", "Robinson formula", "Hamwi formula",
"healthy weight range".

## Entity Protection Check
Per `docs/semantic-seo-localization/de/entities.json`, the following
entities appear on this page: Devine formula, Robinson formula, Hamwi
formula, Miller formula (all `translate: false`, kept verbatim), CDC, CDC
Growth Charts, WHO, WHO Child Growth Standards (all `translate: false`),
and Ideal Body Weight Calculator (`translate: true`, localized form
"Idealgewichts-Rechner" — resolved from a registry conflict with the
already-shipped nav/footer German label, same resolution already applied
to "Height Predictor"). The generic clinical term "Ideal Body Weight
(IBW)" is NOT an entity — it is translated as "Idealgewicht (IBW)",
matching the already-shipped `common.idealBodyWeight` translation
("Idealgewicht").

## Localized Metadata
- Title: **Idealgewicht berechnen & Adjusted-Body-Weight-Rechner**
- Description: **Berechnen Sie mit unserem Idealgewichts-Rechner in kg Ihr Idealgewicht. Inklusive Adjusted-Body-Weight-Rechner für Männer und Frauen.**
- Slug: `idealgewichts-rechner` (proposed, not wired up — see note below)

## Target Keywords
| Keyword | Rationale (only if it differs from a literal translation) |
|---|---|
| Idealgewichts-Rechner | Matches the already-shipped nav/footer German label (registry-resolved localized form) rather than a literal "Ideales-Körpergewicht-Rechner". |
| Idealgewicht berechnen | "Calculate ideal weight" — natural German verb-first search phrasing, matching how German users phrase calculator searches (parallel to "Körpergröße berechnen" already used as a height-predictor keyword). |
| Idealgewicht Frauen / Idealgewicht Männer | "Ideal weight women/men" — German searchers use the bare compound noun + sex rather than a literal "Idealgewichts-Rechner für Frauen" for shorter queries. |
| Adjusted Body Weight Rechner | Clinical dosing term "Adjusted Body Weight" is commonly kept in English even in German clinical/pharmacy content (borrowed term), so this stays as a mixed English-German compound rather than a forced literal translation like "angepasstes Idealgewicht". |
| Idealgewicht Tabelle | "Ideal weight table" — targets users searching for the reference/lookup-table use case (the Healthy Weight by Height tables), a distinct search intent from the calculator itself. |
| Idealgewichtsformel | "Ideal weight formula" — German compound noun for users searching for the underlying formulas (Devine/Robinson/Hamwi) rather than the calculator tool. |

**Note on the slug:** per `nextjs-i18n-migration/SKILL.md` and the
`height-predictor`/`height-weight-percentile-calculator` precedent, this
project keeps a fixed page path across all locales
(`/de/ideal-body-weight-calculator`, not a translated slug) — confirmed by
`src/i18n/routing.ts` (`localePrefix: 'as-needed'`, no per-locale
pathnames configured). The slug above is proposed for future reference
only and is not wired up anywhere.

## Shared Metadata Namespace
This project keeps a shared top-level `metadata` namespace
(`messages/en.json`'s `metadata.idealBodyWeightTitle` /
`metadata.idealBodyWeightDescription`). The Title/Description above ARE
the final translated values for those two keys in `messages/de.json` —
they do not go through the per-batch translation loop.
