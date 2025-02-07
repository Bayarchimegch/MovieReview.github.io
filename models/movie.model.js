const pool = require("../config/db");

//  Get all movies
const getAllMovies = async () => {
  const result = await pool.query("SELECT * FROM movies;");
  return result.rows;
};

//  Get a single movie by ID
const getMovieById = async (id) => {
  const result = await pool.query("SELECT * FROM movies WHERE id = $1;", [id]);
  return result.rows[0];
};

const getTopMovies = async (top) => {
  // Using parameterized query to avoid SQL injection, and limit the number of results based on the 'top' argument
  const result = await pool.query(
    "SELECT * FROM movies ORDER BY imdb_rating DESC LIMIT $1;",
    [top]
  );
  return result.rows;
};

// Create a new movie
const createMovie = async (data) => {
  const {
    title,
    mongolian_title,
    year,
    rated,
    released,
    runtime,
    genre,
    director,
    writer,
    actors,
    plot,
    mongolian_plot,
    language,
    country,
    awards,
    mongolian_awards,
    poster,
    imdb_rating,
    imdbID,
    type,
    box_office,
  } = data;

  const result = await pool.query(
    `
    INSERT INTO movies (
      title, mongolian_title, year, rated, released, runtime, genre, director, writer, actors, plot, mongolian_plot, 
      language, country, awards, mongolian_awards, poster, imdb_rating, imdbID, type, box_office
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 
      $13, $14, $15, $16, $17, $18, $19, $20, $21
    ) RETURNING *;
  `,
    [
      title,
      mongolian_title,
      year,
      rated,
      released,
      runtime,
      genre,
      director,
      writer,
      actors,
      plot,
      mongolian_plot,
      language,
      country,
      awards,
      mongolian_awards,
      poster,
      imdb_rating,
      imdbID,
      type,
      box_office,
    ]
  );

  return result.rows[0];
};

// Delete a movie
const deleteMovie = async (id) => {
  const result = await pool.query(
    "DELETE FROM movies WHERE id = $1 RETURNING *;",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  getTopMovies,
};
