import { IDataCard, IProductTypes } from '../interfaces/interfaces';
import { data } from '../modules/data';


export class BasicCatalog {
  dataCards: Array<IDataCard>;
  allCards: Array<IDataCard>;
  productTypes: IProductTypes;
  filter: boolean;
  searchCards: Array<IDataCard> | null;

  constructor(data: Array<IDataCard>) {
    this.dataCards = data;
    this.searchCards = data;
    this.allCards = data;
    this.productTypes = {belt: true, wallet: true, notebook: true, bag: true, cardholder: true, forDocuments: true,};
    this.filter = false;
  }


  newFilter():void{
    console.log('filter start');
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
      }
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

    /// Доработать для работы с массивами чтобы не дублироваись карточки
    /*const color: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      '.product-color'
    );
    let onlyColor: Array<IDataCard> = [];
    console.log('color');
    console.log(color);
    color.forEach((item) => {

      if (item.checked) {
        if (onlyFreeShipping) {
          onlyFreeShipping.forEach((card) => {
            console.log(card.color.includes(item.id));
            if (card.color.includes(item.id)) {
              onlyColor.push(card);
            }
          });
        } else {
          this.allCards.forEach((card) => {
            if (card.color.includes(item.id)) {
              onlyColor.push(card);
            }
          });
        }
      }
    });
    onlyColor = onlyColor.length ? onlyColor : onlyFreeShipping;*/

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
      this.dataCards = this.allCards;
    }

    this.searchCards = this.dataCards.concat([]);
    //const search: HTMLInputElement =  document.querySelector('#search').addEventListener( input, )
    /* const search: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('#search');

      search.forEach( (item) => {
        item.addEventListener(input, console.log ('fdfdf'))
      })
   function () {
        const val = this.value.trim();
        const elasticItems = document.querySelectorAll('.el p');
        if (val != '') {
        // проверка если вводимое значение не равно пустой строке
          elasticItems.forEach(function (elem) {
            if (elem.innerText.search(val) == -1) {
              elem.classList.add('.hide');
            } else {
              elem.classList.remove('.hide');
            }
          });
        } else {
          elasticItems.forEach(function (elem) {
            elem.classList.remove('.hide');
          });
        }
      };*/
  }



  search(inputNode: HTMLInputElement):void {
    console.log('search start');
    const value: string = inputNode.value.toUpperCase();
    console.log(value);
    console.log('this.searchCards');
    console.log(this.searchCards);
    const forSearch: Array<IDataCard> | undefined = this.searchCards?.concat([]);
    //this.dataCards.concat(this.dataCards,[]);
    //console.log('forsearch');
    //console.log(forSearch);


    const onlySearchCard: Array<IDataCard> = [];
    forSearch?.forEach((card) => {
      console.log(card.name.search(value));
      const nameToUpper = card.name.toUpperCase();
      if (nameToUpper.search(value) !== -1) {
        onlySearchCard.push(card);
      }
    });
    if (onlySearchCard !== undefined){
      this.dataCards = onlySearchCard;
    } else {this.dataCards = []}
      


  }


}
