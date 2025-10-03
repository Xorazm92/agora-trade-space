"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { categories } from '@/app/data/categories';
import { 
  ChevronDown, 
  ShoppingBag,
  Shirt,
  Users,
  FileText,
  Briefcase
} from 'lucide-react';

const NavigationMenu = () => {
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);


  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const handleDropdownToggle = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {/* Categories Dropdown */}
      <div className="relative">
        <button
          onClick={() => handleDropdownToggle('categories')}
          className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-indigo-600 ${
            openDropdown === 'categories' ? 'text-indigo-600' : 'text-gray-700'
          }`}
        >
          {tCommon('categories') || 'Kategoriyalar'}
          <ChevronDown className={`w-4 h-4 transition-transform ${
            openDropdown === 'categories' ? 'rotate-180' : ''
          }`} />
        </button>

        {openDropdown === 'categories' && (
          <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
            {categories.map((category) => (
              <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenDropdown(null)}
                >
                  <div className="text-indigo-600 mt-0.5">
                    <span className="text-lg">{category.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">
                      {category.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {category.description}
                    </div>
                    {/* Subcategories */}
                    <div className="mt-2 grid grid-cols-2 gap-1">
                      {category.subcategories.slice(0, 4).map((sub) => (
                        <button
                          key={sub.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `/shop?category=${category.slug}&subcategory=${sub.slug}`;
                            setOpenDropdown(null);
                          }}
                          className="text-xs text-gray-400 hover:text-indigo-600 transition-colors block truncate text-left"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            
            {/* View All Categories */}
            <Link
              href="/categories"
              className="block px-4 py-3 text-center text-indigo-600 hover:bg-gray-50 transition-colors font-medium text-sm"
              onClick={() => setOpenDropdown(null)}
            >
              Barcha kategoriyalarni ko'rish
            </Link>
          </div>
        )}
      </div>

      {/* Close dropdowns when clicking outside */}
      {openDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </nav>
  );
};

export default NavigationMenu;
