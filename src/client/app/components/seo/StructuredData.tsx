"use client";

interface StructuredDataProps {
  type: 'website' | 'product' | 'organization' | 'breadcrumb';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Inbola",
          "alternateName": "Inbola - Bolalar uchun eng yaxshi tanlov",
          "url": "https://inbola.uz",
          "description": "0-12 yosh bolalar uchun sifatli va xavfsiz mahsulotlar",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://inbola.uz/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Inbola",
            "logo": {
              "@type": "ImageObject",
              "url": "https://inbola.uz/logo.png"
            }
          }
        };
      
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Inbola",
          "alternateName": "Inbola - Bolalar uchun eng yaxshi tanlov",
          "url": "https://inbola.uz",
          "logo": "https://inbola.uz/logo.png",
          "description": "0-12 yosh bolalar uchun sifatli va xavfsiz mahsulotlar",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+998-90-123-45-67",
            "contactType": "customer service",
            "availableLanguage": ["Uzbek", "English", "Russian"]
          },
          "sameAs": [
            "https://t.me/inbola_uz",
            "https://instagram.com/inbola_uz"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "UZ",
            "addressLocality": "Tashkent"
          }
        };
      
      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "description": data.description,
          "image": data.images,
          "brand": {
            "@type": "Brand",
            "name": "Inbola"
          },
          "offers": {
            "@type": "Offer",
            "price": data.price,
            "priceCurrency": "UZS",
            "availability": data.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": {
              "@type": "Organization",
              "name": "Inbola"
            }
          },
          "aggregateRating": data.rating ? {
            "@type": "AggregateRating",
            "ratingValue": data.rating,
            "reviewCount": data.reviewCount || 0
          } : undefined
        };
      
      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };
      
      default:
        return null;
    }
  };

  const schema = generateSchema();
  
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
