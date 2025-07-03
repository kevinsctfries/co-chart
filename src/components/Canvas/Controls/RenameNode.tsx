import React, { useState, useEffect, useRef } from "react";

interface RenameNodeProps {
  id: string;
  label: string;
  x: number;
  y: number;
  onRename: (id: string, newLabel: string) => void;
  onClose: () => void;
}

export function RenameNode({
  id,
  label,
  x,
  y,
  onRename,
  onClose,
}: RenameNodeProps) {
  const [value, setValue] = useState(label);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const finish = () => {
    onRename(id, value);
    onClose();
  };

  return (
    <input
      ref={ref}
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={finish}
      onKeyDown={e => e.key === "Enter" && finish()}
      style={{
        position: "absolute",
        top: y,
        left: x,
      }}
    />
  );
}
