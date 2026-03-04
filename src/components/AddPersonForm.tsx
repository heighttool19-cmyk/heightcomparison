'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Gender, UnitSystem, COLOR_PALETTE, uid, Person } from '../types';

interface AddPersonFormProps {
    onAdd: (person: Person) => void;
}

const AddPersonForm: React.FC<AddPersonFormProps> = ({ onAdd }) => {
    const [gender, setGender] = useState<Gender>('male');
    const [name, setName] = useState('');
    const [unit, setUnit] = useState<UnitSystem>('metric');
    const [heightCm, setHeightCm] = useState<string>('');
    const [heightFt, setHeightFt] = useState<string>('');
    const [heightIn, setHeightIn] = useState<string>('');
    const [color, setColor] = useState(COLOR_PALETTE[2]); // Indigo default

    const handleAdd = () => {
        let finalHeightCm = 0;
        if (unit === 'metric') {
            finalHeightCm = parseFloat(heightCm) || 0;
        } else {
            const ft = parseFloat(heightFt) || 0;
            const inch = parseFloat(heightIn) || 0;
            finalHeightCm = (ft * 30.48) + (inch * 2.54);
        }

        if (finalHeightCm > 0) {
            onAdd({
                id: uid(),
                name: name || (gender === 'male' ? 'Man' : gender === 'female' ? 'Woman' : 'Person'),
                heightCm: finalHeightCm,
                gender,
                color,
            });
            // Reset form
            setName('');
            setHeightCm('');
            setHeightFt('');
            setHeightIn('');
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-accent rounded-full" />
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-foreground/40">Add Subject</h2>
            </div>

            {/* Gender Toggle */}
            <div className="flex p-0.5 bg-surface/50 rounded-xl border border-border">
                <button
                    onClick={() => setGender('male')}
                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all duration-300 ${gender === 'male' ? 'bg-background text-foreground shadow-sm' : 'text-muted hover:text-foreground'
                        }`}
                >
                    Male
                </button>
                <button
                    onClick={() => setGender('female')}
                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all duration-300 ${gender === 'female' ? 'bg-background text-foreground shadow-sm' : 'text-muted hover:text-foreground'
                        }`}
                >
                    Female
                </button>
            </div>

            <div className="space-y-4">
                {/* Name Input */}
                <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-muted/60 ml-0.5">Identity</label>
                    <input
                        type="text"
                        placeholder="Name (Optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-muted/30 focus:outline-none focus:border-accent/40 transition-all duration-300"
                    />
                </div>

                {/* Unit & Height Container */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-0.5">
                        <label className="text-[9px] uppercase tracking-widest font-bold text-muted/60">Dimension</label>
                        <div className="flex gap-1.5">
                            {(['metric', 'imperial'] as UnitSystem[]).map((u) => (
                                <button
                                    key={u}
                                    onClick={() => setUnit(u)}
                                    className={`text-[8px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded border transition-all ${unit === u ? 'border-accent/40 text-accent bg-accent/5' : 'border-border text-muted/40'
                                        }`}
                                >
                                    {u === 'metric' ? 'Metric' : 'Imp'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {unit === 'metric' ? (
                            <input
                                type="number"
                                placeholder="Height (cm)"
                                value={heightCm}
                                onChange={(e) => setHeightCm(e.target.value)}
                                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent/40 transition-all"
                            />
                        ) : (
                            <>
                                <input
                                    type="number"
                                    placeholder="Ft"
                                    value={heightFt}
                                    onChange={(e) => setHeightFt(e.target.value)}
                                    className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent/40 transition-all"
                                />
                                <input
                                    type="number"
                                    placeholder="In"
                                    value={heightIn}
                                    onChange={(e) => setHeightIn(e.target.value)}
                                    className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent/40 transition-all"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest font-bold text-muted/60 ml-0.5">Accent</label>
                <div className="flex gap-2.5">
                    {COLOR_PALETTE.slice(0, 6).map((c) => (
                        <button
                            key={c}
                            onClick={() => setColor(c)}
                            className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${color === c ? 'border-foreground scale-110' : 'border-transparent opacity-50 hover:opacity-100'
                                }`}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <button
                onClick={handleAdd}
                className="w-full bg-accent hover:bg-accent-secondary text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
                Add Subject
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={3} />
            </button>

        </div>
    );
};

export default AddPersonForm;

