'use client';

import React, { useState } from "react";
import { useThemeStore } from "@/store";

const BLUE = "#1A56DB", PINK = "#DB2777";

function cmToFtIn(cm: number) {
    const totalIn = cm / 2.54;
    const ft = Math.floor(totalIn / 12);
    const inches = Math.round(totalIn % 12);
    return `${ft}'${inches}"`;
}

function Silhouette({ heightPx, color, label, heightLabel }: { heightPx: number, color: string, label: string, heightLabel: string }) {
    const w = 38, scale = heightPx / 120;
    return (
        <div className="flex flex-col items-center gap-1.5">
            <p style={{ color }} className="m-0 text-[11px] font-bold text-center">{label}</p>
            <svg width={w} height={heightPx} viewBox={`0 0 38 120`} className="block overflow-visible">
                <g transform={`scale(1,${scale}) translate(0,${120 * (1 - scale) / scale})`}>
                    <circle cx="19" cy="10" r="8" fill={color} opacity="0.85" />
                    <rect x="10" y="19" width="18" height="40" rx="5" fill={color} opacity="0.85" />
                    <rect x="2" y="21" width="8" height="28" rx="4" fill={color} opacity="0.7" />
                    <rect x="28" y="21" width="8" height="28" rx="4" fill={color} opacity="0.7" />
                    <rect x="10" y="57" width="8" height="40" rx="4" fill={color} opacity="0.85" />
                    <rect x="20" y="57" width="8" height="40" rx="4" fill={color} opacity="0.85" />
                </g>
            </svg>
            <p style={{ color }} className="m-0 text-xs font-black whitespace-pre-line text-center">{heightLabel}</p>
        </div>
    );
}

export default function CoupleHeightDifferenceCalculator() {
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    const EXAMPLES = [
        { p1: "Partner 1", h1: 183, p2: "Partner 2", h2: 165 },
        { p1: "Partner 1", h1: 178, p2: "Partner 2", h2: 163 },
        { p1: "Partner 1", h1: 175, p2: "Partner 2", h2: 160 },
    ];

    const [idx, setIdx] = useState(0);
    const ex = EXAMPLES[idx];
    const diff = ex.h1 - ex.h2;
    const pct = ((diff / ex.h1) * 100).toFixed(1);
    const maxPx = 110, minPx = Math.round((ex.h2 / ex.h1) * maxPx);

    // Responsive gradient adapting to dark mode
    const backgroundGradient = isDark
        ? "linear-gradient(135deg, rgba(219,39,119,0.1) 0%, rgba(26,86,219,0.1) 100%)"
        : "linear-gradient(135deg, #FDF4FF 0%, #EBF5FF 100%)";

    return (
        <div style={{ fontFamily: "Georgia, serif" }} className="w-full">
            {/* Preset selector */}
            <div className="flex flex-wrap gap-2 mb-5">
                {EXAMPLES.map((e, i) => (
                    <button
                        key={i}
                        onClick={() => setIdx(i)}
                        className={`px-4 py-1.5 rounded-full text-[11.5px] font-bold cursor-pointer transition-colors border-2 ${i === idx ? 'bg-[#DB2777] text-white border-[#DB2777]' : 'bg-surface text-muted border-border hover:text-foreground'}`}
                    >
                        {e.h1} cm / {e.h2} cm
                    </button>
                ))}
            </div>

            <div style={{ background: backgroundGradient }} className="rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-end justify-center gap-6 sm:gap-10">
                    <Silhouette heightPx={maxPx} color={PINK} label={ex.p1} heightLabel={`${ex.h1} cm\n${cmToFtIn(ex.h1)}`} />

                    <div className="flex flex-col items-center justify-center pb-6" style={{ height: maxPx }}>
                        <div className="w-[1.5px] flex-1 bg-pink-600 opacity-40" />
                        <div className="bg-surface border border-pink-600/30 rounded-lg px-3 py-1.5 shadow-sm my-1">
                            <p className="m-0 text-[13px] font-black text-pink-600 text-center">{diff} cm</p>
                            <p className="m-0 text-[10px] text-muted text-center font-sans mt-0.5">{pct}% taller</p>
                        </div>
                        <div className="w-[1.5px] flex-1 bg-pink-600 opacity-40" />
                    </div>

                    <Silhouette heightPx={minPx} color={BLUE} label={ex.p2} heightLabel={`${ex.h2} cm\n${cmToFtIn(ex.h2)}`} />
                </div>

                <p className="m-0 mt-5 text-xs text-foreground text-center leading-[1.6]">
                    {ex.p1} ({ex.h1} cm) is <strong className="font-black text-pink-600">{diff} cm ({pct}%) taller</strong> than {ex.p2} ({ex.h2} cm)
                </p>
            </div>
        </div>
    );
}