// src/db/index.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

if (!process.env.JWT_SECRET) {
  throw new Error("FATAL: Missing JWT_SECRET in environment");
}

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export default pool;
