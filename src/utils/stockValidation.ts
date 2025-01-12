export const getAvailableStockForSize = (product: any, size: string): number => {
  // Map the size to the corresponding property name in the product object
  const sizeMapping: { [key: string]: string } = {
    'S': 's_size',
    'M': 'm_size',
    'L': 'l_size',
    'XL': 'xl_size',
    'XXL': 'xxl_size',
    '3XL': '3xl_size'
  };

  // Get the property name for the size (e.g., 'm_size' for size 'M')
  const sizeKey = sizeMapping[size.toUpperCase()];
  
  // Get the stock value from the product object using the size property
  if (sizeKey && product.sizes && product.sizes[sizeKey.split('_')[0].toLowerCase()]) {
    return product.sizes[sizeKey.split('_')[0].toLowerCase()];
  }
  
  // If we can't find the size or the stock, return 0
  return 0;
};

export const getTotalStock = (product: any): number => {
  return parseInt(product.qnty_product || '0');
};