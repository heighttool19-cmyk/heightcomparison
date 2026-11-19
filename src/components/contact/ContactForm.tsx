'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

const TOPIC_HELP: Record<string, string> = {
  'wrong-height':
    'Please tell us whose height is wrong, what the correct height is, and the official source (guidebook, bio, agency, or official databook).',
  bug: 'Please describe what happened, what device or browser you are using, and the steps to reproduce the issue.',
  privacy:
    'For data removal or CCPA requests, please include the exact shared chart URL or uploaded image reference.',
  partnership:
    'Include details about your organization, project, or press deadline.',
  other: 'How can we assist you with the height comparison tool?',
};

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [topic, setTopic] = useState('wrong-height');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Bot trapped
      setStatus('success');
      return;
    }

    if (!name.trim() || name.length < 2) {
      setStatus('error');
      setErrorMessage('Please enter a valid name (at least 2 characters).');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!message.trim() || message.length < 20) {
      setStatus('error');
      setErrorMessage('Please enter a message of at least 20 characters.');
      return;
    }

    try {
      setStatus('loading');
      setErrorMessage('');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          name,
          email,
          link,
          message,
          website: honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setLink('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMessage(data.error || t('errorTitle'));
      }
    } catch {
      setStatus('error');
      setErrorMessage(t('errorTitle'));
    }
  };

  return (
    <div className="bg-surface border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Hidden Honeypot Field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Leave blank</label>
          <input
            type="text"
            id="website"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Topic Selector */}
        <div>
          <label htmlFor="topic" className="block text-xs font-black uppercase tracking-wider text-foreground mb-2">
            Topic <span className="text-red-500">*</span>
          </label>
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent"
          >
            <option value="wrong-height">Report a wrong height</option>
            <option value="bug">Report a bug or layout issue</option>
            <option value="privacy">Privacy or CCPA data request</option>
            <option value="partnership">Partnership, media or press</option>
            <option value="other">Other general question</option>
          </select>
        </div>

        {/* Dynamic Topic Help Message */}
        <div className="p-3.5 bg-accent/5 border-l-4 border-l-accent rounded-r-xl text-xs text-muted leading-relaxed font-medium">
          {TOPIC_HELP[topic]}
        </div>

        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-black uppercase tracking-wider text-foreground mb-2">
              {t('name')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-black uppercase tracking-wider text-foreground mb-2">
              {t('email')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              maxLength={120}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Optional Relevant URL / Chart Link */}
        <div>
          <label htmlFor="link" className="block text-xs font-black uppercase tracking-wider text-foreground mb-2">
            Relevant URL or Chart Link <span className="text-muted font-normal">(optional)</span>
          </label>
          <input
            type="url"
            id="link"
            maxLength={500}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://heightcomparisoncalculator.com/?id=..."
            className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent"
          />
        </div>

        {/* Message */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="message" className="text-xs font-black uppercase tracking-wider text-foreground">
              {t('message')} <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] font-mono text-muted">
              {message.length} / 2000 {message.length < 20 && '(min 20)'}
            </span>
          </div>
          <textarea
            id="message"
            required
            rows={5}
            maxLength={2000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('messagePlaceholder')}
            className="w-full bg-bg border border-border rounded-xl p-4 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent resize-y"
          />
        </div>

        {/* Status Alerts */}
        {status === 'success' && (
          <div
            role="status"
            className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-2xl flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-sm font-medium"
          >
            <CheckCircle2 size={20} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div>
              <b className="block">{t('successTitle')}</b>
              <span>{t('successDesc')}</span>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div
            role="alert"
            className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-800 dark:text-red-300 text-sm font-medium"
          >
            <AlertCircle size={20} className="shrink-0 text-red-600 dark:text-red-400" />
            <span>{errorMessage || t('errorTitle')}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 px-6 rounded-2xl bg-accent text-zinc-950 font-black uppercase tracking-widest text-sm hover:scale-[1.01] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>{t('sending')}</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>{t('submit')}</span>
            </>
          )}
        </button>

        <p className="text-xs text-muted text-center pt-2">
          Prefer email? Reach us directly at{' '}
          <a
            href="mailto:contact@heightcomparisoncalculator.com"
            className="text-accent underline font-semibold"
          >
            contact@heightcomparisoncalculator.com
          </a>
        </p>
      </form>
    </div>
  );
}
