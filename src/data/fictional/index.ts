import { FictionalCharacter } from '../../types';
// Static imports removed for code-splitting

const COLOR_PALETTE = [
  '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E',
  '#06B6D4', '#EAB308', '#22C55E'
];

type RawCharacter = Omit<FictionalCharacter, 'id' | 'color'>;

function processData(data: RawCharacter[], prefix: string): FictionalCharacter[] {
  return data.map((item, index) => ({
    ...item,
    id: `${prefix}-${index + 1}`,
    color: COLOR_PALETTE[index % COLOR_PALETTE.length]
  }));
}

export const getFictionalCharacters = async (): Promise<FictionalCharacter[]> => {
  const [
    { anime_data },
    { cartoons_data },
    { dc_comics_data },
    { fantasy_data },
    { marvel_data },
    { monsters_kaiju_data },
    { tv_shows_data },
    { video_games_data },
    { fictional_averages_data }
  ] = await Promise.all([
    import('./anime'),
    import('./cartoons'),
    import('./dc_comics'),
    import('./fantasy'),
    import('./marvel'),
    import('./monsters_kaiju'),
    import('./tv_shows'),
    import('./video_games'),
    import('./fictional_averages')
  ]);

  return [
    ...processData(anime_data as RawCharacter[], 'anime'),
    ...processData(cartoons_data as RawCharacter[], 'cartoon'),
    ...processData(dc_comics_data as RawCharacter[], 'dc'),
    ...processData(fantasy_data as RawCharacter[], 'fantasy'),
    ...processData(marvel_data as RawCharacter[], 'marvel'),
    ...processData(monsters_kaiju_data as RawCharacter[], 'monster'),
    ...processData(tv_shows_data as RawCharacter[], 'tvshow'),
    ...processData(video_games_data as RawCharacter[], 'videogame'),
    ...processData(fictional_averages_data as RawCharacter[], 'fictional_avg'),
  ];
};
