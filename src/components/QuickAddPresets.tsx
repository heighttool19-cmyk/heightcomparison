'use client';

import React from 'react';
import { Sparkles, Activity, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { QUICK_ADD_PRESETS, Person, uid } from '../types';

interface QuickAddPresetsProps {
    onAdd: (person: Person) => void;
    scale: number;
    zoom: number;
}

const QuickAddPresets: React.FC<QuickAddPresetsProps> = ({ onAdd, scale, zoom }) => {
    const handlePresetClick = (preset: typeof QUICK_ADD_PRESETS[0]) => {
        onAdd({
            id: uid(),
            name: preset.name,
            heightCm: preset.heightCm,
            gender: preset.gender,
            color: '#6366F1', // Default indigo for presets
        });
    };

    return (
        <div className="flex flex-col bg-surface border-t border-border">
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-muted" />
                    <h2 className="text-xs uppercase tracking-[0.15em] font-black text-foreground/70">Quick Insertion</h2>
                </div>

                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        show: { transition: { staggerChildren: 0.05 } },
                        hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                    }}
                    className="flex flex-col gap-2"
                >
                    {QUICK_ADD_PRESETS.map((preset) => (
                        <motion.button
                            key={preset.name}
                            variants={{
                                show: { y: 0, opacity: 1 },
                                hidden: { y: 10, opacity: 0 }
                            }}
                            whileHover={{ scale: 1.02, x: 4, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePresetClick(preset)}
                            className="flex items-center justify-between p-3.5 rounded-2xl bg-background border border-border hover:border-accent/40 transition-all text-left shadow-sm group"
                        >
                            <span className="text-[11px] font-black text-foreground group-hover:text-accent transition-colors uppercase leading-none">
                                {preset.name}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono font-black text-foreground/50 uppercase">
                                    {preset.heightCm >= 1000 ? `${(preset.heightCm / 100).toFixed(1)}m` : `${preset.heightCm}cm`}
                                </span>
                                <Plus size={12} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            {/* Scale Info Footer */}
            <div className="mx-6 mb-6 p-4 rounded-2xl border border-border bg-background flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                    <Activity size={12} className="text-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">SCALE INFO</span>
                </div>
                <div className="space-y-1.5 font-mono text-[10px] font-black text-accent uppercase opacity-80">
                    <div className="flex justify-between">
                        <span>1 cm =</span>
                        <span>{scale.toFixed(4)} px</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Fit scale =</span>
                        <span>{(scale / zoom).toFixed(4)} px/cm</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Zoom =</span>
                        <span>{Math.round(zoom * 100)}%</span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default QuickAddPresets;

