export type Gender = 'male' | 'female' | 'other';
export type UnitSystem = 'metric' | 'imperial';

export interface Person {
  id: string;
  name: string;
  heightCm: number;
  gender: Gender;
  color: string;
  imgUrl?: string;
}

export interface AppState {
  persons: Person[];
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
  { name: 'Average Male', heightCm: 177, gender: 'male' as const },
  { name: 'Average Female', heightCm: 163, gender: 'female' as const },
  { name: "Shaquille O'Neal", heightCm: 216, gender: 'male' as const },
  { name: 'Kevin Hart', heightCm: 157, gender: 'male' as const },
  { name: 'Eiffel Tower', heightCm: 33000, gender: 'other' as const },
];


export const DEFAULT_PERSONS: Person[] = [
  {
    id: 'person-default-you',
    name: 'You',
    heightCm: 170,
    gender: 'male',
    color: '#6366F1',
  },
  {
    id: 'person-default-compare',
    name: 'Compare',
    heightCm: 160,
    gender: 'female',
    color: '#EC4899',
  },
];

export const HEIGHT_LIMITS = {
  MIN_CM: 30,
  MAX_CM: 400,
  MIN_FT: 1,
  MAX_FT: 13,
};

export const CONVERSION = {
  CM_TO_FT: 0.0328084,
  FT_TO_CM: 30.48,
  IN_TO_CM: 2.54,
};

export type CelebrityCategory = 'NBA Stars' | 'Hollywood' | 'Musicians' | 'Athletes' | 'Historical';

export interface Celebrity {
  id: string;
  name: string;
  heightCm: number;
  category: CelebrityCategory;
  imgUrl?: string;
  color?: string;
}

export type FictionalCategory = 'Anime' | 'Cartoons' | 'DC Comics' | 'Fantasy' | 'Marvel' | 'Monsters & Kaiju' | 'TV Shows' | 'Video Games';

export interface FictionalCharacter {
  id: string;
  name: string;
  heightCm: number;
  category: FictionalCategory;
  color: string;
}


