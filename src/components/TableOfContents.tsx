'use client';

import React, { useState, useEffect, useRef } from 'react';

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
        const visibleSections = new Map<string, IntersectionObserverEntry>();

        const observer = new IntersectionObserver(
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
                                // Extract the current path without leading slash
                                const currentPath = window.location.pathname.replace(/^\//, '');
                                // If the section ID matches the simplified path, don't add the hash
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
        headings.forEach((h) => observer.observe(h));

        return () => {
            observer.disconnect();
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, [items]); // Removed activeSection from dependencies

    const TOCLink = ({ item, isSub = false }: { item: TOCItem, isSub?: boolean }) => {
        const checkActiveRecursive = (node: TOCItem): boolean => {
            if (activeSection === node.id) return true;
            if (node.subItems) return node.subItems.some(sub => checkActiveRecursive(sub));
            return false;
        };

        const isActive = checkActiveRecursive(item);

        const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            isClickScrolling.current = true;
            setActiveSection(item.id);

            if (window.history.pushState) {
                window.history.pushState(null, '', `#${item.id}`);
            }

            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                isClickScrolling.current = false;
            }, 1000);
        };

        return (
            <li className={`transition-all duration-300 ${isSub ? 'mt-2' : 'mt-3'}`}>
                <a
                    href={`#${item.id}`}
                    onClick={handleLinkClick}
                    className={`block transition-all duration-300 border-l-2 pl-2 whitespace-nowrap leading-tight ${isActive
                        ? 'text-accent border-accent font-bold'
                        : 'text-muted hover:text-foreground border-transparent'
                        }`}
                >
                    {item.label}
                </a>
                {item.subItems && (
                    <ul className="pl-2 ml-1 border-l border-border/50 mt-2 space-y-2">
                        {item.subItems.map(sub => <TOCLink key={sub.id} item={sub} isSub={true} />)}
                    </ul>
                )}
            </li>
        );
    };

    return (
        // <div className="sticky top-24 bg-surface border border-border rounded-3xl pt-5 pb-5 pr-4 pl-2 shadow-xl max-h-[calc(100vh-120px)] overflow-auto custom-toc-scrollbar text-left scrollbar-thin scrollbar-thumb-accent/20 hover:scrollbar-thumb-accent/40 scrollbar-track-transparent">
        //     <h3 className="text-sm font-black uppercase tracking-[0.2em] sticky top-0 bg-surface z-10 pb-2 border-b border-border/50 mb-4">
        //         Table of Contents
        //     </h3>
        //     <ul className="text-sm font-medium">
        //         {items.map(item => (
        //             <TOCLink key={item.id} item={item} />
        //         ))}
        //     </ul>
        // </div>
        <>
            {/* OUTER WRAPPER: Handles the border, shadow, and clips any bleeding scrollbars with overflow-hidden */}
            <div className="sticky top-24 bg-surface border border-border rounded-3xl shadow-xl max-h-[calc(100vh-120px)] flex flex-col overflow-hidden">

                {/* FIXED HEADER: Stays perfectly still. Doesn't scroll left/right or up/down */}
                <div className="pt-5 px-4 pb-3 border-b border-border/50 bg-surface shrink-0">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] m-0">
                        Table of Contents
                    </h3>
                </div>

                {/* SCROLLING AREA: Handled safely inside the outer wrapper */}
                <div className="flex-1 overflow-auto px-2 py-4 custom-toc-scrollbar text-left scrollbar-thin scrollbar-thumb-accent/20 hover:scrollbar-thumb-accent/40 scrollbar-track-transparent">
                    <ul className="text-sm font-medium pr-4">
                        {items.map(item => (
                            <TOCLink key={item.id} item={item} />
                        ))}
                    </ul>
                </div>

            </div>
        </>
    );

};

export default TableOfContents;
