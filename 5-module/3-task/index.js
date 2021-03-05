function initCarousel() {
  let carousel = document.querySelector('.carousel');
  let carouselTrack = carousel.querySelector('.carousel__inner');
  let carouselSliders = carousel.querySelectorAll('.carousel__slide');
  let carouselArrowRight = carousel.querySelector('.carousel__arrow_right');
  let carouselArrowLeft = carousel.querySelector('.carousel__arrow_left');
  let carouselArrow = `.${carousel.className} .carousel__arrow`;

  let carouselSlidersCount = carouselSliders.length;
  let widthSlide = carouselTrack.offsetWidth;
  let currentSlideNumber = 0;
  let position = 0;

  let clickBtn = (event) => {
    let btn = event.target.closest(carouselArrow);

    if (!btn || !carousel.contains(btn)) {return;}

    if (btn.classList.contains('carousel__arrow_right')) {
      position -= widthSlide;
      currentSlideNumber++;
    }

    if (btn.classList.contains('carousel__arrow_left')) {
      position += widthSlide;
      currentSlideNumber--;
    }

    carouselTrack.style.transform = `translateX(${position}px)`;
    checkBtnSatus(position);
  };

  let checkBtnSatus = () => {
    if (currentSlideNumber == carouselSlidersCount - 1) {
      carouselArrowRight.style.display = 'none';
    } else {
      carouselArrowRight.style.display = '';
    }

    if (currentSlideNumber == 0) {
      carouselArrowLeft.style.display = 'none';
    } else {
      carouselArrowLeft.style.display = '';
    }
  };

  // Events
  carousel.addEventListener('click', (event) => {
    clickBtn(event);
  });
  checkBtnSatus();
}
