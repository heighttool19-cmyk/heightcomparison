import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl?: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl = '/blogs' }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageUrl = (page: number) => {
        if (page === 1) return baseUrl;
        return `${baseUrl}?page=${page}`;
    };

    const getPageNumbers = (): (number | string)[] => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, '...', totalPages];
        }

        if (currentPage >= totalPages - 3) {
            return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }

        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    const pageNumbers = getPageNumbers();
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return (
        <nav
            aria-label="Blog pagination"
            className="flex flex-wrap items-center justify-center gap-2 pt-12 select-none"
        >
            {/* Previous Button */}
            {hasPrev ? (
                <Link
                    href={getPageUrl(currentPage - 1)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-surface border border-border text-foreground hover:border-accent hover:text-accent transition-all shadow-xs"
                    aria-label="Previous page"
                >
                    <ChevronLeft size={16} />
                    <span>Prev</span>
                </Link>
            ) : (
                <span
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-surface/50 border border-border/50 text-muted/40 cursor-not-allowed"
                    aria-disabled="true"
                >
                    <ChevronLeft size={16} />
                    <span>Prev</span>
                </span>
            )}

            {/* Page Number Buttons */}
            <div className="flex items-center gap-1.5">
                {pageNumbers.map((item, idx) => {
                    if (item === '...') {
                        return (
                            <span
                                key={`ellipsis-${idx}`}
                                className="w-9 h-9 flex items-center justify-center text-xs font-bold text-muted select-none"
                            >
                                …
                            </span>
                        );
                    }

                    const pageNum = item as number;
                    const isActive = pageNum === currentPage;

                    if (isActive) {
                        return (
                            <span
                                key={pageNum}
                                aria-current="page"
                                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs sm:text-sm font-black bg-accent text-white shadow-sm"
                            >
                                {pageNum}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={pageNum}
                            href={getPageUrl(pageNum)}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold bg-surface border border-border text-foreground hover:border-accent hover:text-accent transition-all shadow-xs"
                        >
                            {pageNum}
                        </Link>
                    );
                })}
            </div>

            {/* Next Button */}
            {hasNext ? (
                <Link
                    href={getPageUrl(currentPage + 1)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-surface border border-border text-foreground hover:border-accent hover:text-accent transition-all shadow-xs"
                    aria-label="Next page"
                >
                    <span>Next</span>
                    <ChevronRight size={16} />
                </Link>
            ) : (
                <span
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-surface/50 border border-border/50 text-muted/40 cursor-not-allowed"
                    aria-disabled="true"
                >
                    <span>Next</span>
                    <ChevronRight size={16} />
                </span>
            )}
        </nav>
    );
}

