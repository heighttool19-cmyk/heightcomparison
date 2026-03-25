import { Celebrity } from '../../types';
// Static imports removed for code-splitting

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

export const getCelebrities = async (): Promise<Celebrity[]> => {
  const [
    { asian_celebrities_data },
    { athletes_data },
    { bollywood_data },
    { british_celebrities_data },
    { politicians_data },
    { hollywood_data },
    { musicians_data },
    { nba_stars_data },
    { reality_tv_stars_data },
    { historical_data },
    { models_data }
  ] = await Promise.all([
    import('./asian_celebrities'),
    import('./athletes'),
    import('./bollywood'),
    import('./british_celebrities'),
    import('./politicians'),
    import('./hollywood'),
    import('./musicians'),
    import('./nba_stars'),
    import('./reality_tv_stars'),
    import('./historical'),
    import('./models')
  ]);

  return [
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
};
