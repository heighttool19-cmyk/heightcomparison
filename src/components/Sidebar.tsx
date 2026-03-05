'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Person } from '../types';
import AddPersonForm from './AddPersonForm';
import PersonChart from './PersonChart';
import QuickAddPresets from './QuickAddPresets';
import AddImageForm from './AddImageForm';
import EditPersonForm from './EditPersonForm';

interface SidebarProps {
    persons: Person[];
    onAdd: (person: Person) => void;
    onRemove: (id: string) => void;
    scale: number;
    zoom: number;
    activePanel?: string;
    personCount: number;
    editingPerson?: Person;
    onEditSave?: (person: Person) => void;
    onEditCancel?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ persons, personCount, onAdd, onRemove, scale, zoom, activePanel = 'ADD_PERSON', editingPerson, onEditSave, onEditCancel }) => {
    return (
        <aside className="w-full h-full flex flex-col bg-transparent">
            <div className="flex flex-col h-full overflow-y-auto custom-scrollbar p-5 gap-6">
                <AnimatePresence mode="popLayout" initial={false}>
                    {activePanel === 'ADD_PERSON' && (
                        <motion.div
                            key="add_person"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-6"
                        >
                            <AddPersonForm onAdd={onAdd} personCount={personCount} />
                            <PersonChart persons={persons} onRemove={onRemove} />
                            <QuickAddPresets onAdd={onAdd} scale={scale} zoom={zoom} />
                        </motion.div>
                    )}
                    {activePanel === 'CELEBRITIES' && (
                        <motion.div
                            key="celebrities"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1 flex items-center justify-center text-muted/50 text-xs font-medium uppercase tracking-widest text-center px-4"
                        >
                            Celebrities module coming soon
                        </motion.div>
                    )}
                    {activePanel === 'ENTITIES' && (
                        <motion.div
                            key="entities"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1 flex items-center justify-center text-muted/50 text-xs font-medium uppercase tracking-widest text-center px-4"
                        >
                            Entities module coming soon
                        </motion.div>
                    )}
                    {activePanel === 'ADD_IMAGE' && (
                        <motion.div
                            key="add_image"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-6"
                        >
                            <AddImageForm onAdd={onAdd} />
                            <PersonChart persons={persons} onRemove={onRemove} />
                        </motion.div>
                    )}
                    {activePanel === 'EDIT_PERSON' && editingPerson && onEditSave && onEditCancel && (
                        <motion.div
                            key="edit_person"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-6"
                        >
                            <EditPersonForm
                                person={editingPerson}
                                onSave={onEditSave}
                                onCancel={onEditCancel}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </aside>
    );
};

export default Sidebar;

