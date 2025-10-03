import { Poppins } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  
  const titles = {
    uz: "Inbola - Bolalar uchun eng yaxshi tanlov",
    en: "Inbola - Best Choice for Children",
    ru: "Inbola - Лучший выбор для детей"
  };
  
  const descriptions = {
    uz: "0-12 yosh bolalar uchun sifatli va xavfsiz mahsulotlar. O'yinchoqlar, kiyimlar, poyabzallar va chaqaloq mahsulotlari - inbola.uz da!",
    en: "Quality and safe products for children aged 0-12. Toys, clothes, shoes and baby products - at inbola.uz!",
    ru: "Качественные и безопасные товары для детей 0-12 лет. Игрушки, одежда, обувь и товары для малышей - на inbola.uz!"
  };
  
  return {
    title: titles[locale as keyof typeof titles] || titles.uz,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.uz,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.uz,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.uz,
      locale: locale === 'uz' ? 'uz_UZ' : locale === 'en' ? 'en_US' : 'ru_RU',
    },
    alternates: {
      canonical: `https://inbola.uz/${locale}`,
      languages: {
        'uz-UZ': 'https://inbola.uz/uz',
        'en-US': 'https://inbola.uz/en',
        'ru-RU': 'https://inbola.uz/ru',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Await params before destructuring
  const { locale } = await params;
  
  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
