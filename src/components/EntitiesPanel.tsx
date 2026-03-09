'use client';

import React, { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Entity, EntityCategory } from '../types';
import { entities } from '../data/entities';

interface EntitiesPanelProps {
    onAddEntity: (entity: Entity) => void;
    onClose: () => void;
    onExport?: () => void;
    isCapturing?: boolean;
}

const CATEGORIES: EntityCategory[] = [
    'All',
    'Landmarks',
    'Nature',
    'Transport'
];

export const EntitiesPanel: React.FC<EntitiesPanelProps> = ({ onAddEntity, onClose, onExport, isCapturing }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<EntityCategory>('All');
    const [isSearching, setIsSearching] = useState(false);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { All: entities.length };
        entities.forEach(e => {
            counts[e.category] = (counts[e.category] || 0) + 1;
        });
        return counts;
    }, []);

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
        setIsSearching(true);
        setTimeout(() => setIsSearching(false), 300);
    };

    return (
        <div className="flex flex-col h-full bg-surface text-foreground font-sans relative w-full flex-shrink-0 z-50">
            {/* Header Area */}
            <div className="px-6 pt-6 pb-2 shrink-0 hidden sm:block">
                <h2 className="text-base font-black uppercase tracking-tight text-foreground mb-1">Entities & Objects</h2>
                <p className="text-[11px] font-medium text-muted">Compare real-world dimensions</p>
            </div>

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
            <div className="shrink-0">
                <div className="flex overflow-x-auto gap-1.5 px-6 py-3 hide-scrollbar">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            aria-label={`Show ${category} entities`}
                            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-all duration-300 flex items-center gap-2 ${activeCategory === category
                                ? 'bg-accent text-white'
                                : 'bg-bg text-muted hover:text-foreground'
                                }`}
                        >
                            <span>{category}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeCategory === category ? 'bg-white/20' : 'bg-surface/50'}`}>
                                {categoryCounts[category] || 0}
                            </span>
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
                                        <div
                                            key={entity.id}
                                            className="group flex items-center justify-between p-2.5 bg-bg border border-border/30 rounded-2xl hover:border-accent/30 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                {/* Icon/Avatar Style */}
                                                <div
                                                    className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-white font-bold text-lg border border-border/50 shadow-sm"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${entity.color}dd, ${entity.color}88)`
                                                    }}
                                                >
                                                    {entity.icon}
                                                </div>

                                                {/* Info */}
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-bold text-foreground truncate leading-tight">{entity.name}</span>
                                                    <span className="text-[11px] font-bold text-accent mt-0.5">{getHeightString(entity.heightCm)}</span>
                                                </div>
                                            </div>

                                            {/* Add Button */}
                                            <button
                                                onClick={() => onAddEntity(entity)}
                                                className="w-8 h-8 shrink-0 flex items-center justify-center rounded-xl bg-surface text-accent hover:bg-accent hover:text-white border border-border/50 transition-all active:scale-95 shadow-sm"
                                                aria-label={`Add ${entity.name} to comparison`}
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
