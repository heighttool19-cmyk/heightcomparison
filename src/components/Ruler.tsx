'use client';

import React, { useMemo } from 'react';

interface RulerProps {
    scale: number;
}

const Ruler: React.FC<RulerProps> = ({ scale }) => {
    const tickInterval = 10;

    const ticks = useMemo(() => {
        const minTick = 0; // Start exactly from 0 as requested
        const maxTick = 300;
        const tickCount = Math.floor((maxTick - minTick) / tickInterval);
        return Array.from({ length: tickCount + 1 }, (_, i) => minTick + (i * tickInterval));
    }, [tickInterval]);

    return (
        <div className="absolute inset-x-0 inset-y-0 pointer-events-none select-none z-0">
            {/* Headers - High Visibility */}
            <div className="absolute top-8 left-12 text-[14px] font-black uppercase text-foreground/70 tracking-[0.2em]">cm</div>
            <div className="absolute top-8 right-12 text-[14px] font-black uppercase text-foreground/70 text-right tracking-[0.1em]">Ft</div>

            {ticks.map((tick) => {
                const heightPx = tick * scale;
                const isZero = tick === 0;

                const absFt = Math.abs(tick * 0.393701);
                const ftValue = Math.floor(absFt / 12);
                const inValue = (absFt % 12).toFixed(2);
                const isNegative = tick < 0;
                const ftDisplay = `${isNegative ? '-' : ''}${ftValue}' ${inValue}''`;

                return (
                    <div
                        key={tick}
                        className="absolute inset-x-0 flex items-center transition-all duration-700 ease-in-out"
                        style={{ bottom: `${heightPx + 80}px` }}
                    >
                        {/* CM Label (Left) */}
                        <span className="absolute left-10 text-[10px] font-mono font-bold text-foreground/50 w-8 text-right pr-2">
                            {tick}
                        </span>

                        {/* Grid Line */}
                        <div
                            className={`flex-1 mx-24 h-[1px] transition-colors duration-500 ${isZero
                                ? 'bg-red-500 h-[1.5px] opacity-100 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                                : 'bg-foreground/20'
                                }`}
                        />

                        {/* FT Label (Right) */}
                        <span className="absolute right-10 text-[10px] font-mono font-bold text-foreground/30 text-right min-w-[65px]">
                            {ftDisplay}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default Ruler;
