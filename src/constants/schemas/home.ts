import { HOME_SCHEMA as EN_SCHEMA } from './en/home';
import { HOME_SCHEMA as DE_SCHEMA } from './de/home';
import { HOME_SCHEMA as ES_SCHEMA } from './es/home';
import { HOME_SCHEMA as FR_SCHEMA } from './fr/home';
import { HOME_SCHEMA as PT_SCHEMA } from './pt/home';
import { HOME_SCHEMA as NL_SCHEMA } from './nl/home';
import { HOME_SCHEMA as AR_SCHEMA } from './ar/home';
import { HOME_SCHEMA as IT_SCHEMA } from './it/home';
import { HOME_SCHEMA as SV_SCHEMA } from './sv/home';
import { HOME_SCHEMA as PL_SCHEMA } from './pl/home';

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

export function getHomeSchema(locale: string = 'en'): Record<string, any> {
  return schemas[locale] || EN_SCHEMA;
}

export const HOME_SCHEMA = EN_SCHEMA;
