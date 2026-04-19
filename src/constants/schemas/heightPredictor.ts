import { BASE_URL, ORGANIZATION_SCHEMA } from '../schemas';

export const HEIGHT_PREDICTOR_SCHEMA =
{
    "@context": "https://schema.org",
    "@graph": [

        {
            "@type": "WebSite",
            "@id": "https://heightcomparisoncalculator.com/#website",
            "name": "Height Comparison",
            "url": "https://heightcomparisoncalculator.com",
            "publisher": {
                "@type": "Organization",
                "@id": "https://heightcomparisoncalculator.com/#organization"
            }
        },

        {
            "@type": "WebPage",
            "@id": "https://heightcomparisoncalculator.com/height-predictor#webpage",
            "url": "https://heightcomparisoncalculator.com/height-predictor",
            "name": "Child Height Predictor Calculator",
            "description": "Use this child height calculator to estimate how tall your child may grow as an adult using scientific prediction models such as the Khamis-Roche method.",
            "inLanguage": "en",
            "isPartOf": {
                "@id": "https://heightcomparisoncalculator.com/#website"
            },
            "mainEntity": {
                "@id": "https://heightcomparisoncalculator.com/height-predictor#calculator"
            },
            "breadcrumb": {
                "@id": "https://heightcomparisoncalculator.com/height-predictor#breadcrumb"
            },
            "hasPart": [
                { "@id": "https://heightcomparisoncalculator.com/height-predictor#faq" },
                { "@id": "https://heightcomparisoncalculator.com/height-predictor#howto" }
            ],
            "mentions": [
                {
                    "@type": "Thing",
                    "name": "Human height",
                    "sameAs": "https://en.wikipedia.org/wiki/Human_height"
                },
                {
                    "@type": "Thing",
                    "name": "Growth hormone",
                    "sameAs": "https://en.wikipedia.org/wiki/Growth_hormone"
                },
                {
                    "@type": "Thing",
                    "name": "Puberty",
                    "sameAs": "https://en.wikipedia.org/wiki/Puberty"
                },
                {
                    "@type": "Thing",
                    "name": "Khamis-Roche Method",
                    "sameAs": "https://pubmed.ncbi.nlm.nih.gov/8616011/"
                },
                {
                    "@type": "Thing",
                    "name": "Growth chart",
                    "sameAs": "https://en.wikipedia.org/wiki/Growth_chart"
                },
                {
                    "@type": "Thing",
                    "name": "Genetics",
                    "sameAs": "https://en.wikipedia.org/wiki/Genetics"
                }
            ]
        },

        {
            "@type": [
                "SoftwareApplication",
                "WebApplication"
            ],
            "@id": "https://heightcomparisoncalculator.com/height-predictor#calculator",
            "name": "Child Height Predictor Calculator",
            "url": "https://heightcomparisoncalculator.com/height-predictor",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://heightcomparisoncalculator.com/height-predictor#webpage"
            },
            "applicationCategory": "CalculatorApplication",
            "applicationSubCategory": "Health Calculator",
            "operatingSystem": "Web",
            "inLanguage": "en",
            "browserRequirements": "Requires a modern web browser (Chrome, Firefox, Safari, Edge or equivalent)",
            "description": "Online calculator that predicts a child's adult height using genetics, anthropometric measurements, and scientific growth prediction models.",
            "featureList": "Khamis-Roche Method, Mid-Parental Height Method, Bone Age Assessment, Bayley-Pinneau Method, Roche-Wainer-Thissen Method.",
            "potentialAction": {
                "@type": "UseAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://heightcomparisoncalculator.com/height-predictor"
                }
            },
            "interactionStatistic": {
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/UseAction",
                "userInteractionCount": 1
            },
            "isBasedOn": [
                {
                    "@type": "CreativeWork",
                    "name": "Predicting adult stature without using skeletal age",
                    "sameAs": "https://pubmed.ncbi.nlm.nih.gov/8616011/"
                },
                {
                    "@type": "CreativeWork",
                    "name": "CDC Growth Charts",
                    "sameAs": "https://www.cdc.gov/growthcharts"
                },
                {
                    "@type": "CreativeWork",
                    "name": "WHO Child Growth Standards",
                    "sameAs": "https://www.who.int/tools/child-growth-standards"
                }
            ]
        },

        {
            "@type": "FAQPage",
            "@id": "https://heightcomparisoncalculator.com/height-predictor#faq",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How tall will my child be?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A child's adult height can be estimated using growth prediction models that analyze age, current height, weight, and parents’ heights."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How accurate is a child height predictor?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Most child height prediction calculators estimate adult height within about 2 to 4 inches (5 to 10 cm) when accurate measurements are used."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can I predict my baby's adult height?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. The mid-parental height method estimates adult height based on the heights of both parents."
                    }
                }
            ]
        },

        {
            "@type": "HowTo",
            "@id": "https://heightcomparisoncalculator.com/height-predictor#howto",
            "name": "How to Estimate a Child's Adult Height",
            "description": "Estimate how tall a child may grow using growth prediction models based on genetics and current growth measurements.",
            "totalTime": "PT1M",
            "supply": [
                { "@type": "HowToSupply", "name": "Child's current height" },
                { "@type": "HowToSupply", "name": "Child's weight" },
                { "@type": "HowToSupply", "name": "Child's age" },
                { "@type": "HowToSupply", "name": "Parents' heights" }
            ],
            "step": [
                {
                    "@type": "HowToStep",
                    "name": "Enter child information",
                    "text": "Input the child's age, height, and weight into the calculator."
                },
                {
                    "@type": "HowToStep",
                    "name": "Enter parents' heights",
                    "text": "Provide the heights of both parents to include genetics in the prediction."
                },
                {
                    "@type": "HowToStep",
                    "name": "Calculate the result",
                    "text": "The calculator applies scientific growth models such as the Khamis-Roche method."
                },
                {
                    "@type": "HowToStep",
                    "name": "View predicted height",
                    "text": "The calculator returns an estimated adult height range."
                }
            ]
        },

        {
            "@type": "BreadcrumbList",
            "@id": "https://heightcomparisoncalculator.com/height-predictor#breadcrumb",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://heightcomparisoncalculator.com/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Height Predictor",
                    "item": "https://heightcomparisoncalculator.com/height-predictor"
                }
            ]
        }

    ]
}

