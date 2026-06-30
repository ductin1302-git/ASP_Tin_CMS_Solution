import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CreditCard, RotateCcw, ShieldCheck, ShoppingCart, Star, Truck } from 'lucide-react';
import { formatPrice } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';
import { API_BASE_URL } from '../config/api';

const PRODUCT_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { showToast, showCartToast } = useToast();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState('');

  const getImageUrl = (url) => {
    if (!url) return PRODUCT_IMAGE_FALLBACK;
    if (url.startsWith('http')) return url;
    if (url.startsWith('/images/')) return url;
    if (url.startsWith('/img/')) return PRODUCT_IMAGE_FALLBACK;
    return `${API_BASE_URL}${url}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setQuantity(1);

        const response = await fetch(`${API_BASE_URL}/api/Products/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Sản phẩm không tồn tại.');
          }
          throw new Error('Không thể tải thông tin sản phẩm.');
        }

        const data = await response.json();
        setProduct(data);
        setMainImage(getImageUrl(data.imageUrl || data.image));

        const resProducts = await fetch(`${API_BASE_URL}/api/Products`);
        if (resProducts.ok) {
          const allProducts = await resProducts.json();
          const currentCategoryId = data.categoryProductId ?? data.categoryId ?? data.categoryProduct?.id;
          const related = allProducts
            .filter((item) => item.id !== data.id)
            .filter((item) => {
              const itemCategoryId = item.categoryProductId ?? item.categoryId ?? item.categoryProduct?.id;
              return currentCategoryId ? itemCategoryId === currentCategoryId : true;
            })
            .slice(0, 4);

          setRelatedProducts(related.length > 0 ? related : allProducts.filter((item) => item.id !== data.id).slice(0, 4));
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

  const stockQuantity = product?.stockQuantity ?? product?.stock ?? 0;
  const categoryName = product?.categoryProduct?.name || product?.category || 'Sản phẩm';

  const galleryImages = useMemo(() => {
    if (!product) return [];
    return [
      getImageUrl(product.imageUrl || product.image),
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584735174965-48c48d7cdfde?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop',
    ];
  }, [product]);

  const requireLogin = () => {
    if (user) return false;
    navigate('/login', {
      state: {
        from: `${location.pathname}${location.search}`,
        message: 'Vui lòng đăng nhập trước khi thêm vào giỏ hàng hoặc mua sản phẩm.',
      },
    });
    return true;
  };

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= stockQuantity) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    if (requireLogin()) return;
    if (stockQuantity <= 0) {
      showToast({
        type: 'error',
        title: 'Sản phẩm đã hết hàng',
        message: product.name,
      });
      return;
    }
    if (quantity > stockQuantity) {
      showToast({
        type: 'error',
        title: 'Số lượng sản phẩm trong kho không đủ!',
        message: `Sản phẩm này chỉ còn ${stockQuantity} trong kho.`,
      });
      return;
    }

    addToCart(product, quantity);
    showCartToast(product.name, quantity);
  };

  const handleBuyNow = () => {
    if (requireLogin()) return;
    if (stockQuantity <= 0) {
      showToast({
        type: 'error',
        title: 'Sản phẩm đã hết hàng',
        message: product.name,
      });
      return;
    }
    if (quantity > stockQuantity) {
      showToast({
        type: 'error',
        title: 'Số lượng sản phẩm trong kho không đủ!',
        message: `Sản phẩm này chỉ còn ${stockQuantity} trong kho.`,
      });
      return;
    }

    addToCart(product, quantity);
    showCartToast(product.name, quantity);
    navigate('/cart');
  };

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Đang tải thông tin sản phẩm...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center', color: 'var(--sport-red-hover)' }}>
        <h2>Lỗi: {error}</h2>
        <button className="btn btn-outline" onClick={() => navigate('/shop')}>Quay lại cửa hàng</button>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="product-detail-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span className="separator">/</span>
          <Link to="/shop">Cửa hàng</Link>
          <span className="separator">/</span>
          <Link to={`/shop?categoryId=${product.categoryProductId ?? product.categoryId}`}>{categoryName}</Link>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </nav>

        <div className="product-detail-container animate-fade-in">
          <div className="product-image-section">
            <div className="main-image-wrapper">
              <img src={mainImage} alt={product.name} className="product-main-image" />
            </div>
            <div className="gallery-thumbnails">
              {galleryImages.map((img, index) => (
                <button
                  type="button"
                  key={img}
                  className={`thumbnail-wrapper ${mainImage === img ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

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
                <span className="sku">Mã SP: VS-{String(product.id).padStart(4, '0')}</span>
              </div>
            </div>

            <div className="product-price-large">{formatPrice(product.price)}</div>

            <div className="product-status">
              {stockQuantity > 0 ? (
                <span className="status-in-stock">
                  <span className="status-dot"></span>
                  Còn hàng ({stockQuantity} sản phẩm sẵn có)
                </span>
              ) : (
                <span className="status-out-stock">
                  <span className="status-dot"></span>
                  Hết hàng
                </span>
              )}
            </div>

            {!user && (
              <div className="product-login-note">
                Bạn cần đăng nhập trước khi thêm vào giỏ hàng hoặc mua ngay.
              </div>
            )}

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
                <button className="qty-btn" onClick={() => handleQuantityChange(1)} disabled={stockQuantity <= quantity}>+</button>
              </div>
              <button className="btn-add-cart" onClick={handleAddToCart} disabled={stockQuantity === 0}>
                <ShoppingCart size={20} /> Thêm vào giỏ
              </button>
            </div>

            <button className="btn-buy-now" onClick={handleBuyNow} disabled={stockQuantity === 0}>
              <CreditCard size={20} /> Mua ngay
            </button>
          </div>
        </div>

        <div className="product-tabs-section">
          <div className="tabs-header">
            <button className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')}>
              Mô tả sản phẩm
            </button>
            <button className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`} onClick={() => setActiveTab('shipping')}>
              Vận chuyển & Đổi trả
            </button>
            <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
              Đánh giá (42)
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-pane animate-fade-in">
                <h3>Chi tiết sản phẩm</h3>
                <p>
                  {product.description || 'Sản phẩm này hiện chưa có mô tả chi tiết. Vui lòng liên hệ bộ phận hỗ trợ khách hàng để biết thêm thông tin.'}
                </p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="tab-pane animate-fade-in">
                <h3>Chính sách vận chuyển</h3>
                <ul>
                  <li>Giao hàng tiêu chuẩn: 2-4 ngày làm việc.</li>
                  <li>Giao hàng hỏa tốc trong ngày tại khu vực hỗ trợ.</li>
                  <li>Miễn phí giao hàng cho đơn hàng trên 1.000.000 VND.</li>
                </ul>
                <h3>Chính sách đổi trả</h3>
                <ul>
                  <li>Đổi trả miễn phí trong 7 ngày nếu sản phẩm có lỗi từ nhà sản xuất.</li>
                  <li>Sản phẩm đổi trả cần còn tem mác, hộp và chưa qua sử dụng.</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-pane animate-fade-in product-review-empty">
                <Star size={48} color="#d1d5db" />
                <p>Chưa có đánh giá chi tiết nào. Hãy là người đầu tiên đánh giá sản phẩm này.</p>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <div className="related-products-header">
              <span className="home-section-kicker">Gợi ý cho bạn</span>
              <h2 className="section-title">Sản phẩm liên quan</h2>
            </div>
            <div className="grid grid-cols-4">
              {relatedProducts.map((prod) => (
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
