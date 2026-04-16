import { BASE_URL, ORGANIZATION_SCHEMA } from '../schemas';

export const IMAGE_TO_HEIGHT_SCHEMA =
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
            "@id": "heightcomparisoncalculator.com/measure-height-from-photo#webpage",
            "url": "heightcomparisoncalculator.com/measure-height-from-photo",
            "name": "Measure Your Height From a Photo",
            "description": "Upload a photo with a door or known object and measure height in centimeters and feet and inches with 1–2 cm accuracy.",
            "inLanguage": "en",
            "isPartOf": {
                "@id": "heightcomparisoncalculator.com/#website"
            },
            "mainEntity": {
                "@id": "heightcomparisoncalculator.com/measure-height-from-photo#tool"
            },
            "breadcrumb": {
                "@id": "heightcomparisoncalculator.com/measure-height-from-photo#breadcrumb"
            },
            "hasPart": [
                { "@id": "heightcomparisoncalculator.com/measure-height-from-photo#faq" },
                { "@id": "heightcomparisoncalculator.com/measure-height-from-photo#howto" }
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
            "@id": "heightcomparisoncalculator.com/measure-height-from-photo#tool",
            "name": "Height Measurement From Photo Tool",
            "url": "heightcomparisoncalculator.com/measure-height-from-photo",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "heightcomparisoncalculator.com/measure-height-from-photo#webpage"
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
                    "urlTemplate": "heightcomparisoncalculator.com/measure-height-from-photo"
                }
            }
        },

        {
            "@type": "FAQPage",
            "@id": "heightcomparisoncalculator.com/measure-height-from-photo#faq",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How accurate is height measurement from a photo?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "With a straight-on photo and a reliable reference object, results are usually accurate within 1 to 2 centimeters."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What object works best for calibration?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A standard interior door around 203 centimeters tall is the most reliable reference. Credit cards and A4 paper can also be used."
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
            "@id": "heightcomparisoncalculator.com/measure-height-from-photo#howto",
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
                    "text": "Upload a photo that clearly shows the full body from head to toe."
                },
                {
                    "@type": "HowToStep",
                    "name": "Select a reference object",
                    "text": "Choose an object in the photo with a known size such as a door or credit card."
                },
                {
                    "@type": "HowToStep",
                    "name": "Draw the measurement line",
                    "text": "Place a line from the floor beneath the feet to the top of the head."
                },
                {
                    "@type": "HowToStep",
                    "name": "Read your height result",
                    "text": "The tool calculates height and displays it in centimeters and feet and inches."
                }
            ]
        },

        {
            "@type": "BreadcrumbList",
            "@id": "heightcomparisoncalculator.com/measure-height-from-photo#breadcrumb",
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
                    "name": "Measure Height From Photo",
                    "item": "heightcomparisoncalculator.com/measure-height-from-photo"
                }
            ]
        }

    ]
}

