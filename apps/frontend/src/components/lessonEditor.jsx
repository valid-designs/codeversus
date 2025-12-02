import { useState } from "react";
import LessonBlock from "./LessonBlock";

export default function LessonEditor({ content, setContent }) {
  const addBlock = (type) => {
    setContent({ blocks: [...content.blocks, { type, content: "" }] });
  };

  const updateBlock = (index, updatedBlock) => {
    const newBlocks = [...content.blocks];
    newBlocks[index] = updatedBlock;
    setContent({ blocks: newBlocks });
  };

  const removeBlock = (index) => {
    const newBlocks = [...content.blocks];
    newBlocks.splice(index, 1);
    setContent({ blocks: newBlocks });
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => addBlock("text")}>Add Text</button>
        <button onClick={() => addBlock("code")}>Add Code</button>
        <button onClick={() => addBlock("image")}>Add Image</button>
      </div>

      {content.blocks.map((block, index) => (
        <LessonBlock
          key={index}
          block={block}
          index={index}
          updateBlock={updateBlock}
          removeBlock={removeBlock}
        />
      ))}
    </div>
  );
}
