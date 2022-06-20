const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');
const e = require('express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Default message on Home page
app.get('/', (req, res) => {
  res.send('Last night a movie theater was robbed of $1000. The thieves took one large bag of popcorn, a combo meal, and a box of milk duds!');
});



app.get('/secreturl', (req, res) => {
  res.send('This is a super secret url with top-secret content.');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});


// -------- Movies --------

// GET the list of data about ALL movies
app.get('/movies', (req, res) => {
  res.status(200).json(movies);

});

// GET the data about a single movie, by title
app.get('/movies/:title', (req, res) => {
  const {title} = req.params;
  const movie = movies.find( movie => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('I couldn\'t find a movie with that title. Check the name or the spelling and try again.')
  }
});

// GET the data about a director, by name
app.get('/directors/:name', (req, res) => {
  const {name} = req.params;
  const info = directors.find( director => director.name === name)

  if (info) {
    res.status(200).json(info);
  } else {
    res.status(400).send('The director you\'re looking for couldn\'t be found. Check the name or spelling and try again.')
  }
});

// GET the data about a genre, by name/type
app.get('/genres/:name', (req, res) => {
  const {name} = req.params;
  const genre = genres.find( genre => genre.name === name).description;
  
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('Wow! We combed through our list of genres and couldn\'t find the one you\'re looking for.')
  }
});

// -------- Users --------

// GET the list of ALL users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// User registration
app.post('/users', (req, res) => {
  const newUser = req.body;
  
  if (newUser.name){
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  }else{
    res.status(400).send('The name is missing for the new user. Provide the name and try again.')
  }
});

// Update user info
app.put('/users/:id', (req, res) => {
  const {id} = req.params;
  const updatedUser = req.body;
 
  let user = users.find(user => user.id==id);
  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  }else{
    res.status(400).send('A user by this name couldn\'t be found.')
  }
});

// Remove user from movie app
app.delete('/users/:deleteID/', (req, res) => {
  const{deleteID} = req.params;

  let user = users.find(user => user.id == deleteID);
  if (user) {
    users = users.filter( user => user.id != deleteID);
    res.status(200).send(`${deleteID} has been removed from the movie app.`);
  }else{
    res.status(400).send('A user by this name couldn\'t be found.')
  }
}) 

// Add movie to a user's list of favorites 
app.put('/users/:id/:newMovie', (req, res) => {
  const{id,  newMovie} = req.params;

  let user = users.find(user => user.id == id);
  if (user) {
    user.favoriteMovies.push(newMovie);
    res.status(200).send(`${newMovie} has been added to your favorite\'s list.`);
  }else{
    res.status(400).send('A user by this name couldn\'t be found.')
  }
});

// Remove movie from a user's list of favorites 
app.delete('/users/:id/:deleteMovie', (req, res) => {
  const{id,  deleteMovie} = req.params;

  let user = users.find(user => user.id == id);
  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== deleteMovie );
    res.status(200).send(`${deleteMovie} has been removed from your favorite\'s list.`);
  }else{
    res.status(400).send('A user by this name couldn\'t be found.')
  }
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