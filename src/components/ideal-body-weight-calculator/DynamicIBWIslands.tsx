'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Wrappers for Ideal Body Weight Calculator interactive components

export const DynamicIdealWeightIsland = dynamic(() => import('./IdealWeightInteractive'), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-surface animate-pulse rounded-3xl border border-border/50" />
});

export const DynamicHealthyWeightIsland = dynamic(() => import('./HealthyWeightRange'), {
    ssr: false,
    loading: () => <div className="h-[200px] w-full bg-surface animate-pulse rounded-3xl border border-border/50" />
});
