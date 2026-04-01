'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// This wrapper component can be safely imported by Server Components (RSC).
// It moves the `ssr: false` and the non-serializable `loading` function 
// into a Client-side module, satisfying Next.js 16/Turbopack boundary rules.

export const DynamicHeightDashboard = dynamic(() => import('./HeightDashboard'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-bg gap-4">
      <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      <p className="text-muted font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Initializing  Dashboard...</p>
    </div>
  ),
});
