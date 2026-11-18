# Complete Multilingual Localization (Remaining Pages) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete end-to-end multilingual localization for all remaining unmigrated routes (`/image-to-height`, Home page `/`, and shared `FaqAccordion`), achieving 100% key parity and 0% UI/content loss across all 10 supported locales (`en`, `de`, `es`, `fr`, `pt`, `nl`, `ar`, `it`, `sv`, `pl`).

**Architecture:** Next.js 15 App Router dynamic `[locale]` routing architecture with `next-intl`. Server components utilize `getTranslations` and dynamic `generateMetadata` (with `canonical`, `alternates`, and `x-default` tags). Client interactive tools use `useTranslations`. All target-language strings pass through the `semantic-seo-localization` entity-protection and validation pipeline, verified mechanically by `node scripts/validate_completeness.js`.

**Tech Stack:** Next.js 15.5.15, React 19, TypeScript, `next-intl` 4.14.1, Tailwind CSS v4, Lucide React, Bun/Node.

**Spec:**
- `docs/i18n-migration-status.md`
- `docs/multilingual-language-onboarding-context.md`
- `.agents/skills/nextjs-i18n-migration/SKILL.md`
- `.agents/skills/semantic-seo-localization/SKILL.md`
- `.agents/skills/verification-before-completion/SKILL.md`

## Global Constraints

- **0% Content Loss**: English source text must be extracted verbatim into `messages/en.json` without modifying a single word.
- **0% CSS & UI Loss**: All Tailwind CSS classes, Lucide icons, responsive layouts, SVG visualizers, and DOM structures must remain completely untouched.
- **100% Key Parity**: Every non-English locale (`de`, `es`, `fr`, `pt`, `nl`, `ar`, `it`, `sv`, `pl`) must match `messages/en.json` key-for-key (0 missing, 0 extra, 0 empty strings) verified via `scripts/validate_completeness.js`.
- **Entity Protection**: Registered medical, technical, and geographic entities (e.g. ISO standards, landmark names, formula names, CDC/WHO entities) must be preserved verbatim in all target languages.
- **Strict Verification Gate**: No task is complete without passing `npx tsc --noEmit` and `npm run build`.

---

## Tasks

### Task 1: Shared Polish — `FaqAccordion.tsx` Translatable Eyebrow Badge

**Files:**
- Modify: `src/components/FaqAccordion.tsx:41-65`

**Interfaces:**
- Consumes: Optional `badge?: string` prop
- Produces: Dynamic badge display falling back to `"HELP CENTER"` when omitted.

- [ ] **Step 1: Update `src/components/FaqAccordion.tsx` props interface**
```tsx
interface Props {
    items: FaqItem[];
    title?: string;
    description?: string;
    footerText?: React.ReactNode;
    badge?: string;
}
```

- [ ] **Step 2: Render dynamic badge in `src/components/FaqAccordion.tsx`**
Replace hardcoded line 56:
```tsx
<div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
    <HelpCircle size={12} /> {badge || "HELP CENTER"}
</div>
```

- [ ] **Step 3: Verify TypeScript passes**
Run: `npx tsc --noEmit`
Expected: Exit code 0.

- [ ] **Step 4: Commit**
```bash
git add src/components/FaqAccordion.tsx
git commit -m "fix(ui): support customizable and translatable badge in FaqAccordion"
```

---

### Task 2: Migrate `/image-to-height` to Dynamic Route & Extract English Source

**Files:**
- Create: `src/app/[locale]/image-to-height/page.tsx`
- Delete: `src/app/image-to-height/page.tsx`, `src/app/image-to-height/layout.tsx`
- Modify: `messages/en.json` (add `imageToHeight` namespace and `metadata.imageToHeight*`)
- Modify: `src/components/ImageMeasurement.tsx` (wire client `useTranslations`)

**Interfaces:**
- Consumes: `src/constants/imageToHeight.ts`, `IMAGE_TO_HEIGHT_SCHEMA`
- Produces:
  - Localized async Server Component `src/app/[locale]/image-to-height/page.tsx`
  - Dynamic `generateMetadata` with full `canonical` and `hreflang` for all 10 locales
  - `imageToHeight` namespace in `messages/en.json`

