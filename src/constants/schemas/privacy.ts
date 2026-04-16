import { BASE_URL, ORGANIZATION_SCHEMA } from '../schemas';

export const PRIVACY_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
        ORGANIZATION_SCHEMA,
        {
            "@type": "WebPage",
            "@id": `${BASE_URL}/privacy/#webpage`,
            "url": `${BASE_URL}/privacy`,
            "name": "Privacy Policy",
            "description": "Information about how Height Comparison Calculator handles your data and protects your privacy."
        }
    ]
};
