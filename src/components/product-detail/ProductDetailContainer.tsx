import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleProduct } from '@/services/productsApi';
import ProductDetailSkeleton from './ProductDetailSkeleton';
import ProductDetailContent from './ProductDetailContent';
import { Product } from '@/types/product';

const ProductDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [personalizationText, setPersonalizationText] = useState('');

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchSingleProduct(Number(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (product) {
      const availableSizes = Object.entries(product.sizes)
        .filter(([_, quantity]) => quantity > 0)
        .map(([size]) => size);
      
      if (availableSizes.length > 0) {
        setSelectedSize(availableSizes[0]);
      }
    }
  }, [product]);

  if (isLoading) return <ProductDetailSkeleton />;
  if (error || !product) return <div>Error loading product</div>;

  return (
    <ProductDetailContent
      product={product}
      selectedSize={selectedSize}
      selectedQuantity={selectedQuantity}
      isPersonalized={isPersonalized}
      personalizationText={personalizationText}
      onQuantityChange={setSelectedQuantity}
      onSizeChange={setSelectedSize}
      onPersonalizationChange={setIsPersonalized}
      onPersonalizationTextChange={setPersonalizationText}
    />
  );
};

export default ProductDetailContainer;