- [ ] **Step 1: Extract all strings from `src/constants/imageToHeight.ts` and `src/app/image-to-height/page.tsx` into `messages/en.json`**
Extract under `imageToHeight` (hero, trustBadges, prepChecklist, steps, referenceObjects, accuracyTable, whatYouCanMeasure, noTapeMethods, clinicalSteps, errorCauses, tips, faq) and `metadata.imageToHeightTitle` / `metadata.imageToHeightDescription`.

- [ ] **Step 2: Create localized Server Component `src/app/[locale]/image-to-height/page.tsx`**
Import `getTranslations` from `next-intl/server`, fetch translations, and render all sections, passing translated content into `FaqAccordion`. Include `generateMetadata` with `canonical` and `languages` alternates (`en`, `de`, `es`, `fr`, `pt`, `nl`, `ar`, `it`, `sv`, `pl`, `x-default`).

- [ ] **Step 3: Update `src/components/ImageMeasurement.tsx` and child components with `useTranslations('imageToHeight.tool')`**
Ensure interactive labels, buttons, and status toasts use dynamic translations while preserving all canvas math and calibration logic intact.

- [ ] **Step 4: Delete flat unlocalized route files**
Remove `src/app/image-to-height/page.tsx` and `src/app/image-to-height/layout.tsx`.

- [ ] **Step 5: Verify TypeScript passes**
Run: `npx tsc --noEmit`
Expected: Exit code 0.

- [ ] **Step 6: Commit**
```bash
git add src/app/[locale]/image-to-height/ messages/en.json src/components/ImageMeasurement.tsx
git rm -r src/app/image-to-height/
git commit -m "feat(i18n): migrate image-to-height to dynamic localized route and extract en strings"
```

---

### Task 3: Semantic SEO Localization for `/image-to-height` Across All 9 Target Locales

**Files:**
- Create: `docs/semantic-seo-localization/<locale>/image-to-height/` audit files for all target locales
- Modify: `docs/semantic-seo-localization/<locale>/entities.json` (add ISO 216, ISO/IEC 7810, A4, etc.)
- Modify: `messages/{de,es,fr,pt,nl,ar,it,sv,pl}.json` (add complete `imageToHeight` namespace)

**Interfaces:**
- Consumes: `messages/en.json` (`imageToHeight` and `metadata.imageToHeight*`)
- Produces: 100% key parity across all 9 non-English translation files.

- [ ] **Step 1: Sync entity registry in `docs/semantic-seo-localization/<locale>/entities.json`**
Register technical standards (`ISO 216`, `ISO/IEC 7810`), standard card dimensions, and units with appropriate translation rules.

- [ ] **Step 2: Translate `imageToHeight` namespace for German (`messages/de.json`) using semantic SEO pipeline**
Translate adhering to entity protection, format strings, and natural target phrasing.

- [ ] **Step 3: Translate `imageToHeight` namespace across remaining 8 target locales (`es`, `fr`, `pt`, `nl`, `ar`, `it`, `sv`, `pl`)**
Translate with complete schema mirroring.

- [ ] **Step 4: Run completeness validation gate for all 9 locales**
Run: `node -e "['de','es','fr','pt','nl','ar','it','sv','pl'].forEach(loc => { const { execSync } = require('child_process'); console.log(execSync('node scripts/validate_completeness.js ' + loc).toString()); })"`
Expected: 9/9 PASS (100% Complete, 0 missing, 0 extra, 0 empty).

- [ ] **Step 5: Commit**
```bash
git add messages/ docs/semantic-seo-localization/
git commit -m "feat(i18n): complete semantic SEO localization for image-to-height across all 9 target locales"
```

---

### Task 4: Migrate Home Page (`/`) & Extract English Source

**Files:**
- Modify: `messages/en.json` (add `home` namespace and `metadata.home*`)
- Modify: `src/app/[locale]/page.tsx` (add `generateMetadata`)
- Modify: `src/components/HomeContent.tsx` (wire `useTranslations('home')` or convert to server component with `getTranslations`)
- Modify: `src/components/DynamicHeightDashboard.tsx` (wire translatable labels where applicable)

