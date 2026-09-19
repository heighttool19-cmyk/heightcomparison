import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { ALL_LOCALE_CODES, DEFAULT_LOCALE } from './config';

export const routing = defineRouting({
  locales: ALL_LOCALE_CODES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed',
  localeDetection: false
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
