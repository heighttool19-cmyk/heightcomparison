'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Person, uid, HEIGHT_LIMITS, UnitSystem } from '../types';
import { UploadCloud, Check } from 'lucide-react';
import { handleInputChange } from '../utils/input';
import { getOptimizedDataUrl } from '../utils/image';
import { CropModal } from './ImageMeasurementCom/components/CropModal';
import { type PixelCrop } from 'react-image-crop';

interface AddImageFormProps {
    onAdd: (person: Person) => void;
}



const AddImageForm: React.FC<AddImageFormProps> = ({ onAdd }) => {
    // Form state
    const [name, setName] = useState('');
    const [unit, setUnit] = useState<UnitSystem>('metric');
    const [heightCm, setHeightCm] = useState<number | ''>();
    const [heightFt, setHeightFt] = useState<number | ''>();
    const [heightIn, setHeightIn] = useState<number | ''>();
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Crop modal state
    const [pendingImageUrl, setPendingImageUrl] = useState<string | null>(null);
    const [showCropModal, setShowCropModal] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    /* ─────────────────── File Handling ─────────────────── */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) { setError('Please upload an image file.'); return; }

        let finalHeightCm = 0;


        setError('');
        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target?.result as string;
            if (result) {
                setPendingImageUrl(result);
                setShowCropModal(true);
            }
        };
        reader.onerror = () => setError('Failed to read file.');
        reader.readAsDataURL(file);
        if (inputRef.current) inputRef.current.value = '';
    };

    const resetCrop = () => { /* Handled in Modal */ };

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
            if (!ctx) {
                setIsUploading(false);
                return;
            }
            ctx.drawImage(img, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, canvas.width, canvas.height);
            console.log(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
            console.log(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

            try {
                // 1. Convert canvas to blob
                const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
                if (!blob) throw new Error('Failed to create blob');

                // 2. Upload to Cloudinary
                const formData = new FormData();
                formData.append('file', blob);
                formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

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
                if (unit === 'metric') finalH = Number(heightCm) || 170;
                else finalH = (Number(heightFt) || 5) * 30.48 + (Number(heightIn) || 7) * 2.54;

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
                setHeightCm(170);
            } catch (err: any) {
                console.error('Cloudinary Upload Error:', err);
                setError(`Upload failed: ${err.message}`);
            } finally {
                setIsUploading(false);
            }
        };
        img.src = pendingImageUrl;
    };

    const closeModal = () => { if (!isUploading) { setShowCropModal(false); setPendingImageUrl(null); } };

    return (
        <>
            {/* ... component UI ... */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="p-6 space-y-6">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-accent rounded-full" />
                    <h2 className="text-xs uppercase tracking-[0.2em] font-black text-foreground/70">Add Image Person</h2>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60 ml-0.5">Name</label>
                    <input type="text" placeholder="Optional" value={name} onChange={e => setName(e.target.value)} className="w-full bg-bg border border-border rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted/30 focus:outline-none focus:border-accent/40 transition-all" />
                </div>

                {/* Height */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-0.5">
                        <label className="text-[11px] uppercase tracking-widest font-black text-foreground/60">Height</label>
                        <div className="flex gap-1.5">
                            {(['metric', 'imperial'] as UnitSystem[]).map(u => (
                                <button key={u} type="button" onClick={() => setUnit(u)} className={`text-[10px] font-bold uppercase tracking-tight px-2.5 py-1 rounded border transition-all ${unit === u ? 'border-accent/40 text-accent bg-accent/5' : 'border-border text-muted/70 hover:text-muted'}`}>
                                    {u === 'metric' ? 'Metric' : 'Imp'}
                                </button>
                            ))}
                        </div>
                    </div>
                    {unit === 'metric' ? (
                        <div className="flex bg-bg border border-border rounded-2xl overflow-hidden focus-within:border-accent/40 transition-all">
                            <input type="number" placeholder="eg. 158 cm" value={heightCm} onChange={e => handleInputChange(e, setHeightCm)} className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground focus:outline-none" />
                            <div className="px-4 py-3 bg-surface text-foreground/60 font-mono text-sm font-black border-l border-border flex items-center">CM</div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <div className="flex-1 flex bg-bg border border-border rounded-xl overflow-hidden focus-within:border-accent/40 transition-all">
                                <input type="number" placeholder="Ft" value={heightFt} onChange={e => handleInputChange(e, setHeightFt)} className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-foreground focus:outline-none" />
                                <div className="px-2 py-3 bg-surface text-foreground/60 font-mono text-[11px] font-black border-l border-border flex items-center shrink-0">FT</div>
                            </div>
                            <div className="flex-1 flex bg-bg border border-border rounded-xl overflow-hidden focus-within:border-accent/40 transition-all">
                                <input type="number" placeholder="In" value={heightIn} onChange={e => handleInputChange(e, setHeightIn)} className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-foreground focus:outline-none" />
                                <div className="px-2 py-3 bg-surface text-foreground/60 font-mono text-[11px] font-black border-l border-border flex items-center shrink-0">IN</div>
                            </div>
                        </div>
                    )}
                </div>

                {error && <p className="text-red-500 text-xs px-1">{error}</p>}

                {/* Upload Button */}
                <div>
                    <input type="file" accept="image/*" className="hidden" ref={inputRef} onChange={handleFileChange} />
                    <button onClick={() => { setError(''); inputRef.current?.click(); }} className="w-full bg-accent text-white font-black py-4 px-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-accent/20 uppercase tracking-widest text-xs hover:bg-accent-secondary">
                        <UploadCloud size={18} /> Upload &amp; Crop
                    </button>
                    <p className="text-[11px] text-muted font-black text-center mt-3 uppercase tracking-wider">
                        PNG with transparent background works best
                    </p>
                </div>
            </motion.div>

            <CropModal
                showCropModal={showCropModal}
                pendingUrl={pendingImageUrl}
                resetCrop={resetCrop}
                closeCropModal={closeModal}
                applyCrop={applyCrop}
                title="Crop Person Image"
                isLoading={isUploading}
            />
        </>
    );
};

export default AddImageForm;