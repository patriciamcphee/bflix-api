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
|  `/genres/[Name]` | `:name`  | GET  | Body |



### Request

None

### Response
    
A JSON object holding data about the genre of a single movie.


```json
{
    "We often see a courtroom scene, gunplay, violence, and ruthless tactics. There are times the law can be seen as good and bad, depending on who you root for and when the movie was released."
}
```

## Get data about a director by name


| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  `/directors/[Name]` | `:name`  | GET  | Body |



### Request

None

### Response

    
A JSON object holding data about the director.

```json
{
    "name": "Ed Wood",
    "birthyear": 1924,
    "deathyear": 1978,
    "bio": "An American filmmaker, actor, and pulp novel author. In the 1950s, Wood directed several low-budget science fiction, crime, and horror films that later became cult classics."
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
    "name": "Bam Bam McGee",
    "favoriteMovies": ""
}
```

### Response

A JSON object holding the new user's data with a system-generated ID.

```json
{
    "name": "Bam Bam McGee",
    "favoriteMovies": "",
    "id": "a33e6f23-9b62-450c-b643-852c2ca79b11"
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
