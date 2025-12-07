import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch latest lessons
    const fetchLessons = async () => {
      try {
        const res = await axios.get("http://localhost:5000/lessons"); // you may create a GET /lessons endpoint
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
    <div className="container">
      <header className="hero">
        <h1>Welcome to CodeVersus</h1>
        <p>Learn, create, and share coding lessons effortlessly.</p>
        <div className="cta-buttons">
          <Link to="/create" className="btn btn-primary">Create Lesson</Link>
          <Link to="/lessons" className="btn btn-secondary">Browse Lessons</Link>
        </div>
      </header>

      <main>
        <h2>Latest Lessons</h2>
        {loading ? (
          <p>Loading lessons...</p>
        ) : (
          <div className="lesson-grid">
            {lessons.length === 0 ? (
              <p>No lessons available yet.</p>
            ) : (
              lessons.map(lesson => (
                <div key={lesson.id} className="lesson-card">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                  <div className="tags">
                    {lesson.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <Link to={`/lesson/${lesson.id}`} className="btn btn-sm btn-primary">
                    View Lesson
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;