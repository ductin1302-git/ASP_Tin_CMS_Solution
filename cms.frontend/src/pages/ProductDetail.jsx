import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, CreditCard, ArrowLeft } from 'lucide-react';
import { formatPrice } from '../data/mockData';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const API_BASE_URL = 'https://localhost:7003';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://localhost:7003/api/Products/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Sản phẩm không tồn tại!');
          }
          throw new Error('Có lỗi xảy ra khi lấy dữ liệu sản phẩm.');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const getImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && (!product || newQty <= product.stockQuantity)) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (isLoading) return <div className="container" style={{padding: '100px 0', textAlign: 'center'}}><h2>Đang tải thông tin sản phẩm...</h2></div>;
  if (error) return <div className="container" style={{padding: '100px 0', textAlign: 'center', color: 'red'}}><h2>Lỗi: {error}</h2><button className="btn btn-outline" onClick={() => navigate('/shop')}>Quay lại cửa hàng</button></div>;
  if (!product) return null;

  const categoryName = product.categoryProduct?.name || 'Sản phẩm';

  return (
    <div className="product-detail-page container animate-fade-in">
      <button className="btn btn-outline mb-4" onClick={() => navigate(-1)} style={{display: 'inline-flex', alignItems: 'center', gap: '8px', border: 'none'}}>
        <ArrowLeft size={20} /> Quay lại
      </button>

      <div className="product-detail-container">
        <div className="product-image-section">
          <img 
            src={getImageUrl(product.imageUrl)} 
            alt={product.name} 
            className="product-main-image" 
          />
        </div>

        <div className="product-info-section">
          <span className="product-category-badge">{categoryName}</span>
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price-large">
            {formatPrice(product.price)}
          </div>

          <div className="product-status">
            Trạng thái: 
            {product.stockQuantity > 0 ? (
              <span className="status-in-stock">Còn hàng ({product.stockQuantity} sản phẩm)</span>
            ) : (
              <span className="status-out-stock">Hết hàng</span>
            )}
          </div>

          <div className="product-description-box">
            <h3>Mô tả sản phẩm</h3>
            <p>{product.description || 'Chưa có mô tả cho sản phẩm này.'}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button className="qty-btn" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
              <input type="text" className="qty-input" value={quantity} readOnly />
              <button className="qty-btn" onClick={() => handleQuantityChange(1)} disabled={product.stockQuantity <= quantity}>+</button>
            </div>
            <button 
              className="btn-add-cart" 
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
            >
              <ShoppingCart size={20} /> Thêm vào giỏ
            </button>
            <button 
              className="btn-buy-now" 
              onClick={handleBuyNow}
              disabled={product.stockQuantity === 0}
            >
              <CreditCard size={20} /> Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
