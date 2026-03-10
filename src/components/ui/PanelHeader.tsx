import React from 'react';

export interface PanelHeaderProps {
    title: string;
    subtitle: string;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="px-6 pt-6 pb-2 shrink-0 hidden sm:block">
            <h2 className="text-base font-black uppercase tracking-tight text-foreground mb-1">
                {title}
            </h2>
            <p className="text-[11px] font-medium text-muted">
                {subtitle}
            </p>
        </div>
    );
};

export default PanelHeader;
