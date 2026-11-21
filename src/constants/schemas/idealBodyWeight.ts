import { IDEAL_BODY_WEIGHT_SCHEMA as EN_SCHEMA } from './en/idealBodyWeight';
import { IDEAL_BODY_WEIGHT_SCHEMA as DE_SCHEMA } from './de/idealBodyWeight';
import { IDEAL_BODY_WEIGHT_SCHEMA as ES_SCHEMA } from './es/idealBodyWeight';
import { IDEAL_BODY_WEIGHT_SCHEMA as FR_SCHEMA } from './fr/idealBodyWeight';
import { IDEAL_BODY_WEIGHT_SCHEMA as PT_SCHEMA } from './pt/idealBodyWeight';
import { IDEAL_BODY_WEIGHT_SCHEMA as NL_SCHEMA } from './nl/idealBodyWeight';
import { IDEAL_BODY_WEIGHT_SCHEMA as AR_SCHEMA } from './ar/idealBodyWeight';
import { IDEAL_BODY_WEIGHT_SCHEMA as IT_SCHEMA } from './it/idealBodyWeight';
import { IDEAL_BODY_WEIGHT_SCHEMA as SV_SCHEMA } from './sv/idealBodyWeight';
import { IDEAL_BODY_WEIGHT_SCHEMA as PL_SCHEMA } from './pl/idealBodyWeight';

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

export function getIdealBodyWeightSchema(locale: string = 'en'): Record<string, any> {
  return schemas[locale] || EN_SCHEMA;
}

export const IDEAL_BODY_WEIGHT_SCHEMA = EN_SCHEMA;
