# Fix Table of Contents Headings & Calculator Anchors Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move calculator anchor IDs (e.g., `calculate-your-height-and-weight-percentile`) from top `<h1>` intro headers to the `<h2>` headings directly preceding the interactive calculator tools, ensuring sticky header clearance (`scroll-mt-24`), accurate table-of-contents navigation, and clean canonical URLs.

**Architecture:** Update the 5 calculator pages (`height-weight-percentile-calculator`, `height-predictor`, `ideal-body-weight-calculator`, `average-height-by-country`, `height-difference-calculator`) to ensure TOC item 1 targets the `<h2>` above each tool rather than the `<h1>` intro. Co-locate `scroll-mt-24` on each target `<h2>` for 96px top scroll margin (leaving 36px clearance below the 60px sticky header).

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, `next-intl`.

**Spec:** User SEO issue report and audit showing `#calculate-your-height-and-weight-percentile` landed at `<h1>` intro instead of the calculator form, and extension flagging "Canonicalised" due to hash fragment in address bar.

## Global Constraints
- Canonical URLs must remain clean without `#` hash fragments: `https://heightcomparisoncalculator.com/[tool-path]`.
- Existing TOC anchor IDs (`#calculate-your-height-and-weight-percentile`, `#height-predictor-calculator`, etc.) must be preserved exactly so shared/bookmarked URLs continue to work.
- `scroll-mt-24` must be applied to every target `<h2>` element.
- No duplicate IDs in the DOM (IDs must be completely removed from `<h1>`).

---

### Task 1: Height and Weight Percentile Calculator Page

**Files:**
- Modify: `src/app/[locale]/height-weight-percentile-calculator/page.tsx:50-70`

- [ ] **Step 1: Inspect target lines in `height-weight-percentile-calculator/page.tsx`**
  Verify `<h1>` currently holds `id="calculate-your-height-and-weight-percentile"` and section has `id="calculate-your-height-and-weight-percentile-tool"`.

- [ ] **Step 2: Remove ID from `<h1>` and move to `<h2>`**
  In `src/app/[locale]/height-weight-percentile-calculator/page.tsx`:
  - Change `<h1>`:
    ```tsx
    <h1 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight text-left">
        {t('intro.title')}
    </h1>
    ```
  - Change `<section>` and `<h2>`:
    ```tsx
    {/* Calculator Component Island */}
    <section id="calculator-section" className="scroll-mt-24">
        <h2 id="calculate-your-height-and-weight-percentile" className="text-2xl md:text-3xl font-black tracking-tight mb-6 scroll-mt-24">
            {t('toolSection.title')}
        </h2>
        <HeightPercentileTool />
    </section>
    ```

- [ ] **Step 3: Verify with local script that DOM contains single `#calculate-your-height-and-weight-percentile` on `<h2>`**

---

### Task 2: Height Predictor Calculator Page

**Files:**
- Modify: `src/app/[locale]/height-predictor/page.tsx:50-65`
- Modify: `src/components/height-predictor/KhamisRocheCalculator.tsx:160-170`

- [ ] **Step 1: Inspect target lines in `height-predictor/page.tsx` and `KhamisRocheCalculator.tsx`**
  Verify `<h1>` in `page.tsx` has `id="height-predictor-calculator"`, and `<h2>` in `KhamisRocheCalculator.tsx` has `id="calculator"`.

- [ ] **Step 2: Remove ID from `<h1>` in `height-predictor/page.tsx`**
  In `src/app/[locale]/height-predictor/page.tsx`:
  - Change `<h1>`:
    ```tsx
    <h1 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight text-left uppercase">
        {t('intro.title')}
    </h1>
    ```

- [ ] **Step 3: Update `<h2>` ID in `KhamisRocheCalculator.tsx`**
  In `src/components/height-predictor/KhamisRocheCalculator.tsx`:
  - Change `<h2>`:
    ```tsx
    <h2 id="height-predictor-calculator" className="text-3xl font-black tracking-tight text-foreground uppercase scroll-mt-24">
        {t('title')}
    </h2>
    ```

- [ ] **Step 4: Verify with local script that DOM contains single `#height-predictor-calculator` on `<h2>`**

---

### Task 3: Ideal Body Weight Calculator Page

