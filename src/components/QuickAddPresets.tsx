'use client';

import React from 'react';
import { Sparkles, Activity } from 'lucide-react';
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
        <div className="flex flex-col bg-surface/50 border-t border-border">
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-muted" />
                    <h2 className="text-xs uppercase tracking-[0.15em] font-black text-foreground/70">Quick Insertion</h2>
                </div>

                <div className="flex flex-col gap-2">
                    {QUICK_ADD_PRESETS.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() => handlePresetClick(preset)}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-background border border-border hover:border-accent hover:bg-surface/50 transition-all text-left shadow-sm group"
                        >
                            <span className="text-[11px] font-black text-foreground group-hover:text-accent transition-colors uppercase leading-none">
                                {preset.name}
                            </span>
                            <span className="text-[10px] font-mono font-black text-foreground/50 uppercase">
                                {preset.heightCm >= 1000 ? `${(preset.heightCm / 100).toFixed(1)}m` : `${preset.heightCm}cm`}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Scale Info Footer - Exact match to Week 2 Requirements */}
            <div className="mx-6 mb-6 p-4 rounded-xl border border-border bg-background flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                    <Activity size={12} className="text-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">SCALE INFO</span>
                </div>
                <div className="space-y-1.5 font-mono text-[10px] font-black text-accent uppercase">
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

