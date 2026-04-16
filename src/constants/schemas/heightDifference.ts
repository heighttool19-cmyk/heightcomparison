import { BASE_URL, ORGANIZATION_SCHEMA } from '../schemas';

export const HEIGHT_DIFFERENCE_SCHEMA =
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
            "@id": "heightcomparisoncalculator.com/height-difference-calculator#webpage",
            "@type": "WebPage",
            "name": "Height Difference Calculator",
            "url": "heightcomparisoncalculator.com/height-difference-calculator",
            "inLanguage": "en",
            "isPartOf": {
                "@id": "heightcomparisoncalculator.com/#website"
            },
            "mainEntity": {
                "@id": "heightcomparisoncalculator.com/height-difference-calculator#height-difference-calculator"
            },
            "about": [
                { "@id": "heightcomparisoncalculator.com/height-difference-calculator#human-height" },
                { "@id": "heightcomparisoncalculator.com/height-difference-calculator#height-difference" },
                { "@id": "heightcomparisoncalculator.com/height-difference-calculator#percentage-difference" },
                { "@id": "heightcomparisoncalculator.com/height-difference-calculator#visual-height-comparison" },
                { "@id": "heightcomparisoncalculator.com/height-difference-calculator#height-difference-chart" },
                { "@id": "heightcomparisoncalculator.com/height-difference-calculator#couple-height-difference" },
                { "@id": "heightcomparisoncalculator.com/height-difference-calculator#height-difference-formula" },
                { "@id": "heightcomparisoncalculator.com/height-difference-calculator#percentage-difference-formula" }
            ]
        },

        {
            "@id": "heightcomparisoncalculator.com/height-difference-calculator#height-difference-calculator",
            "@type": [
                "SoftwareApplication",
                "WebApplication"
            ],
            "name": "Height Difference Calculator",
            "alternateName": [
                "Difference in Height Calculator"
            ],
            "url": "heightcomparisoncalculator.com/height-difference-calculator",
            "inLanguage": "en",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "heightcomparisoncalculator.com/height-difference-calculator#webpage"
            },
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "isAccessibleForFree": true,
            "description": "A web-based calculator that compares two heights and returns the absolute height difference, percentage difference, and visual height comparison.",
            "featureList": [
                "Calculates absolute height difference",
                "Calculates percentage difference",
                "Shows visual height comparison",
                "Supports couple height comparison",
                "Supports centimeters and feet/inches",
                "Updates results instantly"
            ],
            "potentialAction": {
                "@type": "UseAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "heightcomparisoncalculator.com/height-difference-calculator"
                }
            },
            "about": [
                { "@id": "heightcomparisoncalculator.com/height-difference-calculator#height-difference" },
                { "@id": "heightcomparisoncalculator.com/height-difference-calculator#percentage-difference" },
                { "@id": "heightcomparisoncalculator.com/height-difference-calculator#visual-height-comparison" },
                { "@id": "heightcomparisoncalculator.com/height-difference-calculator#height-difference-chart" },
                { "@id": "heightcomparisoncalculator.com/height-difference-calculator#couple-height-difference" }
            ]
        },

        {
            "@id": "heightcomparisoncalculator.com/height-difference-calculator#human-height",
            "@type": "DefinedTerm",
            "name": "Human Height",
            "sameAs": "https://en.wikipedia.org/wiki/Human_height"
        },

        {
            "@id": "heightcomparisoncalculator.com/height-difference-calculator#height-difference",
            "@type": "DefinedTerm",
            "name": "Height Difference",
            "description": "The absolute gap between two heights calculated by subtracting the shorter height from the taller height."
        },

        {
            "@id": "heightcomparisoncalculator.com/height-difference-calculator#percentage-difference",
            "@type": "DefinedTerm",
            "name": "Percentage Difference",
            "description": "The proportional gap between two heights expressed as a percentage relative to the taller height."
        },

        {
            "@id": "heightcomparisoncalculator.com/height-difference-calculator#visual-height-comparison",
            "@type": "DefinedTerm",
            "name": "Visual Height Comparison",
            "description": "A proportional visual representation of the height gap between two people."
        },

        {
            "@id": "heightcomparisoncalculator.com/height-difference-calculator#height-difference-chart",
            "@type": "DefinedTerm",
            "name": "Height Difference Chart",
            "description": "A reference chart showing example height pairings with their absolute and percentage differences."
        },

        {
            "@id": "heightcomparisoncalculator.com/height-difference-calculator#couple-height-difference",
            "@type": "DefinedTerm",
            "name": "Couple Height Difference",
            "description": "The height gap between romantic partners often compared visually and numerically."
        },

        {
            "@id": "heightcomparisoncalculator.com/height-difference-calculator#height-difference-formula",
            "@type": "DefinedTerm",
            "name": "Height Difference Formula",
            "description": "Height Difference = Taller Height − Shorter Height",
            "sameAs": "https://en.wikipedia.org/wiki/Subtraction"
        },

        {
            "@id": "heightcomparisoncalculator.com/height-difference-calculator#percentage-difference-formula",
            "@type": "DefinedTerm",
            "name": "Percentage Difference Formula",
            "description": "Percentage Difference = (Height Difference ÷ Taller Height) × 100",
            "sameAs": "https://en.wikipedia.org/wiki/Percentage_difference"
        },

        {
            "@type": "FAQPage",
            "@id": "heightcomparisoncalculator.com/height-difference-calculator#faq",
            "mainEntity": [
                {
                    "@type": "Question",
                    "@id": "heightcomparisoncalculator.com/height-difference-calculator#what-is-a-normal-height-difference-between-couples",
                    "name": "What is a normal height difference between couples?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "There is no fixed standard. Survey data places the average gap in male-female couples at around 12 to 15 cm or roughly 5 to 6 inches globally. What counts as normal varies by country, culture, and individual preference."
                    }
                },
                {
                    "@type": "Question",
                    "@id": "heightcomparisoncalculator.com/height-difference-calculator#how-do-you-calculate-height-difference",
                    "name": "How do you calculate height difference?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Subtract the shorter person's height from the taller person's height. The formula is Height Difference = Taller Height minus Shorter Height. To calculate percentage difference divide the height difference by the taller height and multiply by 100."
                    }
                },
                {
                    "@type": "Question",
                    "@id": "heightcomparisoncalculator.com/height-difference-calculator#can-a-height-difference-calculator-show-percentage-difference",
                    "name": "Can a height difference calculator show percentage difference?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. A height difference calculator can show both the absolute gap and the percentage difference. The percentage is calculated relative to the taller person's height."
                    }
                },
                {
                    "@type": "Question",
                    "@id": "heightcomparisoncalculator.com/height-difference-calculator#what-units-can-be-used-in-a-height-difference-calculator",
                    "name": "What units can be used in a height difference calculator?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A height difference calculator can use centimeters or feet and inches. Many tools support switching units automatically without requiring manual conversion."
                    }
                }
            ]
        }

    ]
}

