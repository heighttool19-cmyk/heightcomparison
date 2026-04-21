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
    'Adult (Endomorph)',
    'Teen (Standard)',
    'Teen (Mesomorph)',
    'Teen (Endomorph)',
    'Child (Standard)',
    'Child (Mesomorph)',
    'Child (Endomorph)',
    'Elderly (Standard)',
    'Elderly (Mesomorph)',
    'Elderly (Endomorph)'
] as const;

export type AvatarCategory = typeof AVATAR_CATEGORIES[number];

export const ALL_AVATARS: AvatarOption[] = [
    // --- CHILD (STANDARD) ---
    { id: 'child-f', category: 'Child (Standard)', gender: 'female', path: '/Avtars/HUMANS/CHILD/Female Child.svg', label: 'Female Child', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'child-m', category: 'Child (Standard)', gender: 'male', path: '/Avtars/HUMANS/CHILD/Male Child.svg', label: 'Male Child', topPaddingFactor: 0, aspectRatio: 0.47 },

    // --- CHILD (MESOMORPH) ---
    { id: 'child-meso-f', category: 'Child (Mesomorph)', gender: 'female', path: '/Avtars/HUMANS/CHILD (mesomorph)/Female Child.svg', label: 'Female Child', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'child-meso-m', category: 'Child (Mesomorph)', gender: 'male', path: '/Avtars/HUMANS/CHILD (mesomorph)/Male Child.svg', label: 'Male Child', topPaddingFactor: 0, aspectRatio: 0.47 },

    // --- CHILD (ENDOMORPH) ---
    { id: 'child-endo-f', category: 'Child (Endomorph)', gender: 'female', path: '/Avtars/HUMANS/CHILD (endomorph)/Female Child.svg', label: 'Female Child', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'child-endo-m', category: 'Child (Endomorph)', gender: 'male', path: '/Avtars/HUMANS/CHILD (endomorph)/Male Child.svg', label: 'Male Child', topPaddingFactor: 0, aspectRatio: 0.47 },

    // --- ELDERLY (STANDARD) ---
    { id: 'elderly-f', category: 'Elderly (Standard)', gender: 'female', path: '/Avtars/HUMANS/ELDERLY/Female Elderly.svg', label: 'Female Elderly', topPaddingFactor: 0, aspectRatio: 0.46 },
    { id: 'elderly-m', category: 'Elderly (Standard)', gender: 'male', path: '/Avtars/HUMANS/ELDERLY/Male Elderly.svg', label: 'Male Elderly', topPaddingFactor: 0, aspectRatio: 0.45 },

    // --- ELDERLY (MESOMORPH) ---
    { id: 'elderly-meso-f', category: 'Elderly (Mesomorph)', gender: 'female', path: '/Avtars/HUMANS/ELDERLY (mesomorph)/Female Elderly Standing Neutral.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.46 },
    { id: 'elderly-meso-m', category: 'Elderly (Mesomorph)', gender: 'male', path: '/Avtars/HUMANS/ELDERLY (mesomorph)/Male Elderly Standing Neutral.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.45 },

    // --- ELDERLY (ENDOMORPH) ---
    { id: 'elderly-endo-f', category: 'Elderly (Endomorph)', gender: 'female', path: '/Avtars/HUMANS/ELDERLY (endomorph)/Female Elderly.svg', label: 'Female Elderly', topPaddingFactor: 0, aspectRatio: 0.46 },
    { id: 'elderly-endo-m', category: 'Elderly (Endomorph)', gender: 'male', path: '/Avtars/HUMANS/ELDERLY (endomorph)/Male Elderly.svg', label: 'Male Elderly', topPaddingFactor: 0, aspectRatio: 0.45 },

    // --- TEEN (STANDARD) ---
    { id: 'teen-f-neutral', category: 'Teen (Standard)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – TEEN/Standing Neutral.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.45 },
    { id: 'teen-f-walking', category: 'Teen (Standard)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – TEEN/Walking.svg', label: 'Walking', topPaddingFactor: 0, aspectRatio: 0.55 },
    { id: 'teen-m-neutral', category: 'Teen (Standard)', gender: 'male', path: '/Avtars/HUMANS/MALE – TEEN/Standing Neutral.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.46 },
    { id: 'teen-m-walking', category: 'Teen (Standard)', gender: 'male', path: '/Avtars/HUMANS/MALE – TEEN/Walking.svg', label: 'Walking', topPaddingFactor: 0, aspectRatio: 0.55 },

    // --- TEEN (MESOMORPH) ---
    { id: 'teen-meso-f-neutral', category: 'Teen (Mesomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE - TEEN (mesomorph)/Standing Neutral.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.45 },
    { id: 'teen-meso-f-walking', category: 'Teen (Mesomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE - TEEN (mesomorph)/Walking Right.svg', label: 'Walking', topPaddingFactor: 0, aspectRatio: 0.55 },
    { id: 'teen-meso-m-neutral', category: 'Teen (Mesomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE - TEEN (mesomorph)/Standing Neutral.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.46 },
    { id: 'teen-meso-m-athletic', category: 'Teen (Mesomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE - TEEN (mesomorph)/Athletic Pose.svg', label: 'Athletic', topPaddingFactor: 0, aspectRatio: 0.48 },

    // --- TEEN (ENDOMORPH) ---
    { id: 'teen-endo-f-neutral', category: 'Teen (Endomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE - TEEN (endomorph)/Standing Neutral.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.45 },
    { id: 'teen-endo-f-walking', category: 'Teen (Endomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE - TEEN (endomorph)/Walking.svg', label: 'Walking', topPaddingFactor: 0, aspectRatio: 0.55 },
    { id: 'teen-endo-m-neutral', category: 'Teen (Endomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – TEEN (endomorph)/Standing Neutral.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.46 },
    { id: 'teen-endo-m-walking', category: 'Teen (Endomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – TEEN (endomorph)/Walking.svg', label: 'Walking', topPaddingFactor: 0, aspectRatio: 0.55 },

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

    // --- ADULT (ENDOMORPH) ---
    { id: 'f-adult-endo-neutral', category: 'Adult (Endomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (endomorph)/Endomorph Female – Standing.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.49 },
    { id: 'f-adult-endo-crossed', category: 'Adult (Endomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (endomorph)/Endomorph Female – Arms Crossed.svg', label: 'Arms Crossed', topPaddingFactor: 0, aspectRatio: 0.52 },
    { id: 'f-adult-endo-casual-outfit', category: 'Adult (Endomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (endomorph)/Endomorph Female – Casual Outfit.svg', label: 'Casual Outfit', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'f-adult-endo-casual', category: 'Adult (Endomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (endomorph)/Endomorph Female – Casual.svg', label: 'Casual', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'f-adult-endo-confident', category: 'Adult (Endomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (endomorph)/Endomorph Female – Confident.svg', label: 'Confident', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'f-adult-endo-hips', category: 'Adult (Endomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (endomorph)/Endomorph Female – Hands on Hips.svg', label: 'Hands on Hips', topPaddingFactor: 0, aspectRatio: 0.63 },
    { id: 'f-adult-endo-traditional', category: 'Adult (Endomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (endomorph)/Endomorph Female – Traditional.svg', label: 'Traditional', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'f-adult-endo-walking', category: 'Adult (Endomorph)', gender: 'female', path: '/Avtars/HUMANS/FEMALE – ADULT (endomorph)/Endomorph Female – Walking.svg', label: 'Walking', topPaddingFactor: 0, aspectRatio: 0.55 },

    { id: 'm-adult-endo-neutral', category: 'Adult (Endomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (endomorph)/Endomorph Male – Standing.svg', label: 'Neutral', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'm-adult-endo-crossed', category: 'Adult (Endomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (endomorph)/Endomorph Male – Arms Crossed.svg', label: 'Arms Crossed', topPaddingFactor: 0, aspectRatio: 0.51 },
    { id: 'm-adult-endo-casual', category: 'Adult (Endomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (endomorph)/Endomorph Male – Casual.svg', label: 'Casual', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'm-adult-endo-formal', category: 'Adult (Endomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (endomorph)/Endomorph Male – Formal.svg', label: 'Formal', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'm-adult-endo-hips', category: 'Adult (Endomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (endomorph)/Endomorph Male – Hands on Hips.svg', label: 'Hands on Hips', topPaddingFactor: 0, aspectRatio: 0.63 },
    { id: 'm-adult-endo-relaxed', category: 'Adult (Endomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (endomorph)/Endomorph Male – Relaxed.svg', label: 'Relaxed', topPaddingFactor: 0, aspectRatio: 0.48 },
    { id: 'm-adult-endo-walking', category: 'Adult (Endomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (endomorph)/Endomorph Male – Walking.svg', label: 'Walking', topPaddingFactor: 0, aspectRatio: 0.55 },
    { id: 'm-adult-endo-wide', category: 'Adult (Endomorph)', gender: 'male', path: '/Avtars/HUMANS/MALE – ADULT (endomorph)/Endomorph Male – Wide Stance.svg', label: 'Wide Stance', topPaddingFactor: 0, aspectRatio: 0.75 },
];

export const FEMALE_AVATARS = ALL_AVATARS.filter(a => a.gender === 'female');
export const MALE_AVATARS = ALL_AVATARS.filter(a => a.gender === 'male');

export const DEFAULT_MALE_AVATAR = ALL_AVATARS.find(a => a.id === 'm-adult-ecto-neutral')?.path || ALL_AVATARS[1].path;
export const DEFAULT_FEMALE_AVATAR = ALL_AVATARS.find(a => a.id === 'f-adult-ecto-neutral')?.path || ALL_AVATARS[0].path;

export const ENABLE_SVG_AVATARS = true;
