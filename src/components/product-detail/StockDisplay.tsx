import React from 'react';
import { Info } from 'lucide-react';

interface StockDisplayProps {
  quantity: number;
}

const StockDisplay = ({ quantity }: StockDisplayProps) => {
  const stockStatus = quantity <= 5 ? 'low' : 'normal';
  
  return (
    <div className="flex items-center gap-2 mt-2">
      <Info className="h-4 w-4 text-gray-500" />
      <span className={`text-sm ${
        stockStatus === 'low' ? 'text-orange-600 font-medium' : 'text-gray-600'
      }`}>
        {quantity === 0 ? (
          'Rupture de stock'
        ) : quantity <= 5 ? (
          `Plus que ${quantity} pièce${quantity > 1 ? 's' : ''} disponible${quantity > 1 ? 's' : ''}`
        ) : (
          `${quantity} pièces disponibles`
        )}
      </span>
    </div>
  );
};

export default StockDisplay;