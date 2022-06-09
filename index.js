// IMPORTED MODULES
const express = require('express');
    morgan = require('morgan');
    uuid =  require('uuid');
    bodyParser = require('body-parser');

// MORGAN MIDDLEWARE 
const app = express();

// LOG DATA 
app.use(morgan('common'));
app.use(bodyParser.json());

// SERVE STATIC FILES   
app.use(express.static('public'));



// User list
let users = [ 
  {
    id: 1,
    name: 'Alan',
    favoriteMovies: ['Plan 9 From Outer Space']
  },
  {
    id: 2,
    name: 'John',
    favoriteMovies: ['The Room']
  }, 
];


// Movie list
let movies = [
  {
    title: 'Hard Ticket to Hawaii',
    description: 'In Hawaii, an undercover DEA agent and her civilian friend stumble upon a drug trafficking operation, and have to enlist the help of all their colleagues/friends to go after the vicious drug kingpin.',
    year: 1987,
    director: 'Andy Sidaris',
    genre: 'Action',
    imgURL: '',
    featured: ''
  },
  {
    title: 'The Room',
    description: 'Johnny is a successful bank executive who lives quietly in a San Francisco townhouse with his fiancée, Lisa. One day, putting aside any scruple, she seduces Johnny\'s best friend, Mark. From there, nothing will be the same again.',
    year: 2003,
    director: 'Tommy Wiseau',
    genre: 'Drama',
    imgURL: '',
    featured: ''
  },
  {
    title: 'Birdemic',
    description: 'A horde of mutated birds descends upon the quiet town of Half Moon Bay, California. With the death toll rising, Two citizens manage to fight back, but will they survive Birdemic?',
    year: 2010,
    director: 'James Nguyen',
    genre: 'Horror',
    imgURL: 'https://m.media-amazon.com/images/I/71owl6X2KAL.jpg',
    featured: ''
  },
  {
    title: 'Samurai Cop',
    description: 'Joe Marshall and Frank Washington are two tenacious police detectives who seek at all costs to stop the Katana, a renegade Yakuza gang composed of violent and sadistic killers who want to lead the drug trade in Los Angeles.',
    year: 1989,
    director: 'Amir Shervan',
    genre: 'Crime',
    imgURL: '',
    featured: ''
  },
  {
    title: 'Troll 2',
    description: 'Joe Marshall and Frank Washington are two tenacious police detectives who seek at all costs to stop the Katana, a renegade Yakuza gang composed of violent and sadistic killers who want to lead the drug trade in Los Angeles.',
    year: 1990,
    director: 'Claudio Fragasso (as Drake Floyd)',
    genre: 'Fantasy',
    imgURL: '',
    featured: ''
  },
  {
    title: 'Behind the Mask: The Rise of Leslie Vernon',
    description: 'The next great psycho horror slasher has given a documentary crew exclusive access to his life as he plans his reign of terror over the sleepy town of Glen Echo.',
    year: 2006,
    director: 'Scott Glosserman',
    genre: 'Horror',
    imgURL: '',
    featured: ''
  },
  {
    title: 'Crippled Avengers (aka Return of the 5 Deadly Venoms)',
    description: 'Three men, crippled by an evil warlord, become friends and learn kung fu with the help of an old teacher and his idiot pupil.',
    year: 1978,
    director: 'Chang Cheh',
    genre: 'Kung Fu',
    imgURL: '',
    featured: ''
  },
  {
    title: 'Miami Connection',
    description: 'A martial arts rock band goes up against a band of motorcycle ninjas who have tightened their grip on Florida\'s narcotics trade.',
    year: 1987,
    director: 'Richard Park and Y.K. Kim',
    genre: 'Crime',
    imgURL: '',
    featured: ''
  },
  {
    title: 'Five Element Ninjas (aka Chinese Super Ninjas)',
    description: 'A Chinese martial arts school is infiltrated and destroyed by ninjas. Tian Hao survives the massacre and seeks to uncover the trickery of ninjutsu in order to beat the Five Element Ninjas and avenge his family.',
    year: 1982,
    director: 'Chang Cheh',
    genre: 'Kung Fu',
    imgURL: '',
    featured: ''
  },
  {
    title: 'Plan 9 From Outer Space',
    description: 'Evil aliens attack Earth and set their terrible "Plan 9" into action. As the aliens resurrect the dead of the Earth, the lives of the living are in danger.',
    year: 1959,
    director: 'Ed Wood',
    genre: 'Scifi',
    imgURL: '',
    featured: ''
  },
];

