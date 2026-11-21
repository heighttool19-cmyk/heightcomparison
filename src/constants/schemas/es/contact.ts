export const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://heightcomparisoncalculator.com/es/contact#webpage",
      "url": "https://heightcomparisoncalculator.com/es/contact",
      "name": "Contact Us | Height Comparison Calculator",
      "inLanguage": "es",
      "isPartOf": { "@id": "https://heightcomparisoncalculator.com/#website" },
      "about": { "@id": "https://heightcomparisoncalculator.com/#organization" },
      "breadcrumb": { "@id": "https://heightcomparisoncalculator.com/es/contact#breadcrumb" },
      "dateModified": "2026-11-14",
    },
    {
      "@type": "Organization",
      "@id": "https://heightcomparisoncalculator.com/#organization",
      "name": "Height Comparison Calculator",
      "url": "https://heightcomparisoncalculator.com",
      "email": "contact@heightcomparisoncalculator.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "contact@heightcomparisoncalculator.com",
        "url": "https://heightcomparisoncalculator.com/es/contact",
        "availableLanguage": "English",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://heightcomparisoncalculator.com/es/contact#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://heightcomparisoncalculator.com/" },
        { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": "https://heightcomparisoncalculator.com/es/contact" },
      ],
    },
  ],
};

