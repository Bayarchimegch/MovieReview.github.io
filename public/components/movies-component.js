class MovieListContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set movies(movies) {
    this.render(movies);
  }

  connectedCallback() {
    this.render([]);
  }

  render(movies) {
    this.shadowRoot.innerHTML = `
      <style>
        .movie-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          padding: 20px;
        }
        .movie {
          background: var(--backgroundSecondary, #fff);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.2s ease-in-out;
        }
        .movie:hover {
          transform: scale(1.05);
        }
        .movie img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }
        .movie h2 {
          font-size: 16px;
          margin: 10px;
        }
        .movie p {
          font-size: 14px;
          margin: 0 10px 10px;
          color: gray;
        }
        .watchlist-btn {
          background: var(--accent, #ff4500);
          color: white;
          border: none;
          padding: 10px;
          width: 100%;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .watchlist-btn:hover {
          background: var(--accentDark, #e03e00);
        }
      </style>
      <section class="movie-list"></section>
    `;

    const movieListSection = this.shadowRoot.querySelector(".movie-list");
    movieListSection.innerHTML = "";

    if (movies.length === 0) {
      const noResultsMessage = document.createElement("h1");
      noResultsMessage.textContent = "Илэрц олдсонгүй.";
      movieListSection.appendChild(noResultsMessage);
    } else {
      movies.forEach((movie) => {
        const movieArticle = document.createElement("article");
        movieArticle.classList.add("movie");
        movieArticle.setAttribute("data-genre", movie.genre.join(", "));

        movieArticle.innerHTML = `
          <img src="${movie.poster}" alt="${movie.mongolian_title}" />
          <h2>${movie.mongolian_title}</h2>
          <p>${movie.genre.join(", ")}</p>
          <button class="watchlist-btn">+ Watchlist</button>
        `;

        // Navigate to movie details
        movieArticle
          .querySelector("img")
          .addEventListener("click", () => navigateToMovie(movie));
        movieArticle
          .querySelector("h2")
          .addEventListener("click", () => navigateToMovie(movie));

        // Add movie to Watchlist
        movieArticle
          .querySelector(".watchlist-btn")
          .addEventListener("click", (event) => {
            event.stopPropagation();
            addToWatchlist(movie);
          });

        movieListSection.appendChild(movieArticle);
      });
    }
  }
}

function navigateToMovie(movie) {
  const urlSlug = movie.mongolian_title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  window.location.href = `movie-detail.html?id=${movie.id}&title=${urlSlug}`;
}

function addToWatchlist(movie) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (!watchlist.some((item) => item.id === movie.id)) {
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert(`"${movie.mongolian_title}" added to your watchlist!`);
  } else {
    alert(`"${movie.mongolian_title}" is already in your watchlist.`);
  }
}

// Define the custom element
customElements.define("movie-list-container", MovieListContainer);

// Export the functions
export { navigateToMovie, addToWatchlist };
