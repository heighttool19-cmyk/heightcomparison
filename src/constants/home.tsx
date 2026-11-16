import React from "react";
import Link from "next/link";
import { AgeBenchmarkBars, TwoInchGap, ConversionFlow } from "@/components/visuals";

export interface FaqItem {
  q: string;
  a: React.ReactNode;
}

export const HOME_FAQ: FaqItem[] = [
  {
    q: "How do I compare two people's heights side by side?",
    a: (
      <>
        Click <strong className="text-accent">Add Person</strong>, enter a name and height in cm or ft/in, and pick a color. Add a second person the same way. The <strong className="text-accent">height chart</strong> updates instantly at exact proportional scale. You can also search the celebrity database or fictional character panel for pre-loaded heights.
      </>
    ),
  },
  {
    q: "How does the chart calculate proportions?",
    a: (
      <>
        The chart uses a visual ratio engine. If Person A is 170 cm and Person B is 185 cm, the second bar renders at exactly 1.09x the first. That ratio is calculated mathematically from the values entered. Bars use the exact values you enter, and only the text labels round, to the nearest cm or inch.
      </>
    ),
  },
  {
    q: "How many people can I add to one comparison?",
    a: (
      <>
        There is no limit. Add as many people, celebrities, fictional characters, and real-world objects as you want. All subjects share one proportional chart and the chart scales automatically.
      </>
    ),
  },
  {
    q: "What is the difference between this tool and the Height Difference Calculator?",
    a: (
      <>
        This <strong className="text-accent">height comparison tool</strong> generates a proportional visual chart for all subjects at true scale. The{" "}
        <Link href="/height-difference-calculator" className="text-accent underline">
          Height Difference Calculator
        </Link>{" "}
        returns the exact gap between two heights in cm, inches, and percentage. Use the comparison tool to see the visual, and the difference calculator for the precise number.
      </>
    ),
  },
  {
    q: "Who is the tallest person in the world?",
    a: (
      <>
        The tallest living person is <strong className="text-accent">Sultan Kösen</strong> of Turkey at 251 cm (8 ft 2.8 in), as measured by Guinness World Records in 2011. The tallest person ever recorded was <strong className="text-accent">Robert Wadlow</strong> of the USA at 272 cm (8 ft 11.1 in). You can add either to this height chart by entering the height in the Add Person panel.
      </>
    ),
  },
  {
    q: "What is the average height by age?",
    a: (
      <div className="space-y-3">
        <p>
          Key US benchmarks from CDC data: 4-year-old boy: approx. 103 cm (3 ft 4 in). 10-year-old boy: approx. 138 cm (4 ft 6 in). 10-year-old girl: approx. 138 cm (4 ft 6 in). Adult men (US, 20 and older, 2021 to 2023): 175.0 cm (5 ft 8.9 in). Adult women (US, 20 and older, 2021 to 2023): 161.3 cm (5 ft 3.5 in). Median at age 20 on CDC growth charts: 176.9 cm for men and 163.3 cm for women. For full average height by age tables across all ages and genders, see our{" "}
          <Link href="/height-weight-percentile-calculator" className="text-accent underline font-semibold">
            Height Weight Percentile Calculator
          </Link>
          .
        </p>
        <AgeBenchmarkBars />
      </div>
    ),
  },
  {
    q: "Is 2 inches a big height difference?",
    a: (
      <div className="space-y-3">
        <p>
          Two inches is 5.1 cm, about 3% of an average US man&apos;s height of 5&apos;9&quot; (68.9 in). Side by side, the taller person&apos;s eye line sits 2 inches higher, about the short side of a credit card. Enter both heights in the chart to see the gap at true scale.
        </p>
        <TwoInchGap />
      </div>
    ),
  },
  {
    q: "How much taller is 5'10\" than 5'7\"?",
    a: (
      <>
        5&apos;10&quot; is 3 inches (7.6 cm) taller than 5&apos;7&quot;, or 4.5% taller. In centimeters, that is 177.8 cm against 170.2 cm.
      </>
    ),
  },
  {
    q: "How do I convert cm to feet and inches?",
    a: (
      <div className="space-y-3">
        <p>
          Divide centimeters by 2.54 to get inches, then divide by 12 for feet. 169 cm is 66.5 inches, or 5 ft 6.5 in. To go the other way, multiply total inches by 2.54: 5&apos;1&quot; is 61 inches, or 154.9 cm. The cm to ft button on the chart converts every subject at once.
        </p>
        <ConversionFlow />
      </div>
    ),
  },
];

export const HOME_FAQ_SOURCES = "Sources: CDC National Center for Health Statistics (NHANES 2021 to 2023), CDC growth charts, Guinness World Records. Checked November 2026.";

export const HOME_TOC = [
  { id: "how-does-a-height-comparison-chart-work", label: "How it Works" },
  { id: "compare-height-in-3-simple-steps", label: "Step-by-Step Guide" },
  { id: "why-a-visual-height-comparison-shows-more-than-numbers", label: "Visual vs Numbers" },
  { id: "comparing-heights-examples-and-use-cases", label: "Use Cases" },
  { id: "height-generator-comparison-all-features-all-free", label: "Key Features" },
  { id: "how-accurate-is-the-height-comparison-chart", label: "Accuracy & Data" },
  { id: "a-height-comparison-website-built-for-simplicity", label: "Why Choose Us" },
  { id: "frequently-asked-questions", label: "FAQ" },
  { id: "compare-heights-online-tools-and-articles", label: "Other Tools" },
];
