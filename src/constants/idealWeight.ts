export const IBW_FAQ = [
    {
        q: "What is a good ideal body weight?",
        a: "There is no single correct number. A good ideal body weight is the range within which your body functions well, not a specific figure. The three-formula output from this calculator shows that even established clinical methods disagree by a few kilograms. Use the range as context, not a verdict."
    },
    {
        q: "Can ideal body weight be calculated in kg?",
        a: "Yes. The ideal weight calculator in kg mode is the default setting. All three formulas, Devine, Robinson, and Hamwi, were originally expressed in kilograms. The ideal body weight in kg calculator outputs your result directly and converts to pounds if you switch units."
    },
    {
        q: "How much should I weigh? Female, 5'4\"",
        a: "For a woman at 5 ft 4 in (163 cm):\nDevine: 54.1 kg (119 lb)\nRobinson: 55.8 kg (123 lb)\nHamwi: 54.3 kg (120 lb)\nHealthy range: approximately 54 to 56 kg"
    },
    {
        q: "How much should I weigh? Male, 5'10\"",
        a: "For a man at 5 ft 10 in (178 cm):\nDevine: 73 kg (161 lb)\nRobinson: 71 kg (157 lb)\nHamwi: 75 kg (165 lb)\nHealthy range: approximately 71 to 75 kg"
    },
    {
        q: "How much should I weigh at 5'5\" and 5'9\"?",
        a: "5'5\" female (165 cm)\nDevine 57.7 kg · Robinson 56.2 kg · Hamwi 56.4 kg\n\n5'5\" male (165 cm)\nDevine 62.2 kg · Robinson 61.7 kg · Hamwi 61.5 kg\n\n5'9\" female (175 cm)\nDevine 66.9 kg · Robinson 62.9 kg · Hamwi 64.1 kg\n\n5'9\" male (175 cm)\nDevine 70.7 kg · Robinson 69.1 kg · Hamwi 72.3 kg"
    },
    {
        q: "How much should I weigh? Female at 5'1\", 5'2\", 5'3\", 5'7\"",
        a: "5'1\" female: Devine 48.6 kg (107 lb)\n5'2\" female: Devine 50.9 kg (112 lb)\n5'3\" female: Devine 53.2 kg (117 lb)\n5'7\" female: Devine 60.0 kg (132 lb)\nThese are Devine formula single-formula estimates. The full calculator gives the range across all three formulas."
    },
    {
        q: "What is the difference between Devine, Robinson, and Hamwi formulas?",
        a: "All three formulas calculate ideal body weight as a base weight plus an increment per inch above 5 feet. The Devine formula (1974) uses a 2.3 kg increment and is the most widely cited in clinical practice. The Robinson formula (1983) uses a smaller 1.9 kg increment and produces leaner estimates for taller people. The Hamwi formula (1964) uses the highest increment at 2.7 kg and gives the largest IBW estimates for tall individuals."
    }
];

export const IBW_TOC = [
    { id: 'ideal-body-weight-calculator', label: 'Ideal Body Weight Calculator' },
    { id: 'how-to-calculate-ideal-body-weight', label: 'How to Calculate Ideal Body Weight' },
    {
        id: 'ideal-body-weight-calculation-formulas',
        label: 'Ideal Body Weight Calculation Formulas',
        subItems: [
            { id: 'devine-formula', label: 'Devine Formula' },
            { id: 'robinson-formula', label: 'Robinson Formula' },
            { id: 'hamwi-formula', label: 'Hamwi Formula' }
        ]
    },
    { id: 'ideal-body-weight-calculator-for-women', label: 'Ideal Body Weight Calculator for Women' },
    { id: 'ideal-body-weight-calculator-for-men', label: 'Ideal Body Weight Calculator for Men' },
    { id: 'ideal-body-weight-calculator-for-pediatrics', label: 'Ideal Body Weight Calculator for Pediatrics' },
    { id: 'adjusted-ideal-body-weight-calculator', label: 'Adjusted Ideal Body Weight Calculator' },
    { id: 'percent-ideal-body-weight-calculation', label: 'Percent Ideal Body Weight Calculation' },
    { id: 'healthy-weight-range', label: 'Healthy Weight Range' },
    { id: 'ideal-body-weight-vs-bmi', label: 'Ideal Body Weight vs BMI' },
    { id: 'frequently-asked-questions', label: 'Frequently Asked Questions' },
    { id: 'references', label: 'References' }
];

export const IBW_FAQ_SCA = [
    {
        id: "ideal-body-weight-definition",
        q: "What is the definition of ideal body weight?",
        a: "Ideal Body Weight (IBW) is a clinical estimate of the weight range associated with the lowest risk of chronic disease and best overall health outcomes for a given height and sex. It was originally developed to standardize drug dosing but is now used broadly in health and fitness contexts."
    },
    {
        id: "how-accurate-are-ibw-formulas",
        q: "How accurate are ideal body weight calculation formulas?",
        a: "They are useful statistical estimates but have significant limitations. IBW formulas do not distinguish between muscle mass and body fat. A highly muscular athlete might weigh more than their \"ideal\" weight while being extremely healthy. They should be used as one of many health indicators, not the final word on your health status."
    },
    {
        id: "difference-between-ibw-formulas-ref",
        q: "What is the difference between Devine, Robinson, and Hamwi formulas?",
        a: "The Devine formula is the most widely used in medical settings. Robinson developed a slightly leaner model specifically for taller individuals. Hamwi is a more traditional formula often used in nutrition counseling. Most people find the best result by looking at the average range produced by all three."
    },
    {
        id: "ibw-vs-bmi-ref",
        q: "Is ideal body weight calculation better than BMI?",
        a: "Neither is perfect. BMI gives you a category (underweight, normal, etc.), while IBW gives you a specific target weight. IBW is often more intuitive for individuals, but like BMI, it cannot account for body composition (muscle vs. fat ratio)."
    }
];
