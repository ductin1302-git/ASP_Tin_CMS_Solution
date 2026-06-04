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

  // Form State
  const [customerId, setCustomerId] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setCustomerId(user.id.toString());
    } else {
      setCustomerId('');
    }
  }, [user]);

  const getImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!customerId) {
      alert("Vui lòng nhập Mã Khách Hàng hoặc Đăng nhập để thanh toán!");
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customerId: parseInt(customerId),
      notes: notes,
      orderDetails: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price
      }))
    };

    try {
      const response = await fetch('https://localhost:7003/api/Orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.detail || 'Có lỗi xảy ra khi thanh toán.');
      }

      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      alert("Lỗi đặt hàng: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="cart-page container animate-fade-in" style={{textAlign: 'center', padding: '100px 0'}}>
        <div style={{fontSize: '4rem', color: '#10b981', marginBottom: '20px'}}>✓</div>
        <h1 style={{marginBottom: '20px'}}>Đặt hàng thành công!</h1>
        <p style={{marginBottom: '30px', color: '#64748b'}}>Cảm ơn bạn đã mua sắm tại V-SPORT. Chúng tôi sẽ sớm liên hệ với bạn.</p>
        <Link to="/shop" className="btn btn-primary">Tiếp tục mua sắm</Link>
      </div>
    );
  }

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

          <form className="checkout-form" onSubmit={handleCheckout}>
            <div className="form-group">
              <label>Mã Khách Hàng (Customer ID)*</label>
              <input 
                type="number" 
                required 
                placeholder="Ví dụ: 1" 
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                readOnly={!!user}
              />
              {!user && (
                <small style={{color: '#64748b', display: 'block', marginTop: '5px'}}>
                  (Đăng nhập để tự động điền hoặc nhập thủ công ID Khách hàng)
                </small>
              )}
            </div>
            
            <div className="form-group">
              <label>Ghi chú đơn hàng</label>
              <textarea 
                rows="3" 
                placeholder="Giao hàng giờ hành chính..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn-checkout" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Xác Nhận Đặt Hàng'} <ArrowRight size={20} style={{marginLeft: '10px'}} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
