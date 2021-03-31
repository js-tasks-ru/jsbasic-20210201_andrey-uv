import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    let cart = this.elem;
    if (cart.offsetWidth === 0) {return false;}

    let container = document.querySelector('.container');
    let widthWindow = document.documentElement.clientWidth;
    let left = ((widthWindow - container.offsetWidth) / 2) + container.offsetWidth + 20;
    let right = left + cart.offsetWidth + 10;
    let topOffset = 50;
    let leftOffset = widthWindow <= right ? ((widthWindow - container.offsetWidth)) + container.offsetWidth - cart.offsetWidth - 10 : left;

    if (pageYOffset > topOffset) {
      setPosition('fixed', topOffset, leftOffset, 100);
    } else {
      cart.style = null;
    }

    isMobile();

    function setPosition(position, top, left, zIndex) {
      cart.style.position = position;
      cart.style.top = `${top}px`;
      cart.style.left = `${left}px`;
      cart.style.zIndex = zIndex;
    }

    function isMobile() {
      if (document.documentElement.clientWidth <= 767) {
        cart.style = null;
      }
    }
  }
}
