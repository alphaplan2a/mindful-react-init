import { Product } from '@/types/product';

type CategoryType = {
  label: string;
  type: string;
  value: string;
};

export const getAvailableCategories = (
  packType: string,
  selectedContainerIndex: number,
  selectedItems: Product[]
): CategoryType[] => {
  if (packType === 'Pack Premium') {
    // First slot must be portefeuille
    if (selectedItems.length === 0) {
      return [{ label: 'Portefeuilles', type: 'itemgroup', value: 'portefeuilles' }];
    }
    
    // Second slot must be ceinture
    if (selectedItems.length === 1) {
      return [{ label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }];
    }
    
    // Third slot must be cravate
    if (selectedItems.length === 2) {
      return [{ label: 'Cravates', type: 'itemgroup', value: 'cravates' }];
    }
    
    return [];
  }

  if (packType === 'Pack Prestige') {
    const chemiseCount = selectedItems.filter(item => item.itemgroup_product === 'chemises').length;
    const beltCount = selectedItems.filter(item => item.itemgroup_product === 'ceintures').length;
    const cravateCount = selectedItems.filter(item => item.itemgroup_product === 'cravates').length;

    if (chemiseCount === 0) {
      return [{ label: 'Chemises', type: 'itemgroup', value: 'chemises' }];
    }
    if (chemiseCount === 1 && beltCount === 0) {
      return [{ label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }];
    }
    if (chemiseCount === 1 && beltCount === 1 && cravateCount === 0) {
      return [{ label: 'Cravates', type: 'itemgroup', value: 'cravates' }];
    }
    return [];
  }

  if (packType === 'Pack Trio') {
    // If no items selected yet, show both portefeuilles and ceintures as options
    if (selectedItems.length === 0) {
      return [
        { label: 'Portefeuilles', type: 'itemgroup', value: 'portefeuilles' },
        { label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }
      ];
    }

    // If first item is selected, only show accessoires for the second slot
    if (selectedItems.length === 1) {
      return [{ label: 'Accessoires', type: 'type', value: 'accessoires' }];
    }

    return [];
  }

  const categories = {
    'Pack Duo': [
      [{ label: 'Portefeuilles', type: 'itemgroup', value: 'portefeuilles' }],
      [{ label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }]
    ],
    'Pack Mini Duo': [
      [{ label: 'Porte-cartes', type: 'itemgroup', value: 'porte-cartes' }],
      [{ label: 'Porte-clés', type: 'itemgroup', value: 'porte-cles' }]
    ]
  };

  const singleCategories = {
    'Pack Chemise': [{ label: 'Chemises', type: 'itemgroup', value: 'chemises' }],
    'Pack Ceinture': [{ label: 'Ceintures', type: 'itemgroup', value: 'ceintures' }],
    'Pack Cravatte': [{ label: 'Cravates', type: 'itemgroup', value: 'cravates' }],
    'Pack Malette': [{ label: 'Mallettes', type: 'itemgroup', value: 'mallettes' }]
  };

  if (singleCategories[packType as keyof typeof singleCategories]) {
    return singleCategories[packType as keyof typeof singleCategories];
  }

  const packCategories = categories[packType as keyof typeof categories];
  if (!packCategories) return [];

  return packCategories[selectedContainerIndex] || [];
};