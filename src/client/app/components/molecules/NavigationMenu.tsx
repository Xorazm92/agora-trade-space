"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
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
          <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <Link
              href="/shop?category=toys"
              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => setOpenDropdown(null)}
            >
              <div className="text-indigo-600 mt-0.5">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  O'yinchoqlar
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Bolalar uchun o'yinchoqlar
                </div>
              </div>
            </Link>
            
            <Link
              href="/shop?category=clothes"
              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => setOpenDropdown(null)}
            >
              <div className="text-indigo-600 mt-0.5">
                <Shirt className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  Kiyimlar
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Bolalar kiyimlari
                </div>
              </div>
            </Link>

            <Link
              href="/shop?category=shoes"
              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => setOpenDropdown(null)}
            >
              <div className="text-indigo-600 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  Poyabzallar
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Bolalar poyabzallari
                </div>
              </div>
            </Link>

            <Link
              href="/shop?category=books"
              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => setOpenDropdown(null)}
            >
              <div className="text-indigo-600 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  Kitoblar
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Bolalar kitoblari
                </div>
              </div>
            </Link>

            <Link
              href="/shop?category=electronics"
              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => setOpenDropdown(null)}
            >
              <div className="text-indigo-600 mt-0.5">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  Elektronika
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Bolalar elektronikasi
                </div>
              </div>
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
