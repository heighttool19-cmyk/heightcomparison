import { BASE_URL, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from '../schemas';

export const HOME_SCHEMA =
{
    "@context": "https://schema.org",
    "@graph": [

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
            "@type": "WebSite",
            "@id": "https://heightcomparisoncalculator.com/#website",
            "url": "https://heightcomparisoncalculator.com",
            "name": "Height Comparison Calculator",
            "publisher": {
                "@id": "https://heightcomparisoncalculator.com/#organization"
            },
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://heightcomparisoncalculator.com/?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        },

        {
            "@type": "WebPage",
            "@id": "https://heightcomparisoncalculator.com/#webpage",
            "url": "https://heightcomparisoncalculator.com",
            "name": "Height Comparison Tool – Compare Heights Online",
            "description": "Compare heights side by side online using a real-scale visual chart. Enter heights in cm, feet, or inches and instantly see accurate height differences with proportional scaling.",
            "inLanguage": "en",
            "isPartOf": {
                "@id": "https://heightcomparisoncalculator.com/#website"
            },
            "about": {
                "@id": "https://heightcomparisoncalculator.com/#tool"
            },
            "mainEntity": {
                "@id": "https://heightcomparisoncalculator.com/#tool"
            },
            "breadcrumb": {
                "@id": "https://heightcomparisoncalculator.com/#breadcrumb"
            },
            "hasPart": [
                { "@id": "https://heightcomparisoncalculator.com/#faq" },
                { "@id": "https://heightcomparisoncalculator.com/#howto" }
            ],
            "potentialAction": {
                "@type": "UseAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://heightcomparisoncalculator.com"
                }
            },
            "keywords": [
                "height comparison tool",
                "compare heights online",
                "height difference chart",
                "visual height comparison",
                "compare height side by side"
            ],
            "mentions": [
                {
                    "@type": "Thing",
                    "name": "Human height",
                    "sameAs": "https://en.wikipedia.org/wiki/Human_height"
                },
                {
                    "@type": "Thing",
                    "name": "Centimetre",
                    "sameAs": "https://en.wikipedia.org/wiki/Centimetre"
                },
                {
                    "@type": "Thing",
                    "name": "Foot (unit)",
                    "sameAs": "https://en.wikipedia.org/wiki/Foot_(unit)"
                },
                {
                    "@type": "Thing",
                    "name": "Inch",
                    "sameAs": "https://en.wikipedia.org/wiki/Inch"
                }
            ]
        },

        {
            "@type": [
                "SoftwareApplication",
                "WebApplication"
            ],
            "@id": "https://heightcomparisoncalculator.com/#tool",
            "name": "Height Comparison Tool",
            "url": "https://heightcomparisoncalculator.com",
            "applicationCategory": "UtilitiesApplication",
            "applicationSubCategory": "Visualization Tool",
            "operatingSystem": "Web",
            "inLanguage": "en",
            "isAccessibleForFree": true,
            "browserRequirements": "Requires JavaScript enabled browser",
            "publisher": {
                "@id": "https://heightcomparisoncalculator.com/#organization"
            },
            "description": "Free online tool to compare heights side by side with a visual chart. Supports multiple people, celebrities, and objects with real-time proportional scaling and unit conversion.",
            "featureList": [
                "Compare heights side by side",
                "Real-time visual height comparison",
                "Proportional height scaling",
                "Supports cm, feet and inches",
                "Automatic unit conversion",
                "Compare multiple people or objects",
                "Celebrity and fictional character comparison",
                "Image upload with auto scaling",
                "Download comparison charts as PNG",
                "Shareable comparison links"
            ],
            "about": [
                {
                    "@type": "Thing",
                    "name": "Height comparison"
                },
                {
                    "@type": "Thing",
                    "name": "Height difference"
                },
                {
                    "@type": "Thing",
                    "name": "Anthropometry",
                    "sameAs": "https://en.wikipedia.org/wiki/Anthropometry"
                }
            ],
            "potentialAction": {
                "@type": "UseAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://heightcomparisoncalculator.com"
                }
            }
        },

        {
            "@type": "FAQPage",
            "@id": "https://heightcomparisoncalculator.com/#faq",
            "mainEntity": [

                {
                    "@type": "Question",
                    "name": "How do I compare heights side by side online?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Enter two or more heights into the tool and it will generate a real-time visual chart showing the exact height difference."
                    }
                },

                {
                    "@type": "Question",
                    "name": "Can I compare multiple heights at once?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. You can compare multiple people, celebrities, or objects side by side in one chart."
                    }
                },

                {
                    "@type": "Question",
                    "name": "Does the tool support cm, feet, and inches?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. The tool supports centimeters, feet, and inches and automatically converts between units."
                    }
                },

                {
                    "@type": "Question",
                    "name": "Is the height comparison accurate?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. The tool uses proportional scaling to display accurate visual differences between heights."
                    }
                }

            ]
        },

        {
            "@type": "HowTo",
            "@id": "https://heightcomparisoncalculator.com/#howto",
            "name": "How to Compare Heights Online",
            "description": "Step-by-step guide to compare heights using a visual chart.",
            "totalTime": "PT1M",
            "step": [
                {
                    "@type": "HowToStep",
                    "name": "Enter heights",
                    "text": "Input heights in cm, feet, or inches."
                },
                {
                    "@type": "HowToStep",
                    "name": "Add subjects",
                    "text": "Add multiple people, celebrities, or objects."
                },
                {
                    "@type": "HowToStep",
                    "name": "View comparison",
                    "text": "The tool generates a real-time visual chart."
                },
                {
                    "@type": "HowToStep",
                    "name": "Download or share",
                    "text": "Export the chart or share it instantly."
                }
            ]
        },

        {
            "@type": "BreadcrumbList",
            "@id": "https://heightcomparisoncalculator.com/#breadcrumb",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://heightcomparisoncalculator.com/"
                }
            ]
        }

    ]
}



