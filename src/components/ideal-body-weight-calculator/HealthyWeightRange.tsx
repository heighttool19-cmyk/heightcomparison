'use client';

import { useState } from "react";
import { useThemeStore } from "@/store"; // Make sure to import your theme store

const BLUE = "#1B4F8A";
const TEAL = "#0d7377";

// Pre-calculated IBW data
const MEN_DATA = [
    { cm: 160, ft: "5'3\"", devine: 56.9, hamwi: 56.1, robinson: 57.7, miller: 60.4, bmiLo: 47.4, bmiHi: 64.0 },
    { cm: 163, ft: "5'4\"", devine: 59.6, hamwi: 59.3, robinson: 59.9, miller: 62.1, bmiLo: 49.2, bmiHi: 66.4 },
    { cm: 165, ft: "5'5\"", devine: 61.4, hamwi: 61.4, robinson: 61.4, miller: 63.2, bmiLo: 50.4, bmiHi: 68.1 },
    { cm: 168, ft: "5'6\"", devine: 64.1, hamwi: 64.6, robinson: 63.7, miller: 64.9, bmiLo: 52.2, bmiHi: 70.6 },
    { cm: 170, ft: "5'7\"", devine: 65.9, hamwi: 66.7, robinson: 65.2, miller: 66.0, bmiLo: 53.5, bmiHi: 72.2 },
    { cm: 173, ft: "5'8\"", devine: 68.7, hamwi: 69.9, robinson: 67.4, miller: 67.6, bmiLo: 55.4, bmiHi: 74.8 },
    { cm: 175, ft: "5'9\"", devine: 70.5, hamwi: 72.0, robinson: 68.9, miller: 68.7, bmiLo: 56.7, bmiHi: 76.6 },
    { cm: 178, ft: "5'10\"", devine: 73.2, hamwi: 75.2, robinson: 71.1, miller: 70.4, bmiLo: 58.6, bmiHi: 79.2 },
    { cm: 180, ft: "5'11\"", devine: 75.0, hamwi: 77.3, robinson: 72.6, miller: 71.5, bmiLo: 59.9, bmiHi: 81.0 },
    { cm: 183, ft: "6'0\"", devine: 77.7, hamwi: 80.5, robinson: 74.9, miller: 73.2, bmiLo: 62.0, bmiHi: 83.7 },
    { cm: 185, ft: "6'1\"", devine: 79.5, hamwi: 82.7, robinson: 76.4, miller: 74.3, bmiLo: 63.3, bmiHi: 85.6 },
    { cm: 188, ft: "6'2\"", devine: 82.2, hamwi: 85.8, robinson: 78.6, miller: 76.0, bmiLo: 65.4, bmiHi: 88.4 },
    { cm: 190, ft: "6'3\"", devine: 84.0, hamwi: 88.0, robinson: 80.1, miller: 77.1, bmiLo: 66.8, bmiHi: 90.2 },
];

const WOMEN_DATA = [
    { cm: 150, ft: "4'11\"", devine: 45.5, hamwi: 45.5, robinson: 49.0, miller: 53.1, bmiLo: 41.6, bmiHi: 56.2 },
    { cm: 152, ft: "5'0\"", devine: 45.5, hamwi: 45.5, robinson: 49.0, miller: 53.1, bmiLo: 42.7, bmiHi: 57.8 },
    { cm: 155, ft: "5'1\"", devine: 47.9, hamwi: 47.8, robinson: 50.7, miller: 54.5, bmiLo: 44.4, bmiHi: 60.1 },
    { cm: 157, ft: "5'2\"", devine: 49.7, hamwi: 49.5, robinson: 52.1, miller: 55.6, bmiLo: 45.6, bmiHi: 61.6 },
    { cm: 160, ft: "5'3\"", devine: 52.4, hamwi: 52.1, robinson: 54.1, miller: 57.2, bmiLo: 47.4, bmiHi: 64.0 },
    { cm: 163, ft: "5'4\"", devine: 55.1, hamwi: 54.7, robinson: 56.1, miller: 58.8, bmiLo: 49.2, bmiHi: 66.4 },
    { cm: 165, ft: "5'5\"", devine: 56.9, hamwi: 56.4, robinson: 57.4, miller: 59.8, bmiLo: 50.4, bmiHi: 68.1 },
    { cm: 168, ft: "5'6\"", devine: 59.6, hamwi: 59.0, robinson: 59.4, miller: 61.5, bmiLo: 52.2, bmiHi: 70.6 },
    { cm: 170, ft: "5'7\"", devine: 61.4, hamwi: 60.7, robinson: 60.8, miller: 62.5, bmiLo: 53.5, bmiHi: 72.2 },
    { cm: 173, ft: "5'8\"", devine: 64.2, hamwi: 63.3, robinson: 62.8, miller: 64.1, bmiLo: 55.4, bmiHi: 74.8 },
    { cm: 175, ft: "5'9\"", devine: 66.0, hamwi: 65.1, robinson: 64.1, miller: 65.2, bmiLo: 56.7, bmiHi: 76.6 },
    { cm: 178, ft: "5'10\"", devine: 68.7, hamwi: 67.7, robinson: 66.1, miller: 66.8, bmiLo: 58.6, bmiHi: 79.2 },
    { cm: 180, ft: "5'11\"", devine: 70.5, hamwi: 69.4, robinson: 67.5, miller: 67.9, bmiLo: 59.9, bmiHi: 81.0 },
];

