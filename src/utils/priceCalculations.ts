export const calculateDiscountedPrice = (price: number, discount: string): number => {
  if (!discount || discount === "" || isNaN(parseFloat(discount))) {
    return price;
  }
  const discountAmount = (parseFloat(discount) / 100) * price;
  return price - discountAmount;
};

export const formatPrice = (price: number): string => {
  return price.toFixed(2);
};

export const calculateFinalPrice = (basePrice: number, discount: string): number => {
  if (discount && !isNaN(parseFloat(discount)) && parseFloat(discount) > 0) {
    const discountAmount = (parseFloat(discount) / 100) * basePrice;
    return basePrice - discountAmount;
  }
  return basePrice;
};