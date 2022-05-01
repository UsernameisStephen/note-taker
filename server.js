// Import our dependencies
const express = require('express');
const fs = require("fs");

//Target the routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


// Setup express specific variables
const app = express()
const port = process.env.PORT || 3001;

app.use(express.static('public'));

//middleware and parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);



//Start our server app listener
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
