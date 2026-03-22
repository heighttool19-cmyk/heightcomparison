'use client';

import React, { useState } from "react";

const BLUE = "#1A56DB", TEAL = "#0694A2", PINK = "#DB2777";

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

export default function VisualHeightComparison() {
    const PAIRS = [
        { p1: "Person 1", h1: 190, p2: "Person 2", h2: 170, c1: BLUE, c2: TEAL },
        { p1: "Person 1", h1: 180, p2: "Person 2", h2: 165, c1: BLUE, c2: PINK },
        { p1: "Person 1", h1: 175, p2: "Person 2", h2: 155, c1: TEAL, c2: PINK },
    ];

    const [sel, setSel] = useState(0);
    const { p1, h1, p2, h2, c1, c2 } = PAIRS[sel];
    const diff = h1 - h2;
    const pct = ((diff / h1) * 100).toFixed(1);
    const maxPx = 115, minPx = Math.round((h2 / h1) * maxPx);

    return (
        <div style={{ fontFamily: "Georgia, serif" }} className="w-full">
            <div className="flex flex-wrap gap-2 mb-5">
                {PAIRS.map((p, i) => (
                    <button
                        key={i}
                        onClick={() => setSel(i)}
                        className={`px-4 py-1.5 rounded-full text-[11.5px] font-bold cursor-pointer transition-colors border-2 ${i === sel ? 'bg-[#1A56DB] text-white border-[#1A56DB]' : 'bg-surface text-muted border-border hover:text-foreground'}`}
                    >
                        {p.h1} cm vs {p.h2} cm
                    </button>
                ))}
            </div>

            <div className="bg-bg border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-end justify-center gap-6 sm:gap-10">
                    <Silhouette heightPx={maxPx} color={c1} label={p1} heightLabel={`${h1} cm\n${cmToFtIn(h1)}`} />

                    {/* Bracket arrow */}
                    <svg width="40" height={maxPx + 24} className="mb-6 overflow-visible text-foreground">
                        {/* Top tick */}
                        <line x1="16" y1={maxPx - minPx} x2="24" y2={maxPx - minPx} stroke="currentColor" strokeWidth="1.5" />
                        {/* Vertical line */}
                        <line x1="20" y1={maxPx - minPx} x2="20" y2={maxPx} stroke="currentColor" strokeWidth="1.5" />
                        {/* Bottom tick */}
                        <line x1="16" y1={maxPx} x2="24" y2={maxPx} stroke="currentColor" strokeWidth="1.5" />
                    </svg>

                    <Silhouette heightPx={minPx} color={c2} label={p2} heightLabel={`${h2} cm\n${cmToFtIn(h2)}`} />
                </div>

                {/* Result pill */}
                <div className="flex justify-center mt-5">
                    <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-surface border border-border rounded-full px-5 py-2 shadow-sm">
                        <span className="text-[13px] font-black text-foreground">{diff} cm difference</span>
                        <span className="w-px h-3 bg-border hidden sm:block" />
                        <span className="text-[13px] font-bold text-[#1A56DB]">{pct}%</span>
                        <span className="w-px h-3 bg-border hidden sm:block" />
                        <span className="text-[13px] font-bold text-muted">{p1} is taller</span>
                    </div>
                </div>
            </div>
        </div>
    );
}