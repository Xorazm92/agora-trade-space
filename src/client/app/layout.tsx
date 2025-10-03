import { Poppins } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Inbola - Bolalar uchun eng yaxshi tanlov",
  description: "0-12 yosh bolalar uchun sifatli va xavfsiz mahsulotlar. Tez yetkazib berish, xavfsiz to'lovlar va ajoyib mijozlar xizmati.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
