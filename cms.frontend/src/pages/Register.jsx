import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    gender: 'Nam',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://localhost:7003/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth : null,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại. Vui lòng thử lại.');
      }

      login(data.user);
      showToast({
        type: 'success',
        title: 'Đăng ký thành công',
        message: 'Chào mừng bạn đến với V-SPORT.',
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-container auth-container-wide">
        <div className="auth-header">
          <h1>Đăng Ký Tài Khoản</h1>
          <p>Tạo tài khoản V-SPORT để mua hàng nhanh và nhận ưu đãi thành viên.</p>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Họ và tên *</label>
            <input
              type="text"
              name="fullName"
              placeholder="Nhập họ và tên đầy đủ"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Nhập địa chỉ email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="auth-form-grid auth-form-grid-2">
            <div className="form-group">
              <label>Giới tính</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div className="form-group">
              <label>Ngày sinh</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Địa chỉ nhận hàng</label>
            <input
              type="text"
              name="address"
              placeholder="Nhập địa chỉ giao hàng"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="auth-form-grid auth-form-grid-2">
            <div className="form-group">
              <label>Mật khẩu *</label>
              <input
                type="password"
                name="password"
                placeholder="Tạo mật khẩu"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Xác nhận mật khẩu *</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                required
                minLength={6}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn-auth" disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : 'Hoàn Tất Đăng Ký'}
          </button>
        </form>

        <div className="auth-footer">
          Đã có tài khoản?
          <Link to="/login" className="auth-link">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
