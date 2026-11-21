import { HEIGHT_DIFFERENCE_SCHEMA as EN_SCHEMA } from './en/heightDifference';
import { HEIGHT_DIFFERENCE_SCHEMA as DE_SCHEMA } from './de/heightDifference';
import { HEIGHT_DIFFERENCE_SCHEMA as ES_SCHEMA } from './es/heightDifference';
import { HEIGHT_DIFFERENCE_SCHEMA as FR_SCHEMA } from './fr/heightDifference';
import { HEIGHT_DIFFERENCE_SCHEMA as PT_SCHEMA } from './pt/heightDifference';
import { HEIGHT_DIFFERENCE_SCHEMA as NL_SCHEMA } from './nl/heightDifference';
import { HEIGHT_DIFFERENCE_SCHEMA as AR_SCHEMA } from './ar/heightDifference';
import { HEIGHT_DIFFERENCE_SCHEMA as IT_SCHEMA } from './it/heightDifference';
import { HEIGHT_DIFFERENCE_SCHEMA as SV_SCHEMA } from './sv/heightDifference';
import { HEIGHT_DIFFERENCE_SCHEMA as PL_SCHEMA } from './pl/heightDifference';

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

export function getHeightDifferenceSchema(locale: string = 'en'): Record<string, any> {
  return schemas[locale] || EN_SCHEMA;
}

export const HEIGHT_DIFFERENCE_SCHEMA = EN_SCHEMA;
