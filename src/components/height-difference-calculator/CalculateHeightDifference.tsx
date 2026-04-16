'use client';

import React, { useState } from "react";
import { useUnitStore, useThemeStore } from "@/store";
import { NumericInput } from "@/components/ui/NumericInput";

// ── Palette (Light Mode Base) ────────────────────────────────────────────────
const BLUE = "#1A56DB", TEAL = "#0694A2", PINK = "#DB2777", GREEN = "#057A55";

// ── Helpers ───────────────────────────────────────────────────────────────────
function cmToFtIn(cm: number) {
    const totalIn = cm / 2.54;
    const ft = Math.floor(totalIn / 12);
    const inches = (totalIn % 12);
    // Show one decimal if it's not a whole number
    const inDisplay = inches % 1 === 0 ? inches.toFixed(0) : inches.toFixed(1);
    return `${ft}'${inDisplay}"`;
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

function HeightInput({ 
    label, 
    cmValue, 
    ftValue, 
    inValue, 
    onCmChange, 
    onFtChange, 
    onInChange, 
    isMetric, 
    isDark 
}: { 
    label: string, 
    cmValue: number | '', 
    ftValue: number | '', 
    inValue: number | '', 
    onCmChange: (v: number | '') => void, 
    onFtChange: (v: number | '') => void, 
    onInChange: (v: number | '') => void, 
    isMetric: boolean, 
    isDark: boolean 
}) {
    const inputBaseClass = `w-full p-3 rounded-xl border-2 border-border bg-bg text-foreground text-base font-bold outline-none transition-all ${isDark ? 'focus:border-blue-400' : 'focus:border-blue-600'}`;
    
    return (
        <div className="flex-1 min-w-[280px]">
            <label className="m-0 mb-3 text-[11px] font-bold text-muted uppercase tracking-[0.09em] block">{label}</label>
            <div className="flex gap-3">
                {isMetric ? (
                    <div className="flex-1 relative">
                        <NumericInput
                            id={`${label}-cm`}
                            value={cmValue}
                            onValueChange={onCmChange}
                            placeholder="Centimetres"
                            className={inputBaseClass}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted uppercase">cm</span>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 relative">
                            <NumericInput
                                id={`${label}-ft`}
                                value={ftValue}
                                onValueChange={onFtChange}
                                placeholder="Feet"
                                className={inputBaseClass}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted uppercase">ft</span>
                        </div>
                        <div className="flex-1 relative">
                            <NumericInput
                                id={`${label}-in`}
                                value={inValue}
                                onValueChange={onInChange}
                                placeholder="Inches"
                                className={inputBaseClass}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted uppercase">in</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function CalculateHeightDifference() {
    const { unitSystem, setUnitSystem } = useUnitStore();
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';
    const isMetric = unitSystem === 'metric';

    const currentBlue = isDark ? "#60A5FA" : BLUE;
    const currentGreen = isDark ? "#34D399" : GREEN;
    const currentPink = isDark ? "#F472B6" : PINK;
    const currentTeal = isDark ? "#2DD4BF" : TEAL;

    // Separate states for Person 1
    const [h1Cm, setH1Cm] = useState<number | ''>(180);
    const [h1Ft, setH1Ft] = useState<number | ''>(5);
    const [h1In, setH1In] = useState<number | ''>(11);
    const [h2Cm, setH2Cm] = useState<number | ''>(165);
    const [h2Ft, setH2Ft] = useState<number | ''>(5);
    const [h2In, setH2In] = useState<number | ''>(5);

    const getCmValue = (isP1: boolean) => {
        if (isMetric) {
            return Number(isP1 ? h1Cm : h2Cm) || 0;
        } else {
            const ft = Number(isP1 ? h1Ft : h2Ft) || 0;
            const inch = Number(isP1 ? h1In : h2In) || 0;
            return (ft * 12 + inch) * 2.54;
        }
    };

    const cm1 = getCmValue(true);
    const cm2 = getCmValue(false);
    
    const valid = cm1 > 0 && cm2 > 0;
    const diffCm = valid ? Math.abs(cm1 - cm2) : 0;
    const taller = valid ? Math.max(cm1, cm2) : 0;
    const shorter = valid ? Math.min(cm1, cm2) : 0;
    const pct = taller > 0 ? ((diffCm / taller) * 100).toFixed(1) : "0";
    const tallerIs = cm1 >= cm2 ? "Person 1" : "Person 2";

    const maxH = 120;
    const minH = valid && taller > 0 ? Math.round((shorter / taller) * maxH) : maxH;

    const fmtH = (cm: number) => isMetric ? `${Math.round(cm)} cm` : cmToFtIn(cm);

    return (
        <div style={{ fontFamily: "Georgia, serif" }} className="w-full">
            {/* Unit toggle */}
            <div className="flex flex-wrap gap-2 mb-8">
                <button
                    onClick={() => setUnitSystem('metric')}
                    className={`px-6 py-2.5 rounded-full text-xs font-black cursor-pointer transition-all shadow-sm border-2 btn-glow ${isMetric ? 'bg-accent text-white border-accent shadow-md' : 'bg-surface text-muted border-border hover:text-foreground'}`}
                >
                    Metric (cm)
                </button>
                <button
                    onClick={() => setUnitSystem('imperial')}
                    className={`px-6 py-2.5 rounded-full text-xs font-black cursor-pointer transition-all shadow-sm border-2 btn-glow ${!isMetric ? 'bg-accent text-white border-accent shadow-md' : 'bg-surface text-muted border-border hover:text-foreground'}`}
                >
                    Imperial (ft/in)
                </button>
            </div>

            {/* Inputs */}
            <div className="flex flex-wrap gap-6 mb-8">
                <HeightInput 
                    label="Person 1" 
                    cmValue={h1Cm} 
                    ftValue={h1Ft} 
                    inValue={h1In}
                    onCmChange={setH1Cm}
                    onFtChange={setH1Ft}
                    onInChange={setH1In}
                    isMetric={isMetric} 
                    isDark={isDark} 
                />
                <HeightInput 
                    label="Person 2" 
                    cmValue={h2Cm} 
                    ftValue={h2Ft} 
                    inValue={h2In}
                    onCmChange={setH2Cm}
                    onFtChange={setH2Ft}
                    onInChange={setH2In}
                    isMetric={isMetric} 
                    isDark={isDark} 
                />
            </div>

            {valid && diffCm >= 0 ? (
                <>
                    {/* Result cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className={`rounded-2xl p-5 text-center border transition-all hover:shadow-lg ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-[#EBF5FF] border-transparent'}`}>
                            <p style={{ color: currentBlue }} className="m-0 mb-2 text-[10px] font-bold uppercase tracking-[0.12em]">Height Difference</p>
                            <p style={{ color: currentBlue }} className="m-0 text-3xl font-black">{Math.round(diffCm)} cm</p>
                            <p className="m-0 mt-2 text-[12px] text-muted font-sans font-bold opacity-80">{cmToFtIn(diffCm)}</p>
                        </div>
                        <div className={`rounded-2xl p-5 text-center border transition-all hover:shadow-lg ${isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-[#F0FDF4] border-transparent'}`}>
                            <p style={{ color: currentGreen }} className="m-0 mb-2 text-[10px] font-bold uppercase tracking-[0.12em]">% Difference</p>
                            <p style={{ color: currentGreen }} className="m-0 text-3xl font-black">{pct}%</p>
                            <p className="m-0 mt-2 text-[12px] text-muted font-sans font-bold opacity-80">{tallerIs} is taller</p>
                        </div>
                        <div className={`rounded-2xl p-5 text-center border transition-all hover:shadow-lg ${isDark ? 'bg-pink-500/10 border-pink-500/20' : 'bg-[#FDF4FF] border-transparent'}`}>
                            <p style={{ color: currentPink }} className="m-0 mb-2 text-[10px] font-bold uppercase tracking-[0.12em]">Taller Person</p>
                            <p style={{ color: currentPink }} className="m-0 text-3xl font-black">{fmtH(taller)}</p>
                            <p className="m-0 mt-2 text-[12px] text-muted font-sans font-bold opacity-80">{tallerIs}</p>
                        </div>
                    </div>

                    {/* Silhouette visual */}
                    <div className="bg-surface border border-border rounded-2xl p-8 text-center shadow-md">
                        <p className="m-0 mb-8 text-[11px] text-muted font-bold uppercase tracking-[0.15em]">Visual Comparison</p>
                        <div className="flex items-end justify-center gap-12 sm:gap-20">
                            <Silhouette
                                heightPx={maxH}
                                color={cm1 >= cm2 ? currentBlue : currentTeal}
                                label="Person 1"
                                heightLabel={fmtH(cm1)}
                            />
                            {/* Gap annotation */}
                            <div className="flex flex-col items-center justify-center gap-1.5 pb-8" style={{ height: maxH }}>
                                <div className="w-px flex-1 bg-border/40" />
                                <div className="bg-bg border-2 border-border/50 rounded-xl px-3 py-2 whitespace-nowrap shadow-xl backdrop-blur-md">
                                    <p className="m-0 text-[13px] font-black text-foreground">{Math.round(diffCm)} cm</p>
                                    <p className="m-0 text-[10px] text-muted text-center font-sans font-bold">{pct}%</p>
                                </div>
                                <div className="w-px flex-1 bg-border/40" />
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
                <div className="bg-bg border border-border rounded-2xl p-10 text-center">
                    <p className="m-0 text-[15px] font-medium text-muted">Enter both heights above to see the comparison.</p>
                </div>
            )}
        </div>
    );
}