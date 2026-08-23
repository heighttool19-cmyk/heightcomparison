'use client';

import React, { useState, useEffect, useRef } from 'react';
import SmoothScrollLink from './SmoothScrollLink';

interface TOCItem {
    id: string;
    label: string;
    subItems?: TOCItem[];
}

interface TableOfContentsProps {
    items: TOCItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
    const [activeSection, setActiveSection] = useState<string>('');
    const isClickScrolling = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    const activeSectionRef = useRef<string>('');

    useEffect(() => {
        // MOBILE GUARD: Don't run the observer on mobile screens where the TOC is hidden.
        const MOBILE_BREAKPOINT = 768;

        let observer: IntersectionObserver | null = null;
        let cleanup: (() => void) | null = null;

        const setupObserver = () => {
            if (cleanup) {
                cleanup();
                cleanup = null;
            }

            if (typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT) {
                return;
            }

            const visibleSections = new Map<string, IntersectionObserverEntry>();

            observer = new IntersectionObserver(
                (entries) => {
                    if (isClickScrolling.current) return;

                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            visibleSections.set(entry.target.id, entry);
                        } else {
                            visibleSections.delete(entry.target.id);
                        }
                    });

                    if (visibleSections.size > 0) {
                        let closestSection = '';
                        let minTop = Infinity;

                        visibleSections.forEach((entry, id) => {
                            const topPos = entry.boundingClientRect.top;
                            if (topPos >= 0 && topPos < minTop) {
                                minTop = topPos;
                                closestSection = id;
                            }
                        });

                        if (!closestSection) {
                            closestSection = Array.from(visibleSections.keys())[0];
                        }

                        if (closestSection && closestSection !== activeSectionRef.current) {
                            activeSectionRef.current = closestSection;
                            setActiveSection(closestSection);
                            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                            scrollTimeout.current = setTimeout(() => {
                                if (window.history.replaceState) {
                                    const currentPath = window.location.pathname.replace(/^\//, '');
                                    const newUrl = (closestSection === currentPath) ? window.location.pathname : `#${closestSection}`;
                                    window.history.replaceState(null, '', newUrl);
                                }
                            }, 100);
                        }
                    }
                },
                { rootMargin: '-10% 0px -40% 0px', threshold: 0 }
            );

            const extractIds = (data: TOCItem[]): string[] => {
                let ids: string[] = [];
                data.forEach(item => {
                    ids.push(`#${item.id}`);
                    if (item.subItems) {
                        ids = ids.concat(extractIds(item.subItems));
                    }
                });
                return ids;
            };

            const selectors = extractIds(items).join(', ');
            const headings = document.querySelectorAll(selectors);
            headings.forEach((h) => observer!.observe(h));

            cleanup = () => {
                observer?.disconnect();
                if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            };
        };

        setupObserver();

        let lastWasMobile = typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;
        const handleResize = () => {
            const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
            if (isMobile !== lastWasMobile) {
                lastWasMobile = isMobile;
                setupObserver();
            }
        };
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            cleanup?.();
            window.removeEventListener('resize', handleResize);
        };
    }, [items]);

    const TOCLink = ({ item, isSub = false }: { item: TOCItem, isSub?: boolean }) => {
        const checkActiveRecursive = (node: TOCItem): boolean => {
            if (activeSection === node.id) return true;
            if (node.subItems) return node.subItems.some(sub => checkActiveRecursive(sub));
            return false;
        };

        const isActive = checkActiveRecursive(item);

        return (
            <li className={`transition-all duration-300 ${isSub ? 'mt-2' : 'mt-3'}`}>
                <SmoothScrollLink
                    targetId={item.id}
                    onClick={() => {
                        isClickScrolling.current = true;
                        setActiveSection(item.id);
                        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                        scrollTimeout.current = setTimeout(() => {
                            isClickScrolling.current = false;
                        }, 1000);
                    }}
                    // Removed whitespace-nowrap, added whitespace-normal and break-words for folding
                    className={`block transition-all duration-300 border-l-2 pl-2 whitespace-normal break-words leading-snug ${isActive
                        ? 'text-accent border-accent font-bold'
                        : 'text-muted hover:text-foreground border-transparent'
                        }`}
                >
                    {item.label}
                </SmoothScrollLink>
                {item.subItems && (
                    <ul className="pl-2 ml-1 border-l border-border/50 mt-2 space-y-2">
                        {item.subItems.map(sub => <TOCLink key={sub.id} item={sub} isSub={true} />)}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <nav aria-label="Table of Contents">
            {/* OUTER WRAPPER: Added w-64 (or e.g., w-[280px]) for a fixed width */}
            <div className="w-72 sticky top-24 bg-surface border border-border rounded-3xl shadow-xl max-h-[calc(100vh-120px)] flex flex-col overflow-hidden">

                {/* FIXED HEADER */}
                <div className="pt-5 px-4 pb-3 border-b border-border/50 bg-surface shrink-0">
                    <div className="text-sm font-black uppercase tracking-[0.2em] m-0">
                        Table of Contents
                    </div>
                </div>

                {/* SCROLLING AREA: Changed overflow-auto to overflow-y-auto overflow-x-hidden */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4 custom-toc-scrollbar text-left scrollbar-thin scrollbar-thumb-accent/20 hover:scrollbar-thumb-accent/40 scrollbar-track-transparent">
                    <ul className="text-sm font-medium pr-4">
                        {items.map(item => (
                            <TOCLink key={item.id} item={item} />
                        ))}
                    </ul>
                </div>

            </div>
        </nav>
    );
};

export default TableOfContents;