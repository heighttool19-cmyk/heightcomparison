/**
 * Central configuration for multilingual translation targets in Sanity Studio.
 *
 * To add a new language in the future (e.g., Italian, Japanese):
 * simply add an entry to TARGET_LANGUAGES below.
 * The Sanity schema and translation actions will automatically adapt!
 */

import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/i18n/config';

export interface TranslationLanguage {
  id: string;          // ISO-639-1 code used in URLs and Sanity fields (e.g. 'de', 'es', 'fr')
  title: string;       // English name for AI prompt instructions (e.g. 'German', 'Spanish', 'French')
  nativeLabel: string; // Native language name for editor UI display (e.g. 'Deutsch', 'Español', 'Français')
  flag: string;        // Flag emoji for editor visual clarity
}

export const TARGET_LANGUAGES: TranslationLanguage[] = SUPPORTED_LOCALES
  .filter((l) => l.code !== DEFAULT_LOCALE)
  .map((l) => ({
    id: l.code,
    title: l.name,
    nativeLabel: l.nativeName,
    flag: l.flag,
  }));
