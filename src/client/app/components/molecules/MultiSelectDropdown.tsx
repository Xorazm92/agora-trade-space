"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Check } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  maxSelections?: number;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  value = [],
  onChange,
  placeholder = "Tanlang...",
  label,
  className = "",
  maxSelections
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    const newValue = [...value];
    const index = newValue.indexOf(optionValue);
    
    if (index > -1) {
      // Remove if already selected
      newValue.splice(index, 1);
    } else {
      // Add if not selected and under max limit
      if (!maxSelections || newValue.length < maxSelections) {
        newValue.push(optionValue);
      }
    }
    
    onChange(newValue);
  };

  const removeSelection = (optionValue: string) => {
    const newValue = value.filter(v => v !== optionValue);
    onChange(newValue);
  };

  const getSelectedLabels = () => {
    return value.map(v => options.find(opt => opt.value === v)?.label).filter(Boolean);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div
        className="w-full p-2 border border-gray-300 rounded-md bg-white cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-500 min-h-[40px] flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {value.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            getSelectedLabels().map((label, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
              >
                {label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const optionValue = value[index];
                    removeSelection(optionValue);
                  }}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            ))
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.length === 0 ? (
            <div className="p-2 text-gray-500 text-sm">Variantlar mavjud emas</div>
          ) : (
            options.map((option) => {
              const isSelected = value.includes(option.value);
              const isDisabled = maxSelections && !isSelected && value.length >= maxSelections;
              
              return (
                <div
                  key={option.value}
                  className={`p-2 cursor-pointer flex items-center justify-between hover:bg-gray-50 ${
                    isSelected ? "bg-blue-50 text-blue-700" : ""
                  } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => !isDisabled && handleOptionClick(option.value)}
                >
                  <span className="flex-1">{option.label}</span>
                  {isSelected && <Check size={16} className="text-blue-600" />}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
