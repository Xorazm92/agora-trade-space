import { Poppins } from "next/font/google";
import "../globals.css";
import ClientProviders from "../ClientProviders";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Inbola - Bolalar uchun eng yaxshi tanlov",
  description: "0-12 yosh bolalar uchun sifatli va xavfsiz mahsulotlar. O'yinchoqlar, kiyimlar, kitoblar va boshqalar - inbola.uz da!",
};

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
      <ClientProviders>{children}</ClientProviders>
    </NextIntlClientProvider>
  );
}
