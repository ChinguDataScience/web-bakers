// Initialize packages
var express     = require('express'),
		app         = express(),
		bodyParser  = require('body-parser'),
		mongoose    = require('mongoose'),
		User 				= require('./models/user.js'),
		Idea 				= require('./models/idea.js'),
		Comment 		= require('./models/comment.js'),
		Project 		= require('./models/project.js');


/*added because of new Mongoose requirement. Please reference link below for reasoning.
http://mongoosejs.com/docs/connections.html#use-mongo-client
*/
var promise = mongoose.connect('mongodb://localhost/web_bakers', {
  useMongoClient: true,
});


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// ----------------------------------------------------------
// Test data (until we set up the db)
// -----------------------------

// var ideas = [
//   {
//     title: "Web app to collect project ideas",
//     blurb: "People can share project ideas, for discussion, ranking, and build",
//     author: "Reuben",
//     dateSubmitted: "23 minutes ago",
//   },
//   {
//     title: "Goal tracker for FCC",
//     blurb: "I want to be able to see where I'm at in the FCC curriculum, at a glance",
//     author: "Joe",
//     dateSubmitted: "7 hours ago",
//   },
//   {
//     title: "Healthy meal choices!",
//     blurb: "A tinder-style app that gives recipe suggestions and meal plans, based on preferences and diet",
//     author: "Reuben",
//     dateSubmitted: "Yesterday",
//   },
//   {
//     title: "Netflix for independent movie makers",
//     blurb: "It's just like Netflix, but indie movie producers can upload their own films",
//     author: "Gandalf the Grey",
//     dateSubmitted: "15/5/17",
//   },
//   {
//     title: "Hallow Puppy!",
//     blurb: "An app to quickly visualize different halloween costumes on puppies. A little bit like the snapchat",
//     author: "Rusty",
//     dateSubmitted: "1/12/16",
//   },
// ]


//test db to see if Mongoose is working with Mongo
//IDEA SCHEMA
//=============================
var ideaSchema = new mongoose.Schema({
	title: String,
  description: String,
  author: String,
  dateSubmitted: String
});

var Idea = mongoose.model("Idea", ideaSchema);

//USER/IDEATOR SCHEMA
//===============================
var ideatorSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

var Ideator = mongoose.model("Ideator", ideatorSchema);

// Ideator.create(
//   {
//     username: "GandalfTheGray",
//     email: "gandalf@gmail.com",
//     password: "password123"
//   },
//   function(err, ideator) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("New User added to DB:");
//       console.log(ideator);
//     }
//   }
// );

// ----------------------------------------------------------
// Routes
// -----------------------------

// Homepage (Ideas)
app.get('/', function(req, res) {
  Idea.find({}, function (err, allIdeas) {
    if (err) {
      console.log(err);
    } else {
      res.render('home', {ideas: allIdeas});
    }
  }); 
});

// Projects - on hold for now
// app.get('/projects', function(req, res) {
//   res.render('projects');
// });

app.post('/ideas', function(req, res) {
  // Get data from form and add to db
  var title = req.body.ideaTitle;
  var description = req.body.ideaDescription;
  var newIdea = { title: title, description: description, author: 'Anonymous', dateSubmitted: 'Just Now'};
  Idea.create(newIdea, function (err, newlyCreated) {
    //TODO: add data validation before updating db
    //error check
    if (err) {
      // TODO: Add message to user about error
      console.log(err);
    } else {
       // Redirect to ideas page
      res.redirect('/');
    }
  });
});

// Sign up
app.get('/register', function(req, res) {
  res.render('register')
});

// Login
app.get('/login', function(req, res) {
  res.render('login')
});

// Catchall
app.get('*', function(req, res) {
  res.render('catchall');
});

// ----------------------------------------------------------
// App listener
// -----------------------------
app.listen(3000, function() {
  console.log('Server running... what\'s going on in the kitchen?');
});