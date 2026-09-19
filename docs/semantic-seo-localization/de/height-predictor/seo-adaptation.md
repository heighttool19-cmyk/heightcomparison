# Target-Market SEO Adaptation — height-predictor (de)

## Source Analysis
Primary topic: predicting a child's/teen's future adult height using the
Khamis-Roche method and the Mid-Parental Height Formula. Secondary topics:
growth charts/percentiles, puberty growth timelines for boys and girls,
clinical bone-age prediction methods (Bayley-Pinneau, Roche-Wainer-Thissen),
factors affecting height (genetics, nutrition, sleep, exercise), and
accuracy/limitations of height calculators.

Key SEO-relevant English terms the source targets: "height predictor",
"height calculator", "how tall will my child be", "how tall will I be",
"Khamis-Roche method", "Mid-Parental Height Formula", "growth charts",
"growth percentile", "bone age", "puberty growth spurt".

## Entity Protection Check
Per `docs/semantic-seo-localization/de/entities.json`, the following
`translate: false` entities appear on this page and must stay verbatim in
the German text: Khamis-Roche formula / Khamis-Roche Method, Mid-Parental
method / Mid-Parental Height Formula, Bayley-Pinneau Method,
Roche-Wainer-Thissen Method, CDC, CDC Growth Charts, WHO, Height Predictor,
HeightComparison, Height Comparison Calculator, Average Height by Country,
Height Difference Calculator, Height Weight Percentile Calculator, Ideal
Body Weight Calculator, Image to Height, Devine formula, Robinson formula,
Hamwi formula. None of these are translated in the proposed title/description
below.

## Localized Metadata
- Title: **Größenrechner: Erwachsenengröße vorhersagen (Kinder-Größenrechner)**
- Description: **Berechnen Sie mit unserem Größenrechner die erwartete Erwachsenengröße Ihres Kindes. Der Größenvorhersage-Rechner nutzt wissenschaftlich anerkannte Methoden wie Khamis-Roche zur Vorhersage der Körpergröße.**
- Slug: `groessenrechner-kinder` (proposed, not wired up — see note below)

## Target Keywords
| Keyword | Rationale (only if it differs from a literal translation) |
|---|---|
| Größenrechner | German searchers overwhelmingly use the compound noun "Größenrechner" rather than a literal "Höhenvorhersage-Werkzeug" translation of "height predictor tool". |
| Wie groß wird mein Kind | Natural German phrasing of "how tall will my child be" — German keeps the modal word order "wie groß wird" rather than a literal "wie groß wird mein Kind sein" construction. |
| Erwachsenengröße vorhersagen | "Predict adult height" — compound-noun-first pattern ("Erwachsenengröße") is standard German SEO phrasing over the more literal "Erwachsenenhöhe vorhersagen" (Höhe reads awkwardly for body height in German; "Größe" is the idiomatic term for a person's height). |
| Wachstumskurve / Wachstumsperzentile | "Growth chart / growth percentile" — "Wachstumskurve" (growth curve) is the term German pediatric sources actually use, more than a literal "Wachstumsdiagramm". |
| Khamis-Roche Methode | Kept as the entity-protected method name with German grammatical suffix "Methode" appended naturally, not translated. |
| Pubertätswachstumsschub | "Puberty growth spurt" as one German compound noun, matching how German health content phrases this concept. |
| Körpergröße berechnen | "Calculate height" — generic high-volume German search term for height calculators generally, used to complement the more specific "Größenrechner". |

**Note on the slug:** per `nextjs-i18n-migration/SKILL.md`, this project keeps
a fixed page path across all locales (`/de/height-predictor`, not a
translated slug) — confirmed by `src/i18n/routing.ts` (`localePrefix:
'as-needed'`, no per-locale pathnames configured) and by the `about`
migration, which did not introduce a localized slug. The slug above is
proposed for future reference only and is not wired up anywhere.

## Shared Metadata Namespace
This project keeps a shared top-level `metadata` namespace
(`messages/en.json`'s `metadata.heightPredictorTitle` /
`metadata.heightPredictorDescription`). The Title/Description above ARE the
final translated values for `metadata.heightPredictorTitle` and
`metadata.heightPredictorDescription` in `messages/de.json` — they do not go
through the per-batch translation loop.
