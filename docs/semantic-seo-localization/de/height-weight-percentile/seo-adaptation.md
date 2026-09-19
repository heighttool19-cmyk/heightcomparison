# Target-Market SEO Adaptation — height-weight-percentile (de)

## Source Analysis
Primary topic: calculating a person's height and weight percentile against
WHO and CDC population reference data, covering babies, toddlers, children,
and adults. Secondary topics: what a growth percentile means and how to
interpret it, how the calculator picks between WHO Child Growth Standards
and CDC Growth Charts by age, percentile breakdowns by age group (infants,
toddlers/kids, boys vs. girls, adults), NHANES adult reference data, and a
worked example calculation.

Key SEO-relevant English terms the source targets: "height percentile
calculator", "weight percentile calculator", "baby height percentile
calculator", "height percentile calculator for adults", "growth
percentile", "CDC growth charts", "WHO growth standards", "height
percentile calculator for boys/girls", "percentile calculator for kids".

## Entity Protection Check
Per `docs/semantic-seo-localization/de/entities.json`, the following
`translate: false` entities appear on this page and must stay verbatim in
the German text: WHO, CDC, CDC Growth Charts, WHO Child Growth Standards,
NHANES. None of these are translated in the proposed title/description
below.

## Localized Metadata
- Title: **Größen- und Gewichtsperzentil-Rechner für Babys, Kinder & Erwachsene**
- Description: **Berechnen Sie mit unserem Größen- und Gewichtsperzentil-Rechner das Wachstum. Inklusive Perzentilrechner für Babys und Größenperzentil-Rechner für Erwachsene.**
- Slug: `groessen-gewichts-perzentil-rechner` (proposed, not wired up — see note below)

## Target Keywords
| Keyword | Rationale (only if it differs from a literal translation) |
|---|---|
| Perzentilrechner | "Percentile" is a well-established loanword in German pediatric usage ("Perzentile"/"Perzentilenkurve"); German search behavior uses "Perzentilrechner" directly rather than a literal "Prozentrang-Rechner". |
| Größenperzentil | "Height percentile" — German pediatric sources say "Größenperzentil" (using "Größe", the idiomatic term for body height) rather than a literal "Höhenperzentil". |
| Gewichtsperzentil | "Weight percentile" as one German compound noun, matching how German growth-tracking content phrases it. |
| Wachstumsperzentile | "Growth percentile" — same compound-noun convention already established as a target keyword on the height-predictor page, kept consistent here. |
| Perzentile Baby berechnen | "Calculate baby percentile" — natural German phrasing puts the loanword "Perzentile" first, matching how parents actually search for infant growth checks. |
| Größenperzentil Erwachsene | "Height percentile for adults" — compound-noun-first German SEO phrasing over a literal "Perzentil für Erwachsene der Körpergröße". |
| CDC-Wachstumskurve | "CDC growth chart" — "Wachstumskurve" (growth curve) is the term German pediatric sources use for a growth chart; "CDC" itself stays untranslated per the entity registry. |

**Note on the slug:** per `nextjs-i18n-migration/SKILL.md` and the
`height-predictor` precedent, this project keeps a fixed page path across
all locales (`/de/height-weight-percentile-calculator`, not a translated
slug) — confirmed by `src/i18n/routing.ts` (`localePrefix: 'as-needed'`, no
per-locale pathnames configured). The slug above is proposed for future
reference only and is not wired up anywhere.

## Shared Metadata Namespace
This project keeps a shared top-level `metadata` namespace
(`messages/en.json`'s `metadata.heightWeightPercentileTitle` /
`metadata.heightWeightPercentileDescription`). The Title/Description above
ARE the final translated values for
`metadata.heightWeightPercentileTitle` and
`metadata.heightWeightPercentileDescription` in `messages/de.json` — they
do not go through the per-batch translation loop.
