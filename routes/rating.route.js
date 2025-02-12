const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/rating.controller");

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Ratings API
 */

/**
 * @swagger
 * /api/ratings:
 *   post:
 *     summary: Create a new rating
 *     tags: [Ratings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie_id:
 *                 type: integer
 *                 example: 1
 *               user_id:
 *                 type: integer
 *                 example: 2
 *               value:
 *                 type: number
 *                 format: float
 *                 example: 8.5
 *     responses:
 *       201:
 *         description: Rating created successfully
 *       500:
 *         description: Server error
 */
router.post("/create", ratingController.createRating);

/**
 * @swagger
 * /api/ratings/{id}:
 *   get:
 *     summary: Get a rating by ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Rating details
 *       404:
 *         description: Rating not found
 *       500:
 *         description: Server error
 */
router.get("/:id", ratingController.getRatingById);

/**
 * @swagger
 * /api/ratings/movie/{movie_id}:
 *   get:
 *     summary: Get all ratings for a movie
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: List of ratings
 *       500:
 *         description: Server error
 */
router.post("/movie/:movie_id", ratingController.getRatingsByMovieId);
router.post("/ratings/movie/:movie_id", ratingController.getMovieWithRatings);
router.get("/ratings/user/:user_id", ratingController.getUserWithRatings);

/**
 * @swagger
 * /api/ratings/{id}:
 *   put:
 *     summary: Update a rating
 *     tags: [Ratings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *                 format: float
 *                 example: 7.5
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *       404:
 *         description: Rating not found
 *       500:
 *         description: Server error
 */
router.put("/:id", ratingController.updateRating);

/**
 * @swagger
 * /api/ratings/{id}:
 *   delete:
 *     summary: Delete a rating
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Rating deleted successfully
 *       404:
 *         description: Rating not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", ratingController.deleteRating);

module.exports = router;
