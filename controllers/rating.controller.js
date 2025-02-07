const Rating = require("../models/rating.model");

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
};
