'use client';

import React, { useState, useEffect, useRef } from 'react';

interface LazyLoadProps {
    children: React.ReactNode;
    minHeight?: string;
    rootMargin?: string;
}

export default function LazyLoad({ children, minHeight = "400px", rootMargin = "300px 0px" }: LazyLoadProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fallback for extremely old browsers
        if (!window.IntersectionObserver) {
            const timer = setTimeout(() => setIsVisible(true), 0);
            return () => clearTimeout(timer);
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { rootMargin });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [rootMargin]);

    return (
        <div ref={ref} style={{ minHeight: isVisible ? 'auto' : minHeight, width: '100%' }}>
            {isVisible ? children : null}
        </div>
    );
}
