import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  PackageCheck,
  ShieldCheck,
  Tag,
  Truck,
} from 'lucide-react';
import './Home.css';

const API_BASE_URL = 'https://localhost:7003';

const heroSlides = [
  {
    id: 'banner-1',
    image: '/images/banners/banner-1.png',
    title: 'Banner 1',
    fallbackTitle: 'V-SPORT PERFORMANCE',
    fallbackText: 'Chuyen giay the thao - em chan, ben bi, phong cach.',
  },
  {
    id: 'banner-2',
    image: '/images/banners/banner-2.png',
    title: 'Banner 2',
    fallbackTitle: 'RUN SMART',
    fallbackText: 'Bo suu tap moi cho toc do, tap luyen va lifestyle.',
  },
  {
    id: 'uudai-3',
    image: '/images/banners/uudai-3.png',
    title: 'Uu dai 3',
    fallbackTitle: 'UU DAI THANH VIEN',
    fallbackText: 'San deal noi bat, mua sam online de dang moi ngay.',
  },
  {
    id: 'banner-4',
    image: '/images/banners/banner-4.png',
    title: 'Banner 4',
    fallbackTitle: 'TRAIN HARD',
    fallbackText: 'San sang cho moi buoi tap voi outfit the thao nang dong.',
  },
  {
    id: 'banner-5',
    image: '/images/banners/banner-5.png',
    title: 'Banner 5',
    fallbackTitle: 'STYLE EVERYDAY',
    fallbackText: 'Sneaker lifestyle, phu kien va san pham noi bat moi ngay.',
  },
];

