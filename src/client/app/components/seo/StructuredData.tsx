"use client";

interface StructuredDataProps {
  type: 'website' | 'organization' | 'product' | 'breadcrumb' | 'article' | 'ecommerce' | 'localBusiness';
  data?: any;
}

const StructuredData = ({ type, data = {} }: StructuredDataProps) => {
  const generateSchema = () => {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://inbola.uz' : 'http://localhost:3000';
    
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Inbola - Bolalar uchun eng yaxshi tanlov",
          "alternateName": "Inbola",
          "url": baseUrl,
          "description": "O'zbekistondagi eng yirik bolalar do'koni. 0-12 yosh bolalar uchun 10,000+ sifatli mahsulot. Tez yetkazib berish, xavfsiz to'lov, kafolat.",
          "inLanguage": ["uz-UZ", "en-US", "ru-RU"],
          "potentialAction": [
            {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${baseUrl}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          ],
          "publisher": {
            "@type": "Organization",
            "name": "Inbola LLC",
            "url": baseUrl
          },
          "copyrightYear": new Date().getFullYear(),
          "copyrightHolder": {
            "@type": "Organization",
            "name": "Inbola LLC"
          }
        };
        
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Inbola",
          "legalName": "Inbola LLC",
          "url": baseUrl,
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`,
            "width": 400,
            "height": 400
          },
          "image": `${baseUrl}/og-image.jpg`,
          "description": "O'zbekistondagi eng yirik bolalar do'koni. Sifatli va xavfsiz bolalar mahsulotlari.",
          "foundingDate": "2024",
          "founders": [
            {
              "@type": "Person",
              "name": "Inbola Team"
            }
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Amir Temur ko'chasi",
            "addressLocality": "Toshkent",
            "addressRegion": "Toshkent viloyati",
            "postalCode": "100000",
            "addressCountry": "UZ"
          },
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+998-90-123-45-67",
              "contactType": "customer service",
              "availableLanguage": ["uz", "en", "ru"],
              "areaServed": "UZ",
              "hoursAvailable": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "21:00"
              }
            },
            {
              "@type": "ContactPoint",
              "email": "info@inbola.uz",
              "contactType": "customer service"
            }
          ],
          "sameAs": [
            "https://t.me/inbola_uz",
            "https://instagram.com/inbola_uz",
            "https://facebook.com/inbola.uz"
          ],
          "knowsAbout": [
            "Bolalar mahsulotlari",
            "O'yinchoqlar",
            "Bolalar kiyimlari",
            "Chaqaloq mahsulotlari",
            "Ta'limiy o'yinchoqlar"
          ]
        };

      case 'ecommerce':
        return {
          "@context": "https://schema.org",
          "@type": "Store",
          "name": "Inbola - Bolalar do'koni",
          "description": "O'zbekistondagi eng yirik onlayn bolalar do'koni",
          "url": baseUrl,
          "image": `${baseUrl}/og-image.jpg`,
          "telephone": "+998-90-123-45-67",
          "email": "info@inbola.uz",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "UZ",
            "addressLocality": "Toshkent"
          },
          "paymentAccepted": ["Cash", "Credit Card", "UzCard", "Humo", "Click", "Payme"],
          "currenciesAccepted": "UZS",
          "openingHours": "Mo-Su 09:00-21:00",
          "priceRange": "1000-10000000 UZS",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Bolalar mahsulotlari katalogi",
            "itemListElement": [
              {
                "@type": "OfferCatalog",
                "name": "O'yinchoqlar",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Ta'limiy o'yinchoqlar",
                      "category": "O'yinchoqlar"
                    }
                  }
                ]
              },
              {
                "@type": "OfferCatalog", 
                "name": "Bolalar kiyimlari",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Bolalar kiyimlari",
                      "category": "Kiyim"
                    }
                  }
                ]
              }
            ]
          }
        };
        
      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name || "Bolalar mahsuloti",
          "description": data.description || "Sifatli bolalar mahsuloti",
          "image": data.image || `${baseUrl}/logo.png`,
          "brand": {
            "@type": "Brand",
            "name": data.brand || "Inbola"
          },
          "category": data.category || "Bolalar mahsulotlari",
          "sku": data.sku || "",
          "gtin": data.gtin || "",
          "offers": {
            "@type": "Offer",
            "price": data.price || "0",
            "priceCurrency": "UZS",
            "availability": data.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": {
              "@type": "Organization",
              "name": "Inbola"
            },
            "url": data.url || baseUrl,
            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          },
          "aggregateRating": data.rating ? {
            "@type": "AggregateRating",
            "ratingValue": data.rating.value,
            "reviewCount": data.rating.count,
            "bestRating": 5,
            "worstRating": 1
          } : undefined,
          "review": data.reviews?.map((review: any) => ({
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": review.rating,
              "bestRating": 5
            },
            "author": {
              "@type": "Person",
              "name": review.author
            },
            "reviewBody": review.text
          })) || []
        };
        
      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.items?.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `${baseUrl}${item.url}`
          })) || []
        };

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "image": data.image,
          "author": {
            "@type": "Person",
            "name": data.author || "Inbola Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Inbola",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`
            }
          },
          "datePublished": data.publishedDate,
          "dateModified": data.modifiedDate || data.publishedDate,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url
          }
        };

      case 'localBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Inbola",
          "image": `${baseUrl}/og-image.jpg`,
          "telephone": "+998-90-123-45-67",
          "email": "info@inbola.uz",
          "url": baseUrl,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Amir Temur ko'chasi",
            "addressLocality": "Toshkent",
            "addressRegion": "Toshkent viloyati",
            "postalCode": "100000",
            "addressCountry": "UZ"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 41.2995,
            "longitude": 69.2401
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "09:00",
              "closes": "21:00"
            }
          ],
          "servesCuisine": [],
          "priceRange": "$$",
          "acceptsReservations": false
        };
        
      default:
        return {};
    }
  };

  const schema = generateSchema();

  if (!schema || Object.keys(schema).length === 0) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default StructuredData;
