const Rating = require("../models/rating.model");
const Movie = require("../models/movie.model");
const { getMovieById } = require("../models/movie.model");
// Create a new rating
const createRating = async (req, res) => {
  try {
    const { movie_id, user_id, value } = req.body;

    if (value < 0 || value > 10) {
      return res
        .status(400)
        .json({ error: "Rating value must be between 0.0 and 10.0" });
    }

    const newRating = await Rating.createRating({ movie_id, user_id, value });
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a rating by ID
const getRatingById = async (req, res) => {
  try {
    const rating = await Rating.getRatingById(req.params.id);
    if (!rating) {
      return res.status(404).json({ error: "Rating not found" });
    }
    res.json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ratings for a movie
const getRatingsByMovieId = async (req, res) => {
  try {
    const ratings = await Rating.getRatingsByMovieId(req.params.movie_id);
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMovieWithRatings = async (req, res) => {
  try {
    const movieId = req.params.movie_id;

    // Get movie details from the database
    const movie = await getMovieById(movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Fetch all ratings for the movie
    const ratings = await Rating.getRatingsByMovieId(movieId); // Assuming this function exists in your Rating model

    if (ratings.length === 0) {
      return res.status(404).json({ error: "No ratings found for this movie" });
    }

    // Respond with movie details and the full rating details
    res.status(200).json({
      movie: {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        director: movie.director,
        // Add more movie details as needed
      },
      ratings: ratings, // Sending the full rating objects
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserWithRatings = async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Fetch all movies with ratings
    const allMovies = await Movie.getAllMovies(); // Ensure this function exists in your Movie model

    // Get all ratings for all movies
    const allRatings = await Promise.all(
      allMovies.map(async (movie) => {
        const ratings = await Rating.getRatingsByMovieId(movie.id); // Use this function
        return { movie, ratings };
      })
    );

    // Filter ratings by user ID
    const userRatings = allRatings
      .flatMap(({ movie, ratings }) =>
        ratings
          .filter((rating) => rating.user_id === parseInt(userId)) // Filter only this user's ratings
          .map((rating) => ({
            movie: {
              id: movie.id,
              title: movie.title,
              year: movie.year,
              director: movie.director,
            },
            rating: {
              value: rating.value,
            },
          }))
      );

    if (userRatings.length === 0) {
      return res.status(404).json({ error: "No ratings found for this user" });
    }

    // Respond with user ratings
    res.status(200).json({
      userId: userId,
      moviesWithRatings: userRatings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a rating
const updateRating = async (req, res) => {
  try {
    const { value } = req.body;

    if (value < 0 || value > 10) {
      return res
        .status(400)
        .json({ error: "Rating value must be between 0.0 and 10.0" });
    }

    const updatedRating = await Rating.updateRating(req.params.id, value);
    if (!updatedRating) {
      return res.status(404).json({ error: "Rating not found" });
    }
    res.json(updatedRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a rating
const deleteRating = async (req, res) => {
  try {
    const deletedRating = await Rating.deleteRating(req.params.id);
    if (!deletedRating) {
      return res.status(404).json({ error: "Rating not found" });
    }
    res.json({ message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRating,
  getRatingById,
  getRatingsByMovieId,
  updateRating,
  deleteRating,
  getMovieWithRatings,
  getUserWithRatings
};
