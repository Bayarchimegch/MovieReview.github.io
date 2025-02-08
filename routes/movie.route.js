const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie.controller");

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API for managing movies
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of all movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", MovieController.getAllMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get a single movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Movie not found
 */
router.get("/:id", MovieController.getMovieById);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               releaseYear:
 *                 type: integer
 *             required:
 *               - title
 *               - description
 *               - releaseYear
 *     responses:
 *       201:
 *         description: Movie created successfully
 */
router.post("/", MovieController.createMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 */
router.delete("/:id", MovieController.deleteMovie);

router.get("/top/:top", (req, res) => {
  const top = parseInt(req.params.top, 10); // Convert the 'top' parameter to an integer

  // Check if 'top' is a valid number
  if (isNaN(top)) {
    return res.status(400).json({ message: "Invalid 'top' parameter" });
  }

  MovieController.getTopMovies(req, res, top); // Pass 'top' to the controller
});

router.get("/genre", MovieController.getGenres);
router.get("/new/:limit", MovieController.getNewMovies);

module.exports = router;
