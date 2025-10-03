"use client";
import React, { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import useClickOutside from "@/app/hooks/dom/useClickOutside";

const languages = [
  { code: "uz", name: "O'zbek", flag: "🇺🇿" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  let locale;
  
  try {
    locale = useLocale();
  } catch (error) {
    // Fallback if NextIntlClientProvider context is not available
    locale = 'uz';
  }
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    const segments = pathname.split('/');
    segments[1] = langCode; // Replace locale segment
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 text-gray-700 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-100"
        aria-label="Change language"
      >
        <Globe size={18} />
        <span className="hidden sm:block text-sm font-medium">
          {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center space-x-3 ${
                locale === language.code ? "bg-indigo-50 text-indigo-600" : "text-gray-700"
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
              {locale === language.code && (
                <span className="ml-auto text-indigo-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
