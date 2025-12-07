import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLessons } from "../api/lessons";

export default function LessonsList() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await getLessons();
        setLessons(res.data.lessons || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "2em auto" }}>
      <h2>All Lessons</h2>
      {loading ? (
        <p>Loading lessons...</p>
      ) : lessons.length === 0 ? (
        <p>No lessons available.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1em" }}>
          {lessons.map((lesson) => (
            <div key={lesson.id} style={{ border: "1px solid #ccc", padding: "1em", borderRadius: "5px" }}>
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
              <div style={{ marginBottom: "0.5em" }}>
                {lesson.tags?.map((tag) => (
                  <span key={tag} style={{ background: "#eee", padding: "0.2em 0.5em", marginRight: "0.3em", borderRadius: "3px", fontSize: "0.85em" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link to={`/lessons/${lesson.id}`} style={{ color: "white", background: "#007bff", padding: "0.4em 0.8em", borderRadius: "4px", textDecoration: "none" }}>
                View Lesson
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
