'use client';

import React, { useState } from "react";
import { useUnitStore, useThemeStore } from "@/store";

// ── Palette (Light Mode Base) ────────────────────────────────────────────────
const BLUE = "#1A56DB", TEAL = "#0694A2", PINK = "#DB2777", GREEN = "#057A55";

// ── Helpers ───────────────────────────────────────────────────────────────────
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
                    {/* head */}
                    <circle cx="19" cy="10" r="8" fill={color} opacity="0.85" />
                    {/* body */}
                    <rect x="10" y="19" width="18" height="40" rx="5" fill={color} opacity="0.85" />
                    {/* left arm */}
                    <rect x="2" y="21" width="8" height="28" rx="4" fill={color} opacity="0.7" />
                    {/* right arm */}
                    <rect x="28" y="21" width="8" height="28" rx="4" fill={color} opacity="0.7" />
                    {/* left leg */}
                    <rect x="10" y="57" width="8" height="40" rx="4" fill={color} opacity="0.85" />
                    {/* right leg */}
                    <rect x="20" y="57" width="8" height="40" rx="4" fill={color} opacity="0.85" />
                </g>
            </svg>
            <p style={{ color }} className="m-0 text-xs font-black whitespace-pre-line text-center">{heightLabel}</p>
        </div>
    );
}

function HeightInput({ id, label, value, onChange, isMetric, isDark }: { id: string, label: string, value: string, onChange: (v: string) => void, isMetric: boolean, isDark: boolean }) {
    return (
        <div className="flex-1 min-w-[140px]">
            <label htmlFor={id} className="m-0 mb-2 text-[11px] font-bold text-muted uppercase tracking-[0.09em] block">{label}</label>
            <input
                id={id}
                type="number"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={isMetric ? "e.g. 175" : "e.g. 68"}
                className={`w-full p-3 rounded-xl border-2 border-border bg-bg text-foreground text-base font-bold outline-none transition-colors ${isDark ? 'focus:border-blue-400' : 'focus:border-blue-600'}`}
            />
            <p className="m-0 mt-1.5 text-[10.5px] text-muted">
                {isMetric ? "in centimetres" : "in inches (total)"}
            </p>
        </div>
    );
}

