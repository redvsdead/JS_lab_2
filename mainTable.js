'use strict';

let tableId = 'readingList';    //таблица со списком книг
let formId = 'addTableRow';

let table = document.getElementById(tableId);
let form = document.getElementById(formId);

table.addEventListener('click', (e) => {
  if (e.target.tagName === 'TH') {
    let columnIndex = e.target.cellIndex;
    sortTable(columnIndex);
  }

  if (e.target.tagName === 'IMG') {
    let rowIndex = e.target.closest('TR').rowIndex;
    table.deleteRow(rowIndex);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  appendRow();
});

const appendCell = (row, value) => {
    row.insertCell(-1).appendChild(document.createTextNode(value));
  };
  

const appendRow = () => {
    let title = document.getElementById('titleInput');
    let author = document.getElementById('authorInput');
    let year = document.getElementById('yearInput');
    let status = document.getElementById('statusInput');  //прочтена ли книга
  
    if ((title.value != '') && (author.value != '') && (parseInt(year.value))) {
      let row = table.getElementsByTagName('TBODY')[0].insertRow(-1);
  
      appendCell(row, title.value);
      appendCell(row, author.value);
      appendCell(row, year.value);
      appendCellCheckBox(row, status);
  
      let delButton = document.createElement('button');
      delButton.innerHTML = '<img src="remove.jpg" alt="Remove">';
      row.insertCell(-1).appendChild(delButton);
  
      title.value = '';
      author.value = '';
      year.value = '';
      status.checked = false;
    } 
    else {
      alert('Warning: invalid value was entered');
    }
  };

const sortTable = (columnIndex) => {
  let switching = true;
  let shouldSwitch = false;
  let i = 1;
  
  while (switching) {
    switching = false;
    let rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      let x = rows[i].getElementsByTagName('TD')[columnIndex];
      let y = rows[i + 1].getElementsByTagName('TD')[columnIndex];
      if (Number(x.innerHTML) > Number(y.innerHTML) ) {
        shouldSwitch = true;
        break;
      }
      if (isNaN(x.innerHTML)){
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
              break;
          }
      } 
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
};

const appendCellCheckBox = (row, check) => {
  if (check.checked) {
    row.insertCell(-1).appendChild(document.createTextNode("Finished"));
  }
  else{
    row.insertCell(-1).appendChild(document.createTextNode("Not finished"));
  }
}