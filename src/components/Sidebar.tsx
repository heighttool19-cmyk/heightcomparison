'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Person, Entity } from '../types';

const LoadingPanel = () => (
    <div className="flex-1 flex flex-col items-center justify-center h-full w-full opacity-50 space-y-4 min-h-[300px]">
        <div className="w-8 h-8 border-4 border-accent border-r-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase text-accent tracking-[0.2em] animate-pulse">Loading...</p>
    </div>
);

import AddPersonForm from './AddPersonForm';
import PersonChart from './PersonChart';
import QuickAddPresets from './QuickAddPresets';
import EditPersonForm from './EditPersonForm';

const AddImageForm = dynamic(() => import('./AddImageForm'), { loading: () => <LoadingPanel /> });
const CelebritiesPanel = dynamic(() => import('./CelebritiesPanel'), { loading: () => <LoadingPanel /> });
const FictionalPanel = dynamic(() => import('./FictionalPanel').then(mod => mod.FictionalPanel), { loading: () => <LoadingPanel /> });
const EntitiesPanel = dynamic(() => import('./EntitiesPanel'), { loading: () => <LoadingPanel /> });

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
    onEditUpdate?: (person: Person) => void;
    onEditCancel?: () => void;
    onAddEntityExport?: () => void;
    isCapturing?: boolean;
    onEditRequest?: (id: string) => void;
    onReorder?: (id: string, direction: 'up' | 'down') => void;
    highlight?: boolean;
}

const Sidebar: React.FC<SidebarProps> = React.memo(({ persons, personCount, onAdd, onAddEntity, onRemove, scale, zoom, activePanel = 'ADD_PERSON', editingPerson, onEditSave, onEditUpdate, onEditCancel, onAddEntityExport, isCapturing, onEditRequest, onReorder, highlight }) => {
    return (
        <aside className="w-full h-full flex flex-col bg-transparent">
            {/* ... component content ... */}
            <div className={`flex flex-col h-full overflow-y-auto overflow-x-hidden custom-scrollbar ${activePanel === 'CELEBRITIES' || activePanel === 'FICTIONAL' || activePanel === 'ENTITIES' ? '' : 'p-5 gap-6'}`}>
                <AnimatePresence mode="popLayout" initial={false}>
                    {activePanel === 'ADD_PERSON' && (
                        <motion.div
                            key="add_person"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-6 w-full min-w-0"
                        >
                            <AddPersonForm onAdd={onAdd} personCount={personCount} />
                            <PersonChart
                                persons={persons}
                                onRemove={onRemove}
                                onEdit={onEditRequest}
                                onReorder={onReorder}
                                highlight={highlight}
                            />
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
                            <PersonChart
                                persons={persons}
                                onRemove={onRemove}
                                onEdit={onEditRequest}
                                onReorder={onReorder}
                                highlight={highlight}
                            />
                        </motion.div>
                    )}
                    {activePanel === 'EDIT_PERSON' && editingPerson && onEditSave && onEditCancel && (
                        <motion.div
                            key={`edit_${editingPerson.id}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-6"
                        >
                            <EditPersonForm
                                person={editingPerson}
                                onSave={onEditSave}
                                onUpdate={onEditUpdate}
                                onCancel={onEditCancel}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </aside>
    );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;

