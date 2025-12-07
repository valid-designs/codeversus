import pool from "../db/index.js";

const searchLessons = async ({ q, tag }) => {
  let query = "SELECT id, title, description, status, tags, created_at FROM lessons WHERE status='published'";
  const params = [];

  if (q) {
    const paramIndex1 = params.length + 1;
    const paramIndex2 = params.length + 2;
    params.push(`%${q}%`, `%${q}%`);
    query += ` AND (title ILIKE $${paramIndex1} OR description ILIKE $${paramIndex2})`;
  }

  if (tag) {
    params.push(tag);
    query += ` AND $${params.length} = ANY(tags)`;
  }

  query += " ORDER BY created_at DESC";
  const result = await pool.query(query, params);
  return result.rows;
};

export default { searchLessons };
