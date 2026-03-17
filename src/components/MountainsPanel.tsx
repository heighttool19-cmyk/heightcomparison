'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain, MountainCategory } from '../types';
import { mountains } from '../data/mountains';
import { FilterTabs } from './ui/FilterTabs';
import { PanelHeader } from './ui/PanelHeader';
import { PanelListItem } from './ui/PanelListItem';

interface MountainsPanelProps {
    onAddMountain: (mountain: Mountain) => void;
    onClose: () => void;
}

const DYNAMIC_CATEGORIES = ['All', ...Array.from(new Set(mountains.map(m => m.category)))];

export const MountainsPanel: React.FC<MountainsPanelProps> = ({ onAddMountain, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<'All' | MountainCategory>('All');
    const [visibleCount, setVisibleCount] = useState(30);
    const [prevFilterKey, setPrevFilterKey] = useState(`${searchQuery}|${activeCategory}`);

    const filterKey = `${searchQuery}|${activeCategory}`;
    if (prevFilterKey !== filterKey) {
        setPrevFilterKey(filterKey);
        setVisibleCount(30);
    }

    // Convert cm to meters and feet/inches string for display
    const getHeightString = (cm: number) => {
        const meters = cm / 100;
        const totalInches = Math.round(cm * 0.393701);
        const feet = Math.floor(totalInches / 12);
        const inches = totalInches % 12;
        return `${meters.toLocaleString()} m / ${feet.toLocaleString()}'${inches}"`;
    };

    // Filter Logic
    const filteredMountains = useMemo(() => {
        let filtered = mountains;

        if (activeCategory !== 'All') {
            filtered = filtered.filter(m => m.category === activeCategory);
        }

        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(m =>
                m.name.toLowerCase().includes(query) ||
                m.category.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [searchQuery, activeCategory]);

    // Grouping Logic (only group visible slice to prevent lag)
    const groupedMountains = useMemo(() => {
        const groups: Record<string, Mountain[]> = {};
        const sliced = filteredMountains.slice(0, visibleCount);

        sliced.forEach(mt => {
            if (!groups[mt.category]) {
                groups[mt.category] = [];
            }
            groups[mt.category].push(mt);
        });
        return groups;
    }, [filteredMountains, visibleCount]);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 150) {
            if (visibleCount < filteredMountains.length) {
                setVisibleCount(prev => prev + 30);
            }
        }
    }, [visibleCount, filteredMountains.length]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="flex flex-col h-full bg-surface text-foreground font-sans relative w-full flex-shrink-0 z-50">
            {/* 1. Header Area */}
            <PanelHeader title="Mountain Selection" subtitle="Compare the world's highest peaks" />

            <div className="px-6 pb-2 shrink-0">
                {/* Search Input */}
                <div className="relative mt-2 sm:mt-4 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                    <input
                        type="text"
                        placeholder="Search peaks or continents"
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
                onSelectCategory={(cat) => setActiveCategory(cat as 'All' | MountainCategory)}
            />

            {/* 3. List Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 custom-scrollbar" onScroll={handleScroll}>
                <AnimatePresence mode="popLayout">
                    {Object.keys(groupedMountains).length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="text-center py-12 text-muted font-medium"
                        >
                            No mountains found matching &quot;{searchQuery}&quot;
                        </motion.div>
                    ) : (
                        Object.entries(groupedMountains).map(([category, mts]) => (
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
                                        <span className="text-[9px] font-bold text-muted uppercase">{mts.length} PEAKS</span>
                                    </div>
                                </div>

                                {/* Peaks Grid */}
                                <div className="flex flex-col gap-2.5">
                                    {mts.map(mt => (
                                        <PanelListItem
                                            key={mt.id}
                                            id={mt.id}
                                            name={mt.name}
                                            heightString={getHeightString(mt.heightCm)}
                                            onAdd={() => onAddMountain(mt)}
                                            addAriaLabel={`Add ${mt.name} to comparison`}
                                            avatarNode={
                                                <div
                                                    className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-white font-bold text-lg border border-border/50 shadow-sm"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${mt.color}dd, ${mt.color}88)`
                                                    }}
                                                >
                                                    ⛰️
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
                    className="w-full bg-surface border border-border/50 hover:bg-bg text-muted hover:text-foreground font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    Add Custom Person
                </button>
            </div>
        </div>
    );
};

export default MountainsPanel;
