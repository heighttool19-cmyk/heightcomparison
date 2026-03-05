'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DoorProps {
    scale: number;
}

const Door: React.FC<DoorProps> = ({ scale }) => {
    const doorHeightPx = 210 * scale;
    const doorWidthPx = 90 * scale; // Standard door width ~90cm
    const knobHeightPx = 100 * scale; // Knob at 100cm

    return (
        <motion.div
            layout
            className="flex flex-col items-center justify-end h-full relative"
            style={{ width: `${doorWidthPx}px` }}
        >
            <div className="relative group">
                {/* Door Body (Simple SVG Rectangle Look) */}
                <motion.div
                    layout
                    className="bg-[#374151] rounded-t-sm relative overflow-hidden transition-colors duration-500"
                    style={{
                        width: `${doorWidthPx}px`,
                        height: `${doorHeightPx}px`,
                    }}
                >
                    {/* Inner Panel Detail (Removed for simpler look as requested) */}

                    {/* Doorknob */}
                    <div
                        className="absolute w-2 h-2 rounded-full bg-gray-400 shadow-sm transition-all duration-300 group-hover:bg-gray-300"
                        style={{
                            right: '12px',
                            bottom: `${knobHeightPx}px`,
                        }}
                    />
                </motion.div>
            </div>

            {/* Label */}
            <div className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted/30 group-hover:text-muted/60 transition-colors">
                Standard Door (210cm)
            </div>
        </motion.div>
    );
};

export default Door;

