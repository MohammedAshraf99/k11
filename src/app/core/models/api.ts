export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  message?: string;
  data: T;
}

export interface Banner {
  _id: string;
  title: string;
  subtitle: string;
  discountTag?: string;
  imageUrl: string;
  ctaLink: string;
  ctaText: string;
}
export interface PromoBanner {
  discountText?: string;
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaLink: string;
  ctaText: string;
  isActive?: boolean;
}

export interface BalloonItem {
  _id?: string;
  name: string;
  theme: string;
  price: number;
  image: string;
  type: 'Latex' | 'Foil / Mylar' | 'Balloon Arch' | 'Giant Number';
  colors: string[];
  heliumReady: boolean;
  size: string;
}

export interface GiftItem {
  _id?: string;
  title: string;
  occasion: string;
  price: number;
  image: string;
  category:
    | 'Luxury Hamper'
    | 'Personalized'
    | 'Flower & Sweet Combo'
    | 'Corporate';
  customNoteAvailable: boolean;
  boxContents: string[];
}

export interface PerfumeItem {
  _id?: string;
  name: string;
  brand: string;
  concentration: 'Extrait de Parfum' | 'Eau de Parfum' | 'Eau de Toilette';
  price: number;
  image: string;
  family: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

export interface CartItem {
  _id?: string;
  product: BalloonItem | GiftItem | PerfumeItem;
  productModel: 'Balloon' | 'Gift' | 'Perfume';
  quantity: number;
  selectedSize?: string;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  count: number;
  createdAt?: string;
  updatedAt?: string;
}

export type ProductType = 'perfumes' | 'balloons' | 'gifts' | 'deals';
