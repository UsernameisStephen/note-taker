// Import our dependencies
const express = require('express');

//Target the routes
const apiRoute = require('./routes/apiRoute');
const htmlRoute = require('./routes/htmlRoute');


// Setup express specific variables
const app = express()
const port = process.env.PORT || 3001;

app.use(express.static('public'));

//middleware and parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoute);
app.use('/', htmlRoute);



//Start our server app listener
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
