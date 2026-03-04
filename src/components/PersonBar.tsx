'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Person } from '../types';

interface PersonBarProps {
    person: Person;
    scale: number;
}

const PersonBar: React.FC<PersonBarProps> = ({ person, scale }) => {
    // Total silhouette height in pixels
    const barHeightPx = person.heightCm * scale;

    // Head/Body proportions ensuring total = barHeightPx exactly
    const headDiameter = barHeightPx * 0.15;
    const bodyHeight = barHeightPx - headDiameter;

    const ftValue = Math.floor((person.heightCm * 0.393701) / 12);
    const inValue = ((person.heightCm * 0.393701) % 12).toFixed(2);
    const ftDisplay = `${ftValue}' ${inValue}''`;

    const springConfig = { type: 'spring' as const, stiffness: 220, damping: 28 };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={springConfig}
            className="flex flex-col items-center justify-end h-full relative group"
            style={{ width: '150px', paddingBottom: '80px' }}
        >
            {/* Stacked Labels - Positioned mathematically above Head */}
            <div
                className="flex flex-col items-center text-[10px] font-mono font-bold text-foreground pointer-events-none"
                style={{
                    position: 'absolute',
                    bottom: `${barHeightPx + 105}px`, // 80 (baseline) + barHeightPx + 25px gap
                    width: '200px'
                }}
            >
                <span className="mb-0.5 text-[11px] uppercase tracking-tighter opacity-70">{person.name}</span>
                <span className="text-foreground">cm: {person.heightCm.toFixed(1)}</span>
                <span className="opacity-60">ft: {ftDisplay}</span>
            </div>

            {/* Indicator Line - Exactly at 170cm height line */}
            <div
                className="w-24 h-[1px] bg-foreground/30"
                style={{
                    position: 'absolute',
                    bottom: `${barHeightPx + 80}px`,
                    zIndex: 20
                }}
            />

            {/* Silhouette - Optimized for zero-error alignment */}
            <div className="flex flex-col items-center relative opacity-90 transition-opacity group-hover:opacity-100">
                {/* Head */}
                <motion.div
                    layout
                    className="rounded-full relative z-10"
                    style={{
                        width: `${headDiameter}px`,
                        height: `${headDiameter}px`,
                        backgroundColor: person.color || '#6366F1',
                    }}
                    transition={springConfig}
                    animate={{ width: headDiameter, height: headDiameter }}
                />

                {/* Body */}
                <motion.div
                    layout
                    className="rounded-t-[2.5rem] relative z-10 overflow-hidden"
                    style={{
                        width: `${headDiameter * 2.4}px`,
                        backgroundColor: person.color || '#6366F1'
                    }}
                    animate={{ height: bodyHeight }}
                    transition={springConfig}
                />
            </div>
        </motion.div>
    );
};

export default PersonBar;
