import React from 'react';
import { Plus } from 'lucide-react';

export interface PanelListItemProps {
    id: string;
    name: string;
    heightString: string;
    onAdd: () => void;
    avatarNode: React.ReactNode;
    addAriaLabel?: string;
}

export const PanelListItem: React.FC<PanelListItemProps> = ({
    name,
    heightString,
    onAdd,
    avatarNode,
    addAriaLabel
}) => {
    return (
        <div
            className="group flex items-center justify-between p-2.5 bg-bg border border-border/30 rounded-2xl hover:border-accent/30 transition-all duration-300"
        >
            <div className="flex items-center gap-3 overflow-hidden">
                {avatarNode}

                {/* Info */}
                <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-foreground truncate leading-tight">
                        {name}
                    </span>
                    <span className="text-[11px] font-bold text-accent mt-0.5">
                        {heightString}
                    </span>
                </div>
            </div>

            {/* Add Button */}
            <button
                onClick={onAdd}
                aria-label={addAriaLabel || `Add ${name}`}
                className="w-8 h-8 shrink-0 flex items-center justify-center rounded-xl bg-surface text-accent hover:bg-accent hover:text-white border border-border/50 transition-all active:scale-95 shadow-sm"
            >
                <Plus size={16} strokeWidth={3} />
            </button>
        </div>
    );
};

export default PanelListItem;
