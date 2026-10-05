export interface BoxOption {
  id: string;
  weight: string;
  price: number;
  bitesCount: number;
  isPopular?: boolean;
}

export interface SelectedItem {
  id: string;
  name: string;
  type: 'box' | 'bar';
  weight: string;
  qty: number;
  priceSingle: number;
  priceTotal: number;
}

export interface OrderDetails {
  fullName: string;
  telephone: string;
  email: string;
  pickupDate: string;
  specialRequests: string;
}

export type ViewName = 'story' | 'shop' | 'checkout';
