import pool from "../db/index.js";

const createLesson = async (userId, { title, description, content, status, tags }) => {
  const result = await pool.query(
    "INSERT INTO lessons (title, description, content, status, user_id, tags) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, title, description, content, status, tags, created_at",
    [title, description, content, status, userId, tags || []]
  );
  return result.rows[0];
};

const getLesson = async (lessonId) => {
  const result = await pool.query(
    "SELECT id, title, description, content, status, user_id, tags, created_at FROM lessons WHERE id=$1",
    [lessonId]
  );
  return result.rows[0];
};

const updateLesson = async (userId, lessonId, payload) => {
  const check = await pool.query("SELECT user_id FROM lessons WHERE id=$1", [lessonId]);
  if (!check.rows.length) throw new Error("Lesson not found");
  if (check.rows[0].user_id !== userId) throw new Error("Not authorized");

  const { title, description, content, status, tags } = payload;
  const result = await pool.query(
    "UPDATE lessons SET title=$1, description=$2, content=$3, status=$4, tags=$5 WHERE id=$6 RETURNING id, title, description, content, status, tags, created_at",
    [title, description, content, status, tags || [], lessonId]
  );
  return result.rows[0];
};

const deleteLesson = async (userId, lessonId) => {
  const check = await pool.query("SELECT user_id FROM lessons WHERE id=$1", [lessonId]);
  if (!check.rows.length) throw new Error("Lesson not found");
  if (check.rows[0].user_id !== userId) throw new Error("Not authorized");

  await pool.query("DELETE FROM lessons WHERE id=$1", [lessonId]);
  return true;
};

export default { createLesson, getLesson, updateLesson, deleteLesson };