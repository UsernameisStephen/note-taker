const PORT = process.env.PORT || 3001;

const path = require ('path');
const express = require('express');
const app = express();


const createdNotes = require('./db/db.json');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function createNewNote(body, noteArray) {
    const newNote = body;
    if (!Array.isArray(noteArray))
        noteArray = [];
    
    if (noteArray.length === 0)
        noteArray.push(0);

    body.id = noteArray[0];
    noteArray[0]++;

    noteArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(noteArray, null, 2)
    );
    return createdNotes;
}



app.get('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, allNotes)
    res.json(notes);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
}); 