import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #imagesIconsRoot = '/assets/images/icons';
  #imagesCarouselRoot = '/assets/images/carousel';

  constructor(slides) {
    this.slides = slides;
    this.render();

    this._carousel = this.elem;
    this._carouselTrack = this._carousel.querySelector('.carousel__inner');
    this._carouselSliders = this._carousel.querySelectorAll('.carousel__slide');
    this._carouselArrowRight = this._carousel.querySelector('.carousel__arrow_right');
    this._carouselArrowLeft = this._carousel.querySelector('.carousel__arrow_left');
    this._carouselArrow = `.${this._carousel.className} .carousel__arrow`;

    this._carouselSlidersCount = this._carouselSliders.length;
    this._currentSlideNumber = 0;
    this._position = 0;

    this.checkBtnSatus();

    this._carousel.addEventListener('click', (event) => {
      this.updateSlider(event);
      this.addProduct(event);
    });
  }

  render() {
    this.elem = createElement(
      `<div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="${this.#imagesIconsRoot}/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="${this.#imagesIconsRoot}/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">

        ${this.slides.map(item =>
          `<div class="carousel__slide" data-id="${item.id}">
            <img src="${this.#imagesCarouselRoot}/${item.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${item.price.toFixed(2)}</span>
              <div class="carousel__title">${item.name}</div>
              <button type="button" class="carousel__button">
                <img src="${this.#imagesIconsRoot}/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>`).join('')}

        </div>
      </div>`);
  }

  checkBtnSatus() {
    if (this._currentSlideNumber == this._carouselSlidersCount - 1) {
      this._carouselArrowRight.style.display = 'none';
    } else {
      this._carouselArrowRight.style.display = '';
    }

    if (this._currentSlideNumber == 0) {
      this._carouselArrowLeft.style.display = 'none';
    } else {
      this._carouselArrowLeft.style.display = '';
    }
  }

  updateSlider(event) {
    let widthSlide = this._carouselTrack.offsetWidth;
    let btn = event.target.closest(this._carouselArrow);

    if (!btn || !this._carousel.contains(btn)) {return;}

    if (btn.classList.contains('carousel__arrow_right')) {
      this._position -= widthSlide;
      this._currentSlideNumber++;
    }

    if (btn.classList.contains('carousel__arrow_left')) {
      this._position += widthSlide;
      this._currentSlideNumber--;
    }

    this._carouselTrack.style.transform = `translateX(${this._position}px)`;
    this.checkBtnSatus();
  }

  addProduct(event) {
    let addBtn = event.target;

    if (!addBtn.closest('.carousel__button')) {return;}

    let slideId = addBtn.closest('.carousel__slide').dataset.id;

    addBtn.dispatchEvent(new CustomEvent("product-add", {
      detail: slideId,
      bubbles: true
    }));
  }
}
