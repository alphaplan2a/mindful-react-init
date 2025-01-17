import React, { useState } from 'react';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { X, Edit2 } from 'lucide-react';
import { formatPrice } from '@/utils/priceCalculations';

interface GiftPackContainerProps {
  title: string;
  item?: Product;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onItemClick?: (product: Product) => void;
  onRemoveItem?: (index: number) => void;
  containerIndex: number;
  className?: string;
  imageScale?: number;
  onEditItem?: (item: Product, index: number) => void;
}

const GiftContainer = ({
  title,
  item,
  onDrop: parentOnDrop,
  onItemClick,
  onRemoveItem,
  containerIndex,
  className = '',
  imageScale = 1,
  onEditItem
}: GiftPackContainerProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    parentOnDrop(e);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item && onEditItem) {
      onEditItem(item, containerIndex);
    }
  };

  return (
    <motion.div
      className={`relative h-[200px] rounded-lg border-2 transition-colors ${
        isDragOver 
          ? 'border-[#700100] bg-[#700100]/5' 
          : 'border-dashed border-gray-300 bg-gray-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {selectedItem ? (
        <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
          <img
            src={selectedItem.image}
            alt={selectedItem.name}
            className="w-24 h-24 object-contain mb-2"
          />
          <p className="text-sm font-medium text-center text-gray-900 line-clamp-2">
            {selectedItem.name}
          </p>
          <p className="text-sm font-medium text-[#700100] mt-1">
            {selectedItem.price.toFixed(2)} TND
          </p>
          <div className="absolute top-2 right-2 flex gap-2">
            {onEditItem && (
              <button
                onClick={handleEditClick}
                className="p-1.5 bg-[#700100] text-white rounded-full hover:bg-[#590000] transition-colors"
                title="Modifier"
              >
                <Edit2 size={14} />
              </button>
            )}
            {onRemove && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                title="Supprimer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 text-sm text-center px-4">
            Faites glisser un produit ici
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default GiftContainer;