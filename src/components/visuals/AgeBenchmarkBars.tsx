import React from 'react';

const BENCHMARKS = [
  { shortLabel: 'Boy 4', fullLabel: 'Boy (Age 4, 50th%)', cm: 102.5, ft: "3'4.3\"", tone: 'zinc' },
  { shortLabel: 'Girl 10', fullLabel: 'Girl (Age 10, 50th%)', cm: 138.2, ft: "4'6.4\"", tone: 'zinc' },
  { shortLabel: 'Boy 10', fullLabel: 'Boy (Age 10, 50th%)', cm: 138.8, ft: "4'6.6\"", tone: 'zinc' },
  { shortLabel: 'Women', fullLabel: 'US Women (20+, NHANES)', cm: 161.3, ft: "5'3.5\"", tone: 'emerald' },
  { shortLabel: 'Men', fullLabel: 'US Men (20+, NHANES)', cm: 175.0, ft: "5'8.9\"", tone: 'emerald' },
];

export const AgeBenchmarkBars: React.FC = () => {
  const maxCm = 190;

  return (
    <figure className="my-5 p-4 sm:p-5 rounded-2xl bg-surface border border-border shadow-sm">
      <div
        className="space-y-3"
        role="img"
        aria-label={`CDC US height benchmarks: Boy age 4 is 102.5 cm, Girl age 10 is 138.2 cm, Boy age 10 is 138.8 cm, Adult Women average 161.3 cm (5'3.5"), Adult Men average 175.0 cm (5'8.9").`}
      >
        <div className="flex justify-between items-center text-xs font-semibold text-muted border-b border-border/50 pb-2">
          <span>Population / Age Group</span>
          <span>Measured Average (CDC)</span>
        </div>

        {BENCHMARKS.map((b) => {
          const widthPct = (b.cm / maxCm) * 100;
          const isAdult = b.tone === 'emerald';

          return (
            <div key={b.fullLabel} className="space-y-1">
              <div className="flex justify-between items-baseline text-xs">
                <span className={`font-semibold ${isAdult ? 'text-foreground font-bold' : 'text-muted'}`}>
                  <span className="sm:hidden">{b.shortLabel}</span>
                  <span className="hidden sm:inline">{b.fullLabel}</span>
                </span>
                <span className="font-mono text-xs font-bold text-foreground">
                  {b.cm} cm <span className="text-muted font-normal">({b.ft})</span>
                </span>
              </div>
              <div className="w-full h-5 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden flex">
                <div
                  style={{ width: `${widthPct}%` }}
                  className={`h-full rounded-md transition-all ${
                    isAdult
                      ? 'bg-emerald-500 shadow-sm'
                      : 'bg-zinc-400 dark:bg-zinc-600'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <figcaption className="text-xs text-muted mt-3 pt-2 border-t border-border/50 text-center sm:text-left">
        US adult averages from CDC FastStats / NHANES (Aug 2021 to Aug 2023) alongside CDC clinical growth chart medians for children. All bars drawn to scale starting from a zero baseline.
      </figcaption>
    </figure>
  );
};
