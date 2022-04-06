// Import our dependencies
const express = require('express');
const fs = require('fs');

// Setup our express specific variables
const app = express()
const port = process.env.port || 3001;


//middleware for pairing json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//set route for homepage
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
  
  // set route for notes
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });
  
// Set our '/api/notes' route.
app.get('/api/notes/', function (req, res) {
    // Read the db file so we can put it on a page
    fs.readFile(__dirname + '/db/db.json', (err, data) => {
      // Parse our db.json data
      var json = JSON.parse(data);
      return res.json(json);
    })
});

//catch-all to redirect to index.html
app.get('*', function(req, res) {
    res.sendFile((__dirname + '/public/index.html'));
});

// Express Routes 
app.post("/api/notes/", function (req, res) {
    newNote = req.body;
  
    // Get the JSON file from /db/ and parse it so we can add to it
    fs.readFile(__dirname + "/db/db.json", (err, data) => {
      var json = JSON.parse(data);
      // Push our new note in from our user's request.
      json.push(newNote);
  
      // Write the JSON file over with our new contents.
      fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(json));
    });
});

//Start our server app listener
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
