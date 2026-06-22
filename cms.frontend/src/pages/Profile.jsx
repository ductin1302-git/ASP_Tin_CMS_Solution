import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, ChevronDown, ChevronUp, Save, Clock, CheckCircle, Truck, PackageOpen, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('settings');
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    dateOfBirth: '',
    password: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Khởi tạo form data từ user hiện tại
    setFormData({
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      gender: user.gender || 'Nam',
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
      password: '' // Không hiện password cũ
    });

    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [user, activeTab, navigate]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`https://localhost:7003/api/Orders/Customer/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Lỗi khi tải đơn hàng", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // API yêu cầu gửi toàn bộ đối tượng Customer
      const updateData = {
        id: user.id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth : null,
        password: formData.password || "" // Mật khẩu rỗng sẽ được API giữ nguyên mật khẩu cũ
      };

      const res = await fetch(`https://localhost:7003/api/Customers/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' });
        // Cập nhật lại context user
        login({ ...user, fullName: updateData.fullName, email: updateData.email, phone: updateData.phone, address: updateData.address, gender: updateData.gender, dateOfBirth: updateData.dateOfBirth });
        setFormData({ ...formData, password: '' });
      } else {
        const errorData = await res.json();
        setMessage({ type: 'error', text: errorData.message || 'Cập nhật thất bại. Vui lòng kiểm tra lại.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Không thể kết nối đến máy chủ.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOrder = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 0: return <span className="order-status status-0"><Clock size={16} /> Chờ duyệt</span>;
      case 1: return <span className="order-status status-1"><Truck size={16} /> Đang giao</span>;
      case 2: return <span className="order-status status-2"><CheckCircle size={16} /> Đã xong</span>;
      default: return <span className="order-status">Không rõ</span>;
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch(`https://localhost:7003/api/Customers/${user.id}/avatar`, {
        method: 'POST',
        body: uploadData
      });

      if (res.ok) {
        const data = await res.json();
        login({ ...user, avatarUrl: data.avatarUrl });
        setMessage({ type: 'success', text: 'Cập nhật ảnh đại diện thành công!' });
      } else {
        setMessage({ type: 'error', text: 'Cập nhật ảnh đại diện thất bại.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Lỗi kết nối khi tải ảnh lên.' });
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!user) return null;

  return (
    <div className="page-wrapper">
      {/* Page Banner */}
      <div className="page-banner-profile">
        <h1>Tài Khoản Của Tôi</h1>
        <p>Quản lý thông tin cá nhân và theo dõi đơn hàng</p>
      </div>

      <div className="profile-container">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-avatar-section">
            <div className="profile-avatar-container" onClick={() => fileInputRef.current?.click()} title="Thay đổi ảnh đại diện">
              {user.avatarUrl ? (
                <img src={`https://localhost:7003${user.avatarUrl}`} alt="Avatar" className="profile-avatar-img" />
              ) : (
                <div className="profile-avatar">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <div className="avatar-overlay">
                <Camera size={24} color="#fff" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept="image/*" 
                onChange={handleAvatarChange} 
              />
              {isUploadingAvatar && <div className="avatar-loading">Đang tải...</div>}
            </div>
            <div className="profile-name">{user.fullName}</div>
            <div className="profile-email">{user.email}</div>
          </div>
          
          <nav className="profile-nav">
            <button 
              className={`profile-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <User size={20} /> Hồ sơ cá nhân
            </button>
            <button 
              className={`profile-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <Package size={20} /> Đơn hàng của tôi
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="profile-content">
          {activeTab === 'settings' && (
            <div className="settings-section">
              <h2><User size={24} color="var(--primary-color)" /> Thông tin cá nhân</h2>
              
              {message && (
                <div style={{
                  padding: '12px 16px', 
                  borderRadius: '8px', 
                  marginBottom: '20px',
                  background: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                  color: message.type === 'success' ? '#065f46' : '#991b1b',
                  fontWeight: '500'
                }}>
                  {message.text}
                </div>
              )}

              <form className="profile-form" onSubmit={handleUpdateProfile}>
                <div className="form-group">
                  <label>Họ và tên</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Email (Tài khoản)</label>
                  <input type="email" name="email" value={formData.email} disabled title="Không thể thay đổi email" />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Mật khẩu mới (Để trống nếu không đổi)</label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label>Địa chỉ giao hàng</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Giới tính</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Ngày sinh</label>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                </div>
                
                <button type="submit" className="btn-update" disabled={isLoading}>
                  {isLoading ? 'Đang cập nhật...' : <><Save size={18} style={{marginRight: 6, verticalAlign: 'middle'}}/> Cập nhật hồ sơ</>}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-section">
              <h2><Package size={24} color="var(--primary-color)" /> Lịch sử đặt hàng</h2>
              
              {isLoading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>Đang tải dữ liệu...</div>
              ) : orders.length === 0 ? (
                <div className="empty-orders">
                  <PackageOpen size={48} color="#cbd5e1" style={{ margin: '0 auto 15px' }} />
                  <h3>Bạn chưa có đơn hàng nào</h3>
                  <p>Hãy dạo quanh cửa hàng và chọn cho mình những sản phẩm thể thao ưng ý nhé!</p>
                  <button onClick={() => navigate('/shop')} className="btn-update" style={{ margin: '20px auto 0' }}>Mua sắm ngay</button>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order.id} className={`order-card ${expandedOrder === order.id ? 'expanded' : ''}`}>
                      <div className="order-header" onClick={() => toggleOrder(order.id)}>
                        <div className="order-info">
                          <div className="order-info-item">
                            <span className="order-info-label">Mã Đơn Hàng</span>
                            <span className="order-info-value">#{order.id}</span>
                          </div>
                          <div className="order-info-item">
                            <span className="order-info-label">Ngày Đặt</span>
                            <span className="order-info-value">{new Date(order.orderDate).toLocaleDateString('vi-VN')}</span>
                          </div>
                          <div className="order-info-item">
                            <span className="order-info-label">Tổng Tiền</span>
                            <span className="order-info-value" style={{color: 'var(--primary-color)'}}>{order.totalAmount.toLocaleString()} ₫</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          {getStatusBadge(order.status)}
                          {expandedOrder === order.id ? <ChevronUp size={20} color="var(--text-muted)"/> : <ChevronDown size={20} color="var(--text-muted)"/>}
                        </div>
                      </div>
                      
                      <div className="order-details">
                        <h4 style={{ marginBottom: '15px', color: 'var(--text-dark)', fontSize: '1rem' }}>Chi tiết sản phẩm</h4>
                        {order.orderDetails && order.orderDetails.map((item, index) => (
                          <div key={index} className="order-item">
                            <img 
                              src={item.productImage ? `https://localhost:7003${item.productImage}` : '/placeholder.jpg'} 
                              alt={item.productName} 
                              className="order-item-img" 
                              onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop'; 
                              }}
                            />
                            <div className="order-item-info">
                              <div className="order-item-name">{item.productName || 'Sản phẩm đã bị xóa'}</div>
                              <div className="order-item-qty">Số lượng: {item.quantity} x {item.unitPrice.toLocaleString()} ₫</div>
                            </div>
                            <div className="order-item-price">
                              {item.totalPrice.toLocaleString()} ₫
                            </div>
                          </div>
                        ))}
                        {order.deliveryAddress && (
                          <div style={{ marginTop: '15px', padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <strong style={{color: '#fff'}}>Địa chỉ giao hàng:</strong> {order.deliveryAddress}
                          </div>
                        )}
                        <div style={{ marginTop: '10px', display: 'flex', gap: '20px' }}>
                          <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', fontSize: '0.9rem', color: 'var(--text-muted)', flex: 1 }}>
                            <strong style={{color: '#fff'}}>Thanh toán:</strong> {order.paymentMethod === 'ONLINE' ? 'Chuyển khoản / Momo' : 'Khi nhận hàng (COD)'}
                          </div>
                          <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', fontSize: '0.9rem', color: order.isPaid ? '#10b981' : '#f59e0b', flex: 1 }}>
                            <strong style={{color: '#fff'}}>Trạng thái:</strong> {order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                          </div>
                        </div>
                        {order.notes && (
                          <div style={{ marginTop: '10px', padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <strong style={{color: '#fff'}}>Ghi chú:</strong> {order.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
