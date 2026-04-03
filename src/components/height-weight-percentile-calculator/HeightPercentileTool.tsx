'use client';

import React, { useState } from "react";
import { useThemeStore, useUnitStore } from "@/store"; // Integrated Unit Store

// ── Population reference data (mean cm, SD cm) by gender/age ──────────────
const POPULATION_DATA: Record<string, Record<number, { mean: number, sd: number }>> = {
    Male: {
        0: { mean: 50.0, sd: 2.1 }, 1: { mean: 75.7, sd: 2.6 }, 2: { mean: 87.8, sd: 3.2 },
        3: { mean: 96.1, sd: 3.8 }, 4: { mean: 103.3, sd: 4.0 }, 5: { mean: 110.0, sd: 4.4 },
        6: { mean: 116.0, sd: 4.7 }, 7: { mean: 121.7, sd: 5.0 }, 8: { mean: 127.3, sd: 5.3 },
        9: { mean: 132.6, sd: 5.6 }, 10: { mean: 137.5, sd: 5.9 }, 11: { mean: 143.5, sd: 6.5 },
        12: { mean: 149.8, sd: 7.1 }, 13: { mean: 156.2, sd: 7.5 }, 14: { mean: 163.2, sd: 7.4 },
        15: { mean: 169.0, sd: 7.0 }, 16: { mean: 173.4, sd: 6.8 }, 17: { mean: 175.8, sd: 6.6 },
        18: { mean: 176.5, sd: 6.7 }, 19: { mean: 176.8, sd: 6.7 }, 20: { mean: 177.0, sd: 6.8 },
    },
    Female: {
        0: { mean: 49.1, sd: 2.0 }, 1: { mean: 74.0, sd: 2.5 }, 2: { mean: 86.4, sd: 3.1 },
        3: { mean: 95.1, sd: 3.7 }, 4: { mean: 102.7, sd: 3.9 }, 5: { mean: 109.4, sd: 4.3 },
        6: { mean: 115.6, sd: 4.6 }, 7: { mean: 121.1, sd: 4.9 }, 8: { mean: 126.6, sd: 5.2 },
        9: { mean: 132.5, sd: 5.6 }, 10: { mean: 138.3, sd: 6.0 }, 11: { mean: 144.8, sd: 6.3 },
        12: { mean: 150.0, sd: 6.1 }, 13: { mean: 154.5, sd: 5.9 }, 14: { mean: 157.5, sd: 5.8 },
        15: { mean: 159.7, sd: 5.7 }, 16: { mean: 161.0, sd: 5.7 }, 17: { mean: 161.7, sd: 5.7 },
        18: { mean: 162.1, sd: 5.8 }, 19: { mean: 162.3, sd: 5.8 }, 20: { mean: 162.5, sd: 6.0 },
    }
};

const COUNTRY_ADJUSTMENTS: Record<string, number> = {
    "Netherlands": 3.5, "Denmark": 2.8, "Norway": 2.5, "Sweden": 2.3,
    "Germany": 1.8, "Australia": 1.2, "United States": 0.8, "United Kingdom": 0.5,
    "Canada": 0.7, "France": 0.2, "Brazil": -0.8, "China": -1.0,
    "Japan": -1.2, "India": -2.5, "Philippines": -3.0, "Indonesia": -3.5,
    "Global Average": 0,
};

const COUNTRIES = Object.keys(COUNTRY_ADJUSTMENTS).sort();

function erf(x: number) {
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
}

function normalCDF(x: number, mean: number, sd: number) {
    return 0.5 * (1 + erf((x - mean) / (sd * Math.sqrt(2))));
}

// function normalPDF(x: number, mean: number, sd: number) {
//     return Math.exp(-0.5 * Math.pow((x - mean) / sd, 2)) / (sd * Math.sqrt(2 * Math.PI));
// }

function getPercentile(heightCm: number, gender: string, age: number, country: string) {
    const clampedAge = Math.min(Math.max(Math.round(age), 0), 20);
    const ref = POPULATION_DATA[gender]?.[clampedAge] || POPULATION_DATA["Male"][18];
    const adj = COUNTRY_ADJUSTMENTS[country] || 0;
    const adjMean = ref.mean + adj;
    return Math.round(normalCDF(heightCm, adjMean, ref.sd) * 100);
}

