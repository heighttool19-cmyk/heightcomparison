# Homepage Content & SEO Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved homepage content updates, 8 interactive data visual components (V1–V8), schema updates, 301 redirects, and the `/contact` page + API endpoint in strict accordance with `06-seo-specification.pdf`, `01-homepage.html`, and `05-developer-handbook.htm`, while keeping existing `<title>`, `H1`, URLs, and current chart/dashboard logic completely intact and untouched.

**Architecture:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4. Content and visuals are rendered directly in server HTML (SSR) for optimal crawlability and zero layout shift. Visual components use accessible semantic `<figure>`, `<figcaption>`, `role="img"`, and `aria-label` tags.

**Tech Stack:** Next.js 15.5, React 19, TypeScript, Tailwind CSS v4, Framer Motion 12, Lucide React, Bun test runner.

**Specs:** 
- `temp/docs/Fix/Homepage/homepage-developer-pack/homepage-developer-pack/06-seo-specification.pdf` (SEO & Technical Spec)
- `temp/docs/Fix/Homepage/homepage-developer-pack/homepage-developer-pack/01-homepage.html` (Copy & Schema Source of Truth)
- `temp/docs/Fix/Homepage/homepage-developer-pack/homepage-developer-pack/02-homepage-design-reference.html` (Visual Reference)
- `temp/docs/Fix/Homepage/homepage-developer-pack/homepage-developer-pack/04-contact.html` (Contact Page Spec)
- `temp/docs/Fix/Homepage/homepage-developer-pack/homepage-developer-pack/05-developer-handbook.htm` (Technical Details)

## Global Constraints

* **DO NOT TOUCH CURRENT LOGIC OF HEIGHTDASHBOARD & PERSONCHART**:
  - The current logic, geometry, auto-scale, rendering, and interaction code in `src/components/HeightDashboard.tsx`, `src/components/PersonBar.tsx`, and `src/components/PersonChart.tsx` must remain completely untouched.
* **Page Title (`<title>`)**: Must remain `<title>Height Comparison Chart - Person Height, Character Height & More</title>` verbatim.
* **H1 Heading**: Must remain `Height Comparison Calculator to Compare Heights Online with Visual Chart` verbatim.
* **First Sentence of Intro**: Retains the exact opening sentence for SEO continuity.
* **Canonical URL & Page Path**: `/` canonical tag and route structure remain untouched.
* **English Only**: Do NOT touch non-English locale files (`messages/*.json`) in this sprint.
* **Section Order & IDs**: All 9 major section IDs and their exact ordering remain intact: `#height-comparison-tool`, `#how-does-a-height-comparison-chart-work`, `#compare-height-in-3-simple-steps`, `#why-a-visual-height-comparison-shows-more-than-numbers`, `#comparing-heights-examples-and-use-cases`, `#height-generator-comparison-all-features-all-free`, `#how-accurate-is-the-height-comparison-chart`, `#a-height-comparison-website-built-for-simplicity`, `#frequently-asked-questions`, `#compare-heights-online-tools-and-articles`.
* **Single FAQ ID**: Live page has duplicate `id="frequently-asked-questions"`; remove duplicate and keep exactly one.
* **Heading Hierarchy**: 1 `<h1>`, 9 `<h2>`s, and `<h3>`s only inside their parent section. Demote "Go on, build your comparison" from H2 to styled call-to-action paragraph.
* **Tool Position**: Stays above the fold.
* **Server HTML Rendering**: All copy, FAQ answers, gap tables, and visuals must be present in initial server HTML (no client fetch delays).

---

## Tasks

### Task 1: Core Mathematical & Formatting Utilities (`src/lib/height.ts`)

**Files:**
- Create: `src/lib/height.ts`
- Test: `tests/unit/height.test.ts`

**Interfaces:**
- Consumes: None (pure functions)
- Produces:
  - `CM_PER_IN: number = 2.54`
  - `heightGap(aCm: number, bCm: number): { gapCm: number, gapIn: number, tallerPct: number, shorterPct: number }`
  - `ftIn(cm: number, step?: number): string`
  - `formatHeight(cm: number, unitSystem: 'metric' | 'imperial'): string`

- [ ] **Step 1: Write failing unit test in `tests/unit/height.test.ts`**
- [ ] **Step 2: Run test with `bun test tests/unit/height.test.ts` to verify failure**
- [ ] **Step 3: Implement `src/lib/height.ts`**
- [ ] **Step 4: Run `bun test tests/unit/height.test.ts` to verify pass**

---

### Task 2: Example Chart Image Deployment & Redirects (Ticket T1, T11)

