export const CHILD_HEIGHT_QA = [
    {
        q: "How tall will my son be?",
        a: "The most reliable estimate comes from a Khamis-Roche height predictor calculator, which analyzes age, height, weight, and parents’ heights."
    },
    {
        q: "How accurate is a child height predictor?",
        a: "Most calculators predict adult height within 2–4 inches (5–10 cm)."
    },
    {
        q: "Can I predict my baby’s height?",
        a: "Yes. The mid-parental height method can estimate adult height using the parents’ heights."
    },
    {
        q: "How tall should my child be at their age?",
        a: "Growth charts show typical height ranges for children. Most healthy children fall between the 3rd and 97th percentile."
    },
    {
        q: "What is the most accurate height prediction method?",
        a: "Bone age testing provides the most precise estimate in clinical settings, but Khamis-Roche calculators are the most practical option for parents."
    }
];

export const CHILD_HEIGHT_TOC = [
    { id: 'child-height-predictor-calculator', label: 'Height Predictor Calculator' },
    { id: 'how-tall-will-my-child-be', label: 'How Tall Will My Child Be?' },
    { id: 'what-determines-child-height', label: 'What Determines a Child’s Height?' },
    { id: 'when-do-boys-stop-growing', label: 'When Do Boys Stop Growing?' },
    { id: 'when-do-girls-stop-growing', label: 'When Do Girls Stop Growing?' },
    { id: 'boys-girls-growth-charts', label: 'Boys & Girls Growth Charts' },
    {
        id: 'predict-child-height',
        label: 'How to Predict Height',
        subItems: [
            { id: 'height-calculator-based-on-parents', label: 'Based on Parents' },
            { id: 'khamis-roche-method', label: 'Khamis-Roche Method' },
            {
                id: 'bone-age-method',
                label: 'Bone Age Method',
                subItems: [
                    { id: 'how-wrist-x-ray-predict-child-height', label: 'Wrist X-Ray Prediction' },
                    { id: 'bayley-pinneau-method', label: 'Bayley-Pinneau Method' },
                    { id: 'roche-wainer-thissen-method', label: 'Roche-Wainer-Thissen Method' }
                ]
            },
        ]
    },
    { id: 'boys-height-predictor', label: 'Boys Height Predictor: Understanding Male Growth' },
    { id: 'how-to-get-taller-as-a-kid', label: 'How to Get Taller As A Kid' },
    { id: 'accuracy', label: 'Prediction Accuracy' },
    { id: 'child-height-calculator-faq', label: 'FAQ' }
];
