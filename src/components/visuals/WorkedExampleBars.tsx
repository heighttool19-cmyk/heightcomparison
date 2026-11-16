import React from 'react';

export const WorkedExampleBars: React.FC = () => {
  const alexCm = 170;
  const benCm = 185;
  const maxCm = 200;

  const alexPct = (alexCm / maxCm) * 100;
  const benPct = (benCm / maxCm) * 100;

  return (
    <figure className="my-6 p-5 rounded-2xl bg-surface border border-border shadow-sm max-w-xl mx-auto">
      <div
        className="space-y-4"
        role="img"
        aria-label={`Worked example: Alex at 170 cm (5'7") and Ben at 185 cm (6'1"). Ben is 15 cm (5.9 in) taller, which is 8.8% taller than Alex, who is 8.1% shorter.`}
      >
        {/* Alex bar */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold mb-1 text-foreground">
            <span>Alex</span>
            <span className="font-mono text-muted">170 cm (5&apos;7&quot;)</span>
          </div>
          <div className="w-full h-7 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden flex items-center">
            <div
              style={{ width: `${alexPct}%` }}
              className="h-full bg-zinc-400 dark:bg-zinc-500 rounded-lg flex items-center justify-end pr-2 text-[11px] font-bold text-white transition-all"
            >
              170 cm
            </div>
          </div>
        </div>

        {/* Ben bar with delta callout */}
        <div className="relative">
          <div className="flex justify-between items-center text-xs font-semibold mb-1 text-foreground">
            <span className="text-emerald-600 dark:text-emerald-400">Ben</span>
            <span className="font-mono text-foreground font-bold">185 cm (6&apos;1&quot;)</span>
          </div>
          <div className="w-full h-7 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden flex items-center relative">
            {/* Alex height baseline */}
            <div
              style={{ width: `${alexPct}%` }}
              className="h-full bg-zinc-400 dark:bg-zinc-500 rounded-l-lg flex items-center justify-end pr-2 text-[11px] font-bold text-white/90"
            >
              170 cm
            </div>
            {/* 15 cm difference segment */}
            <div
              style={{ width: `${benPct - alexPct}%` }}
              className="h-full bg-emerald-500 rounded-r-lg flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
              title="Difference: +15 cm (5.9 in)"
            >
              +15 cm
            </div>
          </div>
        </div>

        {/* Comparison Callout Pills */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 border-t border-border/50 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800/40">
            Difference: <strong>15 cm (5.9 in)</strong>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-surface border border-border text-foreground font-semibold">
            Ratio: <strong>1.09×</strong>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800/40">
            Ben is <strong>8.8% taller</strong>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800/40">
            Alex is <strong>8.1% shorter</strong>
          </span>
        </div>
      </div>

      <figcaption className="text-xs text-muted mt-3 pt-2 text-center sm:text-left">
        Alex at 5&apos;7&quot; (170 cm) and Ben at 6&apos;1&quot; (185 cm), drawn to scale from a zero baseline. Ben is 15 cm (5.9 in) taller: 8.8% taller than Alex, who is 8.1% shorter.
      </figcaption>
    </figure>
  );
};