const Home = () => {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryImages = useMemo(() => [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556048219-bb6978360b84?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=900&auto=format&fit=crop',
  ], []);

  const getImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=900&auto=format&fit=crop';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const resProducts = await fetch(`${API_BASE_URL}/api/Products`);
        if (resProducts.ok) {
          const dataProducts = await resProducts.json();
          setFeaturedProducts(dataProducts.slice(0, 4));
          setLatestProducts([...dataProducts].reverse().slice(0, 4));
        }

        const resCategories = await fetch(`${API_BASE_URL}/api/CategoriesProducts`);
        if (resCategories.ok) {
          const dataCategories = await resCategories.json();
          const enrichedCategories = dataCategories.slice(0, 4).map((cat, index) => ({
            ...cat,
            image: categoryImages[index % categoryImages.length],
          }));
          setCategories(enrichedCategories);
        }

        try {
          const resPosts = await fetch(`${API_BASE_URL}/api/posts`);
          if (resPosts.ok) {
            const dataPosts = await resPosts.json();
            setLatestPosts(dataPosts.slice(0, 3));
          }
        } catch (errPosts) {
          console.error('Loi khi tai bai viet:', errPosts);
        }
      } catch (err) {
        console.error('Loi khi tai du lieu trang chu:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryImages]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const goToHeroSlide = (index) => {
    setActiveHeroSlide((index + heroSlides.length) % heroSlides.length);
  };

  const LoadingGrid = ({ columns = 4 }) => (
    <div className={`home-skeleton-grid home-skeleton-grid-${columns}`}>
      {Array.from({ length: columns }).map((_, index) => (
        <div className="home-skeleton-card" key={index}>
          <span />
          <strong />
          <small />
        </div>
      ))}
    </div>
  );

  return (
    <div className="home-page">
      <section className="home-hero-slider" aria-label="Banner khuyen mai V-SPORT">
        <div
          className="home-hero-track"
          style={{ transform: `translateX(-${activeHeroSlide * 100}%)` }}
        >
          {heroSlides.map((slide) => (
            <Link to="/shop" className="home-hero-slide" key={slide.id}>
              <img
                src={slide.image}
                alt={slide.title}
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
              <div className="home-hero-fallback">
                <span>V-SPORT</span>
                <strong>{slide.fallbackTitle}</strong>
                <p>{slide.fallbackText}</p>
              </div>
            </Link>
          ))}
        </div>

        <button
          className="home-hero-nav home-hero-nav-prev"
          type="button"
          aria-label="Banner truoc"
          onClick={() => goToHeroSlide(activeHeroSlide - 1)}
        >
          &lsaquo;
        </button>
        <button
          className="home-hero-nav home-hero-nav-next"
          type="button"
          aria-label="Banner tiep theo"
          onClick={() => goToHeroSlide(activeHeroSlide + 1)}
        >
          &rsaquo;
        </button>

        <div className="home-hero-dots" aria-label="Chon banner">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={index === activeHeroSlide ? 'active' : ''}
              aria-label={`Chuyen den ${slide.title}`}
              onClick={() => goToHeroSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="home-trust-band">
        <div className="container home-trust-grid">
          <div className="home-trust-item">
            <Truck size={22} />
            <div>
              <strong>Giao nhanh</strong>
              <span>Dong goi ky, cap nhat lien tuc</span>
            </div>
          </div>
          <div className="home-trust-item">
            <ShieldCheck size={22} />
            <div>
              <strong>Hang chinh hang</strong>
              <span>Nguon goc ro rang, de kiem tra</span>
            </div>
          </div>
          <div className="home-trust-item">
            <PackageCheck size={22} />
            <div>
              <strong>Doi size linh hoat</strong>
              <span>Trai nghiem mua sam thoai mai hon</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-category-section">
        <div className="container">
          <div className="home-section-header">
            <div>
              <span className="home-section-kicker">Shop theo phong cach</span>
              <h2>Danh muc noi bat</h2>
            </div>
            <Link to="/categories" className="home-view-link">
              Xem tat ca <ChevronRight size={18} />
            </Link>
          </div>

          {isLoading ? (
            <LoadingGrid columns={4} />
          ) : (
            <div className="home-category-grid">
              {categories.map((category, index) => (
                <Link
                  to={`/shop?categoryId=${category.id}`}
                  key={category.id}
                  className={`home-category-card home-category-card-${index + 1}`}
                >
                  <img src={category.image} alt={category.name} />
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{category.name}</h3>
                    <p>Kham pha ngay</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="home-section home-products-section">
        <div className="container">
          <div className="home-section-header">
            <div>
              <span className="home-section-kicker">Trending now</span>
              <h2>Xu huong moi</h2>
            </div>
            <Link to="/shop" className="home-view-link">
              Xem tat ca <ChevronRight size={18} />
            </Link>
          </div>

          {isLoading ? (
            <LoadingGrid columns={4} />
          ) : (
            <div className="grid grid-cols-4 home-product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="home-showcase">
        <div className="container home-showcase-inner">
          <div className="home-showcase-media">
            <img
              src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop"
              alt="Giay the thao V-SPORT"
            />
          </div>
          <div className="home-showcase-copy">
            <span className="home-section-kicker">Drop moi nhat</span>
            <h2>Thiet ke gon, dem em, phoi do cuc nhanh.</h2>
            <p>
              Tung mau duoc dat trong layout ro rang de khach hang de xem anh, doc gia,
              chon danh muc va di toi trang mua chi trong vai giay.
            </p>
            <Link to="/shop" className="home-primary-btn">
              Xem bo suu tap <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section home-products-section home-latest-section">
        <div className="container">
          <div className="home-section-header">
            <div>
              <span className="home-section-kicker">Vua len ke</span>
              <h2>San pham moi nhat</h2>
            </div>
            <Link to="/shop" className="home-view-link">
              Xem tat ca <ChevronRight size={18} />
            </Link>
          </div>

          {isLoading ? (
            <LoadingGrid columns={4} />
          ) : (
            <div className="grid grid-cols-4 home-product-grid">
              {latestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="home-section home-news-section">
        <div className="container">
          <div className="home-section-header">
            <div>
              <span className="home-section-kicker">Goc cam hung</span>
              <h2>Tin tuc moi nhat</h2>
            </div>
            <Link to="/news" className="home-view-link">
              Xem bai viet <ChevronRight size={18} />
            </Link>
          </div>

          {isLoading ? (
            <LoadingGrid columns={3} />
          ) : (
            <div className="home-news-grid">
              {latestPosts.length === 0 ? (
                <p className="home-empty-state">Chua co bai viet nao.</p>
              ) : (
                latestPosts.map((post, index) => (
                  <article key={post.id} className={`home-news-card home-news-card-${index + 1}`}>
                    <Link to={`/news/${post.id}`} className="home-news-image">
                      <img
                        src={getImageUrl(post.imageUrl)}
                        alt={post.title}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=900&auto=format&fit=crop';
                        }}
                      />
                    </Link>
                    <div className="home-news-content">
                      <div className="home-news-meta">
                        <span><Calendar size={14} /> {new Date(post.createdDate).toLocaleDateString('vi-VN')}</span>
                        {post.categoryName && <span><Tag size={14} /> {post.categoryName}</span>}
                      </div>
                      <Link to={`/news/${post.id}`}>
                        <h3>{post.title}</h3>
                      </Link>
                      <p>
                        {post.content
                          ? `${post.content.replace(/<[^>]*>/g, '').substring(0, 118)}...`
                          : 'Cap nhat them cam hung phoi do va xu huong the thao moi.'}
                      </p>
                      <Link to={`/news/${post.id}`} className="home-read-more">
                        Doc tiep <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <section className="home-final-cta">
        <div className="container home-final-cta-inner">
          <div>
            <span className="home-section-kicker">Uu dai thanh vien</span>
            <h2>Bat dau hanh trinh moi cung V-SPORT.</h2>
            <p>Dang ky tai khoan de nhan uu dai, luu gio hang va theo doi don nhanh hon.</p>
          </div>
          <Link to="/register" className="home-primary-btn">
            Dang ky ngay <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