**Files:**
- Modify: `src/app/[locale]/ideal-body-weight-calculator/page.tsx:45-65`
- Modify: `src/components/ideal-body-weight-calculator/IdealWeightInteractive.tsx:88-96`

- [ ] **Step 1: Inspect target lines in `ideal-body-weight-calculator/page.tsx` and `IdealWeightInteractive.tsx`**
  Verify `<h1>` in `page.tsx` has `id="ideal-body-weight-calculator"`, and section in `IdealWeightInteractive.tsx` has `id="calculate-your-ideal-body-weight-in-kg-or-pounds"`.

- [ ] **Step 2: Remove ID from `<h1>` in `ideal-body-weight-calculator/page.tsx`**
  In `src/app/[locale]/ideal-body-weight-calculator/page.tsx`:
  - Change `<h1>`:
    ```tsx
    <h1 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight text-left">
        {t('intro.title')}
    </h1>
    ```

- [ ] **Step 3: Update ID and scroll margin in `IdealWeightInteractive.tsx`**
  In `src/components/ideal-body-weight-calculator/IdealWeightInteractive.tsx`:
  - Change `<section>` and `<h2>`:
    ```tsx
    <section id="ideal-body-weight-calculator-section" className="scroll-mt-24 bg-surface border border-border p-6 md:p-10 rounded-3xl shadow-xl shadow-black/5 hover:border-accent/30 transition-colors">
        <h2 id="ideal-body-weight-calculator" className="text-2xl md:text-3xl font-black tracking-tight mb-4 text-foreground scroll-mt-24">
            {t('title')}
        </h2>
    ```

- [ ] **Step 4: Verify with local script that DOM contains single `#ideal-body-weight-calculator` on `<h2>`**

---

### Task 4: Average Height by Country Page

**Files:**
- Modify: `src/app/[locale]/average-height-by-country/page.tsx:80-115`
- Modify: `src/components/average-height-by-country/AverageHeightTable.tsx:50-60`

- [ ] **Step 1: Inspect target lines in `average-height-by-country/page.tsx` and `AverageHeightTable.tsx`**
  Verify `<h1>` in `page.tsx` has `id="average-height-by-country"`, and `<h2>` in `AverageHeightTable.tsx` has no ID.

- [ ] **Step 2: Remove ID from `<h1>` in `average-height-by-country/page.tsx`**
  In `src/app/[locale]/average-height-by-country/page.tsx`:
  - Change `<h1>`:
    ```tsx
    <h1 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight text-left">
        {t('h1')}
    </h1>
    ```
  - Update section ID:
    ```tsx
    <section id="average-height-table-section" className="scroll-mt-24">
        <AverageHeightTable />
    </section>
    ```

- [ ] **Step 3: Add ID and scroll margin to `<h2>` in `AverageHeightTable.tsx`**
  In `src/components/average-height-by-country/AverageHeightTable.tsx`:
  - Change `<h2>`:
    ```tsx
    <h2 id="average-height-by-country" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24">
        {t('title')}
    </h2>
    ```

- [ ] **Step 4: Verify with local script that DOM contains single `#average-height-by-country` on `<h2>`**

---

### Task 5: Height Difference Calculator Page Cleanup

**Files:**
- Modify: `src/app/[locale]/height-difference-calculator/page.tsx:48-55`

- [ ] **Step 1: Inspect `height-difference-calculator/page.tsx`**
  Verify `<h1>` has `id="height-difference-calculator"` and Section 1 already has `id="calculate-height-difference"` matching TOC Item 1.

- [ ] **Step 2: Remove redundant ID from `<h1>`**
  In `src/app/[locale]/height-difference-calculator/page.tsx`:
  - Change `<h1>`:
    ```tsx
    <h1 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight">
        {t('intro.title')}
    </h1>
    ```

- [ ] **Step 3: Ensure `<h2>` inside `#calculate-height-difference` has `scroll-mt-24`**

---

### Task 6: Comprehensive Verification & Build

- [ ] **Step 1: Run automated TOC-to-DOM validation script**
  Verify all TOC IDs across all 5 pages map to single elements, that no IDs are duplicated on `<h1>`, and that all target headings have `scroll-mt-24`.

- [ ] **Step 2: Run TypeScript typecheck**
  Run: `npx tsc --noEmit`
  Expected: 0 errors.

- [ ] **Step 3: Run Next.js production build**
  Run: `npm run build`
  Expected: Successful build with static page generation.

