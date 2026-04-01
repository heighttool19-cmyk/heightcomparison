'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Wrappers for Child Height Calculator interactive components
// These are exported as named exports to be used in Server Components

export const DynamicHeightCharts = dynamic(() => import('../HeightCharts'), { 
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-surface animate-pulse rounded-3xl border border-border/50" />
});

export const DynamicGrowthPlateExplainer = dynamic(() => import('../GrowthPlateExplainer'), { 
    ssr: false,
    loading: () => <div className="h-[200px] w-full bg-surface animate-pulse rounded-3xl border border-border/50" />
});
