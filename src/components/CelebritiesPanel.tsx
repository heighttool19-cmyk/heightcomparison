'use client';

import React, { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Celebrity, CelebrityCategory, Person } from '../types';
import { celebrities } from '../data/celebrities';

interface CelebritiesPanelProps {
    onAddPerson: (person: Person) => void;
    onClose: () => void;
}

const CATEGORIES: ('All' | CelebrityCategory)[] = [
    'All',
    'NBA Stars',
    'Hollywood',
    'Historical',
    'Athletes',
    'Musicians'
];

export const CelebritiesPanel: React.FC<CelebritiesPanelProps> = ({ onAddPerson, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<'All' | CelebrityCategory>('All');
    const [isSearching, setIsSearching] = useState(false);

    // Convert cm to feet/inches string for display
    const getHeightString = (cm: number) => {
        const totalInches = Math.round(cm * 0.393701);
        const feet = Math.floor(totalInches / 12);
        const inches = totalInches % 12;
        return `${cm} cm / ${feet}'${inches}&quot;`;
    };

    // Filter Logic
    const filteredCelebrities = useMemo(() => {
        let filtered = celebrities;

        if (activeCategory !== 'All') {
            filtered = filtered.filter(c => c.category === activeCategory);
        }

        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(query) ||
                c.category.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [searchQuery, activeCategory]);

    // Grouping by Category (only if "All" is selected or grouping within a specific category)
    const groupedCelebrities = useMemo(() => {
        const groups: Record<string, Celebrity[]> = {};
        filteredCelebrities.forEach(celeb => {
            if (!groups[celeb.category]) {
                groups[celeb.category] = [];
            }
            groups[celeb.category].push(celeb);
        });
        return groups;
    }, [filteredCelebrities]);

    const handleAdd = (celeb: Celebrity) => {
        // Generate ID outside the object literal to be cleaner
        // eslint-disable-next-line react-hooks/purity
        const timestamp = Date.now();
        // eslint-disable-next-line react-hooks/purity
        const rand = Math.random().toString(36).substr(2, 9);
        const newId = `person-${timestamp}-${rand}`;

        onAddPerson({
            id: newId,
            name: celeb.name,
            heightCm: celeb.heightCm,
            gender: 'other', // fallback
            color: celeb.color || '#3B82F6',
            imgUrl: celeb.imgUrl
        });
        // Optional: Trigger a toast here if needed
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setIsSearching(true);
        // Simulate a tiny delay for loading animation effect
        setTimeout(() => setIsSearching(false), 300);
    };

    return (
        <div className="flex flex-col h-full bg-surface text-foreground font-sans relative w-full flex-shrink-0 z-50">
            {/* 1. Header Area */}
            <div className="px-6 pt-8 pb-4 border-b border-border/50 shrink-0 bg-surface">
                <h2 className="text-2xl font-bold tracking-tight">Celebrity Selection</h2>
                <p className="text-sm text-muted mt-1 mb-6">Add icons to your comparison chart</p>

                {/* Search Input */}
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or category"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full bg-[var(--bg)] border border-border/50 rounded-full py-3.5 pl-12 pr-4 text-[15px] font-medium text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all shadow-inner"
                    />
                </div>
            </div>

            {/* 2. Filter Tabs (Horizontally Scrollable) */}
            <div className="shrink-0 relative">
                <div className="flex overflow-x-auto custom-scrollbar gap-2 px-6 py-4 border-b border-border/50 hide-scrollbar">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${activeCategory === category
                                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                : 'bg-[var(--bg)] text-muted hover:text-foreground hover:bg-[var(--border)]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                {/* Subtle loading bar indicator */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent overflow-hidden">
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: isSearching ? '100%' : '-100%' }}
                        transition={{ duration: 0.8, ease: "linear", repeat: isSearching ? Infinity : 0 }}
                        className="h-full w-1/3 bg-accent/50 rounded-full shadow-[0_0_10px_var(--accent)]"
                    />
                </div>
            </div>

            {/* 3. Scrollable List of Sections */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 pb-24 space-y-8">
                <AnimatePresence mode="popLayout">
                    {Object.keys(groupedCelebrities).length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="text-center py-12 text-slate-500 font-medium"
                        >
                            No celebrities found matching &quot;{searchQuery}&quot;
                        </motion.div>
                    ) : (
                        Object.entries(groupedCelebrities).map(([category, celebs]) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                {/* Section Header */}
                                <div className="flex items-center gap-3">
                                    <h3 className="text-[11px] font-black tracking-widest text-slate-400 uppercase">
                                        {category} — {celebs.length} FOUND
                                    </h3>
                                    <div className="h-px bg-border/50 flex-1" />
                                </div>

                                {/* Cards Grid */}
                                <div className="flex flex-col gap-3">
                                    {celebs.map(celeb => (
                                        <div
                                            key={celeb.id}
                                            className="group flex items-center justify-between p-3.5 bg-[var(--bg)] border border-border/50 rounded-2xl hover:border-accent/30 hover:bg-[var(--border)] transition-all duration-300 shadow-sm"
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* Left: Avatar Circle */}
                                                <div
                                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner"
                                                    style={{
                                                        backgroundColor: celeb.color || '#3B82F6',
                                                        backgroundImage: `linear-gradient(to bottom right, rgba(255,255,255,0.2), transparent)`
                                                    }}
                                                >
                                                    {celeb.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                                                </div>

                                                {/* Center: Info */}
                                                <div className="flex flex-col">
                                                    <span className="text-[14px] font-bold text-white tracking-tight">{celeb.name}</span>
                                                    <span className="text-[12px] font-medium text-slate-500 mt-0.5">{getHeightString(celeb.heightCm)}</span>
                                                </div>
                                            </div>

                                            {/* Right: Add Button */}
                                            <button
                                                onClick={() => handleAdd(celeb)}
                                                className="w-9 h-9 flex items-center justify-center rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300 active:scale-95"
                                            >
                                                <Plus size={18} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* 4. Fixed CTA Bottom */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-surface via-surface to-transparent pointer-events-none">
                <button
                    onClick={() => {
                        onClose();
                    }}
                    className="w-full pointer-events-auto bg-accent hover:bg-accent-secondary text-white font-bold text-[15px] py-3.5 rounded-2xl shadow-xl shadow-accent/20 transition-all active:scale-[0.98]"
                >
                    Add Custom Person
                </button>
            </div>

        </div>
    );
};

export default CelebritiesPanel;
