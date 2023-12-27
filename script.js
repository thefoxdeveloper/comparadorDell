// Function to parse the tables
function parseTable(tableHtml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(tableHtml, "text/html");
  const rows = Array.from(doc.querySelectorAll("tr"));
  return rows.map((row) => Array.from(row.querySelectorAll("td")));
}

// Function to compare SKUs
function compareSkus(oldTable, newTable) {
  return oldTable.flatMap((oldRow, index) => {
    const newRow = newTable[index];
    if (oldRow[0] === newRow[0]) {
      return [[oldRow, newRow]];
    } else {
      return [];
    }
  });
}

// Function to display the results
function displayResults(matches) {
  const resultTable = document.createElement("table");
  matches.forEach(([oldRow, newRow]) => {
    const resultRow = document.createElement("tr");
    const oldCell = document.createElement("td");
    oldCell.innerHTML = `<span class="highlight">${oldRow[0]}</span>`;
    resultRow.appendChild(oldCell);
    const newCell = document.createElement("td");
    newCell.innerHTML = `<span class="highlight">${newRow[0]}</span>`;
    resultRow.appendChild(newCell);
    resultTable.appendChild(resultRow);
  });
  document.body.appendChild(resultTable);
}

// Get the old and new tables from the textarea
const oldTableHtml = document.getElementById("oldTable").value;
const newTableHtml = document.getElementById("newTable").value;

// Parse the tables
const oldTable = parseTable(oldTableHtml);
const newTable = parseTable(newTableHtml);

// Compare the SKUs
const matches = compareSkus(oldTable, newTable);

// Display the results
displayResults(matches);
