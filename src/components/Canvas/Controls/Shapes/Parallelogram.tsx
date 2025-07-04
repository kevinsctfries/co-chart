import { Handle, NodeProps, Position } from "reactflow";
import styles from "./Shapes.module.scss";

const handleStyle = { left: 10 };

function Parallelogram({ data }: NodeProps) {
  return (
    <div className={styles.parallelogram}>
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
      />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default Parallelogram;
