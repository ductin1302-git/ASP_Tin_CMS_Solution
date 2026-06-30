import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, ShoppingCart } from 'lucide-react';
import { formatPrice } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import './ProductCard.css';
import { API_BASE_URL } from '../config/api';

const PRODUCT_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { showToast, showCartToast } = useToast();

  const getImageUrl = (url) => {
    if (!url) return PRODUCT_IMAGE_FALLBACK;
    if (url.startsWith('http')) return url;
    if (url.startsWith('/images/')) return url;
    if (url.startsWith('/img/')) return PRODUCT_IMAGE_FALLBACK;
    return `${API_BASE_URL}${url}`;
  };

  const categoryName = product.categoryProduct?.name || product.category || 'Sản phẩm';
  const stockQuantity = product.stockQuantity ?? product.stock ?? 0;
  const cleanDescription = product.description
    ? product.description.replace(/<[^>]*>/g, '').trim()
    : '';

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login', {
        state: {
          from: `${location.pathname}${location.search}`,
          message: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.',
        },
      });
      return;
    }

    if (stockQuantity <= 0) {
      showToast({
        type: 'error',
        title: 'Sản phẩm đã hết hàng',
        message: product.name,
      });
      return;
    }

    addToCart(product, 1);
    showCartToast(product.name, 1);
  };

  return (
    <div className="product-card animate-fade-in">
      <div className="product-image-container">
        {product.isNew && <span className="badge new-badge">Mới</span>}
        <Link to={`/product/${product.id}`}>
          <img
            src={getImageUrl(product.imageUrl || product.image)}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
        </Link>
        <button
          type="button"
          className="add-to-cart-overlay"
          aria-label="Thêm vào giỏ hàng"
          onClick={handleAddToCart}
          disabled={stockQuantity <= 0}
        >
          <ShoppingCart size={20} />
          <span>{stockQuantity > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}</span>
        </button>
      </div>

      <div className="product-info">
        <span className="product-category">{categoryName}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <p className="product-excerpt">
          {cleanDescription || 'Sản phẩm thể thao được chọn lọc cho phong cách năng động.'}
        </p>
        <div className="product-card-meta">
          <span><Package size={14} /> {stockQuantity > 0 ? `Còn ${stockQuantity}` : 'Hết hàng'}</span>
          <span>VS-{String(product.id).padStart(4, '0')}</span>
        </div>
        <div className="product-bottom">
          <span className="product-price">{formatPrice(product.price)}</span>
          <Link to={`/product/${product.id}`} className="product-detail-link">
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
