import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { GripVertical, CheckCircle } from 'lucide-react';
import { calculateDiscountedPrice } from '@/utils/priceCalculations';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductGridProps {
  products: Product[];
  onDragStart: (event: React.DragEvent<HTMLDivElement>, product: Product) => void;
  onProductSelect?: (product: Product) => void;
}

const ProductGrid = ({ products, onDragStart, onProductSelect }: ProductGridProps) => {
  const isMobile = useIsMobile();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, product: Product) => {
    if (!isMobile) {
      onDragStart(e, product);
    }
  };

  const handleClick = (product: Product) => {
    if (isMobile && onProductSelect) {
      onProductSelect(product);
    }
  };

  // If there are no products available, show the completion message
  if (products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-full p-8 bg-white/50 rounded-lg shadow-sm"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2 text-center">
          Pack Complété !
        </h3>
        <p className="text-gray-500 text-center">
          Votre pack est maintenant complet. Vous pouvez procéder à la validation.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 overflow-y-auto flex-1 min-h-0">
      {products.map((product) => {
        const hasDiscount = product.discount_product !== "" && 
                          !isNaN(parseFloat(product.discount_product)) && 
                          parseFloat(product.discount_product) > 0;
        
        const displayPrice = hasDiscount 
          ? calculateDiscountedPrice(product.price, product.discount_product)
          : product.price;

        return (
          <motion.div
            key={product.id}
            draggable={!isMobile}
            onDragStart={(e) => handleDragStart(e, product)}
            onClick={() => handleClick(product)}
            data-product-type={product.itemgroup_product}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`bg-white rounded-lg shadow-sm p-4 border border-gray-100/50 hover:shadow-md transition-all ${
              isMobile ? 'cursor-pointer active:scale-95' : 'cursor-grab active:cursor-grabbing'
            }`}
          >
            <div className="relative">
              {!isMobile && <GripVertical className="absolute top-0 right-0 text-gray-400" size={16} />}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-24 object-contain mb-2"
                loading="lazy"
              />
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </h3>
              <div className="mt-1">
                {hasDiscount ? (
                  <div className="space-y-1">
                    <p className="text-sm text-[#700100] font-medium">
                      {displayPrice.toFixed(2)} TND
                    </p>
                    <p className="text-xs text-gray-500 line-through">
                      {product.price.toFixed(2)} TND
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-[#700100] font-medium">
                    {displayPrice.toFixed(2)} TND
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProductGrid;