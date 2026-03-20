'use client';

import React, { useState } from "react";
import { useThemeStore } from "@/store"; // Adjust path as needed

const WHO_BOYS = [
    { age: 0, p5: 46.3, p25: 48.6, p50: 49.9, p75: 51.2, p95: 53.4 },
    { age: 0.25, p5: 57.4, p25: 59.8, p50: 61.4, p75: 62.8, p95: 65.5 },
    { age: 0.5, p5: 63.3, p25: 65.7, p50: 67.6, p75: 69.3, p95: 72.0 },
    { age: 0.75, p5: 67.7, p25: 70.1, p50: 72.1, p75: 74.0, p95: 76.9 },
    { age: 1, p5: 71.0, p25: 73.5, p50: 75.7, p75: 77.8, p95: 80.9 },
    { age: 1.25, p5: 73.9, p25: 76.4, p50: 78.7, p75: 81.0, p95: 84.3 },
    { age: 1.5, p5: 76.9, p25: 79.3, p50: 81.7, p75: 84.1, p95: 87.5 },
    { age: 1.75, p5: 79.5, p25: 82.0, p50: 84.4, p75: 86.9, p95: 90.4 },
    { age: 2, p5: 82.5, p25: 85.0, p50: 87.1, p75: 89.5, p95: 93.0 },
];

