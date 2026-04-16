import { BASE_URL, ORGANIZATION_SCHEMA } from '../schemas';

export const AVERAGE_HEIGHT_BY_COUNTRY_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [

        {
            "@type": "WebSite",
            "@id": "heightcomparisoncalculator.com/#website",
            "url": "heightcomparisoncalculator.com",
            "name": "Height Comparison",
            "publisher": {
                "@type": "Organization",
                "@id": "heightcomparisoncalculator.com/#organization"
            }
        },

        {
            "@type": "Organization",
            "@id": "heightcomparisoncalculator.com/#organization",
            "name": "Height Comparison",
            "url": "heightcomparisoncalculator.com"
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#webpage",
            "@type": "WebPage",
            "name": "Average Height by Country",
            "url": "heightcomparisoncalculator.com/average-height-by-country",
            "isPartOf": {
                "@id": "heightcomparisoncalculator.com/#website"
            },
            "mainEntity": {
                "@id": "heightcomparisoncalculator.com/average-height-by-country#dataset"
            },
            "about": [
                { "@id": "heightcomparisoncalculator.com/average-height-by-country#average-human-height" },
                { "@id": "heightcomparisoncalculator.com/average-height-by-country#human-height-distribution" },
                { "@id": "heightcomparisoncalculator.com/average-height-by-country#normal-distribution" },
                { "@id": "heightcomparisoncalculator.com/average-height-by-country#standard-deviation" },
                { "@id": "heightcomparisoncalculator.com/average-height-by-country#netherlands" },
                { "@id": "heightcomparisoncalculator.com/average-height-by-country#timor-leste" },
                { "@id": "heightcomparisoncalculator.com/average-height-by-country#south-korea" },
                { "@id": "heightcomparisoncalculator.com/average-height-by-country#india" }
            ]
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#dataset",
            "@type": "Dataset",
            "name": "Average Height by Country Dataset",
            "description": "Dataset comparing average male height and average female height across countries worldwide.",
            "mainEntityOfPage": {
                "@id": "heightcomparisoncalculator.com/average-height-by-country#webpage"
            },
            "variableMeasured": [
                "Average male height",
                "Average female height"
            ],
            "measurementTechnique": "Population height survey",
            "creator": [
                { "@id": "heightcomparisoncalculator.com/average-height-by-country#ncd-risk-factor-collaboration" },
                { "@id": "heightcomparisoncalculator.com/average-height-by-country#world-population-review" }
            ]
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#average-human-height",
            "@type": "DefinedTerm",
            "name": "Average Human Height"
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#human-height-distribution",
            "@type": "DefinedTerm",
            "name": "Human Height Distribution"
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#normal-distribution",
            "@type": "DefinedTerm",
            "name": "Normal Distribution",
            "sameAs": "https://en.wikipedia.org/wiki/Normal_distribution"
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#standard-deviation",
            "@type": "DefinedTerm",
            "name": "Standard Deviation",
            "sameAs": "https://en.wikipedia.org/wiki/Standard_deviation"
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#ncd-risk-factor-collaboration",
            "@type": "Organization",
            "name": "NCD Risk Factor Collaboration",
            "alternateName": "NCD-RisC",
            "sameAs": "https://www.ncdrisc.org/"
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#world-population-review",
            "@type": "Organization",
            "name": "World Population Review",
            "sameAs": "https://worldpopulationreview.com/"
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#world-health-organization",
            "@type": "Organization",
            "name": "World Health Organization",
            "sameAs": "https://www.who.int/"
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#guinness-world-records",
            "@type": "Organization",
            "name": "Guinness World Records",
            "sameAs": "https://www.guinnessworldrecords.com/"
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#netherlands",
            "@type": "Country",
            "name": "Netherlands",
            "sameAs": "https://en.wikipedia.org/wiki/Netherlands"
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#timor-leste",
            "@type": "Country",
            "name": "Timor-Leste",
            "sameAs": "https://en.wikipedia.org/wiki/East_Timor"
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#south-korea",
            "@type": "Country",
            "name": "South Korea",
            "sameAs": "https://en.wikipedia.org/wiki/South_Korea"
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#india",
            "@type": "Country",
            "name": "India",
            "sameAs": "https://en.wikipedia.org/wiki/India"
        },

        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "Netherlands" },
            "variableMeasured": "Average male height",
            "value": "183.8 cm"
        },
        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "Netherlands" },
            "variableMeasured": "Average female height",
            "value": "170.4 cm"
        },

        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "Montenegro" },
            "variableMeasured": "Average male height",
            "value": "183.3 cm"
        },
        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "Montenegro" },
            "variableMeasured": "Average female height",
            "value": "170.0 cm"
        },

        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "Denmark" },
            "variableMeasured": "Average male height",
            "value": "181.9 cm"
        },
        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "Denmark" },
            "variableMeasured": "Average female height",
            "value": "169.5 cm"
        },

        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "Germany" },
            "variableMeasured": "Average male height",
            "value": "180.3 cm"
        },
        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "Germany" },
            "variableMeasured": "Average female height",
            "value": "166.2 cm"
        },

        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "United States" },
            "variableMeasured": "Average male height",
            "value": "176.9 cm"
        },
        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "United States" },
            "variableMeasured": "Average female height",
            "value": "163.3 cm"
        },

        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "Japan" },
            "variableMeasured": "Average male height",
            "value": "170.8 cm"
        },
        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "Japan" },
            "variableMeasured": "Average female height",
            "value": "158.0 cm"
        },

        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "South Korea" },
            "variableMeasured": "Average male height",
            "value": "175.5 cm"
        },
        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "South Korea" },
            "variableMeasured": "Average female height",
            "value": "163.2 cm"
        },

        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "India" },
            "variableMeasured": "Average male height",
            "value": "166.5 cm"
        },
        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "India" },
            "variableMeasured": "Average female height",
            "value": "152.6 cm"
        },

        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "Bangladesh" },
            "variableMeasured": "Average male height",
            "value": "163.0 cm"
        },
        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "Bangladesh" },
            "variableMeasured": "Average female height",
            "value": "152.1 cm"
        },

        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "Timor-Leste" },
            "variableMeasured": "Average male height",
            "value": "159.8 cm"
        },
        {
            "@type": "Observation",
            "about": { "@type": "Country", "name": "Timor-Leste" },
            "variableMeasured": "Average female height",
            "value": "152.3 cm"
        },

        {
            "@id": "heightcomparisoncalculator.com/average-height-by-country#faq",
            "@type": "FAQPage",
            "mainEntity": [

                {
                    "@type": "Question",
                    "name": "What is the average height of men in the world?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The global average height for adult men is approximately 171 cm (5 feet 7 inches)."
                    }
                },

                {
                    "@type": "Question",
                    "name": "What is the average height for women worldwide?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The global average height for adult women is approximately 159 cm (5 feet 3 inches)."
                    }
                },

                {
                    "@type": "Question",
                    "name": "Which country has the tallest people?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The Netherlands consistently ranks among the tallest countries in the world, with men averaging around 183.8 cm."
                    }
                },

                {
                    "@type": "Question",
                    "name": "Has average human height increased over time?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Average height has increased in many countries due to improvements in nutrition, healthcare, and living standards."
                    }
                },

                {
                    "@type": "Question",
                    "name": "What is the shortest country by average height?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Timor-Leste is among the shortest countries by average adult height, with men averaging about 159.8 cm."
                    }
                }

            ]
        }

    ]
}

