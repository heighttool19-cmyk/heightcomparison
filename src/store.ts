import { create } from 'zustand';
import { UnitSystem } from './types';

interface UnitState {
    unitSystem: UnitSystem;
    setUnitSystem: (unit: UnitSystem) => void;
    toggleUnitSystem: () => void;
}

export const useUnitStore = create<UnitState>((set) => ({
    unitSystem: 'metric', // Default
    setUnitSystem: (unit) => set({ unitSystem: unit }),
    toggleUnitSystem: () => set((state) => ({
        unitSystem: state.unitSystem === 'metric' ? 'imperial' : 'metric'
    })),
}));

export type Theme = 'dark' | 'light';

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: 'dark', // Default
    toggleTheme: () => set((state) => ({
        theme: state.theme === 'dark' ? 'light' : 'dark'
    })),
    setTheme: (theme) => set({ theme }),
}));
