import { IDataCard } from "../interfaces/interfaces";
import { data } from '../modules/data';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { Header } from './header'
import { Footer } from './footer';
import { BasicCatalog } from '../modules/basicCatalog';
import { Main } from './main';

export class AppView {
  data: Array<IDataCard>;
  header: Header;
  footer: Footer;
  main: Main;
  //model: BasicCatalog;
  constructor(data: Array<IDataCard>) {
    //this.model = new BasicCatalog(data);
    this.data = data;
    this.header = new Header();
    this.footer = new Footer();
    this.main = new Main(this.data);
  }

  async createPage(data:number): Promise<void> {
    await this.header.initHeader();
    await this.header.createCart(data)
    await this.main.initMain();
    await this.main.getCatalog(this.data);
    await this.footer.initFooter();
  }
  

  


}