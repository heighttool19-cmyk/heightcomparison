import { Celebrity } from '../../types';
import { asian_celebrities_data } from './asian_celebrities';
import { athletes_data } from './athletes';
import { bollywood_data } from './bollywood';
import { british_celebrities_data } from './british_celebrities';
import { politicians_data } from './politicians';
import { hollywood_data } from './hollywood';
import { musicians_data } from './musicians';
import { nba_stars_data } from './nba_stars';
import { reality_tv_stars_data } from './reality_tv_stars';
import { historical_data } from './historical';
import { models_data } from './models';

const COLOR_PALETTE = [
  '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E',
  '#06B6D4', '#EAB308', '#22C55E'
];

type RawCelebrity = Omit<Celebrity, 'id' | 'color'>;

function processData(data: RawCelebrity[], prefix: string): Celebrity[] {
  return data.map((item, index) => ({
    ...item,
    id: `${prefix}-${index + 1}`,
    color: COLOR_PALETTE[index % COLOR_PALETTE.length]
  }));
}

export const celebrities: Celebrity[] = [
  ...processData(asian_celebrities_data as RawCelebrity[], 'asian'),
  ...processData(athletes_data as RawCelebrity[], 'athlete'),
  ...processData(bollywood_data as RawCelebrity[], 'bollywood'),
  ...processData(british_celebrities_data as RawCelebrity[], 'british'),
  ...processData(politicians_data as RawCelebrity[], 'politician'),
  ...processData(hollywood_data as RawCelebrity[], 'hollywood'),
  ...processData(musicians_data as RawCelebrity[], 'musician'),
  ...processData(nba_stars_data as RawCelebrity[], 'nba'),
  ...processData(reality_tv_stars_data as RawCelebrity[], 'reality'),
  ...processData(historical_data as RawCelebrity[], 'historical'),
  ...processData(models_data as RawCelebrity[], 'Models')
];
