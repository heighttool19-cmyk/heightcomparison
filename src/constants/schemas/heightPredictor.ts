import { BASE_URL, ORGANIZATION_SCHEMA } from '../schemas';

export const HEIGHT_PREDICTOR_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
        ORGANIZATION_SCHEMA,
        {
            "@type": "WebPage",
            "@id": `${BASE_URL}/height-predictor/#webpage`,
            "url": `${BASE_URL}/height-predictor`,
            "name": "Height Predictor",
            "description": "Estimate your child's future adult height using the Khamis-Roche method and growth patterns."
        }
    ]
};
