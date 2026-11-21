import { ABOUT_SCHEMA as EN_SCHEMA } from './en/about';
import { ABOUT_SCHEMA as DE_SCHEMA } from './de/about';
import { ABOUT_SCHEMA as ES_SCHEMA } from './es/about';
import { ABOUT_SCHEMA as FR_SCHEMA } from './fr/about';
import { ABOUT_SCHEMA as PT_SCHEMA } from './pt/about';
import { ABOUT_SCHEMA as NL_SCHEMA } from './nl/about';
import { ABOUT_SCHEMA as AR_SCHEMA } from './ar/about';
import { ABOUT_SCHEMA as IT_SCHEMA } from './it/about';
import { ABOUT_SCHEMA as SV_SCHEMA } from './sv/about';
import { ABOUT_SCHEMA as PL_SCHEMA } from './pl/about';

const schemas: Record<string, Record<string, any>> = {
  en: EN_SCHEMA,
  de: DE_SCHEMA,
  es: ES_SCHEMA,
  fr: FR_SCHEMA,
  pt: PT_SCHEMA,
  nl: NL_SCHEMA,
  ar: AR_SCHEMA,
  it: IT_SCHEMA,
  sv: SV_SCHEMA,
  pl: PL_SCHEMA,
};

export function getAboutSchema(locale: string = 'en'): Record<string, any> {
  return schemas[locale] || EN_SCHEMA;
}

export const ABOUT_SCHEMA = EN_SCHEMA;
