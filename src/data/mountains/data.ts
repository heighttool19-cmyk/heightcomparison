import { Mountain } from '../../types';

export const mountains_data: Omit<Mountain, 'id' | 'color'>[] = [
    // Asia
    { name: 'Mount Everest', heightCm: 884886, category: 'Asia' },
    { name: 'K2', heightCm: 861100, category: 'Asia' },
    { name: 'Kangchenjunga', heightCm: 858600, category: 'Asia' },
    { name: 'Lhotse', heightCm: 851600, category: 'Asia' },
    { name: 'Makalu', heightCm: 848500, category: 'Asia' },
    { name: 'Cho Oyu', heightCm: 818800, category: 'Asia' },
    { name: 'Dhaulagiri I', heightCm: 816700, category: 'Asia' },
    { name: 'Manaslu', heightCm: 816300, category: 'Asia' },
    { name: 'Nanga Parbat', heightCm: 812600, category: 'Asia' },
    { name: 'Annapurna I', heightCm: 809100, category: 'Asia' },

    // Europe
    { name: 'Mount Elbrus', heightCm: 564200, category: 'Europe' },
    { name: 'Dykh-Tau', heightCm: 520500, category: 'Europe' },
    { name: 'Shkhara', heightCm: 519300, category: 'Europe' },
    { name: 'Koshtan-Tau', heightCm: 515100, category: 'Europe' },
    { name: 'Janga', heightCm: 505900, category: 'Europe' },
    { name: 'Kazbek', heightCm: 505400, category: 'Europe' },
    { name: 'Tetnuldi', heightCm: 485800, category: 'Europe' },
    { name: 'Mont Blanc', heightCm: 480800, category: 'Europe' },
    { name: 'Dzhangi-Tau', heightCm: 445100, category: 'Europe' },
    { name: 'Matterhorn', heightCm: 447800, category: 'Europe' },

    // North America
    { name: 'Denali', heightCm: 619000, category: 'North America' },
    { name: 'Mount Logan', heightCm: 595900, category: 'North America' },
    { name: 'Pico de Orizaba', heightCm: 563600, category: 'North America' },
    { name: 'Mount Saint Elias', heightCm: 548900, category: 'North America' },
    { name: 'Popocatépetl', heightCm: 542600, category: 'North America' },

    // Africa
    { name: 'Mount Kilimanjaro', heightCm: 589500, category: 'Africa' },
    { name: 'Mount Kenya', heightCm: 519900, category: 'Africa' },
    { name: 'Mount Stanley', heightCm: 510900, category: 'Africa' },

    // South America
    { name: 'Aconcagua', heightCm: 696100, category: 'South America' },
    { name: 'Ojos del Salado', heightCm: 689300, category: 'South America' },
    { name: 'Monte Pissis', heightCm: 679300, category: 'South America' },

    // Antarctica
    { name: 'Mount Vinson', heightCm: 489200, category: 'Antarctica' },
    { name: 'Mount Tyree', heightCm: 485200, category: 'Antarctica' },

    // Oceania
    { name: 'Puncak Jaya', heightCm: 488400, category: 'Oceania' },
    { name: 'Mount Wilhelm', heightCm: 450900, category: 'Oceania' },
];
