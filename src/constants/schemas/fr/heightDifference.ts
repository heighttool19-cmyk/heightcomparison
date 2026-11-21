export const HEIGHT_DIFFERENCE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://heightcomparisoncalculator.com/#organization",
      "name": "Height Comparison Calculator",
      "url": "https://heightcomparisoncalculator.com/",
      "logo": "https://heightcomparisoncalculator.com/fr/logo.png"
    },
    {
      "@type": "WebSite",
      "@id": "https://heightcomparisoncalculator.com/#website",
      "url": "https://heightcomparisoncalculator.com/",
      "name": "Height Comparison Calculator",
      "publisher": { "@id": "https://heightcomparisoncalculator.com/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#webpage",
      "url": "https://heightcomparisoncalculator.com/fr/height-difference-calculator",
      "name": "Height Difference Calculator",
      "inLanguage": "fr",
      "isPartOf": { "@id": "https://heightcomparisoncalculator.com/#website" },
      "mainEntity": { "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#height-difference-calculator" },
      "about": [
        { "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#human-height" },
        { "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#height-difference" },
        { "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#percentage-difference" },
        { "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#height-difference-chart" },
        { "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#couple-height-difference" },
        { "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#height-difference-formula" },
        { "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#percentage-difference-formula" }
      ],
      "citation": [
        "https://doi.org/10.1371/journal.pone.0054186",
        "https://tvpollet.github.io/pdfs/Stulp_et_al_2013_PAID.pdf"
      ]
    },
    {
      "@type": ["SoftwareApplication", "WebApplication"],
      "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#height-difference-calculator",
      "name": "Height Difference Calculator",
      "alternateName": [
        "Difference in Height Calculator",
        "Couple Height Difference Calculator"
      ],
      "url": "https://heightcomparisoncalculator.com/fr/height-difference-calculator",
      "inLanguage": "fr",
      "mainEntityOfPage": { "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#webpage" },
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web",
      "browserRequirements": "Requires a web browser",
      "isAccessibleForFree": true,
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "publisher": { "@id": "https://heightcomparisoncalculator.com/#organization" },
      "description": "A free web calculator that subtracts the shorter of two heights from the taller one and shows the gap in centimeters and inches, the percentage difference, and the taller person.",
      "featureList": [
        "The calculator subtracts the shorter height from the taller height to find the height difference.",
        "The calculator shows the height difference in centimeters and inches.",
        "The calculator divides the gap by the taller height to show the percentage difference.",
        "The calculator names the taller person.",
        "The calculator accepts heights in centimeters or feet and inches.",
        "Switching units converts both inputs and the result at once.",
        "The results update as you type.",
        "The calculator is free and needs no account."
      ],
      "potentialAction": {
        "@type": "UseAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://heightcomparisoncalculator.com/fr/height-difference-calculator"
        }
      },
      "about": [
        { "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#height-difference" },
        { "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#percentage-difference" },
        { "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#height-difference-chart" },
        { "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#couple-height-difference" }
      ]
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#human-height",
      "name": "Human Height",
      "sameAs": "https://en.wikipedia.org/wiki/Human_height"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#height-difference",
      "name": "Height Difference",
      "description": "The gap between two heights, found by subtracting the shorter height from the taller height."
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#percentage-difference",
      "name": "Percentage Difference",
      "description": "The height gap expressed as a percentage of the taller person's height."
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#height-difference-chart",
      "name": "Height Difference Chart",
      "description": "A reference table that lists common height pairings with their gap in cm and their percentage difference."
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#couple-height-difference",
      "name": "Couple Height Difference",
      "description": "The height gap between two partners, measured in centimeters or inches."
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#height-difference-formula",
      "name": "Height Difference Formula",
      "description": "Height Difference = Taller Height − Shorter Height",
      "sameAs": "https://en.wikipedia.org/wiki/Subtraction"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#percentage-difference-formula",
      "name": "Percentage Difference Formula",
      "description": "Percentage Difference = (Height Difference ÷ Taller Height) × 100"
    },
    {
      "@type": "FAQPage",
      "@id": "https://heightcomparisoncalculator.com/fr/height-difference-calculator#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a normal height difference between couples?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No single gap is normal. In a study of 12,502 UK couples, the man was 14.1 cm (5.6 in) taller on average. Gaps of 10 to 20 cm covered about 42% of couples. The couple height difference calculator shows the gap for any two heights."
          }
        },
        {
          "@type": "Question",
          "name": "How do you calculate height difference?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Subtract the shorter height from the taller height: Height Difference = Taller Height − Shorter Height. For 180 cm and 165 cm, the difference is 15 cm. Divide 15 by 180 and multiply by 100 to get the percentage difference of 8.3%."
          }
        },
        {
          "@type": "Question",
          "name": "Can a height difference calculator show percentage difference?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. This difference in height calculator shows the gap in cm or inches and the percentage difference. It divides the gap by the taller person's height and updates both values when either height changes."
          }
        },
        {
          "@type": "Question",
          "name": "Is \"percent taller\" the same as \"percent shorter\"?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Percent shorter divides the gap by the taller height. Percent taller divides it by the shorter height. For 180 cm and 165 cm, Person B is 8.3% shorter and Person A is 9.1% taller."
          }
        },
        {
          "@type": "Question",
          "name": "What units can be used in a height difference calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This height difference calculator accepts centimeters and feet and inches. Switching units converts both inputs and the result at once."
          }
        }
      ]
    }
  ]
};
