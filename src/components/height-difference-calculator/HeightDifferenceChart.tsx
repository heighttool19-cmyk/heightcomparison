'use client';

import React from "react";
import { useThemeStore } from "@/store";

const CHART_DATA = [
    { a: "155 cm (5'1\")", b: "160 cm (5'3\")", diff: "5 cm", pct: "3.1%" },
    { a: "160 cm (5'3\")", b: "170 cm (5'7\")", diff: "10 cm", pct: "5.9%" },
    { a: "165 cm (5'5\")", b: "180 cm (5'11\")", diff: "15 cm", pct: "8.3%" },
    { a: "170 cm (5'7\")", b: "183 cm (6'0\")", diff: "13 cm", pct: "7.1%" },
    { a: "170 cm (5'7\")", b: "190 cm (6'3\")", diff: "20 cm", pct: "10.5%" },
    { a: "175 cm (5'9\")", b: "190 cm (6'3\")", diff: "15 cm", pct: "7.9%" },
    { a: "178 cm (5'10\")", b: "183 cm (6'0\")", diff: "5 cm", pct: "2.7%" },
];

export default function HeightDifferenceChart() {
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    return (
        <div style={{ fontFamily: "Georgia, serif" }} className="w-full overflow-x-auto rounded-xl border border-border shadow-sm">
            <table className="w-full border-collapse text-[13px]">
                <thead>
                    <tr className="bg-surface border-b-2 border-border">
                        {["Person A", "Person B", "Difference", "% Difference"].map((h) => (
                            <th key={h} className="p-3 text-left text-[10.5px] font-black text-muted uppercase tracking-[0.07em]">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-bg">
                    {CHART_DATA.map((r, i) => (
                        <tr key={i} className="border-b border-border hover:bg-surface/50 transition-colors">
                            <td className="p-3 font-bold text-[#1A56DB]">{r.a}</td>
                            <td className="p-3 font-bold text-[#0694A2]">{r.b}</td>
                            <td className="p-3 font-black text-[#f7a24f]">{r.diff}</td>
                            <td className="p-3">
                                <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${isDark ? 'bg-blue-900/30 text-[#7ef7b4]' : 'bg-[#1a56db12] bg-opacity-10 text-[#d2691e]'}`}>
                                    {r.pct}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}