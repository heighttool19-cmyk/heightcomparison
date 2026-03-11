'use client';

import React from 'react';
import { useImageMeasurement } from './ImageMeasurementCom/useImageMeasurement';
import { Header } from './ImageMeasurementCom/components/Header';
import { Canvas } from './ImageMeasurementCom/components/Canvas';
import { Controls } from './ImageMeasurementCom/components/Controls';
import { CalibrationModal } from './ImageMeasurementCom/components/CalibrationModal';
import { CropModal } from './ImageMeasurementCom/components/CropModal';
import { SaveToChartModal } from './ImageMeasurementCom/components/SaveToChartModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, ChevronRight, XCircle, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ImageMeasurement: React.FC = () => {
    const {
        canvasRef,
        wrapperRef,
        fileInputRef,
        cropContainerRef,
        mode,
        calculatedHeight,
        unitSystem,
        uploadedImage,
        displaySize,
        toastMsg,
        calibCm,
        showCalibModal,
        isScanning,
        isSavedToChart,
        pendingUrl,
        showCropModal,
        cropBox,
        cropDisplay,
        cropDrag,
        calibLine,
        firstPoint,
        onCanvasMouseDown,
        onCanvasTouchStart,
        recalibrate,
        handleAutoScan,
        handleRemoveImage,
        handleNewImage,
        handleSaveToChart,
        confirmSaveToChart,
        handleFileUpload,
        onCropImgLoad,
        onCropDragStart,
        onCropDragMove,
        onCropDragEnd,
        resetCrop,
        applyCrop,
        closeCropModal,
        setCalibCm,
        applyPreset,
        confirmCalib,
        cancelCalib,
        cancelDrawing,
        showSaveModal,
        setShowSaveModal,
        isSavingCrop,
        savedSubjectUrl
    } = useImageMeasurement();

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-4">
                <Header
                    calculatedHeight={calculatedHeight}
                    unitSystem={unitSystem}
                    isSavedToChart={isSavedToChart}
                    handleSaveToChart={handleSaveToChart}
                />

                {/* Step banner */}
                <AnimatePresence mode="wait">
                    {uploadedImage && mode !== 'idle' && (
                        <motion.div key={mode + String(!!firstPoint)} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                            className="px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                                {mode === 'calibrating' ? <Ruler className="w-4 h-4 text-accent" /> : <ChevronRight className="w-4 h-4 text-accent" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-xs font-black uppercase tracking-widest text-accent/60 block">
                                    {mode === 'calibrating' ? 'Step 1: Calibration' : 'Step 2: Measurement'}
                                </span>
                                <span className="text-sm font-bold">
                                    {mode === 'calibrating'
                                        ? firstPoint ? 'Click / tap the end point to finish' : 'Draw a line over a known object'
                                        : firstPoint ? 'Click / tap the end point to finish' : 'Draw a line over the person or object'}
                                </span>
                            </div>
                            {firstPoint && (
                                <button onClick={cancelDrawing}
                                    className="flex items-center gap-1 text-xs font-bold text-muted hover:text-red-400 transition-colors px-2 py-1 rounded-lg border border-border hover:border-red-400/30 flex-shrink-0">
                                    <XCircle className="w-3.5 h-3.5" /> Cancel
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative">
                <Canvas
                    canvasRef={canvasRef}
                    wrapperRef={wrapperRef}
                    onCanvasMouseDown={onCanvasMouseDown}
                    onCanvasTouchStart={onCanvasTouchStart}
                    uploadedImage={uploadedImage}
                    displaySize={displaySize}
                    mode={mode}
                    isScanning={isScanning}
                    fileInputRef={fileInputRef}
                />

                <CalibrationModal
                    showCalibModal={showCalibModal}
                    calibCm={calibCm}
                    setCalibCm={setCalibCm}
                    applyPreset={applyPreset}
                    confirmCalib={confirmCalib}
                    cancelCalib={cancelCalib}
                />
            </div>

            <Controls
                mode={mode}
                recalibrate={recalibrate}
                handleAutoScan={handleAutoScan}
                isScanning={isScanning}
                uploadedImage={uploadedImage}
                handleRemoveImage={handleRemoveImage}
                handleNewImage={handleNewImage}
                showCalibModal={showCalibModal}
                calibLine={calibLine}
            />

            <SaveToChartModal
                show={showSaveModal}
                onClose={() => setShowSaveModal(false)}
                onConfirm={confirmSaveToChart}
                photoUrl={savedSubjectUrl}
                heightCm={calculatedHeight}
                unitSystem={unitSystem}
            />

            <CropModal
                showCropModal={showCropModal}
                pendingUrl={pendingUrl}
                cropContainerRef={cropContainerRef}
                cropDisplay={cropDisplay}
                onCropDragMove={onCropDragMove}
                onCropDragEnd={onCropDragEnd}
                onCropImgLoad={onCropImgLoad}
                onCropDragStart={onCropDragStart}
                cropBox={cropBox}
                cropDrag={cropDrag}
                resetCrop={resetCrop}
                closeCropModal={closeCropModal}
                applyCrop={applyCrop}
                title={isSavingCrop ? "Crop Subject for Chart" : "Finalize Upload"}
            />

            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />

            {/* Toast */}
            <AnimatePresence>
                {toastMsg && (
                    <motion.div initial={{ opacity: 0, y: 48, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.9 }}
                        className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 z-[300] pointer-events-none font-bold text-sm border",
                            toastMsg.type === 'error' ? 'bg-red-500   border-red-400   text-white' :
                                toastMsg.type === 'success' ? 'bg-green-500 border-green-400 text-white' :
                                    'bg-surface   border-border    text-foreground')}>
                        <span>{toastMsg.text}</span>
                        {toastMsg.type === 'success' && <Check size={15} />}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
