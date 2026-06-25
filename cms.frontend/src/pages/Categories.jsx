import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Star, TrendingUp } from 'lucide-react';
import './Categories.css';

const categoryImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571945153237-4929e783af4a?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=900&auto=format&fit=crop',
];

const categoryColors = [
  { accent: '#00c8ff', glow: 'rgba(0,200,255,0.35)', grad: 'linear-gradient(135deg,#00c8ff,#0060ff)' },
  { accent: '#ff4d6d', glow: 'rgba(255,77,109,0.35)', grad: 'linear-gradient(135deg,#ff4d6d,#c9184a)' },
  { accent: '#ffd700', glow: 'rgba(255,215,0,0.35)',  grad: 'linear-gradient(135deg,#ffd700,#ff8800)' },
  { accent: '#00e5b0', glow: 'rgba(0,229,176,0.35)',  grad: 'linear-gradient(135deg,#00e5b0,#00a36c)' },
  { accent: '#bf5af2', glow: 'rgba(191,90,242,0.35)', grad: 'linear-gradient(135deg,#bf5af2,#6e00c9)' },
  { accent: '#ff6d00', glow: 'rgba(255,109,0,0.35)',  grad: 'linear-gradient(135deg,#ff6d00,#b03a00)' },
];

const badges = ['HOT', 'NEW', 'SALE', 'TOP', 'TREND', 'VIP'];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('https://localhost:7003/api/CategoriesProducts');
        if (!res.ok) throw new Error('Không thể tải danh sách danh mục.');
        const data = await res.json();
        const enriched = data.map((cat, i) => ({
          ...cat,
          image: categoryImages[i % categoryImages.length],
          color: categoryColors[i % categoryColors.length],
          badge: badges[i % badges.length],
          productCount: Math.floor(Math.random() * 80) + 20,
        }));
        setCategories(enriched);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Stagger card reveal on scroll
  useEffect(() => {
    if (!categories.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setVisibleCards((prev) => [...new Set([...prev, idx])]);
          }
        });
      },
      { threshold: 0.12 }
    );
    cardRefs.current.forEach((ref) => { if (ref) obs.observe(ref); });
    return () => obs.disconnect();
  }, [categories]);

  const marqueeItems = categories.length
    ? [...categories, ...categories, ...categories]
    : Array(12).fill({ name: 'V-SPORT' });

  return (
    <div className="cat-page">
      {/* ── HERO ── */}
      <section className="cat-hero">
        <div className="cat-hero-bg" />
        <div className="cat-hero-particles">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="cat-particle" style={{ '--i': i }} />
          ))}
        </div>
        <div className="container cat-hero-inner">
          <div className="cat-hero-eyebrow">
            <Zap size={15} /> Khám phá bộ sưu tập
          </div>
          <h1 className="cat-hero-title">
            Danh Mục<br />
            <span className="cat-hero-gradient">Nổi Bật</span>
          </h1>
          <p className="cat-hero-sub">
            Tìm kiếm sản phẩm thể thao yêu thích — phong cách, chất lượng, đích thực.
          </p>
          <div className="cat-hero-stats">
            <div className="cat-hero-stat">
              <strong>{categories.length || '—'}</strong><span>Danh mục</span>
            </div>
            <div className="cat-hero-stat-sep" />
            <div className="cat-hero-stat">
              <strong>500+</strong><span>Sản phẩm</span>
            </div>
            <div className="cat-hero-stat-sep" />
            <div className="cat-hero-stat">
              <strong>24/7</strong><span>Hỗ trợ</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE TICKER ── */}
      <div className="cat-marquee-wrap" aria-hidden="true">
        <div className="cat-marquee-track">
          {marqueeItems.map((cat, i) => (
            <span className="cat-marquee-item" key={i}>
              <Star size={12} /> {cat.name || 'V-SPORT'}
            </span>
          ))}
        </div>
      </div>

      {/* ── GRID ── */}
      <section className="cat-grid-section">
        <div className="container">
          {isLoading && (
            <div className="cat-skeleton-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="cat-skeleton-card" key={i}>
                  <div className="cat-skeleton-img" />
                  <div className="cat-skeleton-line cat-skeleton-line--lg" />
                  <div className="cat-skeleton-line cat-skeleton-line--sm" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="cat-error">
              <p>⚠ {error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <div className="cat-grid">
              {categories.map((cat, idx) => (
                <Link
                  to={`/shop?categoryId=${cat.id}`}
                  key={cat.id}
                  className={`cat-card${visibleCards.includes(idx) ? ' cat-card--visible' : ''}`}
                  data-idx={idx}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  style={{ '--cat-accent': cat.color.accent, '--cat-glow': cat.color.glow, '--cat-delay': `${idx * 0.09}s` }}
                >
                  {/* shimmer border */}
                  <span className="cat-card-shimmer" />

                  {/* image */}
                  <div className="cat-card-media">
                    <img src={cat.image} alt={cat.name} loading="lazy" />
                    <div className="cat-card-overlay" />
                  </div>

                  {/* badge */}
                  <div className="cat-card-badge" style={{ background: cat.color.grad }}>
                    {cat.badge}
                  </div>

                  {/* number */}
                  <span className="cat-card-num">0{idx + 1}</span>

                  {/* content */}
                  <div className="cat-card-content">
                    <div className="cat-card-meta">
                      <TrendingUp size={13} />
                      <span>{cat.productCount} sản phẩm</span>
                    </div>
                    <h3 className="cat-card-name">{cat.name}</h3>
                    {cat.description && <p className="cat-card-desc">{cat.description}</p>}
                    <div className="cat-card-cta">
                      <span>Khám phá ngay</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  {/* pulse ring */}
                  <span className="cat-card-pulse" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── BOTTOM MARQUEE (reverse) ── */}
      <div className="cat-marquee-wrap cat-marquee-wrap--reverse cat-marquee-wrap--dim" aria-hidden="true">
        <div className="cat-marquee-track cat-marquee-track--rev">
          {marqueeItems.map((cat, i) => (
            <span className="cat-marquee-item" key={i}>
              <Star size={12} /> {cat.name || 'V-SPORT'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
