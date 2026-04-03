// Updated Constant with exact word-to-word content
export const CHILD_HEIGHT_QA = [
    {
        q: "How tall will I be?",
        a: "Your adult height depends primarily on your parents' heights and your growth timing. Use the height calculator above. Enter your current age, height, weight, and your parents' heights to get a predicted height range based on the Khamis-Roche growth model. If you are already 18 or older, your growth plates have closed and your adult height is set."
    },
    {
        q: "How tall will my son be?",
        a: "Enter your son's age, current height, weight, and both parents' heights into the Khamis-Roche calculator above. Boys typically stop growing around age 18, though small increases may continue until 20. The Mid-Parental Height Formula can also give a rough estimate: (Father's height + Mother's height + 5 inches) ÷ 2."
    },
    {
        q: "Is a height calculator accurate?",
        a: "The Khamis-Roche method (used in this calculator) is one of the most accurate non-clinical height predictors available. Typical accuracy is within ±2.1 inches for boys and ±1.7 inches for girls. Accuracy improves when the child is older than 4, measurements are precise, and parent heights are correct. Results are always a range, not a guaranteed value."
    },
    {
        q: "Can parents' height predict my height?",
        a: "Yes. Parents' heights are the single strongest predictor of a child's adult height, accounting for 60–80% of height variation. The Mid-Parental Height Formula provides a rough estimate using only this data. However, combining parent heights with the child's current measurements (age, height, weight) through the Khamis-Roche model produces significantly more accurate results."
    },
    {
        q: "How accurate is a child height predictor?",
        a: "Our child height predictor uses the Khamis-Roche model and typically predicts within 5–10 cm of final adult height. The calculator works best for children older than 4 when accurate height, weight, and parent height data are available. Predictions are estimates. They represent a likely range rather than a certainty."
    },
    {
        q: "Can I predict my baby's height?",
        a: "For babies and infants, use the Mid-Parental Height Formula calculator above. It requires only the mother's and father's heights. This gives a rough estimated height range. Note that accuracy is lower for babies than for older children, since current growth data is not factored in."
    },
    {
        q: "How tall should my child be at their age?",
        a: "Use the growth chart section above to see the average height range by age for boys and girls. The 50th percentile represents the median height. Healthy children typically fall between the 3rd and 97th percentile. If your child is consistently above or below this range, discuss it with their pediatrician."
    },
    {
        q: "What is the most accurate height prediction method?",
        a: "The most accurate method overall is bone age testing (wrist X-ray), used clinically by doctors. For non-clinical prediction, the Khamis-Roche method is the most accurate available. It uses age, height, weight, and parent heights, achieving ±2.1 inches accuracy for boys and ±1.7 inches for girls. This is the method used in the calculator on this page."
    }
];

export const CHILD_HEIGHT_TOC = [
    { id: 'child-height-predictor-calculator', label: 'Height Predictor Calculator' },
    { id: 'how-does-a-height-calculator-work', label: 'How Does it Work?' },
    {
        id: 'how-tall-will-my-child-be',
        label: 'How Tall Will My Child Be?',
        subItems: [
            { id: 'how-tall-will-i-be', label: 'How Tall Will I Be (Teens & Adults)' }
        ]
    },
    { id: 'what-determines-child-height', label: 'What Determines Height?' },
    { id: 'boys-girls-growth-charts', label: 'Boys & Girls Growth Charts' },
    { id: 'height-prediction-comparison', label: 'Calculator vs. Growth Charts' },
    { id: 'when-do-boys-stop-growing', label: 'When Do Boys Stop Growing?' },
    { id: 'when-do-girls-stop-growing', label: 'When Do Girls Stop Growing?' },
    {
        id: 'predict-child-height',
        label: 'Height Prediction Methods',
        subItems: [
            { id: 'khamis-roche-method', label: 'Khamis-Roche Method' },
            { id: 'height-calculator-based-on-parents', label: 'Based on Parents' },
        ]
    },
    {
        id: 'bone-age-method',
        label: 'Bone Age Method',
        subItems: [
            // { id: 'how-wrist-x-ray-predict-child-height', label: 'Wrist X-Ray Prediction' },
            { id: 'bayley-pinneau-method', label: 'Bayley-Pinneau Method' },
            { id: 'roche-wainer-thissen-method', label: 'Roche-Wainer-Thissen Method' }
        ]
    },
    { id: 'increase', label: 'Can You Increase Height?' },
    { id: 'how-to-get-taller-as-a-kid', label: 'Factors Affecting Height' },
    { id: 'boys-height-predictor', label: 'Understanding Growth Timelines' },
    { id: 'accuracy', label: 'Prediction Accuracy' },
    { id: 'child-height-calculator-faq', label: 'FAQ' },
    { id: 'related-tools', label: 'Related Tools' },
    { id: 'references', label: 'References' }
];
