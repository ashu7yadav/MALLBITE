import React, { createContext, useContext, useState, useMemo } from 'react';
import { api } from '../services/api';
import { useMall } from './MallContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { addNotification } = useMall();
  const [cartItems, setCartItems] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Add Item to Unified Multi-Restaurant Cart
  const addToCart = (item, quantity = 1) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(i => i.id === item.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity
        };
        return updated;
      } else {
        return [...prev, { ...item, quantity }];
      }
    });

    addNotification(
      "Item Added to Multi-Cart",
      `${item.name} from ${item.restaurantName} added to your cart`,
      "success"
    );
  };

  // Remove or decrement
  const updateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Apply Coupon
  const applyCoupon = async (code) => {
    try {
      const res = await api.validateCoupon(code, subtotal);
      if (res.valid) {
        setAppliedCoupon({
          code: res.code,
          discount: res.discount,
          description: res.description
        });
        addNotification("Coupon Applied 🎉", `${res.code}: Saved ₹${res.discount}!`, "success");
        return { success: true, message: `Saved ₹${res.discount}` };
      } else {
        addNotification("Invalid Coupon", res.message, "error");
        return { success: false, message: res.message };
      }
    } catch {
      // Fallback local validate
      if (code.toUpperCase() === 'MALLBITE50' && subtotal >= 300) {
        setAppliedCoupon({ code: 'MALLBITE50', discount: 50, description: 'Flat ₹50 OFF' });
        addNotification("Coupon Applied", "Saved ₹50 with MALLBITE50", "success");
        return { success: true, message: "Saved ₹50" };
      }
      return { success: false, message: "Could not apply coupon" };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addNotification("Coupon Removed", "Discount has been removed", "info");
  };

  // Group items by Restaurant
  const itemsByRestaurant = useMemo(() => {
    const groups = {};
    cartItems.forEach(item => {
      const restId = item.restaurantId || 'other';
      if (!groups[restId]) {
        groups[restId] = {
          restaurantId: restId,
          restaurantName: item.restaurantName || 'Food Outlet',
          items: []
        };
      }
      groups[restId].items.push(item);
    });
    return Object.values(groups);
  }, [cartItems]);

  // Calculations
  const distinctRestaurantsCount = itemsByRestaurant.length;
  const totalItemsCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const subtotal = cartItems.reduce((acc, it) => acc + (it.price * it.quantity), 0);
  const convenienceFee = cartItems.length > 0 ? 10 : 0;
  const gstTaxes = Math.round(subtotal * 0.05);
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalTotal = Math.max(0, subtotal + convenienceFee + gstTaxes - discountAmount);

  // Smart Combo detection helper
  const hasComboMatch = useMemo(() => {
    const hasBurger = cartItems.some(i => i.name.toLowerCase().includes("burger"));
    const hasFries = cartItems.some(i => i.name.toLowerCase().includes("fries"));
    const hasDrink = cartItems.some(i => i.name.toLowerCase().includes("coffee") || i.name.toLowerCase().includes("shake"));
    return hasBurger && hasFries && hasDrink;
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemsByRestaurant,
        distinctRestaurantsCount,
        totalItemsCount,
        subtotal,
        convenienceFee,
        gstTaxes,
        discountAmount,
        finalTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        hasComboMatch,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
