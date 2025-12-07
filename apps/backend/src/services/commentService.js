import pool from "../db/index.js";
import sanitize from "../utils/sanitize.js";

export const addComment = async (lessonId, userId, commentText) => {
  const safeComment = sanitize(commentText);
  const result = await pool.query(
    "INSERT INTO lesson_comments (lesson_id, user_id, comment) VALUES ($1,$2,$3) RETURNING id, lesson_id, user_id, comment, created_at",
    [lessonId, userId, safeComment]
  );
  return result.rows[0];
};

export const getComments = async (lessonId) => {
  const result = await pool.query(
    "SELECT c.id, c.comment, c.created_at, u.username FROM lesson_comments c JOIN users u ON c.user_id = u.id WHERE c.lesson_id=$1 ORDER BY c.created_at ASC",
    [lessonId]
  );
  return result.rows;
};