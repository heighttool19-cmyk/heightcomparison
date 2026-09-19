# Target-Market SEO Adaptation — height-difference-calculator (de)

## Source Analysis
Primary topic: calculating the absolute and percentage height difference
between two people. Secondary topics: couple height difference norms,
a quick-reference chart of common height pairings, a proportional visual
comparison, and unit conversion (cm vs. feet/inches).

Key SEO-relevant English terms the source targets: "height difference
calculator", "difference in height calculator", "couple height
difference calculator", "height difference percentage", "height
difference chart".

## Entity Protection Check
Per `docs/semantic-seo-localization/de/entities.json`, "Height Difference
Calculator" appears on this page. Its registry entry had a
`translate: false`/live-nav-label conflict (same class of conflict
already found and resolved for "Height Predictor" and "Ideal Body Weight
Calculator") — resolved to `translate: true`, localized form
"Höhendifferenz-Rechner", matching the already-shipped nav/footer German
label. No other registered entities (no WHO/CDC/formula names) appear on
this page.

## Localized Metadata
- Title: **Höhendifferenz-Rechner - Größenunterschied berechnen & Tabelle**
- Description: **Berechnen Sie den Größenunterschied mit unserem Höhendifferenz-Rechner. Inklusive Paar-Größenunterschied-Rechner und Höhendifferenz-Tabelle.**
- Slug: `hoehendifferenz-rechner` (proposed, not wired up — see note below)

## Target Keywords
| Keyword | Rationale (only if it differs from a literal translation) |
|---|---|
| Höhendifferenz-Rechner | Matches the already-shipped nav/footer German label (registry-resolved localized form). |
| Größenunterschied berechnen | "Calculate height difference" — German search behavior favors "Größenunterschied" (size/height difference) over a literal "Höhenunterschied", which reads more like elevation/altitude difference in German than person-to-person height. |
| Größenunterschied Paar | "Couple height difference" — natural German compound-noun-first phrasing, matching the pattern already established for other calculator pages ("Idealgewicht Frauen", "Wie groß wird mein Kind"). |
| Größenunterschied Prozent | "Height difference percentage" — German searchers commonly append "Prozent" after the base term rather than using a literal "prozentualer Größenunterschied" for shorter queries. |
| Körpergröße Unterschied Tabelle | "Height difference table/chart" — targets the reference-lookup search intent distinct from the calculator tool itself. |

**Note on the slug:** per `nextjs-i18n-migration/SKILL.md` and the
precedent from the three prior calculator-page migrations, this project
keeps a fixed page path across all locales
(`/de/height-difference-calculator`, not a translated slug) — confirmed
by `src/i18n/routing.ts` (`localePrefix: 'as-needed'`, no per-locale
pathnames configured). The slug above is proposed for future reference
only and is not wired up anywhere.

## Shared Metadata Namespace
This project keeps a shared top-level `metadata` namespace
(`messages/en.json`'s `metadata.heightDifferenceTitle` /
`metadata.heightDifferenceDescription`). The Title/Description above ARE
the final translated values for those two keys in `messages/de.json` —
they do not go through the per-batch translation loop.
