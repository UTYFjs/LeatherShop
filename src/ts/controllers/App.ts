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
    const input: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('input');
    input.forEach((item) => {
      item.addEventListener('click', () => { ///должна быть функция фильтр 
        console.log( 'listener work')
        this.model.newFilter();
        this.view.main.getCatalog(this.model.dataCards);
      });
    });

    const search: HTMLElement | null = document.getElementById('search');
    search?.addEventListener('input', () => {
      this.model.search(search as HTMLInputElement);
      this.view.main.getCatalog(this.model.dataCards);
    })
  }
}