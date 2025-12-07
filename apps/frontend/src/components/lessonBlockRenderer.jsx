// src/components/LessonBlockRenderer.jsx
import React from "react";

const LessonBlockRenderer = ({ block }) => {
  switch (block.type) {
    case "text":
      return <p style={{ marginBottom: "1em" }}>{block.content}</p>;

    case "code":
      return (
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "1em",
            borderRadius: "5px",
            overflowX: "auto",
          }}
        >
          <code>{block.content}</code>
        </pre>
      );

    case "image":
      return (
        <img
          src={block.content}
          alt={block.alt || "Lesson image"}
         style={{ maxWidth: "100%", marginBottom: "1em" }}
        />
      );

    default:
      return null;
  }
};

export default LessonBlockRenderer;
 