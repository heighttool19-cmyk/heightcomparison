'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { BLUE, TEAL } from '@/constants/colors';
import { TOP10 } from '@/constants/averageHeight';
import { Bars, Tabs } from './ChartHelpers';

export default function TallestCountriesBars() {
    const t = useTranslations('averageHeightByCountry');
    const menLabel = t('common.tabMen');
    const womenLabel = t('common.tabWomen');
    const [tallTab, setTallTab] = useState(menLabel);
    const isMen = tallTab === menLabel;

    const maleTop10 = TOP10.map(c => ({ n: c.name, code: c.code, v: c.male })).sort((a, b) => b.v - a.v);
    const femTop10 = TOP10.map(c => ({ n: c.name, code: c.code, v: c.female })).sort((a, b) => b.v - a.v);

    return (
        <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm my-6 overflow-x-auto">
            <Tabs options={[menLabel, womenLabel]} active={tallTab} onChange={setTallTab} />
            <Bars
                items={isMen ? maleTop10 : femTop10}
                color={isMen ? BLUE : TEAL}
                label={isMen ? t('tallestCountries.barsLabelMen') : t('tallestCountries.barsLabelWomen')}
            />
            <p className="mt-4 text-[11.5px] text-muted leading-relaxed">
                {isMen ? t('tallestCountries.captionMen') : t('tallestCountries.captionWomen')}
            </p>
        </div>
    );
}
