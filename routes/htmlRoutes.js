const path = require('path');
const app = require('express').Router();


//so that when the page loads, it starts on index page

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
//for loading notes html

module.exports = app;