**Interfaces:**
- Consumes: `src/constants/home.ts`, `HomeContent.tsx` copy (V1-V8 visuals, FAQs, SEO articles)
- Produces:
  - Localized Home Page with `generateMetadata`
  - `home` namespace in `messages/en.json`

- [ ] **Step 1: Extract all strings from `src/components/HomeContent.tsx` and `src/constants/home.ts` into `messages/en.json`**
Extract intro, freeCard, 3-step guide, visual benefits, worked examples, use cases, accuracy breakdown, simplicity features, FAQs, and bottom articles into `home` namespace.

- [ ] **Step 2: Update `src/app/[locale]/page.tsx` with dynamic `generateMetadata`**
Export `generateMetadata` returning canonical and language alternates for `/` across all 10 locales + `x-default`.

- [ ] **Step 3: Wire `useTranslations('home')` into `src/components/HomeContent.tsx`**
Replace literal English text with `t(...)` calls, preserving all DOM elements, visual figures (V1-V8), Tailwind classes, and layout structures verbatim.

- [ ] **Step 4: Verify TypeScript passes**
Run: `npx tsc --noEmit`
Expected: Exit code 0.

- [ ] **Step 5: Commit**
```bash
git add src/app/[locale]/page.tsx src/components/HomeContent.tsx messages/en.json
git commit -m "feat(i18n): extract homepage strings to en.json and wire localization in HomeContent"
```

---

### Task 5: Semantic SEO Localization for Home Page Across All 9 Target Locales

**Files:**
- Create: `docs/semantic-seo-localization/<locale>/home/` audit artifacts
- Modify: `docs/semantic-seo-localization/<locale>/entities.json` (landmarks, celebrities, characters)
- Modify: `messages/{de,es,fr,pt,nl,ar,it,sv,pl}.json` (add complete `home` namespace)

**Interfaces:**
- Consumes: `messages/en.json` (`home` and `metadata.home*`)
- Produces: 100% key parity across all 9 target locales.

- [ ] **Step 1: Sync landmark and entity registry across target locales**
Register entities: `Robert Wadlow`, `Eiffel Tower`, `Angel Falls`, `Mt Everest`, `Alex`, `Ben`, `CDC NHANES`, etc.

- [ ] **Step 2: Translate `home` namespace into German (`messages/de.json`) using semantic SEO pipeline**
Translate all batches, verifying triples and entity conservation.

- [ ] **Step 3: Translate `home` namespace across remaining 8 target locales (`es`, `fr`, `pt`, `nl`, `ar`, `it`, `sv`, `pl`)**
Translate with complete key mirroring and ICU plural/variable handling.

- [ ] **Step 4: Run completeness validation gate for all 9 locales**
Run: `node -e "['de','es','fr','pt','nl','ar','it','sv','pl'].forEach(loc => { const { execSync } = require('child_process'); console.log(execSync('node scripts/validate_completeness.js ' + loc).toString()); })"`
Expected: 9/9 PASS (100% Complete, 0 missing, 0 extra, 0 empty).

- [ ] **Step 5: Commit**
```bash
git add messages/ docs/semantic-seo-localization/
git commit -m "feat(i18n): complete semantic SEO localization for homepage across all 9 target locales"
```

---

### Task 6: Final Verification & Status Documentation Update

**Files:**
- Modify: `docs/i18n-migration-status.md`

- [ ] **Step 1: Run full completeness validation suite**
Run: `node -e "['de','es','fr','pt','nl','ar','it','sv','pl'].forEach(loc => { const { execSync } = require('child_process'); console.log(execSync('node scripts/validate_completeness.js ' + loc).toString()); })"`
Expected: All 9 locales PASS with 100% parity.

- [ ] **Step 2: Run TypeScript compile verification**
Run: `npx tsc --noEmit`
Expected: Exit code 0.

- [ ] **Step 3: Run production build verification**
Run: `npm run build`
Expected: Exit code 0, all routes generated successfully without error.

- [ ] **Step 4: Update `docs/i18n-migration-status.md`**
Mark `/image-to-height`, Home page `/`, and shared components as ✅ Done.

- [ ] **Step 5: Final commit**
```bash
git add docs/i18n-migration-status.md
git commit -m "docs(i18n): finalize migration status with 100% of routes and pages localized"
```

