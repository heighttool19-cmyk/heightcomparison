import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Height Comparison Calculator',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 max-w-2xl mx-auto">
      <span className="text-7xl font-black text-accent mb-3 tracking-tighter">404</span>
      <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4 tracking-tight">
        Page not found
      </h1>
      <p className="text-muted text-base md:text-lg mb-8 leading-relaxed max-w-lg">
        We couldn&apos;t find that page. Go to the homepage or choose a calculator below.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-accent text-white font-bold hover:opacity-95 hover:translate-y-[-1px] active:scale-95 transition-all shadow-lg shadow-accent/20"
        >
          Go to homepage
        </Link>
      </div>

      <div className="w-full border-t border-border pt-8 mt-2">
        <p className="text-xs uppercase font-black tracking-widest text-muted mb-5">
          Popular Tools & Calculators
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <Link
            href="/height-predictor"
            className="p-4 rounded-2xl bg-surface border border-border hover:border-accent hover:shadow-md text-sm font-bold text-foreground transition-all flex items-center justify-between group"
          >
            <span>Height Predictor</span>
            <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </Link>
          <Link
            href="/height-difference-calculator"
            className="p-4 rounded-2xl bg-surface border border-border hover:border-accent hover:shadow-md text-sm font-bold text-foreground transition-all flex items-center justify-between group"
          >
            <span>Height Difference Calculator</span>
            <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </Link>
          <Link
            href="/height-weight-percentile-calculator"
            className="p-4 rounded-2xl bg-surface border border-border hover:border-accent hover:shadow-md text-sm font-bold text-foreground transition-all flex items-center justify-between group"
          >
            <span>Height & Weight Percentile</span>
            <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </Link>
          <Link
            href="/ideal-body-weight-calculator"
            className="p-4 rounded-2xl bg-surface border border-border hover:border-accent hover:shadow-md text-sm font-bold text-foreground transition-all flex items-center justify-between group"
          >
            <span>Ideal Body Weight Calculator</span>
            <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </Link>
          <Link
            href="/average-height-by-country"
            className="p-4 rounded-2xl bg-surface border border-border hover:border-accent hover:shadow-md text-sm font-bold text-foreground transition-all flex items-center justify-between group"
          >
            <span>Average Height by Country</span>
            <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </Link>
          <Link
            href="/image-to-height"
            className="p-4 rounded-2xl bg-surface border border-border hover:border-accent hover:shadow-md text-sm font-bold text-foreground transition-all flex items-center justify-between group"
          >
            <span>Image to Height Calculator</span>
            <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

