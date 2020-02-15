class TableCreator {
    constructor(table) {

    }
  buildTable(arrayOfObjects) {
    const table = document.createElement("table");
    arrayOfObjects.forEach((item, idx) => {
      // first add headline to table
      if (idx === 0) {
        let tr = buildTr(item, true);
        table.appendChild(tr);
      }
      let tr = buildTr(item, false);
      table.appendChild(tr);
    });

    return table;
  }

  buildTr(obj, isHeader) {
    let tr = document.createElement("tr");
    for (let key in obj) {
      let td = document.createElement(isHeader ? "th" : "td");
      td.textContent = isHeader ? key : obj[key];
      tr.appendChild(td);
    }

    return tr;
  }
}
