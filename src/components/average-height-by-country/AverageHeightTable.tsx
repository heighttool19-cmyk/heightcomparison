'use client';

import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import ReactCountryFlag from "react-country-flag";
import { useTranslations } from 'next-intl';
import { useUnitStore } from '@/store';
import { heightData } from '@/constants/averageHeight';

export default function AverageHeightTable() {
    const t = useTranslations('averageHeightByCountry.globalTable');
    const { unitSystem, setUnitSystem } = useUnitStore();

    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof typeof heightData[0] | null, direction: 'asc' | 'desc' }>({ key: 'rank', direction: 'asc' });

    const cmToFtIn = (cm: number) => {
        const totalInches = cm / 2.54;
        const ft = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        if (inches === 12) return `${ft + 1}'0"`;
        return `${ft}'${inches}"`;
    };

    const handleSort = (key: keyof typeof heightData[0]) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedData = useMemo(() => {
        let sortableItems = [...heightData];
        if (searchQuery) {
            sortableItems = sortableItems.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key!] < b[sortConfig.key!]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key!] > b[sortConfig.key!]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [searchQuery, sortConfig]);

    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <h2 id="average-height-by-country" className="text-2xl md:text-3xl font-black tracking-tight scroll-mt-24">{t('title')}</h2>
                {/* Synced Unit Toggle */}
                <div className="bg-bg border border-border p-1 rounded-full flex items-center shadow-sm shrink-0">
                    <button onClick={() => setUnitSystem('metric')} className={`px-4 py-1.5 rounded-full text-xs font-black transition-colors ${unitSystem === 'metric' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}>{t('unitToggle.metric')}</button>
                    <button onClick={() => setUnitSystem('imperial')} className={`px-4 py-1.5 rounded-full text-xs font-black transition-colors ${unitSystem === 'imperial' ? 'bg-accent text-white shadow-md' : 'text-muted hover:text-foreground'}`}>{t('unitToggle.imperial')}</button>
                </div>
            </div>

            <p className="text-muted leading-relaxed mb-6">
                {t('description')}
            </p>

            <div className="bg-surface border border-border p-4 rounded-3xl shadow-sm mb-8">
                {/* Search Bar */}
                <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                    <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-bg border border-border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-accent transition-colors"
                    />
                </div>

                <div className="overflow-x-auto rounded-xl border border-border/50">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-bg border-b border-border text-foreground font-bold uppercase tracking-wider text-xs">
                            <tr>
                                <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('rank')}>
                                    <div className="flex items-center gap-1">{t('tableHeaders.rank')} <ArrowUpDown size={14} /></div>
                                </th>
                                <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('name')}>
                                    <div className="flex items-center gap-1">{t('tableHeaders.country')} <ArrowUpDown size={14} /></div>
                                </th>
                                <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('maleCm')}>
                                    <div className="flex items-center gap-1">{t('tableHeaders.avgMale')} <ArrowUpDown size={14} /></div>
                                </th>
                                <th className="px-6 py-4 cursor-pointer hover:text-accent transition-colors" onClick={() => handleSort('femaleCm')}>
                                    <div className="flex items-center gap-1">{t('tableHeaders.avgFemale')} <ArrowUpDown size={14} /></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50 text-muted">
                            {filteredAndSortedData.length > 0 ? filteredAndSortedData.map((country) => (
                                <tr key={country.name} className="hover:bg-bg/50 transition-colors">
                                    <td className="px-6 py-4">{country.rank}</td>
                                    <td className="px-6 py-4 font-bold text-foreground flex items-center gap-2">
                                        <ReactCountryFlag countryCode={country.flag} svg style={{ width: '1.5em', height: '1.5em' }} title={country.name} /> {country.name}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        {unitSystem === 'metric' ? `${country.maleCm} cm` : cmToFtIn(country.maleCm)}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        {unitSystem === 'metric' ? `${country.femaleCm} cm` : cmToFtIn(country.femaleCm)}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-muted">{t('noResults', { query: searchQuery })}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="text-xs text-muted/60 mt-3 px-2">
                    {t('sourceNote')}
                </div>
            </div>
        </>
    );
}
