require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// const API_BASE_URL = `http://localhost:${5001}`;
// module.exports.API_BASE_URL = API_BASE_URL;
module.exports = pool;
