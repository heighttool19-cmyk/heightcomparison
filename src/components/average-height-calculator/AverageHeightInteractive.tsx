'use client';

import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import ReactCountryFlag from "react-country-flag";
import { useUnitStore } from '@/store';
import { BLUE, TEAL, AMBER, RED } from '@/constants/colors';
import { TOP10, BOT10, MVF, BELL_CONFIG, heightData, REGIONS } from '@/constants/averageHeight';

// --- Sub-components (extracted from page.tsx) ---

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


// --- Main Interactive Component ---

export default function AverageHeightInteractive() {
    const { unitSystem, setUnitSystem } = useUnitStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof typeof heightData[0] | null, direction: 'asc' | 'desc' }>({ key: 'rank', direction: 'asc' });

    const [tallTab, setTallTab] = useState("Men");
    const [shortTab, setShortTab] = useState("Men");
    const [mvfView, setMvfView] = useState("Tallest vs Shortest");
    const [bellSex, setBellSex] = useState<"Male" | "Female">("Male");

    const cmToFtIn = (cm: number) => {
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        return `${feet}'${inches}"`;
    };

    const handleSort = (key: keyof typeof heightData[0]) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedData = useMemo(() => {
        const sortableItems = heightData.filter(c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key!] < b[sortConfig.key!]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key!] > b[sortConfig.key!]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [searchQuery, sortConfig]);

    const maleTop10 = TOP10.map(c => ({ n: c.name, code: c.code, v: c.male }));
    const femTop10 = TOP10.map(c => ({ n: c.name, code: c.code, v: c.female }));
    const maleBot10 = BOT10.map(c => ({ n: c.name, code: c.code, v: c.male }));
    const femBot10 = BOT10.map(c => ({ n: c.name, code: c.code, v: c.female }));

    return (
        <div className="flex flex-col gap-12">
            {/* Global Table Section */}
            <section className="scroll-mt-24">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight">Average Height by Country (Global Table)</h2>
                    <div className="bg-bg border border-border p-1 rounded-full flex items-center shadow-sm shrink-0">
                        <button onClick={() => setUnitSystem('metric')} className={`px-4 py-1.5 rounded-full text-xs font-black transition-colors ${unitSystem === 'metric' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}>Metric (cm)</button>
                        <button onClick={() => setUnitSystem('imperial')} className={`px-4 py-1.5 rounded-full text-xs font-black transition-colors ${unitSystem === 'imperial' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}>US (ft/in)</button>
                    </div>
                </div>

                <p className="text-muted leading-relaxed mb-6">
                    The table below shows average male height by country, average female height, and combined average across 46 nations. Click any column header to sort. Use the search field to find a specific country.
                </p>

                <div className="bg-surface border border-border p-4 rounded-3xl shadow-sm mb-8">
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
                                        <td colSpan={4} className="px-6 py-8 text-center text-muted">No countries found matching &quot;{searchQuery}&quot;</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Tallest countries bar charts */}
            <section id="tallest-countries-in-the-world" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Tallest Countries in the World</h2>
                <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
                    <Tabs options={["Men", "Women"]} active={tallTab} onChange={setTallTab} />
                    <Bars
                        items={tallTab === "Men" ? maleTop10 : femTop10}
                        color={tallTab === "Men" ? BLUE : TEAL}
                        label={`Top 10 tallest nations — ${tallTab === "Men" ? "Average male" : "Average female"} height (cm)`}
                    />
                </div>
            </section>

            {/* Shortest countries bar charts */}
            <section id="shortest-countries-in-the-world" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Shortest Countries in the World</h2>
                <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
                    <Tabs options={["Men", "Women"]} active={shortTab} onChange={setShortTab} />
                    <Bars
                        items={shortTab === "Men" ? maleBot10 : femBot10}
                        color={shortTab === "Men" ? AMBER : RED}
                        label={`10 shortest nations — ${shortTab === "Men" ? "Average male" : "Average female"} height (cm)`}
                    />
                </div>
            </section>

            {/* Grouped Comparison Charts */}
            <section id="tallest-and-shortest-countries-by-average-height" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Tallest and Shortest Countries by Average Height</h2>
                <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
                    <Tabs options={["Tallest vs Shortest", "Top 10 tallest", "Bottom 10 shortest"]} active={mvfView} onChange={setMvfView} />
                    {mvfView === "Tallest vs Shortest" && <GroupedChart data={MVF} title="10 countries spanning the full global height range — male (blue) and female (teal)" />}
                    {mvfView === "Top 10 tallest" && <GroupedChart data={TOP10.map(c => ({ n: c.name, code: c.code, m: c.male, w: c.female }))} title="Top 10 tallest nations — male vs female" />}
                    {mvfView === "Bottom 10 shortest" && <GroupedChart data={BOT10.map(c => ({ n: c.name, code: c.code, m: c.male, w: c.female }))} title="10 shortest nations — male vs female" />}
                </div>
            </section>

            {/* Regional Map section */}
            <section id="global-average-height" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Global Average Height</h2>
                <RegionMap />
            </section>

            {/* Bell Curve distribution */}
            {/* Bell Curve distribution */}
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
                        {BELL_CONFIG[bellSex].bands.map((b: { col: string, label: string }) => (
                            <div key={b.label} className="flex items-center gap-2">
                                <div style={{ background: b.col, borderColor: b.col }} className="w-4 h-4 rounded opacity-35 border" />
                                <span className="text-[11.5px] text-muted">{b.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
