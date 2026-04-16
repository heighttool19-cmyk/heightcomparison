export const BASE_URL = 'https://heightcomparisoncalculator.com';

export const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  "name": "Height Comparison Calculator",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/logo.png`,
    "width": 512,
    "height": 512
  }
};

export const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "url": BASE_URL,
  "name": "Height Comparison Calculator",
  "publisher": {
    "@id": `${BASE_URL}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${BASE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};