export default function CalculateHeightDifference() {
    const { unitSystem, setUnitSystem } = useUnitStore();
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';
    const isMetric = unitSystem === 'metric';

    // Tailored Dark Mode Colors for better visibility on dark backgrounds
    const currentBlue = isDark ? "#60A5FA" : BLUE;   // Lighter blue
    const currentGreen = isDark ? "#34D399" : GREEN; // Lighter green
    const currentPink = isDark ? "#F472B6" : PINK;   // Lighter pink
    const currentTeal = isDark ? "#2DD4BF" : TEAL;   // Lighter teal

    const [h1, setH1] = useState("180");
    const [h2, setH2] = useState("165");

    const toCm = (v: string) => isMetric ? +v : Math.round(+v * 2.54);
    const cm1 = toCm(h1 || "0");
    const cm2 = toCm(h2 || "0");
    const valid = cm1 > 0 && cm2 > 0;
    const diff = valid ? Math.abs(cm1 - cm2) : 0;
    const taller = valid ? Math.max(cm1, cm2) : 0;
    const shorter = valid ? Math.min(cm1, cm2) : 0;
    const pct = taller > 0 ? ((diff / taller) * 100).toFixed(1) : "0";
    const tallerIs = cm1 >= cm2 ? "Person 1" : "Person 2";

    const maxH = 120;
    const minH = valid && taller > 0 ? Math.round((shorter / taller) * maxH) : maxH;

    const fmtH = (cm: number) => isMetric ? `${cm} cm` : cmToFtIn(cm);

    return (
        <div style={{ fontFamily: "Georgia, serif" }} className="w-full">
            {/* Unit toggle */}
            <div className="flex flex-wrap gap-2 mb-5">
                <button
                    onClick={() => setUnitSystem('metric')}
                    className={`px-5 py-2 rounded-full text-xs font-black cursor-pointer transition-all shadow-sm border-2 ${isMetric ? 'bg-accent text-white border-accent shadow-md' : 'bg-surface text-muted border-border hover:text-foreground'}`}
                >
                    Metric (cm)
                </button>
                <button
                    onClick={() => setUnitSystem('imperial')}
                    className={`px-5 py-2 rounded-full text-xs font-black cursor-pointer transition-all shadow-sm border-2 ${!isMetric ? 'bg-accent text-white border-accent shadow-md' : 'bg-surface text-muted border-border hover:text-foreground'}`}
                >
                    Imperial (in)
                </button>

            </div>

            {/* Inputs */}
            <div className="flex flex-wrap gap-4 mb-6">
                <HeightInput id="h1" label="Person 1" value={h1} onChange={setH1} isMetric={isMetric} isDark={isDark} />
                <HeightInput id="h2" label="Person 2" value={h2} onChange={setH2} isMetric={isMetric} isDark={isDark} />
            </div>

            {valid && diff >= 0 ? (
                <>
                    {/* Result cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                        <div className={`rounded-xl p-4 text-center border ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-[#EBF5FF] border-transparent'}`}>
                            <p style={{ color: currentBlue }} className="m-0 mb-1 text-[10px] font-bold uppercase tracking-[0.09em]">Height Difference</p>
                            <p style={{ color: currentBlue }} className="m-0 text-2xl font-black">{diff} cm</p>
                            <p className="m-0 mt-1 text-[11px] text-muted font-sans font-medium">{cmToFtIn(diff)}</p>
                        </div>
                        <div className={`rounded-xl p-4 text-center border ${isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-[#F0FDF4] border-transparent'}`}>
                            <p style={{ color: currentGreen }} className="m-0 mb-1 text-[10px] font-bold uppercase tracking-[0.09em]">% Difference</p>
                            <p style={{ color: currentGreen }} className="m-0 text-2xl font-black">{pct}%</p>
                            <p className="m-0 mt-1 text-[11px] text-muted font-sans font-medium">{tallerIs} is taller</p>
                        </div>
                        <div className={`rounded-xl p-4 text-center border ${isDark ? 'bg-pink-500/10 border-pink-500/20' : 'bg-[#FDF4FF] border-transparent'}`}>
                            <p style={{ color: currentPink }} className="m-0 mb-1 text-[10px] font-bold uppercase tracking-[0.09em]">Taller Person</p>
                            <p style={{ color: currentPink }} className="m-0 text-2xl font-black">{fmtH(taller)}</p>
                            <p className="m-0 mt-1 text-[11px] text-muted font-sans font-medium">{tallerIs}</p>
                        </div>
                    </div>

                    {/* Silhouette visual */}
                    <div className="bg-bg border border-border rounded-xl p-6 text-center shadow-sm">
                        <p className="m-0 mb-5 text-[11px] text-muted font-bold uppercase tracking-[0.08em]">Visual Comparison</p>
                        <div className="flex items-end justify-center gap-8">
                            <Silhouette
                                heightPx={maxH}
                                color={cm1 >= cm2 ? currentBlue : currentTeal}
                                label="Person 1"
                                heightLabel={fmtH(cm1)}
                            />
                            {/* Gap annotation */}
                            <div className="flex flex-col items-center justify-center gap-1 pb-6" style={{ height: maxH }}>
                                <div className="w-px flex-1 bg-muted opacity-30" />
                                <div className="bg-surface border border-border rounded-md px-2 py-1 whitespace-nowrap shadow-sm">
                                    <p className="m-0 text-[11px] font-black text-foreground">{diff} cm</p>
                                    <p className="m-0 text-[9.5px] text-muted text-center font-sans">{pct}%</p>
                                </div>
                                <div className="w-px flex-1 bg-muted opacity-30" />
                            </div>
                            <Silhouette
                                heightPx={minH}
                                color={cm2 < cm1 ? currentTeal : currentBlue}
                                label="Person 2"
                                heightLabel={fmtH(cm2)}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-bg border border-border rounded-xl p-8 text-center">
                    <p className="m-0 text-[13.5px] text-muted">Enter both heights above to see the comparison.</p>
                </div>
            )}
        </div>
    );
}