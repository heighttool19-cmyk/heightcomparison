'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Person } from '../types';
import { useUnitStore } from '../store';
import PersonBar from './PersonBar';
import Ruler from './Ruler';

interface CompactComparisonChartProps {
    persons: Person[];
    onClose: () => void;
    title?: string;
    subtitle?: string;
    resultValue?: string;
}

const CompactComparisonChart: React.FC<CompactComparisonChartProps> = ({
    persons,
    onClose,
    subtitle = "Height comparison based on prediction",
    resultValue
}) => {
    const { unitSystem } = useUnitStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const [canvasHeight, setCanvasHeight] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setCanvasHeight(entry.contentRect.height);
            }
        });
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    const scale = useMemo(() => {
        if (canvasHeight === 0) return 0;
        const heights = persons.length > 0 ? persons.map(p => p.heightCm) : [0];
        const maxHeightCm = Math.max(210, ...heights);
        // Reserve space for padding (top labels etc)
        const fitScale = Math.max(0, (canvasHeight - 180) / maxHeightCm);
        return fitScale;
    }, [canvasHeight, persons]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#111111] p-4 md:p-10 font-sans overflow-y-auto"
        >
            <div className="max-w-4xl mx-auto w-full flex flex-col h-full min-h-[850px]">
                {/* Header Area */}
                <div className="flex items-start justify-between mb-8 md:mb-12">
                    <div className="space-y-1">
                        <p className="text-[14px] md:text-[16px] font-black text-[#10b981] uppercase tracking-[0.2em]">ADULT HEIGHT PREDICTION</p>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
                            {resultValue || "Predicted Height"}
                        </h2>
                        <p className="text-[#888888] text-sm md:text-base font-medium mt-2">{subtitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#1A1A1A] border border-white/10 flex flex-col items-center justify-center gap-1 text-[#888888] hover:text-white transition-all active:scale-95 shadow-2xl group"
                    >
                        <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span className="text-[8px] font-black uppercase tracking-tighter">Close Chart</span>
                    </button>
                </div>

                {/* Main Canvas Area */}
                <div
                    ref={containerRef}
                    className="flex-1 relative bg-[#0A0A0A] border border-white/5 rounded-[2rem] overflow-hidden flex flex-col justify-end p-6 md:p-12 shadow-2xl mb-8 min-h-[450px]"
                >
                    {/* Grid Lines (Subtle) */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Ruler and Persons */}
                    <div className="relative w-full h-full flex items-end justify-center">
                        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                            <Ruler scale={scale} maxHeightCm={300} canvasHeight={canvasHeight} />
                        </div>

                        <div className="flex items-end gap-10 md:gap-24 pb-[60px] relative z-10 w-full justify-center">
                            {persons.map((person) => (
                                <PersonBar
                                    key={person.id}
                                    person={person}
                                    scale={scale}
                                    zoom={1.0}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Entities List - Icon Style as per reference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {persons.map(p => (
                        <div key={p.id} className="flex items-center gap-4 bg-[#1A1A1A] border border-white/5 p-5 rounded-[1.5rem] shadow-lg">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center p-0.5" style={{ backgroundColor: `${p.color}20` }}>
                                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-black text-[10px]" style={{ backgroundColor: p.color }}>
                                    {p.isEntity ? (p.icon ? "" : p.name.charAt(0)) : (p.name === 'Father' ? 'F' : p.name === 'Mother' ? 'M' : 'C')}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-black text-white uppercase tracking-widest">{p.name}</span>
                                <span className="text-[11px] font-bold text-[#888888] uppercase tracking-tight">
                                    {unitSystem === 'metric' ? `${p.heightCm.toFixed(1)} CM` : `${Math.floor(p.heightCm / 30.48)}' ${Math.round((p.heightCm % 30.48) / 2.54)}"`}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default CompactComparisonChart;
