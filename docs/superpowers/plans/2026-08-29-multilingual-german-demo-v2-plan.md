# Multilingual German Demo (v2 - Industrial Standard) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement an industrial-standard multilingual (i18n) infrastructure using Next.js 15 App Router dynamic `[locale]` routing, enabling English (`/about`) and German (`/de/about`) with **0% CSS loss**, **0% text content loss**, and 100% SEO/indexing compliance (`hreflang` & canonicals).

**Architecture:** Use `next-intl` with standard App Router dynamic route segments (`src/app/[locale]/...`) and `localePrefix: 'as-needed'`. English serves as unprefixed default route while German is served under `/de/`.

**Tech Stack:** Next.js 15 App Router, React 19, `next-intl`, Tailwind CSS, TypeScript.

**Spec:** `docs/superpowers/specs/2026-08-29-multilingual-german-demo-design.md`

## Global Constraints

- **Zero CSS Loss**: Preserve all Tailwind CSS utility classes, spacing, layout containers, and Lucide icons verbatim.
- **Zero Content Loss**: Retain 100% of the existing English text verbatim in `messages/en.json`.
- **SEO & Indexing**: Every localized page must include dynamic metadata with `hreflang` alternates (`en`, `de`, `x-default`) and canonical URLs.
- **Dynamic Segment Routing**: All localized pages live within `src/app/[locale]/...` with `localePrefix: 'as-needed'`.

---

### Task 1: Next-Intl Configuration & i18n Routing Setup

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Modify: `src/middleware.ts`
- Modify: `next.config.ts`

**Interfaces:**
- Produces: `routing` export (`Link`, `redirect`, `usePathname`, `useRouter`, `defineRouting`) for locale navigation.

- [ ] **Step 1: Write `src/i18n/routing.ts`**

```typescript
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

- [ ] **Step 2: Write `src/i18n/request.ts`**

```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

