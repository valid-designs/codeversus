const pool = require("../db");


// CREATE LESSON
exports.createLesson = async (req, res) => {
  const { title, description, content, status, tags } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `INSERT INTO lessons (title, description, content, status, user_id, tags)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, title, description, status, tags, created_at`,
      [title, description, content, status, userId, tags || []] // default to empty array
    );

    res.json({ success: true, lesson: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create lesson" });
  }
};



// GET LESSON BY ID
exports.getLesson = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM lessons WHERE id=$1";
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Lesson not found" });

    res.json({ success: true, lesson: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to get lesson" });
  }
};

// UPDATE LESSON (only creator)
exports.updateLesson = async (req, res) => {
  const { lessonId } = req.params;
  const { title, description, content, status, tags } = req.body;
  const userId = req.user.id;

  try {
    // Ensure user owns the lesson
    const check = await pool.query(
      "SELECT * FROM lessons WHERE id=$1 AND user_id=$2",
      [lessonId, userId]
    );

    if (check.rows.length === 0) {
      return res.status(403).json({ error: "Not authorized to update this lesson" });
    }

    const result = await pool.query(
      `UPDATE lessons
       SET title=$1, description=$2, content=$3, status=$4, tags=$5
       WHERE id=$6
       RETURNING id, title, description, status, tags, created_at`,
      [title, description, content, status, tags || [], lessonId]
    );

    res.json({ success: true, lesson: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update lesson" });
  }
};


// DELETE LESSON (only creator)
exports.deleteLesson = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const check = await pool.query("SELECT * FROM lessons WHERE id=$1", [id]);
    if (check.rows.length === 0) return res.status(404).json({ error: "Lesson not found" });
    if (check.rows[0].creator_id !== userId) return res.status(403).json({ error: "Not authorized" });

    await pool.query("DELETE FROM lessons WHERE id=$1", [id]);
    res.json({ success: true, message: "Lesson deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to delete lesson" });
  }
};
