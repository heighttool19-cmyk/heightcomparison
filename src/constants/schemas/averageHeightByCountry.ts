import { AVERAGE_HEIGHT_BY_COUNTRY_SCHEMA as EN_SCHEMA } from './en/averageHeightByCountry';
import { AVERAGE_HEIGHT_BY_COUNTRY_SCHEMA as DE_SCHEMA } from './de/averageHeightByCountry';
import { AVERAGE_HEIGHT_BY_COUNTRY_SCHEMA as ES_SCHEMA } from './es/averageHeightByCountry';
import { AVERAGE_HEIGHT_BY_COUNTRY_SCHEMA as FR_SCHEMA } from './fr/averageHeightByCountry';
import { AVERAGE_HEIGHT_BY_COUNTRY_SCHEMA as PT_SCHEMA } from './pt/averageHeightByCountry';
import { AVERAGE_HEIGHT_BY_COUNTRY_SCHEMA as NL_SCHEMA } from './nl/averageHeightByCountry';
import { AVERAGE_HEIGHT_BY_COUNTRY_SCHEMA as AR_SCHEMA } from './ar/averageHeightByCountry';
import { AVERAGE_HEIGHT_BY_COUNTRY_SCHEMA as IT_SCHEMA } from './it/averageHeightByCountry';
import { AVERAGE_HEIGHT_BY_COUNTRY_SCHEMA as SV_SCHEMA } from './sv/averageHeightByCountry';
import { AVERAGE_HEIGHT_BY_COUNTRY_SCHEMA as PL_SCHEMA } from './pl/averageHeightByCountry';

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

export function getAverageHeightByCountrySchema(locale: string = 'en'): Record<string, any> {
  return schemas[locale] || EN_SCHEMA;
}

export const AVERAGE_HEIGHT_BY_COUNTRY_SCHEMA = EN_SCHEMA;
