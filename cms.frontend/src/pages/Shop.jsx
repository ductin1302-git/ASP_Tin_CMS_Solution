import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Search, X } from 'lucide-react';
import { API_BASE_URL, SPORTS_IMAGE_FALLBACK } from '../config/api';
import './Shop.css';

const MAX_PRICE = 50000000;

const Shop = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sortBy, setSortBy] = useState('default');

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const catIdParam = queryParams.get('categoryId');
    const searchParam = queryParams.get('search');

    setActiveCategoryId(catIdParam ? parseInt(catIdParam, 10) : null);
    setSearchQuery(searchParam || '');
  }, [location.search]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resCategories = await fetch(`${API_BASE_URL}/api/CategoriesProducts`);
        if (!resCategories.ok) throw new Error('Không thể tải danh mục sản phẩm');
        setCategories(await resCategories.json());
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (activeCategoryId !== null) params.set('categoryProductId', activeCategoryId);
        if (searchQuery.trim()) params.set('keyword', searchQuery.trim());
        if (maxPrice !== MAX_PRICE) params.set('maxPrice', maxPrice);

        const queryString = params.toString();
        const response = await fetch(`${API_BASE_URL}/api/Products${queryString ? `?${queryString}` : ''}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error('Không thể tải danh sách sản phẩm');
        setProducts(await response.json());
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [activeCategoryId, searchQuery, maxPrice]);

  const processedProducts = useMemo(() => {
    const sortedProducts = [...products];
    if (sortBy === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    }
    return sortedProducts;
  }, [products, sortBy]);

  const handleResetFilters = () => {
    setActiveCategoryId(null);
    setSearchQuery('');
    setMaxPrice(MAX_PRICE);
    setSortBy('default');
  };

  if (error) {
    return (
      <div className="shop-page container" style={{ textAlign: 'center', padding: '50px 0', color: 'red' }}>
        <h2>Lỗi: {error}</h2>
      </div>
    );
  }

  return (
    <div className="shop-page container">
      <div className="shop-header">
        <h1 className="section-title">Cửa Hàng</h1>
        <div className="shop-controls">
          <div className="sort-control">
            <span style={{ marginRight: '10px', fontSize: '0.95rem', color: 'var(--text-gray)', fontWeight: 500 }}>Sắp xếp:</span>
            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Mặc định</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="name-asc">Tên: A - Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="shop-layout">
        <aside className="shop-sidebar">
          <div className="filter-group">
            <h3>Tìm Kiếm</h3>
            <div className="search-box">
              <input
                type="text"
                placeholder="Nhập tên sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="search-icon" />
              {searchQuery && (
                <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="filter-group" style={{ marginTop: '2rem' }}>
            <h3>Danh Mục</h3>
            <ul className="category-list">
              <li className={activeCategoryId === null ? 'active' : ''} onClick={() => setActiveCategoryId(null)}>
                Tất cả sản phẩm
              </li>
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className={activeCategoryId === cat.id ? 'active' : ''}
                  onClick={() => setActiveCategoryId(cat.id)}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group" style={{ marginTop: '2rem' }}>
            <h3>Khoảng Giá</h3>
            <div className="price-slider-container">
              <input
                type="range"
                min="0"
                max={MAX_PRICE}
                step="500000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="price-slider"
              />
              <div className="price-slider-label">
                <span>0đ</span>
                <span className="price-slider-current">
                  Đến: {parseInt(maxPrice, 10).toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>

            <div className="quick-prices" style={{ marginTop: '1.2rem' }}>
              <span className="quick-title" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '8px', fontWeight: 600 }}>Chọn nhanh:</span>
              <div className="quick-price-badges" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <button type="button" className={`quick-badge ${maxPrice === 1000000 ? 'active' : ''}`} onClick={() => setMaxPrice(1000000)}>Dưới 1 Tr</button>
                <button type="button" className={`quick-badge ${maxPrice === 10000000 ? 'active' : ''}`} onClick={() => setMaxPrice(10000000)}>Dưới 10 Tr</button>
                <button type="button" className={`quick-badge ${maxPrice === 30000000 ? 'active' : ''}`} onClick={() => setMaxPrice(30000000)}>Dưới 30 Tr</button>
              </div>
            </div>
          </div>

          <button className="btn btn-outline reset-filters-btn" onClick={handleResetFilters}>
            Xóa Tất Cả Bộ Lọc
          </button>
        </aside>

        <main className="shop-content">
          <div className="results-count">
            {isLoading ? 'Đang tải sản phẩm...' : `Hiển thị ${processedProducts.length} kết quả`}
          </div>
          {!isLoading && processedProducts.length > 0 ? (
            <div className="grid grid-cols-3">
              {processedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : !isLoading ? (
            <div className="shop-empty-state">
              <img src={SPORTS_IMAGE_FALLBACK} alt="Không tìm thấy sản phẩm" />
              <h3>Không tìm thấy sản phẩm nào phù hợp với tiêu chí của bạn</h3>
              <p>Vui lòng điều chỉnh từ khóa tìm kiếm, danh mục hoặc khoảng giá lọc.</p>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default Shop;
