// IMPORTED MODULES
const express = require('express');
    morgan = require('morgan');

const app = express();

// MIDDLEWARE
app.use(morgan('common'));
app.use(express.static('public'));


// Movie list
let topMovies = [
  {
    title: 'Hard Ticket to Hawaii',
    director: 'Andy Sidaris',
    year: '1987',
    description: 'There are dozens of films just like Hard Ticket to Hawaii, if we\’re talking about plots. Director Andy Sidaris directed 12 himself, all starring gun-toting Playboy and Penthouse models as busty secret agents, largely in tropical locales. These sorts of films were staples of early cable, commonly premiering on USA Up All Night or “Skinemax.” They\’re all trashy. They\’re all stupid. But Hard Ticket to Hawaii is the most fun of all of them, the perfect mixture of classless sexuality and hyper-macho 1980s action. Its action sequences are insane, from the inflatable sex doll-clutching skateboard assassin to a henchman named “Shades” who is executed via razor-tipped Frisbee. Oh, and have I mentioned that the subplot revolves around the girls hunting a deadly, escaped snake that has been “infected with toxins from cancer-infested rats”? On its own, the snake could make this an awesome movie, but it\’s just one reason why Hard Ticket to Hawaii is the most enjoyable B movie of them all.'
  },
  {
    title: 'The Room',
    director: 'Tommy Wiseau',
    year: '2003',
    description: 'The Room is now so well-known, especially after the publication of Greg Sestero\’s The Disaster Artist, that it\’s lost the luster of being obscure—and that\’s fine. This film doesn\’t need the mystique of the midnight movie: It will always remain utterly charming in its sweet sincerity and cluelessness. The dramatic story of a seemingly perfect man undone by his scheming and unfaithful girlfriend, it plays as both a vanity project and an exceedingly public accusation of every woman Tommy Wiseau was ever involved with, which couldn\’t have been many. It\’s unique among films of its caliber for having a production budget so much higher—reportedly $6 million if you can imagine it, all of it squandered. It may be the most a director/producer/star has ever poured into a project to glorify himself, and the beautiful thing is that Wiseau seems to fully believe to this day that he was successful. He\’s never felt the need to shoot The Room 2, even after the original film\’s massive underground success. Because on a basic level, Tommy Wiseau is a true artist, just an exceedingly bad one. You can\’t help but admire that.'
  },
  {
    title: 'Birdemic',
    director: 'James Nguyen',
    year: '2008',
    description: 'People assume it\’s easy to create a movie so bad it ends up on all-time lists, but that\’s anything but the case. Movies like Birdemic cannot be created on purpose—it\’s straight-up impossible. The most important element in the creation of a Birdemic is intense, misplaced confidence and optimism, a complete lack of self-doubt and common sense. Any filmmaker who realizes what makes for a quality film would immediately see he was out of his depth trying to film this bizarre rip-off of The Birds and abandon the project. He would see that his cast of actors were the least-engaging, most listless characters in film history. It would be obvious to him that a thinly veiled environmental message would not be best-delivered with exploding birds that vomit corrosive acid. It would be clear that clip-art CGI of eagles fluttering in place is not an acceptable visual standard. But Birdemic is blissfully unaware of how terrible it is, and that makes it totally brilliant. Never will you look at coat hanger combat in the same way.'
  },
  {
    title: 'Samurai Cop',
    director: 'Amir Shervan',
    year: '1989',
    description: 'When clueless Iranian filmmaker Amir Shervan moved to the United States in the mid-1980s, he brought with him a creative mind that would go on to direct some of the most amazing fun-bad action movies ever made. His masterwork is Samurai Cop, which is pretty much exactly what it sounds like. But oh, how to describe the shoddiness of this film, which stars hair model Matt Hannon and the impossibly huge chin of Robert Z\’Dar? It\’s every terrible Lethal Weapon clone rolled into one, a perfect cocktail of cop movie clichés and 1980s action movie ridiculousness. The script is impossibly, unfathomably bad—some of these scenes couldn\’t possibly have been written out on paper. There\’s a dozen different ones I can cite, but just take the hero\’s conversation with this flirtatious nurse as an example. And how amazing are those reaction shots from his partner? The whole film is a riot.'
  },
  {
    title: 'Troll 2',
    director: 'Claudio Fragasso (as Drake Floyd)',
    year: '1990',
    description: 'If a film has inspired a documentary about it detailing exactly what went wrong, you know you\’re probably dealing with a special commodity. For Troll 2, that film was 2010s Best Worst Movie, a reexamination of how an Italian schlockmeister named Claudio Fragasso visited Utah in 1989 and managed to shoot a low-budget horror flick about vegetarian goblins (there aren\’t any trolls in the film) despite barely speaking English. Some of it is hard to believe, such as the idea that casting a local dentist with no acting experience in one of the major roles would work out fine. The final film barely looks real. It feels like some kind of elaborate practical joke played on the viewer, like at any moment the director will show up at your door and say “We really had you going, didn\’t we?” My favorite scene may be the trip to the general store, which features a shopkeep played by an actor who was apparently on a day trip from a local mental institution. It\’s mind-blowing stuff.'
  },
  {
    title: 'Behind the Mask: The Rise of Leslie Vernon',
    director: 'Scott Glosserman',
    year: '2006',
    description: 'In the years following Scream there was no shortage of films attempting similar deconstructions of the horror genre, but few deserve to be mentioned in the same breath as the criminally underseen Behind the Mask. Taking place in a world where supernatural killers such as Jason Voorhees and Freddy Krueger actually existed, this mockumentary follows around a guy named Leslie Vernon, who dreams of being the “next great psycho killer.” In doing so, it provides answers and insight into dozens of horror movie tropes and clichés, such as “How does the killer train?” How does he pick his victims? How can he seemingly be in two places at once? It\’s a brilliant, twisted love letter to the genre that also develops an unexpected stylistic change right when you think you know where things are headed. It\’s one of the most creative horror B movies of the 2000s without a doubt.'
  },
  {
    title: 'Crippled Avengers (aka Return of the 5 Deadly Venoms)',
    director: 'Chang Cheh',
    year: '1978',
    description: 'The only reason I didn\’t call Five Element Ninjas the finest kung fu B movie from Chang Cheh is that he also made Crippled Avengers. Part of a short-lived series of “cripsploitation” films that tended to feature injured heroes in the vein of One-Armed Swordsman, this film represents that sub-genre\’s highest point because of the physical talents involved. It stars members of the so-called “Venom Mob,” the finest kung fu performers of their day, and the choreography is nothing short of outstanding, full of long, uninterrupted takes with great acrobatics and athleticism. It\’s got everything that makes for an extremely entertaining kung fu movie: A silly story, menacing villains, special powers, great costuming and sets, exciting choreography and memorable set-pieces. Just look at the poster and tell me that doesn\’t look awesome.'
  },
  {
    title: 'Miami Connection',
    director: 'Richard Park and Y.K. Kim',
    year: '1987',
    description: 'A film that was all but forgotten until its rediscovery by the Alamo Drafthouse theater chain in 2009, Miami Connection is a sight to behold. Produced by and starring motivational speaker/taekwondo master Y.K. Kim, the film is part vanity project and part public service announcement. The story sounds like something a third grader in the mid-1980s would have found really bodacious: An awesome synth-rock band called Dragon Sound practices taekwondo on the side and fights a biker gang and a drug-smuggling ninja organization on the streets of Orlando. I\’d like to point out that “Orlando” is not a typo—the film doesn\’t even take place in Miami. The acting smashes through lower tiers of bad movie performances into hall of fame territory, especially Kim himself, who can barely speak English phonetically, let alone legibly. There are plenty of highlights and even a few genuinely catchy songs, but nothing can top the dramatic revelation when one character unexpectedly reveals his quest to find his birth father.'
  },
  {
    title: 'Five Element Ninjas (aka Chinese Super Ninjas)',
    director: 'Chang Cheh',
    year: '1982',
    description: 'Chang Cheh was probably the greatest director of kung fu flicks for Shaw Brothers Studio, the producers of dozens of Hong Kong kung fu classics in the mid-1970s, and this is one of his loopiest films. When his noble school of kung fu studies is destroyed by dastardly ninjas, the hero must study their forbidden techniques (based on the “five elements” of fire, water, earth, wood, and gold) to strike back. Each set of ninjas has their own colorful, outrageous costumes and fighting styles, such as tunneling through the ground (earth ninjas) or blinding their enemies with reflective armor (gold ninjas). The whole thing plays out like a cinematic videogame, complete with a final boss fight. It\’s also unusually gory and graphic for a film in this genre, so be warned—when somebody gets their ass kicked in Five Element Ninjas, the results aren\’t pretty.'
  },
  {
    title: 'Plan 9 From Outer Space',
    director: 'Ed Wood',
    year: '1959',
    description: 'For decades, Plan 9 was the de-facto answer to “What is the worst movie ever made?” But although it\’s certainly bad, it\’s not quite that bad—or maybe it is, and we\’re just willing to forgive because it\’s also quite charming. It\’s just a nothing of a movie, practically plotless and featuring some of Wood\’s most nonsensical dialog. The alien characters in particular are written as these totally ineffectual pseudo-intellectuals, lambasting the humans about “your stupid minds! Stupid! Stupid!” As most bad movie fans know, Bela Lugosi died in the course of filming, and unrelated footage he\’d shot for other half-finished Ed Wood projects was cycled into the finished product. Some scenes also featured chiropractor Tom Mason impersonating Lugosi by crudely holding his cape over his face, as if no one would notice. It\’s perfectly emblematic of Wood\’s laissez-faire filmmaking.'
  }
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



// return list of movies as json
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something doesn\'t seem right!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Thank you for listening to P.O.R.T. 8080!');
});