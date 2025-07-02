import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>
            Collaborative <span>Flowcharts</span> Made Easy
          </h1>
          <p>
            Work together in real-time to plan, diagram, and organize your ideas
            visually.
          </p>
          <div className={styles.actions}>
            <Link href={`${crypto.randomUUID()}`} className={styles.button}>
              Start a New Session
            </Link>
            <Link href="#join" className={styles.secondaryButton}>
              Join with a Code
            </Link>
          </div>
        </section>

        <section className={styles.features}>
          <div>
            <h3>Brainstorm Visually</h3>
            <p>Drag, connect, and label nodes with an intuitive canvas.</p>
          </div>
          <div>
            <h3>Real-Time Collaboration</h3>
            <p>Work together live — no reloads, no conflicts, just flow.</p>
          </div>
          <div>
            <h3>Autosaved & Shareable</h3>
            <p>Your flowcharts are always up-to-date and easy to share.</p>
          </div>
        </section>

        <section id="join" className={styles.join}>
          <h2>Join an Existing Session</h2>
          <form>
            <input
              type="text"
              placeholder="Enter session ID"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Join
            </button>
          </form>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Co-Chart. All rights reserved.</p>
      </footer>
    </div>
  );
}
