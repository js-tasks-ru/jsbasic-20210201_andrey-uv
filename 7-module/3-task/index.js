import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.segments = this.steps - 1;
    this.render();
    this.renderSteps();
    this.updatedSlider(this.rangePercents(this.value));
    this.elem.addEventListener('click', (event) => {
      this.onClick(event);
      this.customEvent();
    });
  }

  render() {
    this.elem = createElement(
      `<div class="slider">

        <div class="slider__thumb">
          <span class="slider__value">2</span>
        </div>

        <div class="slider__progress"></div>

        <div class="slider__steps"></div>
      </div>`
    );
  }

  ref(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }

  renderSteps() {
    for (let i = 0; i < this.steps; i++) {
      this.ref('steps').append(createElement('<span></span>'));
    }
  }

  onClick(event) {
    let eventElem = event.target.closest('.slider');
    if (!eventElem) {return false;}

    let clickPosition = event.clientX - this.elem.getBoundingClientRect().left;
    let clickRange = Math.round((clickPosition / this.elem.offsetWidth) * this.segments);
    let rangePercents = this.rangePercents(clickRange);
    this.updatedSlider(rangePercents);
    this.updatedActiveStep(clickRange);
    this.updatedValueSlider(clickRange);
    this.value = clickRange;
  }

  rangePercents(value) {
    return value / this.segments * 100;
  }

  updatedActiveStep(index) {
    let steps = this.elem.querySelectorAll('.slider__steps span');
    Array.prototype.map.call(steps, item => {
      item.classList.remove('slider__step-active');
    });

    this.ref(`steps span:nth-child(${index + 1})`).classList.add('slider__step-active');
  }

  updatedValueSlider(value) {
    this.ref('value').innerHTML = value;
  }

  updatedSlider(rangePercents) {
    this.updatedActiveStep(this.value);
    this.updatedValueSlider(this.value);
    this.ref('thumb').style.left = `${rangePercents}%`;
    this.ref('progress').style.width = `${rangePercents}%`;
  }

  customEvent() {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }
}
