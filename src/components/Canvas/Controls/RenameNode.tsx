import React, { useEffect, useRef, useState } from "react";

interface RenameNodeProps {
  id: string;
  label: string;
  onRename: (id: string, newLabel: string) => void;
  onCancel: () => void;
}

export default function RenameNode({
  id,
  label,
  onRename,
  onCancel,
}: RenameNodeProps) {
  const [value, setValue] = useState(label);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const finish = () => {
    if (value.trim() && value !== label) {
      onRename(id, value.trim());
    }
    onCancel();
  };

  return (
    <input
      aria-label="New Label"
      ref={inputRef}
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={finish}
      onKeyDown={e => {
        if (e.key === "Enter") finish();
        if (e.key === "Escape") onCancel();
      }}
      style={{ width: "100%" }}
    />
  );
}
