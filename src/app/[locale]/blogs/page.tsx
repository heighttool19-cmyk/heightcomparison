import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { allPostsQuery } from '@/sanity/lib/queries';
import type { Post } from '@/sanity/lib/types';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { formatLocalizedDate as formatDate, getCanonicalUrl, getAlternateLanguages, getSocialMetadata } from '@/i18n/config';

export const revalidate = 60; // ISR cache revalidation every 60 seconds

export async function generateMetadata({
    params,
}: {
    params?: Promise<{ locale?: string }>;
}) {
    const resolvedParams = params ? await params : undefined;
    const locale = resolvedParams?.locale || "en";
    const t = await getTranslations({ locale, namespace: 'blogs' });

    return {
        title: "Height Blog | Height Comparison Calculator",
        description: t('subheading'),
        alternates: {
            canonical: getCanonicalUrl('/blogs', locale),
            languages: getAlternateLanguages('/blogs'),
        },
        ...getSocialMetadata({
            title: "Height Blog | Height Comparison Calculator",
            description: t('subheading'),
            path: '/blogs',
            locale,
        }),
    };
}

export default async function BlogsPage({
    params,
}: {
    params?: Promise<{ locale?: string }>;
}) {
    const resolvedParams = params ? await params : undefined;
    const locale = resolvedParams?.locale || "en";
    const t = await getTranslations({ locale, namespace: 'blogs' });
    const posts = await client.fetch<Post[]>(allPostsQuery, { locale });

    return (
        <ErrorBoundary name="BlogsIndex">
            <div className="min-h-screen bg-bg">
                {/* Decorative top gradient */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-accent/5 to-transparent" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-20">
                    <header className="mb-12 lg:mb-16">
                        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-accent">
                            {t('badge')}
                        </p>
                        <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl uppercase">
                            {t('heading')}
                        </h1>
                        <p className="mt-6 text-lg leading-relaxed text-muted lg:text-xl max-w-2xl font-bold opacity-80">
                            {t('subheading')}
                        </p>
                    </header>

                    {posts.length === 0 ? (
                        <div className="py-24 text-center border-2 border-dashed border-border rounded-3xl">
                            <h2 className="text-xl font-bold text-muted mb-2">{t('noPostsTitle')}</h2>
                            <p className="text-muted/60">{t('noPostsSubtitle')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Link
                                    href={`/blog/${post.slug.current}`}
                                    key={post._id}
                                    className="group flex flex-col bg-surface border-2 border-border rounded-3xl overflow-hidden hover:border-accent/40 transition-colors shadow-sm cursor-pointer"
                                    prefetch={false}
                                >
                                    {/* Image */}
                                    <div className="aspect-[16/10] bg-muted/10 overflow-hidden relative">
                                        {post.mainImage?.asset?.url ? (
                                            <Image
                                                src={post.mainImage.asset.url.includes('cdn.sanity.io')
                                                    ? `${post.mainImage.asset.url}?auto=format&w=640`
                                                    : post.mainImage.asset.url}
                                                alt={post.mainImage.alt && post.mainImage.alt !== "Main Image"
                                                    ? post.mainImage.alt
                                                    : post.title}
                                                width={400}
                                                height={250}
                                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted/30">
                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                                    <circle cx="9" cy="9" r="2" />
                                                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 md:p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-md">
                                                {t('articleBadge')}
                                            </div>
                                            <time dateTime={post.publishedAt} className="text-xs font-bold text-muted/70">
                                                {formatDate(post.publishedAt, locale)}
                                            </time>
                                        </div>

                                        <h2 className="text-xl md:text-2xl font-black text-foreground mb-3 leading-tight group-hover:text-accent transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>

                                        {post.excerpt && (
                                            <p className="text-sm text-muted font-bold opacity-70 mb-6 line-clamp-3 leading-relaxed flex-1">
                                                {post.excerpt}
                                            </p>
                                        )}

                                        {/* Author Footer */}
                                        <div className="mt-auto pt-6 border-t border-border flex items-center gap-3">
                                            {post.author?.image?.asset?.url ? (
                                                <Image
                                                    src={post.author.image.asset.url.includes('cdn.sanity.io')
                                                        ? `${post.author.image.asset.url}?auto=format&w=64`
                                                        : post.author.image.asset.url}
                                                    alt="Icon of a person beside a height scale"
                                                    width={32}
                                                    height={32}
                                                    className="w-8 h-8 rounded-full object-cover border border-border"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center font-bold text-accent text-xs">
                                                    {post.author?.name?.charAt(0) || 'A'}
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-foreground">
                                                    {post.author?.name || t('unknownAuthor')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ErrorBoundary>
    );
}