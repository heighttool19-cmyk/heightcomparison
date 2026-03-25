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
            {/* ... component content ... */}
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
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="flex flex-col gap-1 mr-1">
                                    <button
                                        disabled={index === 0}
                                        onClick={() => onReorder?.(person.id, 'up')}
                                        className="p-0.5 text-muted hover:text-accent disabled:opacity-30 disabled:hover:text-muted transition-colors"
                                    >
                                        <ChevronUp size={12} strokeWidth={3} />
                                    </button>
                                    <button
                                        disabled={index === persons.length - 1}
                                        onClick={() => onReorder?.(person.id, 'down')}
                                        className="p-0.5 text-muted hover:text-accent disabled:opacity-30 disabled:hover:text-muted transition-colors"
                                    >
                                        <ChevronDown size={12} strokeWidth={3} />
                                    </button>
                                </div>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-2.5 h-2.5 rounded-full shadow-sm shrink-0"
                                    style={{ backgroundColor: person.color }}
                                />
                                <div className="flex flex-col items-center text-left">
                                    <span className="text-[11px] font-mono text-foreground leading-tight uppercase tracking-tight">
                                        {person.name}
                                    </span>
                                    <span className="text-[10px] font-mono font-black text-foreground/40 mt-0.5 uppercase">
                                        {person.heightCm} cm
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 opacity-0 lg:group-hover:opacity-100 focus-within:opacity-100 transition-opacity z-10">
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

export default PersonChart;
