"use client";
import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useGetAllCategoriesQuery } from "@/app/store/apis/CategoryApi";

interface Category {
  id: string;
  name: string;
  slug: string;
  children?: Category[];
}

interface CategoryFilterProps {
  selectedCategory?: string;
  onCategoryChange: (categorySlug: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const { data, isLoading } = useGetAllCategoriesQuery({});
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
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="animate-pulse bg-gray-200 h-8 rounded"></div>
        ))}
      </div>
    );
  }

  const categories = data?.categories || [];

  const renderCategory = (category: Category, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const isSelected = selectedCategory === category.slug;
    const indentClass = level > 0 ? `ml-${level * 4}` : '';

    return (
      <div key={category.id} className="w-full">
        <div className={`flex items-center justify-between ${indentClass}`}>
          <button
            onClick={() => onCategoryChange(category.slug)}
            className={`flex items-center text-left flex-1 py-2 px-3 rounded-lg transition-colors ${
              isSelected
                ? 'bg-indigo-100 text-indigo-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-sm">{category.name}</span>
          </button>
          {hasChildren && (
            <button
              onClick={() => toggleCategory(category.id)}
              className="p-1 hover:bg-gray-100 rounded transition-colors ml-2"
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
          <div className="mt-1 space-y-1">
            {category.children!.map((child) => (
              <div key={child.id} className={`ml-4 ${indentClass}`}>
                <button
                  onClick={() => onCategoryChange(child.slug)}
                  className={`flex items-center text-left w-full py-2 px-3 rounded-lg transition-colors ${
                    selectedCategory === child.slug
                      ? 'bg-indigo-50 text-indigo-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                  <span className="text-sm">{child.name}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      <h3 className="font-semibold text-gray-900 mb-3">Kategoriyalar</h3>
      
      {/* All Categories Option */}
      <button
        onClick={() => onCategoryChange('')}
        className={`flex items-center text-left w-full py-2 px-3 rounded-lg transition-colors ${
          !selectedCategory
            ? 'bg-indigo-100 text-indigo-700 font-medium'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="text-sm">Barcha kategoriyalar</span>
      </button>

      {/* Categories List */}
      <div className="space-y-1">
        {categories.map((category: Category) => renderCategory(category))}
      </div>
    </div>
  );
};

export default CategoryFilter;
