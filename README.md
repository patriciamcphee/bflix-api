# My B-Movie Flix API
This API lets your users access information about different B-movies, such as directors and actors. It also lets them sign up so they can create a list of their favorite B-movies.

| Business logic | URL | Query parameters | HTTP method | Request body data format | Response body data format |
| --- | --- | --- | --- | --- | --- |
| **Get data about a genre by title** | /genres/[Name] | :name | GET | None | A JSON object holding data about the genre of a single movie.Example"Dramas frequently follow characters you'd see as your friends, neighbors, and family dealing with the struggles of everyday life. They usually take place in a home, office setting, or with a group of characters forced to interact day to day." |
| **Get data about a director by name** | /directors/[Name] | :name | GET | None | A JSON object holding data about the director.Example{"name": "Ed Wood","birthyear": 1924,"deathyear": 1978,"bio": "An American filmmaker, actor, and pulp novel author. In the 1950s, Wood directed several low-budget science fiction, crime, and horror films that later became cult classics."} |
|**User registration** | /users | N/A | POST | A JSON object holding the data about the new user.Example{"name": "Bam Bam McGee","favoriteMovies": ""} | A JSON object holding the new user's data with a system-generated ID.Example{"name": "Bam Bam McGee","favoriteMovies": "","id": "0ef776e7-a269-4734-a7f8-2668fb8f9958"} |
| **Update user info** | /users/[ID]/[name] | :id, :name | PUT | A JSON object holding the updated information about the user.Example{"name": "Chris",} | A JSON object holding the updated data for the user.Example{"id": 1,"name": "Chris Paul McGuffin","favoriteMovies": ""} |
| **Unregister user (delete user)** | /users/[ID] | :id | DELETE | None | A text confirmation message indicating the user has been removed from the movie app. For example, "User has been from the movie app." |
| **Add a movie to a "favorites" list** | /users/[ID]/[favoriteMovies] | :id, :title | PUT | None | A text confirmation message indicating the movie has been added. For example, "Miami Connection has been added to your favorite's list." |
| **Remove a movie from the "favorites" list** | /users/[ID]/[favoriteMovies] | :id, :title | DELETE | None | A text confirmation message indicating the movie has been removed. For example, "Miami Connection has been removed from your favorite's list." |







## Get a list of all movies
[description of what it does]

<!-- **Base Url** : `http://bflixmovies.com` -->

| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  `/movies` | none  |  GET | body |

### Request

None

### Response
A JSON object holding data about all the movies.

## Get data about a single movie by title
[description of what it does]

| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  `/movies/[Title]` | `:title`  |  GET | body |



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
[description of what it does]

| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  ` ` | ` `  |   |  |



### Request

```json
{

}
```

### Response



```json
{

}
```

## Get data about a director by name
[description of what it does]

| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  ` ` | ` `  |   |  |



### Request

```json
{

}
```

### Response



```json
{

}
```

## User registration
[description of what it does]

| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  ` ` | ` `  |   |  |



### Request

```json
{

}
```

### Response



```json
{

}
```

## Update user info
[description of what it does]

| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  ` ` | ` `  |   |  |



### Request

```json
{

}
```

### Response



```json
{

}
```

## Unregister user (delete user)
[description of what it does]

| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  ` ` | ` `  |   |  |



### Request

```json
{

}
```

### Response



```json
{

}
```

## Add a movie to a "favorites" list
[description of what it does]

| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  ` ` | ` `  |   |  |



### Request

```json
{

}
```

### Response



```json
{

}
```

## Remove a movie from the "favorites" list
[description of what it does]

| Endpoint | Parameters | Method | Response type |
| --- | --- | --- | --- |
|  ` ` | ` `  |   |  |



### Request

```json
{

}
```

### Response



```json
{

}
```
