'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Gender, UnitSystem, COLOR_PALETTE, uid, Person } from '../types';
import { ALL_AVATARS, AVATAR_CATEGORIES, AvatarCategory, DEFAULT_FEMALE_AVATAR, DEFAULT_MALE_AVATAR, ENABLE_SVG_AVATARS } from '../constants/avatars';
import { handleInputChange } from '../utils/input';
import { NumericInput } from './ui/NumericInput';

interface AddPersonFormProps {
    onAdd: (person: Person) => void;
    personCount: number;
}

const AddPersonForm: React.FC<AddPersonFormProps> = ({ onAdd, personCount }) => {
    const [gender, setGender] = useState<Gender>('male');
    const [name, setName] = useState('');
    const [unit, setUnit] = useState<UnitSystem>('metric');
    const [heightCm, setHeightCm] = useState<number | ''>('');
    const [heightFt, setHeightFt] = useState<number | ''>('');
    const [heightIn, setHeightIn] = useState<number | ''>('');
    const [color, setColor] = useState(COLOR_PALETTE[personCount % 8]);
    const [avatarUrl, setAvatarUrl] = useState(DEFAULT_MALE_AVATAR);
    const [selectedCategory, setSelectedCategory] = useState<AvatarCategory>('Adult (Standard)');
    const categoryContainerRef = React.useRef<HTMLDivElement>(null);

    // Track manual selection to avoid auto-overwriting user intent
    const isManuallySelected = React.useRef(false);

    // Update color selection when personCount changes (e.g. initial load or reset)
    React.useEffect(() => {
        setColor(COLOR_PALETTE[personCount % 8]);
    }, [personCount]);

    // Auto-select avatar category based on height
    React.useEffect(() => {
        if (isManuallySelected.current) return;

        let finalHeightCm = 0;
        if (unit === 'metric') {
            finalHeightCm = typeof heightCm === 'number' ? heightCm : 0;
        } else {
            const ft = typeof heightFt === 'number' ? heightFt : 0;
            const inch = typeof heightIn === 'number' ? heightIn : 0;
            finalHeightCm = (ft * 30.48) + (inch * 2.54);
        }

        if (finalHeightCm > 0) {
            const { getAutoCategoryByHeight, getDefaultAvatarForCategory } = require('../utils/avatarUtils');
            const category = getAutoCategoryByHeight(finalHeightCm);
            if (category !== selectedCategory) {
                setSelectedCategory(category);
                setAvatarUrl(getDefaultAvatarForCategory(category, gender));
            }
        }
    }, [heightCm, heightFt, heightIn, unit, gender, selectedCategory]);

    // Auto-scroll to selected category
    React.useEffect(() => {
        if (categoryContainerRef.current) {
            const activeBtn = categoryContainerRef.current.querySelector('[data-active="true"]');
            if (activeBtn) {
                activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [selectedCategory]);

    const handleGenderChange = (newGender: Gender) => {
        setGender(newGender);
        if (newGender === 'male') setAvatarUrl(DEFAULT_MALE_AVATAR);
        else if (newGender === 'female') setAvatarUrl(DEFAULT_FEMALE_AVATAR);
        isManuallySelected.current = false; // Reset on gender change to allow new auto-suggestion
    };
    const handleAdd = () => {
        let finalHeightCm = 0;
        if (unit === 'metric') {
            finalHeightCm = typeof heightCm === 'number' ? heightCm : 0;
        } else {
            const ft = typeof heightFt === 'number' ? heightFt : 0;
            const inch = typeof heightIn === 'number' ? heightIn : 0;
            finalHeightCm = (ft * 30.48) + (inch * 2.54);
        }

        if (finalHeightCm > 0) {
            onAdd({
                id: uid(),
                name: name || (gender === 'male' ? 'Man' : gender === 'female' ? 'Woman' : 'Person'),
                heightCm: finalHeightCm,
                gender,
                color,
                imgUrl: ENABLE_SVG_AVATARS ? avatarUrl : undefined,
            });
            // Reset form
            setName('');
            setHeightCm('');
            setHeightFt('');
            setHeightIn('');
            isManuallySelected.current = false;
            // Automatic color cycling for the next person
            setColor(COLOR_PALETTE[(personCount + 1) % 8]);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="p-6 space-y-6"
        >
            <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-accent rounded-full" />
                <h2 className="text-xs uppercase tracking-[0.2em] font-black text-foreground/70">Enter Your Details</h2>
            </div>

            {/* Gender Toggle */}
            <div className="flex p-0.5 bg-surface rounded-2xl border border-border">
                <button
                    onClick={() => handleGenderChange('male')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${gender === 'male' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'
                        }`}
                >
                    Male
                </button>
                <button
                    onClick={() => handleGenderChange('female')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${gender === 'female' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'
                        }`}
                >
                    Female
                </button>
            </div>

            <div className="space-y-4">
                {/* Name Input */}
                <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60 ml-0.5">Name</label>
                    <input
                        type="text"
                        placeholder="Optional"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-bg border border-border rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted/30 focus:outline-none focus:border-accent/40 transition-all duration-300"
                    />
                </div>

                {/* Unit & Height Container */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-0.5">
                        <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60">Height (CM/FT)</label>
                        <div className="flex gap-1.5">
                            {(['metric', 'imperial'] as UnitSystem[]).map((u) => (
                                <button
                                    key={u}
                                    onClick={() => setUnit(u)}
                                    className={`text-[12px] font-bold uppercase tracking-tight px-2.5 py-1 rounded border transition-all ${unit === u ? 'border-accent/40 text-accent bg-accent/5' : 'border-border text-muted/70 hover:text-muted hover:border-muted/30'
                                        }`}
                                >
                                    {u === 'metric' ? 'CM' : 'FT'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {unit === 'metric' ? (
                            <div className="w-full flex bg-bg border border-border rounded-2xl overflow-hidden focus-within:border-accent/40 transition-all">
                                <NumericInput
                                    placeholder="Height"
                                    value={heightCm}
                                    onValueChange={setHeightCm}
                                    className="w-full bg-transparent px-4 py-3 text-sm text-foreground focus:outline-none"
                                />
                                <div className="px-4 py-3 bg-surface text-foreground/60 font-mono text-sm font-black border-l border-border flex items-center justify-center">
                                    CM
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-2 w-full">
                                <div className="flex-1 flex bg-bg border border-border rounded-xl overflow-hidden focus-within:border-accent/40 transition-all">
                                    <NumericInput
                                        placeholder="Ft"
                                        value={heightFt}
                                        onValueChange={setHeightFt}
                                        className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-foreground focus:outline-none"
                                    />
                                    <div className="px-2.5 py-3 bg-surface text-foreground/60 font-mono text-[11px] font-black border-l border-border flex items-center justify-center shrink-0">
                                        FT
                                    </div>
                                </div>
                                <div className="flex-1 flex bg-bg border border-border rounded-xl overflow-hidden focus-within:border-accent/40 transition-all">
                                    <NumericInput
                                        placeholder="In"
                                        value={heightIn}
                                        onValueChange={setHeightIn}
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

            {/* Avatar Selection */}
            {ENABLE_SVG_AVATARS && (gender === 'male' || gender === 'female') && (
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
                                    ? 'bg-accent text-white border-accent shadow-md'
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

            {/* Color Swatches */}
            <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60 ml-0.5">Color</label>
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

            {/* Submit Button */}
            <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#3B82F6' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                className="w-full bg-accent text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-accent/10"
            >
                <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                Add Person
            </motion.button>

        </motion.div>
    );
};

export default AddPersonForm;
