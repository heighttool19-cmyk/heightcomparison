'use client';

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from 'framer-motion';

const GEORGIA = "'Georgia', serif";

// CDC Growth Chart Data (cm) — P3, P50 (Median), P97
const boysData = [
    { age: 2, p3: 81.7, p50: 87.1, p97: 93.0 },
    { age: 3, p3: 88.7, p50: 95.3, p97: 102.1 },
    { age: 4, p3: 94.9, p50: 102.3, p97: 109.9 },
    { age: 5, p3: 100.7, p50: 109.2, p97: 117.0 },
    { age: 6, p3: 106.1, p50: 115.7, p97: 124.2 },
    { age: 7, p3: 111.2, p50: 121.7, p97: 131.0 },
    { age: 8, p3: 116.0, p50: 127.3, p97: 137.5 },
    { age: 9, p3: 120.5, p50: 132.6, p97: 143.8 },
    { age: 10, p3: 124.9, p50: 137.8, p97: 150.0 },
    { age: 11, p3: 129.5, p50: 143.5, p97: 156.7 },
    { age: 12, p3: 134.2, p50: 149.1, p97: 163.9 },
    { age: 13, p3: 139.3, p50: 155.3, p97: 171.3 },
    { age: 14, p3: 145.1, p50: 162.4, p97: 178.4 },
    { age: 15, p3: 151.2, p50: 167.0, p97: 182.9 },
    { age: 16, p3: 155.3, p50: 170.1, p97: 185.4 },
    { age: 17, p3: 157.5, p50: 171.6, p97: 186.8 },
    { age: 18, p3: 158.5, p50: 172.2, p97: 187.3 },
];

const girlsData = [
    { age: 2, p3: 80.0, p50: 85.7, p97: 91.7 },
    { age: 3, p3: 87.4, p50: 94.1, p97: 100.9 },
    { age: 4, p3: 94.1, p50: 101.2, p97: 108.4 },
    { age: 5, p3: 99.9, p50: 108.0, p97: 116.2 },
    { age: 6, p3: 105.3, p50: 114.6, p97: 123.5 },
    { age: 7, p3: 110.3, p50: 120.6, p97: 130.6 },
    { age: 8, p3: 115.2, p50: 126.6, p97: 138.0 },
    { age: 9, p3: 120.2, p50: 132.5, p97: 145.0 },
    { age: 10, p3: 125.4, p50: 138.3, p97: 151.7 },
    { age: 11, p3: 130.7, p50: 144.2, p97: 157.7 },
    { age: 12, p3: 136.5, p50: 150.0, p97: 163.4 },
    { age: 13, p3: 141.5, p50: 154.5, p97: 167.5 },
    { age: 14, p3: 144.8, p50: 157.3, p97: 169.8 },
    { age: 15, p3: 146.5, p50: 158.9, p97: 171.2 },
    { age: 16, p3: 147.3, p50: 159.6, p97: 171.9 },
    { age: 17, p3: 147.5, p50: 160.0, p97: 172.2 },
    { age: 18, p3: 147.6, p50: 160.1, p97: 172.3 },
];

