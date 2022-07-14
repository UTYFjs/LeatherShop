import { IDataCard, IProductTypes } from '../interfaces/interfaces';
import { data } from '../modules/data';


export class BasicCatalog {
  dataCards: Array<IDataCard>;
  allCards: Array<IDataCard>;
  productTypes: IProductTypes;
  filter: boolean;
  filterCards: Array<IDataCard> | null;

  constructor(data: Array<IDataCard>) {
    this.dataCards = data;
    this.filterCards = null;
    this.allCards = data;
    this.productTypes = {belt: true, wallet: true, notebook: true, bag: true, cardholder: true, forDocuments: true,};
    this.filter = false;
  }


  newFilter(){

    const input: NodeListOf<HTMLInputElement> = document.querySelectorAll('.product-type');
    const onlyProductType: Array<IDataCard> = [];
    input.forEach((item) => {
      if(item.checked){ 
        this.allCards.forEach((card) => {
          if (card.type == item.id){
            onlyProductType.push(card);
          }});
        //this.dataCards = this.allCards.filter((card) => card.type == item.id);
        
        
      }
      
      
      //console.log (item);
    }) 
    this.dataCards = onlyProductType;
    console.log(this.dataCards);


  }

  filterType(category: string, checked: boolean/*, data: Array<IDataCard>*/) {
    this.filter = true;
    /*if(checked){
      switch (category) {
        case 'belt':
          this.productTypes.belt = true;
          break;
        case 'wallet':
          this.productTypes.wallet = true;
          break;
        case 'notebook':
          this.productTypes.notebook = true;
          break;
        case 'bag':
          this.productTypes.bag = true;
          break;
        case 'cardholder':
          this.productTypes.cardholder = true;
          break;
        case 'forDocuments':
          this.productTypes.forDocuments = true;
          break;
      }
    } else {
      switch (category) {
        case 'belt':
          this.productTypes.belt = false;
          break;
        case 'wallet':
          this.productTypes.wallet = false;
          break;
        case 'notebook':
          this.productTypes.notebook = false;
          break;
        case 'bag':
          this.productTypes.bag = false;
          break;
        case 'cardholder':
          this.productTypes.cardholder = false;
          break;
        case 'forDocuments':
          this.productTypes.forDocuments = false;
          break;
      }
    }
    */
    //const typeFilterArr: HTMLInputElement[] = document.querySelectorAll('filter-type')
    
    //console.log(`This: ${category}`);

    this.dataCards = this.allCards.filter((item) => item.type == category);
    
    this.allCards.forEach((item) => {
      if(item.type == category){
        if(checked){
          this.dataCards
        }
      }
    })
    //console.log(this.dataCards);
    //console.log(this.allCards);
  }
}
