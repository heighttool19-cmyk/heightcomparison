import { BASE_URL } from '../schemas';

export const AVERAGE_HEIGHT_BY_COUNTRY_SCHEMA = {
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
            "@id": `${BASE_URL}/average-height-by-country#webpage`,
            "@type": "WebPage",
            "name": "Average Height by Country",
            "url": `${BASE_URL}/average-height-by-country`,
            "isPartOf": {
                "@id": `${BASE_URL}/#website`
            },
            "mainEntity": {
                "@id": `${BASE_URL}/average-height-by-country#dataset`
            },
            "hasPart": [
                { "@id": `${BASE_URL}/average-height-by-country#faq` }
            ],
            "breadcrumb": {
                "@id": `${BASE_URL}/average-height-by-country#breadcrumb`
            },
            "about": [
                { "@id": `${BASE_URL}/average-height-by-country#average-human-height` },
                { "@id": `${BASE_URL}/average-height-by-country#human-height-distribution` },
                { "@id": `${BASE_URL}/average-height-by-country#normal-distribution` },
                { "@id": `${BASE_URL}/average-height-by-country#standard-deviation` },
                { "@id": `${BASE_URL}/average-height-by-country#netherlands` },
                { "@id": `${BASE_URL}/average-height-by-country#timor-leste` },
                { "@id": `${BASE_URL}/average-height-by-country#south-korea` },
                { "@id": `${BASE_URL}/average-height-by-country#india` }
            ]
        },
        {
            "@type": "Dataset",
            "@id": `${BASE_URL}/average-height-by-country#dataset`,
            "url": `${BASE_URL}/average-height-by-country`,
            "name": "Average Height at Age 19 by Country (2019)",
            "description": "Estimated average heights in centimeters for 19-year-old males and females in 46 selected countries in 2019. Height Comparison Calculator compiled this table from NCD Risk Factor Collaboration estimates.",
            "mainEntityOfPage": {
                "@id": `${BASE_URL}/average-height-by-country#webpage`
            },
            "creator": {
                "@type": "Organization",
                "name": "Height Comparison Calculator",
                "url": `${BASE_URL}/`
            },
            "isBasedOn": {
                "@type": "Dataset",
                "name": "NCD-RisC age-specific country height estimates",
                "url": "https://www.ncdrisc.org/data-downloads-height.html",
                "creator": {
                    "@type": "Organization",
                    "name": "NCD Risk Factor Collaboration"
                }
            },
            "isAccessibleForFree": true,
            "temporalCoverage": "2019",
            "spatialCoverage": "46 selected countries listed in the table",
            "variableMeasured": [
                "Average height of 19-year-old males (cm)",
                "Average height of 19-year-old females (cm)"
            ]
        },
        {
            "@id": `${BASE_URL}/average-height-by-country#average-human-height`,
            "@type": "DefinedTerm",
            "name": "Average Human Height"
        },
        {
            "@id": `${BASE_URL}/average-height-by-country#human-height-distribution`,
            "@type": "DefinedTerm",
            "name": "Human Height Distribution"
        },
        {
            "@id": `${BASE_URL}/average-height-by-country#normal-distribution`,
            "@type": "DefinedTerm",
            "name": "Normal Distribution",
            "sameAs": "https://en.wikipedia.org/wiki/Normal_distribution"
        },
        {
            "@id": `${BASE_URL}/average-height-by-country#standard-deviation`,
            "@type": "DefinedTerm",
            "name": "Standard Deviation",
            "sameAs": "https://en.wikipedia.org/wiki/Standard_deviation"
        },
        {
            "@id": `${BASE_URL}/average-height-by-country#ncd-risk-factor-collaboration`,
            "@type": "Organization",
            "name": "NCD Risk Factor Collaboration",
            "alternateName": "NCD-RisC",
            "sameAs": "https://www.ncdrisc.org/"
        },
        {
            "@id": `${BASE_URL}/average-height-by-country#world-health-organization`,
            "@type": "Organization",
            "name": "World Health Organization",
            "sameAs": "https://www.who.int/"
        },
        {
            "@id": `${BASE_URL}/average-height-by-country#guinness-world-records`,
            "@type": "Organization",
            "name": "Guinness World Records",
            "sameAs": "https://www.guinnessworldrecords.com/"
        },
        {
            "@id": `${BASE_URL}/average-height-by-country#netherlands`,
            "@type": "Country",
            "name": "Netherlands",
            "sameAs": "https://en.wikipedia.org/wiki/Netherlands"
        },
        {
            "@id": `${BASE_URL}/average-height-by-country#timor-leste`,
            "@type": "Country",
            "name": "Timor-Leste",
            "sameAs": "https://en.wikipedia.org/wiki/East_Timor"
        },
        {
            "@id": `${BASE_URL}/average-height-by-country#south-korea`,
            "@type": "Country",
            "name": "South Korea",
            "sameAs": "https://en.wikipedia.org/wiki/South_Korea"
        },
        {
            "@id": `${BASE_URL}/average-height-by-country#india`,
            "@type": "Country",
            "name": "India",
            "sameAs": "https://en.wikipedia.org/wiki/India"
        },
        {
            "@type": "BreadcrumbList",
            "@id": `${BASE_URL}/average-height-by-country#breadcrumb`,
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
                    "name": "Average Height by Country",
                    "item": `${BASE_URL}/average-height-by-country`
                }
            ]
        },
        {
            "@id": `${BASE_URL}/average-height-by-country#faq`,
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What is the average height of men in the world?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The global average height for adult men is approximately 171 cm (5'7\"). This weighted figure draws from NCD Risk Factor Collaboration and WHO data. It is pulled lower by the large populations of South and Southeast Asia, where averages fall between 160 and 168 cm. Men in high-income European countries average significantly more, often 178 to 184 cm."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is an average height for a woman worldwide?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The global average height for adult women is approximately 159 cm (5'3\"). Netherlands and Montenegrin women average around 170 cm. Women in Guatemala and the Philippines average closer to 149 to 150 cm. Most women in Western countries fall between 162 and 168 cm."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Which country has the tallest people?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The Netherlands holds the top spot for both men and women in most recent datasets. Netherlands men average 183.8 cm (approximately 6'0\") and Netherlands women average 170.4 cm (5'7\"). Montenegro and Estonia follow closely. The Netherlands has held this position for several decades, attributed to dairy-rich diets, strong public health infrastructure, and genetic factors in the population."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Has average human height been increasing over time?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, substantially. Average height has risen sharply over the past 150 years in almost every country, driven by improvements in nutrition, sanitation, vaccination, and healthcare. The most dramatic recent gains occurred in East Asia: South Korean men gained around 6 cm across two generations following rapid economic development. Gains in Western Europe have largely plateaued since the 1980s."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the shortest country in the world by average height?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Timor-Leste records the lowest combined average globally, with men averaging 159.8 cm and women 152.3 cm. Guatemala and Laos follow closely. These low averages reflect historical nutritional constraints and limited healthcare access rather than genetic limits on growth potential."
                    }
                }
            ]
        }
    ]
};