const tableData = [
    { age: 2, boysAvg: 87.1, boysMedian: 87.1, girlsAvg: 85.7, girlsMedian: 85.7 },
    { age: 3, boysAvg: 95.3, boysMedian: 95.3, girlsAvg: 94.1, girlsMedian: 94.1 },
    { age: 4, boysAvg: 102.3, boysMedian: 102.3, girlsAvg: 101.2, girlsMedian: 101.2 },
    { age: 5, boysAvg: 109.2, boysMedian: 109.2, girlsAvg: 108.0, girlsMedian: 108.0 },
    { age: 6, boysAvg: 115.7, boysMedian: 115.7, girlsAvg: 114.6, girlsMedian: 114.6 },
    { age: 7, boysAvg: 121.7, boysMedian: 121.7, girlsAvg: 120.6, girlsMedian: 120.6 },
    { age: 8, boysAvg: 127.3, boysMedian: 127.3, girlsAvg: 126.6, girlsMedian: 126.6 },
    { age: 9, boysAvg: 132.6, boysMedian: 132.6, girlsAvg: 132.5, girlsMedian: 132.5 },
    { age: 10, boysAvg: 137.8, boysMedian: 137.8, girlsAvg: 138.3, girlsMedian: 138.3 },
    { age: 11, boysAvg: 143.5, boysMedian: 143.5, girlsAvg: 144.2, girlsMedian: 144.2 },
    { age: 12, boysAvg: 149.1, boysMedian: 149.1, girlsAvg: 150.0, girlsMedian: 150.0 },
    { age: 13, boysAvg: 155.3, boysMedian: 155.3, girlsAvg: 154.5, girlsMedian: 154.5 },
    { age: 14, boysAvg: 162.4, boysMedian: 162.4, girlsAvg: 157.3, girlsMedian: 157.3 },
    { age: 15, boysAvg: 167.0, boysMedian: 167.0, girlsAvg: 158.9, girlsMedian: 158.9 },
    { age: 16, boysAvg: 170.1, boysMedian: 170.1, girlsAvg: 159.6, girlsMedian: 159.6 },
    { age: 17, boysAvg: 171.6, boysMedian: 171.6, girlsAvg: 160.0, girlsMedian: 160.0 },
    { age: 18, boysAvg: 172.2, boysMedian: 172.2, girlsAvg: 160.1, girlsMedian: 160.1 },
];

const toFt = (cm: number) => {
    const totalIn = cm / 2.54;
    const ft = Math.floor(totalIn / 12);
    const inch = Math.round(totalIn % 12);
    return `${ft}'${inch}"`;
};

