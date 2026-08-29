import { getTranslations } from 'next-intl/server';
import { Info, BarChart2, Zap, Lock, ShieldCheck } from 'lucide-react';
import JsonLd from '@/components/common/JsonLd';
import { ABOUT_SCHEMA } from '@/constants/schemas/about';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const baseUrl = 'https://heightcomparisoncalculator.com';
  const canonicalUrl = locale === 'en' ? `${baseUrl}/about` : `${baseUrl}/${locale}/about`;

  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/about`,
        de: `${baseUrl}/de/about`,
        'x-default': `${baseUrl}/about`
      }
    }
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const calculators = t.raw('calculators') as Array<{ title: string; text: string }>;
  const whatItDoesParagraphs = t.raw('whatItDoesParagraphs') as string[];
  const noAccountParagraphs = t.raw('noAccountParagraphs') as string[];
  const accuracyParagraphs = t.raw('accuracyParagraphs') as string[];

  return (
    <div className="min-h-screen bg-bg">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-accent/5 to-transparent" />
      <JsonLd data={ABOUT_SCHEMA} />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-20">
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-accent/10 text-accent mb-6">
            <Info size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase mb-4">
            {t('badge')} <span className="text-accent">{t('brandName')}</span>
          </h1>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
        </header>

        <div className="bg-surface border-2 border-border rounded-[2.5rem] shadow-2xl overflow-hidden mb-12">
          <div className="p-8 md:p-12 space-y-8">
            {/* Section 1: Intro */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl md:text-2xl text-foreground font-bold leading-relaxed tracking-tight">
                {t('heroQuote')}
              </p>
              <p className="text-lg text-muted font-medium mt-6">
                {t('builtDifferent')}
              </p>
            </div>

            {/* Section 2: What the Tool Actually Does */}
            <div className="pt-8 border-t border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <BarChart2 className="text-accent" size={24} />
                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('whatItDoesTitle')}</h2>
              </div>
              <div className="space-y-6 text-muted leading-relaxed font-medium text-lg">
                {whatItDoesParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Section 3: The Other Calculators */}
            <div className="pt-8 border-t border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-accent" size={24} />
                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('otherCalculatorsTitle')}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {calculators.map((tool, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-accent/5 border border-accent/10">
                    <h3 className="font-black text-foreground text-sm uppercase mb-2 tracking-wide">{tool.title}</h3>
                    <p className="text-sm text-muted/80 leading-relaxed font-medium font-sans">
                      {tool.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: No Account */}
            <div className="pt-8 border-t border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="text-accent" size={24} />
                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('noAccountTitle')}</h2>
              </div>
              <div className="space-y-4 text-muted leading-relaxed font-medium text-lg">
                {noAccountParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Section 5: Accuracy */}
            <div className="pt-8 border-t border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-accent" size={24} />
                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{t('accuracyTitle')}</h2>
              </div>
              <div className="space-y-4 text-muted leading-relaxed font-medium text-lg">
                {accuracyParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                <p className="font-black text-foreground uppercase tracking-widest text-sm pt-4">
                  {t('nothingUserSubmitted')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pb-12">
          <p className="text-muted font-medium mb-6 italic opacity-70">
            {t('footerQuote')}
          </p>
        </div>
      </div>
    </div>
  );
}
