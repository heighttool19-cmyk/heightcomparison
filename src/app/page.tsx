import React from 'react';
import HomeContent from '@/components/HomeContent';
import { DynamicHeightDashboard } from '@/components/DynamicHeightDashboard';
import ErrorBoundary from '@/components/common/ErrorBoundary';

export default function Home() {
  return (
    <>
      {/* Hero Section with Dashboard */}
      <div id="height-comparison-tool" className="w-full h-[92svh] relative flex flex-col border-b border-border shadow-2xl">
        <DynamicHeightDashboard />
      </div>

      {/* SEO Content wrapped in Error Boundary for stability */}
      <ErrorBoundary name="HomeContent">
        <HomeContent />
      </ErrorBoundary>
    </>
  );
}