export interface ProductType {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductCart {
  id: string;
  title: string;
  quantity: number;
  imageCover: string;
  subcategory: Subcategory;
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: ProductCart;
}
export interface WishlistItem {
  id: string;
  count: number;
  price: number;
  product: ProductCart;
  imageCover: string;
  title: string;
}

export interface Order {
  _id: string;
  id: number; 
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  paidAt?: string;
  paymentMethodType: "cash" | "card";
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  __v: number;
}