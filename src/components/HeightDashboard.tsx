'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Menu, X as CloseIcon } from 'lucide-react';
import { Person, AppState, DEFAULT_PERSONS } from '../types';
import PersonBar from './PersonBar';
import Ruler from './Ruler';
import Sidebar from './Sidebar';

const HeightDashboard: React.FC = () => {
    const [state, setState] = useState<AppState>({
        persons: DEFAULT_PERSONS,
        unitSystem: 'metric',
        zoom: 1.0,
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [canvasHeight, setCanvasHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // ResizeObserver to track container height
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setCanvasHeight(entry.contentRect.height);
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // State Handlers
    const addPerson = (person: Person) => {
        setState(s => ({ ...s, persons: [...s.persons, person] }));
    };

    const removePerson = (id: string) => {
        setState(s => ({ ...s, persons: s.persons.filter(p => p.id !== id) }));
    };

    // Scale Engine Calculation
    const scale = useMemo(() => {
        if (canvasHeight === 0) return 0;

        // Ensure door (210cm) fits in view, or the tallest person
        const heights = state.persons.length > 0 ? state.persons.map(p => p.heightCm) : [0];
        const maxHeightCm = Math.max(210, ...heights);

        // Account for 80px bottom offset + 100px top margin for labels
        const fitScale = Math.max(0, (canvasHeight - 180) / maxHeightCm);

        const finalScale = fitScale * state.zoom;

        console.log(`[Scale Engine] Canvas: ${canvasHeight}px, Max Height: ${maxHeightCm}cm, Scale: ${finalScale.toFixed(4)}`);
        return finalScale;
    }, [canvasHeight, state.persons, state.zoom]);


    return (
        <div className="flex bg-background h-screen overflow-hidden font-sans selection:bg-accent/10">
            <main className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${isSidebarOpen ? 'lg:mr-[280px]' : ''}`}>
                {/* Header Area - Centered Branding */}
                <header className="flex flex-col items-center py-4 relative z-20 border-b border-border/50">
                    <h1 className="text-xl font-medium tracking-tight text-foreground/60 transition-colors duration-300">
                        HeightComparison.com
                    </h1>

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 text-muted hover:text-accent transition-all active:scale-95 lg:hidden"
                        aria-label="Toggle Sidebar"
                    >
                        <Menu size={20} strokeWidth={2.5} />
                    </button>

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex p-2 text-muted hover:text-accent transition-all"
                    >
                        {isSidebarOpen ? <CloseIcon size={18} /> : <Menu size={18} />}
                    </button>
                </header>

                {/* Comparison Canvas - Clean Utility Look */}
                <div
                    ref={containerRef}
                    className="flex-1 relative bg-background overflow-hidden flex items-end justify-center px-4 transition-all duration-700 shadow-inner"
                >
                    {/* Smart Ruler - Occupies full width */}
                    <Ruler scale={scale} />

                    {/* Reference Door - Only show if tall subjects are not overwhelming? 
                        In the reference image, there is no door, but I'll keep it as a toggle or subtle background if needed.
                        For now, I'll hide it to match the reference image's focus. */}
                    {/* <Door scale={scale} /> */}

                    {/* Person Bars - Centered Container */}
                    <div className="flex items-end gap-16 md:gap-24 pointer-events-none relative z-10 max-w-4xl mx-auto h-full">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {state.persons.map((person) => (
                                <PersonBar
                                    key={person.id}
                                    person={person}
                                    scale={scale}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Empty State */}
                    {state.persons.length === 0 && (
                        <div className="absolute inset-x-0 bottom-1/2 translate-y-1/2 text-center text-muted/20 text-[10px] font-black uppercase tracking-[0.5em] px-10">
                            Simulation Standby
                        </div>
                    )}
                </div>

                {/* Footer Details - Clinical Style */}
                <footer className="py-3 bg-surface/30 backdrop-blur-sm border-t border-border/50 flex flex-wrap items-center justify-center gap-10">
                    <div className="text-[10px] font-mono font-bold text-muted/50 uppercase tracking-widest">
                        Resolution: <span className="text-foreground/40">{(1 / scale).toFixed(3)} cm/px</span>
                    </div>
                    <div className="text-[10px] font-mono font-bold text-muted/50 uppercase tracking-widest">
                        Ref Baseline: <span className="text-baseline/80">Active 0.00</span>
                    </div>
                </footer>
            </main>


            {/* Sidebar with Framer Motion integration in Sidebar.tsx */}
            <Sidebar
                persons={state.persons}
                onAdd={addPerson}
                onRemove={removePerson}
                scale={scale}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />
        </div>
    );
};

export default HeightDashboard;



