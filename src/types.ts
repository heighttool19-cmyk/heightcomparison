export type Gender = 'male' | 'female' | 'other';
export type UnitSystem = 'metric' | 'imperial';

export interface Person {
  id: string;
  name: string;
  heightCm: number;
  gender: Gender;
  color: string;
}

export interface AppState {
  persons: Person[];
  unitSystem: UnitSystem;
  zoom: number;
}

export const uid = () => Math.random().toString(36).substring(2, 9);

export const COLOR_PALETTE = [
  '#F97316', // orange
  '#22C55E', // green
  '#6366F1', // indigo
  '#A78BFA', // violet
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#F59E0B', // amber
  '#EF4444', // red
];

export const QUICK_ADD_PRESETS = [
  { name: 'Basketball Player', heightCm: 198, gender: 'male' as const },
  { name: 'Average Male', heightCm: 177, gender: 'male' as const },
  { name: 'Average Female', heightCm: 163, gender: 'female' as const },
  { name: "Shaquille O'Neal", heightCm: 216, gender: 'male' as const },
  { name: 'Kevin Hart', heightCm: 157, gender: 'male' as const },
  { name: 'Eiffel Tower', heightCm: 33000, gender: 'other' as const },
];


export const DEFAULT_PERSONS: Person[] = [
  {
    id: uid(),
    name: 'You',
    heightCm: 170,
    gender: 'male',
    color: '#6366F1',
  },
  {
    id: uid(),
    name: 'Compare',
    heightCm: 160,
    gender: 'female',
    color: '#EC4899',
  },
];

export const HEIGHT_LIMITS = {
  MIN_CM: 30,
  MAX_CM: 300,
  MIN_FT: 1,
  MAX_FT: 9,
};

export const CONVERSION = {
  CM_TO_FT: 0.0328084,
  FT_TO_CM: 30.48,
  IN_TO_CM: 2.54,
};

