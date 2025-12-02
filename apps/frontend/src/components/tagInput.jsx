import { useState } from "react";

export default function TagInput({ tags, setTags }) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setInput("");
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{ background: "#eee", padding: "2px 6px", borderRadius: "4px", cursor: "pointer" }}
            onClick={() => removeTag(tag)}
          >
            {tag} ×
          </span>
        ))}
      </div>
      <input
        type="text"
        placeholder="Add tag and press Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTag}>Add</button>
    </div>
  );
}
