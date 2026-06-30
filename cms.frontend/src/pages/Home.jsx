import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import {
  ArrowRight, Calendar, ChevronRight, PackageCheck,
  ShieldCheck, Tag, Truck, RefreshCcw, Headphones,
  Award, ChevronDown, Play, Pause, Volume2, VolumeX,
  Zap, Star, TrendingUp, Users,
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';
import './Home.css';

const SPORTS_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=900&auto=format&fit=crop';

/* ─── Scroll-reveal hook ─────────────────────────── */
function useReveal(threshold = 0.14) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Animated counter ───────────────────────────── */
function Counter({ to, suffix = '', duration = 1800 }) {
  const [val, setVal] = useState(0);
  const [ref, visible] = useReveal(0.5);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const defaultHeroSlides = [
  { id: 'banner-1', image: '/images/banners/banner-1.png', title: 'Banner 1', fallbackTitle: 'V-SPORT BỨT PHÁ', fallbackText: 'Chuyên giày thể thao - êm chân, bền bỉ, phong cách.', tag: 'Mùa mới' },
  { id: 'banner-2', image: '/images/banners/banner-2.png', title: 'Banner 2', fallbackTitle: 'CHẠY THÔNG MINH', fallbackText: 'Bộ sưu tập mới cho tốc độ, tập luyện và phong cách sống năng động.', tag: 'Hàng mới' },
];

const STATS = [
  { icon: <Users size={20} />, value: 50, suffix: 'K+', label: 'Khách hàng' },
  { icon: <TrendingUp size={20} />, value: 500, suffix: '+', label: 'Sản phẩm' },
  { icon: <Star size={20} />, value: 4, suffix: '.9★', label: 'Đánh giá' },
  { icon: <Zap size={20} />, value: 98, suffix: '%', label: 'Hài lòng' },
];

/* ════════════════════════════════════════════════ */
const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState(defaultHeroSlides);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [policyOpenIndex, setPolicyOpenIndex] = useState(null);
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [heroImgErrors, setHeroImgErrors] = useState({});
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  /* reveal refs */
  const [trustRef, trustVisible] = useReveal(0.1);
  const [catRef, catVisible] = useReveal(0.1);
  const [featRef, featVisible] = useReveal(0.1);
  const [hotRef, hotVisible] = useReveal(0.1);
  const [showRef, showVisible] = useReveal(0.15);
  const [latRef, latVisible] = useReveal(0.1);
  const [newsRef, newsVisible] = useReveal(0.1);
  const [policyRef, policyVisible] = useReveal(0.1);
  const [ctaRef, ctaVisible] = useReveal(0.15);

  const categoryImages = useMemo(() => [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556048219-bb6978360b84?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=900&auto=format&fit=crop',
  ], []);

  const getImageUrl = (url) => {
    if (!url) return SPORTS_IMAGE_FALLBACK;
    if (url.startsWith('http')) return url;
    if (url.startsWith('/images/')) return url;
    if (url.startsWith('/img/')) return SPORTS_IMAGE_FALLBACK;
    return `${API_BASE_URL}${url}`;
  };

  /* fetch */
  useEffect(() => {
    const go = async () => {
      try {
        setIsLoading(true);
        const [rP, rC, rH, rB] = await Promise.all([
          fetch(`${API_BASE_URL}/api/Products`),
          fetch(`${API_BASE_URL}/api/CategoriesProducts`),
          fetch(`${API_BASE_URL}/api/Products/hot-products`),
          fetch(`${API_BASE_URL}/api/Banners/Home`),
        ]);
        if (rP.ok) {
          const d = await rP.json();
          setFeaturedProducts(d.slice(0, 4));
          setLatestProducts([...d].reverse().slice(0, 4));
        }
        if (rC.ok) {
          const d = await rC.json();
          setCategories(d.slice(0, 4).map((c, i) => ({ ...c, image: categoryImages[i % categoryImages.length] })));
        }
        if (rH.ok) {
          setHotProducts(await rH.json());
        }
        if (rB.ok) {
          const d = await rB.json();
          if (d && d.length > 0) {
            setHeroSlides(d.map(b => ({
              id: b.id.toString(),
              image: b.imageUrl,
              title: b.title,
              fallbackTitle: b.title,
              fallbackText: b.description || '',
              tag: 'V-SPORT',
              linkUrl: b.linkUrl
            })));
          }
        }
        try {
          const rN = await fetch(`${API_BASE_URL}/api/posts`);
          if (rN.ok) setLatestPosts((await rN.json()).slice(0, 3));
        } catch (_) {}
      } catch (_) {}
      finally { setIsLoading(false); }
    };
    go();
  }, [categoryImages]);

  /* hero auto-slide */
  useEffect(() => {
    const t = setInterval(() => setActiveSlide(c => (c + 1) % heroSlides.length), 4500);
    return () => clearInterval(t);
  }, [heroSlides.length]);

  /* parallax video section on scroll */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    let rafId;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const section = vid.closest('.home-video-section');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return; // skip if off-screen
        const offset = Math.min(Math.max(-rect.top * 0.22, -80), 80);
        vid.style.transform = `translate3d(0, ${offset}px, 0) scale(1.1)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /* video controls */
  const toggleVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!v.currentSrc) return;
    if (videoPlaying) { v.pause(); setVideoPlaying(false); }
    else { v.play(); setVideoPlaying(true); }
  }, [videoPlaying]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setVideoMuted(v.muted);
  }, []);

  const LoadingGrid = ({ columns = 4 }) => (
    <div className={`home-skeleton-grid home-skeleton-grid-${columns}`}>
      {Array.from({ length: columns }).map((_, i) => (
        <div className="home-skeleton-card" key={i}><span /><strong /><small /></div>
      ))}
    </div>
  );

  const policies = [
    { icon: <Truck size={32} />, color: '#00c8ff', glow: 'rgba(0,200,255,0.28)', title: 'Giao Hàng Nhanh', badge: 'MIỄN PHÍ', subtitle: 'Đơn từ 500K', details: ['Giao hàng 2–4h tại TP.HCM & Hà Nội', 'Toàn quốc 1–3 ngày làm việc', 'Miễn phí vận chuyển đơn từ 500.000đ', 'Đóng gói cẩn thận, tracking liên tục'] },
    { icon: <RefreshCcw size={32} />, color: '#00e5b0', glow: 'rgba(0,229,176,0.28)', title: 'Đổi Trả Dễ Dàng', badge: '30 NGÀY', subtitle: 'Không cần lý do', details: ['Đổi size miễn phí trong 30 ngày', 'Hoàn tiền 100% nếu lỗi nhà sản xuất', 'Quy trình đổi trả online nhanh', 'Hỗ trợ tại tất cả cửa hàng V-SPORT'] },
    { icon: <Award size={32} />, color: '#ffd700', glow: 'rgba(255,215,0,0.28)', title: 'Hàng Chính Hãng', badge: '100%', subtitle: 'Cam kết chất lượng', details: ['Nhập khẩu chính ngạch, có hóa đơn VAT', 'Tem chống hàng giả trên mỗi sản phẩm', 'Bảo hành 12 tháng theo tiêu chuẩn', 'Kiểm định trước khi xuất kho'] },
    { icon: <Headphones size={32} />, color: '#e5092f', glow: 'rgba(229,9,47,0.28)', title: 'Hỗ Trợ 24/7', badge: 'LUÔN SẴN', subtitle: 'Tư vấn tận tâm', details: ['Chat Zalo, Facebook 24/7', 'Hotline 1800-VSPORT (miễn phí)', 'Tư vấn viên chuyên nghiệp', 'Giải quyết khiếu nại trong 24h'] },
  ];

  return (
    <div className="home-page">

      {/* ══════════════════ BANNER SLIDER ══════════════════ */}
      <section className="home-hero-slider" ref={heroRef} aria-label="Banner khuyến mãi V-SPORT">
        <div className="home-hero-particles" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <span className="home-hero-particle" key={i} style={{ '--pi': i }} />
          ))}
        </div>
        <div className="home-hero-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {heroSlides.map((slide) => (
            <Link to={slide.linkUrl || "/shop"} className="home-hero-slide" key={slide.id}>
              {!heroImgErrors[slide.id] && slide.image && (
                (slide.image.endsWith('.mp4') || slide.image.endsWith('.webm')) ? (
                  <video src={getImageUrl(slide.image)} autoPlay muted loop playsInline style={{width: '100%', height: '100%', objectFit: 'cover'}}></video>
                ) : (
                  <img
                    src={getImageUrl(slide.image)}
                    alt={slide.title}
                    onError={() => setHeroImgErrors(p => ({ ...p, [slide.id]: true }))}
                  />
                )
              )}
              <div className="home-hero-fallback">
                <span className="home-hero-brand-tag">
                  <Zap size={12} /> {slide.tag}
                </span>
                <strong>{slide.fallbackTitle}</strong>
                <p>{slide.fallbackText}</p>
                <div className="home-hero-cta-row">
                  <span className="home-hero-inline-btn">Mua ngay <ArrowRight size={15} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button className="home-hero-nav home-hero-nav-prev" type="button" aria-label="Banner trước"
          onClick={() => setActiveSlide(c => (c - 1 + heroSlides.length) % heroSlides.length)}>
          &lsaquo;
        </button>
        <button className="home-hero-nav home-hero-nav-next" type="button" aria-label="Banner tiếp theo"
          onClick={() => setActiveSlide(c => (c + 1) % heroSlides.length)}>
          &rsaquo;
        </button>
        <div className="home-hero-dots" aria-label="Chọn banner">
          {heroSlides.map((slide, i) => (
            <button key={slide.id} type="button"
              className={i === activeSlide ? 'active' : ''}
              aria-label={`Chuyển đến ${slide.title}`}
              onClick={() => setActiveSlide(i)}
            />
          ))}
        </div>
        <div className="home-scroll-hint" aria-hidden="true">
          <span className="home-scroll-line" />
        </div>
      </section>

      {/* ══════════════════ TRUST BAND ══════════════════ */}
      <section
        ref={trustRef}
        className={`home-trust-band${trustVisible ? ' home-revealed' : ''}`}
      >
        <div className="container home-trust-grid">
          {[
            { icon: <Truck size={22} />, title: 'Giao nhanh', desc: 'Đóng gói kỹ, cập nhật liên tục' },
            { icon: <ShieldCheck size={22} />, title: 'Hàng chính hãng', desc: 'Nguồn gốc rõ ràng, dễ kiểm tra' },
            { icon: <PackageCheck size={22} />, title: 'Đổi size linh hoạt', desc: 'Trải nghiệm mua sắm thoải mái hơn' },
          ].map((item, i) => (
            <div className="home-trust-item home-trust-item--animated" key={i} style={{ '--ti': i }}>
              <div className="home-trust-icon-ring">{item.icon}</div>
              <div>
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ CATEGORIES ══════════════════ */}
      <section
        ref={catRef}
        className={`home-section home-category-section${catVisible ? ' home-revealed' : ''}`}
      >
        <div className="container">
          <div className="home-section-header">
            <div>
              <span className="home-section-kicker">Shop theo phong cách</span>
              <h2>Danh mục nổi bật</h2>
            </div>
            <Link to="/categories" className="home-view-link">
              Xem tất cả <ChevronRight size={18} />
            </Link>
          </div>
          {isLoading ? <LoadingGrid columns={4} /> : (
            <div className="home-category-grid">
              {categories.map((cat, idx) => (
                <Link
                  to={`/shop?categoryId=${cat.id}`}
                  key={cat.id}
                  className={`home-category-card home-category-card-${idx + 1}`}
                  style={{ '--ci': idx }}
                >
                  <img src={cat.image} alt={cat.name} />
                  <div className="home-category-glare" />
                  <span className="home-category-num">0{idx + 1}</span>
                  <div className="home-category-content">
                    <h3>{cat.name}</h3>
                    <p>Khám phá ngay <ArrowRight size={14} /></p>
                  </div>
                  <span className="home-category-pulse" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════ FEATURED PRODUCTS ══════════════════ */}
      <section
        ref={featRef}
        className={`home-section home-products-section${featVisible ? ' home-revealed' : ''}`}
      >
        <div className="container">
          <div className="home-section-header">
            <div>
              <span className="home-section-kicker">Trending now</span>
              <h2>Xu hướng mới</h2>
            </div>
            <Link to="/shop" className="home-view-link">
              Xem tất cả <ChevronRight size={18} />
            </Link>
          </div>
          {isLoading ? <LoadingGrid columns={4} /> : (
            <div className="grid grid-cols-4 home-product-grid">
              {featuredProducts.map((p, i) => (
                <div className="home-prod-wrap" key={p.id} style={{ '--pi': i }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════ HOT PRODUCTS ══════════════════ */}
      <section
        ref={hotRef}
        className={`home-section home-products-section${hotVisible ? ' home-revealed' : ''}`}
      >
        <div className="container">
          <div className="home-section-header">
            <div>
              <span className="home-section-kicker">Best Sellers</span>
              <h2>Sản phẩm nổi bật / Bán chạy</h2>
            </div>
            <Link to="/shop" className="home-view-link">
              Xem tất cả <ChevronRight size={18} />
            </Link>
          </div>
          {isLoading ? <LoadingGrid columns={3} /> : (
            <div className="grid grid-cols-3 home-product-grid">
              {hotProducts.map((p, i) => (
                <div className="home-prod-wrap" key={p.id} style={{ '--pi': i }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════ STANDALONE VIDEO SECTION ══════════════════ */}
      <section
        ref={showRef}
        className={`home-video-section${showVisible ? ' home-revealed' : ''}`}
      >
        {/* parallax video bg */}
        <div className="home-vs-media">
          <video
            ref={videoRef}
            className="home-vs-video"
            muted loop playsInline preload="none"
            poster="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop"
          />
          <div className="home-vs-overlay" />
          <div className="home-vs-scanlines" aria-hidden="true" />
        </div>

        {/* animated rings */}
        <div className="home-vs-rings" aria-hidden="true">
          <span className="home-vs-ring" style={{ '--ri': 0 }} />
          <span className="home-vs-ring" style={{ '--ri': 1 }} />
          <span className="home-vs-ring" style={{ '--ri': 2 }} />
        </div>

        {/* content */}
        <div className="container home-vs-inner">
          <div className="home-vs-eyebrow">
            <span className="home-vs-live-dot" />
            Đang chiếu • V-SPORT Collection 2026
          </div>
          <h2 className="home-vs-title">
            Hiệu Năng<br />
            <span className="home-vs-title-accent">Không Giới Hạn</span>
          </h2>
          <p className="home-vs-desc">
            Thiết kế cho vận động viên thực thụ — từng chi tiết được tối ưu để
            bạn bứt phá giới hạn bản thân mỗi ngày.
          </p>

          {/* stats row */}
          <div className="home-vs-stats">
            {STATS.map((st, i) => (
              <div className="home-vs-stat" key={i} style={{ '--si': i }}>
                <strong><Counter to={st.value} suffix={st.suffix} /></strong>
                <span>{st.label}</span>
              </div>
            ))}
          </div>

          <div className="home-vs-actions">
            <Link to="/shop" className="home-vhero-btn home-vhero-btn--primary">
              Khám phá ngay <ArrowRight size={18} />
            </Link>
            <button
              className="home-vs-play-btn"
              onClick={toggleVideo}
              aria-label={videoPlaying ? 'Tạm dừng' : 'Phát'}
            >
              {videoPlaying ? <Pause size={22} /> : <Play size={22} />}
              {videoPlaying ? 'Tạm dừng' : 'Phát video'}
            </button>
            <button className="home-video-ctrl-btn" onClick={toggleMute} aria-label="Âm thanh">
              {videoMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════ LATEST PRODUCTS ══════════════════ */}
      <section
        ref={latRef}
        className={`home-section home-products-section home-latest-section${latVisible ? ' home-revealed' : ''}`}
      >
        <div className="container">
          <div className="home-section-header">
            <div>
              <span className="home-section-kicker">Vừa lên kệ</span>
              <h2>Sản phẩm mới nhất</h2>
            </div>
            <Link to="/shop" className="home-view-link">
              Xem tất cả <ChevronRight size={18} />
            </Link>
          </div>
          {isLoading ? <LoadingGrid columns={4} /> : (
            <div className="grid grid-cols-4 home-product-grid">
              {latestProducts.map((p, i) => (
                <div className="home-prod-wrap" key={p.id} style={{ '--pi': i }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════ NEWS ══════════════════ */}
      <section
        ref={newsRef}
        className={`home-section home-news-section${newsVisible ? ' home-revealed' : ''}`}
      >
        <div className="container">
          <div className="home-section-header">
            <div>
              <span className="home-section-kicker">Góc cảm hứng</span>
              <h2>Tin tức mới nhất</h2>
            </div>
            <Link to="/news" className="home-view-link">
              Xem bài viết <ChevronRight size={18} />
            </Link>
          </div>
          {isLoading ? <LoadingGrid columns={3} /> : (
            <div className="home-news-grid">
              {latestPosts.length === 0 ? (
                <p className="home-empty-state">Chưa có bài viết nào.</p>
              ) : latestPosts.map((post, idx) => (
                <article key={post.id} className={`home-news-card home-news-card-${idx + 1}`} style={{ '--ni': idx }}>
                  <Link to={`/news/${post.id}`} className="home-news-image">
                    <img
                      src={getImageUrl(post.imageUrl)}
                      alt={post.title}
                      onError={(e) => { e.target.src = SPORTS_IMAGE_FALLBACK; }}
                    />
                    <div className="home-news-img-overlay" />
                  </Link>
                  <div className="home-news-content">
                    <div className="home-news-meta">
                      <span><Calendar size={14} /> {new Date(post.createdDate).toLocaleDateString('vi-VN')}</span>
                      {post.categoryName && <span><Tag size={14} /> {post.categoryName}</span>}
                    </div>
                    <Link to={`/news/${post.id}`}><h3>{post.title}</h3></Link>
                    <p>{post.content ? `${post.content.replace(/<[^>]*>/g, '').substring(0, 118)}...` : 'Cập nhật thêm cảm hứng tập luyện và xu hướng thể thao mới.'}</p>
                    <Link to={`/news/${post.id}`} className="home-read-more">
                      Đọc tiếp <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════ POLICY ══════════════════ */}
      <section
        ref={policyRef}
        className={`home-policy-section${policyVisible ? ' home-revealed' : ''}`}
      >
        <div className="container">
          <div className="home-section-header">
            <div>
              <span className="home-section-kicker">Cam kết của chúng tôi</span>
              <h2>Chính Sách Hỗ Trợ</h2>
            </div>
          </div>
          <div className="home-policy-grid">
            {policies.map((policy, idx) => (
              <div
                key={idx}
                className={`home-policy-card${policyOpenIndex === idx ? ' home-policy-card--open' : ''}`}
                style={{ '--policy-color': policy.color, '--policy-glow': policy.glow, '--pi': idx }}
              >
                <div className="home-policy-card-header" onClick={() => setPolicyOpenIndex(policyOpenIndex === idx ? null : idx)}>
                  <div className="home-policy-icon-wrap">
                    <span className="home-policy-icon" style={{ color: policy.color }}>{policy.icon}</span>
                  </div>
                  <div className="home-policy-info">
                    <div className="home-policy-badge" style={{ background: policy.color }}>{policy.badge}</div>
                    <h3>{policy.title}</h3>
                    <p>{policy.subtitle}</p>
                  </div>
                  <ChevronDown size={20} className="home-policy-chevron" />
                </div>
                <div className="home-policy-details">
                  <ul>
                    {policy.details.map((d, i) => (
                      <li key={i}>
                        <span className="home-policy-dot" style={{ background: policy.color }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="home-policy-strip">
            {[
              { icon: <ShieldCheck size={20} />, label: 'Bảo mật SSL' },
              { icon: <PackageCheck size={20} />, label: 'Đóng gói chuyên nghiệp' },
              { icon: <Award size={20} />, label: 'Chất lượng kiểm định' },
              { icon: <Truck size={20} />, label: 'Giao hàng toàn quốc' },
            ].map((item, i, arr) => (
              <React.Fragment key={i}>
                <div className="home-policy-strip-item">
                  {item.icon}<span>{item.label}</span>
                </div>
                {i < arr.length - 1 && <div className="home-policy-strip-sep" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FINAL CTA ══════════════════ */}
      <section
        ref={ctaRef}
        className={`home-final-cta${ctaVisible ? ' home-revealed' : ''}`}
      >
        <div className="container home-final-cta-inner">
          <div>
            <span className="home-section-kicker">Ưu đãi thành viên</span>
            <h2>Bắt đầu hành trình mới cùng V-SPORT.</h2>
            <p>Đăng ký tài khoản để nhận ưu đãi, lưu giỏ hàng và theo dõi đơn nhanh hơn.</p>
          </div>
          <Link to="/register" className="home-primary-btn">
            Đăng ký ngay <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
