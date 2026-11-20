import { BASE_URL } from '../schemas';

export const IDEAL_BODY_WEIGHT_SCHEMA = {
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
            "@id": `${BASE_URL}/ideal-body-weight-calculator#webpage`,
            "@type": "WebPage",
            "name": "Ideal Body Weight Calculator",
            "url": `${BASE_URL}/ideal-body-weight-calculator`,
            "isPartOf": {
                "@id": `${BASE_URL}/#website`
            },
            "mainEntity": {
                "@id": `${BASE_URL}/ideal-body-weight-calculator#ideal-body-weight-calculator`
            },
            "breadcrumb": {
                "@id": `${BASE_URL}/ideal-body-weight-calculator#breadcrumb`
            },
            "hasPart": [
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#faq` }
            ],
            "about": [
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#ideal-body-weight` },
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#healthy-weight-range` },
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#devine-formula` },
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#robinson-formula` },
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#hamwi-formula` },
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#adjusted-body-weight` },
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#percent-ideal-body-weight` },
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#body-mass-index` },
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#pediatrics` },
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#height` },
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#weight` },
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#sex` }
            ]
        },
        {
            "@id": `${BASE_URL}/ideal-body-weight-calculator#ideal-body-weight-calculator`,
            "@type": [
                "SoftwareApplication",
                "WebApplication"
            ],
            "name": "Ideal Body Weight Calculator",
            "url": `${BASE_URL}/ideal-body-weight-calculator`,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${BASE_URL}/ideal-body-weight-calculator#webpage`
            },
            "applicationCategory": "HealthApplication",
            "applicationSubCategory": "Health Calculator",
            "operatingSystem": "Web",
            "isAccessibleForFree": true,
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "description": "Calculator that estimates ideal body weight using the Devine, Robinson, and Hamwi formulas and provides healthy range, difference from current weight, and pediatric growth-chart based output where relevant.",
            "featureList": "Calculates ideal body weight, uses Devine formula, uses Robinson formula, uses Hamwi formula, shows healthy weight range, shows difference from current weight, supports metric and imperial units, supports pediatric growth-chart based reference logic.",
            "potentialAction": {
                "@type": "UseAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${BASE_URL}/ideal-body-weight-calculator`
                }
            },
            "about": [
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#ideal-body-weight` },
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#devine-formula` },
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#robinson-formula` },
                { "@id": `${BASE_URL}/ideal-body-weight-calculator#hamwi-formula` }
            ]
        },
        {
            "@id": `${BASE_URL}/ideal-body-weight-calculator#ideal-body-weight`,
            "@type": "DefinedTerm",
            "name": "Ideal Body Weight",
            "alternateName": "IBW",
            "sameAs": "https://en.wikipedia.org/wiki/Ideal_body_weight"
        },
        {
            "@id": `${BASE_URL}/ideal-body-weight-calculator#healthy-weight-range`,
            "@type": "DefinedTerm",
            "name": "Healthy Weight Range"
        },
        {
            "@id": `${BASE_URL}/ideal-body-weight-calculator#devine-formula`,
            "@type": "DefinedTerm",
            "name": "Devine Formula"
        },
        {
            "@id": `${BASE_URL}/ideal-body-weight-calculator#robinson-formula`,
            "@type": "DefinedTerm",
            "name": "Robinson Formula"
        },
        {
            "@id": `${BASE_URL}/ideal-body-weight-calculator#hamwi-formula`,
            "@type": "DefinedTerm",
            "name": "Hamwi Formula"
        },
        {
            "@id": `${BASE_URL}/ideal-body-weight-calculator#adjusted-body-weight`,
            "@type": "DefinedTerm",
            "name": "Adjusted Body Weight"
        },
        {
            "@id": `${BASE_URL}/ideal-body-weight-calculator#percent-ideal-body-weight`,
            "@type": "DefinedTerm",
            "name": "Percent Ideal Body Weight"
        },
        {
            "@id": `${BASE_URL}/ideal-body-weight-calculator#body-mass-index`,
            "@type": "DefinedTerm",
            "name": "Body Mass Index",
            "alternateName": "BMI",
            "sameAs": "https://en.wikipedia.org/wiki/Body_mass_index"
        },
        {
            "@id": `${BASE_URL}/ideal-body-weight-calculator#pediatrics`,
            "@type": "DefinedTerm",
            "name": "Pediatrics",
            "sameAs": "https://en.wikipedia.org/wiki/Pediatrics"
        },
        {
            "@id": `${BASE_URL}/ideal-body-weight-calculator#height`,
            "@type": "DefinedTerm",
            "name": "Height",
            "sameAs": "https://en.wikipedia.org/wiki/Human_height"
        },
        {
            "@id": `${BASE_URL}/ideal-body-weight-calculator#weight`,
            "@type": "DefinedTerm",
            "name": "Body Weight",
            "sameAs": "https://en.wikipedia.org/wiki/Human_body_weight"
        },
        {
            "@id": `${BASE_URL}/ideal-body-weight-calculator#sex`,
            "@type": "DefinedTerm",
            "name": "Biological Sex",
            "sameAs": "https://en.wikipedia.org/wiki/Sex"
        },
        {
            "@type": "BreadcrumbList",
            "@id": `${BASE_URL}/ideal-body-weight-calculator#breadcrumb`,
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
                    "name": "Ideal Body Weight Calculator",
                    "item": `${BASE_URL}/ideal-body-weight-calculator`
                }
            ]
        },
        {
            "@type": "FAQPage",
            "@id": `${BASE_URL}/ideal-body-weight-calculator#faq`,
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What is the definition of ideal body weight?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Ideal body weight is an estimate of a healthy body weight based on your height and sex. It was originally developed to calculate medical drug doses, not to set a strict aesthetic goal. Formulas like Devine and Robinson provide an estimate of what someone of your height might weigh with a standard body composition."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How accurate are ideal body weight calculation formulas?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The Devine and Robinson formulas were built for average adult proportions and work best within typical height ranges (5 ft to 6 ft). They do not measure body composition, muscle mass, frame size, or age. For that reason, they should be used as a reference point alongside the BMI healthy weight range (18.5–24.9), which allows for healthy individual variation."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the difference between Devine, Robinson, and Hamwi formulas?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Devine (1974) is the most widely used in clinical pharmacology and medicine. Robinson (1983) modified Devine based on empirical data, resulting in slightly higher estimates for women and slightly lower for men. Hamwi (1964) is a rule of thumb originally created for diabetic diets. All three give similar results (usually within 2–4 kg / 5–9 lbs of each other)."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is ideal body weight calculation better than BMI?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Neither is universally better; they serve different purposes. BMI provides a broad healthy weight range (BMI 18.5 to 24.9) that accounts for natural variation in frame and muscle. The Devine formula gives a single target weight, useful for clinical dosing. We recommend using the BMI healthy weight range shown above alongside the IBW estimate for a fuller picture."
                    }
                }
            ]
        }
    ]
};
