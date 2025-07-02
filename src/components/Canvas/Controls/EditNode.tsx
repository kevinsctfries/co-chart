import { useEffect, useRef, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";

export default function EditNode({ id, data, selected }: NodeProps) {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const finishEdit = () => {
    setEditing(false);
    if (label !== data.label) {
      data.onChange(id, label);
    }
  };

  return (
    <div
      onDoubleClick={() => setEditing(true)}
      style={{
        padding: 10,
        border: selected ? "2px solid black" : "1px solid black",
        borderRadius: 4,
        background: "White",
        minWidth: 100,
        textAlign: "center",
      }}>
      <Handle type="target" position={Position.Top} />
      {editing ? (
        <input
          ref={inputRef}
          value={label}
          onChange={e => setLabel(e.target.value)}
          onBlur={finishEdit}
          onKeyDown={e => e.key === "Enter" && finishEdit()}
          style={{ width: "100%", boxSizing: "border-box" }}
        />
      ) : (
        <div>{data.label}</div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
