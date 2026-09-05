'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TOP10, BOT10, MVF } from '@/constants/averageHeight';
import { GroupedChart, Tabs } from './ChartHelpers';

export default function TallestVsShortestChart() {
    const t = useTranslations('averageHeightByCountry');
    const maleLabel = t('common.tabMale');
    const femaleLabel = t('common.tabFemale');
    const tabTallestVsShortest = t('tallestShortest.tabs.tallestVsShortest');
    const tabTop10 = t('tallestShortest.tabs.top10Tallest');
    const tabBottom10 = t('tallestShortest.tabs.bottom10Shortest');

    const [mvfView, setMvfView] = useState(tabTallestVsShortest);

    return (
        <div className="bg-surface border border-border p-2 rounded-3xl shadow-sm my-6 overflow-x-auto">
            <Tabs options={[tabTallestVsShortest, tabTop10, tabBottom10]} active={mvfView} onChange={setMvfView} />
            {mvfView === tabTallestVsShortest && <GroupedChart data={MVF} title={t('tallestShortest.chartTitleTallestVsShortest')} maleLabel={maleLabel} femaleLabel={femaleLabel} />}
            {mvfView === tabTop10 && <GroupedChart data={TOP10.map(c => ({ n: c.name, code: c.code, m: c.male, w: c.female }))} title={t('tallestShortest.chartTitleTop10')} maleLabel={maleLabel} femaleLabel={femaleLabel} />}
            {mvfView === tabBottom10 && <GroupedChart data={BOT10.map(c => ({ n: c.name, code: c.code, m: c.male, w: c.female }))} title={t('tallestShortest.chartTitleBottom10')} maleLabel={maleLabel} femaleLabel={femaleLabel} />}
            <p className="mt-4 text-[11.5px] text-muted leading-relaxed">
                {t('tallestShortest.caption')}
            </p>
        </div>
    );
}
