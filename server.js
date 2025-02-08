require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 5001;

// PostgreSQL connection
const pool = require("./config/db.js"); // Import database connection

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err));

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie Review API",
      version: "1.0.0",
      description: "An API for managing movies and user reviews",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./routes/*.js"], // Define API routes here
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
const movieRoutes = require("./routes/movie.route.js");
const userRoutes = require("./routes/user.route.js");
const ratingRoutes = require("./routes/rating.route.js");

//endpoints
app.use("/api/movie", movieRoutes);
app.use("/api/user", userRoutes);
app.use("/api/rating", ratingRoutes);

app.get("/api/config", (req, res) => {
  res.json({ apiBaseUrl: `http://localhost:${process.env.PORT || 5001}` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
