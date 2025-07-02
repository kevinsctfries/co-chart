"use client";

import { useSearchParams } from "next/navigation";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import styles from "./page.module.scss";
import { useEffect } from "react";
import Toolbar from "@/components/Toolbar/Toolbar";

export default function SessionPage() {
  const sessionId = useSearchParams().get("sessionId");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = (connection: Connection) =>
    setEdges(eds => addEdge(connection, eds));

  const addNode = () => {
    const newNode = {
      id: crypto.randomUUID(),
      data: { label: "New Node" },
      position: { x: 100, y: 100 },
    };
    setNodes(nds => nds.concat(newNode));
  };

  useEffect(() => {
    const saved = localStorage.getItem(`flowchart_${sessionId}`);
    if (saved) {
      const { nodes, edges } = JSON.parse(saved);
      setNodes(nodes);
      setEdges(edges);
    }
  }, [sessionId, setEdges, setNodes]);

  useEffect(() => {
    localStorage.setItem(
      `flowchart_${sessionId}`,
      JSON.stringify({ nodes, edges })
    );
  }, [nodes, edges, sessionId]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h2>Session: {sessionId}</h2>
      </header>
      <main className={styles.canvas}>
        <Toolbar onAddNode={addNode} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </main>
    </div>
  );
}
