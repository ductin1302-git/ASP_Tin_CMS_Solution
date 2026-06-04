import React, { createContext, useState, useEffect, useContext } from 'react';

// Tạo Context
const CartContext = createContext();

// Hook tùy chỉnh để sử dụng Cart dễ dàng hơn ở các component khác
export const useCart = () => useContext(CartContext);

// Provider bọc quanh ứng dụng
export const CartProvider = ({ children }) => {
  // Khởi tạo state từ LocalStorage (nếu có)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('vSportCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Mỗi khi cartItems thay đổi, lưu lại vào LocalStorage
  useEffect(() => {
    localStorage.setItem('vSportCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Thêm sản phẩm vào giỏ
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Nếu đã có trong giỏ, cộng thêm số lượng
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Nếu chưa có, thêm mới
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Xóa sản phẩm khỏi giỏ
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Cập nhật số lượng
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Xóa toàn bộ giỏ hàng (Sau khi thanh toán thành công)
  const clearCart = () => {
    setCartItems([]);
  };

  // Tính tổng số lượng món đồ trong giỏ
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Tính tổng tiền giỏ hàng
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      getCartCount,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
