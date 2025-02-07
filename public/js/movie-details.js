document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");

  if (movieId) {
    try {
      // Fetch the movie from the backend using the movieId
      const response = await fetch(
        `http://localhost:5000/api/movie/${movieId}`
      );
      if (!response.ok) {
        throw new Error("Movie not found");
      }

      const movie = await response.json();

      // Update the HTML with movie details
      document.querySelector(".movie-poster").src = movie.poster;
      document.querySelector(".movie-poster").alt = movie.title;
      document.querySelector(".movie-title").textContent =
        movie.mongolian_title;
      document.querySelector(".type-value").textContent = movie.type || "-";
      document.querySelector(".year-value").textContent = movie.released;
      document.querySelector(".runtime-value").textContent = movie.runtime;
      document.querySelector(".imdb-value").textContent =
        movie.imdbRating || "N/A"; // Assuming IMDb rating is available
      document.querySelector(".user-value").textContent =
        movie.userRating || "-"; // User rating, defaults to "-" if unavailable

      // Optional: Fetch reviews related to the current movie
      const movieReviews = await fetchReviews(movieId);

      // Insert reviews dynamically or display 'No reviews yet'
      const reviewsContainer = document.querySelector(".reviews-container");
      reviewsContainer.innerHTML = ""; // Clear existing reviews

      if (movieReviews.length > 0) {
        // Insert reviews
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
        // No reviews available, display message
        const noReviewsMessage = document.createElement("h1");
        noReviewsMessage.classList.add("no-reviews");
        noReviewsMessage.textContent = "Одоохондоо сэтгэгдэл алга"; // "No reviews yet"
        reviewsContainer.appendChild(noReviewsMessage);
      }
    } catch (error) {
      console.error(error);
      document.querySelector(".movie-title").textContent = "Movie Not Found";
    }
  } else {
    console.error("No movie ID in URL");
    document.querySelector(".movie-title").textContent = "Invalid Movie ID";
  }
});

// Function to fetch reviews for a specific movie (optional)
async function fetchReviews(movieId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/reviews/${movieId}`
    );
    if (!response.ok) {
      throw new Error("Error fetching reviews");
    }

    const reviews = await response.json();
    return reviews;
  } catch (error) {
    console.error(error);
    return []; // Return empty array if there's an error fetching reviews
  }
}
