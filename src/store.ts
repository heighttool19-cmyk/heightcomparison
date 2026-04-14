import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UnitSystem } from './types';

interface UnitState {
    unitSystem: UnitSystem;
    setUnitSystem: (unit: UnitSystem) => void;
    toggleUnitSystem: () => void;
}

export const useUnitStore = create<UnitState>()(
    persist(
        (set) => ({
            unitSystem: 'metric', // Default
            setUnitSystem: (unit) => set({ unitSystem: unit }),
            toggleUnitSystem: () => set((state) => ({
                unitSystem: state.unitSystem === 'metric' ? 'imperial' : 'metric'
            })),
        }),
        {
            name: 'height-tool-units',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export type Theme = 'dark' | 'light';

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'dark', // Default
            toggleTheme: () => set((state) => ({
                theme: state.theme === 'dark' ? 'light' : 'dark'
            })),
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'height-tool-theme', // localStorage key
            storage: createJSONStorage(() => localStorage),
        }
    )
);

interface PersonState {
    persons: Person[];
    addPerson: (person: Person) => void;
    removePerson: (id: string) => void;
    updatePerson: (id: string, updates: Partial<Person>) => void;
    setPersons: (persons: Person[]) => void;
    reorderPerson: (id: string, direction: 'up' | 'down') => void;
}

import { Person, DEFAULT_PERSONS } from './types';

export const usePersonStore = create<PersonState>()(
    persist(
        (set) => ({
            persons: [],
            addPerson: (person) => set((state) => ({ persons: [...state.persons, person] })),
            removePerson: (id) => set((state) => ({ persons: state.persons.filter(p => p.id !== id) })),
            updatePerson: (id, updates) => set((state) => ({
                persons: state.persons.map(p => p.id === id ? { ...p, ...updates } : p)
            })),
            setPersons: (persons) => set({ persons }),
            reorderPerson: (id, direction) => set((state) => {
                const index = state.persons.findIndex(p => p.id === id);
                if (index === -1) return state;
                const newPersons = [...state.persons];
                const targetIndex = direction === 'up' ? index - 1 : index + 1;
                if (targetIndex < 0 || targetIndex >= newPersons.length) return state;
                [newPersons[index], newPersons[targetIndex]] = [newPersons[targetIndex], newPersons[index]];
                return { persons: newPersons };
            }),
        }),
        {
            name: 'height-tool-persons',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export interface UIState {
    isCustomFullscreen: boolean;
    setIsCustomFullscreen: (val: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
    isCustomFullscreen: false,
    setIsCustomFullscreen: (val) => set({ isCustomFullscreen: val }),
}));
