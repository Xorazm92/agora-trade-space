import { Poppins } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";
import StructuredData from "./components/seo/StructuredData";
import GoogleAnalytics from "./components/seo/GoogleAnalytics";
import YandexMetrica from "./components/seo/YandexMetrica";
import SearchEngineVerification from "./components/seo/SearchEngineVerification";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: 'swap',
  preload: true,
});

export const metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://inbola.uz' : 'http://localhost:3000'),
  title: {
    default: "Inbola - Bolalar uchun eng yaxshi tanlov | O'zbekiston #1 bolalar do'koni",
    template: "%s | Inbola - Bolalar uchun eng yaxshi tanlov"
  },
  description: "🎯 O'zbekistondagi eng yirik bolalar do'koni! 0-12 yosh bolalar uchun 10,000+ sifatli mahsulot. ✅ Tez yetkazib berish ✅ Xavfsiz to'lov ✅ Kafolat. O'yinchoqlar, kiyimlar, kitoblar, chaqaloq mahsulotlari. Buyurtma bering!",
  keywords: [
    // O'zbek tilida asosiy kalit so'zlar
    "bolalar mahsulotlari", "bolalar do'koni", "o'yinchoqlar", "bolalar kiyimlari", 
    "chaqaloq mahsulotlari", "bolalar poyabzallari", "bolalar kitoblari", "xavfsiz o'yinchoqlar",
    "Inbola", "Uzbekistan", "Toshkent", "bolalar uchun", "onlayn xarid",
    
    // Ingliz tilida SEO uchun
    "children products Uzbekistan", "kids toys Tashkent", "baby products online", 
    "children clothing Uzbekistan", "safe toys", "educational toys",
    
    // Rus tilida
    "детские товары", "игрушки", "детская одежда", "товары для малышей",
    
    // Long-tail keywords
    "0-2 yosh bolalar uchun o'yinchoqlar", "3-5 yosh bolalar kiyimlari",
    "6-8 yosh bolalar kitoblari", "9-12 yosh bolalar poyabzallari",
    "chaqaloq parvarishi mahsulotlari", "ta'limiy o'yinchoqlar",
    "bolalar xavfsizligi", "sifatli bolalar mahsulotlari"
  ].join(", "),
  authors: [
    { name: "Inbola Team", url: "https://inbola.uz" },
  ],
  creator: "Inbola - O'zbekiston bolalar do'koni",
  publisher: "Inbola LLC",
  category: "E-commerce, Bolalar mahsulotlari, O'yinchoqlar",
  classification: "Bolalar do'koni",
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    bingBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    yandexBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    alternateLocale: ['en_US', 'ru_RU'],
    url: 'https://inbola.uz',
    siteName: 'Inbola - O\'zbekiston #1 bolalar do\'koni',
    title: 'Inbola - Bolalar uchun eng yaxshi tanlov | 10,000+ mahsulot',
    description: '🎯 O\'zbekistondagi eng yirik bolalar do\'koni! 0-12 yosh bolalar uchun 10,000+ sifatli mahsulot. Tez yetkazib berish, xavfsiz to\'lov, kafolat.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Inbola - Bolalar uchun eng yaxshi tanlov',
        type: 'image/jpeg',
      },
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Inbola Logo',
        type: 'image/png',
      },
    ],
    countryName: 'Uzbekistan',
    emails: ['info@inbola.uz', 'support@inbola.uz'],
    phoneNumbers: ['+998901234567', '+998712345678'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@inbola_uz',
    creator: '@inbola_uz',
    title: 'Inbola - Bolalar uchun eng yaxshi tanlov | O\'zbekiston #1 bolalar do\'koni',
    description: '🎯 10,000+ sifatli bolalar mahsuloti. Tez yetkazib berish, xavfsiz to\'lov, kafolat. O\'yinchoqlar, kiyimlar, kitoblar.',
    images: {
      url: '/twitter-image.jpg',
      alt: 'Inbola - Bolalar uchun eng yaxshi tanlov',
      width: 1200,
      height: 630,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#ec4899' },
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: 'https://inbola.uz',
    languages: {
      'uz-UZ': 'https://inbola.uz/uz',
      'en-US': 'https://inbola.uz/en', 
      'ru-RU': 'https://inbola.uz/ru',
      'x-default': 'https://inbola.uz/uz',
    },
    types: {
      'application/rss+xml': [
        { url: 'https://inbola.uz/feed.xml', title: 'Inbola RSS Feed' },
        { url: 'https://inbola.uz/blog/feed.xml', title: 'Inbola Blog RSS' },
      ],
    },
  },
  other: {
    'google-site-verification': 'xEtFwOWDRWm55IWGXiAiSHiV_gCF6UobhhaMN6kgreQ',
    'yandex-verification': '7e5b0069c80cf781',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Inbola',
    'application-name': 'Inbola',
    'mobile-web-app-capable': 'yes',
    'theme-color': '#ec4899',
    'msapplication-TileColor': '#ec4899',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <SearchEngineVerification 
          googleVerification="xEtFwOWDRWm55IWGXiAiSHiV_gCF6UobhhaMN6kgreQ"
          yandexVerification="7e5b0069c80cf781"
          bingVerification={process.env.NEXT_PUBLIC_BING_VERIFICATION}
        />
        <StructuredData type="website" />
        <StructuredData type="organization" />
        <StructuredData type="ecommerce" />
        <StructuredData type="localBusiness" />
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        <YandexMetrica counterId={process.env.NEXT_PUBLIC_YANDEX_METRICA_ID || ''} />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
