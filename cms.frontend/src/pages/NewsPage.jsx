import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import './NewsPage.css';
import { API_BASE_URL } from '../config/api';

const SPORTS_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop';

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageUrl = (url) => {
    if (!url) return SPORTS_IMAGE_FALLBACK;
    if (url.startsWith('http')) return url;
    if (url.startsWith('/images/')) return url;
    if (url.startsWith('/img/')) return SPORTS_IMAGE_FALLBACK;
    return `${API_BASE_URL}${url}`;
  };

  useEffect(() => {
    // Kết nối tới Backend (Cổng 7003)
    fetch(`${API_BASE_URL}/api/posts`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Lỗi khi tải dữ liệu từ máy chủ');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container" style={{padding: '100px 0', textAlign: 'center'}}>Đang tải tin tức...</div>;
  if (error) return <div className="container" style={{padding: '100px 0', textAlign: 'center', color: 'red'}}>Lỗi: {error}</div>;

  return (
    <>
      {/* Banner Ưu Đãi Full Width */}
      <div className="news-banner-full" style={{ width: '100%', overflow: 'hidden' }}>
        <img 
          src="/images/tintuc.png" 
          alt="Tin Tức Thể Thao" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
      </div>

      <div className="news-page container" style={{ paddingTop: '3rem' }}>
        <div className="section-header">
          <h1 className="section-title">Tin Tức Thể Thao</h1>
        </div>
      
      <div className="news-grid">
        {posts.length === 0 ? (
          <p>Chưa có bài viết nào.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="news-card animate-fade-in">
              <div className="news-image-container">
                <Link to={`/news/${post.id}`}>
                  {/* Sử dụng getImageUrl để nối URL backend */}
                  <img 
                    src={getImageUrl(post.imageUrl)} 
                    alt={post.title} 
                    className="news-image"
                    onError={(e) => { e.target.src = SPORTS_IMAGE_FALLBACK }} 
                  />
                </Link>
                {post.categoryName && <span className="badge news-badge">{post.categoryName}</span>}
              </div>
              <div className="news-content">
                <div className="news-meta">
                  <span className="meta-item"><Calendar size={14} /> {new Date(post.createdDate).toLocaleDateString('vi-VN')}</span>
                  {post.categoryName && <span className="meta-item"><Tag size={14} /> {post.categoryName}</span>}
                </div>
                <Link to={`/news/${post.id}`}>
                  <h3 className="news-title">{post.title}</h3>
                </Link>
                <Link to={`/news/${post.id}`} className="read-more">
                  Đọc tiếp <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default NewsPage;
