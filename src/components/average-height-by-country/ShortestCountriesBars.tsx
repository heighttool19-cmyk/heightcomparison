'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AMBER, RED } from '@/constants/colors';
import { BOT10 } from '@/constants/averageHeight';
import { Bars, Tabs } from './ChartHelpers';

export default function ShortestCountriesBars() {
    const t = useTranslations('averageHeightByCountry');
    const menLabel = t('common.tabMen');
    const womenLabel = t('common.tabWomen');
    const [shortTab, setShortTab] = useState(menLabel);
    const isMen = shortTab === menLabel;

    const maleBot10 = BOT10.map(c => ({ n: c.name, code: c.code, v: c.male })).sort((a, b) => a.v - b.v);
    const femBot10 = BOT10.map(c => ({ n: c.name, code: c.code, v: c.female })).sort((a, b) => a.v - b.v);

    return (
        <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
            <Tabs options={[menLabel, womenLabel]} active={shortTab} onChange={setShortTab} />
            <Bars
                items={isMen ? maleBot10 : femBot10}
                color={isMen ? AMBER : RED}
                label={isMen ? t('shortestCountries.barsLabelMen') : t('shortestCountries.barsLabelWomen')}
            />
            <p className="mt-4 text-[11.5px] text-muted leading-relaxed">
                {isMen ? t('shortestCountries.captionMen') : t('shortestCountries.captionWomen')}
            </p>
        </div>
    );
}
