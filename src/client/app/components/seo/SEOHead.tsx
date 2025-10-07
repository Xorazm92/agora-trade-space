"use client";

import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  locale?: string;
  price?: number;
  currency?: string;
  availability?: 'in_stock' | 'out_of_stock';
  brand?: string;
  category?: string;
}

export default function SEOHead({
  title = "Inbola - Bolalar uchun eng yaxshi tanlov",
  description = "0-12 yosh bolalar uchun sifatli va xavfsiz mahsulotlar. Tez yetkazib berish, xavfsiz to'lovlar va ajoyib mijozlar xizmati.",
  keywords = "bolalar mahsulotlari, o'yinchoqlar, bolalar kiyimlari, chaqaloq mahsulotlari, bolalar poyabzallari, xavfsiz o'yinchoqlar, Inbola, Uzbekistan",
  image = "/logo.png",
  url,
  type = 'website',
  locale = 'uz_UZ',
  price,
  currency = 'UZS',
  availability = 'in_stock',
  brand = 'Inbola',
  category
}: SEOHeadProps) {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://inbola.uz' : 'http://localhost:3000';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Inbola Team" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={locale.replace('_', '-')} />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Inbola" />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@inbola_uz" />
      
      {/* Product-specific Meta Tags */}
      {type === 'product' && (
        <>
          <meta property="product:price:amount" content={price?.toString()} />
          <meta property="product:price:currency" content={currency} />
          <meta property="product:availability" content={availability} />
          <meta property="product:brand" content={brand} />
          {category && <meta property="product:category" content={category} />}
        </>
      )}
      
      {/* Alternate Language Links */}
      <link rel="alternate" hrefLang="uz" href={`${baseUrl}/uz${url || ''}`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en${url || ''}`} />
      <link rel="alternate" hrefLang="ru" href={`${baseUrl}/ru${url || ''}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${url || ''}`} />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo.png" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}
