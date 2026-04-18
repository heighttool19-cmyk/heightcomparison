export interface AvatarOption {
    id: string;
    path: string;
    label: string;
    topPaddingFactor?: number; // Factor to compensate for internal SVG padding
    aspectRatio?: number;      // Width / Height ratio for correct container sizing
    category: string;
    gender: 'male' | 'female';
}

export const AVATAR_CATEGORIES = [
    'Adult (Standard)',
    'Adult (Mesomorph)',
    'Teen',
    'Child',
    'Elderly'
] as const;

export type AvatarCategory = typeof AVATAR_CATEGORIES[number];

export const ALL_AVATARS: AvatarOption[] = [
    // --- CHILD ---
    { id: 'child-f', category: 'Child', gender: 'female', path: '/Avtars/HUMANS/CHILD/Female Child.svg', label: 'Female Child', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'child-m', category: 'Child', gender: 'male', path: '/Avtars/HUMANS/CHILD/Male Child.svg', label: 'Male Child', topPaddingFactor: 0, aspectRatio: 0.47 },

    // --- ELDERLY ---
    { id: 'elderly-f', category: 'Elderly', gender: 'female', path: '/Avtars/HUMANS/ELDERLY/Female Elderly.svg', label: 'Female Elderly', topPaddingFactor: 0, aspectRatio: 0.46 },
    { id: 'elderly-m', category: 'Elderly', gender: 'male', path: '/Avtars/HUMANS/ELDERLY/Male Elderly.svg', label: 'Male Elderly', topPaddingFactor: 0, aspectRatio: 0.45 },

    // --- TEEN ---
    { id: 'teen-f-neutral', category: 'Teen', gender: 'female', path: '/Avtars/HUMANS/FEMALE – TEEN/Standing Neutral.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.45 },
    { id: 'teen-f-walking', category: 'Teen', gender: 'female', path: '/Avtars/HUMANS/FEMALE – TEEN/Walking.svg', label: 'Walking', topPaddingFactor: 0, aspectRatio: 0.55 },
    { id: 'teen-m-neutral', category: 'Teen', gender: 'male', path: '/Avtars/HUMANS/MALE – TEEN/Standing Neutral.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.46 },
    { id: 'teen-m-walking', category: 'Teen', gender: 'male', path: '/Avtars/HUMANS/MALE – TEEN/Walking.svg', label: 'Walking', topPaddingFactor: 0, aspectRatio: 0.55 },

    // --- ADULT (STANDARD / ECTOMORPH) ---
    { id: 'f-adult-ecto-neutral', category: 'Adult (Standard)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT/Ectomorph Female –Standing Neutral.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.49 },
    { id: 'f-adult-ecto-crossed', category: 'Adult (Standard)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT/Ectomorph Female – Arms Crossed.svg', label: 'Arms Crossed', topPaddingFactor: 0, aspectRatio: 0.52 },
    { id: 'f-adult-ecto-casual', category: 'Adult (Standard)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT/Ectomorph Female – Casual.svg', label: 'Casual', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'f-adult-ecto-confident', category: 'Adult (Standard)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT/Ectomorph Female – Confident.svg', label: 'Confident', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'f-adult-ecto-traditional', category: 'Adult (Standard)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT/Ectomorph Female – Traditional.svg', label: 'Traditional', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'f-adult-ecto-walking', category: 'Adult (Standard)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT/Walkiing Right.svg', label: 'Walking', topPaddingFactor: 0, aspectRatio: 0.55 },

    { id: 'm-adult-ecto-neutral', category: 'Adult (Standard)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT/Ectomorph Male – Standing.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'm-adult-ecto-crossed', category: 'Adult (Standard)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT/Ectomorph Male – Arms Crossed.svg', label: 'Arms Crossed', topPaddingFactor: 0, aspectRatio: 0.51 },
    { id: 'm-adult-ecto-athletic', category: 'Adult (Standard)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT/Ectomorph Male – Athletic.svg', label: 'Athletic', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'm-adult-ecto-formal', category: 'Adult (Standard)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT/Ectomorph Male – Formal.svg', label: 'Formal', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'm-adult-ecto-pockets', category: 'Adult (Standard)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT/Ectomorph Male – Hands in Pocket.svg', label: 'Hands in Pocket', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'm-adult-ecto-walking', category: 'Adult (Standard)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT/Ectomorph Male – Walking.svg', label: 'Walking', topPaddingFactor: 0, aspectRatio: 0.55 },

    // --- ADULT (MESOMORPH) ---
    { id: 'f-adult-meso-neutral', category: 'Adult (Mesomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (mesomorph)/Mesomorph Female – Standing.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.47 },
    { id: 'f-adult-meso-crossed', category: 'Adult (Mesomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (mesomorph)/Mesomorph Female – Arms Crossed.svg', label: 'Arms Crossed', topPaddingFactor: 0, aspectRatio: 0.55 },
    { id: 'f-adult-meso-athletic', category: 'Adult (Mesomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (mesomorph)/Mesomorph Female – Athletic.svg', label: 'Athletic', topPaddingFactor: 0, aspectRatio: 0.50 },
    { id: 'f-adult-meso-casual', category: 'Adult (Mesomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (mesomorph)/Mesomorph Female – Casual.svg', label: 'Casual', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'f-adult-meso-confident', category: 'Adult (Mesomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (mesomorph)/Mesomorph Female – Confident.svg', label: 'Confident', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'f-adult-meso-hips', category: 'Adult (Mesomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (mesomorph)/Mesomorph Female – Hands on Hips.svg', label: 'Hands on Hips', topPaddingFactor: 0, aspectRatio: 0.63 },
    { id: 'f-adult-meso-traditional', category: 'Adult (Mesomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (mesomorph)/Mesomorph Female – Traditional.svg', label: 'Traditional', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'f-adult-meso-walking', category: 'Adult (Mesomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (mesomorph)/Mesomorph Female – Walking.svg', label: 'Walking', topPaddingFactor: 0, aspectRatio: 0.55 },

    { id: 'm-adult-meso-neutral', category: 'Adult (Mesomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (mesomorph)/Mesomorph Male – Standing Neutral.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.49 },
    { id: 'm-adult-meso-crossed', category: 'Adult (Mesomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (mesomorph)/Mesomorph Male – Arms Crossed.svg', label: 'Arms Crossed', topPaddingFactor: 0, aspectRatio: 0.51 },
    { id: 'm-adult-meso-athletic', category: 'Adult (Mesomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (mesomorph)/Mesomorph Male – Athletic.svg', label: 'Athletic', topPaddingFactor: 0, aspectRatio: 0.55 },
    { id: 'm-adult-meso-flex', category: 'Adult (Mesomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (mesomorph)/Mesomorph Male – Flexing.svg', label: 'Flexing', topPaddingFactor: 0, aspectRatio: 0.81 },
    { id: 'm-adult-meso-formal', category: 'Adult (Mesomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (mesomorph)/Mesomorph Male – Formal.svg', label: 'Formal', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'm-adult-meso-hips', category: 'Adult (Mesomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (mesomorph)/Mesomorph Male – Hands on Hips.svg', label: 'Hands on Hips', topPaddingFactor: 0, aspectRatio: 0.63 },
    { id: 'm-adult-meso-walking', category: 'Adult (Mesomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (mesomorph)/Mesomorph Male – Walking.svg', label: 'Walking', topPaddingFactor: 0, aspectRatio: 0.60 },
    { id: 'm-adult-meso-wide', category: 'Adult (Mesomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (mesomorph)/Mesomorph Male – Wide Stance.svg', label: 'Wide Stance', topPaddingFactor: 0, aspectRatio: 0.75 },
];

export const FEMALE_AVATARS = ALL_AVATARS.filter(a => a.gender === 'female');
export const MALE_AVATARS = ALL_AVATARS.filter(a => a.gender === 'male');

export const DEFAULT_MALE_AVATAR = ALL_AVATARS.find(a => a.id === 'm-adult-ecto-neutral')?.path || ALL_AVATARS[1].path;
export const DEFAULT_FEMALE_AVATAR = ALL_AVATARS.find(a => a.id === 'f-adult-ecto-neutral')?.path || ALL_AVATARS[0].path;

export const ENABLE_SVG_AVATARS = true;
