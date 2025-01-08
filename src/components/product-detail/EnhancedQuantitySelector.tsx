import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface EnhancedQuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const EnhancedQuantitySelector = ({
  quantity,
  maxQuantity,
  onQuantityChange,
}: EnhancedQuantitySelectorProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-base font-semibold text-gray-900">Quantité</span>
        <span className="text-sm text-gray-500">
          Maximum: {maxQuantity}
        </span>
      </div>
      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 w-fit">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          className="h-8 w-8"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center font-medium text-gray-900">
          {quantity}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onQuantityChange(Math.min(maxQuantity, quantity + 1))}
          disabled={quantity >= maxQuantity}
          className="h-8 w-8"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EnhancedQuantitySelector;