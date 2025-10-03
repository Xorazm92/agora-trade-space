import { Poppins } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";
import StructuredData from "./components/seo/StructuredData";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: "Inbola - Bolalar uchun eng yaxshi tanlov",
  description: "0-12 yosh bolalar uchun sifatli va xavfsiz mahsulotlar. Tez yetkazib berish, xavfsiz to'lovlar va ajoyib mijozlar xizmati. O'yinchoqlar, kiyimlar, poyabzallar va chaqaloq mahsulotlari.",
  keywords: "bolalar mahsulotlari, o'yinchoqlar, bolalar kiyimlari, chaqaloq mahsulotlari, bolalar poyabzallari, xavfsiz o'yinchoqlar, Inbola, Uzbekistan",
  authors: [{ name: "Inbola Team" }],
  creator: "Inbola",
  publisher: "Inbola",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://inbola.uz',
    siteName: 'Inbola',
    title: 'Inbola - Bolalar uchun eng yaxshi tanlov',
    description: '0-12 yosh bolalar uchun sifatli va xavfsiz mahsulotlar. Tez yetkazib berish, xavfsiz to\'lovlar va ajoyib mijozlar xizmati.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Inbola - Bolalar uchun eng yaxshi tanlov',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inbola - Bolalar uchun eng yaxshi tanlov',
    description: '0-12 yosh bolalar uchun sifatli va xavfsiz mahsulotlar.',
    images: ['/logo.png'],
    creator: '@inbola_uz',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://inbola.uz',
    languages: {
      'uz-UZ': 'https://inbola.uz/uz',
      'en-US': 'https://inbola.uz/en',
      'ru-RU': 'https://inbola.uz/ru',
    },
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
        <StructuredData type="website" data={{}} />
        <StructuredData type="organization" data={{}} />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
