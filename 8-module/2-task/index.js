import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(
      `<div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>`);

    this.renderCards(this.products);
  }

  renderCards(products) {
    this.elem.querySelector('.products-grid__inner').innerHTML = '';

    products.map(product => {
      let card = new ProductCard(product);
      this.elem.querySelector('.products-grid__inner').append(card.elem);
    });
  }

  updateFilter(filtersArgs) {
    this.filters = {...this.filters, ...filtersArgs};
    let products = this.products.filter(product => (
      (!this.filters.noNuts || product.nuts !== this.filters.noNuts) &&
      (!this.filters.vegeterianOnly || product.vegeterian === this.filters.vegeterianOnly) &&
      (!this.filters.maxSpiciness || product.spiciness <= this.filters.maxSpiciness) &&
      (!this.filters.category || product.category === this.filters.category)
    ));

    this.renderCards(products);
  }
}
