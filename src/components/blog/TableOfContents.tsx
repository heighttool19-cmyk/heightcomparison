/**
 * TableOfContents Component
 *
 * Desktop: Renders as a sticky sidebar with smooth scroll links.
 * Mobile: Renders as a collapsible disclosure panel.
 *
 * Uses IntersectionObserver to highlight the currently visible section.
 */
"use client";

import { useEffect, useState, useCallback } from "react";
import type { TocHeading } from "@/sanity/lib/types";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  // ── IntersectionObserver for active heading tracking ───────────────────
  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is currently intersecting
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  // ── Smooth scroll handler ─────────────────────────────────────────────
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveId(id);
        setIsOpen(false); // Close mobile panel after click
      }
    },
    []
  );

  if (headings.length === 0) return null;

  // ── Shared list renderer ──────────────────────────────────────────────
  const renderList = () => (
    <nav aria-label="Table of contents">
      <ul className="space-y-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  block rounded-lg px-3 py-2 text-sm leading-snug transition-all duration-200
                  ${heading.level === 3 ? "pl-6" : ""}
                  ${
                    isActive
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-muted hover:text-foreground hover:bg-surface"
                  }
                `}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* ── Desktop: Sticky sidebar ───────────────────────────────────── */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
            Jump to section
          </p>
          <div className="max-h-[calc(100vh-8rem)] overflow-y-auto custom-toc-scrollbar pr-2">
            {renderList()}
          </div>
        </div>
      </aside>

      {/* ── Mobile: Collapsible panel ─────────────────────────────────── */}
      <div className="lg:hidden mb-10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 text-sm font-bold uppercase tracking-widest text-muted transition-colors hover:border-accent/30"
          aria-expanded={isOpen}
          aria-controls="mobile-toc"
        >
          <span>Jump to section</span>
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div
            id="mobile-toc"
            className="mt-3 rounded-2xl border border-border bg-surface p-4 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {renderList()}
          </div>
        )}
      </div>
    </>
  );
}
