import { Handle, NodeProps, Position } from "reactflow";
import styles from "./Shapes.module.scss";

function Rectangle({
  data,
}: NodeProps<{ label: string; fill?: string; stroke?: string }>) {
  const style = {
    "--fill": data.fill,
    "--stroke": data.stroke,
  } as React.CSSProperties;

  return (
    <div className={styles.rectangle} style={style}>
      <Handle type="target" position={Position.Top} />
      <div className={styles.nodeLabel}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default Rectangle;
