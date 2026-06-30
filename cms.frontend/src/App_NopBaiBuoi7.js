import React from 'react';
import CategoryProductList from './components/CategoryProductList';
import ProductList from './components/ProductList';
import PostList from './components/PostList';
import './App.css';

function App() {
  return (
    <div className="container mt-5">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4 font-weight-bold text-dark">
          V-SPORT - CỬA HÀNG THỂ THAO
        </span>
      </header>

      {/* KHU VỰC 1: CỬA HÀNG (Sản phẩm và bộ lọc danh mục sản phẩm) */}
      <div className="row">
        <div className="col-md-4">
          <CategoryProductList />
        </div>
        <div className="col-md-8">
          <h4 className="mb-4 text-uppercase text-secondary font-weight-bold">Bộ sưu tập mới nhất</h4>
          <ProductList />
        </div>
      </div>

      {/* KHU VỰC 2: TIN TỨC & DANH MỤC BÀI VIẾT THỂ THAO */}
      <div className="row mt-5">
        <div className="col-12">
          <PostList />
        </div>
      </div>
    </div>
  );
}

export default App;
