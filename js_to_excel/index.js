
// data
// each object is for a row
// keys of object is header of the column 
let wsData = [
  { name: "George Washington", birthday: "1732-02-22" },
  { name: "John Adams", birthday: "1735-10-19" },
  // ... one row per President
]

let tbl = document.querySelector('table')

function addDataToTable (data) {
  let r = document.createElement('tr');
  let n = document.createElement('td');
  n.append(data.name);
  r.append(n);
  let d = document.createElement('td');
  d.append(data.birthday);
  r.append(d);
  tbl.append(r);
}

function showData () {
  for (let data of wsData) {
    console.log(data.name);
    addDataToTable(data);
  }
}
// tbl.append(
//   `<tr><td>${wsData[0].name}</td><td>${wsData[0].birthday}</td></tr>`
// );
      // <tr><td>John Adams</td><td>1735-10-19</td></tr>


// let wsData = [
//   ['A1', 'B1'],
//   ['A2', 'B2'],
// ];

// aoa to sheet method requires data to be
// array of arrays
// which produces sheet without column header
// let ws = XLSX.utils.aoa_to_sheet(wsData);

let wb = XLSX.utils.book_new();
let writeExcel = (n) => {
  // creating new workbook

  // setting workbook properties
  wb.Props = {
    Title: 'Expenses',
    Subject: 'Daily Expense',
    Author: 'Barun Ghosh',
    CreateDate: new Date(),
  };

  // creating a new sheet and
  // assigning new sheet name
  let wsName = 'newSheet';
  let ws = XLSX.utils.json_to_sheet(wsData);

  XLSX.utils.book_append_sheet(wb, ws, wsName);
  XLSX.writeFile(wb, `${n}.xlsx`);
}

// writeExcel(wb, "presidents");
document.getElementById('submit').addEventListener('click', (e) => {
  e.preventDefault();

  let d = new FormData(document.querySelector('form'));
  let newD = Object.fromEntries(d);
  // const { fName, password } = newD;
  wsData.push(newD);

  setTimeout(() => {
  document.querySelector('form').reset();
  }, 300);


  // if (authenticate(fName, password, userData )) {
  //   window.location.href = './welcome.html';
  // } else {
  //   window.location.href = './error.html';
  // }

console.log(wsData);
});

document.querySelector('#showData').addEventListener('click', showData);
document.querySelector('#export').addEventListener('click', () => {
  writeExcel('myOutput');
});


