import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../data/mockData';
import './Cart.css';

const API_BASE_URL = 'https://localhost:7003';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form State removed, using dedicated Checkout page instead.

  const getImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page container animate-fade-in empty-cart">
        <h2>Giỏ hàng của bạn đang trống</h2>
        <p style={{margin: '20px 0', color: '#64748b'}}>Hãy thêm các sản phẩm tuyệt vời của chúng tôi vào giỏ hàng nhé!</p>
        <Link to="/shop" className="btn btn-primary">Khám phá cửa hàng</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container animate-fade-in">
      <h1 className="section-title" style={{marginBottom: '30px'}}>Giỏ Hàng Của Bạn ({getCartCount()})</h1>
      
      <div className="cart-container">
        {/* Danh sách sản phẩm */}
        <div className="cart-items-section">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={getImageUrl(item.imageUrl)} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-info">
                <h3 className="cart-item-title">
                  <Link to={`/product/${item.id}`} style={{color: 'inherit', textDecoration: 'none'}}>
                    {item.name}
                  </Link>
                </h3>
                <div className="cart-item-price">{formatPrice(item.price)}</div>
              </div>

              <div className="cart-item-actions">
                <div className="cart-qty-selector">
                  <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <input type="text" className="cart-qty-input" value={item.quantity} readOnly />
                  <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.stockQuantity <= item.quantity}>+</button>
                </div>
                
                <div style={{fontWeight: '700', minWidth: '100px', textAlign: 'right'}}>
                  {formatPrice(item.price * item.quantity)}
                </div>

                <button className="btn-remove" onClick={() => removeFromCart(item.id)} title="Xóa khỏi giỏ hàng">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Khung thanh toán */}
        <div className="checkout-section">
          <h2 className="checkout-title">Tổng quan đơn hàng</h2>
          
          <div className="checkout-summary">
            <span>Tổng cộng:</span>
            <span>{formatPrice(getCartTotal())}</span>
          </div>

          <div style={{marginTop: '20px'}}>
            <button 
              className="btn-checkout" 
              onClick={() => {
                if (!user) {
                  navigate('/login', { state: { from: '/checkout', message: 'Vui lòng đăng nhập để thanh toán.' }});
                } else {
                  navigate('/checkout');
                }
              }}
            >
              Tiến hành thanh toán <ArrowRight size={20} style={{marginLeft: '10px'}} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
