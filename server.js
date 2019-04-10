const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let formattedCSV = '';
app.use(bodyParser.urlencoded({extended: true}));

// Handles the post requests coming into the server
app.post('/formatCSV', function(req, res) {
  formattedCSV = formatCSV(req.body.csv);
  res.setHeader('Content-Type', 'text/plain');
  res.send(formattedCSV);
});


// Activates the server on port 3000
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});



// Function to format the input CSV string

function formatCSV(str) {
  if (!str) {
    return "Input was null";
  }
  // New Array to hold the completely formatted CSV input data
  let formattedCSV = [];
  // Determines whether newline character is \n or \r\n
  let newLineChar = (str.indexOf('\n') == -1) ? '\r\n' : '\n';
  console.log(newLineChar);
  // Splits the entire CSV string into rows by using the newline character
  str.split(newLineChar).forEach(row => {
    // New Array to hold each formatted row
    let formattedRow = [];
    // Splits on each quotation mark to get an array of the items within the row
    row.split('"').forEach(item => {
      // If statement basically eliminates items that are [] or [,]
      if (item.length > 2) {
        // This ternary is used to catch the 'Age' property, it doesn't have quotes
        // so it appears in the row as ",21,". This removes the commas if present
        let formattedItem = (item[0] == ',') ? item.slice(1,item.length - 1) : item;
        // Adds each item between brackets to its row
        formattedRow.push("[" + formattedItem + "]");
      }
    });
    // Adds each row to the complete array
    formattedCSV.push(formattedRow.join(' '));
  });
  console.log(formattedCSV.join(newLineChar).toString());
  // Returns complete array as string, with '\n' between each row
  return formattedCSV.join(newLineChar).toString();
}

