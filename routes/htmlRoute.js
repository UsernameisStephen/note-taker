const path = require('path');
const router = require('express').Router();


//so that when the page loads, it starts on index page

router.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
})

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//for loading notes html
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});


module.exports = router;
