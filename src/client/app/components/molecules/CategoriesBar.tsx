"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useGetAllCategoriesQuery } from "@/app/store/apis/CategoryApi";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const CategoriesBar = () => {
  const { data, error, isLoading } = useGetAllCategoriesQuery({});
  
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
  
  // Use API data or fallback to static categories
  const categories = error ? [
    { id: "1", name: "O'yinchoqlar", slug: "oyinchoqlar" },
    { id: "2", name: "Bolalar kiyimlari", slug: "bolalar-kiyimlari" },
    { id: "3", name: "Bolalar poyabzallari", slug: "bolalar-poyabzallari" },
    { id: "4", name: "Chaqaloq mahsulotlari", slug: "chaqaloq-mahsulotlari" },
    { id: "5", name: "Bolalar kitoblari", slug: "bolalar-kitoblari" },
  ] : (data?.categories || []).map((cat: any) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')
  }));

  return (
    <div className="w-full">
      <div className="container mx-auto border-r-2 border-gray-200">
        <div className="flex flex-col gap-8 items-start justify-between overflow-x-auto py-[18px] whitespace-nowrap">
          {categories.map((category: Category, index: number) => (
            <React.Fragment key={category.id + index}>
              <Link
                href={`/shop?category=${category.slug}`}
                className="flex items-center text-gray-700 hover:text-black transition-colors font-medium text-[16px] capitalize"
              >
                {category.name}
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesBar;
