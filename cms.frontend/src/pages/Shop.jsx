import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Search, X } from 'lucide-react';
import './Shop.css';

const Shop = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(null); // null = Tất cả
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // States cho Tìm kiếm và Bộ lọc
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(50000000); // Mặc định 50 triệu
  const [sortBy, setSortBy] = useState('default');

  const location = useLocation();

  useEffect(() => {
    // Đọc tham số từ URL
    const queryParams = new URLSearchParams(location.search);
    const catIdParam = queryParams.get('categoryId');
    const searchParam = queryParams.get('search');
    if (catIdParam) {
      setActiveCategoryId(parseInt(catIdParam));
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Lấy danh sách sản phẩm
        const resProducts = await fetch('https://localhost:7003/api/Products');
        if (!resProducts.ok) throw new Error('Không thể tải danh sách sản phẩm');
        const dataProducts = await resProducts.json();
        
        // Lấy danh mục sản phẩm
        const resCategories = await fetch('https://localhost:7003/api/CategoriesProducts');
        if (!resCategories.ok) throw new Error('Không thể tải danh mục sản phẩm');
        const dataCategories = await resCategories.json();

        setProducts(dataProducts);
        setCategories(dataCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Lọc và Sắp xếp sản phẩm
  let processedProducts = [...products];

  if (activeCategoryId !== null) {
    processedProducts = processedProducts.filter(p => p.categoryProductId === activeCategoryId);
  }

  if (searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase();
    processedProducts = processedProducts.filter(p => 
      p.name.toLowerCase().includes(query) || 
      (p.description && p.description.toLowerCase().includes(query))
    );
  }

  if (maxPrice !== '') {
    processedProducts = processedProducts.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (sortBy === 'price-asc') {
    processedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    processedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name-asc') {
    processedProducts.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  }

  const handleResetFilters = () => {
    setActiveCategoryId(null);
    setSearchQuery('');
    setMaxPrice(50000000);
    setSortBy('default');
  };

  if (isLoading) {
    return <div className="shop-page container" style={{textAlign: 'center', padding: '50px 0'}}><h2>Đang tải cửa hàng...</h2></div>;
  }

  if (error) {
    return <div className="shop-page container" style={{textAlign: 'center', padding: '50px 0', color: 'red'}}><h2>Lỗi: {error}</h2></div>;
  }

  return (
    <div className="shop-page container">
      <div className="shop-header">
        <h1 className="section-title">Cửa Hàng</h1>
        <div className="shop-controls">
          <div className="sort-control">
            <span style={{marginRight: '10px', fontSize: '0.95rem', color: 'var(--text-gray)', fontWeight: 500}}>Sắp xếp:</span>
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
        {/* Sidebar */}
        <aside className="shop-sidebar">
          {/* Search Box */}
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

          {/* Categories */}
          <div className="filter-group" style={{marginTop: '2rem'}}>
            <h3>Danh Mục</h3>
            <ul className="category-list">
              <li 
                className={activeCategoryId === null ? 'active' : ''}
                onClick={() => setActiveCategoryId(null)}
              >
                Tất cả sản phẩm
              </li>
              {categories.map(cat => (
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

          {/* Price Range Slider */}
          <div className="filter-group" style={{marginTop: '2rem'}}>
            <h3>Khoảng Giá</h3>
            <div className="price-slider-container">
              <input 
                type="range" 
                min="0" 
                max="50000000" 
                step="500000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="price-slider"
              />
              <div className="price-slider-label">
                <span>0đ</span>
                <span className="price-slider-current">
                  Đến: {parseInt(maxPrice).toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
            
            {/* Quick Price Ranges */}
            <div className="quick-prices" style={{marginTop: '1.2rem'}}>
              <span className="quick-title" style={{display: 'block', fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '8px', fontWeight: 600}}>Chọn nhanh:</span>
              <div className="quick-price-badges" style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                <button 
                  type="button" 
                  className={`quick-badge ${maxPrice === 1000000 ? 'active' : ''}`}
                  onClick={() => setMaxPrice(1000000)}
                >
                  Dưới 1 Tr
                </button>
                <button 
                  type="button" 
                  className={`quick-badge ${maxPrice === 10000000 ? 'active' : ''}`}
                  onClick={() => setMaxPrice(10000000)}
                >
                  Dưới 10 Tr
                </button>
                <button 
                  type="button" 
                  className={`quick-badge ${maxPrice === 30000000 ? 'active' : ''}`}
                  onClick={() => setMaxPrice(30000000)}
                >
                  Dưới 30 Tr
                </button>
              </div>
            </div>
          </div>

          {/* Reset Filters */}
          <button className="btn btn-outline reset-filters-btn" onClick={handleResetFilters}>
            Xóa Tất Cả Bộ Lọc
          </button>
        </aside>

        {/* Product Grid */}
        <main className="shop-content">
          <div className="results-count">
            Hiển thị {processedProducts.length} kết quả
          </div>
          {processedProducts.length > 0 ? (
            <div className="grid grid-cols-3">
              {processedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{padding: '60px 20px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '12px'}}>
              <h3 style={{color: '#6c757d', marginBottom: '10px'}}>Không tìm thấy sản phẩm phù hợp.</h3>
              <p style={{color: '#999'}}>Vui lòng điều chỉnh từ khóa tìm kiếm hoặc mức giá lọc.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
