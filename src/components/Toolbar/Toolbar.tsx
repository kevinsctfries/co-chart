import React from "react";

interface ToolbarProps {
  onAddNode: () => void;
}

export default function Toolbar({ onAddNode }: ToolbarProps) {
  return (
    <div>
      <button onClick={onAddNode}>Add Node</button>
    </div>
  );
}
