/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let sum = 0;

  for (let key in salaries) {
    // INFO: Не смог разобраться почему запись в одной проверке не работает
    // как if (typeof salaries[key] == 'number' || !isNaN(salaries[key]) || isFinite(salaries[key])) {
    if (isNaN(salaries[key]) || !isFinite(salaries[key])) {
      continue;
    } else if (typeof salaries[key] == 'number') {
      sum += salaries[key];
    }
  }

  return sum;
}
