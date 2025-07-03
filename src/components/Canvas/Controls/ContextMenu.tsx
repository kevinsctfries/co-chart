// in ContextMenu.tsx
import React, { useCallback } from "react";
import { useReactFlow, Node } from "reactflow";

interface ContextMenuProps {
  id: string;
  top?: number | false;
  left?: number | false;
  right?: number | false;
  bottom?: number | false;
  onClose: () => void;
}

export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  onClose,
}: ContextMenuProps) {
  const { getNode, setNodes, setEdges } = useReactFlow();

  const duplicateNode = useCallback(() => {
    const node = getNode(id)!;
    const newNode: Node = {
      ...node,
      id: `${node.id}-copy`,
      position: {
        x: node.position.x + 40,
        y: node.position.y + 40,
      },
      selected: false,
      dragging: false,
    };
    setNodes(nds => nds.concat(newNode));
    onClose();
  }, [id, getNode, setNodes, onClose]);

  const deleteNode = useCallback(() => {
    setNodes(nds => nds.filter(n => n.id !== id));
    setEdges(eds => eds.filter(e => e.source !== id && e.target !== id));
    onClose();
  }, [id, setNodes, setEdges, onClose]);

  const renameNode = useCallback(() => {
    const newLabel = prompt("Enter new label");
    if (newLabel != null) {
      setNodes(nds =>
        nds.map(n =>
          n.id === id ? { ...n, data: { ...n.data, label: newLabel } } : n
        )
      );
    }
    onClose();
  }, [id, setNodes, onClose]);

  const changeShape = useCallback(
    (shape: string) => {
      setNodes(nds =>
        nds.map(n =>
          n.id === id
            ? {
                ...n,
                data: { ...n.data, shape },
              }
            : n
        )
      );
      onClose();
    },
    [id, setNodes, onClose]
  );

  return (
    <div
      className="context-menu"
      style={{
        position: "absolute",
        top: top === false ? undefined : top,
        left: left === false ? undefined : left,
        right: right === false ? undefined : right,
        bottom: bottom === false ? undefined : bottom,
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: 4,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "0.5rem",
        zIndex: 10,
      }}
      onContextMenu={e => e.preventDefault()}>
      <button onClick={renameNode}>Rename</button>
      <button onClick={() => changeShape("rectangle")}>Rectangle</button>
      <button onClick={() => changeShape("diamond")}>Diamond</button>
      <button onClick={duplicateNode}>Duplicate</button>
      <button onClick={deleteNode}>Delete</button>
    </div>
  );
}
