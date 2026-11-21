import { BASE_URL, ORGANIZATION_SCHEMA } from '@/constants/schemas';

export const HEIGHT_PREDICTOR_SCHEMA =
{
    "@context": "https://schema.org",
    "@graph": [

        {
            "@type": "WebSite",
            "@id": "https://heightcomparisoncalculator.com/#website",
            "name": "Height Comparison Calculator",
            "url": "https://heightcomparisoncalculator.com",
            "publisher": {
                "@type": "Organization",
                "@id": "https://heightcomparisoncalculator.com/#organization"
            }
        },

        {
            "@type": "Organization",
            "@id": "https://heightcomparisoncalculator.com/#organization",
            "name": "Height Comparison Calculator",
            "url": "https://heightcomparisoncalculator.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://heightcomparisoncalculator.com/logo.png",
                "width": 512,
                "height": 512
            }
        },

        {
            "@type": "WebPage",
            "@id": "https://heightcomparisoncalculator.com/height-predictor#webpage",
            "url": "https://heightcomparisoncalculator.com/height-predictor",
            "name": "Height Predictor and Adult Height Calculator",
            "description": "Use this height calculator to estimate the future height of children, teenagers, and adults based on age, genetics, and growth patterns using scientific prediction models such as the Khamis-Roche method.",
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
                    "sameAs": "https://pubmed.ncbi.nlm.nih.gov/7936860/"
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
            "name": "Height Predictor and Adult Height Calculator",
            "url": "https://heightcomparisoncalculator.com/height-predictor",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://heightcomparisoncalculator.com/height-predictor#webpage"
            },
            "applicationCategory": "HealthApplication",
            "applicationSubCategory": "Health Calculator",
            "operatingSystem": "Web",
            "inLanguage": "en",
            "isAccessibleForFree": true,
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "browserRequirements": "Requires a modern web browser (Chrome, Firefox, Safari, Edge or equivalent)",
            "description": "Online calculator that predicts a child's adult height using genetics, anthropometric measurements, and scientific growth prediction models.",
            "featureList": "Khamis-Roche height prediction, Mid-parental height calculator, Height unit converter",
            "potentialAction": {
                "@type": "UseAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://heightcomparisoncalculator.com/height-predictor"
                }
            },
            "isBasedOn": [
                {
                    "@type": "ScholarlyArticle",
                    "name": "Predicting adult stature without using skeletal age: the Khamis-Roche method",
                    "sameAs": "https://pubmed.ncbi.nlm.nih.gov/7936860/"
                },
                {
                    "@type": "CreativeWork",
                    "name": "CDC Growth Charts",
                    "sameAs": "https://www.cdc.gov/growthcharts/"
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
                    "name": "How tall will I be?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Your adult height depends primarily on your parents' heights and your growth timing. Use the height calculator above. Enter your current age, height, weight, and your parents' heights to get a predicted height range based on the Khamis-Roche growth model. If you are already 18 or older, your growth plates have closed and your adult height is set."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How tall will my son be?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Enter your son's age, current height, weight, and both parents' heights into the Khamis-Roche calculator above. Most boys stop growing between 16 and 18. The Mid-Parental Height Formula can also give a rough estimate: (Father's height + Mother's height + 5 inches) ÷ 2."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is a height calculator accurate?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The Khamis-Roche method (used in this calculator) is one of the most accurate non-clinical height predictors available. In the original study, 9 in 10 predictions fell within 2.1 inches for boys and 1.7 inches for girls. Accuracy improves when the child is older than 4, measurements are precise, and parent heights are correct. Results are always a range, not a guaranteed value."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is any height predictor 100% accurate?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. Every height predictor gives a likely range, because genes, puberty timing and health all shift the outcome. Khamis-Roche is the most accurate method without an X-ray, with 9 in 10 predictions within 2.1 inches for boys and 1.7 inches for girls. A bone age X-ray is more accurate, and doctors order one when they suspect a growth disorder."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can parents' height predict my height?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Inherited genes explain about 80% of height differences between people, and parents' heights are the best everyday measure of those genes. The Mid-Parental Height Formula provides a rough estimate using only this data. However, combining parent heights with the child's current measurements (age, height, weight) through the Khamis-Roche model produces significantly more accurate results."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can I predict my baby's height?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "For babies and infants, use the Mid-Parental Height Formula calculator above. It requires only the mother's and father's heights. This gives a rough estimated height range. Note that accuracy is lower for babies than for older children, since current growth data is not factored in. Once your child turns 2, the age-2 doubling rule gives a second quick check."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How tall should my child be at their age?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Use the growth chart section above to see the average height range by age for boys and girls. The 50th percentile represents the median height. Healthy children typically fall between the 3rd and 97th percentile. If your child is consistently above or below this range, discuss it with their pediatrician."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the most accurate height prediction method?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The most accurate method overall is bone age testing (wrist X-ray), used clinically by doctors. For non-clinical prediction, the Khamis-Roche method is the most accurate available. It uses age, height, weight, and parent heights, with 9 in 10 predictions within 2.1 inches for boys and 1.7 inches for girls. This is the method used in the calculator on this page."
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

