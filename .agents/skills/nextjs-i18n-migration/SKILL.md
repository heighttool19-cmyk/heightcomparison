---
name: nextjs-i18n-migration
description: Use when migrating Next.js App Router pages or components to industrial-standard multilingual (i18n) localization without content or CSS loss.
---

# Next.js App Router Industrial i18n Migration Skill

## Overview
This skill provides a production-grade, step-by-step methodology for converting Next.js 15 App Router pages and components into a localized `[locale]` dynamic routing architecture using `next-intl`.

**Core Guarantees:**
1. **0% Content Loss**: English source text is extracted verbatim into `messages/en.json` without modifying a single letter.
2. **0% CSS & UI Loss**: Component layouts, Tailwind CSS class strings (`className="..."`), Lucide icon properties, and HTML structures are preserved identically.
3. **100% SEO & Indexing Compliance**: Clean unprefixed URLs for default locale (`/about`), locale-prefixed URLs for target languages (`/de/about`), and automated `generateMetadata` with `canonical` and `hreflang` tags.

---

## When to Use
- Migrating existing flat Next.js routes (`src/app/about/page.tsx`, `src/app/calculator/page.tsx`) to localized dynamic routes (`src/app/[locale]/about/page.tsx`).
- Adding new localized pages or components to a Next.js 15 App Router codebase.
- Setting up or refining `next-intl` configuration, middleware, and language switchers.

---

## Critical Mistakes & Prevention Checklist

Before touching any code, ensure you do NOT repeat these common architectural mistakes:

| Mistake | Root Cause | Prevention & Fix |
|---|---|---|
| **Root route `404`** | Moving sub-pages into `src/app/[locale]/...` without moving root `src/app/page.tsx`. | **Rule**: Both `src/app/[locale]/page.tsx` and sub-pages MUST exist under `src/app/[locale]/`. Delete unlocalized root `src/app/page.tsx`. |
| **Path Stacking (`/de/de/about`)** | Passing raw path with `/de` prefix back to `router.replace` or `next-intl` link helper. | **Rule**: Use deterministic path normalization (`getCleanPath` and `getTargetUrl`) in `LanguageSwitcher.tsx` to strip existing prefixes before prepending target locale. |
| **Stale Client Cache on Switch** | Soft client transition (`router.push`) skipping server-side translation reload. | **Rule**: Execute `window.location.href = targetUrl` in `LanguageSwitcher.tsx` for clean full-page reloading of server component translations. |
| **Duplicate Content Warnings in SEO** | Omitting `hreflang` metadata alternates. | **Rule**: Always export dynamic `generateMetadata` containing `canonical` and `alternates` (`en`, `de`, `x-default`). |

---

## Step-by-Step AI Execution Workflow

### Step 1: Content Extraction & Source of Truth (`messages/en.json`)
1. Read the target `.tsx` component/page.
2. Identify all visible English text strings, including headings, paragraphs, badge texts, array lists, and meta titles/descriptions.
3. Copy the text **verbatim** into `messages/en.json` under an explicit namespace:
```json
{
  "about": {
    "badge": "About",
    "brandName": "Height Comparison",
    "heroQuote": "Verbatim text here..."
  }
}
```

### Step 2: Create Target Locale Dictionary (`messages/de.json`)
1. Mirror the JSON key structure from `messages/en.json` key-for-key.
2. Translate only the string values into the target language. Keep variable placeholders (e.g. `{count}`) unchanged.

### Step 3: Relocate & Update TSX Page Component
1. Create target localized file path: `src/app/[locale]/<page-name>/page.tsx`.
2. Import `getTranslations` from `next-intl/server`.
3. Fetch translation strings dynamically in the Server Component:
```tsx
import { getTranslations } from 'next-intl/server';

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="min-h-screen bg-bg">
      <h1 className="text-4xl font-black text-foreground">{t('badge')}</h1>
      <p>{t('heroQuote')}</p>
    </div>
  );
}
```
4. Verify that **ALL** Tailwind CSS classes, Lucide icons, and DOM container structures remain 100% untouched.

### Step 4: Add Localized SEO Metadata
Export dynamic `generateMetadata` in every localized `page.tsx`:
```tsx
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const baseUrl = 'https://heightcomparisoncalculator.com';
  const canonicalUrl = locale === 'en' ? `${baseUrl}/about` : `${baseUrl}/${locale}/about`;

  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/about`,
        de: `${baseUrl}/de/about`,
        'x-default': `${baseUrl}/about`
      }
    }
  };
}
```

### Step 5: Verify Language Switcher Navigation
Ensure `src/components/LanguageSwitcher.tsx` handles clean URL calculation:
```tsx
function getCleanPath(rawPathname: string): string {
  let path = rawPathname || '/';
  if (path.startsWith('/de/') || path === '/de') path = path.slice(3) || '/';
  else if (path.startsWith('/en/') || path === '/en') path = path.slice(3) || '/';
  if (!path.startsWith('/')) path = '/' + path;
  return path;
}

function getTargetUrl(rawPathname: string, targetLocale: 'en' | 'de'): string {
  const cleanPath = getCleanPath(rawPathname);
  return targetLocale === 'en' ? cleanPath : (cleanPath === '/' ? '/de' : `/de${cleanPath}`);
}
```

### Step 6: Verification & Clean Build
1. Delete the unlocalized source file (e.g. `src/app/about/page.tsx`).
2. Run `npm run build` to verify 0 TypeScript errors and 0 missing route warnings.
3. Test paths in browser:
   - `http://localhost:3000/about` (English)
   - `http://localhost:3000/de/about` (German)
