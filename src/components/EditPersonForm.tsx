'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Gender, UnitSystem, COLOR_PALETTE, Person } from '../types';
import { ALL_AVATARS, AVATAR_CATEGORIES, AvatarCategory, DEFAULT_FEMALE_AVATAR, DEFAULT_MALE_AVATAR } from '../constants/avatars';
import { useUnitStore } from '../store';
import { handleInputChange } from '../utils/input';
import { NumericInput } from './ui/NumericInput';
import AlignmentControl from './AlignmentControl';

interface EditPersonFormProps {
    person: Person;
    onSave: (person: Person) => void;
    onUpdate?: (person: Person) => void;
    onCancel: () => void;
}

const EditPersonForm: React.FC<EditPersonFormProps> = ({ person, onSave, onUpdate, onCancel }) => {
    const { unitSystem: globalUnit } = useUnitStore();

    const [gender, setGender] = useState<Gender>(person.gender || 'other');
    const [name, setName] = useState(person.name);
    const [unit, setUnit] = useState<UnitSystem>(globalUnit);

    const [heightCm, setHeightCm] = useState<number | ''>(Math.round(person.heightCm));

    const ftDecimal = person.heightCm * 0.0328084;
    const ft = Math.floor(ftDecimal);
    const inch = Math.round((ftDecimal - ft) * 12);

    const [heightFt, setHeightFt] = useState<number | ''>(ft);
    const [heightIn, setHeightIn] = useState<number | ''>(inch);

    const [color, setColor] = useState(person.color || COLOR_PALETTE[2]);
    const [icon, setIcon] = useState(person.icon || '');
    const [offsetY, setOffsetY] = useState<number>(person.offsetY || 0);
    const [avatarUrl, setAvatarUrl] = useState(person.imgUrl || (gender === 'male' ? DEFAULT_MALE_AVATAR : DEFAULT_FEMALE_AVATAR));
    const [selectedCategory, setSelectedCategory] = useState<AvatarCategory>(
        (ALL_AVATARS.find(a => a.path === person.imgUrl)?.category as AvatarCategory) || 'Adult (Standard)'
    );
    const categoryContainerRef = React.useRef<HTMLDivElement>(null);
    const isHumanAvatar = !person.isEntity && ALL_AVATARS.some(av => av.path === person.imgUrl);
    const [error, setError] = useState<string | null>(null);

    // Track manual selection
    const isManuallySelected = React.useRef(false);

    // Auto-select avatar category based on height
    useEffect(() => {
        if (isManuallySelected.current) return;

        let finalHeightCm = 0;
        if (unit === 'metric') {
            finalHeightCm = typeof heightCm === 'number' ? heightCm : (parseFloat(String(heightCm)) || 0);
        } else {
            const f = typeof heightFt === 'number' ? heightFt : 0;
            const i = typeof heightIn === 'number' ? heightIn : 0;
            finalHeightCm = (f * 30.48) + (i * 2.54);
        }

        if (finalHeightCm > 10) {
            const { getAutoCategoryByHeight, getDefaultAvatarForCategory } = require('../utils/avatarUtils');
            const category = getAutoCategoryByHeight(finalHeightCm);
            if (category !== selectedCategory) {
                setSelectedCategory(category);
                setAvatarUrl(getDefaultAvatarForCategory(category, gender));
            }
        }
    }, [heightCm, heightFt, heightIn, unit, gender, selectedCategory]);

    // Auto-scroll to selected category
    useEffect(() => {
        if (categoryContainerRef.current) {
            const activeBtn = categoryContainerRef.current.querySelector('[data-active="true"]');
            if (activeBtn) {
                activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [selectedCategory]);

    // Instant Preview logic
    useEffect(() => {
        if (!onUpdate) return;

        let finalHeightCm = 0;
        if (unit === 'metric') {
            finalHeightCm = typeof heightCm === 'number' ? heightCm : (parseFloat(String(heightCm)) || 0);
        } else {
            const f = typeof heightFt === 'number' ? heightFt : 0;
            const i = typeof heightIn === 'number' ? heightIn : 0;
            finalHeightCm = (f * 30.48) + (i * 2.54);
        }

        // Deep compare (simple version) to avoid unnecessary updates
        const hasChanged =
            name !== person.name ||
            finalHeightCm !== person.heightCm ||
            gender !== person.gender ||
            color !== person.color ||
            offsetY !== person.offsetY ||
            avatarUrl !== person.imgUrl ||
            (person.isEntity && icon !== person.icon);

        if (hasChanged && finalHeightCm > 10) {
            onUpdate({
                ...person,
                name: name || (gender === 'male' ? 'Man' : gender === 'female' ? 'Woman' : 'Person'),
                heightCm: finalHeightCm,
                gender,
                color,
                imgUrl: avatarUrl,
                icon: person.isEntity ? icon : undefined,
                offsetY: Number(offsetY) || 0
            });
        }
    }, [name, heightCm, heightFt, heightIn, unit, gender, color, icon, offsetY, onUpdate]); // Removed 'person' from deps

    const handleSave = () => {
        let finalHeightCm = 0;
        if (unit === 'metric') {
            finalHeightCm = typeof heightCm === 'number' ? heightCm : 0;
        } else {
            const f = typeof heightFt === 'number' ? heightFt : 0;
            const i = typeof heightIn === 'number' ? heightIn : 0;
            finalHeightCm = (f * 30.48) + (i * 2.54);
        }



        onSave({
            ...person,
            name: name || (gender === 'male' ? 'Man' : gender === 'female' ? 'Woman' : 'Person'),
            heightCm: finalHeightCm,
            gender,
            color,
            imgUrl: avatarUrl,
            icon: person.isEntity ? (icon || person.icon) : undefined,
            offsetY
        });
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
                    aria-label="Close edit form"
                    className="text-muted hover:text-white transition-colors bg-white/5 rounded-full p-1"
                >
                    <X size={14} />
                </motion.button>
            </div>

            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-wider p-3 rounded-xl flex items-center gap-2"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    {error}
                </motion.div>
            )}

            {/* Gender Toggle */}
            {isHumanAvatar && (
                <div className="flex p-0.5 bg-surface rounded-2xl border border-border">
                    <button
                        onClick={() => {
                            setGender('male');
                            setIcon('');
                            setAvatarUrl(DEFAULT_MALE_AVATAR);
                        }}
                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${gender === 'male' ? 'bg-accent text-zinc-950 shadow-md' : 'text-muted hover:text-foreground'
                            }`}
                    >
                        Male
                    </button>
                    <button
                        onClick={() => {
                            setGender('female');
                            setIcon('');
                            setAvatarUrl(DEFAULT_FEMALE_AVATAR);
                        }}
                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${gender === 'female' ? 'bg-accent text-zinc-950 shadow-md' : 'text-muted hover:text-foreground'
                            }`}
                    >
                        Female
                    </button>
                </div>
            )}

            <div className="space-y-4">
                {/* Name Input */}
                <div className="space-y-1.5">
                    <label htmlFor="edit-name" className="text-[11px] uppercase tracking-widest font-black text-foreground/60 ml-0.5">Identity</label>
                    <input
                        id="edit-name"
                        type="text"
                        placeholder="Name (Optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-bg border border-border rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted/30 focus:outline-none focus:border-accent/40 transition-all duration-300"
                    />
                </div>

                {person.isEntity && (
                    <div className="space-y-1.5">
                        <label htmlFor="edit-icon" className="text-[11px] uppercase tracking-widest font-black text-foreground/60 ml-0.5">Icon / Emoji</label>
                        <input
                            id="edit-icon"
                            type="text"
                            placeholder="Enter single emoji or icon"
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            className="w-full bg-bg border border-border rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted/30 focus:outline-none focus:border-accent/40 transition-all duration-300"
                        />
                    </div>
                )}

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
                                <label htmlFor="edit-height-cm" className="sr-only">Height in centimeters</label>
                                <NumericInput
                                    id="edit-height-cm"
                                    placeholder="Height"
                                    value={heightCm}
                                    onValueChange={(val) => { setHeightCm(val); setError(null); }}
                                    className="w-full bg-transparent px-4 py-3 text-sm text-foreground focus:outline-none"
                                />
                                <div className="px-4 py-3 bg-surface text-foreground font-mono text-sm font-black border-l border-border flex items-center justify-center">
                                    CM
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-2 w-full">
                                <div className="flex-1 flex bg-bg border border-border rounded-xl overflow-hidden focus-within:border-accent/40 transition-all">
                                    <label htmlFor="edit-height-ft" className="sr-only">Height in feet</label>
                                    <NumericInput
                                        id="edit-height-ft"
                                        placeholder="Ft"
                                        value={heightFt}
                                        onValueChange={(val) => { setHeightFt(val); setError(null); }}
                                        className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-foreground focus:outline-none"
                                    />
                                    <div className="px-2.5 py-3 bg-surface text-foreground font-mono text-[11px] font-black border-l border-border flex items-center justify-center shrink-0">
                                        FT
                                    </div>
                                </div>
                                <div className="flex-1 flex bg-bg border border-border rounded-xl overflow-hidden focus-within:border-accent/40 transition-all">
                                    <label htmlFor="edit-height-in" className="sr-only">Height in inches</label>
                                    <NumericInput
                                        id="edit-height-in"
                                        placeholder="In"
                                        value={heightIn}
                                        onValueChange={(val) => { setHeightIn(val); setError(null); }}
                                        className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-foreground focus:outline-none"
                                    />
                                    <div className="px-2.5 py-3 bg-surface text-foreground font-mono text-[11px] font-black border-l border-border flex items-center justify-center shrink-0">
                                        IN
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Avatar Selection */}
                {isHumanAvatar && (gender === 'male' || gender === 'female') && !person.isEntity && (
                    <div className="space-y-4">
                        <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60 ml-0.5">Avatar Style</label>

                        {/* Category Selector */}
                        <div ref={categoryContainerRef} className="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
                            {AVATAR_CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    data-active={selectedCategory === cat}
                                    onClick={() => { setSelectedCategory(cat); isManuallySelected.current = true; }}
                                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${selectedCategory === cat
                                        ? 'bg-accent text-zinc-950 border-accent shadow-md'
                                        : 'bg-surface text-muted border-border hover:border-accent/30'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 bg-surface/50 p-3 rounded-[2rem] border border-border/50">
                            {ALL_AVATARS.filter(a => a.gender === gender && a.category === selectedCategory).map((av) => (
                                <button
                                    key={av.id}
                                    onClick={() => { setAvatarUrl(av.path); isManuallySelected.current = true; }}
                                    title={av.label}
                                    aria-label={`Select ${av.label} avatar`}
                                    className={`aspect-square rounded-2xl border-2 p-1.5 transition-all flex items-center justify-center overflow-hidden ${avatarUrl === av.path ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/40 bg-bg'
                                        }`}
                                >
                                    <div
                                        className="w-full h-full bg-foreground transition-colors"
                                        style={{
                                            maskImage: `url('${encodeURI(av.path)}')`,
                                            maskRepeat: 'no-repeat',
                                            maskPosition: 'bottom center',
                                            maskSize: 'contain',
                                            WebkitMaskImage: `url('${encodeURI(av.path)}')`,
                                            WebkitMaskRepeat: 'no-repeat',
                                            WebkitMaskPosition: 'bottom center',
                                            WebkitMaskSize: 'contain'
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Color Swatches */}
            {isHumanAvatar && (
                <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-foreground ml-0.5">Color</label>
                    <div className="flex gap-2.5">
                        {COLOR_PALETTE.slice(0, 6).map((c) => (
                            <motion.button
                                key={c}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setColor(c)}
                                aria-label={`Select color ${c}`}
                                className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${color === c ? 'border-foreground scale-110 shadow-lg' : 'border-white/20 hover:border-white/40'
                                    }`}
                                style={{ backgroundColor: c, boxShadow: color === c ? `0 0 12px ${c}44` : 'none' }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {person.imgUrl && (
                <AlignmentControl
                    offsetY={offsetY}
                    onOffsetChange={(val) => setOffsetY(val)}
                />
            )}

            {/* Save Button */}
            <motion.button
                whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="w-full bg-accent text-zinc-950 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-accent/10"
            >
                Save Changes
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={4} />
            </motion.button>

        </motion.div>
    );
};

export default EditPersonForm;
