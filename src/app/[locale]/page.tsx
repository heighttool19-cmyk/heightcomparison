import React from 'react';
import HomeContent from '@/components/HomeContent';
import { DynamicHeightDashboard } from '@/components/DynamicHeightDashboard';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import JsonLd from '@/components/common/JsonLd';
import { HOME_SCHEMA } from '@/constants/schemas/home';

export default function LocalizedHome() {
  return (
    <>
      {/* 1. SEO Schema Markup */}
      <JsonLd data={HOME_SCHEMA} />

      {/* 2. Visual Dashboard (Hero) */}
      <div id="height-comparison-tool" className="w-full h-[92svh] relative flex flex-col border-b border-border shadow-2xl">
        <DynamicHeightDashboard />
      </div>

      {/* 3. SEO Articles & FAQs */}
      <ErrorBoundary name="HomeContent">
        <HomeContent />
      </ErrorBoundary>
    </>
  );
}
