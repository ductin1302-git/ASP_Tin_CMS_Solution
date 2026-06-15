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
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-dark)'}}>Xin chào, {user.fullName}</span>
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
