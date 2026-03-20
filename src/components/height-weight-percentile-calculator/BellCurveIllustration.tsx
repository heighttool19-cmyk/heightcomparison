'use client';

import React, { useState } from "react";
import { useThemeStore } from "@/store"; // Adjust path as needed

function erf(x: number) {
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
}

function normalCDF(z: number) { return 0.5 * (1 + erf(z / Math.sqrt(2))); }
function normalPDF(z: number) { return Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI); }

const PERCENTILE_MARKERS = [5, 25, 50, 75, 95];
const SAMPLE_PERCENTILE = 72;

// z-score from percentile (approximation)
function zFromP(p: number) {
    // rational approximation
    const a = [2.515517, 0.802853, 0.010328];
    const b = [1.432788, 0.189269, 0.001308];
    const pp = p < 0.5 ? p : 1 - p;
    const t = Math.sqrt(-2 * Math.log(pp));
    const num = a[0] + a[1] * t + a[2] * t * t;
    const den = 1 + b[0] * t + b[1] * t * t + b[2] * t * t * t;
    const z0 = t - num / den;
    return p < 0.5 ? -z0 : z0;
}

const COLORS: Record<number, { fill: string; label: string; band: string; darkFill: string }> = {
    5: { fill: "#fee2e2", label: "#dc2626", band: "#fca5a5", darkFill: "#450a0a" },
    25: { fill: "#fef3c7", label: "#d97706", band: "#fcd34d", darkFill: "#451a03" },
    50: { fill: "#dcfce7", label: "#16a34a", band: "#86efac", darkFill: "#052e16" },
    75: { fill: "#dbeafe", label: "#2563eb", band: "#93c5fd", darkFill: "#1e3a8a" },
    95: { fill: "#ede9fe", label: "#7c3aed", band: "#c4b5fd", darkFill: "#2e1065" },
};

const LABELS: Record<number, string> = {
    5: "Significantly below average",
    25: "Below average",
    50: "Average (median)",
    75: "Above average",
    95: "Exceptionally tall",
};

