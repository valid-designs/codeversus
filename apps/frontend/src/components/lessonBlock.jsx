export default function LessonBlock({ block, index, updateBlock, removeBlock }) {
  const handleChange = (e) => {
    updateBlock(index, { ...block, content: e.target.value });
  };

  if (block.type === "text") {
    return (
      <div style={{ marginBottom: "10px" }}>
        <textarea
          value={block.content}
          onChange={handleChange}
          placeholder="Text block"
          style={{ width: "100%", minHeight: "60px" }}
        />
        <button onClick={() => removeBlock(index)}>Delete</button>
      </div>
    );
  }

  if (block.type === "code") {
    return (
      <div style={{ marginBottom: "10px" }}>
        <textarea
          value={block.content}
          onChange={handleChange}
          placeholder="Code block"
          style={{ width: "100%", minHeight: "100px", fontFamily: "monospace" }}
        />
        <button onClick={() => removeBlock(index)}>Delete</button>
      </div>
    );
  }

  if (block.type === "image") {
    return (
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={block.content}
          onChange={handleChange}
          placeholder="Image URL"
        />
        {block.content && <img src={block.content} alt="" style={{ maxWidth: "100%" }} />}
        <button onClick={() => removeBlock(index)}>Delete</button>
      </div>
    );
  }

  return null;
}
