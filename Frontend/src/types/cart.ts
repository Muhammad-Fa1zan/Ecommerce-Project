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
}

