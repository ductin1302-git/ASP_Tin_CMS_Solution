import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container header-container">
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="logo">
          V-SPORT<span>.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`navigation ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Trang Chủ</Link></li>
            <li><Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Cửa Hàng</Link></li>
            <li><Link to="/categories" onClick={() => setIsMobileMenuOpen(false)}>Danh Mục</Link></li>
            <li><Link to="/news" onClick={() => setIsMobileMenuOpen(false)}>Tin Tức</Link></li>
            <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>Giới Thiệu</Link></li>
            <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Liên Hệ</Link></li>
          </ul>
        </nav>

        {/* Action Icons */}
        <div className="header-actions">
          <button className="icon-btn" aria-label="Search">
            <Search size={22} />
          </button>
          {user ? (
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <Link to="/profile" style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none', padding: '6px 12px', borderRadius: '30px', background: 'rgba(255, 107, 0, 0.1)', transition: 'all 0.3s ease'}} className="profile-badge">
                {user.avatarUrl ? (
                  <img src={`https://localhost:7003${user.avatarUrl}`} alt={user.fullName} style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <User size={18} />
                )}
                <span>{user.fullName}</span>
              </Link>
              <button className="icon-btn" onClick={logout} title="Đăng xuất" style={{border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444'}}>
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="icon-btn" aria-label="User Profile">
              <User size={22} />
            </Link>
          )}
          <Link to="/cart" className="icon-btn cart-btn" aria-label="Shopping Cart">
            <ShoppingBag size={22} />
            <span className="cart-count">{getCartCount()}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
