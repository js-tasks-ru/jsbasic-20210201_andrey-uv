/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 * @param {string | null} name
 * @returns {boolean}
 */
function isValid(name) {
  return  name === null || name === '' || name.length < 4 || name.includes(' ') ? false : true;

  // INFO: Я конечно попробовал в одну строку, но как по мне этот вариант читабельней.
  // if ( name === null || name === '' || name.length < 4 || name.includes(' ') ) {
  //   return false;
  // }
  // return true;
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
