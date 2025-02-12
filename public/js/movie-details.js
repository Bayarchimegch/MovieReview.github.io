document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");

  if (movieId) {
    try {
      const response = await fetch(
        `http://localhost:5001/api/movie/${movieId}`
      );
      if (!response.ok) {
        throw new Error("Movie not found");
      }

      const movie = await response.json();

      document.querySelector(".movie-poster").src =
        movie.poster || "default.jpg";

      document.querySelector(".movie-poster").alt = movie.title;

      document.querySelector(".movie-title-op").textContent =
        movie.mongolian_title || movie.title;
      document.querySelector(".year-value").textContent = movie.year || "N/A";
      document.querySelector(".rated-value").textContent = movie.rated || "N/A";

      document.querySelector(".director-op").textContent = movie.director;

      document.querySelector(".writer-value").textContent =
        movie.writer || "N/A";
      document.querySelector(".actors-value").textContent =
        movie.actors || "N/A";
      document.querySelector(".mongolian-plot-value").textContent =
        movie.mongolian_plot || "N/A";
      document.querySelector(".language-value").textContent =
        movie.language || "N/A";
      document.querySelector(".country-value").textContent =
        movie.country || "N/A";
      document.querySelector(".mongolian-awards-value").textContent =
        movie.mongolian_awards || "N/A";
      document.querySelector(".imdb-rating-value").textContent = `⭐ ${
        movie.imdb_rating || "N/A"
      }`;
      document.querySelector(".imdb-id-value").textContent =
        movie.imdbID || "N/A";
      document.querySelector(".box-office-value").textContent = movie.box_office
        ? `$${parseFloat(
            movie.box_office.replace(/[^0-9.]/g, "")
          ).toLocaleString()}`
        : "N/A";

      console.log(movie);
      const movieReviews = await fetchReviews(movieId);
      const reviewsContainer = document.querySelector(".reviews-container");
      reviewsContainer.innerHTML = "";

      if (movieReviews.length > 0) {
        movieReviews.forEach((review) => {
          const reviewElement = document.createElement("div");
          reviewElement.classList.add("review");
          reviewElement.innerHTML = `
            <h3>User ${review.userId}</h3>
            <p class="review-date">${new Date(
              review.date
            ).toLocaleDateString()}</p>
            <p class="review-text">${review.comment}</p>
          `;
          reviewsContainer.appendChild(reviewElement);
        });
      } else {
        const noReviewsMessage = document.createElement("h1");
        noReviewsMessage.classList.add("no-reviews");
        noReviewsMessage.textContent = "Одоохондоо сэтгэгдэл алга";
        reviewsContainer.appendChild(noReviewsMessage);
      }
    } catch (error) {
      document.querySelector(".movie-title").textContent = "Movie";
    }
  } else {
    console.error("No movie ID in URL");
    document.querySelector(".movie-title").textContent = "Invalid Movie ID";
  }
});

function formatRuntime(runtime) {
  if (!runtime) return "-";
  const parts = runtime.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  return `${hours}h ${minutes}min`;
}
