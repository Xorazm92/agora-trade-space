import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['uz', 'ru', 'en'],
 
  // Used when no locale matches
  defaultLocale: 'uz',

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be provided for all locales
    '/': '/',
    '/products': '/products',
    '/cart': '/cart',
    '/checkout': '/checkout',
    '/profile': '/profile',
    '/orders': '/orders',
    '/auth/signin': '/auth/signin',
    '/auth/signup': '/auth/signup',
    
    // If locales use different paths, you can
    // specify each external path per locale
    '/about': {
      uz: '/haqimizda',
      ru: '/o-nas',
      en: '/about'
    },
    '/contact': {
      uz: '/aloqa',
      ru: '/kontakt',
      en: '/contact'
    }
  }
});
