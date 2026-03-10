import { create } from 'zustand';
import { Person } from '../types';

interface HeightStoreState {
    uploadedImage: string | null;
    calibrationCm: number;
    calibrationPx: number;
    measurementPx: number;
    calculatedHeight: number;
    unit: 'metric' | 'imperial';

    // Core Actions
    setUploadedImage: (url: string | null) => void;
    setCalibrationDetails: (px: number, cm: number) => void;
    setMeasurementPx: (px: number) => void;

    // The "Currently Comparing" list for the /ai-space/ page specifically
    aiSpacePersons: Person[];
    addPerson: (person: Person) => void;
    removePerson: (id: string) => void;
}

export const useHeightStore = create<HeightStoreState>((set) => ({
    uploadedImage: null,
    calibrationCm: 0,
    calibrationPx: 0,
    measurementPx: 0,
    calculatedHeight: 0,
    unit: 'metric', // Using metric as base for now, can be synced with useUnitStore or local toggle

    aiSpacePersons: [],

    setUploadedImage: (url) => set({
        uploadedImage: url,
        // Reset state on new upload
        calibrationCm: 0,
        calibrationPx: 0,
        measurementPx: 0,
        calculatedHeight: 0
    }),

    setCalibrationDetails: (px, cm) => set(state => {
        const currentMeasurement = state.measurementPx;
        let newCalc = 0;
        if (px > 0 && currentMeasurement > 0) {
            newCalc = (currentMeasurement / px) * cm;
        }
        return {
            calibrationPx: px,
            calibrationCm: cm,
            calculatedHeight: newCalc
        };
    }),

    setMeasurementPx: (px) => set(state => {
        let newCalc = 0;
        if (state.calibrationPx > 0) {
            newCalc = (px / state.calibrationPx) * state.calibrationCm;
        }
        return {
            measurementPx: px,
            calculatedHeight: newCalc
        };
    }),

    addPerson: (person) => set(state => ({
        aiSpacePersons: [...state.aiSpacePersons, person]
    })),

    removePerson: (id) => set(state => ({
        aiSpacePersons: state.aiSpacePersons.filter(p => p.id !== id)
    }))
}));
