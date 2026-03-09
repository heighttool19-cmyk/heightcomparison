'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Person, Entity } from '../types';

const AddPersonForm = dynamic(() => import('./AddPersonForm'));
const PersonChart = dynamic(() => import('./PersonChart'));
const QuickAddPresets = dynamic(() => import('./QuickAddPresets'));
const AddImageForm = dynamic(() => import('./AddImageForm'));
const EditPersonForm = dynamic(() => import('./EditPersonForm'));
const CelebritiesPanel = dynamic(() => import('./CelebritiesPanel'));
const FictionalPanel = dynamic(() => import('./FictionalPanel').then(mod => mod.FictionalPanel));
const EntitiesPanel = dynamic(() => import('./EntitiesPanel'));

interface SidebarProps {
    persons: Person[];
    onAdd: (person: Person) => void;
    onAddEntity?: (entity: Entity) => void;
    onRemove: (id: string) => void;
    scale: number;
    zoom: number;
    activePanel?: string;
    personCount: number;
    editingPerson?: Person;
    onEditSave?: (person: Person) => void;
    onEditCancel?: () => void;
    onAddEntityExport?: () => void;
    isCapturing?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ persons, personCount, onAdd, onAddEntity, onRemove, scale, zoom, activePanel = 'ADD_PERSON', editingPerson, onEditSave, onEditCancel, onAddEntityExport, isCapturing }) => {
    return (
        <aside className="w-full h-full flex flex-col bg-transparent">
            <div className={`flex flex-col h-full overflow-y-auto custom-scrollbar ${activePanel === 'CELEBRITIES' || activePanel === 'FICTIONAL' || activePanel === 'ENTITIES' ? '' : 'p-5 gap-6'}`}>
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
                            className="flex-1 flex flex-col h-full w-full"
                        >
                            <CelebritiesPanel onAddPerson={onAdd} onClose={onEditCancel || (() => { })} />
                        </motion.div>
                    )}
                    {activePanel === 'ENTITIES' && (
                        <motion.div
                            key="entities"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1 flex flex-col h-full w-full"
                        >
                            <EntitiesPanel
                                onAddEntity={onAddEntity || (() => { })}
                                onClose={onEditCancel || (() => { })}
                                onExport={onAddEntityExport}
                                isCapturing={isCapturing}
                            />
                        </motion.div>
                    )}
                    {activePanel === 'FICTIONAL' && (
                        <motion.div
                            key="fictional"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1 flex flex-col h-full w-full"
                        >
                            <FictionalPanel onAddPerson={onAdd} onClose={onEditCancel || (() => { })} />
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

