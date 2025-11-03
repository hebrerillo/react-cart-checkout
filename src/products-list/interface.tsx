export interface Product {
  id: string;
  desktop_url: string;
  mobile_url: string;
  name: string;
  intersects?: boolean;
  amount: number;
  price: number;
}
