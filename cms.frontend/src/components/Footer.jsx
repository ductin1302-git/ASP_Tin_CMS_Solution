import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Globe, Mail, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <Link to="/" className="footer-logo">
            V-SPORT<span>.</span>
          </Link>
          <p className="footer-desc">
            Cửa hàng đồ thể thao hàng đầu Việt Nam. Nơi bạn tìm thấy đam mê và giới hạn mới của bản thân.
          </p>
          <div className="social-links">
            <a href="https://zalo.me/" aria-label="Zalo" target="_blank" rel="noreferrer"><MessageCircle size={20} /></a>
            <Link to="/" aria-label="Website"><Globe size={20} /></Link>
            <a href="mailto:support@vsport.vn" aria-label="Email"><Mail size={20} /></a>
            <a href="tel:1800877678" aria-label="Phone"><Phone size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Về Chúng Tôi</h4>
          <ul className="footer-links">
            <li><Link to="/about">Giới thiệu V-SPORT</Link></li>
            <li><Link to="/careers">Tuyển dụng</Link></li>
            <li><Link to="/news">Tin tức thể thao</Link></li>
            <li><Link to="/stores">Hệ thống cửa hàng</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Hỗ Trợ Khách Hàng</h4>
          <ul className="footer-links">
            <li><Link to="/faq">Câu hỏi thường gặp</Link></li>
            <li><Link to="/shipping">Chính sách giao hàng</Link></li>
            <li><Link to="/returns">Chính sách đổi trả</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Đăng Ký Nhận Tin</h4>
          <p className="footer-desc">Nhận thông tin về sản phẩm mới và khuyến mãi đặc biệt.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email của bạn" required />
            <button type="submit" className="btn btn-accent">Đăng Ký</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} V-SPORT. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
