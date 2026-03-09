'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Entity } from '../types';
import { X } from 'lucide-react';

interface VerticalCanvasProps {
    entities: Entity[];
    canvasHeight: number;
    zoom: number;
    unitSystem: 'metric' | 'imperial';
    onRemove: (id: string) => void;
}

const PINNED_ENTITIES: Entity[] = [
    { id: 'pinned-door', name: 'Standard Door', heightCm: 210, category: 'All', icon: '🚪', color: '#92400E' },
    { id: 'pinned-human', name: 'Avg Human', heightCm: 175, category: 'All', icon: '🚶', color: '#3B82F6' },
];

export const VerticalCanvas = React.forwardRef<HTMLDivElement, VerticalCanvasProps>(({ entities, canvasHeight, zoom, unitSystem, onRemove }, ref) => {
    const allEntities = useMemo(() => {
        // combine fixed items with added entities
        const combined = [...PINNED_ENTITIES];
        entities.forEach(e => {
            if (!combined.find(p => p.id === e.id)) {
                combined.push(e);
            }
        });
        // Sort DESCENDING (tallest at bottom, shortest at top)
        return combined.sort((a, b) => a.heightCm - b.heightCm);
    }, [entities]);

    const maxHeight = useMemo(() => {
        return Math.max(300, ...allEntities.map(e => e.heightCm));
    }, [allEntities]);

    // Scale calculation: canvas height / maxHeight
    const scale = (canvasHeight > 0 ? (canvasHeight - 120) / maxHeight : 1) * zoom;

    const formatHeight = (cm: number) => {
        if (unitSystem === 'metric') {
            if (cm >= 100) return `${(cm / 100).toFixed(1)}m`;
            return `${cm}cm`;
        } else {
            const totalInches = cm / 2.54;
            const feet = Math.floor(totalInches / 12);
            const inches = Math.round(totalInches % 12);
            return `${feet}'${inches}"`;
        }
    };

    return (
        <div ref={ref} className="relative w-full h-full flex flex-col items-center pt-20 pb-10 px-4 overflow-y-auto custom-scrollbar">
            {/* Legend / Info */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 pointer-events-none">
                <h3 className="text-lg font-black uppercase tracking-tight text-foreground/80">Comparison Canvas</h3>
                <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Comparing {allEntities.length} entities scaled to real-world dimensions</p>
            </div>

            <div className="relative w-full max-w-4xl flex-1 flex flex-col-reverse justify-start">
                <AnimatePresence mode="popLayout">
                    {allEntities.map((entity) => {
                        const isPinned = entity.id.startsWith('pinned-');
                        const heightPx = entity.heightCm * scale;

                        return (
                            <motion.div
                                key={entity.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="absolute left-0 right-0 flex items-center group"
                                style={{ bottom: heightPx }}
                            >
                                {/* Dashed Line */}
                                <div className="flex-1 h-px border-b border-dashed border-border/40 group-hover:border-accent/40 transition-colors" />

                                {/* Entity Card / Label */}
                                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                    <div className="flex items-center gap-3 p-2 pr-4 bg-surface/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-xl hover:border-accent/50 transition-all min-w-[180px]">
                                        <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-xl bg-bg border border-border/30" style={{ color: entity.color }}>
                                            {entity.icon}
                                        </div>
                                        <div className="flex flex-col min-w-0 pr-4">
                                            <span className="text-xs font-black text-foreground truncate uppercase tracking-tight">{entity.name}</span>
                                            <span className="text-[10px] font-bold text-muted uppercase">{formatHeight(entity.heightCm)}</span>
                                        </div>
                                        {!isPinned && (
                                            <button
                                                onClick={() => onRemove(entity.id)}
                                                className="absolute -top-1 -right-1 w-5 h-5 bg-surface border border-border rounded-full flex items-center justify-center text-muted hover:text-red-500 transition-colors shadow-sm"
                                                aria-label={`Remove ${entity.name}`}
                                            >
                                                <X size={10} strokeWidth={3} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Height Label on Right */}
                                <div className="absolute right-0 -translate-y-1/2 px-3 py-1 bg-bg/50 backdrop-blur-sm rounded-lg border border-border/30">
                                    <span className="text-[10px] font-mono font-black text-muted/60">{formatHeight(entity.heightCm)}</span>
                                </div>

                                <div className="flex-1 h-px border-b border-dashed border-border/40 group-hover:border-accent/40 transition-colors" />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Ground Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent/20 rounded-full" />
                <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-[10px] font-black text-accent/40 uppercase tracking-widest">Baseline Ground Level (0m)</div>
            </div>
        </div>
    );
});

VerticalCanvas.displayName = 'VerticalCanvas';

export default VerticalCanvas;
