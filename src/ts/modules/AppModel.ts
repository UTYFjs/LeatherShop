import { data } from "./data";
/*export class AppModel {
  constructor(){
    
  }
}*/
export class SettingsCatalog {
  alPaco: boolean;
  valueSearch: string;
  other: boolean;
  wallet: boolean;
  cardholder: boolean;
  forDocuments: boolean;
  notebook: boolean;
  bag: boolean;
  coinBox: boolean;
  belt: boolean;
  red: boolean;
  black: boolean;
  brown: boolean;
  gold: boolean;
  orange: boolean;
  mix: boolean;
  sand: boolean;
  freeShipping: boolean;
  bestseller: boolean;
  cart: number;
  basic: boolean;

  constructor() {
    this.basic = true;

    this.valueSearch = '';

    this.alPaco = false;
    this.other = false;

    this.wallet = false;
    this.cardholder = false;
    this.forDocuments = false;
    this.belt = false;
    this.notebook = false;
    this.bag = false;
    this.coinBox = false;

    this.red = false;
    this.black = false;
    this.brown = false;
    this.gold = false;
    this.orange = false;
    this.mix = false;
    this.sand = false;

    this.freeShipping = false;

    this.bestseller = false;

    this.cart = 0;
  }
}