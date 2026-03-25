import { Entity } from '../../types';
// Static imports removed for code-splitting

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

export const getEntities = async (): Promise<Entity[]> => {
  const [
    { animals_data },
    { landmarks_data },
    { dinosaurs_data },
    { objects_data },
    { transport_data },
    { human_averages_data },
    { fictional_averages_data },
    { mountains_data }
  ] = await Promise.all([
    import('./animals'),
    import('./landmarks'),
    import('./dinosaurs'),
    import('./objects'),
    import('./transport'),
    import('./human_averages'),
    import('./fictional_averages'),
    import('./mountains')
  ]);

  return [
    ...processData(animals_data as RawEntity[], 'animal'),
    ...processData(landmarks_data as RawEntity[], 'landmark'),
    ...processData(mountains_data as RawEntity[], 'mountain'),
    ...processData(dinosaurs_data as RawEntity[], 'dinosaur'),
    ...processData(objects_data as RawEntity[], 'object'),
    ...processData(transport_data as RawEntity[], 'transport'),
    ...processData(human_averages_data as RawEntity[], 'human'),
    ...processData(fictional_averages_data as RawEntity[], 'fictional_avg'),
  ];
};
