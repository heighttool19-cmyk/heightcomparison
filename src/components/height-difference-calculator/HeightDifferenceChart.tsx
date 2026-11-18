'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const CHART_DATA = [
    { a: "155 cm (5'1\")", b: "160 cm (5'3\")", diff: "5 cm", pct: "3.1%" },
    { a: "160 cm (5'3\")", b: "170 cm (5'7\")", diff: "10 cm", pct: "5.9%" },
    { a: "165 cm (5'5\")", b: "180 cm (5'11\")", diff: "15 cm", pct: "8.3%" },
    { a: "170 cm (5'7\")", b: "183 cm (6'0\")", diff: "13 cm", pct: "7.1%" },
    { a: "170 cm (5'7\")", b: "190 cm (6'3\")", diff: "20 cm", pct: "10.5%" },
    { a: "175 cm (5'9\")", b: "190 cm (6'3\")", diff: "15 cm", pct: "7.9%" },
    { a: "178 cm (5'10\")", b: "183 cm (6'0\")", diff: "5 cm", pct: "2.7%" }
];

export default function HeightDifferenceChart() {
    const t = useTranslations('heightDifference.chartTable');

    return (
        <div className="w-full overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm font-medium">
            <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-bg border-b border-border text-foreground font-bold">
                    <tr>
                        <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('headerPersonA')}</th>
                        <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('headerPersonB')}</th>
                        <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('headerDifference')}</th>
                        <th className="px-6 py-4 uppercase tracking-widest text-[11px]">{t('headerPercentDifference')}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                    {CHART_DATA.map((r, i) => (
                        <tr key={i} className="hover:bg-bg/50 transition-colors">
                            <td className="px-6 py-3.5 font-bold text-foreground">{r.a}</td>
                            <td className="px-6 py-3.5 font-bold text-foreground">{r.b}</td>
                            <td className="px-6 py-3.5 font-black text-amber-600 dark:text-amber-400 font-mono">{r.diff}</td>
                            <td className="px-6 py-3.5">
                                <span className="font-black text-[#2563eb] dark:text-blue-400 font-mono bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md text-xs">
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
