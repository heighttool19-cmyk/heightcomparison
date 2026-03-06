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
            <div className="px-6 py-4 flex items-center justify-between sticky top-0 bg-surface z-10 border-y border-border">
                <h2 className="text-xs uppercase tracking-[0.15em] font-black text-foreground/70">
                    Your List <span className="text-accent ml-2">{persons.length}</span>
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-2.5">
                <AnimatePresence mode="popLayout">
                    {persons.map((person, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -20 }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                                delay: index * 0.03
                            }}
                            whileHover={{ scale: 1.02, x: 5, backgroundColor: 'rgba(59, 130, 246, 0.03)' }}
                            whileTap={{ scale: 0.99 }}
                            key={person.id}
                            className="flex items-center justify-between p-3.5 rounded-2xl bg-bg border border-border hover:border-accent/40 group transition-all shadow-sm relative overflow-hidden"
                        >
                            <div className="flex items-center gap-3 relative z-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-2.5 h-2.5 rounded-full shadow-sm"
                                    style={{ backgroundColor: person.color }}
                                />
                                <div className="flex flex-col">
                                    <span className="text-xs font-black text-foreground leading-tight uppercase tracking-tight">
                                        {person.name}
                                    </span>
                                    <span className="text-[11px] font-mono font-black text-foreground/40 mt-0.5 uppercase">
                                        {person.heightCm.toFixed(1)} cm
                                    </span>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1, color: '#ef4444' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onRemove(person.id)}
                                className="p-1.5 text-foreground/20 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 lg:group-hover:opacity-100 focus:opacity-100 z-10"
                                aria-label="Remove"
                            >
                                <Trash2 size={15} strokeWidth={3} />
                            </motion.button>

                            {/* Subtle background glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                            List is Empty
                        </p>
                    </motion.div>
                )}
            </div>
        </div>

    );
};

export default PersonChart;

