import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7003/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        showToast({
          type: 'success',
          title: 'Đã gửi tin nhắn',
          message: 'V-SPORT sẽ phản hồi bạn sớm nhất.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        showToast({
          type: 'error',
          title: 'Không gửi được tin nhắn',
          message: 'Vui lòng thử lại sau.',
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      showToast({
        type: 'error',
        title: 'Không thể kết nối máy chủ',
        message: 'Kiểm tra backend rồi thử lại.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page container animate-fade-in">
      <div className="contact-header text-center">
        <h1>Liên Hệ Với Chúng Tôi</h1>
        <p>V-SPORT luôn sẵn sàng lắng nghe ý kiến phản hồi và hỗ trợ mọi nhu cầu của bạn.</p>
      </div>

      <div className="contact-grid">
        {/* Contact Info Column */}
        <div className="contact-info">
          <h2>Thông Tin Liên Hệ</h2>
          <p className="contact-desc">Hãy liên hệ với chúng tôi qua các kênh dưới đây hoặc để lại tin nhắn trong biểu mẫu bên cạnh.</p>
          
          <div className="info-items">
            <div className="info-item">
              <div className="info-icon"><MapPin size={22} /></div>
              <div className="info-text">
                <h3>Địa chỉ cửa hàng</h3>
                <p>123 Đường Nguyễn Trãi, Phường 5, Quận 5, TP. Hồ Chí Minh</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><Phone size={22} /></div>
              <div className="info-text">
                <h3>Số điện thoại</h3>
                <p>0912 345 678 (Hotline)</p>
                <p>028 3838 3939 (Văn phòng)</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><Mail size={22} /></div>
              <div className="info-text">
                <h3>Email hỗ trợ</h3>
                <p>support@v-sport.com.vn</p>
                <p>info@v-sport.com.vn</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><Clock size={22} /></div>
              <div className="info-text">
                <h3>Thời gian làm việc</h3>
                <p>Thứ 2 - Chủ Nhật: 08:00 - 22:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="contact-form-container">
          <h2>Gửi Tin Nhắn</h2>
          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">🎉</div>
              <h3>Gửi tin nhắn thành công!</h3>
              <p>Cảm ơn bạn đã liên hệ. Đội ngũ CSKH của V-SPORT sẽ phản hồi bạn trong thời gian sớm nhất (thường trong vòng 24 giờ).</p>
              <button onClick={() => setIsSubmitted(false)} className="btn btn-primary">Gửi tin nhắn khác</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Họ và Tên *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên" 
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại" 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Tiêu đề *</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Tiêu đề lời nhắn" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Lời nhắn *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Nhập nội dung tin nhắn của bạn..." 
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-accent submit-btn" disabled={loading}>
                {loading ? 'Đang gửi...' : (
                  <>
                    Gửi Liên Hệ <Send size={18} style={{marginLeft: '8px'}} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Map Block */}
      <div className="map-container">
        <iframe 
          title="Google Map V-SPORT Store"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6697269707224!2d106.680063!3d10.75992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919.6697269707224!2zMTIzIMSQxrDhu51uZyBOZ3V54buFbiBUcsOjaSwgUGjGsOG7nW5nIDUsIFF14bqtbiA1LCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
          width="100%" 
          height="400" 
          style={{border: 0, borderRadius: '12px'}} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
