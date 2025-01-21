import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductDetailLayout from '@/components/product-detail/ProductDetailLayout';
import ProductDetailContainer from '@/components/product-detail/ProductDetailContainer';
import ProductDetailSkeleton from '@/components/product-detail/ProductDetailSkeleton';
import WhatsAppPopup from '@/components/WhatsAppPopup';

const ProductDetailPage = () => {
  const navigate = useNavigate();

  return (
    <ProductDetailLayout onBack={() => navigate(-1)}>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailContainer />
        <WhatsAppPopup />
      </Suspense>
    </ProductDetailLayout>
  );
};

export default ProductDetailPage;