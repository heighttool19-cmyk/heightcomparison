# Multilingual Language Onboarding Context & Configuration Guide

> **Purpose**: This context document serves as the single source of truth for onboarding new languages into the Height Comparison web application and Sanity CMS. Following the DRY (Don't Repeat Yourself) principle, all language definitions, date formatters, direction rules, routing, and SEO helpers are centralized in [`src/i18n/config.ts`](file:///d:/COding/InternShip%20Work/E-STUDYPAL/LAUNCHPIT/Height%20Comparison%20%20tool/heightcomparison/src/i18n/config.ts).

---

## 1. Supported Languages Inventory

| ISO Code | Language Name | Native Label | Flag | Text Direction | Date Locale | Sanity Studio Auto-Translate | Messages Dictionary |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| `en` | English | English | 🇺🇸 | LTR (Default) | `en-US` | Source language | `messages/en.json` |
| `de` | German | Deutsch | 🇩🇪 | LTR | `de-DE` | Supported | `messages/de.json` |
| `es` | Spanish | Español | 🇪🇸 | LTR | `es-ES` | Supported | `messages/es.json` |
| `fr` | French | Français | 🇫🇷 | LTR | `fr-FR` | Supported | `messages/fr.json` |
| `pt` | Portuguese | Português | 🇵🇹 | LTR | `pt-PT` | Supported | `messages/pt.json` |
| `nl` | Dutch | Nederlands | 🇳🇱 | LTR | `nl-NL` | Supported | `messages/nl.json` |
| `ar` | Arabic | العربية | 🇸🇦 | **RTL** | `ar-SA` | Supported | `messages/ar.json` |
| `it` | Italian | Italiano | 🇮🇹 | LTR | `it-IT` | Supported | `messages/it.json` |

---

## 2. DRY Architecture Overview

Instead of repeating language dictionaries, date maps, or hreflang alternate lists across multiple files, the codebase uses a single source of truth:

```
                  ┌─────────────────────────────────┐
                  │       src/i18n/config.ts        │
                  │ (SUPPORTED_LOCALES, ALL_CODES)  │
                  └───────────────┬─────────────────┘
                                  │
    ┌─────────────────────────────┼─────────────────────────────┐
    ▼                             ▼                             ▼
Sanity Studio              Next.js Routing               Frontend UI & SEO
- src/sanity/languages.ts  - src/i18n/routing.ts         - LanguageSwitcher.tsx
- src/sanity/schemas/post  - src/middleware.ts          - layout.tsx (RTL dir)
- autoTranslateAction.tsx                                - formatDate() (blogs)
                                                         - getAlternateLanguages()
                                                         - getCanonicalUrl()
                                                         - getLocalizedHref()
```

---

## 3. Step-by-Step Onboarding Checklist for a New Language

Whenever adding a new language with code `[LOCALE_CODE]` (e.g., `ja`, `hi`, `pl`):

### Step 1: Add to Central Configuration (1 Place)
- **File**: [`src/i18n/config.ts`](file:///d:/COding/InternShip%20Work/E-STUDYPAL/LAUNCHPIT/Height%20Comparison%20%20tool/heightcomparison/src/i18n/config.ts)
- **Action**: Add an object to `SUPPORTED_LOCALES`:
  ```typescript
  {
    code: '[LOCALE_CODE]',
    name: '[English Name]',
    nativeName: '[Native Name]',
    flag: '[Flag Emoji]',
    dateLocale: '[BCP-47 Tag e.g. ja-JP]',
    dir: 'ltr' // or 'rtl' for Arabic, Hebrew, Urdu, Persian
  }
  ```
- **What this automatically updates**:
  - `ALL_LOCALE_CODES` and `src/i18n/routing.ts` (`locales` array)
  - `src/sanity/languages.ts` and Sanity Studio Post schema & Auto-Translate button
  - `LanguageSwitcher.tsx` (dropdown list)
  - `blogs/page.tsx` and `blog/[slug]/page.tsx` date formatting
  - `[locale]/layout.tsx` text direction (`dir="rtl"` or `"ltr"`)
  - All 9 localized pages' `alternates.languages` and `canonical` SEO tags

### Step 2: Update Middleware Matcher (1 Place)
- **File**: [`src/middleware.ts`](file:///d:/COding/InternShip%20Work/E-STUDYPAL/LAUNCHPIT/Height%20Comparison%20%20tool/heightcomparison/src/middleware.ts)
- **Action**: Add `[LOCALE_CODE]` to the matcher regex:
  ```typescript
  '/(de|en|es|fr|pt|nl|ar|it|[LOCALE_CODE])/:path*'
  ```

### Step 3: Seed Translation Dictionary (1 File)
- **File**: `messages/[LOCALE_CODE].json`
- **Action**: Clone `messages/en.json` to ensure 100% key parity:
  ```bash
  node -e "const fs = require('fs'); fs.copyFileSync('messages/en.json', 'messages/[LOCALE_CODE].json');"
  ```
- **Validate**:
  ```bash
  node scripts/validate_completeness.js [LOCALE_CODE]
  ```

---

## 4. Verification Protocol

Run the automated verification suite to guarantee zero regressions:

1. **TypeScript Typecheck**:
   ```bash
   npx tsc --noEmit
   ```
   *Expected: 0 errors.*

2. **Completeness Audit**:
   ```bash
   node scripts/validate_completeness.js [LOCALE_CODE]
   ```
   *Expected: Missing: 0, Extra: 0, Empty: 0.*

3. **Live Server Route Check**:
   ```bash
   node -e "
   const loc = '[LOCALE_CODE]';
   ['/about', '/height-predictor', '/blogs'].forEach(async r => {
     const res = await fetch('http://localhost:3000/' + loc + r);
     console.log(loc + r, 'Status:', res.status);
   });
   "
   ```
   *Expected: All return HTTP 200.*
