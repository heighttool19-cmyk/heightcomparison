'use client';
import React from 'react';
import { PanelType } from '../types';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    panel: PanelType;
}

export default function DashboardLink({ panel, children, ...props }: Props) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openDashboardPanel = () => {
        scrollToTop();
        setTimeout(() => {
            const event = new CustomEvent('open-dashboard-panel', { detail: panel });
            window.dispatchEvent(event);
        }, 100);
    };

    return (
        <button onClick={openDashboardPanel} {...props}>
            {children}
        </button>
    );
}
