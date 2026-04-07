'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowUpCircle, Search, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { useThemeStore, useUnitStore } from '@/store';
import ReactCountryFlag from "react-country-flag";
import TableOfContents from '@/components/TableOfContents';
import { BLUE, TEAL, AMBER, RED } from '@/constants/colors';
import { TOP10, BOT10, MVF, BELL_CONFIG, heightData, REGIONS } from '@/constants/averageHeight';
import { AVERAGE_HEIGHT_TOC, AVERAGE_HEIGHT_FAQ } from '@/constants/averageHeight';
import FaqAccordion from '@/components/FaqAccordion';


// --- Helper Visual Components ---
function Bars({ items, color, label }: { items: { n: string, code: string | string[], v: number }[], color: string, label: string }) {
    const vals = items.map(d => d.v);
    const max = Math.max(...vals), min = Math.min(...vals), range = max - min;
    return (
        <div className="w-full min-w-[300px]">
            {label && <p className="mb-2 text-[11px] text-muted uppercase tracking-[0.1em] font-bold">{label}</p>}
            <div className="flex flex-col gap-2">
                {items.map(d => {
                    const pct = range > 0 ? ((d.v - min) / range) * 65 + 22 : 55;
                    return (
                        <div key={d.n} className="flex items-center gap-2">
                            {/* CHANGED HERE: justify-start, text-left, and a fixed width for flags to perfectly align the text */}
                            <div className="w-22 text-[11px] text-foreground text-left shrink-0 flex items-center justify-start gap-2">
                                {Array.isArray(d.code) ? (
                                    <div className="flex gap-0.5 shrink-0 w-8">
                                        {d.code.map(c => <ReactCountryFlag key={c} countryCode={c} svg style={{ width: '1.2em', height: '1.2em' }} title={c} />)}
                                    </div>
                                ) : d.code ? (
                                    <div className="shrink-0 w-6 flex justify-start">
                                        <ReactCountryFlag countryCode={d.code} svg style={{ width: '1.2em', height: '1.2em' }} title={d.n} />
                                    </div>
                                ) : null}
                                <span >{d.n}</span>
                            </div>
                            <div className="flex-1 bg-border rounded-full h-2.5 overflow-hidden">
                                <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99 }} />
                            </div>
                            <div className="w-[55px] text-[11px] text-foreground">{d.v} cm</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function GroupedChart({ data, title }: { data: { n: string, code: string, m: number, w: number }[], title: string }) {
    const W = 540, H = 240, pL = 26, pR = 14, pT = 14, pB = 48, plotW = W - pL - pR, plotH = H - pT - pB;
    const minV = 145, maxV = 188, toY = (v: number) => pT + plotH - ((v - minV) / (maxV - minV)) * plotH;
    const gW = plotW / data.length, bW = gW * 0.30, gap = gW * 0.04;
    const yTicks = [150, 155, 160, 165, 170, 175, 180, 185];
    return (
        <div className="w-full min-w-[500px] mb-2">
            {title && <p className="mb-2 text-[11px] text-muted uppercase tracking-[0.1em] font-bold">{title}</p>}
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full block">
                {yTicks.map(t => (
                    <g key={t}>
                        <line x1={pL} y1={toY(t)} x2={pL + plotW} y2={toY(t)} stroke="var(--border)" strokeWidth="1" />
                        <text x={pL - 3} y={toY(t) + 4} textAnchor="end" fontSize="8" fill="var(--muted)">{t}</text>
                    </g>
                ))}
                {data.map((c, i) => {
                    const cx = pL + i * gW + gW / 2;
                    return (
                        <g key={c.n}>
                            <rect x={cx - bW - gap / 2} y={toY(c.m)} width={bW} height={toY(minV) - toY(c.m)} fill={BLUE} rx="3" opacity="0.88" />
                            <rect x={cx + gap / 2} y={toY(c.w)} width={bW} height={toY(minV) - toY(c.w)} fill={TEAL} rx="3" opacity="0.88" />
                            <text x={cx - bW / 2 - gap / 2} y={toY(c.m) - 3} textAnchor="middle" fontSize="7" fill={BLUE}>{c.m}</text>
                            <text x={cx + bW / 2 + gap / 2} y={toY(c.w) - 3} textAnchor="middle" fontSize="7" fill={TEAL}>{c.w}</text>
                            <text x={cx} y={pT + plotH + 12} textAnchor="middle" fontSize="8.5" fill="var(--foreground)">{c.code}</text>
                            <text x={cx} y={pT + plotH + 23} textAnchor="middle" fontSize="7.5" fill="var(--foreground)">{c.n}</text>
                        </g>
                    );
                })}
                <line x1={pL} y1={pT} x2={pL} y2={pT + plotH} stroke="var(--border)" strokeWidth="1.2" />
                <line x1={pL} y1={pT + plotH} x2={pL + plotW} y2={pT + plotH} stroke="var(--border)" strokeWidth="1.2" />
                <rect x={pL + plotW - 78} y={pT + 2} width={9} height={9} fill={BLUE} rx="2" />
                <text x={pL + plotW - 66} y={pT + 10} fontSize="9" fill="var(--foreground)">Male</text>
                <rect x={pL + plotW - 34} y={pT + 2} width={9} height={9} fill={TEAL} rx="2" />
                <text x={pL + plotW - 22} y={pT + 10} fontSize="9" fill="var(--foreground)">Female</text>
            </svg>
        </div>
    );
}

function BellCurve({ mean, sd, color, bandColor, label, pctLabel }: any) {
    const W = 520, H = 175, pL = 40, pR = 18, pT = 18, pB = 40;
    const minX = mean - 3.5 * sd, maxX = mean + 3.5 * sd;
    const gauss = (x: number) => Math.exp(-0.5 * ((x - mean) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI));
    const peak = gauss(mean);
    const plotW = W - pL - pR, plotH = H - pT - pB;
    const toX = (v: number) => pL + ((v - minX) / (maxX - minX)) * plotW;
    const toY = (p: number) => pT + plotH - (p / peak) * plotH * 0.84;
    const pts = [];
    for (let x = minX; x <= maxX; x += 0.5) pts.push({ x, y: gauss(x) });
    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.x).toFixed(1)},${toY(p.y).toFixed(1)}`).join(" ");
    const band = (lo: number, hi: number, col: string, op: number) => {
        const b = []; for (let x = lo; x <= hi; x += 0.5) b.push([toX(x).toFixed(1), toY(gauss(x)).toFixed(1)]);
        if (!b.length) return null;
        const d = b.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ") + ` L${toX(hi)},${toY(0)} L${toX(lo)},${toY(0)} Z`;
        return <path d={d} fill={col} opacity={op} />;
    };
    const ticks = [mean - 3 * sd, mean - 2 * sd, mean - sd, mean, mean + sd, mean + 2 * sd, mean + 3 * sd];
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[500px] block">
            {band(mean - sd, mean + sd, color, 0.13)}
            {band(mean - 2 * sd, mean - sd, bandColor, 0.1)}
            {band(mean + sd, mean + 2 * sd, bandColor, 0.1)}
            <path d={line} fill="none" stroke={color} strokeWidth="2.2" />
            <line x1={toX(mean)} y1={pT} x2={toX(mean)} y2={pT + plotH} stroke={color} strokeWidth="1.2" strokeDasharray="4,3" opacity="0.5" />
            <text x={toX(mean)} y={pT - 4} textAnchor="middle" fontSize="9.5" fill={color} fontWeight="700">Global avg ≈ {mean} cm</text>
            {ticks.map(t => <text key={t} x={toX(t)} y={pT + plotH + 13} textAnchor="middle" fontSize="8.5" fill="var(--muted)">{Math.round(t)}</text>)}
            <line x1={pL} y1={pT + plotH} x2={pL + plotW} y2={pT + plotH} stroke="var(--border)" strokeWidth="1.2" />
            <text x={pL + plotW / 2} y={H - 2} textAnchor="middle" fontSize="9" fill="var(--muted)">Height (cm) — {label}</text>
            <text x={toX(mean)} y={toY(gauss(mean)) + 28} textAnchor="middle" fontSize="9.5" fill={color} fontWeight="700">{pctLabel}</text>
            <text x={toX(mean - sd) - 2} y={pT + plotH + 26} textAnchor="middle" fontSize="8" fill="var(--muted)">−1σ</text>
            <text x={toX(mean + sd) + 2} y={pT + plotH + 26} textAnchor="middle" fontSize="8" fill="var(--muted)">+1σ</text>
        </svg>
    );
}

function RegionMap() {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                {REGIONS.map(r => (
                    <div key={r.name} style={{ background: `${r.color}18`, borderColor: `${r.color}40` }} className="rounded-xl p-3 border-[1.5px]">
                        <div className="flex items-center gap-1.5 mb-1">
                            <div style={{ background: r.color }} className="w-2.5 h-2.5 rounded-full shrink-0" />
                            <span className="text-[10px] font-bold text-foreground uppercase tracking-wider">{r.name}</span>
                        </div>
                        <div style={{ color: r.color }} className="text-base font-black">{r.avg} cm</div>
                        <div className="text-[10px] text-muted mt-0.5">{r.ex}</div>
                    </div>
                ))}
            </div>
            <p className="mb-1 text-[10px] text-muted uppercase tracking-[0.1em] font-bold">Colour scale — average male height by region</p>
            <div className="flex h-3 rounded-md overflow-hidden">
                {["#1A56DB", "#2563EB", "#3B82F6", "#60A5FA", "#7DD3FC", "#86EFAC", "#FCD34D", "#FB923C", "#EF4444"].map(c => <div key={c} className="flex-1" style={{ background: c }} />)}
            </div>
            <div className="flex justify-between mt-1">
                <span className="text-[9.5px] text-muted">180+ cm (tallest)</span>
                <span className="text-[9.5px] text-muted">≤162 cm (shortest)</span>
            </div>
        </div>
    );
}

function Tabs({ options, active, onChange }: { options: string[], active: string, onChange: (val: string) => void }) {
    return (
        <div className="flex gap-2 mb-4 flex-wrap">
            {options.map(o => (
                <button key={o} onClick={() => onChange(o)}
                    className={`px-4 py-1.5 rounded-full text-xs font-black transition-all border-2 ${active === o ? 'bg-accent text-white border-accent' : 'bg-bg text-muted border-border hover:bg-surface'}`}>
                    {o}
                </button>
            ))}
        </div>
    );
}






export default function page() {
    const { theme } = useThemeStore();
    const { unitSystem, setUnitSystem } = useUnitStore();
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    // Table State
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof typeof heightData[0] | null, direction: 'asc' | 'desc' }>({ key: 'rank', direction: 'asc' });

    // Visual Component States
    const [tallTab, setTallTab] = useState("Men");
    const [shortTab, setShortTab] = useState("Men");
    const [mvfView, setMvfView] = useState("Tallest vs Shortest");
    const [bellSex, setBellSex] = useState<"Male" | "Female">("Male");

    // Top 10 sorted descending (Tallest to Shortest)
    const maleTop10 = TOP10.map(c => ({ n: c.name, code: c.code, v: c.male })).sort((a, b) => b.v - a.v);
    const femTop10 = TOP10.map(c => ({ n: c.name, code: c.code, v: c.female })).sort((a, b) => b.v - a.v);

    // Bottom 10 sorted ascending (Shortest to Tallest)
    const maleBot10 = BOT10.map(c => ({ n: c.name, code: c.code, v: c.male })).sort((a, b) => a.v - b.v);
    const femBot10 = BOT10.map(c => ({ n: c.name, code: c.code, v: c.female })).sort((a, b) => a.v - b.v);
    const regionBars = REGIONS.map(r => ({ n: r.name, code: r.codes, v: r.avg }));

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Helpers
    const cmToFtIn = (cm: number) => {
        const totalInches = cm / 2.54;
        const ft = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        if (inches === 12) return `${ft + 1}'0"`;
        return `${ft}'${inches}"`;
    };

    const handleSort = (key: keyof typeof heightData[0]) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedData = useMemo(() => {
        let sortableItems = [...heightData];
        if (searchQuery) {
            sortableItems = sortableItems.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key!] < b[sortConfig.key!]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key!] > b[sortConfig.key!]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [searchQuery, sortConfig]);

    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-2 md:p-4 relative pt-8">

            <main className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 p-4 md:p-8 relative pt-8">

                {/* --- LEFT SIDEBAR (TOC) --- */}
                <aside className="hidden md:block w-72 shrink-0 order-2 md:order-1">
                    <TableOfContents items={AVERAGE_HEIGHT_TOC} />
                </aside>

                {/* --- RIGHT CONTENT AREA --- */}
                <div className="flex-1 min-w-0 order-1 md:order-2">
                    <div className="flex flex-col gap-12 w-full min-w-0 max-w-4xl mx-auto">

                        {/* H1 Intro */}
                        <div className="space-y-6 text-center sm:text-left">
                            <h1 id="average-height-by-country" className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight scroll-mt-24">
                                Average Height by Country
                            </h1>
                            <p className="text-muted leading-relaxed text-lg max-w-3xl text-left">
                                Average height varies more than most people expect. The gap between the world's tallest and shortest populations spans nearly 24 cm for men and 21 cm for women. This page compares average human height around the world for both sexes, from the Netherlands at the top to Timor-Leste at the foot, drawing on data from the    <a href='https://elifesciences.org/articles/13410'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent font-semibold hover:underline">NCD Risk Factor Collaboration</a> and <a href='http://worldpopulationreview.com/country-rankings/average-height-by-country'
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent font-semibold hover:underline">World Population Review</a>. Men and women follow the same broad geographic pattern, with Northern Europe at the top and parts of South and Central Asia at the lower end.
                            </p>
                        </div>

                        {/* Table Section */}
                        <section className="scroll-mt-24">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Average Height by Country (Global Table)</h2>
                                {/* Synced Unit Toggle */}
                                <div className="bg-bg border border-border p-1 rounded-full flex items-center shadow-sm shrink-0">
                                    <button onClick={() => setUnitSystem('metric')} className={`px-4 py-1.5 rounded-full text-xs font-black transition-colors ${unitSystem === 'metric' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}>Metric (cm)</button>
                                    <button onClick={() => setUnitSystem('imperial')} className={`px-4 py-1.5 rounded-full text-xs font-black transition-colors ${unitSystem === 'imperial' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}>US (ft/in)</button>
                                </div>
                            </div>

                            <p className="text-muted leading-relaxed mb-6">
                                The table below shows average male height by country, average female height, and combined average across 46 nations. Click any column header to sort. Use the search field to find a specific country.
                            </p>

                            <div className="bg-surface border border-border p-4 rounded-3xl shadow-sm mb-8">
                                {/* Search Bar */}
                                <div className="relative mb-4">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search countries..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-bg border border-border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-accent transition-colors"
                                    />
                                </div>

                                <div className="overflow-x-auto rounded-xl border border-border/50">
                                    <table className="w-full text-sm text-left whitespace-nowrap">
                                        <thead className="bg-bg border-b border-border text-foreground font-bold uppercase tracking-wider text-xs">
                                            <tr>
                                                <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('rank')}>
                                                    <div className="flex items-center gap-1">Rank <ArrowUpDown size={14} /></div>
                                                </th>
                                                <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('name')}>
                                                    <div className="flex items-center gap-1">Country <ArrowUpDown size={14} /></div>
                                                </th>
                                                <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('maleCm')}>
                                                    <div className="flex items-center gap-1">Avg Male <ArrowUpDown size={14} /></div>
                                                </th>
                                                <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('femaleCm')}>
                                                    <div className="flex items-center gap-1">Avg Female <ArrowUpDown size={14} /></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/50 text-muted">
                                            {filteredAndSortedData.length > 0 ? filteredAndSortedData.map((country) => (
                                                <tr key={country.name} className="hover:bg-bg/50 transition-colors">
                                                    <td className="px-6 py-4">{country.rank}</td>
                                                    <td className="px-6 py-4 font-bold text-foreground flex items-center gap-2">
                                                        <ReactCountryFlag countryCode={country.flag} svg style={{ width: '1.5em', height: '1.5em' }} title={country.name} /> {country.name}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-foreground">
                                                        {unitSystem === 'metric' ? `${country.maleCm} cm` : cmToFtIn(country.maleCm)}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-foreground">
                                                        {unitSystem === 'metric' ? `${country.femaleCm} cm` : cmToFtIn(country.femaleCm)}
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-8 text-center text-muted">No countries found matching "{searchQuery}"</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-xs text-muted/60 mt-3 px-2">
                                    Source: NCD Risk Factor Collaboration (NCD-RisC) / World Population Review. Adults aged ~19.
                                </div>
                            </div>
                        </section>

                        <section id="tallest-countries-in-the-world" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Tallest Countries in the World</h2>

                            <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
                                <Tabs options={["Men", "Women"]} active={tallTab} onChange={setTallTab} />
                                <Bars
                                    items={tallTab === "Men" ? maleTop10 : femTop10}
                                    color={tallTab === "Men" ? BLUE : TEAL}
                                    label={`Top 10 tallest nations — ${tallTab === "Men" ? "Average male" : "Average female"} height (cm)`}
                                />
                                <p className="mt-4 text-[11.5px] text-muted leading-relaxed">
                                    {tallTab === "Men"
                                        ? "Netherlands men average 183.8 cm, the highest recorded national average globally. Eight of the top ten tallest nations for men are European."
                                        : "Netherlands and Montenegrin women average 170.4 cm and 170.0 cm respectively — the tallest female populations on record. Latvia and Estonia follow closely."}
                                </p>
                            </div>

                            <p className="text-muted leading-relaxed">
                                The Netherlands has topped global male height rankings for decades, with men averaging 183.8 cm, just under 6'1". Denmark sits at 181.9 cm, Germany at 180.3 cm, and Norway at 180.5 cm.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Three factors reinforce each other across this cluster: generous dairy consumption from early childhood, strong public healthcare that reduces illness during growth years, and long-term genetic selection in well-nourished populations.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Montenegro and Estonia have recently overtaken many traditionally tall Western European nations, reflecting rapid improvements in living standards following the post-Soviet period.
                            </p>
                        </section>

                        <section id="shortest-countries-in-the-world" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Shortest Countries in the World</h2>

                            <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
                                <Tabs options={["Men", "Women"]} active={shortTab} onChange={setShortTab} />
                                <Bars
                                    items={shortTab === "Men" ? maleBot10 : femBot10}
                                    color={shortTab === "Men" ? AMBER : RED}
                                    label={`10 shortest nations — ${shortTab === "Men" ? "Average male" : "Average female"} height (cm)`}
                                />
                                <p className="mt-4 text-[11.5px] text-muted leading-relaxed">
                                    {shortTab === "Men"
                                        ? "Timor-Leste men average 159.8 cm, the shortest male average of any tracked nation. Six of the ten shortest countries for men are in South or Southeast Asia."
                                        : "Guatemalan and Filipino women average around 149 cm, the lowest female averages in the Americas and Southeast Asia respectively."}
                                </p>
                            </div>

                            <p className="text-muted leading-relaxed">
                                The shortest populations sit predominantly in South and Southeast Asia and Central America. Timor-Leste records the lowest combined average globally, followed closely by Guatemala and Laos.
                            </p>
                            <p className="text-muted leading-relaxed">
                                In Guatemala, chronic malnutrition affects nearly a third of children under five, directly stunting skeletal development. Bangladesh and Nepal face similar constraints: protein-scarce diets, limited healthcare access, and structural poverty that limits growth potential from birth.
                            </p>
                            <p className="text-muted leading-relaxed">
                                These figures are not genetic ceilings. They are largely markers of historical underdevelopment, reversible, as South Korea and China demonstrated across the 20th century.
                            </p>
                        </section>

                        <section id="tallest-and-shortest-countries-by-average-height" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Tallest and Shortest Countries by Average Height</h2>

                            <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
                                <Tabs options={["Tallest vs Shortest", "Top 10 tallest", "Bottom 10 shortest"]} active={mvfView} onChange={setMvfView} />
                                {mvfView === "Tallest vs Shortest" && <GroupedChart data={MVF} title="10 countries spanning the full global height range — male (blue) and female (teal)" />}
                                {mvfView === "Top 10 tallest" && <GroupedChart data={TOP10.map(c => ({ n: c.name, code: c.code, m: c.male, w: c.female }))} title="Top 10 tallest nations — male vs female" />}
                                {mvfView === "Bottom 10 shortest" && <GroupedChart data={BOT10.map(c => ({ n: c.name, code: c.code, m: c.male, w: c.female }))} title="10 shortest nations — male vs female" />}
                                <p className="mt-4 text-[11.5px] text-muted leading-relaxed">
                                    Across all populations, men are taller than women by 12–15 cm. This gap holds consistent regardless of overall height level — it is nearly identical in the Netherlands and in Bangladesh.
                                </p>
                            </div>

                            <p className="text-muted leading-relaxed">
                                Average height varies widely due to genetics, diet quality, childhood health, and economic development. Northern European populations consistently rank among the tallest, while some South Asian and Central American countries show shorter averages shaped by historical nutritional limitations.
                            </p>
                        </section>

                        <section id="average-male-height-by-country" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Average Male Height by Country</h2>
                            <p className="text-muted leading-relaxed">
                                The average height of a man worldwide is approximately 171 cm (5'7"). This figure masks a wide spread, from Dutch  men at 183.8 cm down to Timor-Leste at 159.8 cm. Northern and Eastern European men are the tallest group globally, averaging 178 to 184 cm. North Americans and Australians sit in the 176 to 179 cm band.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Japan at 170.8 cm sits noticeably shorter than South Korea at 175.5 cm — a gap that has widened as South Korean diets and healthcare improved faster following the 1960s economic boom. Iran at 175.6 cm sits mid-table. India at 166.5 cm and Bangladesh at 163 cm sit at the lower end of the Asian cohort. Guatemala at 163.4 cm and Timor-Leste at 159.8 cm reflect the most severe documented nutritional constraints on record.
                            </p>
                        </section>

                        <section id="average-female-height-by-country" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Average Female Height by Country</h2>
                            <p className="text-muted leading-relaxed">
                                The average height of a woman worldwide is approximately 159 cm (5'3"). Netherlands and Montenegrin women, averaging 170.4 cm and 170.0 cm respectively, are the tallest female populations on record. Russia at 164.5 cm consistently appears in global lists alongside Eastern European countries that make up most of the top ten.
                            </p>
                            <p className="text-muted leading-relaxed">
                                South Korean women at 163.2 cm stand notably taller than Japanese women at 158.0 cm, a gap that has grown over the past half-century. Filipino women average 149.6 cm and Guatemalan women 149.4 cm, the lowest verified female average in the Americas. The average height for women in Japan was around 148 cm in the 1950s and has since climbed by a full ten centimetres, one of the steepest documented rises for any female population.
                            </p>
                            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-xl mt-4">
                                <p className="text-sm font-medium text-foreground/80">
                                    Across virtually every population, men are taller than women by 12 to 15 centimetres. This gap holds consistent across very different absolute height ranges, the difference in the Netherlands is roughly the same as in Bangladesh. It reflects hormonal differences during adolescence: testosterone drives a longer growth spurt in males, while earlier oestrogen onset in females closes growth plates sooner. The sex gap is not meaningfully affected by nutrition or economic development.
                                </p>
                            </div>
                        </section>
                        <section id="tallest-countries-in-the-world" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                                Average Male and Female Height
                            </h2>

                            <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
                                {/* Side-by-side grid (stacks on mobile, side-by-side on large screens) */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-[650px]">
                                    <Bars items={maleTop10} color={BLUE} label="Average male height (cm)" />
                                    <Bars items={femTop10} color={TEAL} label="Average female height (cm)" />
                                </div>

                                <p className="mt-6 text-[11.5px] text-muted leading-relaxed">
                                    Netherlands men average 183.8 cm, the highest recorded national average globally.
                                    Netherlands and Montenegrin women average 170.4 cm and 170.0 cm respectively —
                                    the tallest female populations on record.
                                </p>
                            </div>

                            <p className="text-muted leading-relaxed">
                                The Netherlands has topped global male height rankings for decades, with men averaging 183.8 cm, just under 6'1". Denmark sits at 181.9 cm, Germany at 180.3 cm, and Norway at 180.5 cm.
                            </p>
                            <p className="text-muted leading-relaxed">
                                Three factors reinforce each other across this cluster: generous dairy consumption from early childhood, strong public healthcare that reduces illness during growth years, and long-term genetic selection in well-nourished populations.
                            </p>
                        </section>
                        <section id="average-height-in-selected-countries" className="space-y-6 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Average Height in Selected Countries</h2>
                            <div className="grid md:grid-cols-1 gap-4">
                                {/* Country Card 1 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2"><ReactCountryFlag countryCode="NL" svg style={{ width: '1.2em', height: '1.2em' }} title="Netherlands" /> Netherlands</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">183.8 cm (6'0")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">170.4 cm (5'7")</span></div>
                                    <p className="text-sm text-muted">Netherlands men have topped global rankings for decades. Dairy-rich diets and universal healthcare drive the result.</p>
                                </div>
                                {/* Country Card 2 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2"><ReactCountryFlag countryCode="GB" svg style={{ width: '1.2em', height: '1.2em' }} title="United Kingdom" /> United Kingdom</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">178.2 cm (5'10")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">163.9 cm (5'5")</span></div>
                                    <p className="text-sm text-muted">UK sits mid-table in Europe. Heights vary by region — northern England and Scotland tend to average slightly taller.</p>
                                </div>
                                {/* Country Card 3 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2"><ReactCountryFlag countryCode="JP" svg style={{ width: '1.2em', height: '1.2em' }} title="Japan" /> Japan</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">170.8 cm (5'7")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">158.0 cm (5'2")</span></div>
                                    <p className="text-sm text-muted">Japanese heights have risen sharply since the 1950s. South Korean men at 175.5 cm have since overtaken their Japanese neighbours.</p>
                                </div>
                                {/* Country Card 4 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2"><ReactCountryFlag countryCode="BD" svg style={{ width: '1.2em', height: '1.2em' }} title="Bangladesh" /> Bangladesh</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">163.0 cm (5'4")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">152.1 cm (4'12")</span></div>
                                    <p className="text-sm text-muted">High rates of childhood malnutrition have historically limited growth. Urban populations show modest gains over recent decades.</p>
                                </div>
                                {/* Country Card 5 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2"><ReactCountryFlag countryCode="IR" svg style={{ width: '1.2em', height: '1.2em' }} title="Iran" /> Iran</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">175.6 cm (5'9")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">161.2 cm (5'3")</span></div>
                                    <p className="text-sm text-muted">One of the fastest documented rises in the Middle East — average male height has increased an estimated 5 to 6 cm over 40 years.</p>
                                </div>
                                {/* Country Card 6 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2"><ReactCountryFlag countryCode="CA" svg style={{ width: '1.2em', height: '1.2em' }} title="Canada" /> Canada</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">178.8 cm (5'10")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">164.7 cm (5'5")</span></div>
                                    <p className="text-sm text-muted">Canada's figures mirror Australia's closely, reflecting a well-nourished, high-income population profile. Growth has plateaued since the 1990s.</p>
                                </div>
                                {/* Country Card 7 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2"><ReactCountryFlag countryCode="IE" svg style={{ width: '1.2em', height: '1.2em' }} title="Ireland" /> Ireland</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">179.0 cm (5'10")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">164.5 cm (5'5")</span></div>
                                    <p className="text-sm text-muted">Ireland sits in the upper quarter of European rankings. Heights have risen steadily since the mid-20th century.</p>
                                </div>
                                {/* Country Card 8 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2"><ReactCountryFlag countryCode="LK" svg style={{ width: '1.2em', height: '1.2em' }} title="Sri Lanka" /> Sri Lanka</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">166.0 cm (5'5")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">153.0 cm (5'0")</span></div>
                                    <p className="text-sm text-muted">Urban populations in Colombo show measurable height gains over two generations. Rural areas have lagged due to food insecurity.</p>
                                </div>
                                {/* Country Card 9 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2"><ReactCountryFlag countryCode="KR" svg style={{ width: '1.2em', height: '1.2em' }} title="South Korea" /> South Korea</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">175.5 cm (5'9")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">163.2 cm (5'4")</span></div>
                                    <p className="text-sm text-muted">One of the largest documented generational height increases ever recorded — men gained around 6 cm across two generations post-war.</p>
                                </div>
                                {/* Country Card 10 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2"><ReactCountryFlag countryCode="IN" svg style={{ width: '1.2em', height: '1.2em' }} title="India" /> India</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">166.5 cm (5'5")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">152.6 cm (5'0")</span></div>
                                    <p className="text-sm text-muted">India's national average masks large regional variation. Men in Punjab average around 172 to 174 cm. Urban areas show consistent gains.</p>
                                </div>
                                {/* Country Card 11 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2"><ReactCountryFlag countryCode="US" svg style={{ width: '1.2em', height: '1.2em' }} title="USA" /> USA</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">176.9 cm (5'10")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">163.3 cm (5'4")</span></div>
                                    <p className="text-sm text-muted">The US was once third tallest globally. It now sits around 47th for men, reflecting diet quality diverging from European peers after the 1970s.</p>
                                </div>
                                {/* Country Card 12 */}
                                <div className="bg-surface border border-border p-5 rounded-2xl hover:border-accent/40 transition-colors shadow-sm">
                                    <h3 className="font-black text-lg text-foreground mb-3 border-b border-border/50 pb-2 flex items-center gap-2"><ReactCountryFlag countryCode="DK" svg style={{ width: '1.2em', height: '1.2em' }} title="Denmark" /> Denmark</h3>
                                    <div className="flex justify-between text-sm mb-1"><span className="text-muted font-bold uppercase tracking-wider">Male</span><span className="font-bold text-foreground">181.9 cm (5'11")</span></div>
                                    <div className="flex justify-between text-sm mb-3"><span className="text-muted font-bold uppercase tracking-wider">Female</span><span className="font-bold text-foreground">169.5 cm (5'7")</span></div>
                                    <p className="text-sm text-muted">Denmark consistently ranks in the global top five. Strong public healthcare and high dairy consumption from early childhood contribute.</p>
                                </div>
                            </div>
                        </section>

                        <section id="average-height-chart-for-men" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Average Height Chart for Men</h2>
                            <p className="text-muted leading-relaxed">
                                The chart below shows how male height benchmarks stack up across major world regions, from Northern Europe at the top to Central America at the foot. Country-level data varies within each region.
                            </p>

                            <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto grid grid-cols-1  gap-8">
                                <div className="mt-8">
                                    <Bars items={regionBars} color={BLUE} label="Approximate regional average male height (cm)" />
                                    <p className="mt-3 text-[11.5px] text-muted leading-relaxed">
                                        Regional figures are weighted averages. Individual countries within each region may sit above or below the band shown. Source: NCD-RisC and World Population Review.
                                    </p>
                                </div>

                            </div>
                        </section>

                        <section id="global-average-height" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Global Average Height</h2>

                            <div className="grid sm:grid-cols-2 gap-4 my-6">
                                <div className="bg-bg border border-border p-6 rounded-2xl flex flex-col justify-center text-center">
                                    <span className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Global average male height</span>
                                    <span className="text-4xl font-black text-foreground">171 cm</span>
                                    <span className="text-lg font-bold text-accent mt-1">5 ft 7 in</span>
                                </div>
                                <div className="bg-bg border border-border p-6 rounded-2xl flex flex-col justify-center text-center">
                                    <span className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Global average female height</span>
                                    <span className="text-4xl font-black text-foreground">159 cm</span>
                                    <span className="text-lg font-bold text-accent mt-1">5 ft 3 in</span>
                                </div>
                            </div>
                            <RegionMap />

                            <p className="text-muted leading-relaxed">
                                <a href='https://www.who.int/data/gho' target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">The World Health Organization </a> and NCD Risk Factor Collaboration place the global average male height at approximately 171 cm and the global average female height at approximately 159 cm. These weighted figures pull lower than most Western country averages because they account for the large populations of South and Southeast Asia.
                            </p>
                            <p className="text-muted leading-relaxed">
                                The global figure has been rising since the early 20th century, with the most dramatic gains in East Asia. South Korea and China gained around 5 to 8 cm per generation since the 1950s. Gains in Western Europe, which started earlier, have largely plateaued since the 1980s.
                            </p>
                        </section>

                        {/* Extremes Section */}
                        <div className="grid md:grid-cols-1 gap-8 pt-6">
                            <section id="tallest-man-in-the-world" className="space-y-3 scroll-mt-24">
                                <h2 className="text-xl md:text-2xl font-black tracking-tight">Tallest Man in the World</h2>
                                <p className="text-muted leading-relaxed text-sm">
                                    Robert Wadlow of Alton, Illinois remains the tallest person in documented human history at 272 cm (8'11"). His pituitary gland produced unchecked growth hormone from birth, and his height had not yet peaked when he died in 1940 aged 22. The Guinness record for the tallest living man belongs to Turkey's Sultan Kösen at 251 cm (8'3"), whose pituitary tumour was treated surgically, halting further growth.
                                </p>

                            </section>

                            <section id="shortest-man-in-the-world" className="space-y-3 scroll-mt-24">
                                <h2 className="text-xl md:text-2xl font-black tracking-tight">Shortest Man in the World</h2>
                                <p className="text-muted leading-relaxed text-sm">
                                    Chandra Bahadur Dangi of Nepal, verified by Guinness World Records in 2012, was the shortest adult male ever documented at 54.6 cm (1'9"). He lived to 75, working as a farmer and craftsman. He was measured for the first time by Guinness when already in his seventies, remarkable given the health complications often associated with severe growth disorders.
                                </p>

                            </section>

                            <section id="tallest-female-in-the-world" className="space-y-3 scroll-mt-24">
                                <h2 className="text-xl md:text-2xl font-black tracking-tight">Tallest Female in the World</h2>
                                <p className="text-muted leading-relaxed text-sm">
                                    Zeng Jinlian of Hunan Province, China holds the record for the tallest woman in verified medical history at 246.3 cm (8'1"). Born in 1964, she grew rapidly due to pituitary gigantism and died at 17 in 1982. The current living record belongs to Turkey's Rumeysa Gelgi at 215.2 cm (7'1"), a web developer and disability advocate holding multiple Guinness titles.
                                </p>
                            </section>

                            <section id="shortest-female-in-the-world" className="space-y-3 scroll-mt-24">
                                <h2 className="text-xl md:text-2xl font-black tracking-tight">Shortest Female in the World</h2>
                                <p className="text-muted leading-relaxed text-sm">
                                    Jyoti Amge of Nagpur, India has held the Guinness World Record for the shortest living woman since 2011 at 62.8 cm (2'1"). Her condition is achondroplasia, the most common form of dwarfism. She is also a working Bollywood actress who appeared in the US television series American Horror Story.
                                </p>
                            </section>
                        </div>

                        {/* Extreme Data Cards */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">Tallest man ever</span>
                                <span className="block font-bold text-foreground">Robert Wadlow</span>
                                <span className="block text-2xl font-black text-accent my-1">272 cm</span>
                                <span className="block text-xs font-medium text-muted">8'11" · USA · d. 1940</span>
                            </div>
                            <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">Shortest man ever</span>
                                <span className="block font-bold text-foreground">Chandra Bahadur Dangi</span>
                                <span className="block text-2xl font-black text-accent my-1">54.6 cm</span>
                                <span className="block text-xs font-medium text-muted">1'9" · Nepal · d. 2015</span>
                            </div>
                            <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">Tallest woman ever</span>
                                <span className="block font-bold text-foreground">Zeng Jinlian</span>
                                <span className="block text-2xl font-black text-accent my-1">246.3 cm</span>
                                <span className="block text-xs font-medium text-muted">8'1" · China · d. 1982</span>
                            </div>
                            <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm">
                                <span className="block text-xs font-bold text-muted uppercase tracking-widest mb-1">Shortest living woman</span>
                                <span className="block font-bold text-foreground">Jyoti Amge</span>
                                <span className="block text-2xl font-black text-accent my-1">62.8 cm</span>
                                <span className="block text-xs font-medium text-muted">2'1" · India</span>
                            </div>
                        </div>

                        <section id="human-height-distribution" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Human Height Distribution</h2>

                            <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
                                <Tabs options={["Male", "Female"]} active={bellSex} onChange={(val) => setBellSex(val as "Male" | "Female")} />
                                <BellCurve
                                    mean={BELL_CONFIG[bellSex].mean} sd={BELL_CONFIG[bellSex].sd}
                                    color={BELL_CONFIG[bellSex].color} bandColor={BELL_CONFIG[bellSex].bandColor}
                                    label={BELL_CONFIG[bellSex].label} pctLabel={BELL_CONFIG[bellSex].pctLabel}
                                />
                                <div className="flex gap-4 mt-4 flex-wrap">
                                    {BELL_CONFIG[bellSex].bands.map((b: any) => (
                                        <div key={b.label} className="flex items-center gap-2">
                                            <div style={{ background: b.col, borderColor: b.col }} className="w-4 h-4 rounded opacity-35 border" />
                                            <span className="text-[11.5px] text-muted">{b.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <p className="text-muted leading-relaxed">
                                Human height follows a normal distribution. When plotted across a large population, the data forms a near-perfect bell curve, most individuals fall close to the mean, with fewer people at either extreme. Roughly 68% of men fall within one standard deviation of the global mean, approximately 164 to 178 cm. The standard deviation for male height globally is approximately 7 cm. A man at 185 cm sits roughly two standard deviations above the global mean, taller than approximately 97.5% of the world's male population.
                            </p>
                            <p className="text-muted leading-relaxed">
                                For women it is slightly smaller at around 6 cm.
                            </p>

                            <div className="overflow-x-auto border border-border rounded-xl mt-4">
                                <table className="w-full text-sm text-center">
                                    <thead className="bg-bg border-b border-border text-foreground font-bold">
                                        <tr>
                                            <th className="px-4 py-3">−2 SD</th>
                                            <th className="px-4 py-3">−1 SD</th>
                                            <th className="px-4 py-3">Global Avg</th>
                                            <th className="px-4 py-3">+1 SD</th>
                                            <th className="px-4 py-3">+2 SD</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50 text-muted font-mono">
                                        {/* Male Row */}
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-4 py-3">157 cm</td>
                                            <td className="px-4 py-3">164 cm</td>
                                            <td className="px-4 py-3 font-black text-lg text-accent">
                                                171 cm
                                                <span className="block text-[10px] font-sans text-muted font-bold uppercase tracking-wider mt-0.5">Male</span>
                                            </td>
                                            <td className="px-4 py-3">178 cm</td>
                                            <td className="px-4 py-3">185 cm</td>
                                        </tr>
                                        {/* Female Row */}
                                        <tr className="hover:bg-bg/50 transition-colors">
                                            <td className="px-4 py-3">147 cm</td>
                                            <td className="px-4 py-3">153 cm</td>
                                            <td className="px-4 py-3 font-black text-lg text-accent">
                                                159 cm
                                                <span className="block text-[10px] font-sans text-muted font-bold uppercase tracking-wider mt-0.5">Female</span>
                                            </td>
                                            <td className="px-4 py-3">165 cm</td>
                                            <td className="px-4 py-3">171 cm</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-center text-muted mt-2">Global male height distribution · SD ≈ 7 cm </p>
                            <p className="text-xs text-center text-muted mt-2">Global female height distribution · SD ≈ 6 cm </p>
                            <p className="text-xs text-center text-muted mt-2">Sources : NCD -RisC </p>
                        </section>

                        <section id="why-average-height-differs-by-country" className="space-y-4 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Why Average Height Differs by Country</h2>
                            <p className="text-muted leading-relaxed">
                                Height is shaped by both genetics and environment. Genetics sets the theoretical ceiling, tall parents tend to produce taller children but whether a child reaches that ceiling depends almost entirely on what happens during the first two decades of life.
                            </p>
                            <p className="text-muted leading-relaxed">
                                <span className='font-bold text-accent hover:underline' >Nutrition </span> is the single strongest environmental determinant of adult height. Adequate protein and micronutrients during the first 1,000 days of life are critical to skeletal development. Dairy and meat availability in childhood consistently predicts national height rankings.
                            </p>
                            <p className="text-muted leading-relaxed">
                                <span className='font-bold text-accent hover:underline' > Healthcare access </span> determines whether childhood illnesses divert energy away from growth. Countries with strong vaccination rates and low disease burdens consistently rank taller.
                            </p>
                            <p className="text-muted leading-relaxed">
                                <span className='font-bold text-accent hover:underline' >Economic development </span>  underpins both nutrition and healthcare. GDP per capita correlates strongly with average height because wealth enables better food, cleaner water, and medical care.
                            </p>
                            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-xl mt-4">
                                <p className="text-sm font-medium text-foreground/80">
                                    The United States is the most telling case study: in 1914, American men ranked third tallest in the world. Today they sit around 47th globally, not because their genetics changed but because diet quality declined relative to European peers after the 1970s.
                                </p>
                            </div>
                        </section>

                        {/* FAQ Accordion Section */}
                        <div id="frequently-asked-questions" className="scroll-mt-24">
                            <FaqAccordion items={AVERAGE_HEIGHT_FAQ} />
                        </div>


                        {/* References Section */}
                        <div className="bg-surface border border-border rounded-3xl p-6 md:p-10 text-sm text-muted mt-8">
                            <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">Primary Data Sources</h3>
                            <ul className="space-y-3 break-words overflow-hidden mb-6">
                                <li>NCD Risk Factor Collaboration (NCD-RisC). A century of trends in adult human height. eLife, 2016. Vol. 5, e13410. doi: 10.7554/eLife.13410. <br /><a href="https://elifesciences.org/articles/13410" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://elifesciences.org/articles/13410</a></li>
                                <li>Rodriguez-Martinez A, Zhou B, Sophiea MK et al. (NCD-RisC). Height and body-mass index trajectories of school-aged children and adolescents from 1985 to 2019 in 200 countries and territories. The Lancet, 2020. Vol. 396, pp. 1511–1524. doi: 10.1016/S0140-6736(20)31859-6. <br /><a href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31859-6/fulltext" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31859-6/fulltext</a></li>
                                <li>World Health Organization. Child Growth Standards — Length/Height-for-Age, Weight-for-Age. WHO Department of Nutrition and Food Safety. Geneva, 2006. <br /><a href="https://www.who.int/tools/child-growth-standards" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.who.int/tools/child-growth-standards</a></li>
                                <li>World Health Organization. Global Health Observatory — Nutrition and Body Mass Index Data. WHO Global Health Observatory. Ongoing. <br /><a href="https://www.who.int/data/gho" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.who.int/data/gho</a></li>
                                <li>de Onis M, Garza C, Onyango AW, Martorell R (eds). WHO Child Growth Standards. Acta Paediatrica, 2006. Suppl 450:1–101. PMID: 16817523. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/16817523/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/16817523/</a></li>
                            </ul>

                            <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">US Government — CDC and NIH</h3>
                            <ul className="space-y-3 break-words overflow-hidden mb-6">
                                <li>Centers for Disease Control and Prevention. CDC Clinical Growth Charts, 2000 (Revised 2022). National Center for Health Statistics. <br /><a href="https://www.cdc.gov/growthcharts/clinical_charts.htm" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.cdc.gov/growthcharts/clinical_charts.htm</a></li>
                                <li>Kuczmarski RJ, Ogden CL, Guo SS et al. 2000 CDC Growth Charts for the United States: Methods and Development. Vital and Health Statistics. Series 11, No. 246, 2002. PMID: 15190009. <br /><a href="https://www.cdc.gov/nchs/data/series/sr_11/sr11_246.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.cdc.gov/nchs/data/series/sr_11/sr11_246.pdf</a></li>
                                <li>Centers for Disease Control and Prevention — NCHS. National Health and Nutrition Examination Survey (NHANES) — Anthropometric Data. Ongoing survey cycles. <br /><a href="https://www.cdc.gov/nchs/nhanes/index.htm" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.cdc.gov/nchs/nhanes/index.htm</a></li>
                                <li>Fryar CD, Gu Q, Ogden CL, Flegal KM. Anthropometric Reference Data for Children and Adults: United States, 2011–2014. Vital and Health Statistics. Series 3, No. 39, August 2016. PMID: 29446336. <br /><a href="https://www.cdc.gov/nchs/data/series/sr_03/sr03_039.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.cdc.gov/nchs/data/series/sr_03/sr03_039.pdf</a></li>
                                <li>National Institutes of Health — National Heart, Lung, and Blood Institute. Classification of Overweight and Obesity by BMI. NIH Publication No. 98-4083, 1998. <br /><a href="https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmi-m.htm" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmi-m.htm</a></li>
                            </ul>

                            <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">Peer-Reviewed Research Papers</h3>
                            <ul className="space-y-3 break-words overflow-hidden mb-6">
                                <li>Devine BJ. Gentamicin therapy. Drug Intelligence and Clinical Pharmacy, 1974. Vol. 8, pp. 650–655. (Original publication of the Devine ideal body weight formula.) <br /><a href="https://pubmed.ncbi.nlm.nih.gov/?term=Devine+BJ+gentamicin+1974+ideal+body+weight" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/?term=Devine+BJ+gentamicin+1974+ideal+body+weight</a></li>
                                <li>Robinson JD, Lupkiewicz SM, Palenik L, Lopez LM, Ariet M. Determination of ideal body weight for drug dosage calculations. American Journal of Hospital Pharmacy, 1983. Vol. 40, pp. 1016–1019. PMID: 6869387. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/6869387/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/6869387/</a></li>
                                <li>Pai MP, Paloucek FP. The origin of the "ideal" body weight equations. Annals of Pharmacotherapy, 2000. Vol. 34, No. 9, pp. 1066–1069. doi: 10.1345/aph.19381. PMID: 10981254. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/10981254/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/10981254/</a></li>
                                <li>Janmahasatian S, Duffull SB, Ash S, Ward LC, Byrne NM, Green B. Quantification of lean bodyweight. Clinical Pharmacokinetics, 2005. Vol. 44, No. 10, pp. 1051–1065. doi: 10.2165/00003088-200544100-00004. PMID: 16176118. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/16176118/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/16176118/</a></li>
                                <li>Stulp G, Buunk AP, Pollet TV. Human height is positively related to interpersonal dominance in dyadic interactions. PLOS ONE, 2013. Vol. 8, Issue 2. PMID: 23382931. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/23382931/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/23382931/</a></li>
                                <li>Flegal KM, Ogden CL, Wei R, Kuczmarski RL, Johnson CL. Prevalence of obesity in US adults by age and sex. JAMA, 2002. Vol. 288, pp. 1723–1727. doi: 10.1001/jama.288.14.1723. PMID: 12365955. <br /><a href="https://pubmed.ncbi.nlm.nih.gov/12365955/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/12365955/</a></li>
                            </ul>

                            <h3 className="font-bold text-foreground mb-4 uppercase tracking-widest text-xs">United Nations and International Bodies</h3>
                            <ul className="space-y-3 break-words overflow-hidden">
                                <li>UNICEF / WHO / World Bank. Joint Child Malnutrition Estimates — Levels and Trends. Edition 2023. <br /><a href="https://data.unicef.org/topic/nutrition/malnutrition/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://data.unicef.org/topic/nutrition/malnutrition/</a></li>
                                <li>Food and Agriculture Organization of the United Nations. The State of Food Security and Nutrition in the World 2023. FAO, IFAD, UNICEF, WFP, WHO. Rome, 2023. doi: 10.4060/cc3017en. <br /><a href="https://www.fao.org/publications/sofi/en/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.fao.org/publications/sofi/en/</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-surface border-t border-border mt-auto">
                <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/about" className="hover:text-foreground">About</Link>
                        <span className="text-border hidden sm:inline">|</span>
                        <Link href="/contact" className="hover:text-foreground">Contact</Link>
                        <span className="text-border hidden sm:inline">|</span>
                        <button className="hover:text-foreground">FAQ</button>
                        <span className="text-border hidden sm:inline">|</span>
                        <Link href="/terms" className="hover:text-foreground">Terms</Link>
                        <span className="text-border hidden sm:inline">|</span>
                        <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
                    </div>
                    <div>© 2026 HeightComparison. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}