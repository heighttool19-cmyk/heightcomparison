'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
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

    // Convert cm to feet/inches string for display
    const getHeightString = (cm: number) => {
        const totalInches = Math.round(cm * 0.393701);
        const feet = Math.floor(totalInches / 12);
        const inches = totalInches % 12;
        return `${cm} cm / ${feet}'${inches}"`;
    };

    // Filter logic
    const filteredCharacters = useMemo(() => {
        return fictionalCharacters.filter((char) => {
            const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || char.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    // Grouping logic
    const groupedCharacters = useMemo(() => {
        const groups: Record<string, typeof fictionalCharacters> = {};
        filteredCharacters.forEach(char => {
            if (!groups[char.category]) {
                groups[char.category] = [];
            }
            groups[char.category].push(char);
        });
        return groups;
    }, [filteredCharacters]);

    return (
        <div className="flex flex-col h-full bg-surface text-foreground font-sans relative w-full flex-shrink-0 z-50">
            {/* Header */}
            <div className="px-6 pt-6 pb-2 shrink-0 hidden sm:block">
                <h2 className="text-base font-black uppercase tracking-tight text-foreground mb-1">Fictional Entities</h2>
                <p className="text-[11px] font-medium text-muted">Add iconic characters to your chart</p>
            </div>

            <div className="px-6 pb-2 shrink-0">
                {/* Search */}
                <div className="relative mt-2 sm:mt-4 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name or series..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-bg border border-border/50 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-all"
                    />
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="shrink-0">
                <div className="flex overflow-x-auto gap-1.5 px-6 py-3 hide-scrollbar">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-all duration-300 ${activeCategory === cat.id
                                ? 'bg-accent text-white'
                                : 'bg-bg text-muted hover:text-foreground'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
                {/* Loader bar */}
                {/* <div className="px-6">
                    <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="h-full bg-accent/50 rounded-full shadow-[0_0_10px_var(--accent)]"
                        />
                    </div>
                </div> */}
            </div>

            {/* List Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {Object.keys(groupedCharacters).length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="text-center py-12 text-muted font-medium"
                        >
                            No characters found matching &quot;{searchQuery}&quot;
                        </motion.div>
                    ) : (
                        Object.entries(groupedCharacters).map(([category, chars]) => (
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
                                        <span className="text-[9px] font-bold text-muted uppercase">{chars.length} FOUND</span>
                                    </div>
                                </div>

                                {/* Cards Grid */}
                                <div className="flex flex-col gap-2.5">
                                    {chars.map(char => (
                                        <div
                                            key={char.id}
                                            className="group flex items-center justify-between p-2.5 bg-bg border border-border/30 rounded-2xl hover:border-accent/30 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                {/* Avatar */}
                                                <div
                                                    className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-white font-bold text-sm border border-border/50 shadow-sm"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${char.color}dd, ${char.color}88)`
                                                    }}
                                                >
                                                    {char.name.charAt(0)}
                                                </div>

                                                {/* Info */}
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-bold text-foreground truncate leading-tight">{char.name}</span>
                                                    <span className="text-[11px] font-bold text-accent mt-0.5">{getHeightString(char.heightCm)}</span>
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

            {/* CTA Bottom */}
            <div className="sticky bottom-0 left-0 w-full p-6 pt-2 bg-gradient-to-t from-surface via-surface to-transparent shrink-0">
                <button
                    onClick={onClose}
                    className="w-full bg-accent hover:bg-accent/90 text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={18} strokeWidth={3} />
                    Add Custom Person
                </button>
            </div>
        </div>
    );
};
