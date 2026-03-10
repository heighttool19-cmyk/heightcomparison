'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { fictionalCharacters } from '../data/fictional';
import { FictionalCategory, Person } from '../types';
import { FilterTabs } from './ui/FilterTabs';
import { PanelHeader } from './ui/PanelHeader';
import { PanelListItem } from './ui/PanelListItem';

interface FictionalPanelProps {
    onAddPerson: (person: Person) => void;
    onClose: () => void;
}

const DYNAMIC_CATEGORIES = ['All', ...Array.from(new Set(fictionalCharacters.map(c => c.category)))];

export const FictionalPanel: React.FC<FictionalPanelProps> = ({ onAddPerson, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<FictionalCategory | 'All'>('All');

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { All: fictionalCharacters.length };
        fictionalCharacters.forEach(c => {
            counts[c.category] = (counts[c.category] || 0) + 1;
        });
        return counts;
    }, []);

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
            <PanelHeader title="Fictional Entities" subtitle="Add iconic characters to your chart" />

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
            <FilterTabs
                categories={DYNAMIC_CATEGORIES}
                activeCategory={activeCategory}
                onSelectCategory={(cat) => setActiveCategory(cat as FictionalCategory | 'All')}
                categoryCounts={categoryCounts}
            />

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
                                        <PanelListItem
                                            key={char.id}
                                            id={char.id}
                                            name={char.name}
                                            heightString={getHeightString(char.heightCm)}
                                            onAdd={() => {
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
                                            avatarNode={
                                                <div
                                                    className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-white font-bold text-sm border border-border/50 shadow-sm"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${char.color}dd, ${char.color}88)`
                                                    }}
                                                >
                                                    {char.name.charAt(0)}
                                                </div>
                                            }
                                        />
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

export default FictionalPanel;
