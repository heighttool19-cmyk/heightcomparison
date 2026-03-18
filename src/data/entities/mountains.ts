import { Entity } from '../../types';

export const mountains_data: Omit<Entity, 'id' | 'color'>[] = [
    // Asia
    { name: 'Mount Everest', heightCm: 884886, category: 'Mountains', icon: '⛰️' },
    { name: 'K2', heightCm: 861100, category: 'Mountains', icon: '⛰️' },
    { name: 'Kangchenjunga', heightCm: 858600, category: 'Mountains', icon: '⛰️' },
    { name: 'Lhotse', heightCm: 851600, category: 'Mountains', icon: '⛰️' },
    { name: 'Makalu', heightCm: 848500, category: 'Mountains', icon: '⛰️' },
    { name: 'Cho Oyu', heightCm: 818800, category: 'Mountains', icon: '⛰️' },
    { name: 'Dhaulagiri I', heightCm: 816700, category: 'Mountains', icon: '⛰️' },
    { name: 'Manaslu', heightCm: 816300, category: 'Mountains', icon: '⛰️' },
    { name: 'Nanga Parbat', heightCm: 812600, category: 'Mountains', icon: '⛰️' },
    { name: 'Annapurna I', heightCm: 809100, category: 'Mountains', icon: '⛰️' },

    // Europe
    { name: 'Mount Elbrus', heightCm: 564200, category: 'Mountains', icon: '⛰️' },
    { name: 'Dykh-Tau', heightCm: 520500, category: 'Mountains', icon: '⛰️' },
    { name: 'Shkhara', heightCm: 519300, category: 'Mountains', icon: '⛰️' },
    { name: 'Koshtan-Tau', heightCm: 515100, category: 'Mountains', icon: '⛰️' },
    { name: 'Janga', heightCm: 505900, category: 'Mountains', icon: '⛰️' },
    { name: 'Kazbek', heightCm: 505400, category: 'Mountains', icon: '⛰️' },
    { name: 'Tetnuldi', heightCm: 485800, category: 'Mountains', icon: '⛰️' },
    { name: 'Mont Blanc', heightCm: 480800, category: 'Mountains', icon: '⛰️' },
    { name: 'Dzhangi-Tau', heightCm: 445100, category: 'Mountains', icon: '⛰️' },
    { name: 'Matterhorn', heightCm: 447800, category: 'Mountains', icon: '⛰️' },

    // North America
    { name: 'Denali', heightCm: 619000, category: 'Mountains', icon: '⛰️' },
    { name: 'Mount Logan', heightCm: 595900, category: 'Mountains', icon: '⛰️' },
    { name: 'Pico de Orizaba', heightCm: 563600, category: 'Mountains', icon: '⛰️' },
    { name: 'Mount Saint Elias', heightCm: 548900, category: 'Mountains', icon: '⛰️' },
    { name: 'Popocatépetl', heightCm: 542600, category: 'Mountains', icon: '⛰️' },

    // Africa
    { name: 'Mount Kilimanjaro', heightCm: 589500, category: 'Mountains', icon: '⛰️' },
    { name: 'Mount Kenya', heightCm: 519900, category: 'Mountains', icon: '⛰️' },
    { name: 'Mount Stanley', heightCm: 510900, category: 'Mountains', icon: '⛰️' },

    // South America
    { name: 'Aconcagua', heightCm: 696100, category: 'Mountains', icon: '⛰️' },
    { name: 'Ojos del Salado', heightCm: 689300, category: 'Mountains', icon: '⛰️' },
    { name: 'Monte Pissis', heightCm: 679300, category: 'Mountains', icon: '⛰️' },

    // Antarctica
    { name: 'Mount Vinson', heightCm: 489200, category: 'Mountains', icon: '⛰️' },
    { name: 'Mount Tyree', heightCm: 485200, category: 'Mountains', icon: '⛰️' },

    // Oceania
    { name: 'Puncak Jaya', heightCm: 488400, category: 'Mountains', icon: '⛰️' },
    { name: 'Mount Wilhelm', heightCm: 450900, category: 'Mountains', icon: '⛰️' },
];
