import { IMAGE_TO_HEIGHT_SCHEMA as EN_SCHEMA } from './en/imageToHeight';
import { IMAGE_TO_HEIGHT_SCHEMA as DE_SCHEMA } from './de/imageToHeight';
import { IMAGE_TO_HEIGHT_SCHEMA as ES_SCHEMA } from './es/imageToHeight';
import { IMAGE_TO_HEIGHT_SCHEMA as FR_SCHEMA } from './fr/imageToHeight';
import { IMAGE_TO_HEIGHT_SCHEMA as PT_SCHEMA } from './pt/imageToHeight';
import { IMAGE_TO_HEIGHT_SCHEMA as NL_SCHEMA } from './nl/imageToHeight';
import { IMAGE_TO_HEIGHT_SCHEMA as AR_SCHEMA } from './ar/imageToHeight';
import { IMAGE_TO_HEIGHT_SCHEMA as IT_SCHEMA } from './it/imageToHeight';
import { IMAGE_TO_HEIGHT_SCHEMA as SV_SCHEMA } from './sv/imageToHeight';
import { IMAGE_TO_HEIGHT_SCHEMA as PL_SCHEMA } from './pl/imageToHeight';

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

export function getImageToHeightSchema(locale: string = 'en'): Record<string, any> {
  return schemas[locale] || EN_SCHEMA;
}

export const IMAGE_TO_HEIGHT_SCHEMA = EN_SCHEMA;
