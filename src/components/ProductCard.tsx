import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  
  // Calculate total quantity across all sizes
  const totalQuantity = Object.values(product.sizes).reduce((sum, qty) => sum + qty, 0);

  return (
    <div 
      className="h-full hover:shadow-lg hover:transform hover:scale-[1.02] transition-all duration-300 cursor-pointer relative"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="h-[300px] bg-transparent overflow-hidden mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-normal"
          loading="lazy"
        />
      </div>
      <div className="p-2 md:p-4">
        <div className="text-base font-['WomanFontRegular'] text-[#591C1C]">
          {product.name}
        </div>
        <div className="text-sm text-gray-600 uppercase">
          {product.material}<br />
          {product.color}
        </div>
        <div className="mt-2 font-['WomanFontRegular'] text-black flex justify-between items-center">
          <span>{product.price} TND</span>
          <Badge variant="outline" className="bg-gray-50">
            {totalQuantity} en stock
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;