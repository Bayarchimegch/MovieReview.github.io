const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Хэрэглэгчийн удирдлагын API
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Шинэ хэрэглэгч бүртгэх
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum: [regular, admin, creator]
 *     responses:
 *       201:
 *         description: Хэрэглэгч амжилттай бүртгэгдлээ
 *       400:
 *         description: Имэйл аль хэдийн ашиглагдаж байна
 *       500:
 *         description: Сервэрийн алдаа
 */
router.post("/register", userController.registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Хэрэглэгчийн нэвтрэх
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Нэвтрэх амжилттай боллоо
 *       400:
 *         description: Имэйл эсвэл нууц үг буруу
 *       500:
 *         description: Сервэрийн алдаа
 */
router.post("/login", userController.loginUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Бүх хэрэглэгчдийг авах
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Хэрэглэгчдийн жагсаалт
 *       500:
 *         description: Сервэрийн алдаа
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Хэрэглэгчийг ID-ээр авах
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Хэрэглэгчийн дэлгэрэнгүй мэдээлэл
 *       404:
 *         description: Хэрэглэгч олдсонгүй
 *       500:
 *         description: Сервэрийн алдаа
 */
router.get("/:id", userController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Хэрэглэгчийг ID-ээр устгах
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Хэрэглэгч амжилттай устгагдлаа
 *       404:
 *         description: Хэрэглэгч олдсонгүй
 *       500:
 *         description: Сервэрийн алдаа
 */
router.delete("/:id", userController.deleteUser);

module.exports = router;
