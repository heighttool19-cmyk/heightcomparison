import { PRIVACY_SCHEMA as EN_SCHEMA } from './en/privacy';
import { PRIVACY_SCHEMA as DE_SCHEMA } from './de/privacy';
import { PRIVACY_SCHEMA as ES_SCHEMA } from './es/privacy';
import { PRIVACY_SCHEMA as FR_SCHEMA } from './fr/privacy';
import { PRIVACY_SCHEMA as PT_SCHEMA } from './pt/privacy';
import { PRIVACY_SCHEMA as NL_SCHEMA } from './nl/privacy';
import { PRIVACY_SCHEMA as AR_SCHEMA } from './ar/privacy';
import { PRIVACY_SCHEMA as IT_SCHEMA } from './it/privacy';
import { PRIVACY_SCHEMA as SV_SCHEMA } from './sv/privacy';
import { PRIVACY_SCHEMA as PL_SCHEMA } from './pl/privacy';

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

export function getPrivacySchema(locale: string = 'en'): Record<string, any> {
  return schemas[locale] || EN_SCHEMA;
}

export const PRIVACY_SCHEMA = EN_SCHEMA;
