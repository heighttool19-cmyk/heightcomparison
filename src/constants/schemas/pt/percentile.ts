import { BASE_URL } from '@/constants/schemas';

export const PERCENTILE_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": `${BASE_URL}/#website`,
            "url": `${BASE_URL}/`,
            "name": "Height Comparison Calculator",
            "publisher": {
                "@type": "Organization",
                "@id": `${BASE_URL}/#organization`
            }
        },
        {
            "@type": "Organization",
            "@id": `${BASE_URL}/#organization`,
            "name": "Height Comparison Calculator",
            "url": `${BASE_URL}/`,
            "logo": {
                "@type": "ImageObject",
                "url": `${BASE_URL}/logo.png`,
                "width": 512,
                "height": 512
            }
        },
        {
            "@type": "WebPage",
            "@id": `${BASE_URL}/height-weight-percentile-calculator#webpage`,
            "url": `${BASE_URL}/height-weight-percentile-calculator`,
            "name": "Height and Weight Percentile Calculator",
            "description": "Calculate height and weight percentile using WHO and CDC growth reference data. Works for babies, children, and adults.",
            "inLanguage": "pt",
            "isPartOf": {
                "@id": `${BASE_URL}/#website`
            },
            "mainEntity": {
                "@id": `${BASE_URL}/height-weight-percentile-calculator#tool`
            },
            "about": [
                { "@id": `${BASE_URL}/height-weight-percentile-calculator#height-percentile` },
                { "@id": `${BASE_URL}/height-weight-percentile-calculator#weight-percentile` },
                { "@id": `${BASE_URL}/height-weight-percentile-calculator#growth-percentile` },
                { "@id": `${BASE_URL}/height-weight-percentile-calculator#growth-curve` },
                { "@id": `${BASE_URL}/height-weight-percentile-calculator#anthropometry` }
            ],
            "breadcrumb": {
                "@id": `${BASE_URL}/height-weight-percentile-calculator#breadcrumb`
            },
            "hasPart": [
                { "@id": `${BASE_URL}/height-weight-percentile-calculator#faq` }
            ]
        },
        {
            "@type": [
                "SoftwareApplication",
                "WebApplication"
            ],
            "@id": `${BASE_URL}/height-weight-percentile-calculator#tool`,
            "name": "Height and Weight Percentile Calculator",
            "url": `${BASE_URL}/height-weight-percentile-calculator`,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${BASE_URL}/height-weight-percentile-calculator#webpage`
            },
            "applicationCategory": "HealthApplication",
            "applicationSubCategory": "Growth & Health Calculator",
            "operatingSystem": "Web",
            "inLanguage": "pt",
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
                    "urlTemplate": `${BASE_URL}/height-weight-percentile-calculator`
                }
            },
            "about": [
                { "@id": `${BASE_URL}/height-weight-percentile-calculator#height-percentile` },
                { "@id": `${BASE_URL}/height-weight-percentile-calculator#weight-percentile` },
                { "@id": `${BASE_URL}/height-weight-percentile-calculator#growth-percentile` },
                { "@id": `${BASE_URL}/height-weight-percentile-calculator#growth-curve` },
                { "@id": `${BASE_URL}/height-weight-percentile-calculator#anthropometry` }
            ],
            "isBasedOn": [
                { "@id": `${BASE_URL}/height-weight-percentile-calculator#who-child-growth-standards` },
                { "@id": `${BASE_URL}/height-weight-percentile-calculator#cdc-growth-charts` },
                { "@id": `${BASE_URL}/height-weight-percentile-calculator#nhanes` }
            ]
        },
        {
            "@id": `${BASE_URL}/height-weight-percentile-calculator#height-percentile`,
            "@type": "DefinedTerm",
            "name": "Height Percentile",
            "description": "A statistical comparison showing how a person's height ranks relative to others of the same age and sex."
        },
        {
            "@id": `${BASE_URL}/height-weight-percentile-calculator#weight-percentile`,
            "@type": "DefinedTerm",
            "name": "Weight Percentile",
            "description": "A statistical comparison showing how a person's weight ranks relative to others of the same age and sex."
        },
        {
            "@id": `${BASE_URL}/height-weight-percentile-calculator#growth-percentile`,
            "@type": "DefinedTerm",
            "name": "Growth Percentile",
            "description": "A percentile used to compare a person's growth measurements to a reference population."
        },
        {
            "@id": `${BASE_URL}/height-weight-percentile-calculator#growth-curve`,
            "@type": "DefinedTerm",
            "name": "Growth Curve",
            "sameAs": "https://en.wikipedia.org/wiki/Growth_chart"
        },
        {
            "@id": `${BASE_URL}/height-weight-percentile-calculator#anthropometry`,
            "@type": "DefinedTerm",
            "name": "Anthropometry",
            "sameAs": "https://en.wikipedia.org/wiki/Anthropometry"
        },
        {
            "@id": `${BASE_URL}/height-weight-percentile-calculator#who`,
            "@type": "Organization",
            "name": "World Health Organization",
            "sameAs": "https://www.who.int/"
        },
        {
            "@id": `${BASE_URL}/height-weight-percentile-calculator#who-child-growth-standards`,
            "@type": "CreativeWork",
            "name": "WHO Child Growth Standards",
            "sameAs": "https://www.who.int/tools/child-growth-standards",
            "creator": {
                "@id": `${BASE_URL}/height-weight-percentile-calculator#who`
            }
        },
        {
            "@id": `${BASE_URL}/height-weight-percentile-calculator#cdc`,
            "@type": "Organization",
            "name": "Centers for Disease Control and Prevention",
            "sameAs": "https://www.cdc.gov/"
        },
        {
            "@id": `${BASE_URL}/height-weight-percentile-calculator#cdc-growth-charts`,
            "@type": "CreativeWork",
            "name": "CDC Growth Charts",
            "sameAs": "https://www.cdc.gov/growthcharts/",
            "creator": {
                "@id": `${BASE_URL}/height-weight-percentile-calculator#cdc`
            }
        },
        {
            "@id": `${BASE_URL}/height-weight-percentile-calculator#nhanes`,
            "@type": "Dataset",
            "name": "National Health and Nutrition Examination Survey",
            "alternateName": "NHANES",
            "sameAs": "https://www.cdc.gov/nchs/nhanes/",
            "creator": {
                "@id": `${BASE_URL}/height-weight-percentile-calculator#cdc`
            }
        },
        {
            "@type": "BreadcrumbList",
            "@id": `${BASE_URL}/height-weight-percentile-calculator#breadcrumb`,
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": `${BASE_URL}/`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Height and Weight Percentile Calculator",
                    "item": `${BASE_URL}/height-weight-percentile-calculator`
                }
            ]
        },
        {
            "@type": "FAQPage",
            "@id": `${BASE_URL}/height-weight-percentile-calculator#faq`,
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What is a good height percentile?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "There is no single good percentile. The average range on a height percentile calculator runs from the 25th to the 75th percentile, and most people fall somewhere in this band. What matters more is whether your percentile stays consistent over time and fits your family's typical height pattern."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How accurate is a height percentile calculator?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A percentile height calculator is as accurate as the measurements you enter. The reference data behind the tool comes from large, nationally representative datasets from the CDC and WHO. Accuracy improves when you enter age in months rather than years for children, and when height is measured without shoes, standing straight for older children and lying flat for infants."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can adults calculate their height percentile?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. The adult height percentile calculator compares your height to a population distribution rather than a growth chart. The height percentile calculator for adults uses NHANES survey data to place your height within the distribution for people of the same sex. The height percentile calculator for men uses male-specific data, giving a precise comparison against the adult male population."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do boys and girls have different growth percentiles?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. The height percentile girl calculator and the height percentile calculator for boys each use separate CDC reference curves because male and female growth patterns diverge after early childhood. Girls grow faster in early adolescence and boys catch up later. Entering the wrong sex produces a meaningfully inaccurate result."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the difference between WHO and CDC growth charts?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "WHO Child Growth Standards cover ages 0 to 2 and are based on data from six countries, designed as an international reference for optimal growth. CDC growth charts cover ages 2 to 20 and are built from US population data, making them the standard reference for clinical use in the United States. This calculator uses WHO data for infants and CDC data from age 2 onward."
                    }
                }
            ]
        }
    ]
};
