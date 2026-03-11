'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, User } from 'lucide-react';
import NextImage from 'next/image';
import { Gender, COLOR_PALETTE } from '@/types';

interface SaveToChartModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: (details: { name: string; gender: Gender; color: string }) => void;
    photoUrl: string | null;
    heightCm: number;
    unitSystem: 'metric' | 'imperial';
}

export const SaveToChartModal: React.FC<SaveToChartModalProps> = ({
    show,
    onClose,
    onConfirm,
    photoUrl,
    heightCm,
    unitSystem
}) => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState<Gender>('male');
    const [color, setColor] = useState(COLOR_PALETTE[0]);

    if (!show) return null;

    const formattedHeight = unitSystem === 'metric'
        ? `${heightCm.toFixed(1)} cm`
        : `${(heightCm / 30.48).toFixed(2)} ft`;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
                <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                    className="bg-surface border border-border p-8 rounded-[2rem] shadow-2xl max-w-md w-full flex flex-col gap-6 relative overflow-hidden"
                    onClick={e => e.stopPropagation()}>

                    <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" />

                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black uppercase tracking-widest text-foreground">Save to Chart</h3>
                        <button onClick={onClose} className="p-2 hover:bg-bg rounded-full transition-colors">
                            <X className="w-5 h-5 text-muted" />
                        </button>
                    </div>

                    <div className="flex gap-6 items-start">
                        {photoUrl ? (
                            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-accent/20 bg-bg shrink-0 shadow-inner relative">
                                <NextImage src={photoUrl} alt="Measured subject" fill className="object-cover" unoptimized />
                            </div>
                        ) : (
                            <div className="w-24 h-24 rounded-2xl bg-bg border-2 border-dashed border-border flex items-center justify-center shrink-0">
                                <User className="w-8 h-8 text-muted/30" />
                            </div>
                        )}
                        <div className="flex flex-col justify-center gap-1">
                            <span className="text-[10px] uppercase font-black tracking-widest text-accent/60">Measured Height</span>
                            <span className="text-2xl font-black text-foreground">{formattedHeight}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60 ml-0.5">Custom Name</label>
                            <input
                                type="text"
                                placeholder="e.g. My Door, Office Chair"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/30 focus:outline-none focus:border-accent transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60 ml-0.5">Gender / Category</label>
                            <div className="flex p-1 bg-bg rounded-xl border border-border">
                                {(['male', 'female', 'other'] as Gender[]).map(g => (
                                    <button
                                        key={g}
                                        onClick={() => setGender(g)}
                                        className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${gender === g ? 'bg-accent text-white shadow-lg' : 'text-muted hover:text-foreground'
                                            }`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60 ml-0.5">Pick a Color</label>
                            <div className="flex gap-2 justify-between">
                                {COLOR_PALETTE.slice(0, 8).map((c: string) => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={`w-7 h-7 rounded-full border-2 transition-all ${color === c ? 'border-foreground scale-110' : 'border-transparent opacity-40 hover:opacity-100'
                                            }`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button onClick={onClose}
                            className="flex-1 py-3.5 rounded-xl border border-border text-muted font-bold hover:text-foreground transition-all">
                            Cancel
                        </button>
                        <button
                            onClick={() => onConfirm({ name: name.trim() || 'Measured Object', gender, color })}
                            className="flex-1 bg-accent text-white font-black py-3.5 rounded-xl hover:brightness-110 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg shadow-accent/20 active:scale-95"
                        >
                            <Check className="w-4 h-4" /> Add to Chart
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
