import { BASE_URL, ORGANIZATION_SCHEMA } from '../schemas';

export const IMAGE_TO_HEIGHT_SCHEMA =
{
    "@context": "https://schema.org",
    "@graph": [

        {
            "@type": "WebSite",
            "@id": "https://heightcomparisoncalculator.com/#website",
            "url": "https://heightcomparisoncalculator.com",
            "name": "Height Comparison",
            "publisher": {
                "@type": "Organization",
                "@id": "https://heightcomparisoncalculator.com/#organization"
            }
        },

        {
            "@type": "WebPage",
            "@id": "https://heightcomparisoncalculator.com/image-to-height#webpage",
            "url": "https://heightcomparisoncalculator.com/image-to-height",
            "name": "Measure Your Height From a Photo",
            "description": "Upload a photo with a door, A4 paper, or credit card to measure your height in centimeters and feet and inches without a measuring tape.",
            "inLanguage": "en",
            "isPartOf": {
                "@id": "https://heightcomparisoncalculator.com/#website"
            },
            "mainEntity": {
                "@id": "https://heightcomparisoncalculator.com/image-to-height#tool"
            },
            "breadcrumb": {
                "@id": "https://heightcomparisoncalculator.com/image-to-height#breadcrumb"
            },
            "hasPart": [
                { "@id": "https://heightcomparisoncalculator.com/image-to-height#faq" },
                { "@id": "https://heightcomparisoncalculator.com/image-to-height#howto" }
            ],
            "mentions": [
                {
                    "@type": "Thing",
                    "name": "Human height",
                    "sameAs": "https://en.wikipedia.org/wiki/Human_height"
                },
                {
                    "@type": "Thing",
                    "name": "Anthropometry",
                    "sameAs": "https://en.wikipedia.org/wiki/Anthropometry"
                },
                {
                    "@type": "Thing",
                    "name": "Photogrammetry",
                    "sameAs": "https://en.wikipedia.org/wiki/Photogrammetry"
                },
                {
                    "@type": "Thing",
                    "name": "Door",
                    "sameAs": "https://en.wikipedia.org/wiki/Door"
                },
                {
                    "@type": "Thing",
                    "name": "Credit card",
                    "sameAs": "https://en.wikipedia.org/wiki/Credit_card"
                }
            ]
        },

        {
            "@type": [
                "SoftwareApplication",
                "WebApplication"
            ],
            "@id": "https://heightcomparisoncalculator.com/image-to-height#tool",
            "name": "Height Measurement From Photo Tool",
            "url": "https://heightcomparisoncalculator.com/image-to-height",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://heightcomparisoncalculator.com/image-to-height#webpage"
            },
            "applicationCategory": "UtilitiesApplication",
            "applicationSubCategory": "Measurement Tool",
            "operatingSystem": "Web",
            "inLanguage": "en",
            "isAccessibleForFree": true,
            "browserRequirements": "Requires a modern web browser with JavaScript enabled",
            "description": "Online tool that calculates a person's height from a photo using a reference object such as a door, credit card, or other known object.",
            "featureList": "Upload a photo to measure height, calibrate using a door or known object, draw a measurement line from floor to head, receive height results in centimeters and feet and inches, save results for comparison.",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "potentialAction": {
                "@type": "UseAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://heightcomparisoncalculator.com/image-to-height"
                }
            }
        },

        {
            "@type": "FAQPage",
            "@id": "https://heightcomparisoncalculator.com/image-to-height#faq",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How accurate is height measurement from a photo?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Results land within 1 to 2 centimeters with a straight-on photo and a reliable reference object. In empirical testing, a level phone at waist height measured true height exactly."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What object works best for calibration?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "An A4 sheet (29.7 cm) or credit card (8.56 cm) works anywhere because international standards fix both sizes. A standard interior door at 203 cm is the easiest choice for full-body photos."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is my photo uploaded or stored?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. The tool runs entirely in your browser, and your photo never leaves your device."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can I measure someone else's height from a photo?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. As long as the photo includes a known object for scale, the tool can estimate the height of anyone in the image."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do I need an account to use the tool?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. The tool is completely free and works in any modern browser without creating an account."
                    }
                }
            ]
        },

        {
            "@type": "HowTo",
            "@id": "https://heightcomparisoncalculator.com/image-to-height#howto",
            "name": "How to Measure Your Height From a Photo",
            "description": "Step-by-step guide to measuring height using a photo and a known reference object.",
            "totalTime": "PT1M",
            "supply": [
                { "@type": "HowToSupply", "name": "A photo showing the full body" },
                { "@type": "HowToSupply", "name": "Reference object such as a door or credit card" }
            ],
            "step": [
                {
                    "@type": "HowToStep",
                    "name": "Upload your photo",
                    "text": "Upload a photo that clearly shows the full body from head to toe with a reference object."
                },
                {
                    "@type": "HowToStep",
                    "name": "Crop and confirm",
                    "text": "Trim edges so the person and reference object fill the frame cleanly."
                },
                {
                    "@type": "HowToStep",
                    "name": "Select a reference object and pick size",
                    "text": "Choose an object in the photo with a known size such as a door, A4 paper, or credit card."
                },
                {
                    "@type": "HowToStep",
                    "name": "Draw the measurement line",
                    "text": "Place a line from the floor beneath the feet to the top of the head."
                },
                {
                    "@type": "HowToStep",
                    "name": "Read your height result and save",
                    "text": "The tool calculates height in centimeters and feet and inches, ready to compare on the chart."
                }
            ]
        },

        {
            "@type": "BreadcrumbList",
            "@id": "https://heightcomparisoncalculator.com/image-to-height#breadcrumb",
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
                    "name": "Measure Height From Photo",
                    "item": "https://heightcomparisoncalculator.com/image-to-height"
                }
            ]
        }

    ]
};
