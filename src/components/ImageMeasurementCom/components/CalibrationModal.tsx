'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Target, Check, X } from 'lucide-react';
import { cn } from '../../../../lib/utils';

interface CalibrationModalProps {
    showCalibModal: boolean;
    calibCm: string;
    setCalibCm: (val: string) => void;
    applyPreset: (cm: number, label: string) => void;
    confirmCalib: () => void;
    cancelCalib: () => void;
}

export const CalibrationModal: React.FC<CalibrationModalProps> = ({
    showCalibModal,
    calibCm,
    setCalibCm,
    applyPreset,
    confirmCalib,
    cancelCalib,
}) => {
    return (
        <AnimatePresence>
            {showCalibModal && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-black/30 backdrop-blur-[3px]">
                    <motion.div initial={{ scale: 0.93, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.93, y: 16 }}
                        className="bg-surface border border-border p-7 rounded-3xl shadow-2xl max-w-sm w-full flex flex-col gap-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-accent rounded-t-3xl" />
                        <h3 className="font-bold text-base flex items-center gap-2 mt-1">
                            <Ruler className="w-4 h-4 text-accent" /> Set Reference Size
                        </h3>
                        <p className="text-xs text-foreground/60">Enter the real-world length of the line you just drew.</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { cm: 203, label: 'Door' },
                                { cm: 8.56, label: 'ID Card' },
                                { cm: 29.7, label: 'A4 Paper' },
                                { cm: 100, label: '1 Metre' }
                            ].map(p => (
                                <button key={p.label} onClick={() => applyPreset(p.cm, p.label)}
                                    className={cn("px-3 py-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1.5 transition-all",
                                        calibCm === String(p.cm) ? "border-accent text-accent bg-accent/10" : "border-border text-muted hover:border-accent/40 hover:text-foreground")}>
                                    <Target className="w-3 h-3" /> {p.label}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <input type="number" value={calibCm} onChange={e => setCalibCm(e.target.value)}
                                className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-accent font-black outline-none focus:border-accent transition-all pr-14 focus:ring-1 focus:ring-accent/20" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-foreground/40">CM</span>
                        </div>
                        <div className="flex gap-3 mt-1">
                            <button onClick={cancelCalib}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-bg text-muted hover:text-red-400 hover:border-red-400/30 transition-all text-xs font-bold">
                                <X className="w-3.5 h-3.5" /> Cancel
                            </button>
                            <button onClick={confirmCalib}
                                className="flex-1 bg-accent text-white font-black py-3 rounded-xl hover:bg-accent/90 transition-all uppercase tracking-widest text-xs shadow-lg shadow-accent/20 active:scale-95 flex items-center justify-center gap-2">
                                <Check className="w-3.5 h-3.5" /> Confirm
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
