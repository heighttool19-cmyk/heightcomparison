import { FictionalCharacter } from '../../types';
import { anime_data } from './anime';
import { cartoons_data } from './cartoons';
import { dc_comics_data } from './dc_comics';
import { fantasy_data } from './fantasy';
import { marvel_data } from './marvel';
import { monsters_kaiju_data } from './monsters_kaiju';
import { tv_shows_data } from './tv_shows';
import { video_games_data } from './video_games';

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

export const fictionalCharacters: FictionalCharacter[] = [
  ...processData(anime_data as RawCharacter[], 'anime'),
  ...processData(cartoons_data as RawCharacter[], 'cartoon'),
  ...processData(dc_comics_data as RawCharacter[], 'dc'),
  ...processData(fantasy_data as RawCharacter[], 'fantasy'),
  ...processData(marvel_data as RawCharacter[], 'marvel'),
  ...processData(monsters_kaiju_data as RawCharacter[], 'monster'),
  ...processData(tv_shows_data as RawCharacter[], 'tvshow'),
  ...processData(video_games_data as RawCharacter[], 'videogame'),
];
