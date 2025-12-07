import { useState } from "react";
import { createLesson } from "../api/lessons";
import TagInput from "../components/tagInput";
import { useNavigate } from "react-router-dom";
import LessonEditor from "../components/lessonEditor";

export default function LessonCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState({ blocks: [] });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createLesson({ title, description, tags, status, content });
      if (res.data.success) {
        navigate(`/lessons/${res.data.lesson.id}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create lesson");
    }
  };

  return (
    <div>
      <h2>Create Lesson</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div>
          <label>Tags:</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div>
          <label>Content:</label>
          <LessonEditor content={content} setContent={setContent} />
        </div>


        <button type="submit">Create Lesson</button>
      </form>
    </div>
  );
}
