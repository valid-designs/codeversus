import pool from "../db/index.js";

const rateLesson = async (lessonId, userId, rating) => {
  const existing = await pool.query("SELECT id FROM lesson_ratings WHERE lesson_id=$1 AND user_id=$2", [lessonId, userId]);
  if (existing.rows.length > 0) {
    const update = await pool.query(
      "UPDATE lesson_ratings SET rating=$1, created_at=NOW() WHERE lesson_id=$2 AND user_id=$3 RETURNING id, lesson_id, user_id, rating, created_at",
      [rating, lessonId, userId]
    );
    return update.rows[0];
  }

  const insert = await pool.query(
    "INSERT INTO lesson_ratings (lesson_id, user_id, rating) VALUES ($1,$2,$3) RETURNING id, lesson_id, user_id, rating, created_at",
    [lessonId, userId, rating]
  );
  return insert.rows[0];
};

const getRatings = async (lessonId) => {
  const ratings = await pool.query(
    "SELECT r.id, r.rating, u.username FROM lesson_ratings r JOIN users u ON r.user_id = u.id WHERE r.lesson_id=$1",
    [lessonId]
  );

  const average = await pool.query(
    "SELECT COALESCE(AVG(rating),0) as avg FROM lesson_ratings WHERE lesson_id=$1",
    [lessonId]
  );

  return { ratings: ratings.rows, average: parseFloat(average.rows[0].avg) };
};

export default { rateLesson, getRatings };
