'use client';

import React, { useState } from "react";
import { useThemeStore } from "@/store"; // Adjust path if necessary

interface Zone {
    lo: number;
    hi: number;
    label: string;
    color: string;
    bg: string;
    text: string;
}

const ZONES: Zone[] = [
    { lo: 0, hi: 10, label: "Below 10th", color: "#ef4444", bg: "#fef2f2", text: "Significantly below average" },
    { lo: 10, hi: 25, label: "10th–25th", color: "#f97316", bg: "#fff7ed", text: "Below average" },
    { lo: 25, hi: 75, label: "25th–75th", color: "#16a34a", bg: "#f0fdf4", text: "Average range" },
    { lo: 75, hi: 90, label: "75th–90th", color: "#2563eb", bg: "#eff6ff", text: "Above average" },
    { lo: 90, hi: 100, label: "90th–100th", color: "#7c3aed", bg: "#faf5ff", text: "Very tall" },
];

interface CDCData {
    age: number;
    p5: number;
    p25: number;
    p50: number;
    p75: number;
    p95: number;
    [key: string]: number;
}

const CDC_BOYS: CDCData[] = [
    { age: 2, p5: 82.5, p25: 85.5, p50: 87.7, p75: 90.0, p95: 93.6 },
    { age: 3, p5: 89.0, p25: 92.5, p50: 95.2, p75: 97.8, p95: 102.0 },
    { age: 4, p5: 95.8, p25: 99.5, p50: 102.5, p75: 105.5, p95: 109.9 },
    { age: 5, p5: 102.0, p25: 105.9, p50: 109.2, p75: 112.5, p95: 117.3 },
    { age: 6, p5: 107.7, p25: 111.8, p50: 115.3, p75: 118.7, p95: 123.9 },
    { age: 7, p5: 113.0, p25: 117.3, p50: 121.1, p75: 124.8, p95: 130.4 },
    { age: 8, p5: 118.0, p25: 122.5, p50: 126.7, p75: 130.6, p95: 136.7 },
    { age: 9, p5: 122.9, p25: 127.7, p50: 132.2, p75: 136.5, p95: 143.0 },
    { age: 10, p5: 127.7, p25: 132.8, p50: 137.5, p75: 142.3, p95: 149.5 },
    { age: 11, p5: 132.6, p25: 138.1, p50: 143.5, p75: 149.0, p95: 156.9 },
    { age: 12, p5: 137.6, p25: 143.8, p50: 149.7, p75: 156.0, p95: 165.2 },
    { age: 13, p5: 143.0, p25: 150.0, p50: 156.5, p75: 163.5, p95: 173.7 },
    { age: 14, p5: 149.0, p25: 156.8, p50: 163.2, p75: 170.0, p95: 179.8 },
    { age: 15, p5: 155.0, p25: 162.6, p50: 169.0, p75: 175.7, p95: 184.4 },
    { age: 16, p5: 159.0, p25: 166.5, p50: 173.0, p75: 179.5, p95: 187.8 },
    { age: 17, p5: 161.5, p25: 168.8, p50: 175.4, p75: 181.7, p95: 190.0 },
    { age: 18, p5: 163.0, p25: 170.0, p50: 176.5, p75: 182.8, p95: 191.2 },
    { age: 20, p5: 163.5, p25: 170.5, p50: 177.0, p75: 183.2, p95: 191.8 },
];

const SAMPLE = { age: 10, height: 138, percentile: 55 };

function getZone(p: number): Zone {
    return ZONES.find(z => p >= z.lo && p < z.hi) || ZONES[4];
}

