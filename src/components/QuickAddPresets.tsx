'use client';

import React from 'react';
import { Sparkles, Activity } from 'lucide-react';
import { QUICK_ADD_PRESETS, Person, uid } from '../types';

interface QuickAddPresetsProps {
    onAdd: (person: Person) => void;
    scale: number;
}

const QuickAddPresets: React.FC<QuickAddPresetsProps> = ({ onAdd, scale }) => {
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
                    <Sparkles size={12} className="text-muted" />
                    <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted">Quick Insertion</h2>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {QUICK_ADD_PRESETS.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() => handlePresetClick(preset)}
                            className="flex flex-col items-start p-3 rounded-xl bg-background border border-border hover:border-accent hover:bg-surface/50 transition-all text-left overflow-hidden shadow-sm"
                        >
                            <span className="text-[10px] font-bold text-foreground/80 group-hover:text-accent transition-colors uppercase truncate w-full">
                                {preset.name}
                            </span>
                            <span className="text-[9px] font-mono font-medium text-muted mt-1 uppercase">
                                {preset.heightCm >= 1000 ? `${(preset.heightCm / 100).toFixed(1)}m` : `${preset.heightCm}cm`}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Scale Info Footer - Minimal Labeling */}
            <div className="mx-6 mb-6 p-4 rounded-xl border border-border bg-background flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                    <Activity size={10} className="text-muted/60" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-muted">System Metrics</span>
                </div>
                <div className="space-y-1.5 font-mono text-[9px] font-medium text-muted uppercase">
                    <div className="flex justify-between">
                        <span>Res</span>
                        <span className="text-foreground/60">{(1 / scale).toFixed(3)} cm/px</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Scale</span>
                        <span className="text-foreground/60">{scale.toFixed(4)} px/cm</span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default QuickAddPresets;

