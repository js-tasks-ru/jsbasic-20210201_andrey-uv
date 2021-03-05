/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement('table');
    this.renderInnerTable();
    this.elem.addEventListener('click', (event) => this.removeRow(event));
  }

  renderInnerTable() {
    this.elem.innerHTML =
      `<thead>
          <tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th></tr>
        </thead>
        <tbody>
          ${this.rows.map(item =>
          `<tr>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.salary}</td>
            <td>${item.city}</td>
            <td><button>X</button></td>
          </tr>`).join("")}
        </tbody>`;
  }

  removeRow(event) {
    let btn = event.target.closest('button');

    if (!btn) {return;}

    btn.closest('tr').remove();
  }
}

// INFO: Еще пробовал такой способ, но он очень большой хоть и кажется более структурным. Каким способом лучше это реализовывать ?
// export default class UserTable {
//   constructor(rows) {
//     this.elem = document.createElement('table');
//     this.elem.addEventListener('click', (event) => this.removeRow(event));

//     this.data = Object.keys(rows[0]);
//     this.generateTableBody(this.elem, rows);
//     this.generateTableHead(this.elem, this.data);
//     this.generateTableActions(this.elem, '<button>X</button>');

//   generateTableHead(table, data) {
//     let thead = table.createTHead();
//     let row = thead.insertRow();
//     for (let key of data) {
//       let th = document.createElement("th");
//       let text = document.createTextNode(key);
//       th.appendChild(text);
//       row.appendChild(th);
//     }
//   }

//   generateTableBody(table, data) {
//     for (let element of data) {
//       let row = table.insertRow();
//       for (let key in element) {
//         let cell = row.insertCell();
//         let text = document.createTextNode(element[key]);
//         cell.appendChild(text);
//       }
//     }
//   }

//   generateTableActions(table, action) {
//     let trForActions = table.querySelectorAll('tbody tr');
//     Array.from(trForActions).map(tr => tr.insertCell().innerHTML = action);
//   }

//   removeRow(event) {
//     let btn = event.target.closest('button');

//     if (!btn) {return;}

//     btn.closest('tr').remove();
//   }
// }