- [ ] **Step 3: Update `src/middleware.ts` for next-intl locale routing**

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(de|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
```

- [ ] **Step 4: Update `next.config.ts` with `createNextIntlPlugin`**

```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['mongoose', 'mongodb', 'bson', 'kdf'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
      {
        source: '/:path*',
        missing: [
          {
            type: 'header',
            key: 'RSC',
          },
          {
            type: 'header',
            key: 'Next-Router-Prefetch',
          },
        ],
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Commit Task 1**

```bash
git add src/i18n/routing.ts src/i18n/request.ts src/middleware.ts next.config.ts
git commit -m "feat(i18n): configure next-intl routing middleware and next.config plugin"
```

---

### Task 2: Translation Dictionaries (`messages/en.json` & `messages/de.json`)

**Files:**
- Create: `messages/en.json`
- Create: `messages/de.json`

**Interfaces:**
- Produces: `messages/en.json` (English content dictionary, verbatim text extraction) and `messages/de.json` (German translation dictionary).

- [ ] **Step 1: Create `messages/en.json`**

```json
{
  "common": {
    "language": "Language",
    "english": "English",
    "german": "Deutsch"
  },
  "nav": {
    "about": "About",
    "blog": "Blog"
  },
  "about": {
    "badge": "About",
    "brandName": "Height Comparison",
    "heroQuote": "HeightComparison started as a side project built around one simple observation: height numbers are almost useless without context. You need to see them. A 12 cm gap between two people at 165 cm is a genuinely different experience to the same 12 cm gap at 185 cm. The proportion changes. The visual relationship changes. Yet every other comparison tool on the internet just subtracts one number from another and calls it done.",
    "builtDifferent": "We built something different.",
    "whatItDoesTitle": "What the Tool Actually Does",
    "whatItDoesParagraphs": [
      "The height comparison chart takes your measurements and renders them at true proportional scale. Every bar is mathematically sized relative to every other bar on the screen. No rounding, no visual shortcuts, no bars that look 'close enough.' If Person A is 170 cm and Person B is 198 cm, that 16.5% gap is visible exactly as it should be.",
      "You can compare up to an unlimited number of subjects at once, which turns out to be useful more often than you'd expect. A family of five, a sports roster, a lineup of anime characters, a person standing next to a waterfall. All of it on one chart, all of it at scale.",
      "The celebrity database covers athletes, actors, musicians, and public figures across regions including Bollywood, British, Asian, and American entertainment. The fictional character library pulls from official production guides and licensed databooks for anime, cartoons, DC, and fantasy franchises. These aren't crowd-estimated figures. They're sourced from the records that the creators and organizations themselves published.",
      "There's also an image upload feature that slots a photo into the chart at real proportions, accurate to within 1 to 2 cm. Useful if you want to visualize yourself against a reference without manually measuring."
    ],
    "otherCalculatorsTitle": "The Other Calculators",
    "calculators": [
      {
        "title": "Height Difference Calculator",
        "text": "For when you want the exact gap between two heights in centimetres, inches, and percentage, without building a full chart. Faster for focused comparisons."
      },
      {
        "title": "Height Predictor",
        "text": "Uses the Khamis-Roche and Mid-Parental formulas to estimate adult height from a child's current measurements and parent heights. These are the same formulas used in clinical settings, not guesswork."
      },
      {
        "title": "Height Weight Percentile Calculator",
        "text": "Compares a person's height and weight against WHO and CDC population data, with charts broken down by age and sex. It covers both adults and children."
      },
      {
        "title": "Ideal Body Weight Calculator",
        "text": "Runs the Devine, Robinson, and Hamwi formulas side by side so you can see where each lands, rather than presenting a single number as if it's the whole answer."
      },
      {
        "title": "Average Height by Country",
        "text": "Covers 46 countries with a sortable table, regional breakdowns, a world heatmap, and height extremes. It's the reference we kept wanting to have open in another tab when thinking about global height context."
      },
      {
        "title": "Image to Height",
        "text": "Estimates height from a photo. There's also a morning height variation guide built into it, which matters more than most people realize when comparing measurements taken at different times of day."
      }
    ],
    "noAccountTitle": "No Account, No Payment, No Watermarks",
    "noAccountParagraphs": [
      "This decision was made early and has not changed. The PNG export has no watermark. The celebrity database is not behind a paywall. There is no subscription tier that unlocks features. The full tool is free.",
      "That's not a marketing angle. It's just how the tool was designed. Adding friction through account creation or paywalled exports would make the tool worse. Height comparison is not a premium activity."
    ],
    "accuracyTitle": "A Note on Data Accuracy",
    "accuracyParagraphs": [
      "Conflicting height records are common, particularly for celebrities. Where data conflicts, we normalize to the most recently verified figure from a credible public source, not the most widely repeated one. Character heights come from licensed official materials where possible. Landmark and object dimensions come from architectural and scientific reference sources."
    ],
    "nothingUserSubmitted": "Nothing here is user-submitted.",
    "footerQuote": "Visualizing height context, one pixel at a time."
  },
  "metadata": {
    "aboutTitle": "About Us - Height Comparison Tool",
    "aboutDescription": "Learn about our true proportional scale height comparison tool, calculators, data sources, and accuracy standards."
  }
}
```

- [ ] **Step 2: Create `messages/de.json`**

```json
{
  "common": {
    "language": "Sprache",
    "english": "English",
    "german": "Deutsch"
  },
  "nav": {
    "about": "Über uns",
    "blog": "Blog"
  },
  "about": {
    "badge": "Über uns",
    "brandName": "Höhenvergleich",
    "heroQuote": "HeightComparison entstand als Nebenprojekt basierend auf einer einfachen Beobachtung: Höhenangaben sind ohne Kontext nahezu nutzlos. Man muss sie sehen. Ein Unterschied von 12 cm zwischen zwei Personen bei 165 cm ist eine völlig andere Erfahrung als derselbe Unterschied von 12 cm bei 185 cm. Die Proportionalität ändert sich. Das visuelle Verhältnis ändert sich. Dennoch zieht jedes andere Vergleichstool im Internet nur eine Zahl von einer anderen ab.",
    "builtDifferent": "Wir haben etwas anderes gebaut.",
    "whatItDoesTitle": "Was das Tool tatsächlich tut",
    "whatItDoesParagraphs": [
      "Das Höhenvergleichsdiagramm nimmt Ihre Messwerte und stellt sie im echten proportionalen Maßstab dar. Jeder Balken ist mathematisch relativ zu jedem anderen Balken auf dem Bildschirm skaliert. Keine Rundungen, keine visuellen Abkürzungen.",
      "Sie können unbegrenzt viele Personen oder Objekte gleichzeitig vergleichen. Eine fünfköpfige Familie, ein Kader eines Sportteams, Anime-Charaktere oder eine Person neben einem Wasserfall – alles auf einem Diagramm im richtigen Maßstab.",
      "Die Prominenten-Datenbank umfasst Sportler, Schauspieler, Musiker und öffentliche Personen. Die Bibliothek fiktiver Charaktere stammt aus offiziellen Produktionsdatenbüchern. Es handelt sich nicht um Schätzungen der Masse, sondern um Daten aus offiziellen Veröffentlichungen der Ersteller.",
      "Es gibt auch eine Bild-Upload-Funktion, die ein Foto im echten Größenverhältnis auf 1 bis 2 cm genau in das Diagramm einfügt."
    ],
    "otherCalculatorsTitle": "Die weiteren Rechner",
    "calculators": [
      {
        "title": "Höhendifferenz-Rechner",
        "text": "Für den genauen Unterschied zwischen zwei Höhen in Zentimetern, Zoll und Prozent ohne Erstellung eines vollständigen Diagramms."
      },
      {
        "title": "Größenwachstums-Rechner",
        "text": "Verwendet die Khamis-Roche- und Mid-Parental-Formeln zur Schätzung der Erwachsenengröße eines Kindes basierend auf den aktuellen Maßen und der Elternhöhe."
      },
      {
        "title": "Größen- & Gewichtsperzentilen-Rechner",
        "text": "Vergleicht Körpergröße und Gewicht mit WHO- und CDC-Bevölkerungsdaten, aufgeschlüsselt nach Alter und Geschlecht."
      },
      {
        "title": "Idealgewichts-Rechner",
        "text": "Führt die Formeln von Devine, Robinson und Hamwi nebeneinander aus, um eine fundierte Spanne zu zeigen."
      },
      {
        "title": "Durchschnittsgröße nach Land",
        "text": "Deckt 46 Länder mit einer sortierbaren Tabelle, regionalen Aufschlüsselungen und einer Welt-Heatmap ab."
      },
      {
        "title": "Bild zu Körpergröße",
        "text": "Schätzt die Körpergröße anhand eines Fotos mit integriertem Leitfaden zu morgendlichen Größenschwankungen."
      }
    ],
    "noAccountTitle": "Kein Konto, Keine Zahlung, Keine Wasserzeichen",
    "noAccountParagraphs": [
      "Diese Entscheidung wurde früh getroffen und hat sich nicht geändert. Der PNG-Export hat kein Wasserzeichen. Die Datenbank ist kostenlos. Alle Funktionen sind frei zugänglich.",
      "Das ist kein Marketing-Gag. So wurde das Tool entwickelt. Die Erstellung von Konten oder Bezahlschranken würde das Tool verschlechtern."
    ],
    "accuracyTitle": "Hinweis zur Datengenauigkeit",
    "accuracyParagraphs": [
      "Widersprüchliche Höhenangaben kommen vor. Bei Konflikten normalisieren wir auf die am kürzesten verifizierte Angabe aus glaubwürdigen öffentlichen Quellen. Abmessungen von Wahrzeichen stammen aus architektonischen Referenzen."
    ],
    "nothingUserSubmitted": "Nichts hier ist von Benutzern eingereicht.",
    "footerQuote": "Höhenkontext visualisieren, Pixel für Pixel."
  },
  "metadata": {
    "aboutTitle": "Über uns - Höhenvergleichs-Rechner",
    "aboutDescription": "Erfahren Sie mehr über unser Höhendifferenz- und Vergleichstool mit maßstabsgetreuer visueller Darstellung."
  }
}
```

- [ ] **Step 3: Commit Task 2**

```bash
git add messages/en.json messages/de.json
git commit -m "feat(i18n): add English and German translation files"
```

---

### Task 3: Root & Locale Layout Setup

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/[locale]/layout.tsx`

**Interfaces:**
- Consumes: `routing` locales.
- Produces: `NextIntlClientProvider` wrapper for `[locale]` dynamic routes.

- [ ] **Step 1: Create `src/app/[locale]/layout.tsx`**

```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

- [ ] **Step 2: Commit Task 3**

```bash
git add src/app/\[locale\]/layout.tsx
git commit -m "feat(i18n): create LocaleLayout with NextIntlClientProvider"
```

---

### Task 4: Zero-Loss Migration of About Page to `src/app/[locale]/about/page.tsx`

**Files:**
- Create: `src/app/[locale]/about/page.tsx`
- Delete: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `getTranslations({ locale, namespace: 'about' })`
- Produces: Localized About page preserving 100% of HTML/CSS structure.

- [ ] **Step 1: Create `src/app/[locale]/about/page.tsx`**

```typescript
import { getTranslations } from 'next-intl/server';
import { Info, BarChart2, Zap, Lock, ShieldCheck } from 'lucide-react';
import JsonLd from '@/components/common/JsonLd';
import { ABOUT_SCHEMA } from '@/constants/schemas/about';

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

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const calculators = t.raw('calculators') as Array<{ title: string; text: string }>;
  const whatItDoesParagraphs = t.raw('whatItDoesParagraphs') as string[];
  const noAccountParagraphs = t.raw('noAccountParagraphs') as string[];
  const accuracyParagraphs = t.raw('accuracyParagraphs') as string[];

  return (
    <div className="min-h-screen bg-bg">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-accent/5 to-transparent" />
      <JsonLd data={ABOUT_SCHEMA} />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-20">
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-accent/10 text-accent mb-6">
            <Info size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase mb-4">
            {t('badge')} <span className="text-accent">{t('brandName')}</span>
          </h1>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
        </header>

        <div className="bg-surface border-2 border-border rounded-[2.5rem] shadow-2xl overflow-hidden mb-12">
          <div className="p-8 md:p-12 space-y-8">
            {/* Section 1: Intro */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl md:text-2xl text-foreground font-bold leading-relaxed tracking-tight">
                {t('heroQuote')}
              </p>
              <p className="text-lg text-muted font-medium mt-6">
                {t('builtDifferent')}
              </p>
            </div>

            {/* Section 2: What the Tool Actually Does */}
            <div className="pt-8 border-t border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <BarChart2 className="text-accent" size={24} />
                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('whatItDoesTitle')}</h2>
              </div>
              <div className="space-y-6 text-muted leading-relaxed font-medium text-lg">
                {whatItDoesParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Section 3: The Other Calculators */}
            <div className="pt-8 border-t border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-accent" size={24} />
                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('otherCalculatorsTitle')}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {calculators.map((tool, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-accent/5 border border-accent/10">
                    <h3 className="font-black text-foreground text-sm uppercase mb-2 tracking-wide">{tool.title}</h3>
                    <p className="text-sm text-muted/80 leading-relaxed font-medium font-sans">
                      {tool.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: No Account */}
            <div className="pt-8 border-t border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="text-accent" size={24} />
                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('noAccountTitle')}</h2>
              </div>
              <div className="space-y-4 text-muted leading-relaxed font-medium text-lg">
                {noAccountParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Section 5: Accuracy */}
            <div className="pt-8 border-t border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-accent" size={24} />
                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('accuracyTitle')}</h2>
              </div>
              <div className="space-y-4 text-muted leading-relaxed font-medium text-lg">
                {accuracyParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                <p className="font-black text-foreground uppercase tracking-widest text-sm pt-4">
                  {t('nothingUserSubmitted')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pb-12">
          <p className="text-muted font-medium mb-6 italic opacity-70">
            {t('footerQuote')}
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Remove old unlocalized `src/app/about/page.tsx`**

```bash
git rm src/app/about/page.tsx
```

- [ ] **Step 3: Commit Task 4**

```bash
git add src/app/\[locale\]/about/page.tsx
git commit -m "feat(i18n): migrate About page to [locale] dynamic segment with zero CSS/text loss"
```

---

### Task 5: Language Switcher Component & Navbar Integration

**Files:**
- Create: `src/components/LanguageSwitcher.tsx`
- Modify: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `@/i18n/routing` (`usePathname`, `useRouter`).
- Produces: `LanguageSwitcher` button component.

- [ ] **Step 1: Create `src/components/LanguageSwitcher.tsx`**

```typescript
'use client';

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (nextLocale: 'en' | 'de') => {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative inline-flex items-center gap-1.5 bg-surface border border-border rounded-xl px-2.5 py-1.5 text-xs font-bold shadow-sm">
      <Globe size={14} className="text-accent" />
      <button
        type="button"
        disabled={isPending}
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
          locale === 'en' ? 'bg-accent text-accent-foreground font-black' : 'text-muted hover:text-foreground'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-border">|</span>
      <button
        type="button"
        disabled={isPending}
        onClick={() => handleLanguageChange('de')}
        className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
          locale === 'de' ? 'bg-accent text-accent-foreground font-black' : 'text-muted hover:text-foreground'
        }`}
        aria-label="Switch to Deutsch"
      >
        DE
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Add `LanguageSwitcher` to `src/components/Navbar.tsx`**

Import and render `<LanguageSwitcher />` inside `Navbar.tsx` next to the Theme Toggle button.

- [ ] **Step 3: Commit Task 5**

```bash
git add src/components/LanguageSwitcher.tsx src/components/Navbar.tsx
git commit -m "feat(i18n): integrate LanguageSwitcher into Navbar"
```

---

### Task 6: Verification & Full Production Build Validation

- [ ] **Step 1: Run production build**

```bash
npm run build
```
Expected output: Build compiles cleanly with 0 errors across all routes (`/[locale]/about`, etc.).

- [ ] **Step 2: Commit Task 6**

```bash
git commit --allow-empty -m "ci(i18n): verify production build passes cleanly"
```
