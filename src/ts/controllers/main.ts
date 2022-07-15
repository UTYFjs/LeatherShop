import { IDataCard } from '../interfaces/interfaces';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export class Main {
  mainTemplate: HTMLElement;
  data: Array<IDataCard>;
  constructor(data: Array<IDataCard>) {
    this.data = data;
    this.mainTemplate = document.createElement('main');
  }

  initMain(data: Array<IDataCard>): void {
    console.log('run init main');
    this.mainTemplate.classList.add('main');
    const container: HTMLElement = this.div();
    container.classList.add('container');
    const sidebar: HTMLElement = this.getSidebar();
    sidebar.classList.add('sidebar');
    const sortField: HTMLElement = this.div();
    sortField.classList.add('sort-field');
    const wrapperCatalog: HTMLElement = this.div();
    wrapperCatalog.classList.add('wrapper-catalog');
    wrapperCatalog.setAttribute('id', 'wrapper-catalog');

    //const newCatalog: HTMLElement = this.getCatalog(data);
    //wrapperCatalog.append(newCatalog);
    container.append(sortField);
    container.append(wrapperCatalog);
    this.mainTemplate.append(sidebar);
    this.mainTemplate.append(container);

    document.body.append(this.mainTemplate);

    /*const footerList: HTMLElement = document.createElement('ul');
    footerList.classList.add('footer-link');
    footerList.innerHTML = `<li class = "footer-link-item img"><a class = "author-github" href="https://github.com/UTYFjs" target="_blank"><img width="40px" height="40px" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjYgMC0xMiA1LjM3My0xMiAxMiAwIDUuMzAyIDMuNDM4IDkuOCA4LjIwNyAxMS4zODcuNTk5LjExMS43OTMtLjI2MS43OTMtLjU3N3YtMi4yMzRjLTMuMzM4LjcyNi00LjAzMy0xLjQxNi00LjAzMy0xLjQxNi0uNTQ2LTEuMzg3LTEuMzMzLTEuNzU2LTEuMzMzLTEuNzU2LTEuMDg5LS43NDUuMDgzLS43MjkuMDgzLS43MjkgMS4yMDUuMDg0IDEuODM5IDEuMjM3IDEuODM5IDEuMjM3IDEuMDcgMS44MzQgMi44MDcgMS4zMDQgMy40OTIuOTk3LjEwNy0uNzc1LjQxOC0xLjMwNS43NjItMS42MDQtMi42NjUtLjMwNS01LjQ2Ny0xLjMzNC01LjQ2Ny01LjkzMSAwLTEuMzExLjQ2OS0yLjM4MSAxLjIzNi0zLjIyMS0uMTI0LS4zMDMtLjUzNS0xLjUyNC4xMTctMy4xNzYgMCAwIDEuMDA4LS4zMjIgMy4zMDEgMS4yMy45NTctLjI2NiAxLjk4My0uMzk5IDMuMDAzLS40MDQgMS4wMi4wMDUgMi4wNDcuMTM4IDMuMDA2LjQwNCAyLjI5MS0xLjU1MiAzLjI5Ny0xLjIzIDMuMjk3LTEuMjMuNjUzIDEuNjUzLjI0MiAyLjg3NC4xMTggMy4xNzYuNzcuODQgMS4yMzUgMS45MTEgMS4yMzUgMy4yMjEgMCA0LjYwOS0yLjgwNyA1LjYyNC01LjQ3OSA1LjkyMS40My4zNzIuODIzIDEuMTAyLjgyMyAyLjIyMnYzLjI5M2MwIC4zMTkuMTkyLjY5NC44MDEuNTc2IDQuNzY1LTEuNTg5IDguMTk5LTYuMDg2IDguMTk5LTExLjM4NiAwLTYuNjI3LTUuMzczLTEyLTEyLTEyeiIvPjwvc3ZnPg=="></a></li>
      <li class = "footer-link-item school"><a class = "link-school" href="https://rs.school/js/" target="_blank"><svg class = "svg-img" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 552.8 205.3"><style>.st0{fill:#fff}.st1{clip-path:url(#SVGID_2_)}.st2{clip-path:url(#SVGID_4_)}.st3{clip-path:url(#SVGID_6_)}.st4{clip-path:url(#SVGID_8_)}.st5{fill:#fff;stroke:rgb(255, 255, 255);stroke-width:4;stroke-miterlimit:10}.st6{clip-path:url(#SVGID_8_)}.st6,.st7{fill:none;stroke:rgb(255, 255, 255);stroke-width:4;stroke-miterlimit:10}.st8,.st9{clip-path:url(#SVGID_10_)}.st9{fill:none;stroke:rgb(255, 255, 255);stroke-width:4;stroke-miterlimit:10}</style><title>rs_school_js</title><path d="M285.4 68l26.3-1.7c.6 4.3 1.7 7.5 3.5 9.8 2.9 3.6 6.9 5.4 12.2 5.4 3.9 0 7-.9 9.1-2.8 2-1.5 3.2-3.9 3.2-6.4 0-2.4-1.1-4.7-3-6.2-2-1.8-6.7-3.6-14.1-5.2-12.1-2.7-20.8-6.3-25.9-10.9-5.1-4.3-8-10.6-7.8-17.3 0-4.6 1.4-9.2 4-13 3-4.3 7.1-7.7 12-9.6 5.3-2.3 12.7-3.5 22-3.5 11.4 0 20.1 2.1 26.1 6.4 6 4.2 9.6 11 10.7 20.3l-26 1.5c-.7-4-2.1-6.9-4.4-8.8s-5.3-2.8-9.2-2.8c-3.2 0-5.6.7-7.2 2-1.5 1.2-2.5 3-2.4 5 0 1.5.8 2.9 2 3.8 1.3 1.2 4.4 2.3 9.3 3.3 12.1 2.6 20.7 5.2 26 7.9 5.3 2.7 9.1 6 11.4 9.9 2.4 4 3.6 8.6 3.5 13.3 0 5.6-1.6 11.2-4.8 15.9-3.3 4.9-7.9 8.7-13.3 11-5.7 2.5-12.9 3.8-21.5 3.8-15.2 0-25.7-2.9-31.6-8.8S286.1 77 285.4 68zM6.3 97.6V8.2h46.1c8.5 0 15.1.7 19.6 2.2 4.4 1.4 8.3 4.3 10.9 8.2 2.9 4.3 4.3 9.3 4.2 14.5.3 8.8-4.2 17.2-11.9 21.6-3 1.7-6.3 2.9-9.7 3.5 2.5.7 5 1.9 7.2 3.3 1.7 1.4 3.1 3 4.4 4.7 1.5 1.7 2.8 3.6 3.9 5.6l13.4 25.9H63L48.2 70.2c-1.9-3.5-3.5-5.8-5-6.9-2-1.4-4.4-2.1-6.8-2.1H34v36.3H6.3zM34 44.4h11.7c2.5-.2 4.9-.6 7.3-1.2 1.8-.3 3.4-1.3 4.5-2.8 2.7-3.6 2.3-8.7-1-11.8-1.8-1.5-5.3-2.3-10.3-2.3H34v18.1zM0 174.2l26.3-1.7c.6 4.3 1.7 7.5 3.5 9.8 2.8 3.6 6.9 5.5 12.2 5.5 3.9 0 7-.9 9.1-2.8 2-1.6 3.2-3.9 3.2-6.4 0-2.4-1.1-4.7-3-6.2-2-1.8-6.7-3.6-14.2-5.2-12.1-2.7-20.8-6.3-25.9-10.9-5.1-4.3-8-10.6-7.8-17.3 0-4.6 1.4-9.2 4-13 3-4.3 7.1-7.7 12-9.6 5.3-2.3 12.7-3.5 22-3.5 11.4 0 20.1 2.1 26.1 6.4s9.5 11 10.6 20.3l-26 1.5c-.7-4-2.1-6.9-4.4-8.8-2.2-1.9-5.3-2.8-9.2-2.7-3.2 0-5.6.7-7.2 2.1-1.6 1.2-2.5 3-2.4 5 0 1.5.8 2.9 2 3.8 1.3 1.2 4.4 2.3 9.3 3.3 12.1 2.6 20.7 5.2 26 7.9 5.3 2.7 9.1 6 11.4 9.9 2.4 4 3.6 8.6 3.6 13.2 0 5.6-1.7 11.1-4.8 15.8-3.3 4.9-7.9 8.7-13.3 11-5.7 2.5-12.9 3.8-21.5 3.8-15.2 0-25.7-2.9-31.6-8.8-5.9-6-9.2-13.4-10-22.4z"/><path d="M133 167.2l24.2 7.3c-1.3 6.1-4 11.9-7.7 17-3.4 4.5-7.9 8-13 10.3-5.2 2.3-11.8 3.5-19.8 3.5-9.7 0-17.7-1.4-23.8-4.2-6.2-2.8-11.5-7.8-16-14.9-4.5-7.1-6.7-16.2-6.7-27.3 0-14.8 3.9-26.2 11.8-34.1s19-11.9 33.4-11.9c11.3 0 20.1 2.3 26.6 6.8 6.4 4.6 11.2 11.6 14.4 21l-24.4 5.4c-.6-2.1-1.5-4.2-2.7-6-1.5-2.1-3.4-3.7-5.7-4.9-2.3-1.2-4.9-1.7-7.5-1.7-6.3 0-11.1 2.5-14.4 7.6-2.5 3.7-3.8 9.6-3.8 17.6 0 9.9 1.5 16.7 4.5 20.4 3 3.7 7.2 5.5 12.7 5.5 5.3 0 9.3-1.5 12-4.4 2.7-3.1 4.7-7.4 5.9-13zm56.5-52.8h27.6v31.3h30.2v-31.3h27.8v89.4h-27.8v-36.2h-30.2v36.2h-27.6v-89.4z"/><path d="M271.3 159.1c0-14.6 4.1-26 12.2-34.1 8.1-8.1 19.5-12.2 34-12.2 14.9 0 26.3 4 34.4 12S364 144 364 158.4c0 10.5-1.8 19-5.3 25.7-3.4 6.6-8.7 12-15.2 15.6-6.7 3.7-15 5.6-24.9 5.6-10.1 0-18.4-1.6-25-4.8-6.8-3.4-12.4-8.7-16.1-15.2-4.1-7-6.2-15.7-6.2-26.2zm27.6.1c0 9 1.7 15.5 5 19.5 3.3 3.9 7.9 5.9 13.7 5.9 5.9 0 10.5-1.9 13.8-5.8s4.9-10.8 4.9-20.8c0-8.4-1.7-14.6-5.1-18.4-3.4-3.9-8-5.8-13.8-5.8-5.1-.2-10 2-13.4 5.9-3.4 3.9-5.1 10.4-5.1 19.5zm93.4-.1c0-14.6 4.1-26 12.2-34.1 8.1-8.1 19.5-12.2 34-12.2 14.9 0 26.4 4 34.4 12S485 144 485 158.4c0 10.5-1.8 19-5.3 25.7-3.4 6.6-8.7 12-15.2 15.6-6.7 3.7-15 5.6-24.9 5.6-10.1 0-18.4-1.6-25-4.8-6.8-3.4-12.4-8.7-16.1-15.2-4.1-7-6.2-15.7-6.2-26.2zm27.6.1c0 9 1.7 15.5 5 19.5 3.3 3.9 7.9 5.9 13.7 5.9 5.9 0 10.5-1.9 13.8-5.8 3.3-3.9 4.9-10.8 4.9-20.8 0-8.4-1.7-14.6-5.1-18.4-3.4-3.9-8-5.8-13.8-5.8-5.1-.2-10.1 2-13.4 5.9-3.4 3.9-5.1 10.4-5.1 19.5z"/><path d="M482.1 114.4h27.6v67.4h43.1v22H482v-89.4z"/><ellipse transform="rotate(-37.001 420.46 67.88)" class="st0" cx="420.5" cy="67.9" rx="63" ry="51.8"/><defs><ellipse id="SVGID_1_" transform="rotate(-37.001 420.46 67.88)" cx="420.5" cy="67.9" rx="63" ry="51.8"/></defs><clipPath id="SVGID_2_"><use xlink:href="#SVGID_1_" overflow="visible"/></clipPath><g class="st1"><path transform="rotate(-37.001 420.82 68.353)" class="st0" d="M330.9-14.2h179.8v165.1H330.9z"/><g id="Layer_2_1_"><defs><path id="SVGID_3_" transform="rotate(-37.001 420.82 68.353)" d="M330.9-14.2h179.8v165.1H330.9z"/></defs><clipPath id="SVGID_4_"><use xlink:href="#SVGID_3_" overflow="visible"/></clipPath><g id="Layer_1-2" class="st2"><ellipse transform="rotate(-37.001 420.46 67.88)" class="st0" cx="420.5" cy="67.9" rx="63" ry="51.8"/><defs><ellipse id="SVGID_5_" transform="rotate(-37.001 420.46 67.88)" cx="420.5" cy="67.9" rx="63" ry="51.8"/></defs><clipPath id="SVGID_6_"><use xlink:href="#SVGID_5_" overflow="visible"/></clipPath><g class="st3"><path transform="rotate(-37 420.799 68.802)" class="st0" d="M357.8 17h125.9v103.7H357.8z"/><defs><path id="SVGID_7_" transform="rotate(-37 420.799 68.802)" d="M357.8 17h125.9v103.7H357.8z"/></defs><clipPath id="SVGID_8_"><use xlink:href="#SVGID_7_" overflow="visible"/></clipPath><g class="st4"><ellipse transform="rotate(-37.001 420.46 67.88)" class="st5" cx="420.5" cy="67.9" rx="63" ry="51.8"/></g><path transform="rotate(-37 420.799 68.802)" class="st6" d="M357.8 17h125.9v103.7H357.8z"/><ellipse transform="rotate(-37.001 420.46 67.88)" class="st7" cx="420.5" cy="67.9" rx="63" ry="51.8"/><path transform="rotate(-37 420.799 68.802)" class="st0" d="M357.8 17h125.9v103.7H357.8z"/><defs><path id="SVGID_9_" transform="rotate(-37 420.799 68.802)" d="M357.8 17h125.9v103.7H357.8z"/></defs><clipPath id="SVGID_10_"><use xlink:href="#SVGID_9_" overflow="visible"/></clipPath><g class="st8"><ellipse transform="rotate(-37.001 420.46 67.88)" class="st5" cx="420.5" cy="67.9" rx="63" ry="51.8"/></g><path transform="rotate(-37 420.799 68.802)" class="st9" d="M357.8 17h125.9v103.7H357.8z"/><path transform="rotate(-37.001 420.82 68.353)" class="st7" d="M330.9-14.2h179.8v165.1H330.9z"/></g><ellipse transform="rotate(-37.001 420.46 67.88)" class="st7" cx="420.5" cy="67.9" rx="63" ry="51.8"/><path d="M392.4 61.3l10-7 12.3 17.5c2.1 2.8 3.7 5.8 4.9 9.1.7 2.5.5 5.2-.5 7.6-1.3 3-3.4 5.5-6.2 7.3-3.3 2.3-6.1 3.6-8.5 4-2.3.4-4.7 0-6.9-1-2.4-1.2-4.5-2.9-6.1-5.1l8.6-8c.7 1.1 1.6 2.1 2.6 2.9.7.5 1.5.8 2.4.8.7 0 1.4-.3 1.9-.7 1-.6 1.7-1.8 1.6-3-.3-1.7-1-3.4-2.1-4.7l-14-19.7zm30 11.1l9.1-7.2c1 1.2 2.3 2.1 3.7 2.6 2 .6 4.1.2 5.8-1.1 1.2-.8 2.2-1.9 2.6-3.3.6-1.8-.4-3.8-2.2-4.4-.3-.1-.6-.2-.9-.2-1.2-.1-3.3.4-6.4 1.7-5.1 2.1-9.1 2.9-12.1 2.6-2.9-.3-5.6-1.8-7.2-4.3-1.2-1.7-1.8-3.7-1.9-5.7 0-2.3.6-4.6 1.9-6.5 1.9-2.7 4.2-5 7-6.8 4.2-2.9 7.9-4.3 11.1-4.3 3.2 0 6.2 1.5 9 4.6l-9 7.1c-1.8-2.3-5.2-2.8-7.5-1l-.3.3c-1 .6-1.7 1.5-2.1 2.6-.3.8-.1 1.7.4 2.4.4.5 1 .9 1.7.9.8.1 2.2-.3 4.2-1.2 5-2.1 8.8-3.3 11.4-3.7 2.2-.4 4.5-.2 6.6.7 1.9.8 3.5 2.2 4.6 3.9 1.4 2 2.2 4.4 2.3 6.9.1 2.6-.6 5.1-2 7.3-1.8 2.7-4.1 5-6.8 6.8-5.5 3.8-10 5.4-13.6 4.8-3.9-.6-7.1-2.6-9.4-5.5z"/></g></g></g></svg></a></li>`;

    const p: HTMLElement = document.createElement('p');
    p.classList.add('year');
    p.textContent = 'Suhakou Henadzi 2022';

    this.footerTemplate.append(footerList);
    this.footerTemplate.append(p);
    this.footerTemplate.classList.add('footer');
    console.log(this.footerTemplate);

    document.body.append(this.footerTemplate);*/
  }

  getCatalog(data: Array<IDataCard>): HTMLElement {
    const oldCatalog: HTMLElement | null =
          document.getElementById('catalog');
    this.destroy(oldCatalog);
    const catalog: HTMLElement = this.div();
    catalog.classList.add('catalog');
    catalog.setAttribute('id', 'catalog');
    //const cards: Array<HTMLElement> = [];
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
    const wrapperCatalog: HTMLElement | null =
      document.getElementById('wrapper-catalog');
    wrapperCatalog?.append(catalog);
    //catalog.replaceChildren(...cards);
    return catalog;
  }

  div(): HTMLElement {
    const div: HTMLElement = document.createElement('div');
    return div;
  }
  createCheckbox(
    id: string,
    text: string,
    parent: HTMLElement,
    classCheckbox: string
  ): HTMLElement {
    const wrapper: HTMLElement = this.div();
    wrapper.classList.add(id);
    const input: HTMLInputElement = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', id);
    input.classList.add(classCheckbox);
    const label: HTMLLabelElement = document.createElement('label');
    label.textContent = text;
    label.setAttribute('for', id);
    wrapper.append(input);
    wrapper.append(label);

    parent.append(wrapper);
    return wrapper;
  }

  createButton(type: string, text: string, parent: HTMLElement): HTMLElement {
    const button: HTMLElement = document.createElement('button');
    button.setAttribute('type', type);
    button.textContent = text;
    parent.append(button);
    return button;
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

  getSidebar(): HTMLElement {
    const sidebar: HTMLElement = this.div();
    sidebar.classList.add('sidebar');

    const searchField: HTMLElement = this.div();
    searchField.classList.add('search-field');
    

    const search: HTMLInputElement = document.createElement('input');
    search.setAttribute('type', 'text');
    search.setAttribute('id', 'search');
    const label: HTMLLabelElement = document.createElement('label');
    label.textContent = 'Поиск';
    label.setAttribute('for', 'search');
    searchField.append(label);
    searchField.append(search);

    const filterField: HTMLElement = this.div();
    filterField.classList.add('filter-field');

    const productCheckbox: HTMLElement = this.div();
    productCheckbox.classList.add('product');
    productCheckbox.textContent = 'Изделия';
    this.createCheckbox('wallet', 'Кошельки', productCheckbox, 'product-type');
    this.createCheckbox(
      'cardholder',
      'Картхолдеры',
      productCheckbox,
      'product-type'
    );
    this.createCheckbox(
      'forDocuments',
      'Для документов',
      productCheckbox,
      'product-type'
    );
    this.createCheckbox('belt', 'Ремни', productCheckbox, 'product-type');
    this.createCheckbox(
      'notebook',
      'Блокноты',
      productCheckbox,
      'product-type'
    );
    this.createCheckbox('bag', 'Сумки', productCheckbox, 'product-type');

    const manufacturer: HTMLElement = this.div();
    manufacturer.classList.add('manufacturer');
    manufacturer.textContent = 'Производитель';
    this.createCheckbox('alPaco', 'Al Paco', manufacturer, 'product-manufacturer');
    this.createCheckbox(
      'other',
      'Другие',
      manufacturer,
      'product-manufacturer'
    );
    const color: HTMLElement = this.div();
    color.classList.add('color');
    color.textContent = 'Цвет';
    this.createCheckbox('red', 'Kрасный', color, 'product-color');
    this.createCheckbox('black', 'Черный', color, 'product-color');
    this.createCheckbox('brown', 'Коричневый', color, 'product-color');
    this.createCheckbox('gold', 'Золотой', color, 'product-color');
    this.createCheckbox('redhead', 'Рыжий', color, 'product-color');


    const shipping: HTMLElement = this.div();
    shipping.classList.add('shipping');
    shipping.textContent = 'Доставка';
    this.createCheckbox(
      'freeShipping',
      'Free Shipping',
      shipping,
      'free-shipping'
    );

    const bestseller: HTMLElement = this.div();
    bestseller.classList.add('bestseller');
    bestseller.textContent = 'Популярные товары';
    this.createCheckbox(
      'bestseller',
      'Очень популярно',
      bestseller,
      'product-bestseller'
    );
 
        
    filterField.append(manufacturer);
    filterField.append(productCheckbox);
    filterField.append(shipping);
    filterField.append(bestseller);
    filterField.append(color);

    sidebar.append(searchField);
    sidebar.append(filterField);
    sidebar.append(this.getRangeSlider());

    return sidebar;
  }
  destroy(item: HTMLElement | null) {
    item?.remove();
    console.log('start destroy');
  }
}
