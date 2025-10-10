"use client";

interface SearchEngineVerificationProps {
  googleVerification?: string;
  yandexVerification?: string;
  bingVerification?: string;
}

const SearchEngineVerification = ({ 
  googleVerification, 
  yandexVerification, 
  bingVerification 
}: SearchEngineVerificationProps) => {
  return (
    <>
      {/* Google Search Console Verification */}
      {googleVerification && (
        <meta name="google-site-verification" content={googleVerification} />
      )}
      
      {/* Yandex Webmaster Verification */}
      {yandexVerification && (
        <meta name="yandex-verification" content={yandexVerification} />
      )}
      
      {/* Bing Webmaster Verification */}
      {bingVerification && (
        <meta name="msvalidate.01" content={bingVerification} />
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      <meta name="bingbot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      <meta name="yandexbot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      
      {/* Geo Tags for Uzbekistan */}
      <meta name="geo.region" content="UZ" />
      <meta name="geo.country" content="Uzbekistan" />
      <meta name="geo.placename" content="Tashkent" />
      <meta name="ICBM" content="41.2995,69.2401" />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content="uz-UZ" />
      <meta name="language" content="Uzbek" />
      
      {/* Business Information */}
      <meta name="classification" content="E-commerce, Children Products, Toys" />
      <meta name="category" content="Shopping, Children, Baby Products" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      
      {/* Mobile Optimization */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Inbola" />
      
      {/* Security */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
    </>
  );
};

export default SearchEngineVerification;
