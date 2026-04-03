'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-400 py-12 px-6 border-t border-slate-800/50 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm font-bold uppercase tracking-widest transition-colors">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700 hidden sm:block"></span>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700 hidden sm:block"></span>
          <Link href="/#frequently-asked-questions" className="hover:text-white transition-colors">FAQ</Link>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700 hidden sm:block"></span>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700 hidden sm:block"></span>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        </nav>

        {/* Branding & Legal */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-[13px] font-medium tracking-tight text-slate-500">
            © {new Date().getFullYear()} HeightComparison.com | All rights reserved.
          </p>
          <div className="h-[1px] w-12 bg-slate-800 rounded-full mt-2"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
