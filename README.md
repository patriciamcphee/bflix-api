# My B-Movie Flix API
This API lets users access information about different B-movies, such as directors and actors. It also lets them sign up so they can create a list of their favorite B-movies.


## Get a list of all movies



| Endpoint | HTTP Method | Request | Response |
| --- | --- | --- | --- |
|  `/movies` |  GET | None | Body |

### Request example

None

### Response example
A JSON object holding data about all the movies.



## Get data about a single movie by title


| Endpoint | HTTP Method | Request | Response |
| --- | --- | --- | --- |
|  `/movies/:Title` | GET | None | Body |



### Request example

None

### Response

A JSON object holding data about a single movie containing the description, genre, directory, image URL, and featured (true or false).

```json
{
    "_id": "62af62d990779f9b519bda54",
    "Title": "Hard Ticket to Hawaii",
    "Description": "In Hawaii, an undercover DEA agent and her civilian friend stumble upon a drug-trafficking operation, and have to enlist the help of all their colleagues/friends to go after the vicious drug kingpin.",
    "ImagePath": "https://m.media-amazon.com/images/M/MV5BNDgwNjhmZmQtOTBlNi00MWQ4LTk4OWMtMDkxNmQ4NjhlNzk5XkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_UX140_CR0,0,140,209_AL_.jpg",
    "Featured": true,
    "Release": "1987",
    "Rated": "R"
}
```

## Get data about a genre by title


| Endpoint | HTTP Method | Request | Response |
| --- | --- | --- | --- |
|  `movies/genre/:Name` | GET  | None | Body |



### Request

None

### Response
    
A JSON object that holds data about the genre of the movies in the database.


```json
{
    "Name": "Action",
    "Description": "A clear division between good and evil. Lots of fighting and set pieces. Their pacing and structure are built around scenes like car chases and their climaxes often have the biggest set-pieces."
}
```

## Get data about a director by name

| Endpoint | HTTP Method | Request | Response |
| --- | --- | --- | --- |
|  `/movies/directors/:Name` | GET | None | Body |



### Request

None

### Response

    
A JSON object holding data about a director.

```json
{
    "Name": "Chang Cheh",
    "Bio": "He was the leading Martial Arts director in Hong Kong in the 1970s, now with close to 100 films to his name. He has influenced other directors such as John Woo and Liu Chiau Liang, and made famous such Hong Kong stars as Phillip Chung-Fung Kwok, Fu Sheng, and Lung Ti.",
    "Birth": "1923-02-10",
    "Death": "2002-06-22"
}
```

## User registration


| Endpoint | HTTP Method | Request | Response |
| --- | --- | --- | --- |
|  `/user` | POST  | Body | Body |



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
    "__v": 0
}
```

## Update user info


| Endpoint | HTTP Method | Request | Response |
| --- | --- | --- | --- |
|  `/users/:Username` | PUT | Body | Body |



### Request

A JSON object that holds the updated information about the user.

```json
{
    "Username": "patriciamcphee",
    "Password": "jFB6DGX7nhXfpxon"
}
```

### Response

A JSON object that holds the updated data for the user.

```json
{
    "_id": "62af73cd90779f9b519bda60",
    "Username": "patriciamcphee",
    "Password": "jFB6DGX7nhXfpxon",
     "Email": "somethingrandom@email.com",
      "FavoriteMovies": [
          "62c319b0b16106ca5a07b823"
      ],
      "__v": 0
}
```

## Unregister user (delete user)


| Endpoint | HTTP Method | Request | Response |
| --- | --- | --- | --- |
|  `/users/:Username` | DELETE  | None | Text |



### Request

None

### Response

A text confirmation message indicating the user has been removed from the movie app. 

```
bambammcgee has been removed from the movie app.
```



## Add a movie to a user's "favorites" list


| Endpoint | HTTP Method | Request | Response |
| --- | --- | --- | --- |
|  `/users/:Username/movies/:MovieID` | POST  | None | Text |



### Request

None


### Response
A JSON object that holds the updated data for the user.

```json
{
    "_id": "62c346d4b258c5e174f0c93a",
    "Username": "patriciamcphee",
    "Password": "3)MFK+HZh%K-",
    "Email": "somethingrandom@email.com",
    "FavoriteMovies": [
        "62c31dfbb16106ca5a07b826"
    ],
    "__v": 0
}
```

## Remove a movie from the user's "favorites" list

| Endpoint | HTTP Method | Request | Response |
| --- | --- | --- | --- |
|  `/users/:Username/movies/:MovieID` | DELETE  | None | Text |



### Request

None

### Response
A JSON object that holds the updated data for the user.
 

```json
{
    "_id": "62c346d4b258c5e174f0c93a",
    "Username": "patriciamcphee",
    "Password": "3)MFK+HZh%K-",
    "Email": "somethingrandom@email.com",
    "FavoriteMovies": [],
    "__v": 0
}
```