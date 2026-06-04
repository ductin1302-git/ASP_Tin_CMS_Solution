import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { formatPrice } from '../data/mockData';
import './ProductCard.css';

const API_BASE_URL = 'https://localhost:7003';

const ProductCard = ({ product }) => {
  // Lấy đường dẫn ảnh, nếu không có thì dùng ảnh mặc định
  const getImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  const categoryName = product.categoryProduct?.name || product.category || 'Sản phẩm';

  return (
    <div className="product-card animate-fade-in">
      <div className="product-image-container">
        {product.isNew && <span className="badge new-badge">MỚI</span>}
        <Link to={`/product/${product.id}`}>
          <img src={getImageUrl(product.imageUrl || product.image)} alt={product.name} className="product-image" loading="lazy" />
        </Link>
        <button className="add-to-cart-overlay" aria-label="Add to cart">
          <ShoppingCart size={20} />
          <span>Thêm vào giỏ</span>
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">{categoryName}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <div className="product-bottom">
          <span className="product-price">{formatPrice(product.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
