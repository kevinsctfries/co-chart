import React from "react";
import { Handle, Position, NodeProps, Node } from "reactflow";
import RenameNode from "./Controls/RenameNode";

export default function CustomNode({
  id,
  data,
  selected,
  editingNodeId,
  setEditingNodeId,
  setNodes,
}: NodeProps & {
  editingNodeId: string | null;
  setEditingNodeId: (id: string | null) => void;
  setNodes: React.Dispatch<React.SetStateAction<NodeProps["data"][]>>;
}) {
  if (editingNodeId === id) {
    return (
      <RenameNode
        id={id}
        label={data.label}
        onRename={(nodeId, newLabel) => {
          setNodes((nds: Node[]) =>
            nds.map(n =>
              n.id === nodeId
                ? { ...n, data: { ...n.data, label: newLabel } }
                : n
            )
          );
          setEditingNodeId(null);
        }}
        onCancel={() => setEditingNodeId(null)}
      />
    );
  }

  return (
    <div
      style={{
        padding: 10,
        border: selected ? "2px solid #555" : "1px solid #ccc",
        borderRadius: 4,
        background: "#fff",
      }}>
      <Handle type="target" position={Position.Top} id="top" />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
}
