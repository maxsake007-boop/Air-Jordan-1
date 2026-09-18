export interface Colorway {
  id: string;
  name: string;
  code: string;
  displayWord: string;
  bgSolid: string;
  bgGradient: string;
  accentColor: string;
  swatchHex: string;
  glowColor: string;
  imageSrc: string;
  price: number;
  tag: string;
  story: string;
  details: {
    upper: string;
    sole: string;
    cushioning: string;
    weight: string;
  };
}

export interface SneakerSize {
  eu: number;
  us: number;
  uk: number;
  cm: number;
  inStock: boolean;
}

export interface CatalogProduct {
  id: string;
  name: string;
  series: string;
  price: number;
  colorName: string;
  category: string;
  rating: number;
  reviewsCount: number;
  imageSrc: string;
  accentColor: string;
  badge?: string;
}

export interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  size: number;
  colorwayId: string;
  quantity: number;
  paymentMethod: 'apple-pay' | 'card' | 'crypto';
}
