const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');

//integrate mongoose 
const mongoose = require('mongoose'),
  Models = require('./models.js');

//Mongoose models
const Movies = Models.Movie;
const Users = Models.User;


// Connect to database using mongoose to perform CRUD

/*
mongoose.connect('mongodb://localhost:27017/myFlixDB', { 
  useNewUrlParser: true, 
  useUnifiedTopology: 
  true, family: 4 
});
*/

mongoose.connect( process.env.CONNECTION_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//authentication - must be places after middleware
let auth = require('./auth.js')(app);
const passport = require('passport');
  require('./passport.js');

//cors - restrict access to API
const cors = require('cors');

//allow requests from all origins
app.use(cors());

/*
let allowedOrigins = ['http://localhost:8080'];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn\’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));
*/

//validation
const { check, validationResult } = require('express-validator');

//log basic data
app.use(morgan('common'));

//serve static files
app.use(express.static('public'));

// Default message on Home page
app.get('/', (req, res) => {
  res.send('<h2>Last night a movie theater was robbed of $1000. The thieves took one large bag of popcorn, a combo meal, and a box of milk duds!</h2>');
});

// -------- Movies --------

// GET the list of data about ALL movies
//app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


// GET the data about a single movie, by title
app.get('/movies/:Title', passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((title) => {
      res.status(201).json(title);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET the data about a director, by name
app.get('/movies/director/:Name', passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
    .then((movie) => {
      res.status(201).json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET the data about a genre, by name
app.get('/movies/genre/:Name', passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.findOne({ 'Genre.Name' : req.params.Name })
      .then((movie) => {
          res.status(201).json(movie.Genre);
      })
      .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
      });
});

// -------- Users --------

// GET the list of ALL users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
      .then((users) => {
          res.status(200).json(users);
      })
      .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
      });
});

// GET user by username
app.get('/users/:Username', passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username})
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// User registration
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {
  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username }) //Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) { //If the user is found, send a response stating that it already exists
        return res.status(400).send('It looks like ' + req.body.Username + ' already exists. Try a different username and try again.');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Update user info
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put(
  '/users/:Username',
  [
    check('Username', 'Username is required').isLength({ min: 4 }),
    check(
      'Username',
      'Username contains non alphanumeric characters - not allowed.'
    ).isAlphanumeric(),
    check('Password', 'Password is required').isLength({ min: 6 }),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ],
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let hashedPassword = Users.hashPassword(req.body.Password);

    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthdate: req.body.Birthdate,
        },
      },
      { new: true }, //This line make suer that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);


// Add a movie to user's favorites list
app.post('/users/:Username/movies/:MovieID', passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // ensures the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


// DELETE movie from user's favorites list
app.delete('/users/:Username/movies/:MovieID', passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
      $pull: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }, 
  (err, updatedUser) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
      } else {
          res.json(updatedUser);
      }
  });
});

// DELETE user from movie app
app.delete('/users/:Username', passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' couldn\'t be found. Check the spelling of the username and try again.');
      } else {
        res.status(200).send('We\'re sorry to see you go. As you requested, ' + req.params.Username + ' has been removed from the movie app.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//send to documentation
app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/secreturl', (req, res) => {
  res.send('This is a super secret url with top-secret content.');
});

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Hmmmmm! Something doesn\'t seem right!');
});

// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
  console.log('Thank you for listening to P.O.R.T. ' + port);
});