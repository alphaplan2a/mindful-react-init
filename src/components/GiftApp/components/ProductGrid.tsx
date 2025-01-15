import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  selectedProducts?: Product[];
  onDrop?: (e: React.DragEvent<HTMLDivElement>, product: Product) => void;
}

const ProductGrid = ({ 
  products, 
  onProductClick, 
  selectedProducts = [],
  onDrop 
}: ProductGridProps) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, product: Product) => {
    if (onDrop) {
      e.preventDefault();
      onDrop(e, product);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className={`relative cursor-pointer p-4 rounded-lg border transition-all
            ${selectedProducts.some(p => p.id === product.id)
              ? 'border-[#700100] bg-[#700100]/5'
              : 'border-gray-200 hover:border-[#700100] hover:shadow-md'
            }`}
          onClick={() => onProductClick(product)}
          onDrop={(e) => handleDrop(e, product)}
          onDragOver={handleDragOver}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="aspect-square mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {product.price} TND
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;