'use client';

import React, { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Entity, EntityCategory } from '../types';
import { entities } from '../data/entities';
import { FilterTabs } from './ui/FilterTabs';
import { PanelHeader } from './ui/PanelHeader';
import { PanelListItem } from './ui/PanelListItem';

interface EntitiesPanelProps {
    onAddEntity: (entity: Entity) => void;
    onClose: () => void;
    onExport?: () => void;
    isCapturing?: boolean;
}

const DYNAMIC_CATEGORIES = ['All', ...Array.from(new Set(entities.map(e => e.category)))];

export const EntitiesPanel: React.FC<EntitiesPanelProps> = ({ onAddEntity, onClose, onExport, isCapturing }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<EntityCategory>('All');



    // Filter Logic
    const filteredEntities = useMemo(() => {
        let filtered = entities;

        if (activeCategory !== 'All') {
            filtered = filtered.filter(e => e.category === activeCategory);
        }

        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(e =>
                e.name.toLowerCase().includes(query) ||
                e.category.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [searchQuery, activeCategory]);

    // Grouping Logic
    const groupedEntities = useMemo(() => {
        const groups: Record<string, Entity[]> = {};
        filteredEntities.forEach(entity => {
            if (!groups[entity.category]) {
                groups[entity.category] = [];
            }
            groups[entity.category].push(entity);
        });
        return groups;
    }, [filteredEntities]);

    // Convert cm to feet/inches string for display
    const getHeightString = (cm: number) => {
        const totalInches = Math.round(cm * 0.393701);
        const feet = Math.floor(totalInches / 12);
        const inches = totalInches % 12;
        return `${cm} cm / ${feet}'${inches}"`;
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        // setIsSearching(true);
        // setTimeout(() => setIsSearching(false), 200);
    };

    return (
        <div className="flex flex-col h-full bg-surface text-foreground font-sans relative w-full flex-shrink-0 z-50">
            {/* Header Area */}
            <PanelHeader title="Entities & Objects" subtitle="Compare real-world dimensions" />

            <div className="px-6 pb-2 shrink-0">
                {/* Search Input */}
                <div className="relative mt-2 sm:mt-4 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name or category..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full bg-bg border border-border/50 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-all"
                    />
                </div>
            </div>

            {/* Filter Tabs */}
            <FilterTabs
                categories={DYNAMIC_CATEGORIES}
                activeCategory={activeCategory}
                onSelectCategory={(cat) => setActiveCategory(cat as EntityCategory)}
            />

            {/* List Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {Object.keys(groupedEntities).length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="text-center py-12 text-muted font-medium"
                        >
                            No entities found matching &quot;{searchQuery}&quot;
                        </motion.div>
                    ) : (
                        Object.entries(groupedEntities).map(([category, ents]) => (
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
                                        <span className="text-[9px] font-bold text-muted uppercase">{ents.length} FOUND</span>
                                    </div>
                                </div>

                                {/* Cards Grid */}
                                <div className="flex flex-col gap-2.5">
                                    {ents.map(entity => (
                                        <PanelListItem
                                            key={entity.id}
                                            id={entity.id}
                                            name={entity.name}
                                            heightString={getHeightString(entity.heightCm)}
                                            onAdd={() => onAddEntity(entity)}
                                            addAriaLabel={`Add ${entity.name} to comparison`}
                                            avatarNode={
                                                <div
                                                    className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-white font-bold text-lg border border-border/50 shadow-sm"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${entity.color}dd, ${entity.color}88)`
                                                    }}
                                                >
                                                    {entity.icon}
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

            {/* Fixed CTA Bottom */}
            <div className="sticky bottom-0 left-0 w-full p-6 pt-2 bg-gradient-to-t from-surface via-surface to-transparent shrink-0 flex flex-col gap-3">
                <button
                    onClick={() => onExport?.()}
                    disabled={isCapturing}
                    aria-label="Export comparison as PNG"
                    className="w-full bg-accent hover:bg-accent/90 text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isCapturing ? (
                        <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                            <span>Exporting...</span>
                        </>
                    ) : (
                        <>
                            <Plus size={18} strokeWidth={3} className="rotate-45" />
                            Export Comparison (PNG)
                        </>
                    )}
                </button>
                <button
                    onClick={() => onClose()}
                    aria-label="Back to Add Custom Person"
                    className="w-full bg-surface border border-border/50 hover:bg-bg text-muted hover:text-foreground font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    Add Custom Person
                </button>
            </div>
        </div>
    );
};

export default EntitiesPanel;