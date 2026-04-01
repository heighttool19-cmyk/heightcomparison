'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store';

export default function ThemeInitializer() {
    const { theme } = useThemeStore();

    useEffect(() => {
        // Sync theme to document root for global CSS variables
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme]);

    return null;
}
