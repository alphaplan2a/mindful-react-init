import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveCartItems, getCartItems } from '@/utils/cartStorage';
import { getPersonalizations } from '@/utils/personalizationStorage';
import { calculateDiscountedPrice } from '@/utils/priceCalculations';
import { getPersonalizationPrice } from '@/utils/personalizationPricing';
import { toast } from "@/hooks/use-toast";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  personalization?: string;
  fromPack?: boolean;
  pack?: string;
  withBox?: boolean;
  discount_product?: string;
  type_product?: string;
  itemgroup_product?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  hasNewsletterDiscount: boolean;
  applyNewsletterDiscount: () => void;
  removeNewsletterDiscount: () => void;
  calculateTotal: () => { subtotal: number; discount: number; total: number; boxTotal: number };
}

const BOX_PRICE = 30;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hasNewsletterDiscount, setHasNewsletterDiscount] = useState<boolean>(() => {
    return localStorage.getItem('newsletterSubscribed') === 'true';
  });

  useEffect(() => {
    const savedItems = getCartItems();
    const personalizations = getPersonalizations();
    
    const itemsWithPersonalization = savedItems.map(item => ({
      ...item,
      personalization: item.personalization || personalizations[item.id] || '',
    }));
    
    if (itemsWithPersonalization.length > 0) {
      setCartItems(itemsWithPersonalization);
    }
  }, []);

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => 
        i.id === item.id && 
        i.size === item.size && 
        i.color === item.color && 
        i.personalization === item.personalization &&
        i.withBox === item.withBox &&
        i.pack === item.pack
      );
      
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id && 
          i.size === item.size && 
          i.color === item.color && 
          i.personalization === item.personalization &&
          i.withBox === item.withBox &&
          i.pack === item.pack
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      const finalPrice = item.discount_product 
        ? calculateDiscountedPrice(item.price, item.discount_product)
        : item.price;

      // Calculate personalization price
      const personalizationPrice = getPersonalizationPrice(
        item.itemgroup_product || '',
        item.personalization,
        item.fromPack || false
      );

      console.log('Adding item to cart with prices:', {
        basePrice: finalPrice,
        personalizationPrice,
        total: finalPrice + personalizationPrice
      });

      const itemWithPack = {
        ...item,
        price: finalPrice + personalizationPrice,
        originalPrice: item.discount_product ? item.price : undefined,
        pack: item.pack || 'aucun',
        size: item.size || '-',
        personalization: item.personalization || '-'
      };

      return [...prevItems, itemWithPack];
    });
  };

  const removeFromCart = (id: number) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    
    if (itemToRemove && itemToRemove.fromPack) {
      const packType = itemToRemove.pack;
      
      // Remove all items from the same pack
      setCartItems(prevItems => {
        const remainingItems = prevItems.filter(item => 
          !(item.pack === packType && item.fromPack)
        );
        
        toast({
          title: "Pack supprimé",
          description: `Le pack ${packType} a été entièrement supprimé du panier`,
          style: {
            backgroundColor: '#700100',
            color: 'white',
            border: '1px solid #590000',
          },
        });
        
        return remainingItems;
      });
    } else {
      // Regular item removal
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyNewsletterDiscount = () => {
    const subscribedEmail = localStorage.getItem('subscribedEmail');
    if (!subscribedEmail) return;

    const usedDiscountEmails = JSON.parse(localStorage.getItem('usedDiscountEmails') || '[]');
    
    if (usedDiscountEmails.includes(subscribedEmail)) {
      console.log('Email has already used the newsletter discount');
      setHasNewsletterDiscount(false);
      localStorage.removeItem('newsletterSubscribed');
      return;
    }

    usedDiscountEmails.push(subscribedEmail);
    localStorage.setItem('usedDiscountEmails', JSON.stringify(usedDiscountEmails));
    
    setHasNewsletterDiscount(true);
    localStorage.setItem('newsletterSubscribed', 'true');
  };

  const removeNewsletterDiscount = () => {
    setHasNewsletterDiscount(false);
    localStorage.removeItem('newsletterSubscribed');
  };

  const calculateTotal = () => {
    const itemsSubtotal = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    const boxTotal = cartItems.reduce((sum, item) => 
      sum + (item.withBox ? BOX_PRICE * item.quantity : 0), 0);
    
    const subtotal = itemsSubtotal + boxTotal;
    const discount = hasNewsletterDiscount ? subtotal * 0.05 : 0;
    const total = subtotal - discount;
    
    console.log('Cart totals:', { itemsSubtotal, boxTotal, subtotal, discount, total });
    
    return { subtotal: itemsSubtotal, discount, total, boxTotal };
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      hasNewsletterDiscount,
      applyNewsletterDiscount,
      removeNewsletterDiscount,
      calculateTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};