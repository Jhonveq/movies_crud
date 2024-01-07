const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");


Genre.belongsToMany(Movie,{through: 'GenreMovies'})
Movie.belongsToMany(Genre,{through: 'GenreMovies'})

Actor.belongsToMany(Movie,{through: 'MovieActors'})
Movie.belongsToMany(Actor,{through: 'MovieActors'})

Director.belongsToMany(Movie,{through: 'MovieDirectors'})
Movie.belongsToMany(Director,{through: 'MovieDirectors'})