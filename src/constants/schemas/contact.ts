import { CONTACT_SCHEMA as EN_SCHEMA } from './en/contact';
import { CONTACT_SCHEMA as DE_SCHEMA } from './de/contact';
import { CONTACT_SCHEMA as ES_SCHEMA } from './es/contact';
import { CONTACT_SCHEMA as FR_SCHEMA } from './fr/contact';
import { CONTACT_SCHEMA as PT_SCHEMA } from './pt/contact';
import { CONTACT_SCHEMA as NL_SCHEMA } from './nl/contact';
import { CONTACT_SCHEMA as AR_SCHEMA } from './ar/contact';
import { CONTACT_SCHEMA as IT_SCHEMA } from './it/contact';
import { CONTACT_SCHEMA as SV_SCHEMA } from './sv/contact';
import { CONTACT_SCHEMA as PL_SCHEMA } from './pl/contact';

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

export function getContactSchema(locale: string = 'en'): Record<string, any> {
  return schemas[locale] || EN_SCHEMA;
}

export const CONTACT_SCHEMA = EN_SCHEMA;
