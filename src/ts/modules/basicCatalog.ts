import { IDataCard, IProductTypes } from '../interfaces/interfaces';
import { data } from '../modules/data';


export class BasicCatalog {
  dataCards: Array<IDataCard>;
  allCards: Array<IDataCard>;
  productTypes: IProductTypes;
  filter: boolean;
  searchCards: Array<IDataCard> | null;
  cart: number;

  constructor(data: Array<IDataCard>) {
    this.dataCards = data;
    this.searchCards = data;
    this.allCards = data;
    this.productTypes = {
      belt: true,
      wallet: true,
      notebook: true,
      bag: true,
      cardholder: true,
      forDocuments: true,
    };
    this.filter = false;
    this.cart = 0;
  }

  newFilter(): void {
    const input: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.product-type');
    let onlyProductType: Array<IDataCard> = [];
    input.forEach((item) => {
      if (item.checked) {
        this.allCards.forEach((card) => {
          if (card.type == item.id) {
            onlyProductType.push(card);
          }
        });
      } else {}
    });
    onlyProductType = onlyProductType.length ? onlyProductType : this.allCards;

    const manufacturer: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.product-manufacturer');
    let onlyManufacturer: Array<IDataCard> = [];
    manufacturer.forEach((item) => {
      if (item.checked) {
        if (onlyProductType) {
          onlyProductType.forEach((card) => {
            if (card.manufacturer == item.id) {
              onlyManufacturer.push(card);
            }
          });
        } else {
          this.allCards.forEach((card) => {
            if (card.manufacturer == item.id) {
              onlyManufacturer.push(card);
            }
          });
        }
      }
    });
    onlyManufacturer = onlyManufacturer.length
      ? onlyManufacturer
      : onlyProductType;

    const freeShipping: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('#freeShipping');
    let onlyFreeShipping: Array<IDataCard> = [];
    freeShipping.forEach((item) => {
      if (item.checked) {
        if (onlyManufacturer) {
          onlyManufacturer.forEach((card) => {
            if (card.freeShipping) {
              onlyFreeShipping.push(card);
            }
          });
        } else {
          this.allCards.forEach((card) => {
            if (card.freeShipping) {
              if (!onlyFreeShipping.includes(card)) {
                onlyFreeShipping.push(card);
              }
            }
          });
        }
      }
    });
    onlyFreeShipping = onlyFreeShipping.length
      ? onlyFreeShipping
      : onlyManufacturer;

    const bestseller: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('#bestseller');
    let onlyBestseller: Array<IDataCard> = [];
    bestseller.forEach((item) => {
      if (item.checked) {
        if (onlyFreeShipping) {
          onlyFreeShipping.forEach((card) => {
            if (card.bestseller) {
              onlyBestseller.push(card);
            }
          });
        } else {
          this.allCards.forEach((card) => {
            if (card.bestseller) {
              if (!onlyBestseller.includes(card)) {
                onlyBestseller.push(card);
              }
            }
          });
        }
      }
    });
    onlyBestseller = onlyBestseller.length ? onlyBestseller : onlyFreeShipping;

    const color: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.product-color');
    let onlyColor: Array<IDataCard> = [];
    color.forEach((item) => {
      if (item.checked) {
        if (onlyFreeShipping) {
          onlyFreeShipping.forEach((card) => {
            console.log(card.color.includes(item.id));
            if (card.color == item.id) {
              onlyColor.push(card);
            }
          });
        } else {
          this.allCards.forEach((card) => {
            if (card.color == item.id) {
              onlyColor.push(card);
            }
          });
        }
      }
    });
    onlyColor = onlyColor.length ? onlyColor : onlyBestseller;

    if (onlyColor.length) {
      this.dataCards = onlyColor;
    } else {
      //this.dataCards = this.allCards;
    }

    this.searchCards = this.dataCards.concat([]);
  }

  search(inputNode: HTMLInputElement): void {
    const value: string = inputNode.value.toUpperCase();
    const forSearch: Array<IDataCard> | undefined = this.searchCards?.concat([]);

    const onlySearchCard: Array<IDataCard> = [];
    forSearch?.forEach((card) => {
      const nameToUpper = card.name.toUpperCase();
      if (nameToUpper.search(value) !== -1) {
        onlySearchCard.push(card);
      }
    });
    if (onlySearchCard) {
      this.dataCards = onlySearchCard;
    } else {
      this.dataCards = [];
    }
  }
  
  sort() {
    console.log('sort.start');
    const options = document.querySelectorAll('option');

    options.forEach((optionItem) => {
      if (optionItem.selected) {
        if (optionItem.id) {
          const forSort: Array<IDataCard> | undefined =
            this.searchCards?.concat([]);
          if (optionItem.id == 'priceLowest') {
            forSort?.sort((a, b) => +b.price - +a.price);
          }
          if (optionItem.id == 'priceHighest') {
            forSort?.sort((a: IDataCard, b: IDataCard) => +a.price - +b.price);
          }
          if (optionItem.id == 'aHigh') {
            forSort?.sort((a: IDataCard, b: IDataCard) => {
              const a1: string = a.name.toLowerCase();
              const b1: string = b.name.toLowerCase();
              if (a1 < b1) return -1;
              if (a1 > b1) return 1;
              return 0;
            });
          }
          if (optionItem.id == 'zHigh') {
            forSort?.sort((a: IDataCard, b: IDataCard) => {
              const a1: string = a.name.toLowerCase();
              const b1: string = b.name.toLowerCase();
              if (a1 < b1) return 1;
              if (a1 > b1) return -1;
              return 0;
            });
            //forSort?.sort((a: IDataCard, b: IDataCard) => (b.price as unknown as number) - (a.price as unknown as number));
          }
          //forSort?.sort((a, b) => +a.price - +b.price);
          console.log(optionItem.id);
          if (forSort) {
            this.dataCards = forSort;
          }
        }
      }
    });
  }

  updateCartUp(idCard: string) {
    const currentCard = this.dataCards.find((item) => {
      if (item.img === idCard) {
        return item;
      }
    });
    if (currentCard) {
      if (currentCard.countInCart < currentCard.stock) {
        if(this.cart !== 20){
          currentCard.countInCart += 1;
          this.cart += 1;
        }else { alert('извините все слоты заполнены')}

      }
    }
   
  }
  updateCartDown(idCard: string) {
    const currentCard = this.dataCards.find((item) => {
      if (item.img === idCard) {
        return item;
      }
    });
    if (currentCard) {
      if (currentCard.countInCart > 0) {
        currentCard.countInCart -= 1;
        this.cart -= 1;
      }
    }
  }
}



