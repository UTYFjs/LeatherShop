import { IDataCard, IProductTypes } from '../interfaces/interfaces';
import { data } from '../modules/data';


export class BasicCatalog {
  dataCards: Array<IDataCard>;
  allCards: Array<IDataCard>;
  productTypes: Object;
  filter: boolean;
  filterCards: Array<IDataCard> | null;

  constructor(data: Array<IDataCard>) {
    this.dataCards = data;
    this.filterCards = null;
    this.allCards = data;
    this.productTypes = {belt: true, wallet: true, notebook: true, bag: true, cardholder: true, forDocuments: true,};
    this.filter = false;
  }


  filterType(category: string /*, data: Array<IDataCard>*/) {
    this.filter = true;
    console.log(`This: ${category}`);
    this.dataCards = this.allCards.filter((item) => item.type == category);
    
    console.log(this.dataCards);
    console.log(this.allCards);
  }
}
