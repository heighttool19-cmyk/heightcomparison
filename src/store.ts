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

interface PersonState {
    persons: Person[];
    addPerson: (person: Person) => void;
    removePerson: (id: string) => void;
    updatePerson: (id: string, updates: Partial<Person>) => void;
    setPersons: (persons: Person[]) => void;
}

import { Person, DEFAULT_PERSONS } from './types';

export const usePersonStore = create<PersonState>((set) => ({
    persons: DEFAULT_PERSONS,
    addPerson: (person) => set((state) => ({ persons: [...state.persons, person] })),
    removePerson: (id) => set((state) => ({ persons: state.persons.filter(p => p.id !== id) })),
    updatePerson: (id, updates) => set((state) => ({
        persons: state.persons.map(p => p.id === id ? { ...p, ...updates } : p)
    })),
    setPersons: (persons) => set({ persons }),
}));