interface TooltipPayload {
    color: string;
    name: string;
    value: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string | number;
}
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="bg-surface/95 backdrop-blur-md border border-[#e94560] rounded-xl p-2 sm:p-4 shadow-[0_0_15px_rgba(233,69,96,0.15)] max-w-[180px] sm:max-w-none z-50 relative"
                style={{ fontFamily: GEORGIA }}
            >
                <p className="font-bold text-[#e94560] mb-1 sm:mb-2 text-xs sm:text-base">Age {label}</p>
                <div className="space-y-0.5 sm:space-y-1">
                    {payload.map((p: TooltipPayload, i: number) => (
                        <div key={i} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                            <span className="text-muted truncate">{p.name.split(' (')[0]}:</span>
                            <span className="font-bold whitespace-nowrap" style={{ color: p.color }}>{p.value} cm</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};
export default function HeightCharts() {
    const [activeChart, setActiveChart] = useState<"boys" | "girls">("boys");
    const [activeView, setActiveView] = useState<"chart" | "table">("chart");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkMobile = () => setIsMobile(window.innerWidth < 768);
            checkMobile();
            window.addEventListener('resize', checkMobile);
            return () => window.removeEventListener('resize', checkMobile);
        }
    }, []);

    const data = activeChart === "boys" ? boysData : girlsData;
    const color1 = activeChart === "boys" ? "#3b82f6" : "#ec4899";
    const color2 = activeChart === "boys" ? "#06b6d4" : "#f59e0b";
    const color3 = activeChart === "boys" ? "#8b5cf6" : "#10b981";
    const label = activeChart === "boys" ? "Boys" : "Girls";

    return (
        <div className="space-y-6 mt-12" style={{ fontFamily: GEORGIA }}>
            <h2 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight">
                Boys & Girls <span className={activeChart === "boys" ? "text-blue-500" : "text-pink-500"}>Height Growth Charts</span>
            </h2>
            <div className="h-1.5 w-24 bg-accent rounded-full" />
            <p className="text-muted leading-relaxed max-w-3xl">
                Based on CDC growth chart data — average & median height by age (ages 2–18) — cm
            </p>

            <div className="bg-bg border border-border rounded-[2.5rem] p-4 sm:p-6 md:p-10 relative overflow-hidden group shadow-sm transition-colors duration-500">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-1000" />
                <div className="relative z-10 mx-auto space-y-8">

                    {/* Toggles */}
                    <div className="flex flex-col sm:flex-col items-center justify-center gap-6 pt-4">
                        <div className="bg-bg border border-border p-1 rounded-full flex">
                            {["boys", "girls"].map(g => (
                                <button
                                    key={g}
                                    onClick={() => setActiveChart(g as "boys" | "girls")}
                                    className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${activeChart === g
                                        ? (g === "boys" ? "bg-blue-500 text-white shadow-md shadow-blue-500/25" : "bg-pink-500 text-white shadow-md shadow-pink-500/25")
                                        : "text-muted hover:text-foreground"
                                        } capitalize flex items-center gap-2`}
                                    style={{ fontFamily: GEORGIA }}
                                >
                                    {g === "boys" ? "👦 Boys" : "👧 Girls"}
                                </button>
                            ))}
                        </div>

                        <div className="bg-bg border border-border p-1 rounded-xl flex text-sm">
                            {["chart", "table"].map(v => (
                                <button
                                    key={v}
                                    onClick={() => setActiveView(v as "chart" | "table")}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeView === v
                                        ? "bg-accent/10 border border-accent/20 text-accent"
                                        : "text-muted hover:text-foreground"
                                        } capitalize flex items-center gap-2`}
                                    style={{ fontFamily: GEORGIA }}
                                >
                                    {v === "chart" ? "📈 Growth Chart" : "📊 Data Table"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">

                        {/* CHART VIEW */}
                        {activeView === "chart" && (
                            <motion.div
                                key="chart"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-bg border border-border rounded-3xl p-4 sm:p-6 md:p-8"
                            >
                                <h3 className="text-center font-bold text-foreground mb-4 text-xl sm:text-2xl" style={{ fontFamily: GEORGIA }}>
                                    {label} Height Percentile Chart (Ages 2–18)
                                </h3>

                                {/* Massively increased height for visibility */}
                                <div className="h-[500px] sm:h-[600px] md:h-[700px] w-full mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            data={data}
                                            margin={isMobile
                                                ? { top: 20, right: 15, left: 15, bottom: 120 }
                                                : { top: 20, right: 30, left: 15, bottom: 60 }
                                            }
                                            style={{ fontFamily: GEORGIA }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" stroke="#888888" strokeOpacity={0.15} vertical={false} />
                                            <XAxis
                                                dataKey="age"
                                                stroke="#888888"
                                                tick={{ fill: "#888888", fontSize: isMobile ? 12 : 14, fontFamily: GEORGIA, fontWeight: 600 }}
                                                tickMargin={isMobile ? 8 : 12}
                                                label={{
                                                    value: 'Age (years)',
                                                    position: 'bottom',
                                                    offset: isMobile ? 0 : 10,
                                                    fill: '#888888',
                                                    fontSize: isMobile ? 13 : 15,
                                                    fontFamily: GEORGIA,
                                                    fontWeight: 700
                                                }}
                                            />
                                            <YAxis
                                                stroke="#888888"
                                                tick={{ fill: "#888888", fontSize: isMobile ? 12 : 14, fontFamily: GEORGIA, fontWeight: 600 }}
                                                domain={[70, 200]}
                                                tickMargin={isMobile ? 5 : 10}
                                                tickCount={14}
                                                label={{
                                                    value: 'Height (cm)',
                                                    angle: -90,
                                                    position: 'insideLeft',
                                                    offset: isMobile ? 5 : 0,
                                                    fill: '#888888',
                                                    fontSize: isMobile ? 13 : 15,
                                                    style: { textAnchor: 'middle' },
                                                    fontFamily: GEORGIA,
                                                    fontWeight: 700
                                                }}
                                            />
                                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                                            <Legend
                                                wrapperStyle={{
                                                    paddingTop: isMobile ? "20px" : "30px",
                                                    fontSize: isMobile ? "11px" : "14px",
                                                    fontFamily: GEORGIA,
                                                    fontWeight: 600,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: isMobile ? "column" : "row",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    gap: isMobile ? "6px" : "16px",
                                                    whiteSpace: isMobile ? "normal" : "nowrap"
                                                }}
                                                layout={isMobile ? "vertical" : "horizontal"}
                                                verticalAlign="bottom"
                                                align="center"
                                                iconSize={isMobile ? 12 : 14}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="p3"
                                                name="3rd Percentile (Short Range)"
                                                stroke={color3}
                                                strokeWidth={isMobile ? 2.5 : 3}
                                                strokeDasharray="6 6"
                                                dot={{ r: isMobile ? 2 : 3, fill: color3, strokeDasharray: 'none' }}
                                                activeDot={{ r: 6, strokeDasharray: 'none' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="p50"
                                                name="50th Percentile (Average/Median)"
                                                stroke={color1}
                                                strokeWidth={isMobile ? 4 : 5}
                                                dot={{ r: isMobile ? 3 : 4, fill: color1 }}
                                                activeDot={{ r: isMobile ? 8 : 10 }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="p97"
                                                name="97th Percentile (Tall Range)"
                                                stroke={color2}
                                                strokeWidth={isMobile ? 2.5 : 3}
                                                strokeDasharray="6 6"
                                                dot={{ r: isMobile ? 2 : 3, fill: color2, strokeDasharray: 'none' }}
                                                activeDot={{ r: 6, strokeDasharray: 'none' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="text-center text-[10px] sm:text-xs text-muted mt-8 sm:mt-10 uppercase tracking-wider font-bold" style={{ fontFamily: GEORGIA }}>
                                    Source: CDC Growth Charts — National Center for Health Statistics
                                </p>
                            </motion.div>
                        )}

                        {/* TABLE VIEW */}
                        {activeView === "table" && (
                            <motion.div
                                key="table"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-bg border border-border rounded-3xl p-6 overflow-x-auto"
                            >
                                <h3 className="text-center font-bold text-foreground mb-6 text-lg" style={{ fontFamily: GEORGIA }}>
                                    Average & Median Height by Age (cm)
                                </h3>
                                <table className="w-full text-left min-w-[600px] border-collapse" style={{ fontFamily: GEORGIA }}>
                                    <thead>
                                        <tr className="border-b-2 border-border">
                                            {["Age", "Boys Avg (cm)", "Boys Avg (ft)", "Boys Median", "Girls Avg (cm)", "Girls Avg (ft)", "Girls Median"].map(h => (
                                                <th key={h} className="py-4 px-2 sm:px-2 font-bold text-muted text-[10px] sm:text-xs md:text-sm">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50 text-sm">
                                        {tableData.map((row) => (
                                            <tr key={row.age} className="hover:bg-surface/50 transition-colors">
                                                <td className="py-3 px-1 font-black text-[#e94560]">{row.age} yrs</td>
                                                <td className="py-3 px-4 text-[#2660ea] font-semibold">{row.boysAvg}</td>
                                                <td className="py-3 px-4 text-[#2fd9f5] font-medium text-xs font-mono">{toFt(row.boysAvg)}</td>
                                                <td className="py-3 px-4 text-[#455eee] font-semibold">{row.boysMedian}</td>
                                                <td className="py-3 px-4 text-[#e94958] font-semibold">{row.girlsAvg}</td>
                                                <td className="py-3 px-4 text-[#bf964f] font-medium text-xs font-mono">{toFt(row.girlsAvg)}</td>
                                                <td className="py-3 px-4 text-[#72f7b4] font-semibold">{row.girlsMedian}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="text-center text-xs text-muted mt-6 uppercase tracking-wider font-bold" style={{ fontFamily: GEORGIA }}>
                                    Source: CDC Growth Charts — National Center for Health Statistics
                                </p>
                            </motion.div>
                        )}

                    </AnimatePresence>

                    {/* Insight Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                        {[
                            { label: "Boys stop growing", value: "~18 yrs", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                            { label: "Girls stop growing", value: "~15-16 yrs", color: "text-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/20" },
                            { label: "Boys median adult height", value: "172.2 cm", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
                            { label: "Girls median adult height", value: "160.1 cm", color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20" },
                        ].map(card => (
                            <div key={card.label} className={`p-2 rounded-2xl border ${card.border} ${card.bg} text-center`} style={{ fontFamily: GEORGIA }}>
                                <div className={`text-xl font-black ${card.color} mb-1`}>{card.value}</div>
                                <div className="text-xs font-semibold text-muted tracking-wide">{card.label}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}