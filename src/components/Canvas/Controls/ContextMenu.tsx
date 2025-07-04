import React, { useCallback } from "react";
import { useReactFlow, Node } from "reactflow";
import styles from "./ContextMenu.module.scss";

interface ContextMenuProps {
  id: string;
  top?: number | false;
  left?: number | false;
  right?: number | false;
  bottom?: number | false;
  onClose: () => void;
  onStartRename: (id: string) => void;
}

export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  onClose,
  onStartRename,
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

  const setShapeType = useCallback(
    (shape: string) => {
      setNodes(nds =>
        nds.map(n =>
          n.id === id
            ? {
                ...n,
                type: shape,
                data: {
                  ...n.data,
                  shape,
                },
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
      className={styles.contextMenu}
      style={{
        top: top === false ? undefined : top,
        left: left === false ? undefined : left,
        right: right === false ? undefined : right,
        bottom: bottom === false ? undefined : bottom,
      }}
      onContextMenu={e => e.preventDefault()}>
      <button
        onClick={() => {
          onClose();
          onStartRename(id);
        }}>
        Rename
      </button>
      <button onClick={() => setShapeType("triangle")}>Triangle</button>
      <button onClick={() => setShapeType("rectangle")}>rectangle</button>
      <button onClick={() => setShapeType("parallelogram")}>
        Parallelogram
      </button>
      <button onClick={() => setShapeType("trapezoid")}>Trapezioid</button>
      <button onClick={duplicateNode}>Duplicate</button>
      <button onClick={deleteNode}>Delete</button>
    </div>
  );
}