const CDC_BOYS = [
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

const WHO_COLOR = "#0891b2"; // cyan-600
const CDC_COLOR = "#1B4F8A"; // deep blue
const BAND_WHO = "#cffafe";
const BAND_CDC = "#dbeafe";

interface SmallChartProps {
    title: string;
    subtitle: string;
    data: any[];
    color: string;
    bandColor: string;
    minAge: number;
    maxAge: number;
    minH: number;
    maxH: number;
    logoColor?: string;
    badge: string;
}

function SmallChart({ title, subtitle, data, color, bandColor, minAge, maxAge, minH, maxH, logoColor, badge }: SmallChartProps) {
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    const W = 300, H = 200;
    const pL = 38, pR = 18, pT = 18, pB = 38;
    const plotW = W - pL - pR;
    const plotH = H - pT - pB;

    const toX = (age: number) => pL + ((age - minAge) / (maxAge - minAge)) * plotW;
    const toY = (h: number) => pT + plotH - ((h - minH) / (maxH - minH)) * plotH;

    const path = (key: string) =>
        data.map((d, i) =>
            `${i === 0 ? "M" : "L"}${toX(d.age).toFixed(1)},${toY(d[key]).toFixed(1)}`
        ).join(" ");

    const bandPath =
        data.map((d, i) => `${i === 0 ? "M" : "L"}${toX(d.age).toFixed(1)},${toY(d.p75).toFixed(1)}`).join(" ") +
        " " +
        data.slice().reverse().map((d, i) => `${i === 0 ? "L" : "L"}${toX(d.age).toFixed(1)},${toY(d.p25).toFixed(1)}`).join(" ") +
        " Z";

    const hTicks = maxH <= 95
        ? [50, 60, 70, 80, 90]
        : [80, 100, 120, 140, 160, 180, 200];
    const ageTicks = maxH <= 95
        ? [0, 0.5, 1, 1.5, 2]
        : [2, 5, 8, 11, 14, 17, 20];

    return (
        <div style={{ fontFamily: "Georgia, serif" }}>
            {/* Card header */}
            <div style={{
                background: color, borderRadius: "12px 12px 0 0",
                padding: "10px 14px", display: "flex", alignItems: "center", gap: 10
            }}>
                <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: "rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14
                }}>
                    {badge}
                </div>
                <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "white" }}>{title}</p>
                    <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.75)" }}>{subtitle}</p>
                </div>
            </div>

            {/* Chart */}
            <div style={{ background: isDark ? "#101011" : "#f8fafc", border: `1px solid ${color}30`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: "10px 6px 6px" }}>
                <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
                    {/* Grid */}
                    {hTicks.map(h => (
                        <line key={h} x1={pL} y1={toY(h)} x2={pL + plotW} y2={toY(h)}
                            stroke={isDark ? "#334155" : "#e2e8f0"} strokeWidth="0.8" />
                    ))}
                    {ageTicks.map(a => (
                        <line key={a} x1={toX(a)} y1={pT} x2={toX(a)} y2={pT + plotH}
                            stroke={isDark ? "#334155" : "#e2e8f0"} strokeWidth="0.8" />
                    ))}

                    {/* P25–P75 shaded band */}
                    <path d={bandPath} fill={bandColor} opacity={isDark ? "0.15" : "0.5"} />

                    {/* Curves */}
                    {["p95", "p75", "p50", "p25", "p5"].map((k, i) => (
                        <path key={k} d={path(k)} fill="none"
                            stroke={color}
                            strokeWidth={k === "p50" ? 2 : 1}
                            strokeDasharray={k === "p50" ? "none" : k === "p95" || k === "p5" ? "3,2" : "none"}
                            opacity={k === "p50" ? 1 : k === "p95" || k === "p5" ? 0.4 : 0.65}
                        />
                    ))}

                    {/* Axes */}
                    <line x1={pL} y1={pT} x2={pL} y2={pT + plotH} stroke={isDark ? "#475569" : "#cbd5e1"} strokeWidth="1.2" />
                    <line x1={pL} y1={pT + plotH} x2={pL + plotW} y2={pT + plotH} stroke={isDark ? "#475569" : "#cbd5e1"} strokeWidth="1.2" />

                    {/* Y labels */}
                    {hTicks.map(h => (
                        <text key={h} x={pL - 4} y={toY(h) + 3.5}
                            textAnchor="end" fontSize="8" fill={isDark ? "#64748b" : "#94a3b8"} fontFamily="Georgia, serif">{h}</text>
                    ))}
                    {/* X labels */}
                    {ageTicks.map(a => (
                        <text key={a} x={toX(a)} y={pT + plotH + 14}
                            textAnchor="middle" fontSize="8" fill={isDark ? "#64748b" : "#94a3b8"} fontFamily="Georgia, serif">
                            {maxH <= 95 ? (a === 0 ? "Birth" : `${a}y`) : `${a}`}
                        </text>
                    ))}

                    {/* Axis titles */}
                    <text x={10} y={pT + plotH / 2} textAnchor="middle" fontSize="7.5" fill={isDark ? "#64748b" : "#94a3b8"}
                        fontFamily="Georgia, serif" transform={`rotate(-90,10,${pT + plotH / 2})`}>
                        {maxH <= 95 ? "Length (cm)" : "Height (cm)"}
                    </text>
                    <text x={pL + plotW / 2} y={H - 2} textAnchor="middle" fontSize="7.5" fill={isDark ? "#64748b" : "#94a3b8"}
                        fontFamily="Georgia, serif">Age (years)</text>

                    {/* P labels on right */}
                    {["p95", "p75", "p50", "p25", "p5"].map(k => {
                        const last = data[data.length - 1];
                        return (
                            <text key={k} x={toX(last.age) + 2} y={toY(last[k]) + 3}
                                fontSize="7" fill={color} fontFamily="Georgia, serif"
                                opacity={k === "p50" ? 1 : 0.7} fontWeight={k === "p50" ? 700 : 400}>
                                {k.replace("p", "")}
                            </text>
                        );
                    })}
                </svg>

                {/* Mini legend */}
                <div style={{ display: "flex", gap: 10, paddingLeft: 8, paddingBottom: 4, flexWrap: "wrap" }}>
                    {[
                        { style: "solid", label: "50th (median)" },
                        { style: "dashed", label: "25th / 75th" },
                        { style: "dotted", label: "5th / 95th" },
                    ].map(l => (
                        <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <svg width="18" height="8">
                                <line x1="0" y1="4" x2="18" y2="4"
                                    stroke={color} strokeWidth={l.style === "solid" ? 2 : 1.2}
                                    strokeDasharray={l.style === "dashed" ? "3,2" : l.style === "dotted" ? "2,2" : "none"}
                                    opacity={l.style === "solid" ? 1 : 0.6}
                                />
                            </svg>
                            <span style={{ fontSize: 8.5, color: isDark ? "#94a3b8" : "#64748b", fontFamily: "Georgia, serif" }}>{l.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function WHOvsCDCVisual() {
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    const TIMELINE = [
        { lo: 0, hi: 2, source: "WHO", color: WHO_COLOR, bg: "#ecfeff", darkBg: "#083344", label: "WHO Child Growth Standards", note: "Birth to 24 months · Length measured lying down" },
        { lo: 2, hi: 20, source: "CDC", color: CDC_COLOR, bg: "#eff6ff", darkBg: "#172554", label: "CDC Growth Charts", note: "Ages 2–20 · Standing height · US population data" },
    ];

    return (
        <div className={`w-full max-w-[720px] mx-auto rounded-2xl overflow-hidden shadow-2xl transition-colors duration-500 ${isDark ? 'bg-surface border border-border' : 'bg-white border border-[#e2e8f0]'}`} style={{ fontFamily: "Georgia, serif" }}>
            {/* Header */}
            <div style={{ background: isDark ? "#101011" : "#0f172a", padding: "16px 24px", borderBottom: isDark ? '1px solid var(--border)' : 'none' }}>
                <p style={{ margin: 0, fontSize: 11, color: isDark ? "#64748b" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Reference Data Guide
                </p>
                <h3 style={{ margin: "3px 0 0", fontSize: 17, fontWeight: 800, color: "white" }}>
                    Which growth chart does this calculator use?
                </h3>
            </div>

            {/* Age timeline switcher */}
            <div style={{ padding: "20px 24px 0" }}>
                <p style={{ margin: "0 0 10px", fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Age range → data source
                </p>

                {/* Visual timeline */}
                <div style={{ position: "relative", marginBottom: 24 }}>
                    {/* Track */}
                    <div style={{
                        height: 10, borderRadius: 99,
                        background: isDark ? "linear-gradient(to right, #164e63 0%, #164e63 9.1%, #1e3a8a 9.1%, #1e3a8a 100%)" : "linear-gradient(to right, #cffafe 0%, #cffafe 9.1%, #dbeafe 9.1%, #dbeafe 100%)",
                        border: isDark ? "1px solid var(--border)" : "1px solid #e2e8f0"
                    }} />

                    {/* Transition marker at age 2 */}
                    <div style={{
                        position: "absolute", top: -4, left: "9.1%",
                        transform: "translateX(-50%)"
                    }}>
                        <div style={{
                            width: 18, height: 18, borderRadius: "50%",
                            background: isDark ? "#1e293b" : "white", border: `3px solid ${isDark ? '#cbd5e1' : '#64748b'}`,
                            boxShadow: "0 1px 6px rgba(0,0,0,0.15)"
                        }} />
                        <div style={{
                            position: "absolute", top: 22, left: "50%",
                            transform: "translateX(-50%)",
                            background: isDark ? "white" : "#0f172a", color: isDark ? "black" : "white",
                            padding: "2px 7px", borderRadius: 4,
                            fontSize: 9, fontWeight: 700, whiteSpace: "nowrap"
                        }}>
                            Age 2 · Switch point
                        </div>
                    </div>

                    {/* WHO label */}
                    <div style={{ position: "absolute", top: 16, left: "3%", fontSize: 10, fontWeight: 700, color: WHO_COLOR }}>
                        WHO
                    </div>
                    {/* CDC label */}
                    <div style={{ position: "absolute", top: 16, left: "52%", fontSize: 10, fontWeight: 700, color: CDC_COLOR }}>
                        CDC
                    </div>

                    {/* Age end labels */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 20 }}>
                        <span style={{ fontSize: 9.5, color: isDark ? "#64748b" : "#94a3b8" }}>Birth</span>
                        <span style={{ fontSize: 9.5, color: isDark ? "#64748b" : "#94a3b8" }}>5 yrs</span>
                        <span style={{ fontSize: 9.5, color: "#94a3b8" }}>10 yrs</span>
                        <span style={{ fontSize: 9.5, color: isDark ? "#64748b" : "#94a3b8" }}>15 yrs</span>
                        <span style={{ fontSize: 9.5, color: isDark ? "#64748b" : "#94a3b8" }}>20 yrs</span>
                    </div>
                </div>

                {/* Two info cards (Responsive Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-5">
                    {TIMELINE.map(t => (
                        <div key={t.source} style={{
                            border: `2px solid ${t.color}40`,
                            background: isDark ? t.darkBg : t.bg,
                            borderRadius: 12, padding: "14px 16px"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                <div style={{
                                    background: t.color, borderRadius: 6,
                                    padding: "2px 9px",
                                    fontSize: 11, fontWeight: 900, color: "white"
                                }}>
                                    {t.source}
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: isDark ? "white" : "#0f172a" }}>
                                    Ages {t.lo}–{t.hi}
                                </span>
                            </div>
                            <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, color: isDark ? "white" : t.color }}>
                                {t.label}
                            </p>
                            <p style={{ margin: 0, fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", lineHeight: 1.5 }}>
                                {t.note}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 24px 16px" }}>
                <div style={{ flex: 1, height: 1, background: isDark ? "var(--border)" : "#e2e8f0" }} />
                <span style={{ fontSize: 11, color: isDark ? "#64748b" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Growth curves side by side
                </span>
                <div style={{ flex: 1, height: 1, background: isDark ? "var(--border)" : "#e2e8f0" }} />
            </div>

            {/* Side-by-side charts (Responsive Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-6 pb-6">
                <SmallChart
                    title="WHO Standards"
                    subtitle="Birth to 24 months (boys)"
                    data={WHO_BOYS}
                    color={WHO_COLOR}
                    bandColor={BAND_WHO}
                    minAge={0} maxAge={2}
                    minH={40} maxH={95}
                    badge="🌍"
                />
                <SmallChart
                    title="CDC Growth Charts"
                    subtitle="Ages 2–20 (boys)"
                    data={CDC_BOYS}
                    color={CDC_COLOR}
                    bandColor={BAND_CDC}
                    minAge={2} maxAge={20}
                    minH={75} maxH={200}
                    badge="🇺🇸"
                />
            </div>

            {/* Bottom note */}
            <div style={{
                borderTop: `1px solid ${isDark ? 'var(--border)' : '#f1f5f9'}`,
                padding: "12px 24px 16px",
                background: isDark ? "#101011" : "#f8fafc"
            }}>
                <p style={{ margin: 0, fontSize: 11, color: isDark ? "#94a3b8" : "#94a3b8", lineHeight: 1.7 }}>
                    <strong style={{ color: isDark ? "white" : "#475569" }}>Why two sources?</strong> WHO standards were built from children raised in optimal conditions across six countries, making them an international reference for early growth. CDC charts are based on US population data and are standard in American clinical practice for children aged 2 and above. This calculator switches automatically between them based on the age entered.
                </p>
            </div>
        </div>
    );
}