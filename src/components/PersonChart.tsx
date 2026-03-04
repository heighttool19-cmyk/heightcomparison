'use client';

import React from 'react';
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
                <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted">
                    Simulation Queue <span className="text-foreground ml-2">{persons.length}</span>
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-2.5">
                {persons.map((person) => (
                    <div
                        key={person.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-surface/50 border border-border hover:border-accent group transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: person.color }}
                            />
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-foreground leading-tight uppercase tracking-tight">
                                    {person.name}
                                </span>
                                <span className="text-[10px] font-mono font-medium text-muted mt-0.5">
                                    {person.heightCm.toFixed(1)} cm
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => onRemove(person.id)}
                            className="p-1.5 text-muted/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 lg:group-hover:opacity-100 focus:opacity-100"
                            aria-label="Remove"
                        >
                            <Trash2 size={13} strokeWidth={2.5} />
                        </button>
                    </div>
                ))}

                {persons.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 opacity-30">
                        <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-muted text-center">
                            Queue Empty
                        </p>
                    </div>
                )}
            </div>
        </div>

    );
};

export default PersonChart;

