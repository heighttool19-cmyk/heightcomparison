import { PERCENTILE_SCHEMA as EN_SCHEMA } from './en/percentile';
import { PERCENTILE_SCHEMA as DE_SCHEMA } from './de/percentile';
import { PERCENTILE_SCHEMA as ES_SCHEMA } from './es/percentile';
import { PERCENTILE_SCHEMA as FR_SCHEMA } from './fr/percentile';
import { PERCENTILE_SCHEMA as PT_SCHEMA } from './pt/percentile';
import { PERCENTILE_SCHEMA as NL_SCHEMA } from './nl/percentile';
import { PERCENTILE_SCHEMA as AR_SCHEMA } from './ar/percentile';
import { PERCENTILE_SCHEMA as IT_SCHEMA } from './it/percentile';
import { PERCENTILE_SCHEMA as SV_SCHEMA } from './sv/percentile';
import { PERCENTILE_SCHEMA as PL_SCHEMA } from './pl/percentile';

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

export function getPercentileSchema(locale: string = 'en'): Record<string, any> {
  return schemas[locale] || EN_SCHEMA;
}

export const PERCENTILE_SCHEMA = EN_SCHEMA;
