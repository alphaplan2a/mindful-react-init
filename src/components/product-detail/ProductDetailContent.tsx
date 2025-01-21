import React from 'react';
import { Product } from '@/types/product';
import ProductImageCarousel from './ProductImageCarousel';
import ProductInfo from './ProductInfo';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import ProductQuantitySelector from './ProductQuantitySelector';
import PersonalizationButton from './PersonalizationButton';
import ProductActions from './ProductActions';
import RelatedProducts from './RelatedProducts';

interface ProductDetailContentProps {
  product: Product;
  selectedSize: string;
  selectedQuantity: number;
  isPersonalized: boolean;
  personalizationText: string;
  onQuantityChange: (quantity: number) => void;
  onSizeChange: (size: string) => void;
  onPersonalizationChange: (isChecked: boolean) => void;
  onPersonalizationTextChange: (text: string) => void;
}

const ProductDetailContent = ({
  product,
  selectedSize,
  selectedQuantity,
  isPersonalized,
  personalizationText,
  onQuantityChange,
  onSizeChange,
  onPersonalizationChange,
  onPersonalizationTextChange,
}: ProductDetailContentProps) => {
  const images = [
    product.image,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean) as string[];

  const availableSizes = Object.entries(product.sizes)
    .filter(([_, quantity]) => quantity > 0)
    .map(([size]) => size);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductImageCarousel images={images} name={product.name} />
        
        <div className="space-y-6">
          <ProductInfo
            name={product.name}
            description={product.description}
            price={product.price}
            discount={product.discount_product}
          />

          <div className="space-y-6">
            <SizeSelector
              selectedSize={selectedSize}
              sizes={availableSizes}
              onSizeSelect={onSizeChange}
            />

            <ProductQuantitySelector
              quantity={selectedQuantity}
              setQuantity={onQuantityChange}
              selectedSize={selectedSize}
              product={product}
            />

            {product.itemgroup_product === 'chemises' && (
              <PersonalizationButton
                productId={product.id}
                onSave={onPersonalizationTextChange}
                initialText={personalizationText}
                itemgroup_product={product.itemgroup_product}
              />
            )}

            <ProductActions
              handleInitialAddToCart={() => {
                // Add to cart logic here
                console.log('Adding to cart:', {
                  product,
                  size: selectedSize,
                  quantity: selectedQuantity,
                  personalization: personalizationText,
                });
              }}
              product={product}
              selectedSize={selectedSize}
            />
          </div>
        </div>
      </div>

      <RelatedProducts currentProduct={product} />
    </div>
  );
};

export default ProductDetailContent;