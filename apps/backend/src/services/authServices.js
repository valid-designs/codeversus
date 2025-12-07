import pool from "../db/index.js";
import bcrypt from "bcryptjs";

export const register = async (username, email, password) => {
  email = email.toLowerCase();
  const exists = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  if (exists.rows.length > 0) throw new Error("Email already registered");

  const hashed = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING id, username, email, created_at",
    [username, email, hashed]
  );
  return result.rows[0];
};

export const login = async (email, password) => {
  email = email.toLowerCase();
  const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (userResult.rows.length === 0) throw new Error("User does not exist");

  const user = userResult.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid password");
  return user;
};
