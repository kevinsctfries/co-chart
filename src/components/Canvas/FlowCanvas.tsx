"use client";

import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import styles from "./FlowCanvas.module.scss";
import Toolbar from "../Toolbar/Toolbar";
import EditNode from "./Controls/EditNode";
import type { Node } from "reactflow";

interface FlowCanvasProps {
  sessionId: string;
  onAddNode: () => void;
}

const nodeTypes = { editable: EditNode };

export default function FlowCanvas({ sessionId }: FlowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = (connection: Connection) =>
    setEdges(eds => addEdge(connection, eds));

  const onNodeLabelChange = useCallback(
    (id: string, newLabel: string) => {
      setNodes(ns =>
        ns.map(n =>
          n.id === id
            ? {
                ...n,
                data: {
                  ...n.data,
                  label: newLabel,
                  onChange: onNodeLabelChange,
                },
              }
            : n
        )
      );
    },
    [setNodes]
  );

  useEffect(() => {
    const raw = localStorage.getItem(`flowchart_${sessionId}`);
    if (!raw) return;

    const { nodes: savedNodes, edges: savedEdges } = JSON.parse(raw);
    const hydrated = (savedNodes as Node[]).map(n => ({
      ...n,
      type: "editable",
      data: {
        ...n.data,
        onChange: onNodeLabelChange,
      },
    }));

    setNodes(hydrated);
    setEdges(savedEdges);
  }, [sessionId, setNodes, setEdges, onNodeLabelChange]);

  useEffect(() => {
    localStorage.setItem(
      `flowchart_${sessionId}`,
      JSON.stringify({ nodes, edges })
    );
  }, [nodes, edges, sessionId]);

  const addNode = useCallback(() => {
    const id = `${Date.now()}`;
    setNodes(nds => [
      ...nds,
      {
        id,
        type: "editable",
        position: { x: Math.random() * 250, y: Math.random() * 250 },
        data: { label: "New Node", onChange: onNodeLabelChange },
      },
    ]);
  }, [setNodes, onNodeLabelChange]);

  return (
    <div className={styles.container}>
      <Toolbar onAddNode={addNode} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
