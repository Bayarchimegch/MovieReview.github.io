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
const getNewMovies = async (limit) => {
  const result = await pool.query(
    "SELECT * FROM movies ORDER BY released DESC LIMIT $1;",
    [limit]
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
    genre, // Expecting an array here
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

  // Ensure genre is an array of genre_enum
  const result = await pool.query(
    `
    INSERT INTO movies (
      title, mongolian_title, year, rated, released, runtime, genre, director, writer, actors, plot, mongolian_plot, 
      language, country, awards, mongolian_awards, poster, imdb_rating, imdbID, type, box_office
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7::genre_enum[], $8, $9, $10, $11, $12, 
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
      genre, // Make sure this is an array of genres
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

const getGenres = async () => {
  try {
    const result = await pool.query(
      "SELECT unnest(enum_range(NULL::genre_enum)) AS genre;"
    );
    return result.rows.map((row) => row.genre); // Extract genres from the result rows
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error; // Re-throw error for further handling in the controller
  }
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
  getGenres,
  getNewMovies,
};