// ── Percentile Scale Bar ─────────────────────────────────────────────────
function PercentileBar({ percentile }: { percentile: number }) {
    const zone = getZone(percentile);
    const [hoveredZone, setHoveredZone] = useState<number | null>(null);
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    return (
        <div style={{ fontFamily: "Georgia, serif" }} className="w-full">
            <p style={{ margin: "0 0 12px", fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Percentile Scale — Where {percentile} sits
            </p>

            <div style={{ display: "flex", marginBottom: 6 }}>
                {ZONES.map((z, i) => {
                    const width = z.hi - z.lo;
                    const isActive = percentile >= z.lo && percentile < z.hi;
                    const isHov = hoveredZone === i;
                    return (
                        <div key={i} style={{ flex: width, textAlign: "center", position: "relative" }}
                            onMouseEnter={() => setHoveredZone(i)}
                            onMouseLeave={() => setHoveredZone(null)}
                        >
                            <span style={{
                                fontSize: "clamp(7.5px, 2.2vw, 9.5px)",
                                fontWeight: isActive ? 800 : 500,
                                color: isActive || isHov ? z.color : (isDark ? "#475569" : "#94a3b8"),
                                transition: "color 0.2s",
                                display: "block",
                                lineHeight: 1.1,
                                whiteSpace: "normal",
                                wordBreak: "break-word"
                            }}
                                className="px-0.5"
                            >
                                {z.label.replace('–', '–\u200B')}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div style={{ position: "relative", height: 36 }}>
                <div style={{
                    display: "flex", height: 18, borderRadius: 99, overflow: "hidden",
                    boxShadow: isDark ? "inset 0 1px 4px rgba(0,0,0,0.5)" : "inset 0 1px 4px rgba(0,0,0,0.1)"
                }}>
                    {ZONES.map((z, i) => {
                        const width = z.hi - z.lo;
                        const isHov = hoveredZone === i;
                        const isActive = percentile >= z.lo && percentile < z.hi;
                        return (
                            <div key={i} style={{
                                flex: width, background: z.color,
                                opacity: hoveredZone === null ? (isActive ? 1 : 0.25) : (isHov ? 1 : 0.18),
                                transition: "opacity 0.25s", cursor: "pointer"
                            }}
                                onMouseEnter={() => setHoveredZone(i)}
                                onMouseLeave={() => setHoveredZone(null)}
                            />
                        );
                    })}
                </div>

                <div style={{
                    position: "absolute",
                    left: `${percentile}%`,
                    top: 0,
                    transform: "translateX(-50%)"
                }}>
                    <div style={{
                        width: 18, height: 18,
                        background: zone.color,
                        border: `3px solid ${isDark ? '#1e293b' : 'white'}`,
                        borderRadius: 3,
                        transform: "rotate(45deg)",
                        boxShadow: `0 2px 8px ${zone.color}80`,
                        position: "relative", zIndex: 2
                    }} />
                </div>

                {[10, 25, 50, 75, 90].map(t => (
                    <div key={t} style={{
                        position: "absolute", left: `${t}%`, top: 0,
                        transform: "translateX(-50%)",
                        width: 2, height: 22, background: isDark ? "#475569" : "white", opacity: 0.6,
                        pointerEvents: "none"
                    }} />
                ))}
            </div>

            <div style={{ position: "relative", height: 20, marginTop: 4 }}>
                {[0, 10, 25, 50, 75, 90, 100].map(t => (
                    <div key={t} style={{
                        position: "absolute", left: `${t}%`,
                        transform: "translateX(-50%)",
                        fontSize: 9.5, color: isDark ? "#64748b" : "#94a3b8", fontFamily: "Georgia, serif"
                    }}>
                        {t}
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: 14, padding: "12px 16px", borderRadius: 10,
                background: isDark ? `${zone.color}15` : zone.bg, border: `1.5px solid ${zone.color}40`,
                display: "flex", alignItems: "center", gap: 14
            }}
                className="flex-col sm:flex-row text-center sm:text-left"
            >
                <div style={{
                    minWidth: 48, height: 48, borderRadius: 10,
                    background: zone.color, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <span style={{ display: "inline-flex", alignItems: "baseline", whiteSpace: "nowrap" }}>
                        <span style={{ color: "white", fontSize: 17, fontWeight: 900, lineHeight: 1 }}>
                            {percentile}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 9 }}>
                            th
                        </span>
                    </span>
                </div>
                <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: zone.color }}>
                        Average Range (25th–75th)
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: isDark ? "#cbd5e1" : "#475569", lineHeight: 1.5 }}>
                        This child is taller than <strong style={{ color: zone.color }}>55 out of 100</strong> boys aged 10.
                        Sits comfortably within the normal growth band.
                    </p>
                </div>
            </div>
        </div>
    );
}

// ── CDC Growth Chart (With Scrolling Wrapper) ─────────────────────────────
function CDCChart({ sample }: { sample: { age: number, height: number, percentile: number } }) {
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    const W = 480, H = 260;
    const padL = 52, padR = 24, padT = 24, padB = 44;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    const minAge = 2, maxAge = 20;
    const minH = 75, maxH = 200;

    const toX = (age: number) => padL + ((age - minAge) / (maxAge - minAge)) * plotW;
    const toY = (h: number) => padT + plotH - ((h - minH) / (maxH - minH)) * plotH;

    const percentileLines = [
        { key: "p5", label: "5th", color: "#fca5a5", dash: "4,3" },
        { key: "p25", label: "25th", color: "#fcd34d", dash: "4,3" },
        { key: "p50", label: "50th", color: "#86efac", dash: "none" },
        { key: "p75", label: "75th", color: "#93c5fd", dash: "4,3" },
        { key: "p95", label: "95th", color: "#c4b5fd", dash: "4,3" },
    ];

    const makePath = (key: string) =>
        CDC_BOYS.map((d, i) =>
            `${i === 0 ? "M" : "L"}${toX(d.age).toFixed(1)},${toY(d[key]).toFixed(1)}`
        ).join(" ");

    const sampleX = toX(sample.age);
    const sampleY = toY(sample.height);

    const ageGrids = [4, 6, 8, 10, 12, 14, 16, 18, 20];
    const hGrids = [80, 100, 120, 140, 160, 180, 200];

    return (
        <div style={{ fontFamily: "Georgia, serif" }} className="w-full">
            <p style={{ margin: "0 0 10px", fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                CDC Growth Chart — Boys (ages 2–20)
            </p>

            <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
                <div style={{ minWidth: '500px' }}>
                    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
                        <defs>
                            <filter id="dotglow">
                                <feGaussianBlur stdDeviation="3.5" result="blur" />
                                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                            <clipPath id="chartClip">
                                <rect x={padL} y={padT} width={plotW} height={plotH} />
                            </clipPath>
                        </defs>

                        {ageGrids.map(age => (
                            <line key={age} x1={toX(age)} y1={padT} x2={toX(age)} y2={padT + plotH} stroke={isDark ? "#334155" : "#f1f5f9"} strokeWidth="1" />
                        ))}
                        {hGrids.map(h => (
                            <line key={h} x1={padL} y1={toY(h)} x2={padL + plotW} y2={toY(h)} stroke={isDark ? "#334155" : "#f1f5f9"} strokeWidth="1" />
                        ))}

                        <g clipPath="url(#chartClip)">
                            {percentileLines.map(pl => (
                                <path key={pl.key} d={makePath(pl.key)} fill="none" stroke={pl.color} strokeWidth={pl.key === "p50" ? 2.2 : 1.5} strokeDasharray={pl.dash === "none" ? undefined : pl.dash} opacity={0.85} />
                            ))}
                            <path d={makePath("p75") + " " + CDC_BOYS.slice().reverse().map((d, i) => `L${toX(d.age).toFixed(1)},${toY(d.p25).toFixed(1)}`).join(" ") + " Z"} fill="#86efac" opacity={isDark ? "0.08" : "0.12"} />

                            <line x1={sampleX} y1={padT} x2={sampleX} y2={padT + plotH} stroke="#7c3aed" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.5" />
                            <line x1={padL} y1={sampleY} x2={padL + plotW} y2={sampleY} stroke="#7c3aed" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.5" />

                            <circle cx={sampleX} cy={sampleY} r="8" fill="#7c3aed" stroke={isDark ? "#1e293b" : "white"} strokeWidth="2.5" filter="url(#dotglow)" />
                            <text x={sampleX} y={sampleY} textAnchor="middle" fontSize="8" fontWeight="900" fill="white" fontFamily="Georgia, serif">55</text>
                        </g>

                        <rect x={sampleX + 10} y={sampleY - 32} width={108} height={34} rx={5} fill="#7c3aed" opacity="0.95" />
                        <polygon points={`${sampleX + 10},${sampleY - 15} ${sampleX + 3},${sampleY} ${sampleX + 10},${sampleY - 4}`} fill="#7c3aed" opacity="0.95" />
                        <text x={sampleX + 64} y={sampleY - 19} textAnchor="middle" fontSize="9.5" fontWeight="800" fill="white" fontFamily="Georgia, serif">Age 10 · 138 cm</text>
                        <text x={sampleX + 64} y={sampleY - 8} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.85)" fontFamily="Georgia, serif">55th percentile</text>

                        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke={isDark ? "#475569" : "#cbd5e1"} strokeWidth="1.5" />
                        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke={isDark ? "#475569" : "#cbd5e1"} strokeWidth="1.5" />

                        {hGrids.map(h => (<text key={h} x={padL - 7} y={toY(h) + 4} textAnchor="end" fontSize="9" fill={isDark ? "#94a3b8" : "#94a3b8"} fontFamily="Georgia, serif">{h}</text>))}
                        {ageGrids.map(age => (<text key={age} x={toX(age)} y={padT + plotH + 16} textAnchor="middle" fontSize="9" fill={isDark ? "#94a3b8" : "#94a3b8"} fontFamily="Georgia, serif">{age}</text>))}

                        <text x={14} y={padT + plotH / 2} textAnchor="middle" fontSize="9" fill={isDark ? "#94a3b8" : "#94a3b8"} fontFamily="Georgia, serif" transform={`rotate(-90, 14, ${padT + plotH / 2})`}>Height (cm)</text>
                        <text x={padL + plotW / 2} y={H - 4} textAnchor="middle" fontSize="9" fill={isDark ? "#94a3b8" : "#94a3b8"} fontFamily="Georgia, serif">Age (years)</text>

                        {percentileLines.map(pl => {
                            const last = CDC_BOYS[CDC_BOYS.length - 1];
                            return (<text key={pl.key} x={toX(last.age) + 4} y={toY(last[pl.key]) + 3.5} fontSize="8.5" fill={pl.color} fontFamily="Georgia, serif" fontWeight="700">{pl.label}</text>);
                        })}
                    </svg>
                </div>
            </div>
        </div>
    );
}

// ── Main Visual ───────────────────────────────────────────────────────────
export default function ExampleCalculationVisual() {
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    return (
        <div className={`w-full max-w-[720px] mx-auto rounded-2xl overflow-hidden shadow-2xl transition-colors duration-500 ${isDark ? 'bg-bg border border-border' : 'bg-white border border-[#e2e8f0]'}`} style={{ fontFamily: "Georgia, serif" }}>

            <div className={`px-6 py-4 flex items-center gap-3.5 ${isDark ? 'bg-surface border-b border-border' : 'bg-[#0f172a]'}`}>
                <div style={{ background: "#7c3aed", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📍</div>
                <div>
                    <p style={{ margin: 0, fontSize: 11, color: isDark ? "#94a3b8" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>Visual Result · Example Calculation</p>
                    <p style={{ margin: "2px 0 0", fontSize: 15, fontWeight: 800, color: isDark ? "var(--foreground)" : "white" }}>Age 10, Male, 138 cm → 55th Percentile</p>
                </div>
            </div>

            <div className="p-4 sm:p-6">
                <div className={`rounded-xl p-4 sm:p-5 mb-5 transition-colors ${isDark ? 'bg-surface border border-border' : 'bg-[#f8fafc] border border-[#e2e8f0]'}`}>
                    <PercentileBar percentile={55} />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{ flex: 1, height: 1, background: isDark ? "var(--border)" : "#e2e8f0" }} />
                    <span style={{ fontSize: 11, color: isDark ? "#64748b" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center" }}>Position on CDC growth chart</span>
                    <div style={{ flex: 1, height: 1, background: isDark ? "var(--border)" : "#e2e8f0" }} />
                </div>

                <div className={`rounded-xl p-4 sm:p-5 transition-colors ${isDark ? 'bg-surface border border-border' : 'bg-[#f8fafc] border border-[#e2e8f0]'}`}>
                    <CDCChart sample={SAMPLE} />

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
                        {[
                            { color: "#fca5a5", label: "5th" },
                            { color: "#fcd34d", label: "25th" },
                            { color: "#86efac", label: "50th (median)" },
                            { color: "#93c5fd", label: "75th" },
                            { color: "#c4b5fd", label: "95th" },
                            { color: "#7c3aed", label: "Sample: 138 cm, age 10" },
                        ].map(item => (
                            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                <div style={{
                                    width: item.label.startsWith("Sample") ? 10 : 22,
                                    height: item.label.startsWith("Sample") ? 10 : 4,
                                    borderRadius: item.label.startsWith("Sample") ? "50%" : 2,
                                    background: item.color
                                }} />
                                <span style={{ fontSize: 10, color: isDark ? "#94a3b8" : "#64748b" }}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`px-6 py-4 transition-colors ${isDark ? 'border-t border-border bg-bg' : 'border-t border-[#f1f5f9] bg-white'}`}>
                <p style={{ margin: 0, fontSize: 11, color: isDark ? "#64748b" : "#94a3b8", lineHeight: 1.6 }}>
                    Based on CDC clinical growth charts (2000). The shaded green band represents the average range
                    (25th–75th percentile). A dot within this band indicates consistent, healthy growth.
                </p>
            </div>
        </div>
    );
}