import { Entity } from '../../types';
import { animals_data } from './animals';
import { landmarks_data } from './landmarks';
import { dinosaurs_data } from './dinosaurs';
import { objects_data } from './objects';
import { transport_data } from './transport';
import { human_averages_data } from './human_averages';
import { fictional_averages_data } from './fictional_averages';

const COLOR_PALETTE = [
  '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E',
  '#06B6D4', '#EAB308', '#22C55E'
];

type RawEntity = Omit<Entity, 'id' | 'color'>;

function processData(data: RawEntity[], prefix: string): Entity[] {
  return data.map((item, index) => ({
    ...item,
    id: `${prefix}-${index + 1}`,
    color: COLOR_PALETTE[index % COLOR_PALETTE.length]
  }));
}

export const entities: Entity[] = [
  ...processData(animals_data as RawEntity[], 'animal'),
  ...processData(landmarks_data as RawEntity[], 'landmark'),
  ...processData(dinosaurs_data as RawEntity[], 'dinosaur'),
  ...processData(objects_data as RawEntity[], 'object'),
  ...processData(transport_data as RawEntity[], 'transport'),
  ...processData(human_averages_data as RawEntity[], 'human'),
  ...processData(fictional_averages_data as RawEntity[], 'fictional_avg'),
];
