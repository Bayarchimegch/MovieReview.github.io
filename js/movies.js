import { movies } from "./moviesSectionData.js";
import "../components/movies-component.js";

document.addEventListener("DOMContentLoaded", () => {
  const genreCheckboxes = document.querySelectorAll(
    '.genre-filters input[type="checkbox"]'
  );

  let filteredMovies = [];

  // Function to update the URL query parameters
  function updateQueryParams(selectedGenres) {
    const params = new URLSearchParams(window.location.search);
    if (selectedGenres.length > 0) {
      params.set("genres", selectedGenres.join(","));
    } else {
      params.delete("genres");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.pushState({}, "", newUrl);
  }

  // Function to filter movies based on selected genres
  function filterMovies() {
    // Get selected genres from checkboxes
    const selectedGenres = Array.from(genreCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    // Update the URL with the selected genres
    updateQueryParams(selectedGenres);

    // Filter the movies
    if (selectedGenres.length > 0) {
      filteredMovies = movies.filter((movie) => {
        const movieGenresLower = movie.genre.map((genre) =>
          genre.trim().toLowerCase()
        );
        const selectedGenresLower = selectedGenres.map((genre) =>
          genre.trim().toLowerCase()
        );
        return selectedGenresLower.every((genre) =>
          movieGenresLower.includes(genre)
        );
      });
    } else {
      filteredMovies = movies; // If no genres are selected, show all movies
    }

    // Create custom movie-item elements and set attributes dynamically
    // const movieListContainer = document.querySelector(".movie-list");
    // movieListContainer.innerHTML = ""; // Clear the existing content

    // filteredMovies.forEach((movie) => {
    //   const movieElement = document.createElement("movie-list-container");
    //   movieElement.setAttribute("id", movie.id);
    //   movieElement.setAttribute("title", movie.title);
    //   movieElement.setAttribute("description", movie.description);
    //   movieElement.setAttribute("releaseYear", movie.releaseYear);
    //   movieElement.setAttribute("genre", movie.genre.join(","));
    //   movieElement.setAttribute("posterUrl", movie.posterUrl);
    //   movieElement.setAttribute("rating", movie.rating);

    //   // Append the custom movie-item element to the section
    //   movieListContainer.appendChild(movieElement);
    // });
    const movieListComponent = document.querySelector("movie-list-container");

    // Ensure the component exists before updating
    if (movieListComponent) {
      movieListComponent.movies = filteredMovies;
    }
  }

  // Function to load genres from the URL and set checkboxes on page load
  function loadGenresFromQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const genresFromUrl = params.get("genres");

    if (genresFromUrl) {
      const selectedGenres = genresFromUrl.split(",");
      genreCheckboxes.forEach((checkbox) => {
        if (selectedGenres.includes(checkbox.value)) {
          checkbox.checked = true;
        }
      });
    }

    // Call filterMovies to apply the genres from URL or render all movies
    filterMovies();
  }

  // Event listeners for checkboxes
  genreCheckboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", filterMovies)
  );

  // Load movies on page load with query parameters applied
  loadGenresFromQueryParams();
});
