import { movies } from "./moviesSectionData.js";
import { demoReviews } from "./demoData/reviewData.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");

  if (movieId) {
    //Find the movie from data source or API call
    const movie = movies.find((movie) => movie.id === parseInt(movieId));
    if (movie) {
      // Update the HTML with movie details
      document.querySelector(".movie-poster").src = movie.posterUrl;
      document.querySelector(".movie-poster").alt = movie.title;
      document.querySelector(".movie-title").textContent = movie.title;
      document.querySelector(".movie-description").textContent =
        movie.description;
      document.querySelector(".release-date").textContent = movie.releaseYear;
      document.querySelector(".movie-genres").textContent =
        movie.genre.join(", ");
      // Filter reviews for the current movie
      const movieReviews = demoReviews.filter(
        (review) => review.movieId === Number(movieId)
      );

      // Dynamically insert reviews or display 'No reviews yet'
      const reviewsContainer = document.querySelector(".reviews-container");
      reviewsContainer.innerHTML = ""; // Clear existing reviews

      if (movieReviews.length > 0) {
        // Insert reviews
        movieReviews.forEach((review) => {
          const reviewElement = document.createElement("div");
          reviewElement.classList.add("review");
          reviewElement.innerHTML = `
                            <h3>User ${review.userId}</h3>
                            <p class="review-date">${new Date().toLocaleDateString()}</p>
                            <p class="review-text">${review.comment}</p>
                            <p class="review-rating">Rating: <strong>${
                              review.rate
                            }/5</strong></p>
                        `;
          reviewsContainer.appendChild(reviewElement);
        });
      } else {
        // No reviews available, display message
        const noReviewsMessage = document.createElement("h1");
        noReviewsMessage.classList.add("no-reviews");
        noReviewsMessage.textContent = "Одоохондоо сэтгэгдэл алга";
        reviewsContainer.appendChild(noReviewsMessage);
      }
    } else {
      console.error("Movie not found");
      document.querySelector(".movie-title").textContent = "Movie Not Found";
    }
  } else {
    console.error("No movie ID in URL");
    document.querySelector(".movie-title").textContent = "Invalid Movie ID";
  }
});
