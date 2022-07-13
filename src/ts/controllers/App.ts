import { BasicCatalog } from '../modules/basicCatalog';
import { data } from '../modules/data';
import { AppView } from './AppView';

type A = 'belt' |'wallet' | 'notebook' | 'bag' | 'cardholder' |'forDocuments'
/*export default class App {
  constructor(){

  }
  async start(){
    const model = new AppModel();

    const view = new AppView();
    view.render()
  }
}*/
export class App {
  view: AppView;
  model: BasicCatalog;

  constructor(){
    this.model = new BasicCatalog(data);
    this.view = new AppView(this.model.dataCards);
  }

  async start():Promise<void>{
    await this.view.init(this.model.dataCards);
    const input = document.querySelectorAll('input');
    input.forEach((item) => {
      item.addEventListener('click', () => {
        if (item.checked) {
          const name: string = item.id;
          //this.model.productTypes[name];
          console.log(this.model.productTypes);
          console.log(item.id);
          const type = item.id;
          this.model.filterType(type);
        }
        this.view.destroyCatalog();
        this.start();
        //this.view.init(this.model.dataCards);
        //console.log(item.checked);
      });
      //console.log(item.checked)
    });


    /*input.forEach((item) => {
      item.addEventListener('click', () => {
        this.view.init();
      });
    });*/
    
    //input?.addEventListener('click', (e) => console.log(e));
  }
}