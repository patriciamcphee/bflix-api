const express = require('express'),
  morgan = require('morgan');
    fs = require('fs'), // import built in node modules fs and path 
    path = require('path');

const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to my app! Yay Yay Yay!!!');
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});



// list of movies
let movies = [
  {
    "Title": "Redneck Zombies",
    "Description" : "really bad movie from Troma",
    "Director": {
      "name": "Lloyd Kauffman",
      "Bio" : "True New Yorker with a twisted mind."
    },
    "Year": "1986",
    "Riffed": "No",
  }
]


//Read all movies
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});


//Read single movie
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.Title === title)

  if (movie) {
      res.status(200).json(movie);
  } else {
      res.status(400).send("No such movie");
  }

});

//Director details
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const directors = movies.find(movie => movie.Director.name === directorName).Director;

  if (directors) {
      res.status(200).json(directors);
  } else {
      res.status(400).send("No such directors");
  }

});



//error-handling middleware library
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => console.log("app is listening on port 8080"));