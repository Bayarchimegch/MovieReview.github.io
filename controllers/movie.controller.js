const Movie = require("../models/movie.model");

// ✅ Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get a movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.getMovieById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTopMovies = async (req, res) => {
  try {
    const movies = await Movie.getTopMovies(req.params.top);
    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGenres = async (res) => {
  try {
    const genres = await Movie.getGenres();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNewMovies = async (req, res) => {
  try {
    // Extract limit from the route params
    const limit = parseInt(req.params.limit, 10);
    if (isNaN(limit)) {
      return res.status(400).json({ message: "Invalid 'limit' parameter" });
    }

    // Fetch new movies using the limit value
    const movies = await Movie.getNewMovies(limit);

    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: "No new movies found" });
    }

    // Return the movies as a JSON response
    res.json(movies);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create a new movie
const createMovie = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: "Missing required field: title" });
    }

    const newMovie = await Movie.createMovie(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a movie
const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.deleteMovie(req.params.id);
    if (!deletedMovie)
      return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  getTopMovies,
  getGenres,
  getNewMovies,
};
