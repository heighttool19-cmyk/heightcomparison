'use client';

import React from 'react';
import { Camera, Box, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeaderProps {
    calculatedHeight: number;
    unitSystem: 'metric' | 'imperial';
    isSavedToChart: boolean;
    handleSaveToChart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    calculatedHeight,
    unitSystem,
    isSavedToChart,
    handleSaveToChart
}) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-lg sm:text-xl font-black text-foreground flex items-center gap-2 uppercase tracking-tight">
                    <Camera className="w-5 h-5 text-accent" /> Image Measurement
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60 font-medium">Calibrate with a known object, then measure.</p>
            </div>
            {calculatedHeight > 0 && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 sm:gap-2 bg-accent/5 sm:bg-transparent p-3 sm:p-0 rounded-2xl border border-accent/10 sm:border-0">
                    <div className="flex flex-col items-start sm:items-end leading-tight">
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-primary/40 font-black">Measured Height</span>
                        <div className="text-2xl sm:text-3xl font-black text-primary flex items-baseline gap-1">
                            {unitSystem === 'metric' ? calculatedHeight.toFixed(1) : (calculatedHeight / 30.48).toFixed(2)}
                            <span className="text-xs sm:text-sm font-bold opacity-40">{unitSystem === 'metric' ? 'cm' : 'ft'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {!isSavedToChart ? (
                            <button
                                onClick={handleSaveToChart}
                                className="flex items-center gap-2 bg-accent text-white px-3 sm:px-4 h-9 sm:h-10 py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                Save to Chart
                            </button>
                        ) : (
                            <Link href="/" className="flex items-center gap-2 bg-surface border border-accent text-accent px-3 sm:px-4 h-9 sm:h-10 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest hover:bg-accent/5 transition-all">
                                <BarChart2 className="w-3.5 h-3.5" /> View Chart
                            </Link>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
};
