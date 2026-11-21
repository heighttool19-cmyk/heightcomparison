import { HEIGHT_PREDICTOR_SCHEMA as EN_SCHEMA } from './en/heightPredictor';
import { HEIGHT_PREDICTOR_SCHEMA as DE_SCHEMA } from './de/heightPredictor';
import { HEIGHT_PREDICTOR_SCHEMA as ES_SCHEMA } from './es/heightPredictor';
import { HEIGHT_PREDICTOR_SCHEMA as FR_SCHEMA } from './fr/heightPredictor';
import { HEIGHT_PREDICTOR_SCHEMA as PT_SCHEMA } from './pt/heightPredictor';
import { HEIGHT_PREDICTOR_SCHEMA as NL_SCHEMA } from './nl/heightPredictor';
import { HEIGHT_PREDICTOR_SCHEMA as AR_SCHEMA } from './ar/heightPredictor';
import { HEIGHT_PREDICTOR_SCHEMA as IT_SCHEMA } from './it/heightPredictor';
import { HEIGHT_PREDICTOR_SCHEMA as SV_SCHEMA } from './sv/heightPredictor';
import { HEIGHT_PREDICTOR_SCHEMA as PL_SCHEMA } from './pl/heightPredictor';

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

export function getHeightPredictorSchema(locale: string = 'en'): Record<string, any> {
  return schemas[locale] || EN_SCHEMA;
}

export const HEIGHT_PREDICTOR_SCHEMA = EN_SCHEMA;
