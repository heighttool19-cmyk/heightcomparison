'use client';

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const stages = [
    {
        age: "3 years",
        label: "Early Childhood",
        boneAge: 3,
        growth: 95,
        plateStatus: "Wide Open",
        plateColor: "#22d3ee", // cyan-400
        description: "Growth plates are thick cartilage bands — soft, flexible, and highly active. Bones are growing rapidly. The wrist shows many separate small bone segments that haven't fused yet.",
        heightLeft: "~130–150 cm remaining",
        detail: "open",
    },
    {
        age: "8 years",
        label: "Middle Childhood",
        boneAge: 8,
        growth: 70,
        plateStatus: "Active",
        plateColor: "#a3e635", // lime-400
        description: "Growth plates are still wide and active but bones are denser and more defined. Wrist bones have begun to take adult shape. Steady growth continues at about 5–6 cm per year.",
        heightLeft: "~60–80 cm remaining",
        detail: "active",
    },
    {
        age: "13 years",
        label: "Puberty",
        boneAge: 13,
        growth: 40,
        plateStatus: "Accelerating",
        plateColor: "#fb923c", // orange-400
        description: "Growth hormone surges during puberty, temporarily widening the growth plates again. This is the 'growth spurt' — kids can grow 8–12 cm in a single year. Bones are visibly thicker and longer.",
        heightLeft: "~20–40 cm remaining",
        detail: "spurt",
    },
    {
        age: "18 years",
        label: "Late Adolescence",
        boneAge: 18,
        growth: 5,
        plateStatus: "Closing",
        plateColor: "#f87171", // red-400
        description: "Growth plates are almost fully fused into solid bone — this process is called epiphyseal closure. Once closed, no further height growth is possible. The wrist bones now look nearly identical to an adult's.",
        heightLeft: "~0–3 cm remaining",
        detail: "closed",
    },
];

function HandBone({ stage, isActive }: { stage: typeof stages[0]; isActive: boolean }) {
    const { detail, plateColor } = stage;

    // SVG illustration of a simplified hand/wrist cross-section
    const plateWidth = detail === "open" ? 8 : detail === "active" ? 6 : detail === "spurt" ? 7 : 2;
    const boneOpacity = detail === "closed" ? 1 : 0.75;
    const cartilageOpacity = detail === "closed" ? 0.1 : detail === "spurt" ? 0.95 : 0.8;

    const activeBoneColor = "var(--tw-colors-gray-200, #e2e8f0)";
    const inactiveBoneColor = "var(--tw-colors-gray-400, #9ca3af)";

    const activeMetaColor = "var(--tw-colors-blue-300, #93c5fd)";
    const inactiveMetaColor = "var(--tw-colors-blue-400, #60a5fa)";

    return (
        <svg viewBox="0 0 120 200" width="100%" className="max-w-[150px] block    will-change-transform" style={{ transform: 'translateZ(0)' }}>
            {/* Background glow */}
            {isActive && (
                <motion.ellipse
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    cx="60" cy="100" rx="52" ry="88" fill={plateColor}
                />
            )}

            {/* === FINGER BONES (3 metacarpals simplified) === */}
            {[28, 60, 92].map((x, i) => (
                <g key={i}>
                    {/* Distal phalanx */}
                    <rect x={x - 7} y={12} width={14} height={22} rx={5} fill={isActive ? activeBoneColor : inactiveBoneColor} opacity={boneOpacity} />
                    {/* Growth plate - distal */}
                    <rect x={x - 7} y={34} width={14} height={plateWidth * 0.6} rx={1} fill={plateColor} opacity={cartilageOpacity} />
                    {/* Middle phalanx */}
                    <rect x={x - 7} y={34 + plateWidth * 0.6} width={14} height={18} rx={3} fill={isActive ? activeBoneColor : inactiveBoneColor} opacity={boneOpacity} />
                    {/* Growth plate - proximal */}
                    <rect x={x - 7} y={52 + plateWidth * 0.6} width={14} height={plateWidth * 0.7} rx={1} fill={plateColor} opacity={cartilageOpacity} />
                    {/* Proximal phalanx */}
                    <rect x={x - 7} y={52 + plateWidth * 1.3} width={14} height={22} rx={3} fill={isActive ? activeBoneColor : inactiveBoneColor} opacity={boneOpacity} />
                </g>
            ))}

            {/* === METACARPALS === */}
            {[28, 60, 92].map((x, i) => (
                <g key={`meta-${i}`}>
                    <rect x={x - 8} y={82 + plateWidth} width={16} height={32} rx={4} fill={isActive ? activeMetaColor : inactiveMetaColor} opacity={boneOpacity} />
                    {/* Metacarpal growth plate */}
                    <rect x={x - 8} y={114 + plateWidth} width={16} height={plateWidth} rx={2} fill={plateColor} opacity={cartilageOpacity} />
                </g>
            ))}

            {/* === WRIST / CARPAL BONES === */}
            {/* Row 1 */}
            {[22, 44, 66, 88].map((x, i) => (
                <rect key={`c1-${i}`} x={x} y={124 + plateWidth * 1.5} width={18} height={14}
                    rx={detail === "open" ? 6 : 3}
                    fill={isActive ? "var(--tw-colors-indigo-300, #a5b4fc)" : "var(--tw-colors-indigo-400, #818cf8)"}
                    opacity={detail === "open" ? 0.6 : boneOpacity} />
            ))}
            {/* Row 2 */}
            {[22, 44, 66, 88].map((x, i) => (
                <rect key={`c2-${i}`} x={x} y={140 + plateWidth * 1.5} width={18} height={14}
                    rx={detail === "open" ? 6 : 3}
                    fill={isActive ? "var(--tw-colors-indigo-400, #818cf8)" : "var(--tw-colors-indigo-500, #6366f1)"}
                    opacity={detail === "open" ? 0.5 : boneOpacity * 0.9} />
            ))}

            {/* === RADIUS (main forearm bone) === */}
            <rect x={30} y={158 + plateWidth * 1.5} width={60} height={28} rx={6}
                fill={isActive ? "var(--tw-colors-indigo-500, #6366f1)" : "var(--tw-colors-indigo-600, #4f46e5)"} opacity={boneOpacity} />

            {/* Radius growth plate - MOST IMPORTANT ONE */}
            <rect x={30} y={155 + plateWidth * 1.5} width={60} height={plateWidth * 1.2} rx={3}
                fill={plateColor} opacity={detail === "closed" ? 0.15 : 0.95}
                stroke={isActive ? plateColor : "none"} strokeWidth={isActive ? 1 : 0} />

            {/* Growth plate label line */}
            {isActive && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <line x1={88} y1={155 + plateWidth * 1.5} x2={108} y2={148} stroke={plateColor} strokeWidth={1.5} opacity={0.8} />
                    <text x={109} y={146} fill={plateColor} fontSize={8} fontFamily="monospace" fontWeight="bold">
                        {detail === "closed" ? "FUSED" : "PLATE"}
                    </text>
                </motion.g>
            )}

            {/* Cartilage separation lines between carpal bones (visible when young) */}
            {detail === "open" && (
                <>
                    <line x1={42} y1={124} x2={42} y2={154} stroke={plateColor} strokeWidth={1.5} opacity={0.4} />
                    <line x1={64} y1={124} x2={64} y2={154} stroke={plateColor} strokeWidth={1.5} opacity={0.4} />
                    <line x1={86} y1={124} x2={86} y2={154} stroke={plateColor} strokeWidth={1.5} opacity={0.4} />
                </>
            )}
        </svg>
    );
}

