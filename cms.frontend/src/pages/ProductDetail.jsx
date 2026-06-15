import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, CreditCard, ArrowLeft, ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';
import { formatPrice } from '../data/mockData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const API_BASE_URL = 'https://localhost:7003';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState('');

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
        
        const imageUrl = getImageUrl(data.imageUrl);
        setMainImage(imageUrl);

        // Fetch related products
        if (data.categoryId) {
          const resRelated = await fetch(`https://localhost:7003/api/Products?categoryId=${data.categoryId}`);
          if (resRelated.ok) {
            const relatedData = await resRelated.json();
            // Filter out current product and take 4
            setRelatedProducts(relatedData.filter(p => p.id !== data.id).slice(0, 4));
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
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

  // Mock multiple images for gallery effect
  const galleryImages = [
    getImageUrl(product.imageUrl),
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584735174965-48c48d7cdfde?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop'
  ];

  return (
    <div className="product-detail-page bg-gray-50">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span className="separator">/</span>
          <Link to="/shop">Cửa hàng</Link>
          <span className="separator">/</span>
          <Link to={`/shop?categoryId=${product.categoryId}`}>{categoryName}</Link>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </nav>

        <div className="product-detail-container animate-fade-in">
          {/* Left Column: Images */}
          <div className="product-image-section">
            <div className="main-image-wrapper">
              <img src={mainImage} alt={product.name} className="product-main-image" />
            </div>
            <div className="gallery-thumbnails">
              {galleryImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail-wrapper ${mainImage === img ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="product-info-section">
            <div className="product-header">
              <span className="product-category-badge">{categoryName}</span>
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-meta">
                <div className="rating">
                  <Star fill="#fbbf24" color="#fbbf24" size={18} />
                  <Star fill="#fbbf24" color="#fbbf24" size={18} />
                  <Star fill="#fbbf24" color="#fbbf24" size={18} />
                  <Star fill="#fbbf24" color="#fbbf24" size={18} />
                  <Star color="#d1d5db" size={18} />
                  <span className="review-count">(42 đánh giá)</span>
                </div>
                <span className="sku">Mã SP: VS-{product.id.toString().padStart(4, '0')}</span>
              </div>
            </div>

            <div className="product-price-large">
              {formatPrice(product.price)}
            </div>

            <div className="product-status">
              {product.stockQuantity > 0 ? (
                <span className="status-in-stock">
                  <span className="status-dot"></span>
                  Còn hàng ({product.stockQuantity} sản phẩm sẵn có)
                </span>
              ) : (
                <span className="status-out-stock">
                  <span className="status-dot"></span>
                  Hết hàng
                </span>
              )}
            </div>

            {/* Quick Benefits */}
            <div className="quick-benefits">
              <div className="benefit-item">
                <Truck size={20} className="benefit-icon" />
                <span>Giao hàng toàn quốc</span>
              </div>
              <div className="benefit-item">
                <ShieldCheck size={20} className="benefit-icon" />
                <span>Cam kết chính hãng 100%</span>
              </div>
              <div className="benefit-item">
                <RotateCcw size={20} className="benefit-icon" />
                <span>Đổi trả trong vòng 7 ngày</span>
              </div>
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
            </div>
            
            <button 
              className="btn-buy-now" 
              onClick={handleBuyNow}
              disabled={product.stockQuantity === 0}
            >
              <CreditCard size={20} /> Mua ngay
            </button>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs-section">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Mô tả sản phẩm
            </button>
            <button 
              className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Vận chuyển & Đổi trả
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Đánh giá (42)
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-pane animate-fade-in">
                <h3>Chi tiết sản phẩm</h3>
                <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#4b5563' }}>
                  {product.description || 'Sản phẩm này hiện chưa có mô tả chi tiết. Vui lòng liên hệ bộ phận hỗ trợ khách hàng để biết thêm thông tin.'}
                </p>
              </div>
            )}
            
            {activeTab === 'shipping' && (
              <div className="tab-pane animate-fade-in">
                <h3>Chính sách vận chuyển</h3>
                <ul style={{ lineHeight: '1.8', color: '#4b5563', paddingLeft: '20px' }}>
                  <li>Giao hàng tiêu chuẩn: 2-4 ngày làm việc.</li>
                  <li>Giao hàng hỏa tốc: Nhận hàng trong ngày (áp dụng tại TP.HCM và Hà Nội).</li>
                  <li>Miễn phí giao hàng cho đơn hàng trên 1.000.000 VNĐ.</li>
                </ul>
                <h3 style={{ marginTop: '20px' }}>Chính sách đổi trả</h3>
                <ul style={{ lineHeight: '1.8', color: '#4b5563', paddingLeft: '20px' }}>
                  <li>Đổi trả miễn phí trong vòng 7 ngày nếu sản phẩm có lỗi từ nhà sản xuất.</li>
                  <li>Sản phẩm đổi trả phải còn nguyên tem mác, hộp và chưa qua sử dụng.</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-pane animate-fade-in">
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
                  <Star size={48} color="#d1d5db" style={{ margin: '0 auto 15px' }} />
                  <p>Chưa có đánh giá chi tiết nào. Hãy là người đầu tiên đánh giá sản phẩm này!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="section-title">Sản Phẩm Cùng Danh Mục</h2>
            <div className="grid grid-cols-4">
              {relatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
