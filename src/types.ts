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
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#3B82F6', // blue
  '#EF4444', // red
  '#F59E0B', // yellow
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

