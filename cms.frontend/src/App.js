import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import NewsPage from './pages/NewsPage';
import ProductDetail from './pages/ProductDetail';
import NewsDetail from './pages/NewsDetail';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import './index.css';

import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';

import Checkout from './pages/Checkout';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<div className="container" style={{padding: '100px 0'}}><h2>404 - Không tìm thấy trang</h2></div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