**Files:**
- Copy: `temp/docs/Fix/Homepage/homepage-developer-pack/homepage-developer-pack/03-height-comparison-chart-example.png` -> `public/height-comparison-chart-example.png`
- Modify: `next.config.ts`

**Interfaces:**
- Consumes: Static asset, Next.js redirect configuration
- Produces:
  - Accessible `public/height-comparison-chart-example.png` (1200x630, ~105 KB)
  - 301 redirects in `next.config.ts`:
    - `/height-difference` -> `/height-difference-calculator` (permanent: true)
    - `/height-weight-percentile` -> `/height-weight-percentile-calculator` (permanent: true)

- [ ] **Step 1: Copy `03-height-comparison-chart-example.png` to `public/`**
- [ ] **Step 2: Add 301 redirects to `next.config.ts`**
- [ ] **Step 3: Verify image file existence and configuration**

---

### Task 3: Modular Visual Components V1 to V8 (`src/components/visuals/`)

**Files:**
- Create: `src/components/visuals/LibraryStackBar.tsx` (V1)
- Create: `src/components/visuals/WorkedExampleBars.tsx` (V2)
- Create: `src/components/visuals/ScaleLadder.tsx` (V3)
- Create: `src/components/visuals/GapPairBars.tsx` (V4)
- Create: `src/components/visuals/HeightGapTable.tsx` (V5)
- Create: `src/components/visuals/AgeBenchmarkBars.tsx` (V6)
- Create: `src/components/visuals/TwoInchGap.tsx` (V7)
- Create: `src/components/visuals/ConversionFlow.tsx` (V8)

**Interfaces:**
- Consumes: Tailwind CSS, `src/lib/height.ts`
- Produces: Fully accessible SSR components wrapped in `<figure>` with `<figcaption>`, `role="img"`, and `aria-label` matching `06-seo-specification.pdf`:
  - **V1 (`LibraryStackBar`)**: 2,696 presets (Celebrities 48.0% [1,294], Fictional 42.2% [1,138], Objects 9.8% [264]).
  - **V2 (`WorkedExampleBars`)**: Alex (170 cm) vs Ben (185 cm), 15 cm (5.9 in) gap, 1.09× ratio, 8.8% taller.
  - **V3 (`ScaleLadder`)**: Logarithmic scale ladder: Person (1.75m) -> Eiffel Tower (330m) -> Angel Falls (979m) -> Mt Everest (8,848.86m) -> Chart limit (10,000m). Caption notes logarithmic scaling.
  - **V4 (`GapPairBars`)**: Side-by-side comparison: 160 vs 172 cm (7.5%) vs 190 vs 202 cm (6.3%).
  - **V5 (`HeightGapTable`)**: 7-row interactive reference table in feet & inches with proportional visual mini-bars.
  - **V6 (`AgeBenchmarkBars`)**: CDC NHANES 2021–2023 adult averages (Men 175.0 cm / Women 161.3 cm).
  - **V7 (`TwoInchGap`)**: SVG diagram of 2-inch difference perception (eye-level vs forehead).
  - **V8 (`ConversionFlow`)**: Step-by-step visual card showing 175 cm -> 5'9" calculation.

- [ ] **Step 1: Implement V1 `LibraryStackBar.tsx`**
- [ ] **Step 2: Implement V2 `WorkedExampleBars.tsx`**
- [ ] **Step 3: Implement V3 `ScaleLadder.tsx`**
- [ ] **Step 4: Implement V4 `GapPairBars.tsx`**
- [ ] **Step 5: Implement V5 `HeightGapTable.tsx`**
- [ ] **Step 6: Implement V6 `AgeBenchmarkBars.tsx`**
- [ ] **Step 7: Implement V7 `TwoInchGap.tsx`**
- [ ] **Step 8: Implement V8 `ConversionFlow.tsx`**

---

### Task 4: JSON-LD Structured Data Schema Update (`src/constants/schemas/home.ts`)

**Files:**
- Modify: `src/constants/schemas/home.ts`

**Interfaces:**
- Consumes: SEO specification from `06-seo-specification.pdf` and `01-homepage.html`
- Produces: Updated `@graph` with:
  - `Organization`: name "Height Comparison Calculator", url, logo (512x512), email `contact@heightcomparisoncalculator.com`
  - `WebSite`: name "Height Comparison Calculator", publisher, inLanguage `en` (removed retired `SearchAction`)
  - `WebPage`: name (<title>), description (meta description), primaryImageOfPage (`/#example-chart`), hasPart (`/#faq`), dateModified "2026-11-14" (removed retired `HowTo`)
  - `ImageObject` (`/#example-chart`): url `/height-comparison-chart-example.png`, caption "Height comparison chart of a 5'7\" and a 6'1\" person side by side", width 1200, height 630
  - `SoftwareApplication + WebApplication` (`/#tool`): featureList counts matching database (1,294 celebrities, 1,138 fictional characters, 264 objects)
  - `FAQPage` (`/#faq`): all 9 Question/Answer pairs matching visible FAQ text
  - `BreadcrumbList`: 1 item (Home)

