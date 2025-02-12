document.addEventListener("DOMContentLoaded", async () => {
  let genreCheckboxes;
  let movies = [];
  let filteredMovies = [];

  async function fetchMovies() {
    try {
      const response = await fetch("http://localhost:5001/api/movie/");
      if (!response.ok) throw new Error("Failed to fetch movies");
      movies = await response.json();
      applyFiltersFromURL(); // Apply filters when movies are fetched
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

      // Update the URL with selected genres
      const newUrl = `movies.html?genres=${encodeURIComponent(
        selectedGenres.join(",")
      )}`;
      history.pushState({}, "", newUrl);
    } else {
      filteredMovies = movies;
      history.pushState({}, "", "movies.html");
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

        // Keeping the old structure here for styling and functionality
        movieElement.innerHTML = `
          <img src="${movie.poster}" alt="${movie.mongolian_title}" />
          <h4>${movie.mongolian_title}</h4>
          <button class="watchlist-btn">Жагсаалтанд нэмэх</button>
        `;

        // Navigate to movie details when clicking on the image or title
        movieElement
          .querySelector("img")
          .addEventListener("click", () => navigateToMovie(movie));
        movieElement
          .querySelector("h4")
          .addEventListener("click", () => navigateToMovie(movie));

        // Add event listener for the Watchlist button
        const watchlistButton = movieElement.querySelector(".watchlist-btn");
        watchlistButton.addEventListener("click", (event) => {
          event.stopPropagation(); // Prevents clicking on the movie itself
          addToWatchlist(movie);
        });

        movieListContainer.appendChild(movieElement);
      });
    }
  }

  // Function to navigate to movie details
  function navigateToMovie(movie) {
    const urlSlug = movie.mongolian_title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    window.location.href = `movie-detail.html?id=${movie.id}&title=${urlSlug}`;
  }

  // Function to add movies to Watchlist
  function addToWatchlist(movie) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    // Check if the movie is already in the watchlist
    if (!watchlist.some((item) => item.id === movie.id)) {
      watchlist.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      alert(`"${movie.mongolian_title}" added to your watchlist!`);
    } else {
      alert(`"${movie.mongolian_title}" is already in your watchlist.`);
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

    // Add event listener to checkboxes
    genreCheckboxes.forEach((checkbox) =>
      checkbox.addEventListener("change", filterMovies)
    );

    applyFiltersFromURL(); // Apply URL filters after checkboxes are created
  }

  function applyFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedGenresFromURL = urlParams.get("genres")?.split(",") || [];

    genreCheckboxes.forEach((checkbox) => {
      checkbox.checked = selectedGenresFromURL.includes(
        checkbox.value.toLowerCase()
      );
    });

    filterMovies(); // Apply filtering after updating checkboxes
  }

  // Handle browser back/forward navigation
  window.addEventListener("popstate", applyFiltersFromURL);

  await fetchMovies();
  await fetchGenres();
});

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.paddingTop = "60px";

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
