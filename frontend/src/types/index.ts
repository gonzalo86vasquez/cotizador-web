export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  categoryId: number;
  categoryName: string;
  images: string[];
  technicalSpecs: Record<string, string>;
  compatibleModels: string[];
  availableForQuote: boolean;
  inStock: boolean;
  estimatedDeliveryDays: number;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  notes: string;
  urgency: 'normal' | 'urgent';
}

export interface ClientInfo {
  name: string;
  company: string;
  rut: string;
  position: string;
  email: string;
  phone: string;
}

export interface DeliveryInfo {
  address: string;
  city: string;
  region: string;
  contactName: string;
  contactPhone: string;
}

export interface QuoteRequest {
  items: QuoteItem[];
  client: ClientInfo;
  delivery: DeliveryInfo;
  requestedDate: string;
  observations: string;
}
