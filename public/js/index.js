import "../components/home-movie.js"; // Import the home-movie component
import "../components/top-movie.js"; // Import the top-movie component

let API_BASE_URL = "http://localhost:5001"; // Set API base URL manually

// Fetch new Movies
async function fetchMovies() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/movie/new/6`);
    if (!response.ok) throw new Error("Failed to fetch movies");
    const movies = await response.json();
    displayMovies(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Fetch Top Rated Movies
async function fetchTopMovies() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/movie/top/6`);
    if (!response.ok) throw new Error("Failed to fetch top movies");
    const topMovies = await response.json();
    displayTopMovies(topMovies);
  } catch (error) {
    console.error("Error fetching top movies:", error);
  }
}

// Display A new movies
function displayMovies(movies) {
  const section = document.getElementById("mainMoviesSection");
  section.innerHTML = ""; // Clear previous content

  movies.forEach((movie) => {
    const movieElement = document.createElement("home-movie");
    movieElement.setAttribute("id", movie.id);
    movieElement.setAttribute("title", movie.mongolian_title); // Use Mongolian title
    movieElement.setAttribute("rate", movie.imdb_rating);
    movieElement.setAttribute(
      "posterUrl",
      movie.poster || "./public/assets/images/default-poster.jpg"
    );

    section.appendChild(movieElement);
  });
}

// Display Top Movies (just poster and Mongolian title)
function displayTopMovies(movies) {
  const section = document.getElementById("topMoviesSection");
  section.innerHTML = ""; // Clear previous content

  movies.forEach((movie) => {
    const topMovieElement = document.createElement("top-movie");
    topMovieElement.setAttribute("id", movie.id);
    topMovieElement.setAttribute("title", movie.mongolian_title);
    topMovieElement.setAttribute("rate", movie.imdb_rating);
    topMovieElement.setAttribute(
      "posterUrl",
      movie.poster || "./public/assets/images/default-poster.jpg"
    );

    section.appendChild(topMovieElement);
  });
}

// ✅ Call the functions directly without fetchConfig()
fetchMovies();
fetchTopMovies();

// Theme Toggle
document.getElementById("theme-toggle")?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});
