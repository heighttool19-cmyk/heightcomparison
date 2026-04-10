import React from "react";
export const HOME_FAQ = [
    {
        q: "How do I compare two people's heights side by side?",
        a: <>Click <strong className='text-accent'>Add Person</strong>, enter a name and height in cm or ft/in, and pick a colour. Add a second person the same way. The <strong className='text-accent'>height chart</strong> updates instantly at exact proportional scale. You can also search the celebrity database or fictional character panel for pre-loaded heights.</>
    },
    {
        q: "How does the chart calculate proportions?",
        a: "The chart uses a visual ratio engine. If Person A is 170 cm and Person B is 185 cm, the second bar renders at exactly 1.09x the first. That ratio is calculated mathematically from the values entered. No rounding, no visual approximation."
    },
    {
        q: "How many people can I add to one comparison?",
        a: "There is no limit. Add as many people, celebrities, fictional characters, and real-world objects as you want. All subjects share one proportional chart and the chart scales automatically."
    },
    {
        q: "What is the difference between this tool and the Height Difference Calculator?",
        a: <>This <strong className='text-accent'>height comparison tool</strong> generates a proportional visual chart for all subjects at true scale. The <a href="/height-difference/" className="text-accent underline">Height Difference Calculator</a> returns the exact gap between two heights in cm, inches, and percentage. Use the comparison tool to see the visual; use the difference calculator for the precise number.</>
    },
    {
        q: "Who is the tallest person in the world?",
        a: <>The tallest living person is <strong className='text-accent'>Sultan Kosen</strong> of Turkey at 251 cm (8 ft 2.8 in). The tallest person ever recorded was <strong className='text-accent'>Robert Wadlow</strong> of the USA at 272 cm (8 ft 11.1 in). You can add either to this height chart by entering the height in the Add Person panel. See the full <a href="/average-height-by-country/" className="text-accent underline">Average Height by Country</a> page for global height extremes.</>
    },
    {
        q: "What is the average height by age?",
        a: <>Key US benchmarks from CDC and NHANES data:<br /><br />
            • <strong className='text-accent'>4-year-old boy:</strong> approx. 103 cm (3 ft 4 in)<br />
            • <strong className='text-accent'>10-year-old boy:</strong> approx. 138 cm (4 ft 6 in)<br />
            • <strong className='text-accent'>10-year-old girl:</strong> approx. 140 cm (4 ft 7 in)<br />
            • <strong className='text-accent'>Adult men (US):</strong> 176.9 cm (5 ft 9.7 in)<br />
            • <strong className='text-accent'>Adult women (US):</strong> 163.3 cm (5 ft 4.3 in)<br /><br />
            For full <strong className='text-accent'>average height by age</strong> tables across all ages and genders, see our <a href="/height-weight-percentile/" className="text-accent underline">Height Weight Percentile Calculator</a>.</>
    }
];

export const HOME_TOC = [
    { id: 'how-does-a-height-comparison-chart-work', label: 'How it Works' },
    { id: 'compare-height-in-3-simple-steps', label: 'Step-by-Step Guide' },
    { id: 'why-a-visual-height-comparison-shows-more-than-numbers', label: 'Visual vs Numbers' },
    { id: 'comparing-heights-examples-and-use-cases', label: 'Use Cases' },
    { id: 'height-generator-comparison-all-features-all-free', label: 'Key Features' },
    { id: 'how-accurate-is-the-height-comparison-chart', label: 'Accuracy & Data' },
    { id: 'a-height-comparison-website-built-for-simplicity', label: 'Why Choose Us' },
    { id: 'frequently-asked-questions', label: 'FAQ' },
    { id: 'compare-heights-online-tools-and-articles', label: 'Other Tools' }
];
