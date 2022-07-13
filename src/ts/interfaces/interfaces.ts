export interface IDataCard {
  name: string;
  img: string;
  type: string;
  color: Array<string>;
  price: string;
  available: string;
  description: string;
  productionTime: string;
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