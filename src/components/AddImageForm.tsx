'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Person, uid, UnitSystem } from '../types';
import { UploadCloud, X, Crop as CropIcon, Check } from 'lucide-react';
import { handleInputChange } from '../utils/input';
import { NumericInput } from './ui/NumericInput';
import { CropModal } from './ImageMeasurementCom/components/CropModal';
import { type PixelCrop } from 'react-image-crop';

interface AddImageFormProps {
    onAdd: (person: Person) => void;
}

const AddImageForm: React.FC<AddImageFormProps> = ({ onAdd }) => {
    // Form state
    const [name, setName] = useState('');
    const [unit, setUnit] = useState<UnitSystem>('metric');
    const [heightCm, setHeightCm] = useState<number | ''>('');
    const [heightFt, setHeightFt] = useState<number | ''>('');
    const [heightIn, setHeightIn] = useState<number | ''>('');
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Image/Crop state
    const [pendingImageUrl, setPendingImageUrl] = useState<string | null>(null);
    const [showCropModal, setShowCropModal] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    /* ─────────────────── File Handling ─────────────────── */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file.');
            return;
        }

        setError('');
        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target?.result as string;
            if (result) {
                setPendingImageUrl(result);
                // We DO NOT open the modal yet. Just show preview.
            }
        };
        reader.onerror = () => setError('Failed to read file.');
        reader.readAsDataURL(file);
        if (inputRef.current) inputRef.current.value = '';
    };

    const handleProceedToCrop = () => {
        // Validate height before opening modal
        let finalH = 0;
        if (unit === 'metric') {
            if (!heightCm) { setError('Please enter height first'); return; }
            finalH = Number(heightCm);
        } else {
            if (!heightFt && !heightIn) { setError('Please enter height first'); return; }
            finalH = (Number(heightFt) || 0) * 30.48 + (Number(heightIn) || 0) * 2.54;
        }

        if (finalH <= 0 || finalH > 1000000) {
            setError('Height must be between 1 and 1,000,000 cm');
            return;
        }

        setError('');
        setShowCropModal(true);
    };

    const resetSelection = () => {
        setPendingImageUrl(null);
        setError('');
        if (inputRef.current) inputRef.current.value = '';
    };

    /* ─────────────────── Apply Crop → add Person ─────────────────── */
    const applyCrop = async (pixelCrop: PixelCrop) => {
        if (!pendingImageUrl) return;
        setIsUploading(true);
        setError('');

        const img = new Image();
        img.onload = async () => {
            const canvas = document.createElement('canvas');
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) { setIsUploading(false); return; }

            ctx.drawImage(img, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, canvas.width, canvas.height);

            try {
                const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
                if (!blob) throw new Error('Failed to create blob');

                const formData = new FormData();
                formData.append('file', blob);
                formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
                formData.append('tags', 'temp_upload');

                const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
                const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || 'Upload failed');
                }

                const data = await response.json();
                const secureUrl = data.secure_url;

                let finalH = 0;
                if (unit === 'metric') finalH = Number(heightCm);
                else finalH = (Number(heightFt) || 0) * 30.48 + (Number(heightIn) || 0) * 2.54;

                onAdd({
                    id: uid(),
                    name: name.trim() || 'Custom Image',
                    heightCm: finalH,
                    gender: 'other',
                    color: '#3B82F6',
                    imgUrl: secureUrl,
                });

                setShowCropModal(false);
                setPendingImageUrl(null);
                setName('');
                setHeightCm('');
                setHeightFt('');
                setHeightIn('');
                setError('');
            } catch (err: any) {
                console.error('Cloudinary Upload Error:', err);
                setError(`Upload failed: ${err.message}`);
            } finally {
                setIsUploading(false);
            }
        };
        img.src = pendingImageUrl;
    };

    const closeModal = () => { if (!isUploading) { setShowCropModal(false); } };

    return (
        <>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="p-6 space-y-6">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-accent rounded-full" />
                    <h2 className="text-xs uppercase tracking-[0.2em] font-black text-foreground/70">Add Image Person</h2>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                    <label htmlFor="image-person-name" className="text-[11px] uppercase tracking-widest font-black text-foreground/60 ml-0.5">Name</label>
                    <input
                        id="image-person-name"
                        type="text"
                        placeholder="Optional"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-bg border border-border rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted/30 focus:outline-none focus:border-accent/40 transition-all"
                    />
                </div>

                {/* Height */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-0.5">
                        <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60">Height</label>
                        <div className="flex gap-1.5">
                            {(['metric', 'imperial'] as UnitSystem[]).map(u => (
                                <button
                                    key={u}
                                    type="button"
                                    onClick={() => setUnit(u)}
                                    aria-label={`Switch to ${u} units`}
                                    className={`text-[10px] font-bold uppercase tracking-tight px-2.5 py-1 rounded border transition-all ${unit === u ? 'border-accent/40 text-accent bg-accent/5' : 'border-border text-muted/70 hover:text-muted'}`}
                                >
                                    {u === 'metric' ? 'Metric' : 'Imp'}
                                </button>
                            ))}
                        </div>
                    </div>
                    {unit === 'metric' ? (
                        <div className="flex bg-bg border border-border rounded-2xl overflow-hidden focus-within:border-accent/40 transition-all">
                            <label htmlFor="image-height-cm" className="sr-only">Height in centimeters</label>
                            <NumericInput
                                id="image-height-cm"
                                placeholder="eg. 158 cm"
                                value={heightCm}
                                onValueChange={(val) => { setError(''); setHeightCm(val); }}
                                className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground focus:outline-none"
                            />
                            <div className="px-4 py-3 bg-surface text-foreground/60 font-mono text-sm font-black border-l border-border flex items-center">CM</div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <div className="flex-1 flex bg-bg border border-border rounded-xl overflow-hidden focus-within:border-accent/40 transition-all">
                                <label htmlFor="image-height-ft" className="sr-only">Height in feet</label>
                                <NumericInput
                                    id="image-height-ft"
                                    placeholder="Ft"
                                    value={heightFt}
                                    onValueChange={(val) => { setError(''); setHeightFt(val); }}
                                    className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-foreground focus:outline-none"
                                />
                                <div className="px-2 py-3 bg-surface text-foreground/60 font-mono text-[11px] font-black border-l border-border flex items-center shrink-0">FT</div>
                            </div>
                            <div className="flex-1 flex bg-bg border border-border rounded-xl overflow-hidden focus-within:border-accent/40 transition-all">
                                <label htmlFor="image-height-in" className="sr-only">Height in inches</label>
                                <NumericInput
                                    id="image-height-in"
                                    placeholder="In"
                                    value={heightIn}
                                    onValueChange={(val) => { setError(''); setHeightIn(val); }}
                                    className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-foreground focus:outline-none"
                                />
                                <div className="px-2 py-3 bg-surface text-foreground/60 font-mono text-[11px] font-black border-l border-border flex items-center shrink-0">IN</div>
                            </div>
                        </div>
                    )}
                </div>

                {error && <p className="text-red-500 text-xs px-1 font-bold animate-pulse">{error}</p>}

                {/* Image Selection / Preview */}
                <div className="space-y-4">
                    {pendingImageUrl ? (
                        <div className="relative group rounded-3xl overflow-hidden border-2 border-accent/20 bg-bg aspect-square flex items-center justify-center">
                            <img src={pendingImageUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button
                                    onClick={() => inputRef.current?.click()}
                                    className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl"
                                    title="Change Image"
                                    aria-label="Change image"
                                >
                                    <UploadCloud size={20} />
                                </button>
                                <button
                                    onClick={resetSelection}
                                    className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-xl"
                                    title="Remove"
                                    aria-label="Remove image"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="absolute bottom-3 left-3 right-3 bg-surface/90 backdrop-blur-md rounded-2xl py-2 px-3 flex items-center justify-between border border-border/50">
                                <span className="text-[10px] font-black uppercase tracking-wider text-foreground/60">Image selected</span>
                                <Check size={14} className="text-emerald-500" />
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => inputRef.current?.click()}
                            aria-label="Select image to upload"
                            className="w-full aspect-square rounded-3xl border-2 border-dashed border-border hover:border-accent/40 hover:bg-accent/5 transition-all flex flex-col items-center justify-center gap-4 group"
                        >
                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                <UploadCloud size={28} />
                            </div>
                            <div className="text-center">
                                <span className="block text-sm font-black uppercase tracking-widest text-foreground/80">Select Image</span>
                                <span className="block text-[10px] text-muted font-bold mt-1">PNG or JPG supported</span>
                            </div>
                        </button>
                    )}

                    <input type="file" accept="image/*" className="hidden" ref={inputRef} onChange={handleFileChange} />

                    {pendingImageUrl ? (
                        <button
                            onClick={handleProceedToCrop}
                            className="w-full bg-accent text-white font-black py-4 px-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-accent/20 uppercase tracking-widest text-xs hover:bg-accent-secondary"
                        >
                            <CropIcon size={18} /> Crop &amp; Add to Chart
                        </button>
                    ) : (
                        <p className="text-[11px] text-muted font-black text-center uppercase tracking-wider">
                            PNG with transparent background works best
                        </p>
                    )}
                </div>
            </motion.div>

            <CropModal
                showCropModal={showCropModal}
                pendingUrl={pendingImageUrl}
                resetCrop={() => { }}
                closeCropModal={closeModal}
                applyCrop={applyCrop}
                title="Crop Person Image"
                isLoading={isUploading}
            />
        </>
    );
};

export default AddImageForm;