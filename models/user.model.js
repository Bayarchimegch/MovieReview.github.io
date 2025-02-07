const db = require("../config/db"); // PostgreSQL database connection
const bcrypt = require("bcryptjs");

// Create a new user (with password hashing)
const createUser = async (data) => {
  const { username, email, password, role } = data;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (username, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, username, email, role, created_at;
  `;

  const values = [username, email, hashedPassword, role || "regular"];

  const { rows } = await db.query(query, values);
  return rows[0];
};

// Get user by ID
const getUserById = async (id) => {
  const query = `SELECT id, username, email, role, created_at FROM users WHERE id = $1;`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

// Get user by email (for login authentication)
const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1;`;
  const { rows } = await db.query(query, [email]);
  return rows[0];
};

// Get all users
const getAllUsers = async () => {
  const query = `SELECT id, username, email, role, created_at FROM users;`;
  const { rows } = await db.query(query);
  return rows;
};

// Delete user by ID
const deleteUser = async (id) => {
  const query = `DELETE FROM users WHERE id = $1 RETURNING id;`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  deleteUser,
};
