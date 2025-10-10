import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['uz', 'ru', 'en'],

  // Used when no locale matches
  defaultLocale: 'uz'
});

export const config = {
  // Match only internationalized pathnames, exclude static assets and SEO files
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico|logo.png|robots.txt|sitemap.xml|feed.xml|manifest.webmanifest|browserconfig.xml|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico).*)']
};
