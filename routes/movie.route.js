const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie.controller");

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Кино менежментийн API
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Бүх киног авах
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Бүх киноны жагсаалт
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
 *     summary: Киноны ID-ээр нэг кино авах
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Киноны ID
 *     responses:
 *       200:
 *         description: Киноны дэлгэрэнгүй мэдээлэл
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Кино олдсонгүй
 */
router.get("/:id", MovieController.getMovieById);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Шинэ кино үүсгэх
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
 *         description: Кино амжилттай үүсгэгдлээ
 */
router.post("/", MovieController.createMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Киноны ID-ээр кино устгах
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Киноны ID
 *     responses:
 *       200:
 *         description: Кино амжилттай устгагдлаа
 *       404:
 *         description: Кино олдсонгүй
 */
router.delete("/:id", MovieController.deleteMovie);

/**
 * @swagger
 * /api/movies/top/{top}:
 *   get:
 *     summary: Топ 10 кино авах
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: top
 *         required: true
 *         schema:
 *           type: integer
 *         description: Хэр их кино авахыг заана
 *     responses:
 *       200:
 *         description: Топ киноны жагсаалт
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: top параметр нь буруу байна
 */
router.get("/top/:top", (req, res) => {
  const top = parseInt(req.params.top, 10); // 'top' параметрийг тоо болгож хувиргах

  // 'top' параметр нь зөв эсэхийг шалгах
  if (isNaN(top)) {
    return res.status(400).json({ message: "'top' параметр нь буруу байна" });
  }

  MovieController.getTopMovies(req, res, top); // 'top'-ийг контроллерт дамжуулах
});

/**
 * @swagger
 * /api/movies/genre:
 *   get:
 *     summary: Киноны жанрын жагсаалтыг авах
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Жанрын жагсаалт
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/genre", MovieController.getGenres);

/**
 * @swagger
 * /api/movies/new/{limit}:
 *   get:
 *     summary: Шинэ кинонуудыг хязгаарласан тоогоор авах
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Хэр олон шинэ кино авахыг заана
 *     responses:
 *       200:
 *         description: Шинэ киноны жагсаалт
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/new/:limit", MovieController.getNewMovies);

module.exports = router;
