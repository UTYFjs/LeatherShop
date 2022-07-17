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
    await this.view.createPage(this.model.cart);
    await this.listener();
  }

  listener() {
    const input: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.checkbox');
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

    const sort: HTMLElement | null = document.getElementById('select');
    sort?.addEventListener('change', ():void => {
      this.model.sort();
      this.view.main.getCatalog(this.model.dataCards);
    })

    const updateCartUp: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.buy-wrap-add');
    updateCartUp.forEach((item) => {
      item.addEventListener('click', () => {
        ///должна быть функция фильтр
        console.log('кнопка работает');
        console.log(item.dataset.id);
        if (item.dataset.id) this.model.updateCartUp(item.dataset.id);
        this.view.header.createCart(this.model.cart);
        this.view.main.getCatalog(this.model.dataCards);
        this.listener();
      });
    });

    const updateCartDown: NodeListOf<HTMLInputElement> =
          document.querySelectorAll('.buy-wrap-remove');
    updateCartDown.forEach((item) => {
      item.addEventListener('click', () => {
        ///должна быть функция фильтр
        console.log('кнопка работает');
        console.log(item.dataset.id);
        if (item.dataset.id) this.model.updateCartDown(item.dataset.id);
        this.view.header.createCart(this.model.cart);
        this.view.main.getCatalog(this.model.dataCards);
        this.listener();
      });
    });

  }
}