'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Person, uid, HEIGHT_LIMITS } from '../types';
import { UploadCloud } from 'lucide-react';

interface AddImageFormProps {
    onAdd: (person: Person) => void;
}

const AddImageForm: React.FC<AddImageFormProps> = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [height, setHeight] = useState('170');
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file.');
            return;
        }

        const h = parseFloat(height);
        if (isNaN(h) || h < HEIGHT_LIMITS.MIN_CM || h > HEIGHT_LIMITS.MAX_CM) {
            setError(`Height must be between ${HEIGHT_LIMITS.MIN_CM} and ${HEIGHT_LIMITS.MAX_CM} cm.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result as string;
            if (result) {
                onAdd({
                    id: uid(),
                    name: name.trim() || 'Custom Image',
                    heightCm: h,
                    gender: 'other',
                    color: '#3B82F6',
                    imgUrl: result
                });
                // Reset slightly
                setName('');
                setError('');
                if (inputRef.current) inputRef.current.value = '';
            }
        };
        reader.onerror = () => setError('Failed to read file.');
        reader.readAsDataURL(file);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-surface border border-border/50 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 transition-colors duration-500"
        >
            <h2 className="text-sm font-black text-foreground tracking-[0.15em] uppercase border-b border-border/50 pb-2 mb-2 transition-colors">Add Custom Image</h2>

            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Subject Name (e.g., Car)"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                />

                <div className="flex bg-background border border-border rounded-xl overflow-hidden focus-within:border-accent transition-colors">
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Height"
                        className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none"
                    />
                    <div className="px-4 py-3 bg-surface text-foreground/60 font-mono text-sm font-black border-l border-border flex items-center justify-center">
                        cm
                    </div>
                </div>

                {error && <p className="text-red-500 text-xs px-1">{error}</p>}

                <div className="mt-2">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={inputRef}
                        onChange={handleFileChange}
                    />
                    <button
                        onClick={() => inputRef.current?.click()}
                        className="w-full bg-accent hover:bg-accent-secondary text-white font-black py-4 px-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-accent/20 uppercase tracking-widest text-xs"
                    >
                        <UploadCloud size={18} />
                        Upload & Add
                    </button>
                    <p className="text-[11px] text-muted font-black text-center mt-3 uppercase tracking-wider">Background-free PNGs recommended</p>
                </div>
            </div>
        </motion.div>
    );
};

export default AddImageForm;
