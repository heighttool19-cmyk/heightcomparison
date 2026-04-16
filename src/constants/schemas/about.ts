import { BASE_URL, ORGANIZATION_SCHEMA } from '../schemas';

export const ABOUT_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
        ORGANIZATION_SCHEMA,
        {
            "@type": "WebPage",
            "@id": `${BASE_URL}/about/#webpage`,
            "url": `${BASE_URL}/about`,
            "name": "About Height Comparison",
            "description": "Learn about the mission, logic, and calculators behind the Height Comparison Calculator tool."
        }
    ]
};
