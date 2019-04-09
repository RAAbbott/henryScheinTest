const express = require('express');
const app = express();

let formattedResponse;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.get('/formatCSV', function(req, res) {
  formattedResponse = req.query.csv;
  res.end(formattedResponse);
});


app.listen(3000, function() {
  console.log('Server listening on port 3000');
});