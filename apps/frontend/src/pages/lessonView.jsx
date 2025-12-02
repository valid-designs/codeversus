import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLesson } from "../api/lessons";

export default function LessonView() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await getLesson(id);
        if (res.data.success) setLesson(res.data.lesson);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLesson();
  }, [id]);

  if (!lesson) return <div>Loading...</div>;

  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
      <div>
        {lesson.tags.map((tag) => (
          <span key={tag} style={{ background: "#eee", padding: "2px 6px", marginRight: "5px", borderRadius: "4px" }}>
            {tag}
          </span>
        ))}
      </div>
      <h3>Content:</h3>
      <pre>{JSON.stringify(lesson.content, null, 2)}</pre>
    </div>
  );
}
