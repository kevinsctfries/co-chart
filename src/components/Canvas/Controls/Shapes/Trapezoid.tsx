import { Handle, NodeProps, Position } from "reactflow";
import styles from "./Shapes.module.scss";

const inputA = { left: 25 };
const inputB = { left: 75 };

function Trapezioid({ data }: NodeProps) {
  return (
    <div className={styles.trapezoid}>
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} id="a" style={inputA} />
      <Handle type="source" position={Position.Bottom} id="b" style={inputB} />
    </div>
  );
}

export default Trapezioid;
