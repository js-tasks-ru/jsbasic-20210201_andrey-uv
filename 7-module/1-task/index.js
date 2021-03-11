import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.ref('inner').onscroll = () => this.setStatusArrowBtn();
    this.elem.addEventListener('click', (event) => {
      this.scroll(event);
      this.selectItemNav(event);
    });
  }

  ref(ref, showLikeText, showDot = true) {
    if (showLikeText) {
      if (!showDot) {
        return `ribbon__${ref}`;
      }

      return `.ribbon__${ref}`;
    }

    return this.elem.querySelector(`.ribbon__${ref}`);
  }

  render() {
    this.elem = createElement(
      `<div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          ${this.categories.map((item, index) =>
          `<a href="#" class="ribbon__item ${index === 0 ? 'ribbon__item_active' : '' }" data-id="${item.id}">${item.name}</a>`).join('')}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>`);
  }

  scroll(event) {
    let actElem = event.target;
    let scrollTrack = this.ref('inner');
    let scrollToRight = this.ref('arrow_right', true);
    let scrollToLeft = this.ref('arrow_left', true);

    if (!actElem.closest(this.ref('arrow', true))) {return false;}

    if (actElem.closest(scrollToRight)) {
      scrollTrack.scrollBy(350, 0);
    }

    if (actElem.closest(scrollToLeft)) {
      scrollTrack.scrollBy(-350, 0);
    }
  }

  setStatusArrowBtn() {
    let scrollTrack = this.ref('inner');
    let scrollToRight = this.ref('arrow_right');
    let scrollToLeft = this.ref('arrow_left');

    let checkScrollRight = scrollTrack.scrollWidth - scrollTrack.scrollLeft - scrollTrack.clientWidth;

    if (scrollTrack.scrollLeft > 0) {
      scrollToLeft.classList.add('ribbon__arrow_visible');
    } else {
      scrollToLeft.classList.remove('ribbon__arrow_visible');
    }

    if (checkScrollRight < 1) {
      scrollToRight.classList.remove('ribbon__arrow_visible');
    } else {
      scrollToRight.classList.add('ribbon__arrow_visible');
    }
  }

  selectItemNav(event) {
    event.preventDefault();
    let itemElem = event.target;

    if (!itemElem.closest(this.ref('item', true))) {return false;}

    let itemElemid = itemElem.dataset.id;
    let itemsNav = this.elem.querySelectorAll('.ribbon__item');

    Array.prototype.map.call(itemsNav, item => {
      item.classList.remove(this.ref('item_active', true, false));
    });

    itemElem.classList.add(this.ref('item_active', true, false));

    itemElem.dispatchEvent(new CustomEvent('ribbon-select', {
      detail: itemElemid,
      bubbles: true
    }));

  }
}
