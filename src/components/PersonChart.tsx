'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, ChevronUp, ChevronDown } from 'lucide-react';
import { Person } from '../types';

interface PersonChartProps {
    persons: Person[];
    onRemove: (id: string) => void;
    onEdit?: (id: string) => void;
    onReorder?: (id: string, direction: 'up' | 'down') => void;
    highlight?: boolean;
}

const PersonChart: React.FC<PersonChartProps> = React.memo(({ persons, onRemove, onEdit, onReorder, highlight }) => {
    const listHeaderRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (highlight && listHeaderRef.current) {
            listHeaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [highlight]);

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div
                ref={listHeaderRef}
                className={`px-6 py-4 flex items-center justify-between sticky top-0 bg-surface z-10 border-y border-border transition-colors duration-500 ${highlight ? 'bg-accent/10 border-accent/50 group' : ''}`}
            >
                <h2 className="text-xs uppercase tracking-[0.15em] font-black text-foreground/70 flex items-center gap-2">
                    Your List
                    {highlight && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-accent"
                        />
                    )}
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
                                delay: index * 0.01
                            }}
                            whileHover={{ scale: 1.01, x: 2, backgroundColor: 'rgba(59, 130, 246, 0.03)' }}
                            key={person.id}
                            className="flex items-center justify-between p-3 rounded-xl bg-bg border border-border hover:border-accent/40 group transition-all shadow-sm relative overflow-hidden"
                        >
                            {/* Rigid Left Section */}
                            <div className="flex items-start gap-3 relative z-10 flex-1 min-w-0">
                                {/* 1. ARROWS */}
                                <div className="flex flex-col items-center justify-center gap-1 w-6 shrink-0">
                                    <button
                                        disabled={index === 0}
                                        onClick={() => onReorder?.(person.id, 'up')}
                                        className="p-0.5 text-muted hover:text-accent disabled:opacity-30 transition-colors flex items-center justify-center"
                                    >
                                        <ChevronUp size={14} strokeWidth={3} />
                                    </button>
                                    <button
                                        disabled={index === persons.length - 1}
                                        onClick={() => onReorder?.(person.id, 'down')}
                                        className="p-0.5 text-muted hover:text-accent disabled:opacity-30 transition-colors flex items-center justify-center"
                                    >
                                        <ChevronDown size={14} strokeWidth={3} />
                                    </button>
                                </div>
                                {/* 2. DOT: Match the height of the first line of text (h-4 is 16px) */}
                                <div className="flex items-center justify-center w-4 shrink-0 h-4">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-2.5 h-2.5 rounded-full shadow-sm"
                                        style={{ backgroundColor: person.color }}
                                    />
                                </div>
                                {/* 3. TEXT BLOCK: Name on top, Height below, no truncation */}
                                <div className="flex flex-col min-w-0 flex-1">
                                    {/* The name line is also roughly 16px high (h-4) */}
                                    <span className="text-[11px] h-4 flex items-center font-mono text-foreground uppercase tracking-tight break-words">
                                        {person.name}
                                    </span>
                                    <span className="text-[10px] font-mono font-black text-foreground/40 uppercase mt-0.5">
                                        {person.heightCm} cm
                                    </span>
                                </div>
                            </div>

                            {/* Right Section Actions */}
                            <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus-within:opacity-100 transition-opacity z-10 shrink-0 ml-2 w-16">
                                <button
                                    onClick={() => onEdit?.(person.id)}
                                    className="p-1.5 text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition-all"
                                    aria-label="Edit"
                                >
                                    <Edit2 size={13} strokeWidth={3} />
                                </button>
                                <button
                                    onClick={() => onRemove(person.id)}
                                    className="p-1.5 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                    aria-label="Remove"
                                >
                                    <Trash2 size={13} strokeWidth={3} />
                                </button>
                            </div>

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
});

PersonChart.displayName = 'PersonChart';

export default PersonChart;