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
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Camera className="w-5 h-5 text-accent" /> Image Measurement
                </h2>
                <p className="text-sm text-foreground/60 mt-1">Calibrate with a known object, then measure.</p>
            </div>
            {calculatedHeight > 0 && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-end gap-2">
                    <div className="flex flex-col items-end leading-tight">
                        <span className="text-[10px] uppercase tracking-widest text-primary/40 font-black">Measured Height</span>
                        <div className="text-3xl font-black text-primary flex items-baseline gap-1">
                            {unitSystem === 'metric' ? calculatedHeight.toFixed(1) : (calculatedHeight / 30.48).toFixed(2)}
                            <span className="text-sm font-bold opacity-40">{unitSystem === 'metric' ? 'cm' : 'ft'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {!isSavedToChart ? (
                            <button
                                onClick={handleSaveToChart}
                                className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                <Box className="w-3.5 h-3.5" /> Save to Chart
                            </button>
                        ) : (
                            <Link href="/" className="flex items-center gap-2 bg-surface border border-accent text-accent px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-accent/5 transition-all">
                                <BarChart2 className="w-3.5 h-3.5" /> View Chart
                            </Link>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
};
