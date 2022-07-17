export interface IDataCard {
  name: string;
  img: string;
  type: string;
  color: string;
  price: string;
  stock: number;
  description: string;
  productionTime: string;
  bestseller: boolean;
  freeShipping: boolean;
  countInCart: number;
  available?: string;
  manufacturer?: string;
  amount?: number;
  year?: number;
}
export interface IProductTypes {
  belt: boolean;
  wallet: boolean;
  notebook: boolean;
  bag: boolean;
  cardholder: boolean;
  forDocuments: boolean;
}