import { Handle, NodeProps, Position } from "reactflow";
import styles from "./Shapes.module.scss";

function Rectangle({ data }: NodeProps) {
  return (
    <div className={styles.rectangle}>
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default Rectangle;