export default function BellCurveIllustration() {
    const [hovered, setHovered] = useState<number | null>(null);
    const [showSample, setShowSample] = useState(true);
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    const W = 680, H = 280;
    const padL = 48, padR = 32, padT = 36, padB = 52;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    const zMin = -3.6, zMax = 3.6;
    const zRange = zMax - zMin;

    const zToX = (z: number) => padL + ((z - zMin) / zRange) * plotW;
    const yToSVG = (y: number) => padT + plotH - (y / normalPDF(0)) * plotH * 0.92;

    const steps = 300;
    const curvePts = Array.from({ length: steps + 1 }, (_, i) => {
        const z = zMin + (i / steps) * zRange;
        return { z, y: normalPDF(z) };
    });

    const pathD = curvePts.map((p, i) =>
        `${i === 0 ? "M" : "L"}${zToX(p.z).toFixed(2)},${yToSVG(p.y).toFixed(2)}`
    ).join(" ");

    // Shaded region between two percentile z-scores
    function bandPath(pLow: number, pHigh: number) {
        const zLow = pLow === 0 ? zMin : zFromP(pLow / 100);
        const zHigh = pHigh === 100 ? zMax : zFromP(pHigh / 100);
        const pts = curvePts.filter(p => p.z >= zLow && p.z <= zHigh);
        if (!pts.length) return "";
        const top = pts.map((p, i) =>
            `${i === 0 ? "M" : "L"}${zToX(p.z).toFixed(2)},${yToSVG(p.y).toFixed(2)}`
        ).join(" ");
        const baseline = `L${zToX(pts[pts.length - 1].z).toFixed(2)},${(padT + plotH).toFixed(2)} L${zToX(pts[0].z).toFixed(2)},${(padT + plotH).toFixed(2)} Z`;
        return top + " " + baseline;
    }

    // Bands: 0-5, 5-25, 25-75, 75-95, 95-100
    const bands = [
        { lo: 0, hi: 5, color: "#fca5a5", opacity: isDark ? 0.15 : 0.35 },
        { lo: 5, hi: 25, color: "#fcd34d", opacity: isDark ? 0.15 : 0.30 },
        { lo: 25, hi: 75, color: "#86efac", opacity: isDark ? 0.15 : 0.28 },
        { lo: 75, hi: 95, color: "#93c5fd", opacity: isDark ? 0.15 : 0.30 },
        { lo: 95, hi: 100, color: "#c4b5fd", opacity: isDark ? 0.15 : 0.35 },
    ];

    const sampleZ = zFromP(SAMPLE_PERCENTILE / 100);
    const sampleX = zToX(sampleZ);
    const sampleCurveY = yToSVG(normalPDF(sampleZ));
    const baseY = padT + plotH;

    const activeMarker = hovered;

    return (
        <div style={{ fontFamily: "'Georgia', serif" }} className={`w-full max-w-[720px] mx-auto rounded-2xl p-6 pb-5 shadow-2xl transition-colors duration-500 ${isDark ? 'bg-surface border border-border' : 'bg-white border border-[#e2e8f0]'}`}>
            {/* Title */}
            <div style={{ marginBottom: 16 }}>
                <p style={{ margin: 0, fontSize: 11, color: isDark ? "#94a3b8" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Interactive Illustration
                </p>
                <h3 style={{ margin: "4px 0 0", fontSize: 17, fontWeight: 800, color: isDark ? "white" : "#0f172a" }}>
                    Height Distribution by Percentile
                </h3>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: isDark ? "#cbd5e1" : "#64748b" }}>
                    Hover any percentile marker to highlight that range. The{" "}
                    <span style={{ color: "#7c3aed", fontWeight: 700 }}>purple dot</span> shows a sample score at the {SAMPLE_PERCENTILE}th percentile.
                </p>
            </div>

            {/* SVG */}
            <svg
                viewBox={`0 0 ${W} ${H}`}
                style={{ width: "100%", display: "block", cursor: "default" }}
            >
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {/* Gridlines */}
                {[0.25, 0.5, 0.75, 1].map(frac => {
                    const y = yToSVG(normalPDF(0) * frac);
                    return (
                        <line key={frac} x1={padL} y1={y} x2={W - padR} y2={y}
                            stroke={isDark ? "#334155" : "#f1f5f9"} strokeWidth="1" />
                    );
                })}

                {/* Colored bands */}
                {bands.map((b, i) => {
                    const isActive = activeMarker !== null &&
                        PERCENTILE_MARKERS.indexOf(activeMarker) !== -1 &&
                        ((b.lo < activeMarker && b.hi >= activeMarker) || (b.lo === 0 && activeMarker === 5) || (b.hi === 100 && activeMarker === 95));
                    return (
                        <path
                            key={i}
                            d={bandPath(b.lo, b.hi)}
                            fill={b.color}
                            opacity={activeMarker === null ? b.opacity : (isActive ? b.opacity * (isDark ? 3.0 : 2.2) : b.opacity * 0.3)}
                            style={{ transition: "opacity 0.3s" }}
                        />
                    );
                })}

                {/* Curve */}
                <path d={pathD} fill="none" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="2.5" strokeLinejoin="round" />

                {/* Baseline */}
                <line x1={padL} y1={baseY} x2={W - padR} y2={baseY} stroke={isDark ? "#475569" : "#cbd5e1"} strokeWidth="1.5" />

                {/* Percentile marker lines + labels */}
                {PERCENTILE_MARKERS.map(pct => {
                    const z = zFromP(pct / 100);
                    const x = zToX(z);
                    const isHov = hovered === pct;
                    const col = COLORS[pct].label;

                    return (
                        <g key={pct}
                            onMouseEnter={() => setHovered(pct)}
                            onMouseLeave={() => setHovered(null)}
                            style={{ cursor: "pointer" }}
                        >
                            {/* Hover hitbox */}
                            <rect x={x - 18} y={padT} width={36} height={plotH + padB - 8} fill="transparent" />

                            {/* Vertical dashed line */}
                            <line
                                x1={x} y1={padT + 6} x2={x} y2={baseY}
                                stroke={col}
                                strokeWidth={isHov ? 2 : 1.2}
                                strokeDasharray={isHov ? "none" : "4,3"}
                                opacity={isHov ? 1 : 0.6}
                                style={{ transition: "all 0.2s" }}
                            />

                            {/* Circle on curve */}
                            <circle
                                cx={x} cy={yToSVG(normalPDF(z))} r={isHov ? 6 : 4}
                                fill={col} stroke={isDark ? "#1e293b" : "white"} strokeWidth="2"
                                filter={isHov ? "url(#glow)" : "none"}
                                style={{ transition: "all 0.2s" }}
                            />

                            {/* Percentile badge */}
                            <rect
                                x={x - 17} y={padT - 28} width={34} height={22} rx={5}
                                fill={isHov ? col : (isDark ? "#1e293b" : "white")}
                                stroke={col} strokeWidth={isHov ? 0 : 1.5}
                                style={{ transition: "all 0.2s" }}
                            />
                            <text
                                x={x} y={padT - 12}
                                textAnchor="middle" fontSize="11" fontWeight="800"
                                fill={isHov ? "white" : col}
                                fontFamily="Georgia, serif"
                                style={{ transition: "all 0.2s" }}
                            >
                                {pct}th
                            </text>

                            {/* Bottom label */}
                            <text
                                x={x} y={baseY + 18}
                                textAnchor="middle" fontSize="9.5"
                                fill={isHov ? col : (isDark ? "#94a3b8" : "#94a3b8")}
                                fontFamily="Georgia, serif" fontWeight={isHov ? "700" : "400"}
                                style={{ transition: "all 0.2s" }}
                            >
                                p{pct}
                            </text>
                        </g>
                    );
                })}

                {/* Sample dot */}
                {showSample && (
                    <g>
                        {/* Drop line */}
                        <line
                            x1={sampleX} y1={sampleCurveY + 8}
                            x2={sampleX} y2={baseY}
                            stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3,3"
                            opacity="0.7"
                        />
                        {/* Dot on curve */}
                        <circle
                            cx={sampleX} cy={sampleCurveY}
                            r="9" fill="#7c3aed" stroke={isDark ? "#1e293b" : "white"} strokeWidth="3"
                            filter="url(#glow)"
                        />
                        <text
                            x={sampleX} y={sampleCurveY + 4.5}
                            textAnchor="middle" fontSize="9" fontWeight="900"
                            fill="white" fontFamily="Georgia, serif"
                        >
                            {SAMPLE_PERCENTILE}
                        </text>

                        {/* FIX 1: Widened and repositioned label callout */}
                        <rect
                            x={sampleX - 67} y={sampleCurveY - 48}
                            width={134} height={38} rx={6}
                            fill="#7c3aed"
                        />
                        <polygon
                            points={`${sampleX - 5},${sampleCurveY - 15} ${sampleX + 5},${sampleCurveY - 15} ${sampleX},${sampleCurveY - 8}`}
                            fill="#7c3aed"
                        />
                        <text
                            x={sampleX} y={sampleCurveY - 33}
                            textAnchor="middle" fontSize="10" fontWeight="800"
                            fill="white" fontFamily="Georgia, serif"
                        >
                            Sample: 72nd percentile
                        </text>
                        <text
                            x={sampleX} y={sampleCurveY - 19}
                            textAnchor="middle" fontSize="9"
                            fill="rgba(255,255,255,0.85)" fontFamily="Georgia, serif"
                        >
                            Taller than 72% of peers
                        </text>
                    </g>
                )}

                {/* Y-axis label */}
                <text
                    x={14} y={padT + plotH / 2}
                    textAnchor="middle" fontSize="9" fill={isDark ? "#94a3b8" : "#94a3b8"}
                    fontFamily="Georgia, serif"
                    transform={`rotate(-90, 14, ${padT + plotH / 2})`}
                >
                    Population frequency
                </text>

                {/* X-axis label */}
                <text
                    x={padL + plotW / 2} y={H - 4}
                    textAnchor="middle" fontSize="10" fill={isDark ? "#94a3b8" : "#94a3b8"}
                    fontFamily="Georgia, serif"
                >
                    Height (relative to population average)
                </text>
            </svg>

            {/* FIX 2: Fixed height tooltip container prevents layout shift & hover loops */}
            <div style={{
                minHeight: 84, // Increased and locked to accommodate 2 lines easily
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: hovered ? (isDark ? COLORS[hovered].darkFill : COLORS[hovered].fill) : (isDark ? "#101011" : "#f8fafc"),
                border: `1px solid ${hovered ? COLORS[hovered].band : (isDark ? "var(--border)" : "#e2e8f0")}`,
                borderRadius: 10, padding: "12px 16px", marginTop: 12,
                transition: "all 0.3s"
            }}>
                {hovered ? (
                    <>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: COLORS[hovered].label }}>
                            {hovered}th Percentile
                        </p>
                        <p style={{ margin: "3px 0 0", fontSize: 12, color: isDark ? "#cbd5e1" : "#475569", lineHeight: 1.5 }}>
                            {LABELS[hovered]}. A person here is taller than{" "}
                            <strong style={{ color: COLORS[hovered].label }}>{hovered}%</strong> of people the same age and sex.
                        </p>
                    </>
                ) : (
                    <p style={{ margin: 0, fontSize: 12, color: isDark ? "#64748b" : "#94a3b8", fontStyle: "italic" }}>
                        Hover a percentile marker on the curve to see what it means.
                    </p>
                )}
            </div>

            {/* Legend */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                {PERCENTILE_MARKERS.map(pct => (
                    <div
                        key={pct}
                        onMouseEnter={() => setHovered(pct)}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "5px 10px", borderRadius: 20,
                            background: hovered === pct ? (isDark ? COLORS[pct].darkFill : COLORS[pct].fill) : (isDark ? "#101011" : "#f8fafc"),
                            border: `1.5px solid ${hovered === pct ? COLORS[pct].band : (isDark ? "var(--border)" : "#e2e8f0")}`,
                            cursor: "pointer", transition: "all 0.2s"
                        }}
                    >
                        <div style={{
                            width: 10, height: 10, borderRadius: "50%",
                            background: COLORS[pct].label
                        }} />
                        <span style={{
                            fontSize: 11, fontWeight: 700,
                            color: hovered === pct ? COLORS[pct].label : (isDark ? "#94a3b8" : "#64748b"),
                            fontFamily: "Georgia, serif"
                        }}>
                            {pct}th
                        </span>
                    </div>
                ))}
                <div style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "5px 10px", borderRadius: 20,
                    background: isDark ? "#2e1065" : "#ede9fe", border: "1.5px solid #c4b5fd",
                    cursor: "pointer"
                }}
                    onClick={() => setShowSample(s => !s)}
                >
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#7c3aed" }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: isDark ? "#c4b5fd" : "#7c3aed", fontFamily: "Georgia, serif" }}>
                        {showSample ? "Hide" : "Show"} sample dot
                    </span>
                </div>
            </div>

            {/* Footer note */}
            <p style={{ margin: "14px 0 0", fontSize: 10.5, color: isDark ? "#64748b" : "#94a3b8", lineHeight: 1.6 }}>
                The 50th percentile is the median. Half the population falls above, half below.
                Being at the 5th or 95th percentile is not abnormal — it simply describes position within the distribution.
                Based on WHO &amp; CDC reference data.
            </p>
        </div>
    );
}