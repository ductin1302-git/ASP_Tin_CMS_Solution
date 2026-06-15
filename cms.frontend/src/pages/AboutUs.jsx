import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page container animate-fade-in">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>Về V-SPORT</h1>
          <p className="hero-tagline">Nâng tầm sức mạnh - Bứt phá mọi giới hạn</p>
        </div>
      </div>

      <section className="about-section">
        <div className="about-grid">
          <div className="about-text">
            <h2>Câu Chuyện Của Chúng Tôi</h2>
            <p>
              Được thành lập từ năm 2026, V-SPORT bắt nguồn từ niềm đam mê cháy bỏng với thể thao và mong muốn mang lại những trang thiết bị tập luyện chất lượng nhất cho cộng đồng yêu vận động tại Việt Nam.
            </p>
            <p>
              Chúng tôi tin rằng thể thao không chỉ là việc rèn luyện sức khỏe, mà còn là một phong cách sống, một hành trình khám phá và vượt qua những giới hạn của bản thân.
            </p>
            <p>
              Tại V-SPORT, mỗi sản phẩm từ giày chạy, quần áo đến phụ kiện thể thao đều được lựa chọn kỹ lưỡng, đảm bảo tính năng tối ưu và thiết kế thời thượng để bạn tự tin bứt phá trên mọi đường đua.
            </p>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop" 
              alt="Phong cách thể thao V-SPORT" 
              className="rounded-img"
            />
          </div>
        </div>
      </section>

      <section className="values-section">
        <h2 className="section-subtitle-custom">Giá Trị Cốt Lõi</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🏅</div>
            <h3>Chất Lượng Hàng Đầu</h3>
            <p>Cam kết cung cấp sản phẩm chính hãng, chất liệu cao cấp và bền bỉ trong mọi điều kiện luyện tập.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">⚡</div>
            <h3>Trải Nghiệm Vượt Trội</h3>
            <p>Luôn đặt sự hài lòng của khách hàng lên hàng đầu từ dịch vụ tư vấn đến chính sách hậu mãi và giao hàng nhanh chóng.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Đồng Hành Cùng Cộng Đồng</h3>
            <p>Không chỉ là một cửa hàng, V-SPORT muốn xây dựng và phát triển một cộng đồng thể thao Việt Nam năng động và khỏe mạnh.</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Khách hàng tin dùng</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Sản phẩm chuyên nghiệp</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Chính hãng & bảo hành</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