- [ ] **Step 1: Update `src/constants/schemas/home.ts` according to `01-homepage.html` and `06-seo-specification.pdf`**
- [ ] **Step 2: Verify JSON-LD syntax validity**

---

### Task 5: FAQ & Content Constants (`src/constants/home.tsx`)

**Files:**
- Modify: `src/constants/home.tsx`

**Interfaces:**
- Consumes: Verified copy from `01-homepage.html`
- Produces:
  - 9 FAQ questions with exact facts, CDC NHANES 2021–2023 figures, updated links (`/height-difference-calculator`, `/height-weight-percentile-calculator`)
  - Embedding of Visuals V6, V7, V8 in appropriate FAQ answers
  - Sources citation line with "Checked November 2026"
  - Updated TOC list without duplicate IDs

- [ ] **Step 1: Update `HOME_FAQ` array in `src/constants/home.tsx`**
- [ ] **Step 2: Update `HOME_TOC` array in `src/constants/home.tsx`**

---

### Task 6: Homepage Content Component Update (`src/components/HomeContent.tsx`)

**Files:**
- Modify: `src/components/HomeContent.tsx`

**Interfaces:**
- Consumes: V1–V8 visual components, `01-homepage.html` copy
- Produces: Complete content refresh across all 9 sections:
  1. **Intro & Free Card**: "centimeters", exact intro, Free Card with real counts, embed `LibraryStackBar` (V1).
  2. **#how-does-a-height-comparison-chart-work**: `<figure>` with `/height-comparison-chart-example.png` and `<figcaption>`, embed `WorkedExampleBars` (V2).
  3. **#compare-height-in-3-simple-steps**: Softened claims, 10,000m scale, embed `ScaleLadder` (V3), 7-day share link notice.
  4. **#why-a-visual-height-comparison-shows-more-than-numbers**: Embed `GapPairBars` (V4), contextual link to `/height-difference-calculator`.
  5. **#comparing-heights-examples-and-use-cases**: New H3 subsection with `HeightGapTable` (V5).
  6. **#height-generator-comparison-all-features-all-free**: Real counts (1,294 celebrities, 1,138 fictional, 264 objects).
  7. **#how-accurate-is-the-height-comparison-chart**: Add "Scale" and "Reference values" cards, animal measurement notice.
  8. **#a-height-comparison-website-built-for-simplicity**: "What you get, free" checklist table, demote "Go on, build your comparison" to styled paragraph.
  9. **Privacy Box & Tools Section**: Fix duplicate FAQ ID, update privacy notice to CCPA/Analytics compliance, remove Average Height by Country guide card per Ticket T1.

- [ ] **Step 1: Update Intro and sections 1 through 3 in `HomeContent.tsx`**
- [ ] **Step 2: Update sections 4 through 6 in `HomeContent.tsx`**
- [ ] **Step 3: Update sections 7 through 9, privacy box, and tools section in `HomeContent.tsx`**

---

### Task 7: Contact Page & API Route (Ticket T10)

**Files:**
- Create: `src/app/[locale]/contact/page.tsx`
- Create: `src/app/api/contact/route.ts`
- Modify: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `04-contact.html`, `06-seo-specification.pdf`
- Produces:
  - Next.js Contact page with `ContactPage` schema, breadcrumbs, responsive form, and guidance cards
  - `/api/contact` POST handler with IP rate limiting, honeypot, validation
  - Footer with `/contact` link and "Built by our team" pointing to `/about`

- [ ] **Step 1: Implement `src/app/api/contact/route.ts`**
- [ ] **Step 2: Implement `src/app/[locale]/contact/page.tsx`**
- [ ] **Step 3: Update `src/components/layout/Footer.tsx`**

---

### Task 8: Verification & Quality Assurance

**Files:**
- All modified and created files

- [ ] **Step 1: Run TypeScript compiler check (`bun run tsc --noEmit`)**
- [ ] **Step 2: Run all unit tests (`bun test`)**
- [ ] **Step 3: Confirm `HeightDashboard.tsx`, `PersonBar.tsx`, and `PersonChart.tsx` have ZERO edits/diffs**
- [ ] **Step 4: Verify `<title>` and `H1` match original strings verbatim**
- [ ] **Step 5: Verify all internal links and 301 redirects**

---
