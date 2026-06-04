import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper cho ảnh danh mục (Vì BE chưa hỗ trợ upload ảnh danh mục nên dùng ảnh mẫu tạm)
  const categoryImages = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=800&auto=format&fit=crop'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Lấy danh sách sản phẩm và chỉ lấy 4 cái đầu tiên làm nổi bật
        const resProducts = await fetch('https://localhost:7003/api/Products');
        if (resProducts.ok) {
          const dataProducts = await resProducts.json();
          setFeaturedProducts(dataProducts.slice(0, 4));
        }
        
        // Lấy danh mục sản phẩm
        const resCategories = await fetch('https://localhost:7003/api/CategoriesProducts');
        if (resCategories.ok) {
          const dataCategories = await resCategories.json();
          // Ghép thêm ảnh mẫu vào danh mục để hiển thị đẹp
          const enrichedCategories = dataCategories.slice(0, 4).map((cat, index) => ({
            ...cat,
            image: categoryImages[index % categoryImages.length]
          }));
          setCategories(enrichedCategories);
        }
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu trang chủ:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1600&auto=format&fit=crop" 
            alt="Hero Background" 
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content animate-fade-in">
          <span className="hero-subtitle">Bộ sưu tập mới 2026</span>
          <h1 className="hero-title">VƯỢT MỌI GIỚI HẠN.</h1>
          <p className="hero-desc">Khám phá sức mạnh tối đa cùng những mẫu giày chạy chuyên nghiệp nhất.</p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-accent">Mua Ngay</Link>
            <Link to="/categories" className="btn btn-outline" style={{color: 'white', borderColor: 'white'}}>Khám Phá</Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section container">
        <div className="section-header">
          <h2 className="section-title">Danh Mục Nổi Bật</h2>
        </div>
        {isLoading ? (
          <div style={{textAlign: 'center', padding: '20px'}}>Đang tải danh mục...</div>
        ) : (
          <div className="grid grid-cols-4 category-grid">
            {categories.map((category) => (
              <Link to={`/shop?categoryId=${category.id}`} key={category.id} className="category-card">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <h3>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products Section */}
      <section className="featured-section container">
        <div className="section-header">
          <h2 className="section-title">Xu Hướng Mới</h2>
          <Link to="/shop" className="view-all-link">
            Xem tất cả <ArrowRight size={18} />
          </Link>
        </div>
        {isLoading ? (
          <div style={{textAlign: 'center', padding: '20px'}}>Đang tải sản phẩm...</div>
        ) : (
          <div className="grid grid-cols-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Banner Section */}
      <section className="promo-banner container">
        <div className="promo-content">
          <h2>Bứt phá tốc độ cùng V-SPORT</h2>
          <p>Giảm giá lên đến 30% cho thành viên mới.</p>
          <Link to="/register" className="btn btn-primary">Đăng Ký Ngay</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
