'use client';

import dynamic from 'next/dynamic';
import React from 'react';

export const DynamicAverageHeightIsland = dynamic(() => import('./AverageHeightInteractive'), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-surface animate-pulse rounded-3xl border border-border/50" />
});
