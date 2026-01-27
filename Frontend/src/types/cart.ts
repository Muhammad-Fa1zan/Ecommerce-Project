
export interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
}

export interface CartItemType {
  _id: string;
  product: Product;
  quantity: number;
  priceAtThatTime: number;
}

export interface CartType {
  items: CartItemType[];
  totalPrice: number;
}

export interface GetCartResponse {
  cart: CartType;
}

