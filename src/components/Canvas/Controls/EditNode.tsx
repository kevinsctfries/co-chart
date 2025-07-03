import React from "react";
import { NodeProps } from "reactflow";

export default function EditNode(props: NodeProps) {
  const { data } = props;

  return (
    <div
      onContextMenu={data?.onContextMenu}
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#fff",
        cursor: "pointer",
      }}>
      {data.label}
    </div>
  );
}
