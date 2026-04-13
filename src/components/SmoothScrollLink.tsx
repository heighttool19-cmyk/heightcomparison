'use client';

import React from 'react';

interface SmoothScrollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    targetId: string;
    children: React.ReactNode;
}

export default function SmoothScrollLink({ 
    targetId, 
    children, 
    className, 
    ...props 
}: SmoothScrollLinkProps) {
    
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // 1. Completely stop the browser's default jump
        
        const cleanId = targetId.replace('#', '');
        const element = document.getElementById(cleanId);
        
        if (element) {
            // 2. Calculate the exact pixel distance from the top of the page.
            // Note: Subtracting 80px here so it leaves a little breathing room at the top 
            // (perfect if you have a sticky navbar). Adjust this number as needed!
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - 80;

            // 3. Force the window to scroll to those exact pixels
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            
            // 4. Delay the URL update so Safari doesn't cancel the scroll animation!
            setTimeout(() => {
                window.history.pushState(null, '', `#${cleanId}`);
            }, 800); // 800ms gives the smooth scroll time to finish
        }
    };

    return (
        <a
            href={`#${targetId.replace('#', '')}`}
            onClick={handleScroll}
            className={`cursor-pointer ${className || ''}`}
            {...props}
        >
            {children}
        </a>
    );
}
