import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLessons } from "../api/lessons";

export default function LessonsList() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLessons()
      .then((res) => {
        setLessons(res.data.lessons || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "2em" }}>
      <h1>Lessons</h1>

      {loading ? (
        <p>Loading...</p>
      ) : lessons.length === 0 ? (
        <p>No lessons found.</p>
      ) : (
        lessons.map((lesson) => (
          <div
            key={lesson.id}
            style={{
              border: "1px solid #ddd",
              padding: "1em",
              borderRadius: "6px",
              marginBottom: "1em",
            }}
          >
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>

            <Link to={`/lessons/${lesson.id}`}>View</Link>
          </div>
        ))
      )}
    </div>
  );
}
