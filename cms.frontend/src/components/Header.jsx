import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';
import { API_BASE_URL } from '../config/api';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
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
          {/* Search Box */}
          <div className={`header-search ${isSearchOpen ? 'open' : ''}`}>
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className={isSearchOpen ? 'visible' : ''}
            />
            <button className="icon-btn" aria-label="Tìm kiếm" onClick={() => {
              if (isSearchOpen && searchQuery.trim()) {
                handleSearch({ key: 'Enter' });
              } else {
                setIsSearchOpen(!isSearchOpen);
              }
            }}>
              <Search size={22} />
            </button>
          </div>

          {user ? (
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <Link to="/profile" style={{display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: '600', textDecoration: 'none', padding: '6px 16px 6px 6px', borderRadius: '40px', background: 'linear-gradient(135deg, #ff6b00, #ff9500)', boxShadow: '0 4px 10px rgba(255, 107, 0, 0.3)', transition: 'transform 0.2s ease', border: '1px solid rgba(255,255,255,0.2)'}} className="profile-badge">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl.startsWith('http') ? user.avatarUrl : `${API_BASE_URL}${user.avatarUrl}`} alt={user.fullName} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white' }} />
                ) : (
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', color: '#ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={18} />
                  </div>
                )}
                <span style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', lineHeight: '1' }} title={user.fullName}>
                  {user.fullName}
                </span>
              </Link>
              <button className="icon-btn" onClick={logout} title="Đăng xuất" style={{border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444'}}>
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="icon-btn" aria-label="Tài khoản">
              <User size={22} />
            </Link>
          )}
          <Link to="/cart" className="icon-btn cart-btn" aria-label="Giỏ hàng">
            <ShoppingBag size={22} />
            <span className="cart-count">{getCartCount()}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
