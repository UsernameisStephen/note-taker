const express = require('express');
const fs = require('fs');
const notes = require('./Develop/db/db.json');
const uuid = require('uuid');
const path = require ('path');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware for pairing json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//route for notes
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/db/db.json'))
});
//route for homepage
app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./Develop/db/db.json'));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync('./Develop/db/db.json', JSON.stringify(notes))
    res.json(notes);
});

//calls for home page and the notes.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});
//app listener
app.listen(PORT, () => {
    console.log(`Server has started. Listening at http://localhost:${PORT}`)
});
