import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Shield, Lock, FileText, Eye, Database, HelpCircle, Clock, Mail } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    const baseUrl = 'https://heightcomparisoncalculator.com';
    const canonicalUrl = locale === 'en' ? `${baseUrl}/privacy` : `${baseUrl}/${locale}/privacy`;

    return {
        title: t('privacyTitle'),
        description: t('privacyDescription'),
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${baseUrl}/privacy`,
                de: `${baseUrl}/de/privacy`,
                'x-default': `${baseUrl}/privacy`
            }
        }
    };
}

export default async function LocalizedPrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'privacy' });

    const whatWeDoNotCollectList = t.raw('whatWeDoNotCollectList') as string[];
    const howWeUseList = t.raw('howWeUseList') as string[];

    return (
        <div className="min-h-screen bg-bg">
            {/* Decorative top gradient */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-accent/5 to-transparent" />

            <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-20">
                {/* Header Section */}
                <header className="mb-12 lg:mb-16 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-accent/10 text-accent mb-6">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase mb-4">
                        {t('titlePrefix')}<span className="text-accent">{t('titleSuffix')}</span>
                    </h1>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-24 h-1.5 bg-accent rounded-full" />
                        <p className="text-muted text-lg font-bold mt-4 opacity-80">
                            {t('subheading')}
                        </p>
                    </div>
                </header>

                {/* Main Content Card */}
                <div className="bg-surface border-2 border-border rounded-[2.5rem] shadow-2xl overflow-hidden mb-12">
                    <div className="p-8 md:p-12 space-y-12">
                        {/* Intro */}
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-foreground font-bold leading-relaxed opacity-90">
                                {t('intro')}
                            </p>
                        </div>

                        {/* What We Collect */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <Database className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('whatWeCollectTitle')}</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-accent" />
                                        {t('infoYouProvideTitle')}
                                    </h3>
                                    <div className="pl-4 space-y-4 text-muted leading-relaxed font-medium">
                                        <p>
                                            {t('infoYouProvideIntro')}
                                        </p>
                                        <ul className="list-disc pl-5 space-y-3">
                                            <li>
                                                <span className="text-foreground font-bold">{t('uploadedImagesLabel')}</span>
                                                {t('uploadedImagesText')}
                                            </li>
                                            <li>
                                                <span className="text-foreground font-bold">{t('shareableLinksLabel')}</span>
                                                {t('shareableLinksText')}
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-accent" />
                                        {t('infoCollectedAutoTitle')}
                                    </h3>
                                    <div className="pl-4 space-y-4 text-muted leading-relaxed font-medium">
                                        <ul className="list-disc pl-5 space-y-3">
                                            <li>
                                                <span className="text-foreground font-bold">{t('googleAnalyticsLabel')}</span>
                                                {t('googleAnalyticsText')}
                                            </li>
                                        </ul>
                                        <p className="text-sm italic pl-5">
                                            {t('googleAnalyticsNote')}
                                        </p>
                                        <ul className="list-disc pl-5 space-y-3">
                                            <li>
                                                <span className="text-foreground font-bold">{t('serverLogsLabel')}</span>
                                                {t('serverLogsText')}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* What We Do Not Collect */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <Eye className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('whatWeDoNotCollectTitle')}</h2>
                            </div>
                            <div className="space-y-4 text-muted leading-relaxed font-medium">
                                <p>{t('whatWeDoNotCollectIntro')}</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    {whatWeDoNotCollectList.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* How We Use the Data */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight text-accent inline-flex items-center gap-2">
                                    <Zap size={24} className="fill-accent" />
                                    {t('howWeUseTitle')}
                                </h2>
                            </div>
                            <div className="space-y-4 text-muted leading-relaxed font-medium text-lg">
                                <p>{t('howWeUseIntro')}</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    {howWeUseList.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                                <p>{t('howWeUseFooter')}</p>
                            </div>
                        </div>

                        {/* Data Retention */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <Clock className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('dataRetentionTitle')}</h2>
                            </div>
                            <p className="text-muted leading-relaxed font-medium text-lg">
                                {t('dataRetentionText')}
                            </p>
                        </div>

                        {/* Your Rights and Choices */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <HelpCircle className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('yourRightsTitle')}</h2>
                            </div>
                            <div className="space-y-4 text-muted leading-relaxed font-medium">
                                <p>
                                    <span className="text-foreground font-bold">{t('requestDeletionLabel')}</span>
                                    {t('requestDeletionText')}
                                    <a href="mailto:contact@heightcomparisoncalculator.com" className="text-accent hover:underline">contact@heightcomparisoncalculator.com</a>
                                    {t('requestDeletionTextEnd')}
                                </p>
                                <p>
                                    <span className="text-foreground font-bold">{t('optOutGaLabel')}</span>
                                    {t('optOutGaText')}
                                </p>
                                <p>
                                    <span className="text-foreground font-bold">{t('browserControlsLabel')}</span>
                                    {t('browserControlsText')}
                                </p>
                            </div>
                        </div>

                        {/* Children's Privacy */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <Lock className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('childrensPrivacyTitle')}</h2>
                            </div>
                            <p className="text-muted leading-relaxed font-medium text-lg">
                                {t('childrensPrivacyText')}
                                <a href="mailto:contact@heightcomparisoncalculator.com" className="text-accent hover:underline">contact@heightcomparisoncalculator.com</a>
                                {t('childrensPrivacyTextEnd')}
                            </p>
                        </div>

                        {/* Third-Party Links */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('thirdPartyLinksTitle')}</h2>
                            </div>
                            <p className="text-muted leading-relaxed font-medium text-lg">
                                {t('thirdPartyLinksText')}
                            </p>
                        </div>

                        {/* Changes to This Policy */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <Lock className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('changesToPolicyTitle')}</h2>
                            </div>
                            <p className="text-muted leading-relaxed font-medium text-lg">
                                {t('changesToPolicyText')}
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="pt-8 border-t border-border/50">
                            <div className="flex items-center gap-3 mb-6">
                                <Mail className="text-accent" size={24} />
                                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('contactTitle')}</h2>
                            </div>
                            <p className="text-muted leading-relaxed font-medium text-lg">
                                {t('contactIntro')}
                                <br />
                                <span className="text-foreground font-bold">{t('emailLabel')}</span>
                                <a href="mailto:contact@heightcomparisoncalculator.com" className="text-accent hover:underline">contact@heightcomparisoncalculator.com</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center pb-12">
                    <p className="text-muted font-medium mb-6 italic opacity-70">
                        {t('trustFooter')}
                    </p>
                </div>
            </div>
        </div>
    );
}

const Zap = ({ size, className }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);
