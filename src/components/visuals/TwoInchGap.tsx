import React from 'react';

export const TwoInchGap: React.FC = () => {
  return (
    <figure className="my-5 p-4 sm:p-5 rounded-2xl bg-surface border border-border shadow-sm max-w-lg mx-auto">
      <div
        className="w-full flex flex-col items-center"
        role="img"
        aria-label={`Illustration of a 2-inch height difference: 5'9" (175.3 cm) vs 5'11" (180.3 cm), showing a 2-inch (5.1 cm) gap at the top and eye-level aligning with the taller person's forehead.`}
      >
        <svg
          viewBox="0 0 360 220"
          className="w-full h-auto max-h-[220px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Baseline */}
          <line x1="20" y1="200" x2="340" y2="200" stroke="currentColor" strokeWidth="2" className="text-zinc-300 dark:text-zinc-700" />
          <text x="340" y="214" textAnchor="end" fontSize="10" className="fill-zinc-400 font-mono">0 cm baseline</text>

          {/* Person A: 5'9" (175.3 cm) -> height = 160px */}
          <rect x="70" y="40" width="55" height="160" rx="6" className="fill-zinc-400 dark:fill-zinc-600" />
          <circle cx="97.5" cy="65" r="18" className="fill-zinc-300 dark:fill-zinc-500" />
          <text x="97.5" y="115" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">5&apos;9&quot;</text>
          <text x="97.5" y="130" textAnchor="middle" fontSize="10" fill="white" opacity="0.9">175.3 cm</text>

          {/* Person B: 5'11" (180.3 cm) -> height = 175px (15px taller = 2 inches on this scale) */}
          <rect x="180" y="25" width="55" height="175" rx="6" className="fill-emerald-500" />
          <circle cx="207.5" cy="50" r="18" className="fill-emerald-400" />
          <text x="207.5" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">5&apos;11&quot;</text>
          <text x="207.5" y="120" textAnchor="middle" fontSize="10" fill="white" opacity="0.9">180.3 cm</text>

          {/* Shorter Top Guideline across */}
          <line x1="125" y1="40" x2="250" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Bracket / Callout for the 2-inch difference */}
          <path d="M 245 25 L 255 25 L 255 40 L 245 40" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-zinc-600 dark:text-zinc-300" />
          <line x1="255" y1="32.5" x2="265" y2="32.5" stroke="currentColor" strokeWidth="1.5" className="text-zinc-600 dark:text-zinc-300" />
          <text x="270" y="31" fontSize="11" fontWeight="bold" className="fill-foreground">2 in</text>
          <text x="270" y="42" fontSize="9" className="fill-muted font-mono">(5.1 cm)</text>
          <text x="270" y="53" fontSize="9" fontWeight="600" className="fill-emerald-600 dark:fill-emerald-400">+2.9%</text>

          {/* Eye Level Perception Indicator */}
          <line x1="60" y1="65" x2="245" y2="65" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
          <text x="50" y="68" textAnchor="end" fontSize="9" className="fill-blue-500 font-semibold">Eye level</text>
          <circle cx="97.5" cy="65" r="2.5" fill="#3b82f6" />
          <text x="248" y="68" fontSize="8.5" className="fill-blue-500">Forehead</text>
        </svg>
      </div>

      <figcaption className="text-xs text-muted mt-3 pt-2 border-t border-border/50 text-center sm:text-left">
        5&apos;9&quot; and 5&apos;11&quot; drawn to scale from a zero baseline. The tops sit 2 inches (5.1 cm) apart, a 2.9% difference. In face-to-face conversation, the 5&apos;9&quot; person&apos;s eye level aligns directly with the 5&apos;11&quot; person&apos;s eyebrow or forehead line.
      </figcaption>
    </figure>
  );
};
