import pool from "../db/index.js";

export const searchLessons = async ({ q, tag }) => {
  let query = "SELECT id, title, description, status, tags, created_at FROM lessons WHERE status='published'";
  const params = [];

  if (q) {
    params.push(`%${q}%`);
    params.push(`%${q}%`);
    query += ` AND (title ILIKE $${params.length-1} OR description ILIKE $${params.length})`;
  }

  if (tag) {
    params.push(tag);
    query += ` AND $${params.length} = ANY(tags)`;
  }

  query += " ORDER BY created_at DESC";
  const result = await pool.query(query, params);
  return result.rows;
};
