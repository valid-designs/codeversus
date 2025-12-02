const pool = require("../db");

// Add or update rating
exports.rateLesson = async (req, res) => {
  const { lessonId } = req.params;
  const { rating } = req.body; // integer 1-5
  const userId = req.user.id;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  try {
    // Check if user already rated this lesson
    const check = await pool.query(
      "SELECT * FROM lesson_ratings WHERE lesson_id=$1 AND user_id=$2",
      [lessonId, userId]
    );

    if (check.rows.length > 0) {
      // Update existing rating
      const update = await pool.query(
        "UPDATE lesson_ratings SET rating=$1, created_at=NOW() WHERE lesson_id=$2 AND user_id=$3 RETURNING *",
        [rating, lessonId, userId]
      );
      return res.json({ success: true, rating: update.rows[0] });
    }

    // Insert new rating
    const insert = await pool.query(
      "INSERT INTO lesson_ratings (lesson_id, user_id, rating) VALUES ($1, $2, $3) RETURNING *",
      [lessonId, userId, rating]
    );

    res.json({ success: true, rating: insert.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to rate lesson" });
  }
};

// Get ratings and average for a lesson
exports.getRatings = async (req, res) => {
  const { lessonId } = req.params;

  try {
    const result = await pool.query(
      "SELECT r.id, r.rating, u.username FROM lesson_ratings r JOIN users u ON r.user_id=u.id WHERE r.lesson_id=$1",
      [lessonId]
    );

    const avgResult = await pool.query(
      "SELECT AVG(rating) as average FROM lesson_ratings WHERE lesson_id=$1",
      [lessonId]
    );

    res.json({
      success: true,
      ratings: result.rows,
      average: parseFloat(avgResult.rows[0].average) || 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get ratings" });
  }
};
