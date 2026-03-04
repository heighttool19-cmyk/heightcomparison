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
            {/* Headers - High Visibility, Locked to Top with Backdrop */}
            <div className="absolute top-0 inset-x-0 h-10 bg-background/80 backdrop-blur-sm z-30 border-b border-border/20 flex items-center justify-between px-4 sm:px-12">
                <div className="text-[12px] sm:text-[14px] font-black uppercase text-foreground/80 tracking-[0.2em] drop-shadow-sm">cm</div>
                <div className="text-[12px] sm:text-[14px] font-black uppercase text-foreground/80 tracking-[0.1em] drop-shadow-sm">Ft</div>
            </div>

            {ticks.map((tick) => {
                const heightPx = tick * scale;
                const isZero = tick === 0;

                // Simple check to prevent overlapping with headers (assuming a reasonable viewport height)
                // We'll hide ticks that are visually Too High relative to the container.
                // Since this component doesn't know canvasHeight, we can pass it or use a CSS-based approach.
                // However, with our new reserved space in HeightDashboard, the scale is calculated to fit.
                // But a tick at exactly 300 might still hit the header if 300 is the maxHeight.

                const absFt = Math.abs(tick * 0.393701);
                const ftValue = Math.floor(absFt / 12);
                const inValue = (absFt % 12).toFixed(2);
                const isNegative = tick < 0;
                const ftDisplay = `${isNegative ? '-' : ''}${ftValue}' ${inValue}''`;

                return (
                    <div
                        key={tick}
                        className="absolute inset-x-0 flex items-center transition-all duration-700 ease-in-out group/tick"
                        style={{ bottom: `${heightPx + 80}px` }}
                    >
                        {/* CM Label (Left) */}
                        <span className="absolute left-2 sm:left-10 text-[9px] sm:text-[10px] font-mono font-bold text-foreground/50 w-6 sm:w-8 text-right pr-1 sm:pr-2 group-hover/tick:text-foreground/80 transition-colors">
                            {tick}
                        </span>

                        {/* Grid Line */}
                        <div
                            className={`flex-1 mx-10 sm:mx-24 h-[1px] transition-colors duration-500 ${isZero
                                ? 'bg-red-500 h-[1.5px] opacity-100 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                                : 'bg-foreground/20 group-hover/tick:bg-foreground/40'
                                }`}
                        />

                        {/* FT Label (Right) */}
                        <span className="absolute right-2 sm:right-10 text-[9px] sm:text-[10px] font-mono font-bold text-foreground/30 text-right min-w-[50px] sm:min-w-[65px] group-hover/tick:text-foreground/60 transition-colors">
                            {ftDisplay}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default Ruler;
