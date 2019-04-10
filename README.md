# henryScheinTest

Candidate Test for Henry Schein. For this test I created a web service in Node.js that takes in a string of CSV data, and returns the
same CSV data formatted to fit the requirements. I used ExpressJS to create the server and handle the POST request sent from a web page.
I also used EJS to easily display the formatted result on the page dynamically. 
- **The code that satisfies the test requirements is found in
server.js**

# Setup

- Clone or download this repo and open it up in your favorite IDE. 
- Install all dependencies by running `npm install` in the project folder terminal
- Start up the server by running the command `node server.js` in the terminal
- Open your browser to http://localhost:3000 to see the main page and get started!

## Notes

- If you need to change the port number, just modify the number in the following block of code found in server.js:
```
// Activates the server on port 3000
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
```
- If you want to test the POST request using Postman, run the server, set params in Postman as {csv: [CSV INPUT STRING]}, 
and follow instructions in the app.post method in server.js:
```
// Handles the post requests coming into the server and returns the result
app.post('/formatCSV', function(req, res) {
  csvResult = formatCSV(req.body.csv);
  // *IMPORTANT* In order to test with Postman, uncomment the next line and then comment out the 'res.render' line below
  // res.send(formatCSV(req.query.csv));
  res.render('index', {result: csvResult});   // Renders the homepage with the new formatted data to display
});
```
- **You will need to restart the server with `node server.js` once making these changes
in the code for Postman to work properly**
