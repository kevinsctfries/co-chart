import React from "react";
import AddNode from "../Canvas/Controls/AddNode";

interface ToolbarProps {
  onAddNode: () => void;
}

export default function Toolbar({ onAddNode }: ToolbarProps) {
  return (
    <div>
      <AddNode onClick={onAddNode} />
    </div>
  );
}
