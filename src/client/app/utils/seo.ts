import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  price?: number;
  currency?: string;
  availability?: 'in_stock' | 'out_of_stock' | 'preorder';
}

export function generateSEO({
  title = 'Inbola - Bolalar uchun eng yaxshi tanlov',
  description = '0-12 yosh bolalar uchun sifatli va xavfsiz mahsulotlar. Tez yetkazib berish, xavfsiz to\'lovlar va ajoyib mijozlar xizmati.',
  keywords = ['bolalar mahsulotlari', 'o\'yinchoqlar', 'bolalar kiyimlari', 'kitoblar', 'elektronika'],
  image = '/logo.png',
  url = 'https://inbola.uz',
  type = 'website',
  price,
  currency = 'UZS',
  availability = 'in_stock'
}: SEOProps): Metadata {
  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    
    // Open Graph
    openGraph: {
      title,
      description,
      url,
      siteName: 'Inbola',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'uz_UZ',
      type: type as any,
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@inbola_uz',
    },
    
    // Additional meta tags
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
    
    // Verification
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
  };

  // Product-specific metadata
  if (type === 'product' && price) {
    metadata.other = {
      'product:price:amount': price.toString(),
      'product:price:currency': currency,
      'product:availability': availability,
    };
  }

  return metadata;
}

export function generateStructuredData(data: any) {
  return {
    '@context': 'https://schema.org',
    ...data,
  };
}

export function generateProductStructuredData({
  name,
  description,
  image,
  price,
  currency = 'UZS',
  availability = 'InStock',
  brand = 'Inbola',
  category,
  sku,
  rating,
  reviewCount,
}: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: string;
  brand?: string;
  category?: string;
  sku?: string;
  rating?: number;
  reviewCount?: number;
}) {
  return generateStructuredData({
    '@type': 'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      seller: {
        '@type': 'Organization',
        name: brand,
      },
    },
    ...(category && { category }),
    ...(sku && { sku }),
    ...(rating && reviewCount && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount,
      },
    }),
  });
}

export function generateOrganizationStructuredData() {
  return generateStructuredData({
    '@type': 'Organization',
    name: 'Inbola',
    url: 'https://inbola.uz',
    logo: 'https://inbola.uz/logo.png',
    description: 'Bolalar uchun sifatli va xavfsiz mahsulotlar',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chilonzor tumani',
      addressLocality: 'Toshkent',
      addressCountry: 'UZ',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+998-71-123-45-67',
      contactType: 'customer service',
      availableLanguage: ['uz', 'ru', 'en'],
    },
    sameAs: [
      'https://facebook.com/inbola',
      'https://instagram.com/inbola',
      'https://t.me/inbola',
    ],
  });
}
