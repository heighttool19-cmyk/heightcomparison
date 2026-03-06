'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Plus, Sparkles } from 'lucide-react';
import { fictionalCharacters } from '../data/fictionalCharacters';
import { FictionalCategory, Person } from '../types';

interface FictionalPanelProps {
    onAddPerson: (person: Person) => void;
    onClose: () => void;
}

const CATEGORIES: { id: FictionalCategory | 'All'; label: string }[] = [
    { id: 'All', label: 'All' },
    { id: 'Anime', label: 'Anime' },
    { id: 'Cartoons', label: 'Cartoons' },
    { id: 'DC Comics', label: 'DC Comics' },
    { id: 'Fantasy', label: 'Fantasy' },
    { id: 'Marvel', label: 'Marvel' },
    { id: 'Monsters & Kaiju', label: 'Monsters & Kaiju' },
    { id: 'TV Shows', label: 'TV Shows' },
    { id: 'Video Games', label: 'Video Games' },
];

export const FictionalPanel: React.FC<FictionalPanelProps> = ({ onAddPerson, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<FictionalCategory | 'All'>('All');

    // Filter logic
    const filteredCharacters = useMemo(() => {
        return fictionalCharacters.filter((char) => {
            const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || char.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <div className="flex flex-col h-full bg-surface text-foreground font-sans relative w-full flex-shrink-0 z-50">
            {/* Header */}
            <div className="px-6 pt-8 pb-4 border-b border-border/50 shrink-0 bg-surface">
                <div className="flex items-center justify-between pointer-events-none mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-accent/20 text-accent">
                            <Sparkles size={20} className="drop-shadow-[0_0_8px_rgba(30,151,75,0.4)]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">Fictional Entities</h2>
                            <p className="text-sm font-medium text-muted">Add iconic characters to your chart</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all duration-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Search */}
                <div className="relative group pointer-events-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or series..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[var(--bg)] border border-border/50 rounded-full py-3.5 pl-12 pr-4 text-[15px] font-medium text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all shadow-inner"
                    />
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="shrink-0 relative pointer-events-auto">
                <div className="flex overflow-x-auto custom-scrollbar gap-2 px-6 py-4 border-b border-border/50 hide-scrollbar">
                    {CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${isActive
                                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                    : 'bg-[var(--bg)] text-muted hover:text-foreground hover:bg-[var(--border)]'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Progress Bar / Animated Border Line under header */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-0 bottom-0 left-0 bg-accent/50"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </div>

            {/* List Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 custom-scrollbar bg-surface space-y-3 relative pointer-events-auto">
                <AnimatePresence initial={false}>
                    {filteredCharacters.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="text-center py-12 flex flex-col items-center gap-3"
                        >
                            <div className="w-16 h-16 rounded-full bg-[var(--bg)] flex items-center justify-center text-muted mb-2 shadow-inner">
                                <Search size={28} />
                            </div>
                            <p className="text-muted text-sm font-medium">No characters found for &quot;{searchQuery}&quot;</p>
                        </motion.div>
                    ) : (
                        filteredCharacters.map((char, index) => (
                            <motion.div
                                key={char.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
                                className="group flex flex-row items-center justify-between p-3.5 rounded-2xl bg-[var(--bg)] border border-border/50 hover:border-accent/30 hover:bg-[var(--border)] transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0 relative overflow-hidden"
                                        style={{
                                            background: `linear-gradient(135deg, ${char.color}dd, ${char.color}88)`
                                        }}
                                    >
                                        {/* Avatar initial fallback */}
                                        <span className="relative z-10 drop-shadow-md">{char.name.charAt(0)}</span>
                                        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                                    </div>

                                    <div className="flex-1 min-w-0 pr-2">
                                        <div className="flex flex-wrap items-baseline justify-between gap-x-2 mb-0.5">
                                            <h4 className="font-bold text-foreground text-[14px] tracking-tight leading-tight">
                                                {char.name}
                                            </h4>
                                            <span className="text-[12px] font-medium text-muted mt-0.5 shrink-0 ml-2">
                                                {char.heightCm}cm
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="text-[10px] uppercase tracking-wider font-black text-muted bg-[var(--border)] px-1.5 py-0.5 rounded-sm">
                                                {char.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        const timestamp = Date.now();
                                        const rand = Math.random().toString(36).substr(2, 9);
                                        const newId = `person-${timestamp}-${rand}`;

                                        onAddPerson({
                                            id: newId,
                                            name: char.name,
                                            heightCm: char.heightCm,
                                            color: char.color,
                                            gender: 'other',
                                        });
                                    }}
                                    className="w-9 h-9 flex shrink-0 ml-2 items-center justify-center rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300 active:scale-95 pointer-events-auto"
                                    title={`Add ${char.name} to chart`}
                                >
                                    <Plus size={18} strokeWidth={2.5} />
                                </button>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* CTA Bottom for Mobile Padding/Actions Context */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-surface via-surface to-transparent pointer-events-none">
                <button
                    onClick={onClose}
                    className="w-full pointer-events-auto bg-accent hover:bg-accent-secondary text-white font-bold text-[15px] py-3.5 rounded-2xl shadow-xl shadow-accent/20 transition-all active:scale-[0.98] sm:hidden"
                >
                    Close Panel
                </button>
            </div>
        </div>
    );
};
