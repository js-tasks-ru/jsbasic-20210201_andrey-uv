import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.body = document.querySelector('body');
    this.render();
  }

  render() {
    this.elem = createElement(
      `<div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title"></h3>
          </div>

          <div class="modal__body"></div>
        </div>

      </div>`);
  }

  setTitle(value) {
    this.elem.querySelector('.modal__title').textContent = value;
  }

  setBody(value) {
    this.elem.querySelector('.modal__body').append(value);
  }

  close() {
    this.body.classList.remove('is-modal-open');
    this.elem.remove();
    document.onkeydown = null;
  }

  open() {
    this.body.classList.add('is-modal-open');
    this.body.append(this.elem);
    this.body.querySelector('.modal__close').onclick = () => this.close();
    document.onkeydown = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    };
  }
}



// INFO: Из-за чего в этом варианте не проходят тесты ??? Он уязвим или это просто тесты написаны под определенный вариант реализации ?

// export default class Modal {
//   constructor() {
//     this.body = document.querySelector('body');
//     this.modalTitle = 'Вот сюда нужно добавлять заголовок';
//     this.modalBody = 'A сюда нужно добавлять содержимое тела модального окна';
//   }

//   render() {
//     this.elem =
//       `<div class="modal">
//         <div class="modal__overlay"></div>

//         <div class="modal__inner">
//           <div class="modal__header">
//             <button type="button" class="modal__close">
//               <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
//             </button>

//             <h3 class="modal__title"></h3>
//           </div>

//           <div class="modal__body"></div>
//         </div>

//       </div>`;
//   }

//   setTitle(value) {
//     this.modalTitle = value;
//   }

//   getTitle() {
//     return this.modalTitle;
//   }

//   setBody(value) {
//     this.modalBody = value;
//   }

//   getBody() {
//     return this.modalBody;
//   }

//   close() {
//     this.body.querySelector('.modal').remove();
//     this.body.classList.remove('is-modal-open');
//   }

//   open() {
//     this.render();
//     this.body.classList.add('is-modal-open');
//     this.body.insertAdjacentHTML('afterBegin', this.elem);
//     this.body.querySelector('.modal__title').append(this.modalTitle);
//     this.body.querySelector('.modal__body').append(this.modalBody);
//     this.body.querySelector('.modal__close').onclick = () => this.close();
//     document.onkeydown = (event) => {if (event.code === 'Escape') {this.close();}};
//   }
// }