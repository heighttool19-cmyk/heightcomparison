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

export const SUPPORTED_LOCALES: AppLocale[] = [
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
