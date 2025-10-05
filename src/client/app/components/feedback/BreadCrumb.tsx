"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from 'next-intl';

const BreadCrumb: React.FC = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const getSegmentLabel = (segment: string) => {
    // Skip locale segment (uz, en, ru)
    if (['uz', 'en', 'ru'].includes(segment)) {
      return null;
    }
    
    try {
      const segmentTranslations: { [key: string]: string } = {
        'cart': t('cart.shopping_cart'),
        'shop': t('common.shop'),
        'products': t('common.products'),
        'dashboard': t('dashboard.dashboard'),
        'profile': t('common.profile'),
        'orders': t('common.orders'),
      };
      
      return segmentTranslations[segment] || decodeURIComponent(segment);
    } catch (error) {
      // Fallback if translation fails
      return decodeURIComponent(segment);
    }
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center text-sm text-gray-500 space-x-1 sm:space-x-2">
        <li>
          <Link
            href="/"
            className="hover:text-indigo-600 font-medium transition"
          >
            {t('common.home')}
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const label = getSegmentLabel(segment);
          
          // Skip locale segments
          if (!label) return null;
          
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;

          return (
            <React.Fragment key={href}>
              <span className="text-gray-400">/</span>
              <li>
                {isLast ? (
                  <span className="capitalize font-semibold">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="capitalize hover:text-indigo-600 font-medium transition"
                  >
                    {label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
