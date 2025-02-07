import "../components/movies-component.js"; // Make sure this is available

document.addEventListener("DOMContentLoaded", () => {
  let genreCheckboxes;
  let movies = [];
  let filteredMovies = [];

  // Function to fetch movies from the API
  async function fetchMovies() {
    try {
      const response = await fetch("http://localhost:5000/api/movie/");
      if (!response.ok) throw new Error("Failed to fetch movies");
      movies = await response.json();
      filterMovies(); // Filter movies right after fetching
    } catch (e) {
      console.error("Error fetching movies:", e);
    }
  }

  // Function to filter movies based on selected genres
  function filterMovies() {
    const selectedGenres = Array.from(genreCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value.toLowerCase()); // Convert to lowercase for consistent comparison

    if (selectedGenres.length > 0) {
      filteredMovies = movies.filter((movie) => {
        // Split the genre string from the database and convert it into an array
        const movieGenresLower = movie.genre
          .replace(/{|}/g, "") // Remove curly braces if present
          .split(",") // Split the string by commas to create an array
          .map((genre) => genre.trim().toLowerCase()); // Trim whitespace and convert to lowercase for comparison

        // Check if all selected genres are included in the movie's genre list
        return selectedGenres.every((genre) =>
          movieGenresLower.includes(genre)
        );
      });
    } else {
      filteredMovies = movies; // If no genres are selected, show all movies
    }

    // Display filtered movies
    displayMovies(filteredMovies);
  }

  // Function to display the movies
  function displayMovies(movies) {
    const movieListContainer = document.querySelector(".movie-list-container");
    movieListContainer.innerHTML = ""; // Clear the previous content

    // Check if the filtered movies array is empty
    if (movies.length === 0) {
      // Display a message when no movies match the filter
      const noMoviesMessage = document.createElement("div");
      noMoviesMessage.classList.add("no-movies-message");
      noMoviesMessage.innerHTML = "<h3>Илэрц олдсонгүй</h3>"; // "No results found"
      movieListContainer.appendChild(noMoviesMessage);
    } else {
      // Create and append movie cards dynamically
      movies.forEach((movie) => {
        const movieElement = document.createElement("movie-card");
        movieElement.setAttribute("title", movie.mongolian_title); // Assuming 'mongolian_title' is a valid field
        movieElement.innerHTML = `
        <img src="${movie.poster}" alt="${movie.mongolian_title}" />
        <h4>${movie.mongolian_title}</h4>
      `;

        // Add click event listener to navigate to details page
        movieElement.addEventListener("click", () => {
          // Navigate to movie-detail.html with the movie's ID
          window.location.href = `movie-detail.html?id=${movie.id}`;
        });

        movieListContainer.appendChild(movieElement);
      });
    }
  }

  // Function to fetch and display genres
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

  // Function to populate genre checkboxes dynamically
  function populateGenres(genres) {
    const genreFilters = document.querySelector(".genre-filters");
    genreFilters.innerHTML = ""; // Clear previous genres

    genres.forEach((genre) => {
      const genreLabel = document.createElement("label");
      genreLabel.innerHTML = `
        <input type="checkbox" value="${genre}" /> ${genre}
      `;
      genreFilters.appendChild(genreLabel);
    });

    // Now that checkboxes are populated, bind event listeners
    genreCheckboxes = document.querySelectorAll(
      '.genre-filters input[type="checkbox"]'
    );
    genreCheckboxes.forEach((checkbox) =>
      checkbox.addEventListener("change", filterMovies)
    );
  }

  // Call the functions to fetch movies and genres
  fetchMovies(); // Fetch movies initially
  fetchGenres(); // Populate genres checkboxes
});