export default function GrowthPlateExplainer() {
    const [active, setActive] = useState(0);
    const current = stages[active];

    return (
        <div className="space-y-6 mt-12">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                    BONE AGE EXPLAINED
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                    How a <span style={{ color: current.plateColor, transition: "color 0.4s" }}>Wrist X-Ray</span> Predicts <br className="hidden md:block" />
                    a Child&apos;s Height
                </h2>
                <div className="h-1.5 w-24 bg-accent rounded-full" />
                <p className="text-muted leading-relaxed text-lg max-w-3xl">
                    Growth plates are thin strips of cartilage near the end of long bones. Their thickness on an X-ray reveals the most accurate estimation of final adult height.
                </p>
            </div>

            <div className="bg-bg border border-border rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden group shadow-sm transition-colors duration-500">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-1000" />
                <div className="relative z-10 mx-auto">

                    {/* Age selector tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {stages.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`px-6 py-2.5 rounded-xl font-bold font-mono text-sm transition-all border ${active === i
                                    ? "shadow-md"
                                    : "border-border text-muted bg-bg hover:bg-surface/80"
                                    }`}
                                style={{
                                    borderColor: active === i ? s.plateColor : undefined,
                                    backgroundColor: active === i ? `${s.plateColor}15` : undefined,
                                    color: active === i ? s.plateColor : undefined,
                                }}
                            >
                                {s.age}
                            </button>
                        ))}
                    </div>

                    {/* Main content */}
                    <div className="grid md:grid-cols-3 gap-8 mb-10">

                        {/* Bone illustration */}
                        <div
                            className="md:col-span-1 bg-bg border-2 rounded-3xl p-6 text-center transition-colors duration-500 shadow-inner flex flex-col justify-between align-center items-center"
                            style={{ borderColor: `${current.plateColor}40` }}
                        >
                            <HandBone stage={current} isActive={true} />
                            <div className="mt-6 flex flex-col gap-2 items-center bg-surface/50 p-4 rounded-xl border border-border/50">
                                {/* Legend */}
                                {[
                                    { color: "var(--tw-colors-gray-300, #d1d5db)", label: "Bone (ossified)" },
                                    { color: current.plateColor, label: "Growth Plate" },
                                    { color: "var(--tw-colors-indigo-400, #818cf8)", label: "Wrist bones" },
                                ].map(l => (
                                    <div key={l.label} className="flex items-center gap-3 w-full justify-start">
                                        <div className="w-3 h-3 rounded-[3px]" style={{ backgroundColor: l.color }} />
                                        <span className="text-[11px] text-muted font-bold font-mono tracking-wider">{l.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info panel */}
                        <div className="md:col-span-2 flex flex-col">

                            {/* Stage header */}
                            <div className="mb-6">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className="font-mono font-bold text-[11px] px-3 py-1 rounded-md tracking-wider"
                                        style={{ background: `${current.plateColor}20`, color: current.plateColor }}>
                                        {current.label.toUpperCase()}
                                    </span>
                                    <span className="font-mono font-bold text-[11px] px-3 py-1 rounded-md border"
                                        style={{ borderColor: `${current.plateColor}50`, color: current.plateColor }}>
                                        PLATE: {current.plateStatus.toUpperCase()}
                                    </span>
                                </div>
                                <h3 className="text-4xl font-black text-foreground tracking-tight">Age {current.age}</h3>
                            </div>

                            {/* Growth remaining bar */}
                            <div className="mb-8 bg-bg p-5 rounded-2xl border border-border">
                                <div className="flex justify-between mb-3 text-xs font-mono font-bold">
                                    <span className="text-muted tracking-wider">GROWTH REMAINING</span>
                                    <span style={{ color: current.plateColor }}>{current.growth}%</span>
                                </div>
                                <div className="bg-surface rounded-full h-3 overflow-hidden border border-border/50">
                                    <motion.div
                                        className="h-full rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${current.growth}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        style={{
                                            background: `linear-gradient(90deg, ${current.plateColor}, ${current.plateColor}99)`
                                        }}
                                    />
                                </div>
                                <div className="text-xs text-muted mt-3 font-mono font-bold">
                                    EST: {current.heightLeft}
                                </div>
                            </div>

                            {/* Description */}
                            <AnimatePresence>
                                <motion.div
                                    key={active}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-1"
                                >
                                    <p className="text-base leading-relaxed text-foreground bg-bg border border-border rounded-2xl p-6 font-medium">
                                        {current.description}
                                    </p>

                                    {/* Key insight */}
                                    <div className="mt-4 p-5 rounded-r-xl border-l-4 font-medium text-sm text-muted leading-relaxed"
                                        style={{ borderLeftColor: current.plateColor, backgroundColor: `${current.plateColor}10` }}>
                                        {current.detail === "open" && "📍 A 3-year-old with a bone age of 5 still has massive growth ahead — but doctors can already estimate how tall they'll likely be."}
                                        {current.detail === "active" && "📍 Bone age and chronological age often match here. A mismatch — like an 8-year-old with bone age 10 — signals earlier puberty and slightly less final height."}
                                        {current.detail === "spurt" && "📍 This is why 13-year-olds can outgrow their shoes in 6 months. The X-ray at this stage is the most revealing — it predicts whether the spurt has more to give."}
                                        {current.detail === "closed" && "📍 Once growth plates fully fuse, no intervention increases height. The X-ray at 18 looks almost identical to one taken at 25."}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Bottom comparison strip */}
                    <div className="bg-bg border border-border rounded-3xl p-6 md:p-8">
                        <div className="text-xs font-bold text-muted font-mono tracking-[0.2em] mb-6 text-center">
                            GROWTH PLATE STATUS ACROSS ALL AGES
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stages.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className={`flex flex-col items-center justify-between p-4 rounded-2xl border transition-all ${active === i ? "bg-surface shadow-md scale-[1.02]" : "border-transparent hover:bg-surface/50 opacity-60 hover:opacity-100"
                                        }`}
                                    style={{ borderColor: active === i ? `${s.plateColor}50` : undefined }}
                                >
                                    <div className="w-16 h-24 mb-4 flex items-center justify-center pointer-events-none">
                                        <HandBone stage={s} isActive={active === i} />
                                    </div>
                                    <div className="font-mono font-bold text-sm tracking-wider" style={{ color: s.plateColor }}>{s.age}</div>
                                    <div className="text-[10px] text-muted font-bold tracking-widest uppercase mt-1">{s.plateStatus}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="text-center text-[10px] font-bold text-muted mt-8 font-mono uppercase tracking-wider">
                        Illustration based on CDC & radiological literature on skeletal maturity assessment (Greulich-Pyle method)
                    </p>

                </div>
            </div>
        </div>
    );
}
