# Multilingual German (de) Demo Feature Design Spec

## Overview
This specification details the initial demo implementation of the Multilingual (i18n) system for the Height Comparison Tool using `next-intl` in Next.js 15 App Router. The goal is to establish a scalable, SEO-friendly i18n architecture by localizing the **About Page (`/about` and `/de/about`)** with English (`en`) as the default unprefixed locale and German (`de`) as the first target language.

## Goals
1. Establish `next-intl` configuration and middleware routing supporting `en` (unprefixed default) and `de` (`/de/` prefix).
2. Extract all English strings from the About page and surrounding layout/nav components into structured JSON files (`messages/en.json` and `messages/de.json`).
3. Refactor the About page (`src/app/[locale]/about/page.tsx`) to use `next-intl` translation hooks (`getTranslations` / `useTranslations`).
4. Implement per-locale SEO metadata generation, including localized titles, descriptions, and `hreflang` alternate tags (`en`, `de`, `x-default`).
5. Add a responsive Language Switcher UI component in the Navbar to switch between English (`/about`) and German (`/de/about`).

## Architecture & File Structure

```
heightcomparison/
├── messages/
│   ├── en.json                  # English source of truth
│   └── de.json                  # German translations
├── src/
│   ├── i18n/
│   │   ├── routing.ts           # Define locales ['en', 'de'] and defaultLocale 'en'
│   │   └── request.ts           # next-intl request configuration
│   ├── middleware.ts            # next-intl locale detection & URL routing middleware
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.tsx       # Root locale layout with NextIntlClientProvider
│   │       └── about/
│   │           └── page.tsx     # Localized About Page
│   └── components/
│       ├── Navbar.tsx           # Updated with Language Switcher dropdown
│       └── LanguageSwitcher.tsx # Interactive EN / DE selector component
```

## Detailed Specifications

### 1. i18n & Middleware Configuration
- **Locales**: `['en', 'de']`
- **Default Locale**: `'en'`
- **Locale Prefix Strategy**: `'as-needed'` (English served at `/about`, German served at `/de/about`).
- **Middleware**: Intercepts requests, validates locale prefix, and forwards parameters to `[locale]` routes.

### 2. Message Files (`messages/`)
- `messages/en.json` contains categorized translation keys:
  - `common`: Language names, common UI labels.
  - `nav`: Navigation links.
  - `about`: Page header, intro paragraph, feature section titles, cards, account policy, data accuracy note, and footer quote.
  - `metadata`: Page title and description for SEO.
- `messages/de.json` contains accurate German translations matching the exact key hierarchy of `messages/en.json`.

### 3. About Page Refactoring
- Existing hardcoded strings in `src/app/about/page.tsx` will be replaced with `t('key')` calls from `getTranslations('about')`.
- `generateMetadata` will resolve localized metadata from `messages/{locale}.json` and output `hreflang` link tags:
  - `hreflang="en"` -> `https://heightcomparisoncalculator.com/about`
  - `hreflang="de"` -> `https://heightcomparisoncalculator.com/de/about`
  - `hreflang="x-default"` -> `https://heightcomparisoncalculator.com/about`

### 4. Language Switcher Component
- Accessible toggle button in `Navbar.tsx`.
- Displays current locale (`EN` or `DE`).
- On selection, navigates to the target locale URL while preserving the sub-path (`/about` ↔ `/de/about`).

## Verification Plan
1. Run `npm run dev` and test:
   - Access `http://localhost:3000/about` -> Loads English page without redirect loop.
   - Access `http://localhost:3000/de/about` -> Loads German page with full German content.
   - Verify Navbar language switcher switches back and forth between `/about` and `/de/about`.
   - Inspect page source to confirm `<link rel="alternate" hreflang="...">` tags are present and correct.
2. Run `npm run build` to ensure static rendering and Next.js 15 build validation succeed without TypeScript or routing errors.
