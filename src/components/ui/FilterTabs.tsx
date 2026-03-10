import React from 'react';
import { motion } from 'framer-motion';

export interface FilterTabsProps {
    categories: string[];
    activeCategory: string;
    onSelectCategory: (category: string) => void;
    categoryCounts?: Record<string, number>;
    isSearching?: boolean;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
    categories,
    activeCategory,
    onSelectCategory,
    categoryCounts,
    isSearching = false
}) => {
    return (
        <div className="shrink-0">
            <div className="flex overflow-x-auto gap-1.5 px-6 py-3 hide-scrollbar">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        aria-label={`Show ${category}`}
                        className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-all duration-300 flex items-center gap-2 ${activeCategory === category
                                ? 'bg-accent text-white'
                                : 'bg-bg text-muted hover:text-foreground'
                            }`}
                    >
                        <span>{category}</span>
                        {categoryCounts && categoryCounts[category] !== undefined && (
                            <span
                                className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeCategory === category ? 'bg-white/20' : 'bg-surface/50'
                                    }`}
                            >
                                {categoryCounts[category]}
                            </span>
                        )}
                    </button>
                ))}
            </div>
            {/* Loader bar */}
            <div className="px-6">
                <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: isSearching ? '100%' : '-100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="h-full w-1/2 bg-accent/50 rounded-full shadow-[0_0_10px_var(--accent)]"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterTabs;
