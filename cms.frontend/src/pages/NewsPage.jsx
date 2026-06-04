import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import './NewsPage.css';

const API_BASE_URL = 'https://localhost:7003';

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  useEffect(() => {
    // Kết nối tới Backend (Cổng 7003)
    fetch('https://localhost:7003/api/posts')
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
    <div className="news-page container">
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
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop' }} 
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
  );
};

export default NewsPage;
