'use client';
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
    q: string;
    a: string | React.ReactNode;
}

export const DEFAULT_FAQ: FaqItem[] = [
    {
        q: "How do I compare two people's heights side by side?",
        a: "Click Add Person in the left sidebar, enter the first height, pick a color, and hit Add Person. Repeat for the second. Your side-by-side chart renders instantly and updates every time you change a value. Use the cm → ft/in toggle to switch units without re-entering anything."
    },
    {
        q: "How does the chart calculate proportions?",
        a: "Each bar scales to the exact mathematical ratio between heights. If Person A is 170 cm and Person B is 185 cm, the second bar renders at exactly 1.09× the first (185 ÷ 170 = 1.088...). The ratio is calculated from your entered values with no rounding. What you see on screen is mathematically accurate."
    },
    {
        q: "How many people can I add to one comparison?",
        a: "There is no limit. Add as many people, celebrities, characters, or objects as you want. Each entry gets its own color so the chart stays readable regardless of how many subjects are present. The bars rescale automatically every time you add someone new."
    },
    {
        q: "What is the difference between this tool and the Height Difference Calculator?",
        a: "This tool is for comparing multiple heights visually on one proportional chart — people, celebrities, characters, objects, and uploaded photos all together. The Height Difference Calculator focuses specifically on the gap between two heights: the exact difference in cm and inches, the percentage, and a reference chart for common pairings. Both are free and work well together."
    },
    {
        q: "Does the tool work in centimeters and feet and inches?",
        a: "Yes. The cm → ft/in toggle in the top toolbar converts both inputs and the chart output at the same time. You can enter one person in cm and another in ft/in and the tool normalizes both to the same proportional scale automatically."
    },
    {
        q: "Can I download or share my height comparison chart?",
        a: "Yes. Hit Download PNG in the toolbar for a clean labeled chart image — free, unlimited, no watermark. Hit Share to generate a direct link to your exact comparison. Both work with no account required."
    },
    {
        q: "Is this height comparison website completely free?",
        a: "Yes — all of it. The celebrity database, fictional character library, entity scale, image upload, PNG download, and share link are all free. No account, no subscription, no hidden tiers. Open the page and everything is available straight away."
    }
];

interface Props {
    items: FaqItem[];
    title?: string;
    description?: string;
}

export default function FaqAccordion({ items, title = "Frequently Asked Questions", description = "Scientific insights into your development" }: Props) {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    return (
        <section id="frequently-asked-questions" className="scroll-mt-24">
            {/* <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-border" />
                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted whitespace-nowrap">Got questions?</div>
                <div className="flex-1 h-px bg-border" />
            </div> */}

            {/* <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-8">Frequently Asked Questions</h2> */}

            <div className="border border-border rounded-[2.5rem] overflow-hidden bg-surface transition-colors duration-500 shadow-sm mt-4">
                <div className="px-8 md:px-12 pt-4 pb-8 text-center sm:text-left space-y-2 border-b border-border">
                    <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                        <HelpCircle size={12} /> HELP CENTER
                    </div>
                    <h2 className="text-3xl font-black text-foreground">{title}</h2>
                    <p className="text-sm text-muted">{description}</p>
                </div>

                <div className="px-2 md:px-10 py-6 flex flex-col gap-3">
                    {items.map((item, idx) => {
                        const isOpen = openFaqIndex === idx;
                        return (
                            <div
                                key={idx}
                                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen ? 'border-accent/50 bg-bg shadow-lg shadow-accent/5' : 'border-border bg-bg hover:border-accent/30'}`}
                            >
                                <button
                                    className="w-full flex items-center justify-between pl-4 pr-3 py-4 text-left  group rounded-t-2xl gap-2"
                                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                >
                                    <span className={`text-sm font-bold transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-foreground group-hover:text-accent'}`}>{item.q}</span>
                                    <div className={`shrink-0 transition-all duration-300 ${isOpen ? 'text-accent rotate-180' : 'text-muted rotate-0'}`}>
                                        <ChevronDown size={18} />
                                    </div>
                                </button>
                                <div className={`overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'grid grid-rows-[1fr] opacity-100' : 'grid grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <div className="px-4 pt-0 pb-5 border-t border-border/40">
                                            <p className="text-sm text-muted leading-relaxed pt-4">
                                                {item.a}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
