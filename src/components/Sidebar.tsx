'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X as CloseIcon } from 'lucide-react';
import { Person } from '../types';
import AddPersonForm from './AddPersonForm';
import PersonChart from './PersonChart';
import QuickAddPresets from './QuickAddPresets';

interface SidebarProps {
    persons: Person[];
    onAdd: (person: Person) => void;
    onRemove: (id: string) => void;
    scale: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ persons, onAdd, onRemove, scale, isOpen, setIsOpen }) => {
    return (
        <>
            {/* Backdrop for Mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-background/60 backdrop-blur-md z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Content */}
            <motion.aside
                initial={false}
                animate={{
                    x: isOpen ? 0 : '100%',
                    opacity: 1
                }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className="fixed top-0 right-0 w-full max-w-[300px] h-screen glass-surface flex flex-col z-50 shadow-2xl overflow-hidden"
            >
                {/* Mobile Close Button Header */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-border/50 bg-background/20">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted">Management Console</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 bg-surface border border-border rounded-xl text-muted hover:text-accent transition-colors shadow-sm"
                    >
                        <CloseIcon size={18} strokeWidth={3} />
                    </button>
                </div>

                <div className="flex flex-col h-full bg-surface/10 backdrop-blur-3xl overflow-y-auto custom-scrollbar pt-2">
                    {/* Top: Add Form */}
                    <AddPersonForm onAdd={onAdd} />

                    {/* Middle: Chart (Scrollable) */}
                    <PersonChart persons={persons} onRemove={onRemove} />

                    {/* Bottom: Presets & Scale Info */}
                    <QuickAddPresets onAdd={onAdd} scale={scale} />
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;

