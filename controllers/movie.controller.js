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

module.exports = { getAllMovies, getMovieById, createMovie, deleteMovie };
