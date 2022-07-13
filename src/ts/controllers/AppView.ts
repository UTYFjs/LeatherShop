import { IDataCard } from "../interfaces/interfaces";
import { data } from '../modules/data';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export class AppView {
  data: Array<IDataCard>;
  constructor(data: Array<IDataCard>) {
    this.data = data;
  }
  div(): HTMLElement {
    const div: HTMLElement = document.createElement('div');
    return div;
  }

  getCatalog(data: Array<IDataCard>): HTMLElement {
    const catalog: HTMLElement = this.div();
    catalog.classList.add('catalog');
    data.forEach((item): void => {
      const card: HTMLElement = this.div();
      card.classList.add('card');
      const img: HTMLElement = document.createElement('img');
      img.classList.add('img');
      img.setAttribute('src', item.img);
      img.setAttribute('alt', item.name);
      const description: HTMLElement = this.div();
      description.classList.add('description');
      const cardTitle: HTMLElement = document.createElement('h4');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = item.name;
      const cardPrice: HTMLElement = document.createElement('p');
      cardPrice.classList.add('card-price');
      cardPrice.textContent = item.price;
      description.append(cardTitle);
      description.append(cardPrice);
      card.append(img);
      card.append(description);
      catalog.append(card);
    });
    catalog.append(this.getRangeSlider());
    return catalog;
  }

  createCheckbox(
    name: string,
    text: string,
    parent?: HTMLElement
  ): HTMLElement {
    const wrapper: HTMLElement = this.div();
    wrapper.classList.add(name);
    const input: HTMLElement = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', name);
    const label: HTMLElement = document.createElement('label');
    label.textContent = text;
    label.setAttribute('id', name);
    wrapper.append(input);
    wrapper.append(label);

    parent?.append(wrapper);
    return wrapper;
  }

  createButton(type: string, text: string, parent: HTMLElement): HTMLElement {
    const button: HTMLElement = document.createElement('button');
    button.setAttribute('type', type);
    button.textContent = text;
    parent.append(button);
    return button;
  }

  getSidebar(): HTMLElement {
    const sidebar: HTMLElement = this.div();
    sidebar.classList.add('sidebar');

    const searchField: HTMLElement = this.div();
    searchField.classList.add('search-field');
    searchField.textContent = 'Поиск';

    const search: HTMLElement = document.createElement('input');
    search.setAttribute('type', 'search');
    searchField.append(search);

    const filterField: HTMLElement = this.div();
    filterField.classList.add('filter-field');

    const product: HTMLElement = this.div();
    product.classList.add('product');
    product.textContent = 'Изделия';

    this.createButton('wallet', 'Кошельки', product);
    this.createButton('cardholder', 'Картхолдеры', product);
    this.createButton('for-documents', 'Для документов', product);
    this.createButton('belt', 'Ремни', product);
    this.createButton('notebook', 'Блокноты', product);
    this.createButton('bag', 'Сумки', product);

    const productCheckbox: HTMLElement = this.div();
    productCheckbox.classList.add('product');
    productCheckbox.textContent = 'Изделия';
    this.createCheckbox('wallet', 'Кошельки', productCheckbox);
    this.createCheckbox('cardholder', 'Картхолдеры', productCheckbox);
    this.createCheckbox('forDocuments', 'Для документов', productCheckbox);
    this.createCheckbox('belt', 'Ремни', productCheckbox);
    this.createCheckbox('notebook', 'Блокноты', productCheckbox);
    this.createCheckbox('bag', 'Сумки', productCheckbox);

    const manufacturer: HTMLElement = this.div();
    manufacturer.classList.add('manufacturer');
    manufacturer.textContent = 'Производитель';
    this.createButton('ap-paco', 'Al Paco', manufacturer);
    this.createButton('other', 'Другие', manufacturer);

    const available: HTMLElement = this.div();
    available.classList.add('available');
    available.textContent = 'Наличие';
    this.createButton('available', 'В наличии', available);
    this.createButton('on-order', 'Под заказ', available);
    this.createButton('unavailable', 'Временно не доступно', available);

    const color: HTMLElement = this.div();
    color.classList.add('manufacturer');
    color.textContent = 'Цвет';
    this.createButton('black', '', color);
    this.createButton('brown', '', color);
    this.createButton('redhead', '', color);
    this.createButton('other', '', color);

    const freeShipping: HTMLElement = this.createCheckbox(
      'free-shipping',
      'Free Shipping'
    );

    filterField.append(product);
    filterField.append(manufacturer);
    filterField.append(color);
    filterField.append(available);
    filterField.append(freeShipping);

    filterField.append(productCheckbox);

    sidebar.append(searchField);
    sidebar.append(filterField);

    return sidebar;
  }
  getSort(): HTMLElement {
    const sortField: HTMLElement = this.div();
    sortField.classList.add('sort-field');

    const select: HTMLElement = document.createElement('select');
    const arr: string[] = ['']; /// можно сделать enum]

    return sortField;
  }

  getRangeSlider(): HTMLElement {
    const slider: HTMLElement = this.div();
    slider.setAttribute('id', 'slider');

    noUiSlider.create(slider, {
      start: [20, 80],
      connect: true,
      range: {
        min: 0,
        max: 100,
      },
      //pips: {
      //  mode: 'steps',
      //  stepped: true,
      //  density: 4
      //},
    });

    slider.style.height = '5px';
    slider.style.width = '200px';
    slider.style.margin = '0 auto 5px';

    return slider;
  }

  init(data: Array<IDataCard>): void {
    console.log('run');
    const main: HTMLElement = document.createElement('main');
    main.classList.add('main');
    const container: HTMLElement = this.div();
    container.classList.add('container');
    const sidebar: HTMLElement = this.getSidebar();
    sidebar.classList.add('sidebar');
    const sortField: HTMLElement = this.div();
    sortField.classList.add('sort-field');
    const catalog: HTMLElement = this.getCatalog(data);
    catalog.classList.add('catalog');

    container.append(sortField);
    container.append(catalog);
    main.append(sidebar);
    main.append(container);

    document.body.append(main);
  }
  destroyCatalog(){
    document.querySelector('.main')?.remove();
    }
}