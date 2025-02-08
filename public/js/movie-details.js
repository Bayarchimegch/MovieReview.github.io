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

      document.querySelector(".movie-poster").src = movie.poster;
      document.querySelector(".movie-poster").alt = movie.title;
      document.querySelector(".movie-title").textContent =
        movie.mongolian_title;
      document.querySelector(".type-value").textContent = movie.type || "Movie";
      document.querySelector(".year-value").textContent = movie.year;
      document.querySelector(".runtime-value").textContent = formatRuntime(
        movie.runtime
      );
      document.querySelector(".imdb-value").innerHTML = `⭐ ${
        movie.imdbRating || "N/A"
      }`;
      document.querySelector(".user-value").innerHTML = movie.userRating
        ? `⭐ ${movie.userRating}`
        : "☆";

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
      console.error(error);
      document.querySelector(".movie-title").textContent = "Movie Not Found";
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

async function fetchReviews(movieId) {
  try {
    const response = await fetch(
      `http://localhost:5001/api/reviews/${movieId}`
    );
    if (!response.ok) {
      throw new Error("Error fetching reviews");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Apply Theme
const applyTheme = () => {
  document.body.style.backgroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--background");
  document.body.style.color = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--textPrimary");
  document.body.style.paddingTop = "60px"; // Add top padding to avoid overlap with header
};

document.addEventListener("DOMContentLoaded", applyTheme);
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", applyTheme);

const themeToggle = document.getElementById("theme-toggle");
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  applyTheme();
});
