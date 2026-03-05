'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Person } from '../types';

interface PersonChartProps {
    persons: Person[];
    onRemove: (id: string) => void;
}

const PersonChart: React.FC<PersonChartProps> = ({ persons, onRemove }) => {
    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between sticky top-0 bg-background z-10 border-y border-border">
                <h2 className="text-xs uppercase tracking-[0.15em] font-black text-foreground/70">
                    Simulation Queue <span className="text-foreground ml-2">{persons.length}</span>
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-2.5">
                <AnimatePresence mode="popLayout">
                    {persons.map((person) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: -20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            key={person.id}
                            className="flex items-center justify-between p-3 rounded-xl bg-surface/50 border border-border hover:border-accent group transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: person.color }}
                                />
                                <div className="flex flex-col">
                                    <span className="text-xs font-black text-foreground leading-tight uppercase tracking-tight">
                                        {person.name}
                                    </span>
                                    <span className="text-[11px] font-mono font-black text-foreground/40 mt-0.5">
                                        {person.heightCm.toFixed(1)} cm
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => onRemove(person.id)}
                                className="p-1.5 text-foreground/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 lg:group-hover:opacity-100 focus:opacity-100"
                                aria-label="Remove"
                            >
                                <Trash2 size={15} strokeWidth={3} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {persons.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        className="flex flex-col items-center justify-center py-10"
                    >
                        <p className="text-xs uppercase tracking-[0.3em] font-black text-foreground/40 text-center">
                            Queue Empty
                        </p>
                    </motion.div>
                )}
            </div>
        </div>

    );
};

export default PersonChart;

