import React from "react";

interface AddNodeProps {
  onClick: () => void;
}

export default function AddNode({ onClick }: AddNodeProps) {
  return (
    <button onClick={onClick} className="">
      Add Node
    </button>
  );
}
