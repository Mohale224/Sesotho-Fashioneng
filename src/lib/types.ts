export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>;
      };
      events: {
        Row: Event;
        Insert: Omit<Event, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>;
      };
      artists: {
        Row: Artist;
        Insert: Omit<Artist, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Artist, 'id' | 'created_at' | 'updated_at'>>;
      };
      ticket_types: {
        Row: TicketType;
        Insert: Omit<TicketType, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<TicketType, 'id' | 'created_at' | 'updated_at'>>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Order, 'id' | 'created_at' | 'updated_at'>>;
      };
      order_items: {
        Row: OrderItem;
        Insert: Omit<OrderItem, 'id' | 'created_at'>;
        Update: Partial<Omit<OrderItem, 'id' | 'created_at'>>;
      };
    };
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  stock: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  event_date: string;
  location: string;
  images: string[];
  lineup: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  image: string | null;
  gallery: string[];
  social_links: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  genre: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface TicketType {
  id: string;
  event_id: string;
  name: string;
  description: string | null;
  price: number;
  quantity_available: number;
  quantity_sold: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  shipping_address: {
    street?: string;
    city?: string;
    province?: string;
    postal_code?: string;
    country?: string;
  };
  total_amount: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  payment_method: string | null;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  ticket_type_id: string | null;
  item_name: string;
  item_type: 'product' | 'ticket';
  quantity: number;
  unit_price: number;
  total_price: number;
  size: string | null;
  created_at: string;
}

export interface CartItem {
  id: string;
  type: 'product' | 'ticket';
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  productId?: string;
  ticketTypeId?: string;
  eventName?: string;
}
