const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let csvResult = '';
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Handles the post requests coming into the server and returns the result
app.post('/formatCSV', function(req, res) {
  csvResult = formatCSV(req.body.csv);
  // *IMPORTANT* In order to test with Postman, uncomment the next line and then comment out the 'res.render' line below
  // res.send(formatCSV(req.query.csv));
  res.render('index', {result: csvResult});   // Renders the homepage with the new formatted data to display
});

app.get('/', function(req, res) {
  res.render('index', {result: ''});
})

// Activates the server on port 3000
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});

// Function to format the input CSV string
function formatCSV(str) {
  if (!str) {     // Verifies that str exists
    return "Input was null";
  }
  let formattedCSV = [];      // New array to hold the completely formatted CSV input data
  let newLineChar = (str.indexOf('\n') == -1) ? '\r\n' : '\n';      // Determines whether newline character is \n or \r\n
  str.split(newLineChar).forEach(row => {     // Splits the entire CSV string into rows by using the newline character
    let formattedRow = [];                    // New array to hold each formatted row
    row.split('"').forEach(item => {          // Splits on each quotation mark to get an array of the items within the row
      if (item.length > 2) {                  // If statement basically eliminates items that are [] or [,]
        let formattedItem = (item[0] == ',') ? item.slice(1,item.length - 1) : item; // Age prop doesn't have quotes so it appears in the row as ",21,". This removes the commas if present
        formattedRow.push("[" + formattedItem + "]");       // Adds each item between brackets to its row
      }
    });
    formattedCSV.push(formattedRow.join(' '));      // Adds each row to the complete array
  });
  console.log(formattedCSV.join(newLineChar).toString());       // Logs complete array as string to the console
  return formattedCSV.join(newLineChar).toString();       // Returns complete array as string, with newline character between each row
}

