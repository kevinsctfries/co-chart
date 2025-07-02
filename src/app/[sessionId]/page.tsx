"use client";

import { useParams } from "next/navigation";
import FlowCanvas from "@/components/Canvas/FlowCanvas";
import styles from "./page.module.scss";
import React from "react";

export default function SessionPage() {
  const { sessionId } = useParams();
  const sessionIdString = Array.isArray(sessionId) ? sessionId[0] : sessionId;

  if (!sessionIdString) {
    return <div>Invalid Session</div>;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h2>Session: {sessionIdString}</h2>
      </header>
      <main className={styles.canvas}>
        <FlowCanvas sessionId={sessionIdString} onAddNode={() => {}} />
      </main>
    </div>
  );
}
