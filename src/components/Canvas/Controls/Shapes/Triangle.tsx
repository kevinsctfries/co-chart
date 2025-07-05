import { Handle, NodeProps, Position } from "reactflow";
import styles from "./Shapes.module.scss";

function Triangle({ data }: NodeProps) {
  return (
    <div className={styles.triangle}>
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default Triangle;
