const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to db using mongoose to perform CRUD
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });


// Log data to terminal
//app.use(morgan('common'));

// Sends static files
//app.use(express.static('public'));

// Default message on Home page
app.get('/', (req, res) => {
  res.send('Last night a movie theater was robbed of $1000. The thieves took one large bag of popcorn, a combo meal, and a box of milk duds!');
});

//send to documentation
app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/secreturl', (req, res) => {
  res.send('This is a super secret url with top-secret content.');
});




// -------- Movies --------

// GET the list of data about ALL movies
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// GET the data about a single movie, by title
app.get('/movies/:title', (req, res) => {
  Movies.findOne({ title: req.params.title })
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET the data about a director, by name
app.get('/movies/directors/:Name', (req, res) => {
  Movies.findOne({ 'Director.Name' : req.params.Name })
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(400).send('DirectorThe director you\'re looking for couldn\'t be found. Check the name or spelling and try again.')
      }
    });
});

// GET the data about a genre, by name/type
app.get('/movies/genre/:Name', (req, res) => {
  Movies.find({ 'Genre.Name' : req.params.Name })
    .then((movie) => {
      res.status(201).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// -------- Users --------

// GET the list of ALL users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET user by username
app.get('/users/:Username', (req, res) => {
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
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send('Looks like ' + req.body.Username + ' already exists. Try a different username.');
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
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Add a single movie to user's favorites list
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
      $push: { FavoriteMovies: req.params.MovieID }
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


// DELETE movie from user's favorites list
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// DELETE user from movie app
app.delete('/users/:Username/', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' couldn\'t be found. Check the spelling of the username and try again.')
      } else {
        res.status(200).send(req.params.Username) + ' has been removed from the movie app.'
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Hmmmmm! Something doesn\'t seem right!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Thank you for listening to P.O.R.T. 8080!');
});