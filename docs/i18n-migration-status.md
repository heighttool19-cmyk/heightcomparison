# i18n Multilingual Localization — Migration & Architectural Status

Tracking document for the multilingual expansion across the codebase. Purpose: give
whoever picks this up next (human or agent) an accurate, at-a-glance view of
what is fully localized, what is only partially routed, and what remains — so nobody
re-does finished work or assumes unfinished work is done.

**Last updated**: 2026-09-29 (after onboarding Swedish `sv` and Polish `pl` to 100% key parity, `/height-predictor` English H1 update, and blog routing completion).

**Supported Locales (10 total)**:
- `en` (English - default)
- `de` (German)
- `es` (Spanish)
- `fr` (French)
- `pt` (Portuguese)
- `nl` (Dutch)
- `ar` (Arabic - RTL)
- `it` (Italian)
- `sv` (Swedish)
- `pl` (Polish)

**How to use this file:** before starting work on any page or locale, check its row
below. Update this file as part of the same change whenever status
changes — this is a live tracker, not a one-time report.

---

## Legend

| Status | Meaning |
|---|---|
| ✅ Done | Routed under `[locale]`, all visible text in `messages/{en,de,es,fr,pt,nl,ar,it,sv,pl}.json`, completeness gate passed (100% key parity, 0 missing, 0 extra, 0 empty strings), `npx tsc --noEmit` verified. |
| 🟡 Routed only | Lives under `src/app/[locale]/...` (so localized URLs don't 404) but its content components still have hardcoded English strings — **not actually multilingual yet**. |
| ⬜ Not started | Still a flat route under `src/app/...` (no `[locale]` segment at all). Visiting localized route URLs currently 404s or falls back to English with no translation path. |

---

## Global chrome (shared across every page)

| Item | Status | Notes |
|---|---|---|
| `src/i18n/config.ts` | ✅ Done | Central DRY source of truth (`SUPPORTED_LOCALES`, `ALL_LOCALE_CODES`, `DEFAULT_LOCALE`, date formatters, direction LTR/RTL, canonical & hreflang helpers). |
| `src/i18n/routing.ts`, `src/i18n/request.ts` | ✅ Done | `locales: ALL_LOCALE_CODES` (10 languages), `defaultLocale: 'en'`, `localePrefix: 'as-needed'`, `localeDetection: false`. |
| `src/middleware.ts` | ✅ Done | Regex matcher covers all 10 locales: `'/(de|en|es|fr|pt|nl|ar|it|sv|pl)/:path*'`. |
| `src/app/layout.tsx` (root) | ✅ Done | No `<Navbar>`/`<Footer>`/`<NextIntlClientProvider>` here — correct per the migration skill. |
| `src/app/[locale]/layout.tsx` | ✅ Done | Wraps children in `<NextIntlClientProvider>`, sets dynamic `dir="rtl"` / `"ltr"`, renders `<Navbar>`/`<Footer>`. |
| `src/components/Navbar.tsx` | ✅ Done | Uses `useTranslations('nav')`. |
| `src/components/layout/Footer.tsx` | ✅ Done | Uses `useTranslations('footer')`. |
| `src/components/LanguageSwitcher.tsx` | ✅ Done | Generic `getCleanPath`/`getTargetUrl`, dynamically loops through all 10 `SUPPORTED_LOCALES` with flags and native labels. |
| `messages/*.json` (10 files) | ✅ Done | 13 namespaces (`common`, `nav`, `footer`, `about`, `privacy`, `heightPredictor`, `heightWeightPercentile`, `idealBodyWeight`, `heightDifference`, `averageHeightByCountry`, `metadata`, `blogs`, `blogPost`), 1,184 leaf keys per locale, 100% key parity across all 10 languages. |
| `docs/semantic-seo-localization/` | ✅ Done | Entity registries in place for all 9 non-English locales (`ar`, `de`, `es`, `fr`, `it`, `nl`, `pl`, `pt`, `sv`), protecting clinically recognized entities, formulas, and brand names. |
| Sanity Studio Multilingual | ✅ Done | `src/sanity/languages.ts` automatically adapts to `SUPPORTED_LOCALES`; Post schema supports all 9 target languages; Auto-Translate custom action active via `/api/sanity/auto-translate`. |

---

## Per-page status

| Route | Status | Localized file(s) | Messages namespace | Notes |
|---|---|---|---|---|
| `/about` | ✅ Done | `src/app/[locale]/about/page.tsx` | `about` + `metadata.about*` | Fully localized across all 10 locales. |
| `/privacy` | ✅ Done | `src/app/[locale]/privacy/page.tsx` | `privacy` + `metadata.privacy*` | Fully localized across all 10 locales. |
| `/height-predictor` | ✅ Done | `src/app/[locale]/height-predictor/page.tsx` + client components below | `heightPredictor` + `metadata.heightPredictor*` | Fully localized across all 10 locales. English H1 updated in `en.json` (`heightPredictor.intro.title`). |
| `/` (home / height comparison dashboard) | 🟡 Routed only | `src/app/[locale]/page.tsx` exists and renders, but `src/components/HomeContent.tsx` (749 lines, SEO articles/FAQ) and `src/components/DynamicHeightDashboard.tsx` have **no `useTranslations`/`getTranslations` calls at all** — 100% hardcoded English still. | none yet | **Not actually multilingual.** Visiting localized routes renders the localized Navbar/Footer but English page content. Primary remaining landing-page gap. |
| `/average-height-by-country` | ✅ Done | `src/app/[locale]/average-height-by-country/page.tsx` + 6 client components below | `averageHeightByCountry` + `metadata.averageHeightByCountry*` | Fully localized across all 10 locales. |
| `/height-difference-calculator` | ✅ Done | `src/app/[locale]/height-difference-calculator/page.tsx` + 4 client components below | `heightDifference` + `metadata.heightDifference*` | Fully localized across all 10 locales. |
| `/height-weight-percentile-calculator` | ✅ Done | `src/app/[locale]/height-weight-percentile-calculator/page.tsx` + 4 client components below | `heightWeightPercentile` + `metadata.heightWeightPercentile*` | Fully localized across all 10 locales. |
| `/ideal-body-weight-calculator` | ✅ Done | `src/app/[locale]/ideal-body-weight-calculator/page.tsx` + 2 client components below | `idealBodyWeight` + `metadata.idealBodyWeight*` | Fully localized across all 10 locales. |
| `/blogs` | ✅ Done | `src/app/[locale]/blogs/page.tsx` | `blogs` + `metadata.blogs*` | Routed under `[locale]`, localized headings, cards, and date formatting (`formatLocalizedDate`). |
| `/blog/[slug]` | ✅ Done | `src/app/[locale]/blog/[slug]/page.tsx` | `blogPost` | Routed under `[locale]`, localized ToC & labels, fetches localized Sanity post data. |
| `/image-to-height` | ⬜ Not started | Flat route (`src/app/image-to-height/page.tsx`) | none | Last remaining calculator page to migrate. |
| `/s/[id]` (share redirect) | ⬜ Not started | Flat route | none | Low priority — redirect-only page, minimal/no user-visible copy. |
| `/studio/[[...index]]` (Sanity Studio) | ⬜ Not applicable | Flat route | none | Internal CMS admin tool, not a public-facing page — out of scope for localization. |

---

## `/average-height-by-country` detailed breakdown (for reference — this page is done)

| Piece | Status |
|---|---|
| `src/app/[locale]/average-height-by-country/page.tsx` (main SEO content, TOC, FAQ, references) | ✅ Done (`getTranslations('averageHeightByCountry')`) — restructured from a monolithic `'use client'` page into an async server component, matching the pattern of all 4 prior calculator pages. |
| `src/components/average-height-by-country/AverageHeightTable.tsx` (search + sortable global table) | ✅ Done (`useTranslations('averageHeightByCountry...')`) |
| `src/components/average-height-by-country/TallestCountriesBars.tsx` / `ShortestCountriesBars.tsx` (tab-switching bar charts) | ✅ Done |
| `src/components/average-height-by-country/TallestVsShortestChart.tsx` (grouped bar chart with 3 view tabs) | ✅ Done |
| `src/components/average-height-by-country/HeightDistributionChart.tsx` (bell curve + region map) | ✅ Done — `REGIONS`/`BELL_CONFIG` module-level constant array labels (`name`, `ex`, `label`, `pctLabel`) moved into the `averageHeightByCountry` namespace rather than left as raw English constants, matching the module-level-array bug class documented for `height-weight-percentile-calculator`. |
| `src/components/average-height-by-country/ChartHelpers.tsx` (shared `Bars`/`Tabs`/SVG helpers) | ✅ Done — presentational only, no hardcoded strings of its own once callers pass translated labels/props. |
| `src/constants/averageHeight.ts` (`AVERAGE_HEIGHT_TOC`, `AVERAGE_HEIGHT_FAQ`) | ✅ Superseded — content moved into `messages/*.json` (`averageHeightByCountry.toc[]`, `averageHeightByCountry.faq[]`); file left in place but unused by the new page. |
| `src/constants/schemas/averageHeightByCountry.ts` (JSON-LD) | ⬜ Deliberately English-only | Matches precedent from all prior migrations. |
| Cross-links from Navbar/Footer/`HomeContent.tsx`/sitemap | ✅ No changes needed | Confirmed plain unprefixed hrefs, same pattern as prior pages. |
| `npm run build` | ✅ Verified | 0 TypeScript errors, all 10 app routes generated including `/[locale]/average-height-by-country`. See "Environment note" below — the first several build attempts failed on intermittent `.next` manifest/rename ENOENT errors, root-caused (via `superpowers:systematic-debugging`) to a stray `next dev` server left running against this same project directory by an earlier session, racing on the shared `.next` output folder. Killing that process and rebuilding cleanly resolved it immediately and reproducibly — not a code defect in this migration. |

Notable fixes/decisions made during translation that weren't in the
original English strings:
- Resolved the same entity registry conflict class as the 4 prior pages: `Average Height by Country` was registered `translate: false`, but the already-shipped nav/footer German label uses "Durchschnittsgröße nach Land" — updated to `translate: true`, same resolution pattern.
- Added 10 new entities: `NCD Risk Factor Collaboration`, `World Population Review`, `Robert Wadlow`, `Sultan Kösen`, `Chandra Bahadur Dangi`, `Zeng Jinlian`, `Rumeysa Gelgi`, `Jyoti Amge`, `Guinness World Records`, `American Horror Story`. Individual country names (Netherlands, Japan, etc.) were deliberately NOT registered as entities — they translate as normal prose place names, consistent with how prior pages handled place names.
- Restructured the References section into 4 nested sub-groups (`primarySources`, `usGovernment`, `peerReviewed`, `unBodies`) matching the page's actual 4-subheading structure, rather than one flat list.
- Consolidated several fragment-concatenated sentences (bar-chart tab labels, three "highlighted word + sentence" spans, two link-fragment paragraphs) into single `t.rich`/ICU-placeholder-ready keys — same bug class documented for `height-weight-percentile-calculator` and `ideal-body-weight-calculator`.
- **Known pre-existing content bug, NOT fixed (flagged for a human decision):** this page's References section cites papers about ideal body weight formulas (Devine, Robinson, Pai, Janmahasatian) and WHO/CDC growth-chart methodology — content that belongs on `/ideal-body-weight-calculator` or `/height-weight-percentile-calculator`, not `/average-height-by-country`. Confirmed by reading the live English source (`src/app/average-height-by-country/page.tsx` lines 790-798 prior to deletion) — this is a copy-paste bug in the original English content, not a translation-pipeline error. Preserved verbatim in German per the "no rewording" migration rule. Someone should decide the correct citation list and fix both locales together.

### Environment note: intermittent build failures from a stray dev server

While verifying this page's build, `npm run build` failed 4 times in a row with different transient errors (`ENOENT` opening `.next/server/pages-manifest.json`, then a failed `rename` of `.next/export/500.html`, alternating). Blind retries didn't help. Running `superpowers:systematic-debugging` surfaced the actual cause in one step: a `next dev` server (`npm run dev`, ~1.3 GB resident) was already running against this exact project directory from an earlier session/subagent that had been asked to "spot-check via a dev server" and never shut it down. A live dev server and a production build write to the same `.next` directory concurrently, which explains the alternating failure signatures perfectly. Killing the dev server process tree and rebuilding with nothing else touching `.next` succeeded immediately. **Lesson for future migrations: always confirm no dev server is running before troubleshooting a flaky build, and always stop any dev server a task starts for verification before finishing that task.**

## `/height-predictor` detailed breakdown (for reference — this page is done)

| Piece | Status |
|---|---|
| `src/app/[locale]/height-predictor/page.tsx` (main SEO content, TOC, FAQ, references) | ✅ Done |
| `src/components/height-predictor/KhamisRocheCalculator.tsx` | ✅ Done (`useTranslations('heightPredictor.khamisRocheCalculator')`) |
| `src/components/height-predictor/MidParentalCalculator.tsx` | ✅ Done (`useTranslations('heightPredictor.midParentalCalculator')`) |
| `src/components/height-predictor/HeightConverter.tsx` | ✅ Done (`useTranslations('heightPredictor.heightConverter')`) |
| `src/components/HeightCharts.tsx` (rendered as `DynamicHeightCharts`) | ✅ Done — **initially missed on the first pass**, added after the user flagged it; see `docs/semantic-seo-localization/de/height-predictor/validation-report.md` "Update (batch 15 added)" note. |
| `src/components/GrowthPlateExplainer.tsx` (rendered as `DynamicGrowthPlateExplainer`) | ⬜ **Not checked / not migrated.** It's imported in `DynamicChildHeightIslands.tsx` but every call site in `page.tsx` is commented out (`{/* <DynamicGrowthPlateExplainer /> */}`), so it currently renders nothing on this page. **Flagged as a known gap** — if it's ever un-commented, it needs the same treatment as `HeightCharts.tsx` first. |
| `src/constants/childHeight.ts` (`CHILD_HEIGHT_QA`, `CHILD_HEIGHT_TOC`) | ✅ Superseded — content moved into `messages/*.json` (`heightPredictor.faq[]`, `heightPredictor.toc[]`); file left in place but unused (confirmed via grep it had no other importers). |
| `src/constants/schemas/heightPredictor.ts` (JSON-LD) | ⬜ Deliberately English-only | Matches `about`/`ABOUT_SCHEMA` precedent — no `de` structured-data variant exists anywhere in the project yet. |
| Cross-links to `/height-predictor` from Navbar/Footer/other pages | ✅ No changes needed | Confirmed they use plain unprefixed hrefs and that pattern already works for `/about`. |

---

## `/height-weight-percentile-calculator` detailed breakdown (for reference — this page is done)

| Piece | Status |
|---|---|
| `src/app/[locale]/height-weight-percentile-calculator/page.tsx` (main SEO content, TOC, FAQ, references) | ✅ Done (`getTranslations('heightWeightPercentile')`) |
| `src/components/height-weight-percentile-calculator/HeightPercentileTool.tsx` | ✅ Done (`useTranslations('heightWeightPercentile.tool')`, called in the module-level `BellCurve`/`ShareCard`/main component) |
| `src/components/height-weight-percentile-calculator/BellCurveIllustration.tsx` | ✅ Done (`useTranslations('heightWeightPercentile.bellCurveIllustration')`) |
| `src/components/height-weight-percentile-calculator/WHOvsCDCVisual.tsx` | ✅ Done (`useTranslations('heightWeightPercentile.whoVsCdc')`, wired in both `SmallChart` and the main export — renamed a `.map(t => ...)` loop variable to `tl`/`tick` to avoid shadowing the translation function) |
| `src/components/height-weight-percentile-calculator/ExampleCalculationVisual.tsx` | ✅ Done (`useTranslations('heightWeightPercentile.exampleVisual')` in `PercentileBar`, `CDCChart`, and the main export) — fixed a latent bug where a legend item's `label.startsWith("Sample")` string check would have broken once "Sample: ..." was translated to German; replaced with an explicit `isSample: boolean` flag. |
| `src/constants/percentile.ts` (`PERCENTILE_FAQ`, `PERCENTILE_TOC`) | ✅ Superseded — content moved into `messages/*.json` (`heightWeightPercentile.faq[]`, `heightWeightPercentile.toc[]`); file left in place but unused by the new page. |
| `src/constants/schemas/percentile.ts` (JSON-LD) | ⬜ Deliberately English-only | Matches `about`/`height-predictor` precedent. |
| Cross-links from Navbar/Footer/`HomeContent.tsx`/sitemap | ✅ No changes needed | Confirmed plain unprefixed hrefs, same pattern as `/height-predictor`. |
| `npm run build` | ✅ Verified | 0 TypeScript errors, all 13 routes generated. Both `/height-weight-percentile-calculator` (en) and `/de/height-weight-percentile-calculator` manually checked via `curl` against a local dev server — correct `<title>`, translated H1/FAQ heading, correct hreflang alternates, no leaked `heightWeightPercentile.*` raw keys, entity-protected terms (WHO/CDC full names) verbatim in the German output. |

Notable fixes made during translation that weren't in the original English strings:
- Consolidated two fragment-concatenation sentences (`tool.interpretationBefore/Of/Aged/In/PlacesYou/Range` and an `exampleVisual` equivalent) into single ICU placeholder strings — the original fragment approach breaks German word order.
- Added an `ordinalSuffix`/`percentileOrdinalSuffix` key per namespace (`"th"` in English, `"."` in German) since German ordinals don't use a letter suffix.
- Found and fixed a missed-extraction gap: `ExampleCalculationVisual.tsx`'s `ZONES` array percentile-range labels ("Below 10th", "10th–25th", etc.) weren't in the first extraction pass — caught during TSX wiring, not during the semantic-seo-localization pipeline itself (worth remembering for future pages: re-scan module-level constant arrays for user-visible `label` fields, not just JSX literals).

---

## `/ideal-body-weight-calculator` detailed breakdown (for reference — this page is done)

| Piece | Status |
|---|---|
| `src/app/[locale]/ideal-body-weight-calculator/page.tsx` (main SEO content, TOC, FAQ, references) | ✅ Done (`getTranslations('idealBodyWeight')`) |
| `src/components/ideal-body-weight-calculator/IdealWeightInteractive.tsx` | ✅ Done (`useTranslations('idealBodyWeight.tool')`) — fixed the `difference` readout (`+X kg above` / `X kg below` / `Within ideal range`) which was built as raw English string concatenation in the calculation function; now uses `t()` with `{amount}` placeholders. |
| `src/components/ideal-body-weight-calculator/HealthyWeightRange.tsx` | ✅ Done (`useTranslations('idealBodyWeight.healthyWeightRange')`, wired in both the `WeightTable` sub-component and the main export) |
| `src/constants/idealWeight.ts` (`IBW_TOC`, `IBW_FAQ_SCA`; `IBW_FAQ` was already unused dead code, untouched) | ✅ Superseded — content moved into `messages/*.json` (`idealBodyWeight.toc[]`, `idealBodyWeight.faq[]`); file left in place but unused by the new page. |
| `src/constants/schemas/idealBodyWeight.ts` (JSON-LD) | ⬜ Deliberately English-only | Matches `about`/`height-predictor`/`height-weight-percentile-calculator` precedent. |
| Cross-links from Navbar/Footer/`HomeContent.tsx`/sitemap | ✅ No changes needed | Confirmed plain unprefixed hrefs, same pattern as prior pages. |
| `npm run build` | ✅ Verified | 0 TypeScript errors, all 12 routes generated. Both `/ideal-body-weight-calculator` (en) and `/de/ideal-body-weight-calculator` manually checked via `curl` against a local dev server — correct `<title>`, translated H1/UI strings, correct hreflang alternates, no leaked `idealBodyWeight.*` raw keys, entity-protected formula names (Devine/Robinson/Hamwi/Miller) verbatim with correct German grammatical suffixes. |

Notable fixes/decisions made during translation that weren't in the
original English strings:
- Resolved an entity registry conflict: `Ideal Body Weight Calculator` was registered `translate: false`, but the already-shipped nav/footer German label uses "Idealgewichts-Rechner" — updated to `translate: true`, same resolution pattern already applied to `Height Predictor`. See `docs/semantic-seo-localization/de/entities.json`.
- Added a new entity: `Miller formula` (appears only in the `HealthyWeightRange.tsx` reference tables, not the main page body).
- Consolidated the intro's 6-fragment description (separate keys for the IBW term + Devine/Robinson/Hamwi spans) into one `t.rich`-tagged sentence — same fix as the percentile page's fragmented-key issue.
- Preserved (did not "fix") a pre-existing minor arithmetic-display redundancy in `IdealWeightInteractive.tsx`'s difference readout (a negative subtraction result displayed alongside the word "below") — out of scope for a translation pass; documented in the validation report instead.

---

## `/height-difference-calculator` detailed breakdown (for reference — this page is done)

| Piece | Status |
|---|---|
| `src/app/[locale]/height-difference-calculator/page.tsx` (main SEO content, TOC, FAQ, references) | ✅ Done (`getTranslations('heightDifference')`) |
| `src/components/height-difference-calculator/CalculateHeightDifference.tsx` | ✅ Done (`useTranslations('heightDifference.tool')`) — fixed a bug where the `HeightInput` sub-component reused its translatable `label` prop ("Person 1"/"Person 2") as both display text and an `id`/`htmlFor` attribute prefix (`${label}-cm`); decoupled into a separate stable `idPrefix` prop ("person-1"/"person-2") so translation cannot affect DOM attribute wiring. Verified via `curl` that `id="person-1-cm"` is identical on both the English and German pages. |
| `src/components/height-difference-calculator/CoupleHeightDifferenceCalculator.tsx` | ✅ Done (`useTranslations('heightDifference.coupleCalc')`) — used `t.rich` for the bottom result sentence (bold span around the delta) and made the "Partner 1"/"Partner 2" preset labels shared translated constants instead of repeating the same literal string across all three presets. |
| `src/components/height-difference-calculator/HeightDifferenceChart.tsx` | ✅ Done (`useTranslations('heightDifference.chartTable')`) — only table headers translated; the reference chart's numeric height/percentage data rows are locale-invariant (pure numbers + universal unit abbreviations) and were left as literal component data, matching this project's established convention. |
| `src/components/height-difference-calculator/VisualHeightComparison.tsx` | ✅ Done (`useTranslations('heightDifference.visualComp')`) |
| `src/constants/heightDifference.ts` (`HEIGHT_DIFFERENCE_TOC`, `HEIGHT_DIFFERENCE_FAQ`) | ✅ Superseded — content moved into `messages/*.json` (`heightDifference.toc[]`, `heightDifference.faq[]`); file left in place but unused by the new page. |
| `src/constants/schemas/heightDifference.ts` (JSON-LD) | ⬜ Deliberately English-only | Matches precedent from all three prior calculator-page migrations. |
| Cross-links from Navbar/Footer/`HomeContent.tsx`/sitemap | ✅ No changes needed | Confirmed plain unprefixed hrefs, same pattern as prior pages. |
| `npm run build` | ✅ Verified | 0 TypeScript errors, all 11 routes generated. Both `/height-difference-calculator` (en) and `/de/height-difference-calculator` manually checked via `curl` against a local dev server — correct `<title>`, translated H1/FAQ heading/UI strings, correct hreflang alternates, no leaked `heightDifference.*` raw keys, stable input-element IDs across both locales. |

Notable fixes/decisions made during translation that weren't in the
original English strings:
- Resolved a fourth instance of the same entity registry conflict class: `Height Difference Calculator` was registered `translate: false`, but the already-shipped nav/footer German label uses "Höhendifferenz-Rechner" — updated to `translate: true`, same resolution pattern already applied to `Height Predictor` and `Ideal Body Weight Calculator`.
- Translated "male-female couples" literally as "Mann-Frau-Paare" rather than the conceptually adjacent but not identical term "heterosexual couples" — avoids introducing a sociological framing the source didn't use.
- Fixed the `HeightInput` label/id coupling bug described above — a genuine latent bug (not just a translation-fragility issue) that this migration surfaced and fixed.

---

## Known gaps / risks to flag before calling the branch "done"

1. **Home page (`/`) is the biggest remaining gap.** It's the primary landing page and is currently only *routed* under `[locale]`, not actually translated. `HomeContent.tsx` alone is 749 lines, plus `DynamicHeightDashboard.tsx`.
2. **`GrowthPlateExplainer.tsx`** is currently dead code on the height-predictor page (commented out) but exists and is wired into `DynamicChildHeightIslands.tsx`. If someone re-enables it without checking this file first, it will ship untranslated.
3. **One calculator page** (`image-to-height`) is entirely untouched — not even routed under `[locale]` yet. It will need the full `nextjs-i18n-migration` + `semantic-seo-localization` pipeline, similar in scope to what the five completed calculator pages went through.
4. **`FaqAccordion.tsx`'s hardcoded "HELP CENTER" badge and English default `title`/`description` props** — a pre-existing gap (shared component, not introduced by any single page). All calculator pages pass a translated `title`/empty `description`, but the "HELP CENTER" eyebrow badge inside the component itself is still English-only on every locale. Worth fixing in the shared component directly rather than per-page.
5. **Sanity CMS Post Translations** — Studio auto-translate endpoint (`/api/sanity/auto-translate`) and Sanity Studio Action are live. Blog posts can be translated into all 9 target languages on-demand directly in Sanity Studio or via batch script.
6. **JSON-LD schemas are English-only project-wide** — this is a consistent, deliberate choice (not an oversight) following the `about` page's precedent, but worth re-confirming with a human before treating it as permanent policy.

---

## Suggested order for remaining work

1. Home page (`/`) — highest traffic, biggest content volume, already routed so no routing risk.
2. The one remaining calculator page (`image-to-height`) — same pattern as the five completed calculator pages, mechanical repeat of the established process.
3. Fix `FaqAccordion.tsx`'s hardcoded "HELP CENTER" badge (affects all locales, all pages using it) — small, isolated fix.
4. Decide the correct References citations for `/average-height-by-country` (currently cites the wrong papers, see its detailed breakdown above) and fix both `en`/`de` — small, isolated content fix, independent of i18n.
5. `/s/[id]` — trivial, do whenever convenient.
6. Revisit whether JSON-LD schemas should get localized variants (policy decision, not urgent).

