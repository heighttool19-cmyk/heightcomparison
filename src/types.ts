export type Gender = 'male' | 'female' | 'other';

export interface Person {
  id: string;
  name: string;
  height: number; // height in cm
  gender: Gender;
  color: string;
  isMetric: boolean;
}

export const DEFAULT_PERSONS: Person[] = [
  {
    id: '1',
    name: 'You',
    height: 170,
    gender: 'male',
    color: '#6366F1',
    isMetric: true,
  },
  {
    id: '2',
    name: 'Compare',
    height: 160,
    gender: 'female',
    color: '#EC4899',
    isMetric: true,
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