function getLabel(p: number) {
    if (p >= 90) return { label: "Very Tall", color: "#0f766e", bg: "#f0fdfa" };
    if (p >= 75) return { label: "Above Average", color: "#0369a1", bg: "#eff6ff" };
    if (p >= 25) return { label: "Average", color: "#4338ca", bg: "#eef2ff" };
    if (p >= 10) return { label: "Below Average", color: "#b45309", bg: "#fffbeb" };
    return { label: "Significantly Below Average", color: "#be123c", bg: "#fff1f2" };
}

// ── Bell Curve SVG ────────────────────────────────────────────────────────
function BellCurve({ percentile }: { percentile: number }) {
    const W = 480, H = 200, PAD = 40;
    const plotW = W - PAD * 2;
    const steps = 200;

    const pts = Array.from({ length: steps + 1 }, (_, i) => {
        const t = i / steps;
        const z = (t - 0.5) * 8;
        const y = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
        return { t, z, y };
    });
    const maxY = pts.reduce((m, p) => Math.max(m, p.y), 0);

    const toSVG = (t: number, y: number) => [
        PAD + t * plotW,
        H - 20 - (y / maxY) * (H - 60)
    ];

    const curvePath = pts.map((p, i) => {
        const [x, y] = toSVG(p.t, p.y);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");

    const cutT = percentile / 100;
    const shadePts = pts.filter(p => p.t <= cutT);
    const lastShade = shadePts[shadePts.length - 1];
    const [lastX] = toSVG(lastShade?.t ?? cutT, lastShade?.y ?? 0);
    const [startX] = toSVG(0, 0);
    const shadePath = shadePts.length
        ? shadePts.map((p, i) => {
            const [x, y] = toSVG(p.t, p.y);
            return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(" ") + ` L${lastX.toFixed(1)},${(H - 20).toFixed(1)} L${startX.toFixed(1)},${(H - 20).toFixed(1)} Z`
        : "";

    const markerX = PAD + cutT * plotW;

    const ticks = [10, 25, 50, 75, 90];
    const { color } = getLabel(percentile);

    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[480px] block mx-auto">
            <defs>
                <linearGradient id="shadeGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={color} stopOpacity="0.12" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.35" />
                </linearGradient>
            </defs>

            {/* Baseline */}
            <line x1={PAD} y1={H - 20} x2={W - PAD} y2={H - 20} stroke={isDark ? "#334155" : "#e2e8f0"} strokeWidth="1.5" />

            {/* Shaded area */}
            {shadePath && <path d={shadePath} fill="url(#shadeGrad)" />}

            {/* Curve */}
            <path d={curvePath} fill="none" stroke={isDark ? "#475569" : "#94a3b8"} strokeWidth="2" strokeLinejoin="round" />

            {/* Marker */}
            <line
                x1={markerX} y1={H - 20}
                x2={markerX} y2={H - 20 - (H - 60) * 0.92}
                stroke={color} strokeWidth="2" strokeDasharray="5,3"
            />
            <circle cx={markerX} cy={H - 20 - (H - 60) * 0.92} r="5" fill={color} />

            {/* Percentile badge */}
            <rect
                x={Math.min(Math.max(markerX - 28, PAD), W - PAD - 56)}
                y={H - 20 - (H - 60) * 0.92 - 30}
                width="56" height="22" rx="4"
                fill={color}
            />
            <text
                x={Math.min(Math.max(markerX, PAD + 28), W - PAD - 28)}
                y={H - 20 - (H - 60) * 0.92 - 14}
                textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="Georgia, serif"
            >
                {percentile}th
            </text>

            {/* Axis ticks */}
            {ticks.map(tick => {
                const x = PAD + (tick / 100) * plotW;
                return (
                    <g key={tick}>
                        <line x1={x} y1={H - 20} x2={x} y2={H - 14} stroke={isDark ? "#475569" : "#cbd5e1"} strokeWidth="1" />
                        <text x={x} y={H - 5} textAnchor="middle" fontSize="9" fill={isDark ? "#64748b" : "#94a3b8"} fontFamily="Georgia, serif">
                            {tick}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

// ── Shareable Card ────────────────────────────────────────────────────────
function ShareCard({ inputs, percentile, onClose }: {
    inputs: { height: number, age: string, gender: string, country: string },
    percentile: number,
    onClose: () => void
}) {
    const { label, color, bg } = getLabel(percentile);
    const [copied, setCopied] = useState(false);
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    const text = `My height percentile result:\n${inputs.height} cm | Age ${inputs.age} | ${inputs.gender} | ${inputs.country}\nResult: ${percentile}th percentile — ${label}\ncalculated at heightcomparison.vercel.app`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div style={{
            position: "fixed", inset: 0, background: "rgba(15,23,42,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 100, padding: 20
        }}>
            <div style={{
                background: isDark ? "#101011" : "white", borderRadius: 20, maxWidth: 400, width: "100%",
                overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.3)"
            }}>
                {/* Card header */}
                <div style={{ background: isDark ? `${color}15` : bg, borderBottom: `3px solid ${color}`, padding: "28px 28px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ margin: 0, fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", fontFamily: "Georgia, serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                                Height Percentile Result
                            </p>
                            <p style={{ margin: "4px 0 0", fontSize: 42, fontWeight: 900, color, fontFamily: "Georgia, serif", lineHeight: 1 }}>
                                {percentile}<span style={{ fontSize: 18 }}>th</span>
                            </p>
                            <p style={{ margin: "6px 0 0", fontSize: 15, color, fontFamily: "Georgia, serif", fontWeight: 600 }}>
                                {label}
                            </p>
                        </div>
                        <div style={{
                            width: 64, height: 64, borderRadius: "50%",
                            border: `3px solid ${color}`, display: "flex",
                            alignItems: "center", justifyContent: "center",
                            fontSize: 24
                        }}>📏</div>
                    </div>
                </div>

                {/* Card body */}
                <div style={{ padding: "20px 28px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                        {[
                            ["Height", `${inputs.height} cm`],
                            ["Age", `${inputs.age} yrs`],
                            ["Gender", inputs.gender],
                            ["Country", inputs.country],
                        ].map(([k, v]) => (
                            <div key={k} style={{ background: isDark ? "#1e293b" : "#f8fafc", borderRadius: 10, padding: "10px 14px" }}>
                                <p style={{ margin: 0, fontSize: 10, color: isDark ? "#94a3b8" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Georgia, serif" }}>{k}</p>
                                <p style={{ margin: "2px 0 0", fontSize: 14, fontWeight: 700, color: isDark ? "white" : "#1e293b", fontFamily: "Georgia, serif" }}>{v}</p>
                            </div>
                        ))}
                    </div>

                    <p style={{ margin: "0 0 16px", fontSize: 12, color: isDark ? "#94a3b8" : "#64748b", fontFamily: "Georgia, serif", lineHeight: 1.6 }}>
                        Taller than <strong style={{ color }}>{percentile}%</strong> of {inputs.gender.toLowerCase()}s aged {inputs.age} in {inputs.country}. Based on WHO & CDC reference data.
                    </p>

                    <div style={{ display: "flex", gap: 10 }}>
                        <button onClick={copyToClipboard} style={{
                            flex: 1, padding: "11px 0", borderRadius: 10, border: "none",
                            background: copied ? "#10b981" : color, color: "white",
                            fontSize: 13, fontWeight: 700, cursor: "pointer",
                            fontFamily: "Georgia, serif", transition: "background 0.3s"
                        }}>
                            {copied ? "✓ Copied!" : "Copy Result"}
                        </button>
                        <button onClick={onClose} style={{
                            flex: 1, padding: "11px 0", borderRadius: 10,
                            border: `2px solid ${color}`, background: "transparent",
                            color, fontSize: 13, fontWeight: 700, cursor: "pointer",
                            fontFamily: "Georgia, serif"
                        }}>
                            Close
                        </button>
                    </div>
                </div>

                <div style={{ padding: "10px 28px 16px", borderTop: `1px solid ${isDark ? "#1e293b" : "#f1f5f9"}` }}>
                    <p style={{ margin: 0, fontSize: 10, color: isDark ? "#475569" : "#cbd5e1", textAlign: "center", fontFamily: "Georgia, serif" }}>
                        heightcomparison.vercel.app · For informational purposes only
                    </p>
                </div>
            </div>
        </div>
    );
}

// ── Main Tool ─────────────────────────────────────────────────────────────
export default function HeightPercentileTool() {
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("Male");
    const [country, setCountry] = useState("United States");
    const [result, setResult] = useState<{ percentile: number, heightCm: number } | null>(null);
    const [showCard, setShowCard] = useState(false);
    const [error, setError] = useState("");
    const [animating, setAnimating] = useState(false);

    // Global States
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';
    const { unitSystem: unit, setUnitSystem } = useUnitStore();

    const toFtIn = (cm: number) => {
        const totalIn = cm / 2.54;
        return { ft: Math.floor(totalIn / 12), inch: Math.round(totalIn % 12) };
    };

    const toCm = () => {
        if (unit === "metric") return parseFloat(height);
        const ft = parseFloat((document.getElementById("ft-input") as HTMLInputElement)?.value || "0");
        const inch = parseFloat((document.getElementById("in-input") as HTMLInputElement)?.value || "0");
        return (ft * 12 + inch) * 2.54;
    };

    const calculate = () => {
        setError("");
        const heightCm = toCm();
        const ageNum = parseFloat(age);

        if (!heightCm || heightCm < 30 || heightCm > 280) {
            setError("Please enter a valid height (30–280 cm).");
            return;
        }
        if (!ageNum || ageNum < 0 || ageNum > 100) {
            setError("Please enter a valid age (0–100).");
            return;
        }

        setAnimating(true);
        setTimeout(() => {
            const p = getPercentile(heightCm, gender, ageNum, country);
            setResult({ percentile: p, heightCm: Math.round(heightCm) });
            setAnimating(false);
        }, 600);
    };

    const { label, color, bg } = result ? getLabel(result.percentile) : { label: "", color: "#4338ca", bg: "#eef2ff" };

    const inputStyle = {
        width: "100%", padding: "12px 14px", borderRadius: 10,
        border: `1px solid ${isDark ? 'var(--border)' : '#e2e8f0'}`, fontSize: 15, fontFamily: "Georgia, serif",
        color: isDark ? 'white' : '#1e293b', background: isDark ? 'transparent' : 'white', outline: "none", boxSizing: "border-box" as const,
        transition: "border-color 0.2s"
    };

    const labelStyle = {
        display: "block", fontSize: 11, fontWeight: 700, color: isDark ? '#94a3b8' : '#64748b',
        textTransform: "uppercase" as const, letterSpacing: "0.09em",
        fontFamily: "Georgia, serif", marginBottom: 6
    };

    return (
        <div style={{ fontFamily: "Georgia, serif", padding: "0 0 " }} className="w-full">
            {/* Header */}
            {/* <div style={{
                background: isDark ? "var(--surface)" : "white", borderBottom: `1px solid ${isDark ? 'var(--border)' : '#e2e8f0'}`,
                padding: "20px 24px", textAlign: "center", borderRadius: "1.5rem 1.5rem 0 0",
                boxShadow: isDark ? "none" : "0 1px 12px rgba(0,0,0,0.05)"
            }}>
                <p style={{ margin: 0, fontSize: 11, color: isDark ? "#94a3b8" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                    Height & Weight
                </p>
                <h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 900, color: isDark ? "white" : "#0f172a", letterSpacing: "-0.5px" }}>
                    Percentile Calculator
                </h1>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: isDark ? "#64748b" : "#94a3b8" }}>
                    WHO &amp; CDC reference data · Instant results
                </p>
            </div> */}

            <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 16px" }}>

                {/* Input Card */}
                <div style={{
                    background: isDark ? "var(--surface)" : "white", borderRadius: 20, marginTop: 24,
                    boxShadow: isDark ? "none" : "0 4px 24px rgba(0,0,0,0.07)", overflow: "hidden",
                    border: isDark ? '1px solid var(--border)' : 'none'
                }}>
                    <div style={{ background: isDark ? "#101011" : "#0f172a", padding: "16px 24px", borderBottom: isDark ? '1px solid var(--border)' : 'none' }}>
                        <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            Enter your details
                        </p>
                    </div>

                    <div style={{ padding: "24px" }}>
                        {/* Unit toggle (Now linked to Global Store) */}
                        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                            {["metric", "imperial"].map(u => {
                                const displayLabel = u === 'metric' ? 'cm' : 'ft/in';
                                return (
                                    <button key={u} onClick={() => setUnitSystem(u as 'metric' | 'imperial')} style={{
                                        flex: 1, padding: "9px 0", borderRadius: 8,
                                        border: "1px solid " + (unit === u ? (isDark ? "var(--accent)" : "#4338ca") : (isDark ? "var(--border)" : "#e2e8f0")),
                                        background: unit === u ? (isDark ? "var(--accent)" : "#4338ca") : (isDark ? "transparent" : "white"),
                                        color: unit === u ? "white" : (isDark ? "#94a3b8" : "#64748b"),
                                        fontSize: 13, fontWeight: 900, cursor: "pointer",
                                        fontFamily: "Georgia, serif", transition: "all 0.2s"
                                    }}>
                                        {displayLabel}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Height */}
                        <div style={{ marginBottom: 16 }}>
                            <label htmlFor={unit === "metric" ? "height-input" : "ft-input"} style={labelStyle}>Height</label>
                            {unit === "metric" ? (
                                <div style={{ position: "relative" }}>
                                    <input
                                        id="height-input"
                                        type="number" placeholder="e.g. 175"
                                        value={height} onChange={e => setHeight(e.target.value)}
                                        style={{ ...inputStyle, paddingRight: 48 }}
                                    />
                                    <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 13 }}>cm</span>
                                </div>
                            ) : (
                                <div style={{ display: "flex", gap: 10 }}>
                                    <div style={{ flex: 1, position: "relative" }}>
                                        <input id="ft-input" type="number" placeholder="5"
                                            aria-label="Height in feet"
                                            style={{ ...inputStyle, paddingRight: 36 }} />
                                        <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 13 }}>ft</span>
                                    </div>
                                    <div style={{ flex: 1, position: "relative" }}>
                                        <input id="in-input" type="number" placeholder="9"
                                            aria-label="Height in inches"
                                            style={{ ...inputStyle, paddingRight: 36 }} />
                                        <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 13 }}>in</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Age */}
                        <div style={{ marginBottom: 16 }}>
                            <label htmlFor="age-input" style={labelStyle}>Age (years)</label>
                            <input
                                id="age-input"
                                type="number" placeholder="e.g. 25" min="0" max="100"
                                value={age} onChange={e => setAge(e.target.value)}
                                style={inputStyle}
                            />
                        </div>

                        {/* Gender */}
                        <div style={{ marginBottom: 16 }}>
                            <label style={labelStyle}>Gender</label>
                            <div style={{ display: "flex", gap: 10 }}>
                                {["Male", "Female"].map(g => (
                                    <button key={g} onClick={() => setGender(g)} style={{
                                        flex: 1, padding: "12px 0", borderRadius: 10,
                                        border: "1px solid " + (gender === g ? (isDark ? "var(--accent)" : "#0f172a") : (isDark ? "var(--border)" : "#e2e8f0")),
                                        background: gender === g ? (isDark ? "var(--accent)" : "#0f172a") : (isDark ? "transparent" : "white"),
                                        color: gender === g ? "white" : (isDark ? "#94a3b8" : "#64748b"),
                                        fontSize: 14, fontWeight: 900, cursor: "pointer",
                                        fontFamily: "Georgia, serif", transition: "all 0.2s"
                                    }}>
                                        {g === "Male" ? "♂ Male" : "♀ Female"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Country */}
                        <div style={{ marginBottom: 24 }}>
                            <label htmlFor="country-select" style={labelStyle}>Country</label>
                            <select
                                id="country-select"
                                value={country} onChange={e => setCountry(e.target.value)}
                                style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                            >
                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {error && (
                            <div style={{
                                background: isDark ? "#4c0519" : "#fff1f2", border: `1px solid ${isDark ? '#e11d48' : '#fecdd3'}`, borderRadius: 10,
                                padding: "10px 14px", marginBottom: 16, color: isDark ? "#fecdd3" : "#be123c", fontSize: 13
                            }}>
                                {error}
                            </div>
                        )}

                        <button onClick={calculate} className="btn-glow" style={{
                            width: "100%", padding: "15px 0", borderRadius: 12, border: "none",
                            background: animating
                                ? (isDark ? "#334155" : "#94a3b8")
                                : (isDark ? "#16a34a" : "linear-gradient(135deg, #1B4F8A 0%, #4338ca 100%)"),
                            color: "white", fontSize: 16, fontWeight: 800,
                            cursor: animating ? "not-allowed" : "pointer",
                            fontFamily: "Georgia, serif", letterSpacing: "0.02em",
                            transition: "all 0.3s", boxShadow: animating ? "none" : (isDark ? "0 4px 16px rgba(22,163,74,0.3)" : "0 4px 16px rgba(67,56,202,0.3)")
                        }}>
                            {animating ? "Calculating..." : "Calculate My Percentile →"}
                        </button>
                    </div>
                </div>

                {/* Result Card */}
                {result && !animating && (
                    <div style={{
                        background: isDark ? "var(--surface)" : "white", borderRadius: 20, marginTop: 20,
                        boxShadow: isDark ? "none" : "0 4px 24px rgba(0,0,0,0.08)", overflow: "hidden",
                        border: `1px solid ${color}40`
                    }}>
                        {/* Result header */}
                        <div style={{ background: isDark ? `${color}15` : bg, padding: "20px 24px", borderBottom: `1px solid ${color}40` }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div>
                                    <p style={{ margin: 0, fontSize: 11, color: isDark ? "#94a3b8" : "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                        Your percentile
                                    </p>
                                    <p style={{ margin: "4px 0 0", fontSize: 52, fontWeight: 900, color, lineHeight: 1, letterSpacing: "-2px" }}>
                                        {result.percentile}<span style={{ fontSize: 22, letterSpacing: 0 }}>th</span>
                                    </p>
                                    <span style={{
                                        display: "inline-block", marginTop: 8, padding: "4px 12px",
                                        background: color, color: "white", borderRadius: 20,
                                        fontSize: 12, fontWeight: 700
                                    }}>
                                        {label}
                                    </span>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <p style={{ margin: 0, fontSize: 13, color: isDark ? "#94a3b8" : "#64748b" }}>Height</p>
                                    <p style={{ margin: "2px 0", fontSize: 22, fontWeight: 800, color: isDark ? "white" : "#0f172a" }}>
                                        {result.heightCm} cm
                                    </p>
                                    <p style={{ margin: "2px 0", fontSize: 13, color: isDark ? "#64748b" : "#94a3b8" }}>
                                        {toFtIn(result.heightCm).ft}′{toFtIn(result.heightCm).inch}″
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bell curve */}
                        <div style={{ padding: "20px 24px 8px" }}>
                            <p style={{ margin: "0 0 12px", fontSize: 11, color: isDark ? "#94a3b8" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                Position on population curve
                            </p>
                            <BellCurve percentile={result.percentile} />
                            <p style={{ margin: "8px 0 0", fontSize: 11, color: isDark ? "#475569" : "#cbd5e1", textAlign: "center" }}>
                                Percentile
                            </p>
                        </div>

                        {/* Interpretation bar */}
                        <div style={{ padding: "8px 24px 20px" }}>
                            <div style={{ background: isDark ? "#1e293b" : "#f8fafc", borderRadius: 12, padding: "14px 16px" }}>
                                <p style={{ margin: 0, fontSize: 13, color: isDark ? "#cbd5e1" : "#475569", lineHeight: 1.6 }}>
                                    You are taller than <strong style={{ color }}>{result.percentile}%</strong> of {gender.toLowerCase()}s
                                    aged {age} in <strong>{country}</strong>. This places you in the{" "}
                                    <strong style={{ color }}>{label.toLowerCase()}</strong> range.
                                </p>
                            </div>
                        </div>

                        {/* Percentile scale */}
                        <div style={{ padding: "0 24px 20px" }}>
                            <div style={{ position: "relative", height: 8, borderRadius: 99, background: isDark ? "linear-gradient(to right, #451a03, #064e3b, #1e3a8a, #312e81, #2e1065)" : "linear-gradient(to right, #fef3c7, #d1fae5, #bfdbfe, #c7d2fe, #ddd6fe)" }}>
                                <div style={{
                                    position: "absolute", top: "50%", transform: "translate(-50%, -50%)",
                                    left: `${result.percentile}%`,
                                    width: 18, height: 18, borderRadius: "50%",
                                    background: color, border: `3px solid ${isDark ? '#1e293b' : 'white'}`,
                                    boxShadow: `0 2px 8px ${color}60`
                                }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                                {["Short", "Avg", "Tall"].map((l) => (
                                    <span key={l} style={{ fontSize: 10, color: isDark ? "#64748b" : "#94a3b8" }}>{l}</span>
                                ))}
                            </div>
                        </div>

                        {/* Share button */}
                        <div style={{ padding: "0 24px 24px" }}>
                            <button onClick={() => setShowCard(true)} style={{
                                width: "100%", padding: "13px 0", borderRadius: 12,
                                border: `1px solid ${color}`, background: "transparent",
                                color, fontSize: 14, fontWeight: 900, cursor: "pointer",
                                fontFamily: "Georgia, serif", transition: "all 0.2s"
                            }}>
                                📤 Share My Result
                            </button>
                        </div>
                    </div>
                )}

                {/* Disclaimer */}
                <p style={{ textAlign: "center", fontSize: 11, color: isDark ? "#475569" : "#cbd5e1", marginTop: 24, lineHeight: 1.6 }}>
                    For informational purposes only. Consult a healthcare provider<br />
                    for clinical growth assessment. Based on WHO &amp; CDC data.
                </p>
            </div>

            {showCard && result && (
                <ShareCard
                    inputs={{ height: result.heightCm, age, gender, country }}
                    percentile={result.percentile}
                    onClose={() => setShowCard(false)}
                />
            )}
        </div>
    );
}