// list of genres
let genres = [
  {
    name: 'Action',
    description: 'A clear division between good and evil. Lots of fighting and set pieces. Their pacing and structure are built around scenes like car chases and their climaxes often have the biggest set pieces.'
  },
  {
    name: 'Drama',
    description: 'Dramas frequently follow characters you\'d see as your friends, neighbors, and family dealing with the struggles of everyday life. They usually take place in a home, office setting, or with a group of characters forced to interact day to day.'
  },
  {
    name: 'Thriller',
    description: 'If you go to a thriller you want excitement, peril, and edge of your seat situations. Thrillers need to be...thrilling. So make sure the suspense, mystery, and anxiety rule your pages. '
  },
  {
    name: 'Kung Fu',
    description: 'A subgenre of martial arts films and Hong Kong action cinema set in the contemporary period and featuring realistic martial arts.'
  },
  {
    name: 'Horror',
    description: 'The final girl, the "not dead yet" scare, and the dystopian endings. Horror is famous for having story beats that we come to expect like jump scares. Lean into them and find ways to subvert. You have subsets like haunted houses, slashers, zombies, evil creatures, and other subgenres. '
  },
  {
    name: 'Scifi',
    description: 'Aliens, spaceships, time travel, and technology. This genre needs to tell us if we are worth saving or maybe the machines need to take over. Science fiction addresses our society and its problems. It seeks to tell us about the way we can handle it if we only listen in the present.'
  },
  {
    name: 'Fantasy',
    description: 'These kinds of movies and tv shows usually have mysticism, some sort of royalty, humanoid creates like Elves, Orcs, and Hobbits, and loys of magic. You can expect sorcery and some great set pieces.'
  },
  {
    name: 'Crime',
    description: ' We often see a courtroom scene, gunplay, violence, and ruthless tactics. There are times the law can be seen as good and bad, depending on who you root for and when the movie was released.'
  },
];


// list of directors
let directors = [
  {
    name: 'Richard Park',
    birthyear: 1943,
    deathyear: 2006,
    bio: 'He was a director and writer, known for American Chinatown (1995), Gang Justice (1991), and Miami Connection (1987). He died on April 11, 2006, in Seoul, Korea.'
  },
  {
    name: 'Y.K. Kim',
    birthyear: 1956,
    bio: 'Runs a martial arts school in Orlando Florida.'
  },
  {
    name: 'Ed Wood',
    birthyear: 1924,
    deathyear: 1978,
    bio: 'An American filmmaker, actor, and pulp novel author. In the 1950s, Wood directed several low-budget science fiction, crime, and horror films that later became cult classics.'
  },
  {
    name: 'Chang Cheh',
    birthyear: 1923,
    deathyear: 2002,
    bio: 'He was the leading Martial Arts director in Hong Kong in the 1970s, now with close to 100 films to his name. He has influenced other directors such as John Woo and Liu Chiau Liang, and made famous such Hong Kong stars as Phillip Chung-Fung Kwok, Fu Sheng, and Lung Ti. '
  },
  {
    name: 'Claudio Fragasso',
    birthyear: 1951,
    bio: 'His passion for cinema when he was given a camera in super 8.  He began shooting many films, involving his friends. He\'s a versatile director who has tried all genres, always experimenting with new things. '
  },
  {
    name: 'Scott Glosserman',
    birthyear: 1976,
    bio: 'A writer/director/producer, and CEO of Gathr.'
  },
  {
    name: 'Amir Shervan',
    birthyear: 1929,
    deathyear: 2006,
    bio: 'studied theater in Pasadena California in the 1940s and returned to Iran to begin his career in film. During the 1979 Iranian Revolution, all movies were subject to review by the Iranian government and many of them were banned due to their content while others were "purified" or altered to suit the growing anti-western and pro-Islamic sentiment. This caused a pause in his film career starting in 1980 and ending with his move to the United States where he settled in California.'
  },
  {
    name: 'James Nguyen',
    birthyear: 1966,
    bio: 'Founder of Moviehead.com, an online movie theater. In 2001, he produced and directed Julie and Jack - a romantic thriller about love and spirituality. In 2004, he completed a second film: Replica - a romantic thriller.'
  },
  {
    name: 'Tommy Wiseau',
    birthyear: 1955,
    bio: 'An American actor, director, screenwriter & producer. He trained to be an actor at American Conservatory Theater, Vince Chase Workshop, Jean Shelton Acting Lab, Laney College, and Stella Adler Academy of Acting.'
  },
  {
    name: 'Andy Sidaris',
    birthyear: 1931,
    deathyear: 2007,
    bio: 'Born in Chicago, Illinois, he was an actor and a pioneer director of TV sports shows. He directed NFL Monday Night Football (1970) and earned an Emmy for his work directing the televised 1968 Summer Olympics in 1969. He died from throat cancer on March 7, 2007, in Beverly Hills, CA.'
  },
];


// GET requests
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
    res.status(400).send('I couldn\'t find a movie with that title. Check the spelling and try again.')
  }
});

// GET the data about a director, by name
app.get('/directors/:name', (req, res) => {
  const {name} = req.params;
  const info = directors.find( director => director.name === name)

  if (info) {
    res.status(200).json(info);
  } else {
    res.status(400).send('The director you\'re looking for couldn\'t be found. Check the name and try again.')
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
    res.status(400).send('The name is missing for the new user. Try again by providing a name.')
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
    res.status(400).send('A user by the name couldn\'t be found.')
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
    res.status(400).send('A user by the name couldn\'t be found.')
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
    res.status(400).send('A user by the name couldn\'t be found.')
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
    res.status(400).send('A user by the name couldn\'t be found.')
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