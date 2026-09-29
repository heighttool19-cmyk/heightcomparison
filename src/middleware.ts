import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(de|en|es|fr|pt|nl|ar|it|sv|pl)/:path*',
    '/((?!api|_next|_vercel|studio|.*\\..*).*)'
  ]
};
