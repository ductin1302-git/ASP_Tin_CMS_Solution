import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CreditCard, RotateCcw, ShieldCheck, ShoppingCart, Star, Truck } from 'lucide-react';
import { formatPrice } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const API_BASE_URL = 'https://localhost:7003';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState('');

  const getImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop';
    if (url.startsWith('http')) return url;
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
            throw new Error('San pham khong ton tai.');
          }
          throw new Error('Khong the tai thong tin san pham.');
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
  const categoryName = product?.categoryProduct?.name || product?.category || 'San pham';

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
        message: 'Vui long dang nhap truoc khi them vao gio hang hoac mua san pham.',
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
      alert('San pham nay hien da het hang.');
      return;
    }

    addToCart(product, quantity);
    alert(`Da them ${quantity} san pham "${product.name}" vao gio hang.`);
  };

  const handleBuyNow = () => {
    if (requireLogin()) return;
    if (stockQuantity <= 0) {
      alert('San pham nay hien da het hang.');
      return;
    }

    addToCart(product, quantity);
    navigate('/cart');
  };

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Dang tai thong tin san pham...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center', color: 'var(--sport-red-hover)' }}>
        <h2>Loi: {error}</h2>
        <button className="btn btn-outline" onClick={() => navigate('/shop')}>Quay lai cua hang</button>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="product-detail-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Trang chu</Link>
          <span className="separator">/</span>
          <Link to="/shop">Cua hang</Link>
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
                  <span className="review-count">(42 danh gia)</span>
                </div>
                <span className="sku">Ma SP: VS-{String(product.id).padStart(4, '0')}</span>
              </div>
            </div>

            <div className="product-price-large">{formatPrice(product.price)}</div>

            <div className="product-status">
              {stockQuantity > 0 ? (
                <span className="status-in-stock">
                  <span className="status-dot"></span>
                  Con hang ({stockQuantity} san pham san co)
                </span>
              ) : (
                <span className="status-out-stock">
                  <span className="status-dot"></span>
                  Het hang
                </span>
              )}
            </div>

            {!user && (
              <div className="product-login-note">
                Ban can dang nhap truoc khi them vao gio hang hoac mua ngay.
              </div>
            )}

            <div className="quick-benefits">
              <div className="benefit-item">
                <Truck size={20} className="benefit-icon" />
                <span>Giao hang toan quoc</span>
              </div>
              <div className="benefit-item">
                <ShieldCheck size={20} className="benefit-icon" />
                <span>Cam ket chinh hang 100%</span>
              </div>
              <div className="benefit-item">
                <RotateCcw size={20} className="benefit-icon" />
                <span>Doi tra trong vong 7 ngay</span>
              </div>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <button className="qty-btn" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
                <input type="text" className="qty-input" value={quantity} readOnly />
                <button className="qty-btn" onClick={() => handleQuantityChange(1)} disabled={stockQuantity <= quantity}>+</button>
              </div>
              <button className="btn-add-cart" onClick={handleAddToCart} disabled={stockQuantity === 0}>
                <ShoppingCart size={20} /> Them vao gio
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
              Mo ta san pham
            </button>
            <button className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`} onClick={() => setActiveTab('shipping')}>
              Van chuyen & Doi tra
            </button>
            <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
              Danh gia (42)
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-pane animate-fade-in">
                <h3>Chi tiet san pham</h3>
                <p>
                  {product.description || 'San pham nay hien chua co mo ta chi tiet. Vui long lien he bo phan ho tro khach hang de biet them thong tin.'}
                </p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="tab-pane animate-fade-in">
                <h3>Chinh sach van chuyen</h3>
                <ul>
                  <li>Giao hang tieu chuan: 2-4 ngay lam viec.</li>
                  <li>Giao hang hoa toc trong ngay tai khu vuc ho tro.</li>
                  <li>Mien phi giao hang cho don hang tren 1.000.000 VND.</li>
                </ul>
                <h3>Chinh sach doi tra</h3>
                <ul>
                  <li>Doi tra mien phi trong 7 ngay neu san pham co loi tu nha san xuat.</li>
                  <li>San pham doi tra can con tem mac, hop va chua qua su dung.</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-pane animate-fade-in product-review-empty">
                <Star size={48} color="#d1d5db" />
                <p>Chua co danh gia chi tiet nao. Hay la nguoi dau tien danh gia san pham nay.</p>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <div className="related-products-header">
              <span className="home-section-kicker">Goi y cho ban</span>
              <h2 className="section-title">San pham lien quan</h2>
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
