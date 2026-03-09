'use client';

import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Gender, UnitSystem, COLOR_PALETTE, Person } from '../types';
import { useUnitStore } from '../store';

interface EditPersonFormProps {
    person: Person;
    onSave: (person: Person) => void;
    onCancel: () => void;
}

const EditPersonForm: React.FC<EditPersonFormProps> = ({ person, onSave, onCancel }) => {
    const { unitSystem: globalUnit } = useUnitStore();

    const [gender, setGender] = useState<Gender>(person.gender || 'other');
    const [name, setName] = useState(person.name);
    const [unit, setUnit] = useState<UnitSystem>(globalUnit);

    const [heightCm, setHeightCm] = useState<string>(Math.round(person.heightCm).toString());

    const ftDecimal = person.heightCm * 0.0328084;
    const ft = Math.floor(ftDecimal);
    const inch = Math.round((ftDecimal - ft) * 12);

    const [heightFt, setHeightFt] = useState<string>(ft.toString());
    const [heightIn, setHeightIn] = useState<string>(inch.toString());

    const [color, setColor] = useState(person.color || COLOR_PALETTE[2]);

    const handleSave = () => {
        let finalHeightCm = 0;
        if (unit === 'metric') {
            finalHeightCm = parseFloat(heightCm) || 0;
        } else {
            const f = parseFloat(heightFt) || 0;
            const i = parseFloat(heightIn) || 0;
            finalHeightCm = (f * 30.48) + (i * 2.54);
        }

        if (finalHeightCm > 0) {
            onSave({
                ...person,
                name: name || (gender === 'male' ? 'Man' : gender === 'female' ? 'Woman' : 'Person'),
                heightCm: finalHeightCm,
                gender,
                color,
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 space-y-6"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-accent rounded-full" />
                    <h2 className="text-xs uppercase tracking-[0.2em] font-black text-foreground/70">Edit Subject</h2>
                </div>
                <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onCancel}
                    className="text-muted hover:text-white transition-colors bg-white/5 rounded-full p-1"
                >
                    <X size={14} />
                </motion.button>
            </div>

            {/* Gender Toggle */}
            <div className="flex p-0.5 bg-surface rounded-2xl border border-border">
                <button
                    onClick={() => setGender('male')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${gender === 'male' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'
                        }`}
                >
                    Male
                </button>
                <button
                    onClick={() => setGender('female')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${gender === 'female' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'
                        }`}
                >
                    Female
                </button>
            </div>

            <div className="space-y-4">
                {/* Name Input */}
                <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60 ml-0.5">Identity</label>
                    <input
                        type="text"
                        placeholder="Name (Optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-bg border border-border rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted/30 focus:outline-none focus:border-accent/40 transition-all duration-300"
                    />
                </div>

                {/* Unit & Height Container */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-0.5">
                        <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60">Dimension</label>
                        <div className="flex gap-1.5">
                            {(['metric', 'imperial'] as UnitSystem[]).map((u) => (
                                <button
                                    key={u}
                                    onClick={() => setUnit(u)}
                                    className={`text-[10px] font-bold uppercase tracking-tight px-2.5 py-1 rounded border transition-all ${unit === u ? 'border-accent/40 text-accent bg-accent/5' : 'border-border text-muted/70 hover:text-muted hover:border-muted/30'
                                        }`}
                                >
                                    {u === 'metric' ? 'Metric' : 'Imp'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {unit === 'metric' ? (
                            <div className="flex-1 flex bg-bg border border-border rounded-2xl overflow-hidden focus-within:border-accent/40 transition-all">
                                <input
                                    type="number"
                                    placeholder="Height"
                                    value={heightCm}
                                    onChange={(e) => setHeightCm(e.target.value)}
                                    className="w-full bg-transparent px-4 py-3 text-sm text-foreground focus:outline-none"
                                />
                                <div className="px-4 py-3 bg-surface text-foreground/60 font-mono text-sm font-black border-l border-border flex items-center justify-center">
                                    CM
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-2 w-full">
                                <div className="flex-1 flex bg-bg border border-border rounded-xl overflow-hidden focus-within:border-accent/40 transition-all">
                                    <input
                                        type="number"
                                        placeholder="Ft"
                                        value={heightFt}
                                        onChange={(e) => setHeightFt(e.target.value)}
                                        className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-foreground focus:outline-none"
                                    />
                                    <div className="px-2.5 py-3 bg-surface text-foreground/60 font-mono text-[11px] font-black border-l border-border flex items-center justify-center shrink-0">
                                        FT
                                    </div>
                                </div>
                                <div className="flex-1 flex bg-bg border border-border rounded-xl overflow-hidden focus-within:border-accent/40 transition-all">
                                    <input
                                        type="number"
                                        placeholder="In"
                                        value={heightIn}
                                        onChange={(e) => setHeightIn(e.target.value)}
                                        className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-foreground focus:outline-none"
                                    />
                                    <div className="px-2.5 py-3 bg-surface text-foreground/60 font-mono text-[11px] font-black border-l border-border flex items-center justify-center shrink-0">
                                        IN
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Color Swatches */}
            {!person.imgUrl && (
                <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60 ml-0.5">Accent</label>
                    <div className="flex gap-2.5">
                        {COLOR_PALETTE.slice(0, 6).map((c) => (
                            <motion.button
                                key={c}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setColor(c)}
                                className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${color === c ? 'border-foreground scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'
                                    }`}
                                style={{ backgroundColor: c, boxShadow: color === c ? `0 0 12px ${c}44` : 'none' }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Save Button */}
            <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#3B82F6' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="w-full bg-accent text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-accent/10"
            >
                Save Changes
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={4} />
            </motion.button>

        </motion.div>
    );
};

export default EditPersonForm;
