// src/pages/LessonView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLesson } from "../api/lessons";
import LessonBlockRenderer from "../components/LessonBlockRenderer";

const LessonView = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await getLesson(id);
        setLesson(res.data.lesson);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLesson();
  }, [id]);

  if (!lesson) return <p>Loading lesson...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2em" }}>
      <h1>{lesson.title}</h1>
      <p>{lesson.description}</p>
      <div style={{ marginBottom: "1em" }}>
        {lesson.tags?.map((tag) => (
          <span
            key={tag}
            style={{
              display: "inline-block",
              backgroundColor: "#eee",
              padding: "0.2em 0.5em",
              marginRight: "0.5em",
              borderRadius: "3px",
              fontSize: "0.9em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      {lesson.content?.blocks?.map((block, index) => (
        <LessonBlockRenderer key={index} block={block} />
      ))}
    </div>
  );
};

export default LessonView;
