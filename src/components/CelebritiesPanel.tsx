'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
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
        return `${cm} cm / ${feet}'${inches}"`;
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
            <div className="px-6 pt-6 pb-2 shrink-0 hidden sm:block">
                <h2 className="text-base font-black uppercase tracking-tight text-foreground mb-1">Celebrity Selection</h2>
                <p className="text-[11px] font-medium text-muted">Add icons to your comparison chart</p>
            </div>

            <div className="px-6 pb-2 shrink-0">
                {/* Search Input */}
                <div className="relative mt-2 sm:mt-4 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name or category"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full bg-bg border border-border/50 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-all"
                    />
                </div>
            </div>

            {/* 2. Filter Tabs */}
            <div className="shrink-0">
                <div className="flex overflow-x-auto gap-1.5 px-6 py-3 hide-scrollbar">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-all duration-300 ${activeCategory === category
                                ? 'bg-accent text-white'
                                : 'bg-bg text-muted hover:text-foreground'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                {/* Loader bar */}
                <div className="px-6">
                    <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden">
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: isSearching ? '100%' : '-100%' }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="h-full w-1/2 bg-accent/50 rounded-full shadow-[0_0_10px_var(--accent)]"
                        />
                    </div>
                </div>
            </div>

            {/* 3. List Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {Object.keys(groupedCelebrities).length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="text-center py-12 text-muted font-medium"
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
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[11px] font-bold tracking-wider text-muted uppercase">
                                        {category.toUpperCase()}
                                    </h3>
                                    <div className="bg-bg border border-border/50 rounded px-1.5 py-0.5">
                                        <span className="text-[9px] font-bold text-muted uppercase">{celebs.length} FOUND</span>
                                    </div>
                                </div>

                                {/* Cards Grid */}
                                <div className="flex flex-col gap-2.5">
                                    {celebs.map(celeb => (
                                        <div
                                            key={celeb.id}
                                            className="group flex items-center justify-between p-2.5 bg-bg border border-border/30 rounded-2xl hover:border-accent/30 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                {/* Image/Avatar */}
                                                <div className="w-10 h-10 rounded-xl shrink-0 overflow-hidden bg-surface border border-border/50 shadow-sm relative">
                                                    {celeb.imgUrl ? (
                                                        <Image
                                                            src={celeb.imgUrl}
                                                            alt={celeb.name}
                                                            width={40}
                                                            height={40}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br from-slate-600 to-slate-700">
                                                            {celeb.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Info */}
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-bold text-foreground truncate leading-tight">{celeb.name}</span>
                                                    <span className="text-[11px] font-bold text-accent mt-0.5">{getHeightString(celeb.heightCm)}</span>
                                                </div>
                                            </div>

                                            {/* Add Button */}
                                            <button
                                                onClick={() => handleAdd(celeb)}
                                                className="w-8 h-8 shrink-0 flex items-center justify-center rounded-xl bg-surface text-accent hover:bg-accent hover:text-white border border-border/50 transition-all active:scale-95 shadow-sm"
                                            >
                                                <Plus size={16} strokeWidth={3} />
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
            <div className="sticky bottom-0 left-0 w-full p-6 pt-2 bg-gradient-to-t from-surface via-surface to-transparent shrink-0">
                <button
                    onClick={() => onClose()}
                    className="w-full bg-accent hover:bg-accent/90 text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={18} strokeWidth={3} />
                    Add Custom Person
                </button>
            </div>
        </div>
    );
};

export default CelebritiesPanel;
