/**
 * Central configuration for multilingual translation targets in Sanity Studio.
 *
 * To add a new language in the future (e.g., Italian, Japanese):
 * simply add an entry to TARGET_LANGUAGES below.
 * The Sanity schema and translation actions will automatically adapt!
 */

export interface TranslationLanguage {
  id: string;          // ISO-639-1 code used in URLs and Sanity fields (e.g. 'de', 'es', 'fr')
  title: string;       // English name for AI prompt instructions (e.g. 'German', 'Spanish', 'French')
  nativeLabel: string; // Native language name for editor UI display (e.g. 'Deutsch', 'Español', 'Français')
  flag: string;        // Flag emoji for editor visual clarity
}

export const TARGET_LANGUAGES: TranslationLanguage[] = [
  {
    id: 'de',
    title: 'German',
    nativeLabel: 'Deutsch',
    flag: '🇩🇪',
  },
  {
    id: 'es',
    title: 'Spanish',
    nativeLabel: 'Español',
    flag: '🇪🇸',
  },
  {
    id: 'fr',
    title: 'French',
    nativeLabel: 'Français',
    flag: '🇫🇷',
  },
];
