import React from 'react';
import Link from 'next/link';
import { Mail, Shield, AlertTriangle, Lightbulb } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/common/JsonLd';
import { CONTACT_SCHEMA } from '@/constants/schemas/contact';
import ContactForm from '@/components/contact/ContactForm';
import { getCanonicalUrl, getAlternateLanguages, getSocialMetadata } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: getCanonicalUrl('/contact', locale),
      languages: getAlternateLanguages('/contact'),
    },
    ...getSocialMetadata({
      title: t('title'),
      description: t('description'),
      path: '/contact',
      locale,
    }),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'contact.breadcrumb' });
  const tHeader = await getTranslations({ locale, namespace: 'contact.header' });

  return (
    <div className="min-h-screen bg-bg text-foreground">
      {/* Schema Markup */}
      <JsonLd data={CONTACT_SCHEMA} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-muted font-medium mb-8">
          <ol className="flex items-center gap-2">
            <li>
              <Link href={locale === 'en' ? '/' : `/${locale}`} className="hover:text-foreground transition-colors">
                {tNav('home')}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-bold" aria-current="page">
              {tNav('contact')}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="mb-10 space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground">
            {tHeader('title')}
          </h1>
          <p className="text-base sm:text-lg text-muted font-medium max-w-2xl leading-relaxed">
            {tHeader('description')}
          </p>
        </header>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Guidance Cards Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email Card */}
            <div className="p-6 bg-surface border-2 border-border/80 rounded-3xl shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-2">
                <Mail size={20} />
              </div>
              <h2 className="text-base font-black text-foreground uppercase tracking-wider">
                {tHeader('emailUs')}
              </h2>
              <p className="text-xs text-muted leading-relaxed font-medium">
                {tHeader('emailDesc')}
              </p>
              <a
                href="mailto:contact@heightcomparisoncalculator.com"
                className="text-xs sm:text-sm font-mono font-bold text-accent underline break-all block pt-1"
              >
                contact@heightcomparisoncalculator.com
              </a>
            </div>

            {/* Wrong Height Guidance Card */}
            <div className="p-6 bg-surface border border-border rounded-3xl shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
                <Lightbulb size={20} />
              </div>
              <h2 className="text-sm font-black text-foreground uppercase tracking-wider">
                {tHeader('requestFeature')}
              </h2>
              <p className="text-xs text-muted leading-relaxed font-medium">
                {tHeader('requestFeatureDesc')}
              </p>
            </div>

            {/* Privacy & CCPA Requests */}
            <div className="p-6 bg-surface border border-border rounded-3xl shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                <Shield size={20} />
              </div>
              <h2 className="text-sm font-black text-foreground uppercase tracking-wider">
                {tHeader('privacyInquiry')}
              </h2>
              <p className="text-xs text-muted leading-relaxed font-medium">
                {tHeader('privacyInquiryDesc')}
              </p>
            </div>

            {/* Bug Report Card */}
            <div className="p-6 bg-surface border border-border rounded-3xl shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2">
                <AlertTriangle size={20} />
              </div>
              <h2 className="text-sm font-black text-foreground uppercase tracking-wider">
                {tHeader('reportBug')}
              </h2>
              <p className="text-xs text-muted leading-relaxed font-medium">
                {tHeader('reportBugDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
