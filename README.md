# My B-Movie Flix API
This API lets your users access information about different B-movies, such as directors and actors. It also lets them sign up so they can create a list of their favorite B-movies.


## Get a list of all movies


<!-- **Base Url** : `http://bflixmovies.com` -->

| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  `/movies` | none  |  GET | Body |

### Request

None

### Response
A JSON object holding data about all the movies.

## Get data about a single movie by title
[description of what it does]

| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  `/movies/[Title]` | `:title`  |  GET | Body |



### Request

None

### Response

A JSON object holding data about a single movie containing the description, genre, directory, image URL, and featured (true or false).

```json
{
    "title": "Hard Ticket to Hawaii",
    "description": "In Hawaii, an undercover DEA agent and her civilian friend stumble upon a drug trafficking operation, and have to enlist the help of all their colleagues/friends to go after the vicious drug kingpin.",
    "year": 1987,
    "director": "Andy Sidaris",
    "genre": "Action",
    "imgURL": "",
    "featured": ""
}
```

## Get data about a genre by title


| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  `movies/genre/[Name]` | `:name`  | GET  | Body |



### Request

None

### Response
    
A JSON object holding data about the genre of the movies in the database.

>Genres are not in a separate database. Therefore, the movie information and director information are included in the response.


```json
{
    "Genre": {
        "Name": "Kung Fu",
        "Description": "A subgenre of martial arts films and Hong Kong action cinema set in the contemporary period and featuring realistic martial arts."
    },
    "Director": {
        "Name": "Chang Cheh",
        "Bio": "He was the leading Martial Arts director in Hong Kong in the 1970s, now with close to 100 films to his name. He has influenced other directors such as John Woo and Liu Chiau Liang, and made famous such Hong Kong stars as Phillip Chung-Fung Kwok, Fu Sheng, and Lung Ti.",
        "Birth": "1923-02-10",
        "Death": "2002-06-22"
    },
    "_id": "62af64b890779f9b519bda58",
    "Title": "Five Element Ninjas",
    "Description": "A Chinese martial arts school is infiltrated and destroyed by ninjas. Tian Hao survives the massacre and seeks to uncover the trickery of ninjutsu in order to beat the Five Element Ninjas and avenge his family.",
    "ImagePath": "https://m.media-amazon.com/images/M/MV5BODc5NzdkMzktZWM5OS00MzJiLTk2NTAtNzdiMmM1ODFlOTY5XkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_UY209_CR1,0,140,209_AL_.jpg",
    "Featured": true,
    "Rated": "R",
    "Release": "1982"
    }
```

## Get data about a director by name


| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  `/directors/[Name]` | `:name`  | GET  | Body |



### Request

None

### Response

    
A JSON object holding data about a director.

>Genres are not in a separate database. Therefore, the movie information and director information are included in the response.

```json
{
    "Genre": {
        "Name": "Action",
        "Description": "A clear division between good and evil. Lots of fighting and set pieces. Their pacing and structure are built around scenes like car chases and their climaxes often have the biggest set-pieces."
    },
    "Director": {
        "Name": "Andy Sidaris",
        "Bio": "Born in Chicago, Illinois, he was an actor and a pioneer director of TV sports shows. He directed NFL Monday Night Football (1970) and earned an Emmy for his work directing the televised 1968 Summer Olympics in 1969. He died from throat cancer on March 7, 2007, in Beverly Hills, CA.",
        "Birth": "1931-02-30",
        "Death": "2007-03-07"
    },
    "_id": "62af62d990779f9b519bda54",
    "Title": "Hard Ticket to Hawaii",
    "Description": "In Hawaii, an undercover DEA agent and her civilian friend stumble upon a drug-trafficking operation, and have to enlist the help of all their colleagues/friends to go after the vicious drug kingpin.",
    "ImagePath": "https://m.media-amazon.com/images/M/MV5BNDgwNjhmZmQtOTBlNi00MWQ4LTk4OWMtMDkxNmQ4NjhlNzk5XkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_UX140_CR0,0,140,209_AL_.jpg",
    "Featured": true,
    "Release": "1987",
    "Rated": "R"
}
```

## User registration


| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  `/user` | N/A  | POST  | Body |



### Request

A JSON object holding the data about the new user.

```json
{
    "Username": "bambammcgee",
    "Password": "NUng``GQE@c]",
    "Email": "bbmcgee@email.com"
}
```



### Response

A JSON object holding the new user's data with a system-generated ID.

```json
{
    "Username": "bambammcgee",
    "Password": "NUng``GQE@c]",
    "Email": "bbmcgee@email.com",
    "FavoriteMovies": [],
    "_id": "62c0764a5efee8cbbeadeee3",
}
```

## Update user info


| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  `/users/[ID]/[Name]` | `:id`, `:name`  | PUT  | Body |



### Request

A JSON object holding the updated information about the user.

```json
{
    "name": "Chris P. McGuffin"
}
```

### Response

A JSON object holding the updated data for the user.

```json
{
    "id": 1,
    "name": "Chris P. McGuffin",
    "favoriteMovies": [
        "Plan 9 From Outer Space"
    ]
}
```

## Unregister user (delete user)


| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  `/users/[ID]` | `:id`  | DELETE  | Text |



### Request

None

### Response

A text confirmation message indicating the user has been removed from the movie app. 

```
1 has been removed from the movie app.
```



## Add a movie to a "favorites" list


| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  `/users/[ID]/[favoriteMovies]` | `:id`, `:title`  | PUT  | Text |



### Request

None


### Response

A text confirmation message indicating the movie has been added. 

```
Birdemic has been added to your favorite's list.
```

## Remove a movie from the "favorites" list


| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  `/users/[ID]/[favoriteMovies]` | `:id`, `:title`  | DELETE  | Text |



### Request

None

### Response

A text confirmation message indicating the movie has been removed. 

```
Miami Connection has been removed from your favorite's list.
```
