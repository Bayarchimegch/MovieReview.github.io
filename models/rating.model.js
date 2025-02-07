const db = require("../config/db");

// Create a new rating
const createRating = async (data) => {
  const { movie_id, user_id, value } = data;

  const query = `
    INSERT INTO ratings (movie_id, user_id, value)
    VALUES ($1, $2, $3)
    RETURNING id, movie_id, user_id, value;
  `;

  const values = [movie_id, user_id, value];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// Get a rating by ID
const getRatingById = async (id) => {
  const query = `SELECT * FROM ratings WHERE id = $1;`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

// Get ratings for a movie
const getRatingsByMovieId = async (movie_id) => {
  const query = `SELECT * FROM ratings WHERE movie_id = $1;`;
  const { rows } = await db.query(query, [movie_id]);
  return rows;
};

// Update a rating
const updateRating = async (id, value) => {
  const query = `
    UPDATE ratings
    SET value = $1
    WHERE id = $2
    RETURNING id, movie_id, user_id, value;
  `;

  const { rows } = await db.query(query, [value, id]);
  return rows[0];
};

// Delete a rating
const deleteRating = async (id) => {
  const query = `DELETE FROM ratings WHERE id = $1 RETURNING id;`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

module.exports = {
  createRating,
  getRatingById,
  getRatingsByMovieId,
  updateRating,
  deleteRating,
};
