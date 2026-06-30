import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import './NewsDetail.css';
import { API_BASE_URL } from '../config/api';

const SPORTS_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/Posts/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Bài viết không tồn tại!');
          }
          throw new Error('Có lỗi xảy ra khi lấy dữ liệu bài viết.');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const getImageUrl = (url) => {
    if (!url) return SPORTS_IMAGE_FALLBACK;
    if (url.startsWith('http')) return url;
    if (url.startsWith('/images/')) return url;
    if (url.startsWith('/img/')) return SPORTS_IMAGE_FALLBACK;
    return `${API_BASE_URL}${url}`;
  };

  if (isLoading) return <div className="container" style={{padding: '100px 0', textAlign: 'center'}}><h2>Đang tải bài viết...</h2></div>;
  if (error) return <div className="container" style={{padding: '100px 0', textAlign: 'center', color: 'red'}}><h2>Lỗi: {error}</h2><button className="btn btn-outline" onClick={() => navigate('/news')}>Quay lại danh sách</button></div>;
  if (!post) return null;

  return (
    <div className="news-detail-page container animate-fade-in">
      <button className="btn btn-outline mb-4" onClick={() => navigate('/news')} style={{display: 'inline-flex', alignItems: 'center', gap: '8px', border: 'none'}}>
        <ArrowLeft size={20} /> Danh sách tin tức
      </button>

      <div className="news-detail-container">
        <div className="news-detail-header">
          <h1 className="news-detail-title">{post.title}</h1>
          <div className="news-detail-meta">
            <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
              <Calendar size={16} /> {new Date(post.createdDate).toLocaleDateString('vi-VN')}
            </span>
          </div>
        </div>

        <div className="news-detail-image-container">
          <img 
            src={getImageUrl(post.imageUrl)} 
            alt={post.title} 
            className="news-detail-image" 
            onError={(e) => { e.target.src = SPORTS_IMAGE_FALLBACK }} 
          />
        </div>

        {/* Nội dung bài viết hiển thị trực tiếp từ HTML lưu trong DB */}
        <div 
          className="news-detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};

export default NewsDetail;
