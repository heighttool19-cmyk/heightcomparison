import { BASE_URL, ORGANIZATION_SCHEMA } from '@/constants/schemas';

export const IMAGE_TO_HEIGHT_SCHEMA =
{
    "@context": "https://schema.org",
    "@graph": [

        {
            "@type": "WebSite",
            "@id": "https://heightcomparisoncalculator.com/#website",
            "url": "https://heightcomparisoncalculator.com",
            "name": "Height Comparison Calculator",
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
                "url": "https://heightcomparisoncalculator.com/fr/logo.png",
                "width": 512,
                "height": 512
            }
        },

        {
            "@type": "WebPage",
            "@id": "https://heightcomparisoncalculator.com/fr/image-to-height#webpage",
            "url": "https://heightcomparisoncalculator.com/fr/image-to-height",
            "name": "Measure Your Height From a Photo",
            "description": "Upload a photo with a door, A4 paper, or credit card to measure your height in centimeters and feet and inches without a measuring tape.",
            "inLanguage": "fr",
            "isPartOf": {
                "@id": "https://heightcomparisoncalculator.com/#website"
            },
            "mainEntity": {
                "@id": "https://heightcomparisoncalculator.com/fr/image-to-height#tool"
            },
            "breadcrumb": {
                "@id": "https://heightcomparisoncalculator.com/fr/image-to-height#breadcrumb"
            },
            "hasPart": [
                { "@id": "https://heightcomparisoncalculator.com/fr/image-to-height#faq" },
                { "@id": "https://heightcomparisoncalculator.com/fr/image-to-height#howto" }
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
            "@id": "https://heightcomparisoncalculator.com/fr/image-to-height#tool",
            "name": "Height Measurement From Photo Tool",
            "url": "https://heightcomparisoncalculator.com/fr/image-to-height",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://heightcomparisoncalculator.com/fr/image-to-height#webpage"
            },
            "applicationCategory": "UtilitiesApplication",
            "applicationSubCategory": "Measurement Tool",
            "operatingSystem": "Web",
            "inLanguage": "fr",
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
                    "urlTemplate": "https://heightcomparisoncalculator.com/fr/image-to-height"
                }
            }
        },

        {
            "@type": "FAQPage",
            "@id": "https://heightcomparisoncalculator.com/fr/image-to-height#faq",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How accurate is height measurement from a photo?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "It depends on how the photo is taken. In our empirical test of 14 rendered scenes, a level phone with the person standing against the same wall as a door measured the true height exactly. Tilting the phone 10° to 20° moved the result by 2 to 6 cm, and standing 30 cm in front of the door added 16 cm. On a phone screen, each pixel you miss on a door's edge adds about 1 cm more. For personal tracking and casual comparisons under good conditions, results consistently land within 1 to 2 centimeters."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the best object to use for calibration?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "An A4 sheet (29.7 cm / 297 mm long) or a credit card (8.56 cm / 85.6 mm wide) works anywhere worldwide because international ISO standards fix both sizes. A standard interior door at 203 cm (80 inches) in the US is the easiest choice for full-body photos because of its size, but measure yours first if outside the US. The larger the reference object, the less sensitive the result is to minor screen tapping errors."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is my photo uploaded or stored?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. The tool runs entirely client-side in your browser, and your photo never leaves your device."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can I measure someone else's height from a photo?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Upload any photo where the person appears next to a known object, calibrate, draw the line, read the result. The subject does not need to be present."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Does it work for celebrities?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, when the photo shows them next to a door or another object of known size. Photos taken from unusual angles produce less reliable results."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Why do I measure taller in the morning?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Spinal discs compress under body weight throughout the day. That compression reduces standing height by up to one centimeter between morning and evening. Measuring at the same time each day gives the most consistent results over time."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do I need an account?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. The tool is free, requires no sign-up, and works on any device."
                    }
                }
            ]
        },

        {
            "@type": "HowTo",
            "@id": "https://heightcomparisoncalculator.com/fr/image-to-height#howto",
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
            "@id": "https://heightcomparisoncalculator.com/fr/image-to-height#breadcrumb",
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
                    "item": "https://heightcomparisoncalculator.com/fr/image-to-height"
                }
            ]
        }

    ]
};
