export const categories = [
  { id: 1, name: 'Giày Chạy Bộ', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Tất Thể Thao', image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Quần Áo Nam', image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Phụ Kiện', image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=800&auto=format&fit=crop' },
];

export const products = [
  {
    id: 1,
    name: 'Nike Air Zoom Pegasus 40',
    category: 'Giày Chạy Bộ',
    price: 3500000,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    isNew: true
  },
  {
    id: 2,
    name: 'Adidas Ultraboost Light',
    category: 'Giày Chạy Bộ',
    price: 4200000,
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    isNew: false
  },
  {
    id: 3,
    name: 'Tất Cổ Cao Nike Everyday (3 Đôi)',
    category: 'Tất Thể Thao',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1581005295804-03a0ebc7df33?q=80&w=600&auto=format&fit=crop',
    rating: 4.5,
    isNew: false
  },
  {
    id: 4,
    name: 'Áo Thun Thể Thao Pro Dri-FIT',
    category: 'Quần Áo Nam',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    isNew: true
  },
  {
    id: 5,
    name: 'Puma Velocity Nitro 2',
    category: 'Giày Chạy Bộ',
    price: 2900000,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop',
    rating: 4.6,
    isNew: false
  },
  {
    id: 6,
    name: 'Balo Thể Thao Đa Năng',
    category: 'Phụ Kiện',
    price: 1200000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
    rating: 4.4,
    isNew: false
  },
  {
    id: 7,
    name: 'Quần Short Chạy Bộ',
    category: 'Quần Áo Nam',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=600&auto=format&fit=crop',
    rating: 4.3,
    isNew: true
  },
  {
    id: 8,
    name: 'Giày Bóng Rổ Jordan Luka 2',
    category: 'Giày Bóng Rổ',
    price: 3900000,
    image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    isNew: true
  }
];

export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
