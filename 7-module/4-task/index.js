
import createElement from '../../assets/lib/create-element.js';
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.segments = this.steps - 1;
    this.initialization();
  }

  initialization() {
    this.render();
    this.renderSteps();
    this.updatedStateSlider();
    this.updatedSlider(this.rangePercents(this.value));
    this.events();
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

  events() {
    this.ref('thumb').ondragstart = () => false;
    this.ref('thumb').addEventListener('pointerdown', (event) => this.onPointerDown(event));

    this.elem.addEventListener('click', this.onClick);
  }

  renderSteps() {
    for (let i = 0; i < this.steps; i++) {
      this.ref('steps').append(createElement('<span></span>'));
    }
  }

  onClick = event => {
    let eventElem = event.target.closest('.slider');
    if (!eventElem) {return false;}

    let clickRange = this.rangeRound(this.dragNDropPosition(event));
    let rangePercents = this.rangePercents(clickRange);
    this.updatedStateSlider();
    this.updatedSlider(rangePercents);
    this.updatedActiveStep(clickRange);
    this.updatedValueSlider(clickRange);
    this.value = clickRange;
    this.customEvent();
  }

  onPointerDown = event => {
    event.preventDefault();

    this.elem.classList.add('slider_dragging');
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove = event => {
    event.preventDefault();

    this.updatedSlider(this.dragNDropPosition(event) * 100);
    this.value = this.rangeRound(this.dragNDropPosition(event));
    this.updatedStateSlider();
  }

  onPointerUp = () => {
    document.removeEventListener('pointermove', this.onPointerMove);

    this.elem.classList.remove('slider_dragging');
    this.updatedSlider(this.rangePercents(this.value));
    this.customEvent();
  }

  dragNDropPosition = event => {
    let position = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

    if (position < 0) {position = 0;}
    if (position > 1) {position = 1;}

    return position;
  }

  rangeRound(value) {
    return Math.round(value * this.segments);
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
    this.ref('thumb').style.left = `${rangePercents}%`;
    this.ref('progress').style.width = `${rangePercents}%`;
  }

  updatedStateSlider() {
    this.updatedActiveStep(this.value);
    this.updatedValueSlider(this.value);
  }

  customEvent() {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }
}