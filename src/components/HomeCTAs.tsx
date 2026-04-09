'use client';
import React from 'react';
import { PanelType } from '../types';

export default function HomeCTAs() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openDashboardPanel = (panel: PanelType) => {
        scrollToTop();
        setTimeout(() => {
            const event = new CustomEvent('open-dashboard-panel', { detail: panel });
            window.dispatchEvent(event);
        }, 100);
    };

    return (
        <div className="bg-surface rounded-3xl p-8 text-center border border-border my-4 shadow-xl">
            <h2 className="text-2xl font-black text-foreground mb-3">Go on build your comparison.</h2>
            <p className="text-[14px] text-muted mb-8 max-w-xl mx-auto">Free. No account. No limits. The most accurate <strong className='text-accent'> height comparison tool</strong> online — unlimited subjects, verified data, zero watermarks.</p>
            <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => openDashboardPanel('ADD_PERSON')} className="inline-flex items-center gap-2 h-12 px-6 bg-[#22c55e] border-none rounded-full text-white text-[14px] font-bold cursor-pointer hover:bg-green-600 transition-all shadow-md hover:-translate-y-0.5 btn-glow">
                    ↑ Start Comparing
                </button>
                <button onClick={() => openDashboardPanel('CELEBRITIES')} className="inline-flex items-center gap-2 h-12 px-6 bg-bg border border-border rounded-full text-foreground text-[14px] font-bold cursor-pointer hover:bg-surface transition-all shadow-sm hover:-translate-y-0.5">
                    Explore Celebrity Heights
                </button>
            </div>
        </div>
    );
}
