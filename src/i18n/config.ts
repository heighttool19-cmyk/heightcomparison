/**
 * Single Source of Truth for Multilingual (i18n) Configuration
 *
 * All supported languages, date formatters, direction (LTR/RTL),
 * routing helpers, and SEO alternates are defined here to follow DRY principles.
 */

export interface AppLocale {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  dateLocale: string;
  dir: 'ltr' | 'rtl';
}

export const ALL_SUPPORTED_LOCALES: AppLocale[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dateLocale: 'en-US', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dateLocale: 'de-DE', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dateLocale: 'es-ES', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dateLocale: 'fr-FR', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', dateLocale: 'pt-PT', dir: 'ltr' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', dateLocale: 'nl-NL', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dateLocale: 'ar-SA', dir: 'rtl' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dateLocale: 'it-IT', dir: 'ltr' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', dateLocale: 'sv-SE', dir: 'ltr' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', dateLocale: 'pl-PL', dir: 'ltr' },
];

/**
 * Staged Language Rollout Configuration
 * 
 * Control which languages are published live to users and search engines.
 * To enable a language, simply add its code to this list:
 * - English only: ['en']
 * - English + German: ['en', 'de']
 * - English + German + Spanish: ['en', 'de', 'es']
 */
export const PUBLISHED_LOCALES: string[] = ['en'];

export const SUPPORTED_LOCALES: AppLocale[] = ALL_SUPPORTED_LOCALES.filter((loc) =>
  PUBLISHED_LOCALES.includes(loc.code)
);

export const ALL_LOCALE_CODES = SUPPORTED_LOCALES.map((l) => l.code);
export const DEFAULT_LOCALE = 'en';
export const BASE_SITE_URL = 'https://heightcomparisoncalculator.com';

/** Format a date string using the active locale's native standard */
export function formatLocalizedDate(dateStr: string, locale: string): string {
  const match = SUPPORTED_LOCALES.find((l) => l.code === locale);
  const dateLocale = match?.dateLocale || 'en-US';
  return new Date(dateStr).toLocaleDateString(dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Check if a given locale is right-to-left (RTL) */
export function isRtlLocale(locale: string): boolean {
  return SUPPORTED_LOCALES.find((l) => l.code === locale)?.dir === 'rtl';
}

/** Generate a localized URL path for any internal route */
export function getLocalizedHref(path: string, locale?: string): string {
  const targetLocale = locale || DEFAULT_LOCALE;
  if (targetLocale === DEFAULT_LOCALE) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return normalizedPath === '/' ? `/${targetLocale}` : `/${targetLocale}${normalizedPath}`;
}

/** Generate canonical URL for SEO metadata */
export function getCanonicalUrl(path: string, locale?: string): string {
  const targetLocale = locale || DEFAULT_LOCALE;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const pathWithoutLeadingSlash = cleanPath === '/' ? '' : cleanPath;
  return targetLocale === DEFAULT_LOCALE
    ? `${BASE_SITE_URL}${cleanPath}`
    : `${BASE_SITE_URL}/${targetLocale}${pathWithoutLeadingSlash}`;
}

/** Generate the full alternate languages dictionary for Next.js SEO metadata */
export function getAlternateLanguages(path: string): Record<string, string> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const pathWithoutLeadingSlash = cleanPath === '/' ? '' : cleanPath;

  const languages: Record<string, string> = {};
  for (const loc of SUPPORTED_LOCALES) {
    languages[loc.code] =
      loc.code === DEFAULT_LOCALE
        ? `${BASE_SITE_URL}${cleanPath}`
        : `${BASE_SITE_URL}/${loc.code}${pathWithoutLeadingSlash}`;
  }
  languages['x-default'] = `${BASE_SITE_URL}${cleanPath}`;
  return languages;
}

export interface OpenGraphImageOptions {
  url?: string;
  width?: number;
  height?: number;
  alt?: string;
}

/**
 * Standardized OpenGraph and Twitter card metadata generator for 1200x630 social preview parity (T3)
 */
export function getSocialMetadata({
  title,
  description,
  path,
  locale = DEFAULT_LOCALE,
  image = {
    url: `${BASE_SITE_URL}/height-comparison-chart-example.png`,
    width: 1200,
    height: 630,
    alt: 'Height Comparison Calculator preview chart',
  },
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  locale?: string;
  image?: OpenGraphImageOptions;
  type?: 'website' | 'article';
}) {
  const canonicalUrl = getCanonicalUrl(path, locale);
  const imageUrl = image.url?.startsWith('http')
    ? image.url
    : `${BASE_SITE_URL}${image.url || '/height-comparison-chart-example.png'}`;
  const width = image.width || 1200;
  const height = image.height || 630;
  const alt = image.alt || title;

  return {
    openGraph: {
      type,
      siteName: 'Height Comparison Calculator',
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width,
          height,
          alt,
        },
      ],
      locale: locale === 'de' ? 'de_DE' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [imageUrl],
    },
  };
}
