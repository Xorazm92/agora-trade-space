"use client";
import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Users,
  Shield,
  Truck,
  Send,
} from "lucide-react";
import Link from "next/link";
import PlaceholderImage from '../atoms/PlaceholderImage';
import { useTranslations } from 'next-intl';
import { categories } from '@/app/data/categories';
import Image from 'next/image';

const Footer = () => {
  let t, tBrand, tCategories;
  try {
    t = useTranslations('footer');
    tBrand = useTranslations('brand');
    tCategories = useTranslations('categories');
  } catch (error) {
    // Fallback if NextIntlClientProvider context is not available
    t = (key: string) => {
      const translations: { [key: string]: string } = {
        'about_us': 'Biz haqimizda',
        'contact': 'Aloqa',
        'privacy_policy': 'Maxfiylik siyosati',
        'terms_of_service': 'Foydalanish shartlari',
        'help': 'Yordam',
        'faq': 'Tez-tez so\'raladigan savollar',
        'customer_service': 'Mijozlar xizmati',
        'follow_us': 'Bizni kuzatib boring',
        'newsletter_title': 'Yangiliklar',
        'newsletter_description': 'Eng so\'nggi yangiliklar va maxsus takliflardan xabardor bo\'ling',
        'newsletter_placeholder': 'Elektron pochta manzilingiz',
        'newsletter_privacy': 'Obuna bo\'lish orqali siz bizning Maxfiylik siyosatimizga rozilik bildirasiz.',
        'copyright': '© 2024 Inbola. Barcha huquqlar himoyalangan',
        'categories': 'Kategoriyalar'
      };
      return translations[key] || key;
    };
    tBrand = (key: string) => key === 'name' ? 'Inbola' : key;
    tCategories = (key: string) => key;
  }
  const currentYear = new Date().getFullYear();

  // Use categories from data file
  const footerCategories = categories;

  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-950 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
      <div className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-16 pb-16 border-b border-gray-800/80">
          {/* Logo and description */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center">
              <div className="w-12 h-12 relative mr-4">
                <Image
                  src="/logo.png"
                  alt="Inbola Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Inbola
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  Bolalar uchun eng yaxshi tanlov
                </span>
              </div>
            </div>

            <p className="text-gray-400 mt-6 text-sm leading-relaxed">
              {tBrand('description')}. Tez yetkazib berish, xavfsiz to'lovlar va ajoyib mijozlar xizmati.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4 mt-8">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">
              {t('categories')}
            </h3>
            <div className="space-y-3">
              {footerCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/shop?category=${category.slug}`}
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">
              Kompaniya
            </h3>
            <div className="space-y-3">
              <Link
                href="/about"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                {t('about_us')}
              </Link>
              <Link
                href="/contact"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                {t('contact')}
              </Link>
              <Link
                href="/careers"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Karyera
              </Link>
              <Link
                href="/blog"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">
              {t('help')}
            </h3>
            <div className="space-y-3">
              <Link
                href="/help"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                {t('customer_service')}
              </Link>
              <Link
                href="/shipping"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Yetkazib berish
              </Link>
              <Link
                href="/returns"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Qaytarish
              </Link>
              <Link
                href="/track-order"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Buyurtmani kuzatish
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">
              {t('newsletter_title')}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {t('newsletter_description')}
            </p>
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  placeholder={t('newsletter_placeholder')}
                  className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 text-sm"
                />
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-r-lg transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                {t('newsletter_privacy')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <p className="text-gray-400 text-sm">
              © {currentYear} {tBrand('name')}. Barcha huquqlar himoyalangan.
            </p>
            <div className="flex space-x-4 text-xs">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t('privacy_policy')}
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t('terms_of_service')}
              </Link>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="w-4 h-4" />
              <span className="text-xs">Xavfsiz to'lov</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Truck className="w-4 h-4" />
              <span className="text-xs">Tez yetkazib berish</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
