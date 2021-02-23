function highlight(table) {

  let td = table.querySelectorAll('tbody tr');

  // INFO:  Using one loop
  Array.prototype.map.call(td, item => {
    let status = item.cells[3];
    let gender = item.cells[2];
    let age = item.cells[1];

    if (!status.hasAttribute('data-available')) {
      status.parentElement.setAttribute('hidden', true);
    } else {
      // Я не хотел проверять элементы которые скрыты, и добавлял в этот иначе все остальные проверки,
      // но так не проходят тесы. Из за этого я их вынес на один уровень.
    }

    // INFO: Also we can use - status.getAttribute('data-available') === 'true'? status.parentElement.classList.add('available') : status.parentElement.classList.add('unavailable');
    if (status.getAttribute('data-available') === 'true') {
      status.parentElement.classList.add('available');
    } else {
      status.parentElement.classList.add('unavailable');
    }

    // INFO: Checking the gender
    if (gender.textContent === 'm') {
      gender.parentElement.classList.add('male');
    } else {
      gender.parentElement.classList.add('female');
    }

    // INFO: Checking the age
    if (+age.textContent < 18) {
      age.parentElement.style.textDecoration = 'line-through';
    }
  });

  // INFO: Using three loops. Such element calls are simpler.
  // =========================================================
  //
  // for (element of table.querySelectorAll('tbody td:nth-child(4)')) {
  //   if (!element.hasAttribute('data-available')) {
  //     element.parentElement.setAttribute('hidden', true);
  //   } if (element.getAttribute('data-available') === 'true') {
  //     element.parentElement.classList.add('available');
  //   } else {
  //     element.parentElement.classList.add('unavailable');
  //   }
  // }

  // for (element of table.querySelectorAll('tbody td:nth-child(3)')) {
  //   if (element.textContent === 'm') {
  //     element.parentElement.classList.add('male');
  //   } else {
  //     element.parentElement.classList.add('female');
  //   }
  // }

  // for (element of table.querySelectorAll('tbody td:nth-child(2)')) {
  //   if (+element.textContent < 18) {
  //     element.parentElement.style.textDecoration = 'line-through';
  //   }
  // }
}