const FORMULAS = [
    { key: "devine", label: "Devine", year: 1974, color: "#1B4F8A" },
    { key: "hamwi", label: "Hamwi", year: 1964, color: "#0891b2" },
    { key: "robinson", label: "Robinson", year: 1983, color: "#0d7377" },
    { key: "miller", label: "Miller", year: 1983, color: "#7c3aed" },
];

function kg2lbs(kg: number) { return Math.round(kg * 2.205); }

function WeightTable({ data, sex }: { 
    data: ({ cm: number, ft: string, devine: number, hamwi: number, robinson: number, miller: number, bmiLo: number, bmiHi: number } & Record<string, string | number>)[], 
    sex: string 
}) {
    const [unit, setUnit] = useState("kg");
    const [hovered, setHovered] = useState<number | null>(null);
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    const fmt = (v: number) => unit === "kg" ? `${v}` : `${kg2lbs(v)}`;
    const u = unit === "kg" ? "kg" : "lbs";

    return (
        <div>
            {/* Unit toggle */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                {["kg", "lbs"].map(u2 => {
                    const isActive = unit === u2;
                    return (
                        <button key={u2} onClick={() => setUnit(u2)} style={{
                            padding: "6px 18px", borderRadius: 20,
                            fontSize: 12, fontWeight: 700, cursor: "pointer",
                            fontFamily: "Georgia, serif", transition: "all 0.2s",
                            borderWidth: "1.5px", borderStyle: "solid",
                            // Explicit logic for light and dark mode
                            background: isActive ? (isDark ? "var(--accent)" : BLUE) : (isDark ? "var(--surface)" : "white"),
                            borderColor: isActive ? (isDark ? "var(--accent)" : BLUE) : (isDark ? "var(--border)" : "#e2e8f0"),
                            color: isActive ? "white" : (isDark ? "var(--muted)" : "#64748b")
                        }}>
                            {u2}
                        </button>
                    );
                })}
            </div>

            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "Georgia, serif" }}>
                    <thead>
                        <tr style={{ background: sex === "Men" ? (isDark ? "#1d4ed8" : BLUE) : (isDark ? "#0f766e" : TEAL) }}>
                            <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", whiteSpace: "nowrap", color: "white" }}>Height (cm)</th>
                            <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", color: "white" }}>Height (ft)</th>
                            {FORMULAS.map(f => (
                                <th key={f.key} style={{ padding: "10px 12px", textAlign: "center", fontWeight: 700, fontSize: 11, letterSpacing: "0.04em", whiteSpace: "nowrap", color: "white" }}>
                                    {f.label} ({u})
                                </th>
                            ))}
                            <th style={{ padding: "10px 12px", textAlign: "center", fontWeight: 700, fontSize: 11, letterSpacing: "0.04em", whiteSpace: "nowrap", background: "rgba(255,255,255,0.18)", color: "white" }}>
                                Healthy BMI Range ({u})
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => {
                            const isHov = hovered === i;

                            // Determine row background color based on hover, sex, odd/even, and theme
                            let rowBg = isDark ? "var(--surface)" : "white"; // Default
                            if (isHov) {
                                rowBg = sex === "Men"
                                    ? (isDark ? "rgba(59, 130, 246, 0.1)" : "#eff6ff") // Blue tint
                                    : (isDark ? "rgba(20, 184, 166, 0.1)" : "#f0fdfa"); // Teal tint
                            } else if (i % 2 === 0) {
                                rowBg = isDark ? "rgba(var(--bg-rgb), 0.5)" : "#f8fafc"; // Striped
                            }

                            return (
                                <tr key={row.cm}
                                    onMouseEnter={() => setHovered(i)}
                                    onMouseLeave={() => setHovered(null)}
                                    style={{ transition: "background 0.15s", cursor: "default", background: rowBg }}
                                >
                                    <td style={{ padding: "9px 12px", fontWeight: 700, color: isDark ? "var(--foreground)" : "#1e293b" }}>{row.cm}</td>
                                    <td style={{ padding: "9px 12px", color: isDark ? "var(--muted)" : "#475569" }}>{row.ft}</td>
                                    {FORMULAS.map(f => (
                                        <td key={f.key} style={{ padding: "9px 12px", textAlign: "center", color: isDark ? "var(--foreground)" : "#1e293b" }}>
                                            {fmt(row[f.key] as number)}
                                        </td>
                                    ))}
                                    <td style={{ padding: "9px 12px", textAlign: "center" }}>
                                        <span style={{
                                            display: "inline-block",
                                            borderRadius: 20, padding: "2px 10px",
                                            fontWeight: 700, fontSize: 11,
                                            background: sex === "Men"
                                                ? (isDark ? "rgba(59, 130, 246, 0.2)" : "#dbeafe")
                                                : (isDark ? "rgba(20, 184, 166, 0.2)" : "#ccfbf1"),
                                            color: sex === "Men"
                                                ? (isDark ? "#60a5fa" : BLUE)
                                                : (isDark ? "#2dd4bf" : TEAL)
                                        }}>
                                            {fmt(row.bmiLo)}–{fmt(row.bmiHi)}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function HealthyWeightRange() {
    const [activeTab, setActiveTab] = useState("Men");
    const { theme } = useThemeStore();
    const isDark = theme === 'dark';

    return (
        <div style={{ fontFamily: "Georgia, serif", maxWidth: 780, margin: "0 auto", color: isDark ? "var(--foreground)" : "#1e293b" }}>

            {/* ── Section: What IBW means ── */}
            <div style={{ marginBottom: 28 }}>
                <p style={{ margin: "0 0 14px", fontSize: 14.5, lineHeight: 1.75, color: isDark ? "var(--muted)" : "#334155" }}>
                    Your ideal body weight (IBW) result is a formula-based estimate of the weight that is
                    considered appropriate for your height and sex. The four formulas this calculator uses —{" "}
                    <strong style={{ color: isDark ? "var(--foreground)" : "#0f172a" }}>Devine, Hamwi, Robinson, and Miller</strong> — were originally developed to standardise
                    drug dosages in clinical settings. They were not designed as aesthetic targets. Each formula
                    produces a slightly different number, and the calculator shows all four so you can see where
                    the estimates cluster.
                </p>
                <p style={{ margin: "0 0 14px", fontSize: 14.5, lineHeight: 1.75, color: isDark ? "var(--muted)" : "#334155" }}>
                    None of the formulas account for muscle mass, bone density, or frame size. A person with
                    a larger frame or higher muscle mass will naturally sit above the IBW estimate without any
                    health concern. Treat the result as a general reference point, not a precise target.
                </p>
            </div>

            {/* ── What range is considered healthy ── */}
            <div style={{
                borderRadius: 14, padding: "18px 22px", marginBottom: 28, borderWidth: "1.5px", borderStyle: "solid",
                background: isDark ? "rgba(34, 197, 94, 0.1)" : "#f0fdf4",
                borderColor: isDark ? "rgba(34, 197, 94, 0.3)" : "#86efac"
            }}>
                <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: isDark ? "#22c55e" : "#16a34a" }}>
                    What counts as a healthy weight range?
                </p>
                <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.7, color: isDark ? "var(--muted)" : "#334155" }}>
                    The WHO defines a healthy weight as a BMI between <strong style={{ color: isDark ? "var(--foreground)" : "#0f172a" }}>18.5 and 25 kg/m²</strong>.
                    For most adults, this translates to a window of roughly <strong style={{ color: isDark ? "var(--foreground)" : "#0f172a" }}>14–16 kg</strong> around
                    the median IBW estimate. Falling anywhere within this band is considered clinically normal.
                    The formulas above typically sit near the middle of this band.
                </p>
                {/* Mini visual range */}
                <div style={{ marginTop: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 10.5, color: isDark ? "var(--muted)" : "#64748b" }}>Underweight</span>
                        <span style={{ fontSize: 10.5, fontWeight: 700, color: isDark ? "#22c55e" : "#16a34a" }}>Healthy BMI range</span>
                        <span style={{ fontSize: 10.5, color: isDark ? "var(--muted)" : "#64748b" }}>Overweight</span>
                    </div>
                    <div style={{ height: 14, borderRadius: 99, display: "flex", overflow: "hidden" }}>
                        <div style={{ flex: 18.5, background: isDark ? "rgba(234, 179, 8, 0.5)" : "#fde68a" }} />
                        <div style={{ flex: 6.5, position: "relative", background: isDark ? "#22c55e" : "#4ade80" }}>
                            {/* IBW pin */}
                            <div style={{ position: "absolute", top: 0, bottom: 0, left: "45%", width: 3, borderRadius: 2, background: isDark ? "#14532d" : "#15803d" }} />
                        </div>
                        <div style={{ flex: 5, background: isDark ? "rgba(239, 68, 68, 0.5)" : "#fca5a5" }} />
                    </div>
                    <div style={{ display: "flex", marginTop: 4 }}>
                        <span style={{ flex: 18.5, fontSize: 9.5, color: isDark ? "rgba(255,255,255,0.5)" : "#94a3b8" }}>BMI &lt; 18.5</span>
                        <span style={{ flex: 6.5, fontSize: 9.5, textAlign: "center", color: isDark ? "#22c55e" : "#16a34a" }}>18.5–25</span>
                        <span style={{ flex: 5, fontSize: 9.5, textAlign: "right", color: isDark ? "rgba(255,255,255,0.5)" : "#94a3b8" }}>&gt; 25</span>
                    </div>
                </div>
            </div>

            {/* ── How far above or below ── */}
            <div style={{ marginBottom: 28 }}>
                <p style={{ margin: "0 0 14px", fontSize: 14.5, lineHeight: 1.75, color: isDark ? "var(--muted)" : "#334155" }}>
                    The table below shows how to read the distance from your current weight to the IBW estimate:
                </p>
                <div style={{ overflowX: "auto", border: "1px solid", borderColor: isDark ? "var(--border)" : "#e2e8f0", borderRadius: 12 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Georgia, serif", fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: isDark ? "var(--accent)" : BLUE }}>
                                {["Distance from IBW estimate", "What it suggests"].map(h => (
                                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", color: "white" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["Within ±3 kg", "Very close to the formula estimate. Well within normal variation."],
                                ["3–7 kg above", "Slightly above the estimate. Still likely within healthy BMI range depending on height."],
                                ["7–15 kg above", "Noticeably above the IBW estimate. Worth checking BMI and discussing with a doctor."],
                                ["More than 15 kg above", "Significantly above IBW. Clinical review recommended."],
                                ["3–7 kg below", "Slightly below. May still be within healthy BMI range. Monitor if weight continues to drop."],
                                ["More than 7 kg below", "Below the healthy BMI threshold. Consult a healthcare provider."],
                            ].map(([dist, meaning], i) => (
                                <tr key={i} style={{ background: i % 2 === 0 ? (isDark ? "rgba(var(--bg-rgb), 0.5)" : "#f8fafc") : (isDark ? "var(--surface)" : "white"), borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}` }}>
                                    <td style={{ padding: "9px 16px", fontWeight: 700, whiteSpace: "nowrap", color: isDark ? "var(--foreground)" : "#0f172a" }}>{dist}</td>
                                    <td style={{ padding: "9px 16px", lineHeight: 1.6, color: isDark ? "var(--muted)" : "#475569" }}>{meaning}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Reference tables ── */}
            <div>
                <p style={{ margin: "0 0 6px", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, color: isDark ? "var(--muted)" : "#64748b" }}>
                    Reference tables
                </p>
                <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800, color: isDark ? "var(--foreground)" : "#0f172a" }}>
                    Healthy Weight by Height — Men &amp; Women
                </h3>
                <p style={{ margin: "0 0 18px", fontSize: 13, lineHeight: 1.6, color: isDark ? "var(--muted)" : "#64748b" }}>
                    IBW estimates from all four formulas plus the healthy BMI weight range (18.5–25 kg/m²) for the most common adult heights. Toggle between kg and lbs. Hover any row to highlight it.
                </p>

                {/* Sex tabs */}
                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                    {["Men", "Women"].map(sex => {
                        const isActive = activeTab === sex;
                        return (
                            <button key={sex} onClick={() => setActiveTab(sex)} style={{
                                padding: "9px 28px", borderRadius: 10,
                                fontSize: 14, fontWeight: 800, cursor: "pointer",
                                fontFamily: "Georgia, serif", transition: "all 0.2s",
                                borderWidth: "2px", borderStyle: "solid",
                                background: isActive ? (sex === "Men" ? (isDark ? "#2563eb" : BLUE) : (isDark ? "#0d9488" : TEAL)) : (isDark ? "var(--surface)" : "white"),
                                borderColor: isActive ? (sex === "Men" ? (isDark ? "#2563eb" : BLUE) : (isDark ? "#0d9488" : TEAL)) : (isDark ? "var(--border)" : "#e2e8f0"),
                                color: isActive ? "white" : (isDark ? "var(--muted)" : "#64748b")
                            }}>
                                {sex === "Men" ? "♂ Men" : "♀ Women"}
                            </button>
                        );
                    })}
                </div>

                {/* Formula legend */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
                    {FORMULAS.map(f => (
                        <div key={f.key} style={{
                            display: "flex", alignItems: "center", gap: 6, borderRadius: 20, padding: "4px 12px", borderWidth: "1px", borderStyle: "solid",
                            background: isDark ? "rgba(255,255,255,0.05)" : "#f8fafc",
                            borderColor: isDark ? "var(--border)" : "#e2e8f0"
                        }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.color }} />
                            <span style={{ fontSize: 11, fontFamily: "Georgia, serif", color: isDark ? "var(--muted)" : "#475569" }}>
                                <strong style={{ color: isDark ? "var(--foreground)" : "#0f172a" }}>{f.label}</strong> ({f.year})
                            </span>
                        </div>
                    ))}
                    <div style={{
                        display: "flex", alignItems: "center", gap: 6, borderRadius: 20, padding: "4px 12px", borderWidth: "1px", borderStyle: "solid",
                        background: isDark ? "rgba(34, 197, 94, 0.1)" : "#f0fdf4",
                        borderColor: isDark ? "rgba(34, 197, 94, 0.3)" : "#86efac"
                    }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a" }} />
                        <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "Georgia, serif", color: isDark ? "#22c55e" : "#16a34a" }}>
                            Healthy BMI range (WHO)
                        </span>
                    </div>
                </div>

                <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", borderWidth: "1px", borderStyle: "solid", borderColor: isDark ? "var(--border)" : "#e2e8f0" }}>
                    <WeightTable
                        data={activeTab === "Men" ? MEN_DATA : WOMEN_DATA}
                        sex={activeTab}
                    />
                </div>

                <p style={{ margin: "14px 0 0", fontSize: 11.5, lineHeight: 1.7, color: isDark ? "rgba(255,255,255,0.5)" : "#94a3b8" }}>
                    Sources: Devine BJ (1974). Robinson JD et al. (1983). Miller DR et al. (1983). Hamwi GJ (1964).
                    Healthy BMI range based on WHO recommended threshold of 18.5–25 kg/m². These values are
                    reference estimates only and do not constitute medical advice.
                </p>
            </div>
        </div>
    );
}