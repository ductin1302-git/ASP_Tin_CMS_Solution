export const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5018').replace(/\/$/, '');
export const IMAGE_BASE_URL = (process.env.REACT_APP_IMAGE_BASE_URL || API_BASE_URL).replace(/\/$/, '');

export const PRODUCT_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop';

export const SPORTS_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=900&auto=format&fit=crop';

export const resolveAssetUrl = (url, fallback = PRODUCT_IMAGE_FALLBACK) => {
  if (!url) return fallback;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/images/')) return url;
  if (url.startsWith('/img/')) return fallback;
  return `${IMAGE_BASE_URL}${url}`;
};
