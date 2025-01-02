import {movies} from './demoData.js';
import{moviesList} from './demoData.js';

document.addEventListener('DOMContentLoaded',()=>{
    const topMovies = document.getElementById('moviesSelection');
    
    //iterate through movies and create a list of
    movies.forEach(movie=>{
        const topMovieElement = document.createElement('top-movie');
        topMovieElement.setAttribute('id',movie.id);
        topMovieElement.setAttribute('title',movie.title);
        topMovieElement.setAttribute('posterUrl',movie.posterUrl);
        topMovieElement.setAttribute('description',movie.description);
        topMovieElement.setAttribute('releaseYear',movie.releaseYear);
        topMovieElement.setAttribute('genre',movie.genre.join(','));
        topMovieElement.setAttribute('rating',movie.rating);

        //append the movie to the section
        topMovies.appendChild(topMovieElement);
    });

    const homeMovies = document.getElementById('homeMovies');

    moviesList.forEach(movie=>{
        const topMovieElement = document.createElement('home-movie');
        topMovieElement.setAttribute('id',movie.id);
        topMovieElement.setAttribute('title',movie.title);
        topMovieElement.setAttribute('posterUrl',movie.posterUrl);
        topMovieElement.setAttribute('description',movie.description);
        topMovieElement.setAttribute('releaseYear',movie.releaseYear);
        topMovieElement.setAttribute('genre',movie.genre.join(','));
        topMovieElement.setAttribute('rating',movie.rating);

        //append the movie to the section
        topMovies.appendChild(topMovieElement);
    });
}
);