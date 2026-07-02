

export interface ProductSize {
  name: 'Small' | 'Medium' | 'Large';
  price_modifier: number;
}

export interface ProductAddon {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name_en: string;
  name_ar: string | null;
  description: string | null;
  category: string;
  base_price: number;
  image_url: string | null;
  ingredients: string[] | null;
  calories: number | null;
  bean_type: string | null;
  is_available: boolean;
  sizes: ProductSize[];
  addons: ProductAddon[];
  currency?: string;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'new' | 'preparing' | 'completed' | 'cancelled';

export type OrderType = 'dine_in' | 'pickup';

export interface Order {
  id: string;
  order_number: number;
  status: OrderStatus;
  order_type: OrderType;
  table_number: number | null;
  customer_name: string | null;
  total_amount: number;
  notes: string | null;
  created_at: string;
  updated_at: string;

  order_items?: OrderItem[];
}

export interface SelectedAddon {
  name: string;
  price: number;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  size: string;
  unit_price: number;
  addons: SelectedAddon[];
  subtotal: number;
  created_at: string;
}

export interface CartItem {
  
  cartId: string;
  productId: string;
  productName: string;
  productNameAr: string | null;
  imageUrl: string | null;
  size: ProductSize;
  addons: SelectedAddon[];
  quantity: number;
  unitPrice: number;
  currency?: string;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { cartId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { cartId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export const CATEGORIES = [
  { key: 'all', label_en: 'All', label_ar: 'الكل' },
  { key: 'hot_coffee', label_en: 'Hot Drinks', label_ar: 'مشروبات ساخنة' },
  { key: 'cold_coffee', label_en: 'Cold Drinks', label_ar: 'مشروبات باردة' },
  { key: 'juices', label_en: 'Juices', label_ar: 'عصائر' },
  { key: 'ice_cream', label_en: 'Ice Cream', label_ar: 'آيس كريم' },
  { key: 'ice_coffee', label_en: 'Ice Coffee', label_ar: 'آيس كوفي' },
  { key: 'crepe', label_en: 'Crepe', label_ar: 'كريب' },
  { key: 'waffle', label_en: 'Waffle', label_ar: 'وافل' },
  { key: 'pancake', label_en: 'Pancake', label_ar: 'بانكيك' },
  { key: 'hookah', label_en: 'Hookah', label_ar: 'أركيلة' },
  { key: 'cocktails', label_en: 'Cocktails', label_ar: 'كوكتيلات' },
  { key: 'fruit_salads', label_en: 'Fruit Salads', label_ar: 'سلطات فواكه' },
] as const;
