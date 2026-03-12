'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Search, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Celebrity, CelebrityCategory, Person } from '../types';
import { celebrities } from '../data/celebrities';
import { FilterTabs } from './ui/FilterTabs';
import { PanelHeader } from './ui/PanelHeader';
import { PanelListItem } from './ui/PanelListItem';

interface CelebritiesPanelProps {
    onAddPerson: (person: Person) => void;
    onClose: () => void;
}

const DYNAMIC_CATEGORIES = ['All', ...Array.from(new Set(celebrities.map(c => c.category)))];

export const CelebritiesPanel: React.FC<CelebritiesPanelProps> = ({ onAddPerson, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<'All' | CelebrityCategory>('All');
    const [visibleCount, setVisibleCount] = useState(30);
    const [prevFilterKey, setPrevFilterKey] = useState(`${searchQuery}|${activeCategory}`);

    const filterKey = `${searchQuery}|${activeCategory}`;
    if (prevFilterKey !== filterKey) {
        setPrevFilterKey(filterKey);
        setVisibleCount(30);
    }

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
    // Only group the sliced visible items to prevent massive rendering delays
    const groupedCelebrities = useMemo(() => {
        const groups: Record<string, Celebrity[]> = {};
        const sliced = filteredCelebrities.slice(0, visibleCount);

        sliced.forEach(celeb => {
            if (!groups[celeb.category]) {
                groups[celeb.category] = [];
            }
            groups[celeb.category].push(celeb);
        });
        return groups;
    }, [filteredCelebrities, visibleCount]);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 150) {
            if (visibleCount < filteredCelebrities.length) {
                setVisibleCount(prev => prev + 30);
            }
        }
    }, [visibleCount, filteredCelebrities.length]);

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
    };

    return (
        <div className="flex flex-col h-full bg-surface text-foreground font-sans relative w-full flex-shrink-0 z-50">
            {/* 1. Header Area */}
            <PanelHeader title="Celebrity Selection" subtitle="Add icons to your comparison chart" />

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
            <FilterTabs
                categories={DYNAMIC_CATEGORIES}
                activeCategory={activeCategory}
                onSelectCategory={(cat) => setActiveCategory(cat as 'All' | CelebrityCategory)}
            />

            {/* 3. List Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 custom-scrollbar" onScroll={handleScroll}>
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
                                        <PanelListItem
                                            key={celeb.id}
                                            id={celeb.id}
                                            name={celeb.name}
                                            heightString={getHeightString(celeb.heightCm)}
                                            onAdd={() => handleAdd(celeb)}
                                            avatarNode={
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
                                            }
                                        />
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
