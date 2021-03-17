import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
    // this.updateFilter({ noNuts: true });
    this.renderCards(this.products);
  }

  render() {
    this.elem = createElement(
      `<div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>`);
  }

  renderCards(products) {
    this.elem.querySelector('.products-grid__inner').innerHTML = products.map(product =>
      `<div class="card">
          <div class="card__top">
            <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
            <span class="card__price">€${product.price.toFixed(2)}</span>
          </div>
          <div class="card__body">
            <div class="card__title">Laab kai chicken salad</div>
            <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`).join('');

  }

  updateFilter(filtersArgs) {
    this.filters = {...this.filters, ...filtersArgs};
    let products = this.products.filter(product => (
      (!this.filters.noNuts || product.nuts === this.filters.noNuts) &&
      (!this.filters.vegeterianOnly || product.vegeterian === this.filters.vegeterianOnly) &&
      (!this.filters.maxSpiciness || product.spiciness <= this.filters.maxSpiciness) &&
      (!this.filters.category || product.category === this.filters.category)
    ));


    console.log(this.filters);
    console.log(products);

    this.renderCards(products);
  }
}
