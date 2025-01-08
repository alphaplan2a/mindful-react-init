import React from 'react';
import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  selectedSize: string;
  sizes: { [key: string]: number };
  onSizeSelect: (size: string) => void;
}

const SizeSelector = ({ selectedSize, sizes, onSizeSelect }: SizeSelectorProps) => {
  const displaySize = (size: string) => {
    if (size.toLowerCase() === 'xxl2') return '2XXL';
    return size;
  };

  // Filter out sizes with 0 quantity
  const availableSizes = Object.entries(sizes)
    .filter(([_, quantity]) => quantity > 0)
    .map(([size]) => size.toUpperCase());

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-900">
          Taille {selectedSize ? `sélectionnée: ${displaySize(selectedSize)}` : ''}
        </span>
        <button className="text-xs text-[#700100] hover:underline">
          Guide des tailles
        </button>
      </div>
      <div className="grid grid-cols-6 gap-1">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={cn(
              "py-2 text-sm font-medium rounded-md transition-all duration-200",
              selectedSize === size 
                ? 'bg-[#700100] text-white shadow-md transform scale-105' 
                : 'bg-white border border-gray-200 text-gray-900 hover:border-[#700100] hover:bg-gray-50'
            )}
          >
            {displaySize(size)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;