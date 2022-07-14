import { BasicCatalog } from '../modules/basicCatalog';
import { data } from '../modules/data';
import { AppView } from './AppView';

type A = 'belt' |'wallet' | 'notebook' | 'bag' | 'cardholder' |'forDocuments'

export class App {
  view: AppView;
  model: BasicCatalog;

  constructor() {
    this.model = new BasicCatalog(data);
    this.view = new AppView(this.model.dataCards);
    
    
  }
  async start(): Promise<void> {
    await this.view.createPage();
    await this.listener();
  }

  listener() {

    const input = document.querySelectorAll('input');
    input.forEach((item) => {
      item.addEventListener('click', () => { ///должна быть функция фильтр 
        /*if (item.checked) {
          //const name: string = item.id;
          //this.model.productTypes[name];
          //console.log(this.model.productTypes);
          //console.log(item.id);
          const type = item.id;
          this.model.filterType(type);
        }*/
        this.model.newFilter();
        this.view.main.getCatalog(this.model.dataCards);
        //this.start();
        //this.view.init(this.model.dataCards);
        //console.log(item.checked);
      });
      //console.log(item.checked)
    });
  }
}