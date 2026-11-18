import React from 'react';
import { getTranslations } from 'next-intl/server';
import HomeContent from '@/components/HomeContent';
import { DynamicHeightDashboard } from '@/components/DynamicHeightDashboard';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import JsonLd from '@/components/common/JsonLd';
import { HOME_SCHEMA } from '@/constants/schemas/home';
import { getAlternateLanguages, getCanonicalUrl } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    alternates: {
      canonical: getCanonicalUrl('/', locale),
      languages: getAlternateLanguages('/'),
    }
  };
}

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
