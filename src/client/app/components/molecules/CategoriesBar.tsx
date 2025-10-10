"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useGetAllCategoriesQuery } from "@/app/store/apis/CategoryApi";

interface Category {
  id: string;
  name: string;
  slug: string;
  children?: Category[];
}

const CategoriesBar = () => {
  const { data, error, isLoading } = useGetAllCategoriesQuery({});
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };
  
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="container mx-auto border-r-2 border-gray-200">
          <div className="flex flex-col gap-8 items-start justify-between py-[18px]">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-6 w-32 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    console.log("Error fetching categories:", error);
  }
  // Use API data or fallback to static categories with sub-categories
  const categories = error ? [
    { 
      id: "1", 
      name: "Elektron qurilmalar", 
      slug: "elektron-qurilmalar",
      children: [
        { id: "1-1", name: "Telefon", slug: "telefon" },
        { id: "1-2", name: "Planshet", slug: "planshet" },
        { id: "1-3", name: "Bolalar telefoni", slug: "bolalar-telefoni" },
        { id: "1-4", name: "Elektron o'yinchoqlar", slug: "elektron-oyinchoqlar" },
        { id: "1-5", name: "Musiqa asboblari", slug: "musiqa-asboblari" }
      ]
    },
    { 
      id: "2", 
      name: "O'yinchoqlar", 
      slug: "oyinchoqlar",
      children: [
        { id: "2-1", name: "Chaqlarlar", slug: "chaqlarlar" },
        { id: "2-2", name: "Rivojlantiruvchi", slug: "rivojlantiruvchi" },
        { id: "2-3", name: "Konstruksiyalar (konstruktor)", slug: "konstruksiyalar" },
        { id: "2-4", name: "Qo'g'irchoqlar", slug: "qogirchoqlar" }
      ]
    },
    { 
      id: "3", 
      name: "Kiyimlar", 
      slug: "kiyimlar",
      children: [
        { id: "3-1", name: "Bolalar kiyimi", slug: "bolalar-kiyimi" },
        { id: "3-2", name: "Chaqaloq kiyimi", slug: "chaqaloq-kiyimi" },
        { id: "3-3", name: "Mavsumiy kiyim", slug: "mavsumiy-kiyim" },
        { id: "3-4", name: "Ichki kiyimlar", slug: "ichki-kiyimlar" }
      ]
    },
    { 
      id: "4", 
      name: "Poyabzal", 
      slug: "poyabzal",
      children: [
        { id: "4-1", name: "Birinchi qadam poyabzali", slug: "birinchi-qadam-poyabzali" },
        { id: "4-2", name: "Sport poyabzali", slug: "sport-poyabzali" },
        { id: "4-3", name: "Kundalik poyabzal", slug: "kundalik-poyabzal" },
        { id: "4-4", name: "Qishki poyabzal", slug: "qishki-poyabzal" }
      ]
    },
    { 
      id: "5", 
      name: "Kitoblar", 
      slug: "kitoblar",
      children: [
        { id: "5-1", name: "Chaqaloq kitoblari", slug: "chaqaloq-kitoblari" },
        { id: "5-2", name: "Ertak va qissalar", slug: "ertak-va-qissalar" },
        { id: "5-3", name: "Ta'limiy kitoblar", slug: "talimiy-kitoblar" },
        { id: "5-4", name: "Rang berish kitoblari", slug: "rang-berish-kitoblari" }
      ]
    }
  ] : (() => {
    const allCategories = data?.categories || [];
    const parentCategories = allCategories.filter((cat: any) => !cat.parentId);
    
    return parentCategories.map((parent: any) => ({
      id: parent.id,
      name: parent.name,
      slug: parent.slug || parent.name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, ''),
      children: allCategories
        .filter((cat: any) => cat.parentId === parent.id)
        .map((child: any) => ({
          id: child.id,
          name: child.name,
          slug: child.slug || child.name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')
        }))
    }));
  })();

  const renderCategory = (category: Category, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const indentClass = level > 0 ? `ml-${level * 4}` : '';

    return (
      <div key={category.id} className="w-full">
        <div className={`flex items-center justify-between ${indentClass}`}>
          <Link
            href={`/shop?category=${category.slug}`}
            className="flex items-center text-gray-700 hover:text-black transition-colors font-medium text-[16px] capitalize flex-1"
          >
            {category.name}
          </Link>
          {hasChildren && (
            <button
              onClick={() => toggleCategory(category.id)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown size={16} className="text-gray-600" />
              ) : (
                <ChevronRight size={16} className="text-gray-600" />
              )}
            </button>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2">
            {category.children!.map((child) => (
              <div key={child.id} className={`ml-4 ${indentClass}`}>
                <Link
                  href={`/shop?category=${child.slug}`}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-[14px] py-1"
                >
                  <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                  {child.name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="container mx-auto border-r-2 border-gray-200">
        <div className="flex flex-col gap-4 items-start justify-between py-[18px]">
          {categories.map((category: Category) => renderCategory(category))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesBar;
