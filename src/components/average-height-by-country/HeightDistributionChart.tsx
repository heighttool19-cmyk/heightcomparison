'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { BELL_CONFIG } from '@/constants/averageHeight';
import { BellCurve, Tabs } from './ChartHelpers';

export default function HeightDistributionChart() {
    const t = useTranslations('averageHeightByCountry');
    const maleLabel = t('common.tabMale');
    const femaleLabel = t('common.tabFemale');

    const [bellSex, setBellSex] = useState<"Male" | "Female">("Male");
    const activeTab = bellSex === "Male" ? maleLabel : femaleLabel;

    const translated = {
        Male: {
            ...BELL_CONFIG.Male,
            label: t('distribution.bellCurve.male.label'),
            pctLabel: t('distribution.bellCurve.male.pctLabel'),
            bands: [
                { col: BELL_CONFIG.Male.bands[0].col, label: t('distribution.bellCurve.male.band1') },
                { col: BELL_CONFIG.Male.bands[1].col, label: t('distribution.bellCurve.male.band2') },
            ]
        },
        Female: {
            ...BELL_CONFIG.Female,
            label: t('distribution.bellCurve.female.label'),
            pctLabel: t('distribution.bellCurve.female.pctLabel'),
            bands: [
                { col: BELL_CONFIG.Female.bands[0].col, label: t('distribution.bellCurve.female.band1') },
                { col: BELL_CONFIG.Female.bands[1].col, label: t('distribution.bellCurve.female.band2') },
            ]
        }
    } as const;

    const config = translated[bellSex];

    return (
        <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
            <Tabs options={[maleLabel, femaleLabel]} active={activeTab} onChange={(val) => setBellSex(val === maleLabel ? "Male" : "Female")} />
            <BellCurve
                mean={config.mean} sd={config.sd}
                color={config.color} bandColor={config.bandColor}
                globalAvgText={t('distribution.bellCurve.globalAvgLabel', { mean: config.mean })}
                axisText={t('distribution.bellCurve.axisLabel', { label: config.label })}
                pctLabel={config.pctLabel}
            />
            <div className="flex gap-4 mt-4 flex-wrap">
                {config.bands.map((b) => (
                    <div key={b.label} className="flex items-center gap-2">
                        <div style={{ background: b.col, borderColor: b.col }} className="w-4 h-4 rounded opacity-35 border" />
                        <span className="text-[11.5px] text-muted">{b.label}</span>
                    </div>
                ))}
                <span className='text-[11.5px] text-muted'>{t('distribution.legendNote')}</span>
            </div>

        </div>
    );
}
