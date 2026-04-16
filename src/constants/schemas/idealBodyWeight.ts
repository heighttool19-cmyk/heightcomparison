import { BASE_URL, ORGANIZATION_SCHEMA } from '../schemas';

export const IDEAL_BODY_WEIGHT_SCHEMA =
{
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
            "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#webpage",
            "@type": "WebPage",
            "name": "Ideal Body Weight Calculator",
            "url": "heightcomparisoncalculator.com/ideal-body-weight-calculator",
            "isPartOf": {
                "@id": "heightcomparisoncalculator.com/#website"
            },
            "mainEntity": {
                "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#ideal-body-weight-calculator"
            },
            "about": [
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#ideal-body-weight" },
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#healthy-weight-range" },
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#devine-formula" },
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#robinson-formula" },
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#hamwi-formula" },
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#adjusted-body-weight" },
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#percent-ideal-body-weight" },
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#body-mass-index" },
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#pediatrics" },
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#height" },
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#weight" },
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#sex" }
            ]
        },

        {
            "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#ideal-body-weight-calculator",
            "@type": [
                "SoftwareApplication",
                "WebApplication"
            ],
            "name": "Ideal Body Weight Calculator",
            "url": "heightcomparisoncalculator.com/ideal-body-weight-calculator",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#webpage"
            },
            "applicationCategory": "CalculatorApplication",
            "operatingSystem": "Web",
            "isAccessibleForFree": true,
            "description": "Calculator that estimates ideal body weight using the Devine, Robinson, and Hamwi formulas and provides healthy range, difference from current weight, and pediatric growth-chart based output where relevant.",
            "featureList": "Calculates ideal body weight, uses Devine formula, uses Robinson formula, uses Hamwi formula, shows healthy weight range, shows difference from current weight, supports metric and imperial units, supports pediatric growth-chart based reference logic.",
            "potentialAction": {
                "@type": "UseAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "heightcomparisoncalculator.com/ideal-body-weight-calculator"
                }
            },
            "about": [
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#ideal-body-weight" },
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#devine-formula" },
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#robinson-formula" },
                { "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#hamwi-formula" }
            ]
        },

        {
            "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#ideal-body-weight",
            "@type": "DefinedTerm",
            "name": "Ideal Body Weight",
            "alternateName": "IBW",
            "sameAs": "https://en.wikipedia.org/wiki/Ideal_body_weight"
        },

        {
            "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#healthy-weight-range",
            "@type": "DefinedTerm",
            "name": "Healthy Weight Range"
        },

        {
            "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#devine-formula",
            "@type": "DefinedTerm",
            "name": "Devine Formula"
        },

        {
            "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#robinson-formula",
            "@type": "DefinedTerm",
            "name": "Robinson Formula"
        },

        {
            "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#hamwi-formula",
            "@type": "DefinedTerm",
            "name": "Hamwi Formula"
        },

        {
            "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#adjusted-body-weight",
            "@type": "DefinedTerm",
            "name": "Adjusted Body Weight"
        },

        {
            "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#percent-ideal-body-weight",
            "@type": "DefinedTerm",
            "name": "Percent Ideal Body Weight"
        },

        {
            "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#body-mass-index",
            "@type": "DefinedTerm",
            "name": "Body Mass Index",
            "alternateName": "BMI",
            "sameAs": "https://en.wikipedia.org/wiki/Body_mass_index"
        },

        {
            "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#pediatrics",
            "@type": "DefinedTerm",
            "name": "Pediatrics",
            "sameAs": "https://en.wikipedia.org/wiki/Pediatrics"
        },

        {
            "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#height",
            "@type": "DefinedTerm",
            "name": "Height",
            "sameAs": "https://en.wikipedia.org/wiki/Human_height"
        },

        {
            "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#weight",
            "@type": "DefinedTerm",
            "name": "Body Weight",
            "sameAs": "https://en.wikipedia.org/wiki/Human_body_weight"
        },

        {
            "@id": "heightcomparisoncalculator.com/ideal-body-weight-calculator#sex",
            "@type": "DefinedTerm",
            "name": "Biological Sex",
            "sameAs": "https://en.wikipedia.org/wiki/Sex"
        }

    ]
}

