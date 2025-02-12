const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/rating.controller");

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Үнэлгээний API
 */

/**
 * @swagger
 * /api/ratings:
 *   post:
 *     summary: Шинэ үнэлгээ үүсгэх
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
 *         description: Үнэлгээ амжилттай үүсгэгдлээ
 *       500:
 *         description: Серверийн алдаа
 */
router.post("/create", ratingController.createRating);

/**
 * @swagger
 * /api/ratings/{id}:
 *   get:
 *     summary: Үнэлгээг ID-ээр авах
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
 *         description: Үнэлгээний дэлгэрэнгүй мэдээлэл
 *       404:
 *         description: Үнэлгээ олдсонгүй
 *       500:
 *         description: Сервэрийн алдаа
 */
router.get("/:id", ratingController.getRatingById);

/**
 * @swagger
 * /api/ratings/movie/{movie_id}:
 *   get:
 *     summary: Кино бүрт бүх үнэлгээг авах
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
 *         description: Үнэлгээний жагсаалт
 *       500:
 *         description: Сервэрийн алдаа
 */
router.post("/movie/:movie_id", ratingController.getRatingsByMovieId);
router.post("/ratings/movie/:movie_id", ratingController.getMovieWithRatings);
router.get("/ratings/user/:user_id", ratingController.getUserWithRatings);

/**
 * @swagger
 * /api/ratings/{id}:
 *   put:
 *     summary: Үнэлгээг шинэчлэх
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
 *         description: Үнэлгээ амжилттай шинэчлэгдлээ
 *       404:
 *         description: Үнэлгээ олдсонгүй
 *       500:
 *         description: Сервэрийн алдаа
 */
router.put("/:id", ratingController.updateRating);

/**
 * @swagger
 * /api/ratings/{id}:
 *   delete:
 *     summary: Үнэлгээг устгах
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
 *         description: Үнэлгээ амжилттай устгагдлаа
 *       404:
 *         description: Үнэлгээ олдсонгүй
 *       500:
 *         description: Сервэрийн алдаа
 */
router.delete("/:id", ratingController.deleteRating);

module.exports = router;
