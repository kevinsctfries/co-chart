import React from "react";

type Shape = "rectangle" | "diamond";

interface ChangeShapeMenuProps {
  id: string;
  x: number;
  y: number;
  onChangeShape: (id: string, shape: Shape) => void;
  onClose: () => void;
}

export function ChangeShapeMenu({
  id,
  x,
  y,
  onChangeShape,
  onClose,
}: ChangeShapeMenuProps) {
  return (
    <ul style={{ position: "absolute", top: y, left: x }}>
      <li
        onClick={() => {
          onChangeShape(id, "rectangle");
          onClose();
        }}>
        Rectangle
      </li>
      <li
        onClick={() => {
          onChangeShape(id, "diamond");
          onClose();
        }}>
        Diamond
      </li>
    </ul>
  );
}
