document.addEventListener("DOMContentLoaded", () => {
  let genreCheckboxes;
  let movies = [];
  let filteredMovies = [];

  async function fetchMovies() {
    try {
      const response = await fetch("http://localhost:5001/api/movie/");
      if (!response.ok) throw new Error("Failed to fetch movies");
      movies = await response.json();
      filterMovies();
    } catch (e) {
      console.error("Error fetching movies:", e);
    }
  }

  function filterMovies() {
    const selectedGenres = Array.from(genreCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value.toLowerCase());

    if (selectedGenres.length > 0) {
      filteredMovies = movies.filter((movie) => {
        const movieGenresLower = movie.genre
          .replace(/{|}/g, "")
          .split(",")
          .map((genre) => genre.trim().toLowerCase());
        return selectedGenres.every((genre) =>
          movieGenresLower.includes(genre)
        );
      });
    } else {
      filteredMovies = movies;
    }
    displayMovies(filteredMovies);
  }

  function displayMovies(movies) {
    const movieListContainer = document.querySelector(".movie-list-container");
    movieListContainer.innerHTML = "";

    if (movies.length === 0) {
      const noMoviesMessage = document.createElement("div");
      noMoviesMessage.classList.add("no-movies-message");
      noMoviesMessage.innerHTML = "<h3>Илэрц олдсонгүй</h3>";
      movieListContainer.appendChild(noMoviesMessage);
    } else {
      movies.forEach((movie) => {
        const movieElement = document.createElement("movie-card");
        movieElement.setAttribute("title", movie.mongolian_title);
        movieElement.innerHTML = `
        <img src="${movie.poster}" alt="${movie.mongolian_title}" />
        <h4>${movie.mongolian_title}</h4>
      `;

        movieElement.addEventListener("click", () => {
          window.location.href = `movie-detail.html?id=${movie.id}`;
        });

        movieListContainer.appendChild(movieElement);
      });
    }
  }

  async function fetchGenres() {
    const genres = [
      "Action",
      "Adventure",
      "Animation",
      "Comedy",
      "Crime",
      "Drama",
      "Experimental",
      "Fantasy",
      "Historical",
      "Horror",
      "Romance",
      "Science Fiction",
      "Thriller",
      "Western",
      "Musical",
      "War",
      "Other",
      "Biography",
      "History",
      "Sci-Fi",
    ];
    populateGenres(genres);
  }

  function populateGenres(genres) {
    const genreFilters = document.querySelector(".genre-filters");
    genreFilters.innerHTML = "";

    genres.forEach((genre) => {
      const genreLabel = document.createElement("label");
      genreLabel.innerHTML = `
        <input type="checkbox" value="${genre}" /> ${genre}
      `;
      genreFilters.appendChild(genreLabel);
    });

    genreCheckboxes = document.querySelectorAll(
      '.genre-filters input[type="checkbox"]'
    );
    genreCheckboxes.forEach((checkbox) =>
      checkbox.addEventListener("change", filterMovies)
    );
  }

  fetchMovies();
  fetchGenres();
});

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});

// Ensure body has padding to prevent it from going behind the top bar
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.paddingTop = "60px";

  // Adjust movie-list-container to align with genre sidebar
  const movieListContainer = document.querySelector(".movie-list-container");
  if (movieListContainer) {
    movieListContainer.style.marginTop = "0";
  }

  // Apply theme from theme.js
  const applyTheme = () => {
    const theme = document.documentElement.getAttribute("data-theme");
    document.body.style.backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--background");
    document.body.style.color = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--textPrimary");
  };

  applyTheme();
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", applyTheme);
});

const applyTheme = () => {
  const root = document.documentElement;
  document.body.style.backgroundColor =
    getComputedStyle(root).getPropertyValue("--background");
  document.body.style.color =
    getComputedStyle(root).getPropertyValue("--textPrimary");

  const categories = document.querySelector(".categories");
  const movieListContainer = document.querySelector(".movie-list-container");

  if (categories) {
    categories.style.backgroundColor = getComputedStyle(root).getPropertyValue(
      "--backgroundSecondary"
    );
    categories.style.borderColor =
      getComputedStyle(root).getPropertyValue("--accent");
  }
  if (movieListContainer) {
    movieListContainer.style.backgroundColor =
      getComputedStyle(root).getPropertyValue("--background");
    movieListContainer.style.borderColor =
      getComputedStyle(root).getPropertyValue("--accent");
  }
};
