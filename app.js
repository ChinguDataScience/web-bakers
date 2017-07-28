// Initialize packages
var express = require('express');
var app = express();


// ----------------------------------------------------------
// Routes
// -----------------------------

// Homepage
app.get('/', function(req, res) {
  res.send('Welcome to Web-Bakers');
});

// Catchall
app.get('*', function(req, res) {
  res.send('Recipe not found... try again!');
});



// App listener
app.listen(3000, function() {
  console.log('Server running... what\'s going on in the kitchen?');
});