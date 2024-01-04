function compareQuotes() {
  var oldQuote = document.getElementById("quote1").value;
  var newQuote = document.getElementById("quote2").value;

  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = highlightMatchingSKUs(oldQuote, newQuote);
}

function highlightMatchingSKUs(oldText, newText) {
  var oldSKUs = extractSKUs(oldText);
  var newSKUs = extractSKUs(newText);

  var highlightedOld = highlightSKUs(oldText, oldSKUs, newSKUs);
  var highlightedNew = highlightSKUs(newText, newSKUs, oldSKUs);

  return generateResultTable(highlightedOld, highlightedNew);
}

function extractSKUs(text) {
  // Extract SKUs from the text inside brackets
  var skuRegex = /\[([^\]]+)\]/g;
  var matches = text.match(skuRegex) || [];
  return matches.map((match) => match.replace(/\[|\]/g, ""));
}

function highlightSKUs(text, skus, otherSkus) {
  // Highlight SKUs in the text inside brackets
  var highlightedText = text;
  skus.forEach(function (sku) {
    var highlightClass = otherSkus.includes(sku)
      ? "highlight"
      : "highlight-different";
    highlightedText = highlightedText.replace(
      new RegExp(`(?:\\b|\\n)${sku}(?:(?:\\n.*\\n)|\\b|\\d+)`, "g"),
      `<span class="${highlightClass}">${sku}</span>`
    );
  });
  return highlightedText;
}

function generateResultTable(oldText, newText) {
  var oldSentences = oldText.split("\n").filter(Boolean);
  var newSentences = newText.split("\n").filter(Boolean);

  var maxSentences = Math.max(oldSentences.length, newSentences.length);

  var table = '<table class="table">';
  table +=
    '<thead><tr><th scope="col">Old Quote</th><th scope="col">Quantity</th><th scope="col">New Quote</th></tr></thead>';
  table += "<tbody>";

  for (var i = 0; i < maxSentences; i++) {
    var oldSentence = oldSentences[i] || "";
    var newSentence = newSentences[i] || "";

    // Exclude rows that consist only of numbers
    if (!/^\d+$/.test(oldSentence) && !/^\d+$/.test(newSentence)) {
      table += `<tr><td>${oldSentence}</td><td></td><td>${newSentence}</td></tr>`;
    } else {
      // If the row consists only of numbers, place it in the "Quantity" column
      table += `<tr><td></td><td>${oldSentence}</td><td>${newSentence}</td></tr>`;
    }
  }

  table += "</tbody></table>";
  return table;
}

function clearFields() {
  document.getElementById("quote1").value = "";
  document.getElementById("quote2").value = "";
  document.getElementById("result").innerHTML = "";
}