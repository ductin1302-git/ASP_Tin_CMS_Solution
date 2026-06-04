import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';
import './Shop.css';

const Shop = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(null); // null = Tất cả
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    // Đọc tham số từ URL
    const queryParams = new URLSearchParams(location.search);
    const catIdParam = queryParams.get('categoryId');
    if (catIdParam) {
      setActiveCategoryId(parseInt(catIdParam));
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

  const filteredProducts = activeCategoryId === null 
    ? products 
    : products.filter(p => p.categoryProductId === activeCategoryId);

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
          <button className="btn btn-outline filter-btn">
            <Filter size={18} /> Bộ Lọc
          </button>
        </div>
      </div>

      <div className="shop-layout">
        {/* Sidebar */}
        <aside className="shop-sidebar">
          <div className="filter-group">
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
        </aside>

        {/* Product Grid */}
        <main className="shop-content">
          <div className="results-count">
            Hiển thị {filteredProducts.length} kết quả
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-3">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{padding: '40px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
              <h3 style={{color: '#6c757d'}}>Không có sản phẩm nào trong danh mục này.</h3>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
