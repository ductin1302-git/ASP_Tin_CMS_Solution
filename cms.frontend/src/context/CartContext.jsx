import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const getStockQuantity = (item) => item.stockQuantity ?? item.stock ?? Number.MAX_SAFE_INTEGER;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('vSportCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('vSportCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const stockQuantity = getStockQuantity(product);
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, stockQuantity) }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: Math.min(quantity, stockQuantity) }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== productId) return item;
        return { ...item, quantity: Math.min(newQuantity, getStockQuantity(item)) };
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  const getCartTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
