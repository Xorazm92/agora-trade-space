import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X } from "lucide-react";

interface MultiSelectDropdownProps {
  options: { label: string; value: string }[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedValues = [],
  onChange,
  placeholder = "Select options",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOption = (value: string) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newSelected);
  };

  const removeOption = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = selectedValues.filter((v) => v !== value);
    onChange(newSelected);
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabels = selectedValues
    .map((value) => options.find((opt) => opt.value === value)?.label)
    .filter(Boolean);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="flex items-center justify-between p-2 border border-gray-300 rounded-md cursor-pointer bg-white min-h-[42px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full mr-1"
              >
                {label}
                <button
                  type="button"
                  onClick={(e) => removeOption(selectedValues[index], e)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <div className="flex items-center">
          {selectedValues.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-gray-400 hover:text-gray-600 mr-1"
            >
              <X size={16} />
            </button>
          )}
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                selectedValues.includes(option.value) ? "bg-blue-50" : ""
              }`}
              onClick={() => toggleOption(option.value)}
            >
              <span className="flex-1">{option.label}</span>
              {selectedValues.includes(option.value) && (
                <Check className="h-4 w-4 text-blue-600" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
