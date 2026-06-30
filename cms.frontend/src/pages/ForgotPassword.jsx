import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('email');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const requestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/request-password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Không gửi được mã xác nhận.');

      setMessage(data.message || 'Mã xác nhận đã được gửi đến Email của bạn.');
      setStep('reset');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword.length < 8) {
      setError('Mật khẩu mới phải có tối thiểu 8 ký tự.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Không thể đặt lại mật khẩu.');

      setMessage(data.message || 'Đặt lại mật khẩu thành công.');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Quên Mật Khẩu</h1>
          <p>Nhập Email tài khoản để nhận mã xác nhận đặt lại mật khẩu.</p>
        </div>

        {message && <div className="alert-info">{message}</div>}
        {error && <div className="alert-error">{error}</div>}

        {step === 'email' ? (
          <form className="auth-form" onSubmit={requestOtp}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-auth" disabled={isLoading}>
              {isLoading ? 'Đang gửi...' : 'Gửi mã xác nhận'}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={resetPassword}>
            <div className="form-group">
              <label>Mã OTP</label>
              <input
                type="text"
                placeholder="Nhập mã 6 số"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                placeholder="Tối thiểu 8 ký tự"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Xác nhận mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-auth" disabled={isLoading}>
              {isLoading ? 'Đang cập nhật...' : 'Đặt lại mật khẩu'}
            </button>
          </form>
        )}

        <div className="auth-footer">
          <Link to="/login" className="auth-link">Quay lại đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
