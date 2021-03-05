import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  #imageRoot = '/assets/images/products';

  constructor(product) {
    this.product = product;
    this.render();
    this.elem.addEventListener('click', (event) => this.addProduct(event));
  }

  render() {
    this.elem = createElement(
      `<div class="card">
        <div class="card__top">
          <img src="${this.#imageRoot}/${this.product.image}" class="card__image" alt="product">
          <span class="card__price">€${this.product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">Laab kai chicken salad</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`);
  }

  addProduct(event) {
    let addBtn = event.target;

    if (!addBtn.closest('button')) {return;}

    addBtn.dispatchEvent(new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true
    }));
  }
}
