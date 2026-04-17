export interface AvatarOption {
    id: string;
    path: string;
    label: string;
    topPaddingFactor?: number; // Factor to compensate for internal SVG padding
}

export const FEMALE_AVATARS: AvatarOption[] = [
    { id: 'f-neutral', path: '/Avtars/HUMANS/FEMALE – ADULT/Standing Neutral.svg', label: 'Neutral', topPaddingFactor: 0.059 },
    { id: 'f-crossed', path: '/Avtars/HUMANS/FEMALE – ADULT/Arms Crossed.svg', label: 'Arms Crossed', topPaddingFactor: 0.001 },
    { id: 'f-casual', path: '/Avtars/HUMANS/FEMALE – ADULT/Casual Standing.svg', label: 'Casual', topPaddingFactor: 0.041 },
    { id: 'f-confident', path: '/Avtars/HUMANS/FEMALE – ADULT/Confident Pose.svg', label: 'Confident', topPaddingFactor: 0.001 },
    { id: 'f-traditional', path: '/Avtars/HUMANS/FEMALE – ADULT/Traditional Wear.svg', label: 'Traditional', topPaddingFactor: 0.037 },
    { id: 'f-walking', path: '/Avtars/HUMANS/FEMALE – ADULT/Walkiing Right.svg', label: 'Walking', topPaddingFactor: 0.059 },
];

export const MALE_AVATARS: AvatarOption[] = [
    { id: 'm-neutral', path: '/Avtars/HUMANS/MALE – ADULT/Standing Neutral.svg', label: 'Neutral', topPaddingFactor: 0.054 },
    { id: 'm-crossed', path: '/Avtars/HUMANS/MALE – ADULT/Arms Crossed.svg', label: 'Arms Crossed', topPaddingFactor: 0.059 },
    { id: 'm-athletic', path: '/Avtars/HUMANS/MALE – ADULT/Athletic Stance.svg', label: 'Athletic', topPaddingFactor: 0.057 },
    { id: 'm-formal', path: '/Avtars/HUMANS/MALE – ADULT/Formal Standing.svg', label: 'Formal', topPaddingFactor: 0.058 },
    { id: 'm-pockets', path: '/Avtars/HUMANS/MALE – ADULT/Hands In pocket.svg', label: 'Hands In Pocket', topPaddingFactor: 0.060 },
    { id: 'm-walking', path: '/Avtars/HUMANS/MALE – ADULT/Wallking Left.svg', label: 'Walking', topPaddingFactor: 0.060 },
];

export const DEFAULT_MALE_AVATAR = MALE_AVATARS[0].path; // Standing Neutral
export const DEFAULT_FEMALE_AVATAR = FEMALE_AVATARS[0].path; // Standing Neutral

export const ENABLE_SVG_AVATARS = false; // TEMPORARILY DISABLED
