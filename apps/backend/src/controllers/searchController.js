const pool = require("../db"); // <-- import your PostgreSQL pool

exports.searchLessons = async (req, res) => {
  const { q, tag } = req.query; // optional 'tag' filter

  let query = `
    SELECT id, title, description, status, tags, created_at
    FROM lessons
    WHERE status='published'
  `;
  let params = [];

  if (q) {
    params.push(`%${q}%`);
    query += ` AND (title ILIKE $${params.length} OR description ILIKE $${params.length})`;
  }

  if (tag) {
    params.push(tag);
    query += ` AND $${params.length} = ANY(tags)`; // match if tag exists in array
  }

  query += " ORDER BY created_at DESC";

  try {
    const result = await pool.query(query, params);
    res.json({ success: true, lessons: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
};
