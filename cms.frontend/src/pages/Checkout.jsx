import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../data/mockData';
import './Checkout.css';

const API_BASE_URL = 'https://localhost:7003';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'COD'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout', message: 'Vui lòng đăng nhập để thanh toán.' }});
    } else {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || '',
        phone: user.phone || '',
        address: user.address || ''
      }));
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    const isOnlinePayment = formData.paymentMethod === 'ONLINE';

    const orderPayload = {
      customerId: parseInt(user.id),
      notes: formData.notes,
      paymentMethod: formData.paymentMethod,
      isPaid: isOnlinePayment, // Giả lập đã thanh toán nếu chọn Online
      deliveryAddress: formData.address,
      orderDetails: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price
      }))
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/Orders`, {
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
      <div className="checkout-page container animate-fade-in" style={{textAlign: 'center', padding: '100px 0'}}>
        <div style={{fontSize: '5rem', color: '#10b981', marginBottom: '20px'}}><ShieldCheck size={80} /></div>
        <h1 style={{marginBottom: '20px'}}>Đặt Hàng Thành Công!</h1>
        <p style={{marginBottom: '30px', color: '#cbd5e1', fontSize: '1.1rem'}}>
          Cảm ơn bạn đã tin tưởng V-SPORT.<br/>
          {formData.paymentMethod === 'ONLINE' ? 'Hệ thống đã ghi nhận thanh toán của bạn.' : 'Vui lòng thanh toán khi nhận hàng.'}
        </p>
        <Link to="/shop" className="btn btn-primary">Tiếp tục mua sắm</Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page container animate-fade-in" style={{textAlign: 'center'}}>
        <h2>Giỏ hàng trống</h2>
        <p style={{margin: '20px 0'}}>Bạn chưa có sản phẩm nào để thanh toán.</p>
        <Link to="/shop" className="btn btn-primary">Khám phá cửa hàng</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page container animate-fade-in">
      <h1 className="section-title" style={{marginBottom: '10px'}}>Thanh Toán Đơn Hàng</h1>
      <p style={{textAlign: 'center', color: '#94a3b8', marginBottom: '30px'}}><ShieldCheck size={18} style={{verticalAlign: 'middle'}} /> An toàn & Bảo mật tuyệt đối</p>

      <form onSubmit={handlePlaceOrder} className="checkout-grid">
        <div className="checkout-left">
          <div className="checkout-card" style={{marginBottom: '25px'}}>
            <h2><Truck size={24} /> Thông tin giao hàng</h2>
            <div className="checkout-form-group">
              <label>Họ và tên người nhận</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="checkout-form-group">
              <label>Số điện thoại</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="checkout-form-group">
              <label>Địa chỉ nhận hàng (Chi tiết số nhà, đường, phường/xã, quận/huyện, tỉnh/TP)</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="checkout-form-group">
              <label>Ghi chú đơn hàng (Tùy chọn)</label>
              <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} placeholder="VD: Giao hàng vào giờ hành chính..."></textarea>
            </div>
          </div>

          <div className="checkout-card">
            <h2><CreditCard size={24} /> Phương thức thanh toán</h2>
            <div className="payment-methods">
              <label className={`payment-method-option ${formData.paymentMethod === 'COD' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="COD" 
                  checked={formData.paymentMethod === 'COD'}
                  onChange={handleChange}
                />
                <span className="payment-method-icon">🚚</span>
                <div>
                  <strong style={{color: '#fff', display: 'block'}}>Thanh toán khi nhận hàng (COD)</strong>
                  <span style={{fontSize: '0.85rem', color: '#94a3b8'}}>Thanh toán bằng tiền mặt khi hàng được giao đến.</span>
                </div>
              </label>

              <label className={`payment-method-option ${formData.paymentMethod === 'ONLINE' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="ONLINE" 
                  checked={formData.paymentMethod === 'ONLINE'}
                  onChange={handleChange}
                />
                <span className="payment-method-icon">💳</span>
                <div>
                  <strong style={{color: '#fff', display: 'block'}}>Chuyển khoản Ngân hàng / Momo</strong>
                  <span style={{fontSize: '0.85rem', color: '#94a3b8'}}>Quét mã QR để thanh toán tiện lợi và an toàn.</span>
                </div>
              </label>
            </div>

            {formData.paymentMethod === 'ONLINE' && (
              <div className="qr-code-container">
                <h3 style={{color: '#fff', marginBottom: '15px'}}>Quét mã để thanh toán</h3>
                {/* QR Code giả lập - thay bằng link thật nếu có */}
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DEMO-PAYMENT-VSPORT" alt="QR Code" className="qr-code-img" />
                <div className="bank-details">
                  <p><strong>Ngân hàng:</strong> Vietcombank</p>
                  <p><strong>Số tài khoản:</strong> 0123456789</p>
                  <p><strong>Chủ tài khoản:</strong> CTY V-SPORT</p>
                  <p><strong>Nội dung CK:</strong> TT DH {user?.phone}</p>
                </div>
                <p style={{color: '#10b981', marginTop: '15px', fontSize: '0.9rem'}}>
                  <ShieldCheck size={16} style={{verticalAlign: 'middle', marginRight: '5px'}}/>
                  Đơn hàng sẽ tự động xác nhận sau khi chuyển khoản thành công.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="checkout-right">
          <div className="checkout-card sticky-card" style={{position: 'sticky', top: '100px'}}>
            <h2>Tóm tắt đơn hàng</h2>
            <div className="order-summary-items" style={{maxHeight: '300px', overflowY: 'auto', marginBottom: '20px'}}>
              {cartItems.map(item => (
                <div key={item.id} className="order-summary-item">
                  <img src={getImageUrl(item.imageUrl)} alt={item.name} className="summary-item-img" />
                  <div className="summary-item-info">
                    <div className="summary-item-title">{item.name}</div>
                    <div className="summary-item-qty">Số lượng: {item.quantity}</div>
                  </div>
                  <div className="summary-item-price">{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Tạm tính:</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="total-row">
                <span>Phí giao hàng:</span>
                <span style={{color: '#10b981'}}>Miễn phí</span>
              </div>
              <div className="total-row grand-total">
                <span>Tổng cộng:</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '20px', padding: '15px'}} disabled={isSubmitting}>
              {isSubmitting ? 'Đang xử lý...' : (formData.paymentMethod === 'ONLINE' ? 'Tôi Đã Thanh Toán' : 'Hoàn Tất Đặt Hàng')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
