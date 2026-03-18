// import { Mountain } from '../../types';
// import { mountains_data } from './data';

// const COLOR_PALETTE = [
//     '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E',
//     '#06B6D4', '#EAB308', '#22C55E'
// ];

// type RawMountain = Omit<Mountain, 'id' | 'color'>;

// function processData(data: RawMountain[], prefix: string): Mountain[] {
//     return data.map((item, index) => ({
//         ...item,
//         id: `mountain-${prefix}-${index + 1}`,
//         color: COLOR_PALETTE[index % COLOR_PALETTE.length]
//     }));
// }

// export const mountains: Mountain[] = processData(mountains_data as RawMountain[], 'mt');
