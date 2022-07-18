
export class Header {
  headerTemplate: HTMLElement;

  constructor() {
    this.headerTemplate = document.createElement('header');

  }

  initHeader(): void {
    const logo: HTMLElement = document.createElement('section');
    logo.classList.add('logo');
    const h1: HTMLElement = document.createElement('h1');
    h1.classList.add('logo-title');
    h1.textContent = 'Al Paco';
    logo.append(h1);

    const nav: HTMLElement = document.createElement('nav');
    nav.classList.add('menu');

    const menuList: HTMLElement = document.createElement('ul');
    menuList.classList.add('menu-list');

    const linksArr: string[] = ['Home', 'Catalog', 'About'];
    const hrefArr: string[] = ['#', '#wrapper-catalog', '#footer'];
    linksArr.forEach((item, index) => {
      const menuItem: HTMLElement = document.createElement('li');
      menuItem.classList.add('menu-list-item');

      const a: HTMLElement = document.createElement('a');
      a.classList.add('menu-link');
      a.setAttribute('href', hrefArr[index]);
      a.textContent = item;

      menuItem.append(a);
      menuList.append(menuItem);
    });
    nav.append(menuList);
    this.headerTemplate.append(logo);
    this.headerTemplate.append(nav);
    this.headerTemplate.classList.add('header');
    this.headerTemplate.setAttribute('id','header');

    document.body.append(this.headerTemplate);
  }
  createCart(data: number) {
    const oldCart =document.getElementById('cart');
    this.destroy(oldCart);
    const cart: HTMLElement = document.createElement('section');
    cart.classList.add('cart');
    cart.setAttribute('id','cart');

    const p: HTMLElement = document.createElement('p');
    p.classList.add('cart-indicate');
    p.textContent = `${data}`;
    cart.append(p);
    const img: HTMLElement = document.createElement('img');
    img.classList.add('cart-img');
    img.setAttribute('src', './assets/img/cart.svg');
    img.setAttribute('alt', 'cart-img');
    cart.append(img);

    const currentHeader = document.getElementById('header');
    currentHeader?.append(cart);

    return cart;
  }
  destroy(item: HTMLElement | null) {
    item?.remove();
    console.log('start destroy');
  }
}