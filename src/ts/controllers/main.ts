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

  initMain(): void {
    this.mainTemplate.classList.add('main');
    const container: HTMLElement = this.div();
    container.classList.add('container');
    const sidebar: HTMLElement = this.getSidebar();
    sidebar.classList.add('sidebar');
    const sortField: HTMLElement = this.getSort();
    sortField.classList.add('sort-field');
    const wrapperCatalog: HTMLElement = this.div();
    wrapperCatalog.classList.add('wrapper-catalog');
    wrapperCatalog.setAttribute('id', 'wrapper-catalog');

    container.append(sortField);
    container.append(wrapperCatalog);
    this.mainTemplate.append(sidebar);
    this.mainTemplate.append(container);

    document.body.append(this.mainTemplate);
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
      card.setAttribute('data-id', item.img);
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
      cardPrice.textContent = `Цена: ${item.price}`;
      description.append(cardTitle);
      description.append(cardPrice);
      const buyWrap: HTMLElement = this.div();
      buyWrap.classList.add('buy-wrap');
      if(item.countInCart){buyWrap.classList.add('buy-wrap-pick');}
      const titleCart: HTMLElement = this.div('buy-wrap-title');
      titleCart.textContent = 'Купить';
      buyWrap.append(titleCart);
      const removeFromCart: HTMLElement = this.div('buy-wrap-remove');
      removeFromCart.textContent = '-';
      removeFromCart.setAttribute('data-id', item.img);
      buyWrap.append(removeFromCart);
      const amountInCart: HTMLElement = this.div('buy-wrap-amount');
      amountInCart.textContent = `${item.countInCart}`;  /// нужно равнять какой то цифре из карточки
      if (item.countInCart) {
        amountInCart.classList.add('buy-wrap-amount-active');
      }
      buyWrap.append(amountInCart);
      const addToCart: HTMLElement = this.div('buy-wrap-add');
      addToCart.textContent = '+';
      addToCart.setAttribute('data-id', item.img);
      buyWrap.append(addToCart);
      const maxInCart: HTMLElement = this.div('buy-wrap-max');
      maxInCart.textContent = `max: ${item.stock}`;
      buyWrap.append(maxInCart);


      card.append(img);
      card.append(description);
      card.append(buyWrap);
      catalog.append(card);
    });
    
    if (!catalog.hasChildNodes()){
      const notFoundDiv: HTMLElement = this.div();
      notFoundDiv.classList.add('notFound');
      notFoundDiv.textContent = 'Извините, по вашему запросу ничего не найдено';
      catalog.append(notFoundDiv);
    } 
    
    

  
    const wrapperCatalog: HTMLElement | null =
      document.getElementById('wrapper-catalog');
    wrapperCatalog?.append(catalog);
    //catalog.replaceChildren(...cards);
    return catalog;
  }


  
  div(classAdd?: string): HTMLElement {
    const div: HTMLElement = document.createElement('div');
    if(classAdd){
      div.classList.add(classAdd);
    }    
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
    input.classList.add('checkbox');
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
  createOption (value: string, text: string, parent: HTMLSelectElement, id: string, classOption?: string ){
    const option: HTMLOptionElement = document.createElement('option');
    option.textContent = text;
    option.setAttribute('value', value);
    option.setAttribute('id', id);
    if(classOption){
      option.classList.add(classOption);
    }    
    parent.append(option);

  }
  createInput(type: string, id: string, placeholder: string, min: string, max: string  ):HTMLInputElement{
    const input: HTMLInputElement = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('placeholder', placeholder);
    input.setAttribute('min', min);
    input.setAttribute('max', max);
    return input;
  }
  getSort(): HTMLElement {
    const sortField: HTMLElement = this.div();
    sortField.classList.add('sort-field');
    const sortTitle: HTMLElement = this.div();
    sortTitle.textContent = 'Сортировка';
    sortTitle.classList.add('sort-title');

    const select: HTMLSelectElement = document.createElement('select');
    select.setAttribute('name', 'sort');
    select.classList.add('select');
    select.setAttribute('id', 'select');

    const arr: string[] = ['']; /// можно сделать enum]
    this.createOption(
      '',
      '',
      select,
      '',
      'option'
    );
    this.createOption('priceHighest', 'По возрастанию цены', select, 'priceHighest', 'option');
    this.createOption(
      'priceLowest',
      'По убыванию цены',
      select,
      'priceLowest',
      'option'
    );
    this.createOption('aHigh', 'По алфавиту(А-Я)', select, 'aHigh', 'option');
    this.createOption('zHigh', 'По алфавиту(Я-А)', select, 'zHigh', 'option');
    sortField.append(sortTitle);
    sortField.append(select);
    return sortField;
  }

  getRangeSlider(): HTMLElement {
    const slider: HTMLElement = this.div();
    slider.setAttribute('id', 'slider');

    noUiSlider.create(slider, {
      start: [20, 300],
      connect: true,
      step: 1,
      range: {
        min: [20],
        max: [300],
      },
      
      //pips: {
      //  mode: 'steps',
      //  stepped: true,
      //  density: 4
      //},
    });
    //slider.noUiSlider.on('update', (values, handle) =>
    //  console.log(values)
    //);

    slider.style.height = '5px';
    slider.style.width = '17vw';
    slider.style.margin = '0 auto 5px';

    return slider;
  }
  getRangeFilter(): HTMLElement{
    const rangeFilter: HTMLElement = this.div('price');
    rangeFilter.textContent = 'Стоимость';
    rangeFilter.append(this.getRangeSlider());
    const inputs: HTMLElement = this.div('price-inputs');
    inputs.append(this.createInput('number', 'price-from', '20', '20', '300'));
    inputs.append(this.createInput('number', 'price-to', '300', '20', '300'));
    rangeFilter.append(inputs);


    return rangeFilter;
  }

  protected getSidebar(): HTMLElement {
    const sidebar: HTMLElement = this.div();
    sidebar.classList.add('sidebar');

    const searchField: HTMLElement = this.div();
    searchField.classList.add('search-field');
    

    const search: HTMLInputElement = document.createElement('input');
    search.setAttribute('type', 'text');
    search.setAttribute('id', 'search');
    search.setAttribute('placeholder', 'Я ищу...');
    search.focus();
    const label: HTMLLabelElement = document.createElement('label');
    //label.textContent = 'Поиск';
    label.setAttribute('for', 'search');
    const closeButton:HTMLElement =document.createElement('span');
    closeButton.setAttribute('id','search-close-button');
    closeButton.textContent = 'X';
    searchField.append(label);
    searchField.append(search);
    searchField.append(closeButton);

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
    this.createCheckbox('coinBox', 'Монетницы', productCheckbox, 'product-type');

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
    this.createCheckbox('orange', 'Рыжий', color, 'product-color');
    this.createCheckbox('mix', 'Микс', color, 'product-color');
    this.createCheckbox('sand', 'Песочный', color, 'product-color');

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
    sidebar.append(this.getRangeFilter())

    return sidebar;
  }
  destroy(item: HTMLElement | null) {
    item?.remove();
  }
}
