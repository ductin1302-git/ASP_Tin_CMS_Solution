import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mảng ảnh mẫu để minh họa cho danh mục (vì backend chưa lưu URL ảnh cho danh mục)
  const categoryImages = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop', // Giày chạy bộ
    'https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=800&auto=format&fit=crop', // Tất
    'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop', // Quần áo
    'https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=800&auto=format&fit=crop', // Phụ kiện
    'https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=800&auto=format&fit=crop', // Bóng rổ
    'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop'
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://localhost:7003/api/CategoriesProducts');
        if (!response.ok) {
          throw new Error('Không thể tải danh sách danh mục.');
        }
        const data = await response.json();
        
        // Gán ảnh minh họa cho các danh mục
        const enrichedCategories = data.map((cat, index) => ({
          ...cat,
          image: categoryImages[index % categoryImages.length]
        }));
        
        setCategories(enrichedCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="categories-page container" style={{textAlign: 'center', paddingTop: '100px'}}>
        <h2>Đang tải danh mục...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="categories-page container" style={{textAlign: 'center', paddingTop: '100px', color: 'red'}}>
        <h2>Lỗi: {error}</h2>
      </div>
    );
  }

  return (
    <div className="categories-page container animate-fade-in">
      <div className="section-header">
        <h1 className="section-title">Khám Phá Danh Mục</h1>
        <p style={{color: 'var(--text-light)', marginTop: '10px'}}>
          Tìm kiếm sản phẩm dễ dàng hơn qua các bộ sưu tập của chúng tôi
        </p>
      </div>

      <div className="categories-grid-large">
        {categories.map((category) => (
          <Link 
            to={`/shop?categoryId=${category.id}`} 
            key={category.id} 
            className="category-card-large"
          >
            <img src={category.image} alt={category.name} />
            <div className="category-overlay">
              <h3>{category.name}</h3>
              <p>Xem sản phẩm <ArrowRight size={16} /></p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
