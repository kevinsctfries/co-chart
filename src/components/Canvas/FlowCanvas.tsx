"use client";

import React, { useCallback, useEffect, useState, useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  Connection,
  Node,
  Edge,
  ReactFlowProvider,
  NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import styles from "./FlowCanvas.module.scss";
import Toolbar from "../Toolbar/Toolbar";
import ContextMenu from "./Controls/ContextMenu";
import CustomNode from "./CustomNode";
import Triangle from "./Controls/Shapes/Triangle";
import Rectangle from "./Controls/Shapes/Rectangle";
import Parallelogram from "./Controls/Shapes/Parallelogram";
import Trapezoid from "./Controls/Shapes/Trapezoid";

interface FlowCanvasProps {
  sessionId: string;
}

export default function FlowCanvas({ sessionId }: FlowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [menu, setMenu] = useState<{
    id: string;
    top?: number | false;
    left?: number | false;
    right?: number | false;
    bottom?: number | false;
  } | null>(null);

  const nodeTypes = useMemo(
    () => ({
      default: (props: NodeProps) => (
        <CustomNode
          {...props}
          editingNodeId={editingNodeId}
          setEditingNodeId={setEditingNodeId}
          setNodes={setNodes}
        />
      ),
      triangle: Triangle,
      rectangle: Rectangle,
      parallelogram: Parallelogram,
      trapezoid: Trapezoid,
    }),
    [editingNodeId, setEditingNodeId, setNodes]
  );

  const onConnect = useCallback(
    (c: Connection) => setEdges(eds => addEdge(c, eds)),
    [setEdges]
  );

  const onNodeContextMenu = useCallback((evt: React.MouseEvent, node: Node) => {
    evt.preventDefault();

    setMenu({
      id: node.id,
      top: evt.clientY,
      left: evt.clientX,
    });
  }, []);

  const onPaneClick = useCallback(() => setMenu(null), []);

  useEffect(() => {
    const raw = localStorage.getItem(`flowchart_${sessionId}`);
    if (!raw) return;
    const { nodes: savedNodes, edges: savedEdges } = JSON.parse(raw);

    const hydrated: Node[] = (savedNodes as Node[]).map(n => ({
      ...n,
      data: {
        label: n.data.label,
        shape: n.data.shape || "rectangle",
      },
    }));

    setNodes(hydrated);
    setEdges(savedEdges as Edge[]);
  }, [sessionId, setNodes, setEdges]);

  useEffect(() => {
    localStorage.setItem(
      `flowchart_${sessionId}`,
      JSON.stringify({ nodes, edges })
    );
  }, [nodes, edges, sessionId]);

  const addNode = useCallback(() => {
    const id = crypto.randomUUID();
    setNodes(nds => [
      ...nds,
      {
        id,
        position: { x: Math.random() * 300, y: Math.random() * 300 },
        data: {
          label: "New Node",
          shape: "rectangle",
        },
      },
    ]);
  }, [setNodes]);

  return (
    <ReactFlowProvider>
      <div className={styles.container}>
        <Toolbar onAddNode={addNode} />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeContextMenu={onNodeContextMenu}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          snapToGrid
          snapGrid={[10, 10]}
          fitView>
          <Background />
          <Controls />
        </ReactFlow>

        {menu && (
          <ContextMenu
            onClose={onPaneClick}
            id={menu.id}
            top={menu.top}
            left={menu.left}
            onStartRename={setEditingNodeId}
          />
        )}
      </div>
    </ReactFlowProvider>
  );
}
