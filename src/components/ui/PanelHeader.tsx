import React from 'react';

export interface PanelHeaderProps {
    title: string;
    subtitle: string;
    count?: number;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({ title, subtitle, count }) => {
    return (
        <div className="px-6 pt-6 pb-2 shrink-0 hidden sm:block">
            <h2 className="text-base font-black uppercase tracking-tight text-foreground mb-1 flex items-center gap-2">
                {title}
                {count !== undefined && (
                    <span className="text-[10px] font-bold text-accent px-2 py-0.5 bg-accent/10 border border-accent/20 rounded-full">
                        {count}
                    </span>
                )}
            </h2>
            <p className="text-[11px] font-medium text-muted">
                {subtitle}
            </p>
        </div>
    );
};

export default PanelHeader;
