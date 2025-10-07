"use client";

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslations } from 'next-intl';
import StructuredData from './StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const t = useTranslations();
  
  // Home sahifasini qo'shish
  const allItems = [
    { name: t('common.home') || 'Bosh sahifa', url: '/' },
    ...items
  ];

  // Structured data uchun format
  const structuredDataItems = allItems.map(item => ({
    name: item.name,
    url: item.url
  }));

  return (
    <>
      <StructuredData type="breadcrumb" data={structuredDataItems} />
      <nav 
        className={`flex items-center space-x-2 text-sm text-gray-600 mb-4 ${className}`}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index === 0 && (
                <Home className="w-4 h-4 mr-1" aria-hidden="true" />
              )}
              
              {index < allItems.length - 1 ? (
                <>
                  <Link 
                    href={item.url}
                    className="hover:text-pink-600 transition-colors duration-200"
                    aria-label={`${item.name} sahifasiga o'tish`}
                  >
                    {item.name}
                  </Link>
                  <ChevronRight 
                    className="w-4 h-4 mx-2 text-gray-400" 
                    aria-hidden="true" 
                  />
                </>
              ) : (
                <span 
                  className="text-gray-900 font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
