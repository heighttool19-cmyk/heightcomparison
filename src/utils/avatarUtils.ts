import { ALL_AVATARS, AvatarCategory, DEFAULT_FEMALE_AVATAR, DEFAULT_MALE_AVATAR } from '../constants/avatars';
import { Gender } from '../types';

/**
 * Determines the best avatar category based on height in cm.
 */
export function getAutoCategoryByHeight(heightCm: number): AvatarCategory {
    if (heightCm < 130) return 'Child';
    if (heightCm < 158) return 'Teen';
    if (heightCm > 210) return 'Adult (Mesomorph)';
    return 'Adult (Standard)';
}

/**
 * Returns a default neutral avatar path for a given category and gender.
 */
export function getDefaultAvatarForCategory(category: AvatarCategory, gender: Gender): string {
    const avatars = ALL_AVATARS.filter(a => a.category === category && a.gender === gender);
    if (avatars.length === 0) {
        return gender === 'male' ? DEFAULT_MALE_AVATAR : DEFAULT_FEMALE_AVATAR;
    }

    // Try to find a 'Neutral' or 'Standing' avatar first
    const neutral = avatars.find(a => a.label.toLowerCase().includes('neutral') || a.label.toLowerCase().includes('standing'));
    return neutral ? neutral.path : avatars[0].path;
}
