import React from 'react';
import Navbar from "@/components/Navbar";
import ThemeInitializer from '@/components/ThemeInitializer';
import HomeContent from '@/components/HomeContent';
import { DynamicHeightDashboard } from '@/components/DynamicHeightDashboard';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-bg font-sans text-foreground selection:bg-accent/20 transition-colors duration-500 overflow-x-clip">
      <ThemeInitializer />
      <Navbar activePage="home" />

      {/* Hero Section with Dashboard */}
      <div className="w-full h-[92dvh] relative flex flex-col border-b border-border shadow-2xl">
        <DynamicHeightDashboard />
      </div>

      {/* SEO Content - Rendered as pure server component for performance */}
      <HomeContent />

    </div>
  );
}