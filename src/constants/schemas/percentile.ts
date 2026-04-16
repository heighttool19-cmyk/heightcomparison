import { BASE_URL, ORGANIZATION_SCHEMA } from '../schemas';

export const PERCENTILE_SCHEMA =
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
            "@type": "WebPage",
            "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#webpage",
            "url": "heightcomparisoncalculator.com/height-weight-percentile-calculator",
            "name": "Height and Weight Percentile Calculator",
            "description": "Calculate height and weight percentile using WHO and CDC growth reference data. Works for babies, children, and adults.",
            "inLanguage": "en",
            "isPartOf": {
                "@id": "heightcomparisoncalculator.com/#website"
            },
            "mainEntity": {
                "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#tool"
            },
            "about": [
                { "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#height-percentile" },
                { "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#weight-percentile" },
                { "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#growth-percentile" },
                { "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#growth-curve" },
                { "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#anthropometry" }
            ],
            "breadcrumb": {
                "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#breadcrumb"
            },
            "hasPart": [
                { "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#faq" }
            ]
        },

        {
            "@type": [
                "SoftwareApplication",
                "WebApplication"
            ],
            "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#tool",
            "name": "Height and Weight Percentile Calculator",
            "url": "heightcomparisoncalculator.com/height-weight-percentile-calculator",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#webpage"
            },
            "applicationCategory": "CalculatorApplication",
            "applicationSubCategory": "Statistics Tool",
            "operatingSystem": "Web",
            "inLanguage": "en",
            "isAccessibleForFree": true,
            "browserRequirements": "Requires a modern web browser",
            "description": "Online calculator that compares height and weight against WHO, CDC, and NHANES reference datasets to determine percentile ranking.",
            "featureList": "Calculate height percentile, calculate weight percentile, supports babies toddlers children and adults, uses WHO growth standards for infants, uses CDC growth charts for children, uses NHANES data for adults.",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "potentialAction": {
                "@type": "UseAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "heightcomparisoncalculator.com/height-weight-percentile-calculator"
                }
            },
            "about": [
                { "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#height-percentile" },
                { "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#weight-percentile" },
                { "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#growth-percentile" },
                { "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#growth-curve" },
                { "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#anthropometry" }
            ],
            "isBasedOn": [
                { "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#who-child-growth-standards" },
                { "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#cdc-growth-charts" },
                { "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#nhanes" }
            ]
        },

        {
            "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#height-percentile",
            "@type": "DefinedTerm",
            "name": "Height Percentile",
            "description": "A statistical comparison showing how a person's height ranks relative to others of the same age and sex."
        },

        {
            "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#weight-percentile",
            "@type": "DefinedTerm",
            "name": "Weight Percentile",
            "description": "A statistical comparison showing how a person's weight ranks relative to others of the same age and sex."
        },

        {
            "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#growth-percentile",
            "@type": "DefinedTerm",
            "name": "Growth Percentile",
            "description": "A percentile used to compare a person's growth measurements to a reference population."
        },

        {
            "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#growth-curve",
            "@type": "DefinedTerm",
            "name": "Growth Curve",
            "sameAs": "https://en.wikipedia.org/wiki/Growth_chart"
        },

        {
            "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#anthropometry",
            "@type": "DefinedTerm",
            "name": "Anthropometry",
            "sameAs": "https://en.wikipedia.org/wiki/Anthropometry"
        },

        {
            "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#who",
            "@type": "Organization",
            "name": "World Health Organization",
            "sameAs": "https://www.who.int/"
        },

        {
            "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#who-child-growth-standards",
            "@type": "CreativeWork",
            "name": "WHO Child Growth Standards",
            "sameAs": "https://www.who.int/tools/child-growth-standards",
            "creator": {
                "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#who"
            }
        },

        {
            "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#cdc",
            "@type": "Organization",
            "name": "Centers for Disease Control and Prevention",
            "sameAs": "https://www.cdc.gov/"
        },

        {
            "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#cdc-growth-charts",
            "@type": "CreativeWork",
            "name": "CDC Growth Charts",
            "sameAs": "https://www.cdc.gov/growthcharts/",
            "creator": {
                "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#cdc"
            }
        },

        {
            "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#nhanes",
            "@type": "Dataset",
            "name": "National Health and Nutrition Examination Survey",
            "alternateName": "NHANES",
            "sameAs": "https://www.cdc.gov/nchs/nhanes/",
            "creator": {
                "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#cdc"
            }
        },

        {
            "@type": "BreadcrumbList",
            "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#breadcrumb",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "heightcomparisoncalculator.com/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Height and Weight Percentile Calculator",
                    "item": "heightcomparisoncalculator.com/height-weight-percentile-calculator"
                }
            ]
        },

        {
            "@type": "FAQPage",
            "@id": "heightcomparisoncalculator.com/height-weight-percentile-calculator#faq",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What is a good height percentile?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Most people fall between the 25th and 75th percentile. A percentile shows how height compares with others of the same age and sex."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How accurate is a height percentile calculator?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Accuracy depends on correct age, height, and weight inputs and on using reliable reference datasets such as WHO and CDC growth charts."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can adults calculate their height percentile?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Adult percentile comparisons are based on population distributions such as NHANES survey data."
                    }
                }
            ]
        }

    ]
}

