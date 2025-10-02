import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Send,
  Users,
  Shield,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/app/gql/Product";
import { useTranslations } from 'next-intl';

const FooterLogo = () => (
  <svg viewBox="0 0 120 40" className="h-10">
    <text
      x="0"
      y="28"
      fontFamily="Arial"
      fontSize="24"
      fontWeight="bold"
      fill="currentColor"
    >
      Inbola
    </text>
  </svg>
);

const Footer = () => {
  const t = useTranslations('footer');
  const tBrand = useTranslations('brand');
  const tCategories = useTranslations('categories');
  const currentYear = new Date().getFullYear();

  // Fetch real categories data
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const categories = categoriesData?.categories || [];

  // Get top 6 categories for footer
  const footerCategories = categories.slice(0, 6);

  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-950 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
      <div className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl"></div>

      <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-16 pb-16 border-b border-gray-800/80">
          {/* Logo and description */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center">
              <div className="text-white mr-4">
                <FooterLogo />
              </div>
              <div className="h-6 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-600"></div>
              <span className="ml-2 text-sm font-medium tracking-wider text-gray-400 uppercase">
                {tBrand('tagline')}
              </span>
            </div>

            <p className="text-gray-400 mt-6 text-sm leading-relaxed">
              {tBrand('description')}. Tez yetkazib berish, xavfsiz to'lovlar va ajoyib mijozlar xizmati.
            </p>

            <div className="mt-8 flex flex-col space-y-4">
              <div className="flex items-start">
                <MapPin
                  size={18}
                  className="text-indigo-400 mr-3 mt-0.5 flex-shrink-0"
                />
                <p className="text-sm text-gray-400">
                  Toshkent shahar, Chilonzor tumani, Bunyodkor ko'chasi 123
                </p>
              </div>
              <div className="flex items-center">
                <Phone
                  size={18}
                  className="text-indigo-400 mr-3 flex-shrink-0"
                />
                <p className="text-sm text-gray-400">+998 (90) 123-45-67</p>
              </div>
              <div className="flex items-center">
                <Mail
                  size={18}
                  className="text-indigo-400 mr-3 flex-shrink-0"
                />
                <p className="text-sm text-gray-400">info@inbola.uz</p>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <Truck className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Tez yetkazish</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Xavfsiz to'lov</p>
              </div>
              <div className="text-center">
                <Users className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">24/7 yordam</p>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="col-span-1 lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-lg text-white mb-6 relative inline-block">
                  {t('categories')}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-8 bg-indigo-500"></span>
                </h3>
                <ul className="space-y-3">
                  {footerCategories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/shop?categoryId=${category.id}`}
                        className="text-gray-400 hover:text-white text-sm flex items-center group transition-all duration-200"
                      >
                        <span className="h-1 w-0 bg-indigo-500 rounded-full mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  {categories.length > 6 && (
                    <li>
                      <Link
                        href="/shop"
                        className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center group transition-all duration-200"
                      >
                        <span className="h-1 w-0 bg-indigo-500 rounded-full mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                        Barcha kategoriyalar
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold text-lg text-white mb-6 relative inline-block">
                  Kompaniya
                  <span className="absolute -bottom-2 left-0 h-0.5 w-8 bg-indigo-500"></span>
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-400 hover:text-white text-sm flex items-center group transition-all duration-200"
                    >
                      <span className="h-1 w-0 bg-indigo-500 rounded-full mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                      {t('about_us')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-400 hover:text-white text-sm flex items-center group transition-all duration-200"
                    >
                      <span className="h-1 w-0 bg-indigo-500 rounded-full mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                      {t('contact')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-gray-400 hover:text-white text-sm flex items-center group transition-all duration-200"
                    >
                      <span className="h-1 w-0 bg-indigo-500 rounded-full mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                      Karyera
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-gray-400 hover:text-white text-sm flex items-center group transition-all duration-200"
                    >
                      <span className="h-1 w-0 bg-indigo-500 rounded-full mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/press"
                      className="text-gray-400 hover:text-white text-sm flex items-center group transition-all duration-200"
                    >
                      <span className="h-1 w-0 bg-indigo-500 rounded-full mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                      Matbuot
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Customer Service */}
              <div>
                <h3 className="font-semibold text-lg text-white mb-6 relative inline-block">
                  {t('help')}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-8 bg-indigo-500"></span>
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/help"
                      className="text-gray-400 hover:text-white text-sm flex items-center group transition-all duration-200"
                    >
                      <span className="h-1 w-0 bg-indigo-500 rounded-full mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                      Yordam markazi
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shipping"
                      className="text-gray-400 hover:text-white text-sm flex items-center group transition-all duration-200"
                    >
                      <span className="h-1 w-0 bg-indigo-500 rounded-full mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                      Yetkazib berish
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/returns"
                      className="text-gray-400 hover:text-white text-sm flex items-center group transition-all duration-200"
                    >
                      <span className="h-1 w-0 bg-indigo-500 rounded-full mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                      Qaytarish va almashtirish
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/track-order"
                      className="text-gray-400 hover:text-white text-sm flex items-center group transition-all duration-200"
                    >
                      <span className="h-1 w-0 bg-indigo-500 rounded-full mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                      Buyurtmani kuzatish
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/size-guide"
                      className="text-gray-400 hover:text-white text-sm flex items-center group transition-all duration-200"
                    >
                      <span className="h-1 w-0 bg-indigo-500 rounded-full mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                      O'lcham bo'yicha yo'riqnoma
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="font-semibold text-lg text-white mb-6 relative inline-block">
              {t('newsletter')}
              <span className="absolute -bottom-2 left-0 h-0.5 w-8 bg-indigo-500"></span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Maxsus takliflar, yangi mahsulotlar va chegirmalar haqida xabar olish uchun obuna bo'ling.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Elektron pochta manzilingiz"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 pl-4 pr-12 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 rounded-md transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-gray-500 text-xs">
                Obuna bo'lish orqali siz bizning Maxfiylik siyosatimizga rozilik bildirasiz.
              </p>
            </form>

            <div className="mt-8">
              <h4 className="text-sm font-medium text-gray-300 mb-4">
                {t('follow_us')}
              </h4>
              <div className="flex space-x-3">
                {[
                  {
                    icon: <Facebook size={18} />,
                    name: "Facebook",
                    bg: "bg-blue-600",
                    href: "https://facebook.com/inbola",
                  },
                  {
                    icon: <Twitter size={18} />,
                    name: "Twitter",
                    bg: "bg-sky-500",
                    href: "https://twitter.com/inbola",
                  },
                  {
                    icon: <Instagram size={18} />,
                    name: "Instagram",
                    bg: "bg-pink-600",
                    href: "https://instagram.com/inbola",
                  },
                  {
                    icon: <Youtube size={18} />,
                    name: "YouTube",
                    bg: "bg-red-600",
                    href: "https://youtube.com/inbola",
                  },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`${social.bg} p-2.5 rounded-full text-white hover:opacity-90 hover:scale-110 transition-all duration-200`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment methods and copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            {[
              "Visa",
              "Mastercard",
              "PayPal",
              "Apple Pay",
              "Google Pay",
              "Stripe",
            ].map((method, idx) => (
              <div key={idx} className="text-xs text-gray-500 font-medium">
                {method}
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row text-center md:text-left items-center space-y-2 md:space-y-0 md:space-x-8 text-sm">
            <p className="text-gray-400">
              {t('copyright')}
            </p>
            <div className="flex space-x-4 text-gray-500">
              {[
                { name: "Shartlar", href: "/terms" },
                { name: "Maxfiylik", href: "/privacy" },
                { name: "Cookie", href: "/cookies" },
                { name: "Sayt xaritasi", href: "/sitemap" },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
