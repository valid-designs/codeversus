const pool = require("../db");

// Add comment to a lesson
exports.addComment = async (req, res) => {
  const { lessonId } = req.params;
  const { comment } = req.body;
  const userId = req.user.id;

  try {
    const query = `
      INSERT INTO lesson_comments (lesson_id, user_id, comment)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [lessonId, userId, comment]);
    res.json({ success: true, comment: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

// Get comments for a lesson
exports.getComments = async (req, res) => {
  const { lessonId } = req.params;

  try {
    const query = `
      SELECT c.id, c.comment, c.created_at, u.username
      FROM lesson_comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.lesson_id = $1
      ORDER BY c.created_at ASC
    `;
    const result = await pool.query(query, [lessonId]);
    res.json({ success: true, comments: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get comments" });
  }
};
